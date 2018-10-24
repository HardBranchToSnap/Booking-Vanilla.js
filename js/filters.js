(function(){
    // Прототип для поиска. Объект, по которому будут равняться явно указанные фильтры
    var idealObj = {
        offer: {}
    };
    
    var PRICE = {
        selected: false
    };

    var PricePoint = {
        first: 10000,
        second: 50000
    }
    
    var filtratePrice = {
      low: function(price){
            return price < PricePoint.first;
      },
      middle: function(price){
            return price >= PricePoint.first && price < PricePoint.second;
      },
      high: function(price){
            return price >= PricePoint.second;
      }
    };
    
    var appliedFeatures = [];

    var FilterElement = {
        HOUSE_TYPE_SELECT: document.querySelector('#housing-type'),
        PRICE_SELECT: document.querySelector('#housing-price'),
        ROOM_SELECT: document.querySelector('#housing-rooms'),
        GUEST_SELECT: document.querySelector('#housing-guests'),
        FEATURES_ELEMENT: document.querySelector('#housing-features')
    };

    
    onHouseTypeSelect = FilterElement.HOUSE_TYPE_SELECT.addEventListener('change', function(evt){
        filtrateData('type', evt.target, evt.target.value);
    });  
    
    onPriceSelectChange = FilterElement.PRICE_SELECT.addEventListener('change', function(evt){
        if(evt.target.selectedIndex > 0){
            PRICE.selected = evt.target.value;
            evt.target.style.background = '#ff6547';
        }
        else{
            PRICE.selected = false;
            evt.target.style.background = 'white';
        }
        doFiltration();
    });
    
    onRoomSelectChange = FilterElement.ROOM_SELECT.addEventListener('change', function(evt){
        filtrateData('rooms', evt.target, parseInt(evt.target.value));
    });
    
    onGuestSelectChange = FilterElement.GUEST_SELECT.addEventListener('change', function(evt){
        filtrateData('guests', evt.target, parseInt(evt.target.value));
    });
    
    var filtrateData = function(filter, el, value){
        if(el.selectedIndex > 0){
            idealObj.offer[filter] = value;
            el.style.background = '#ff6547';
        }
        else{
            delete(idealObj.offer[filter]);
            el.style.background = 'white';
        }
    
        doFiltration();
    };
    
    onFeatureSelectChange = FilterElement.FEATURES_ELEMENT.addEventListener('change', function(evt){
        var thisFeature = evt.target.id.split('-').pop();
        if(evt.target.checked == false && appliedFeatures.includes(thisFeature)){
            appliedFeatures.splice(appliedFeatures.findIndex(function(el){
                return el == thisFeature;
            }), 1);
        }
        else{
            appliedFeatures.push(thisFeature);
        }

        doFiltration();
    });
    
    var doFiltration = function(){
        var miniPins = document.querySelectorAll('.mini__pin');
        miniPins.forEach(function(pin){
            pin.parentNode.removeChild(pin);
        })
    
        var filtrated = window.ads.filter(ad => 
            Object.keys(idealObj.offer).every(key => 
                idealObj.offer[key] === ad.offer[key])
        );
        
        if(PRICE.selected){
            filtrated = filtrated.filter(function(ad){
                return filtratePrice[PRICE.selected](ad.offer.price);
            });
        }
    
        if(appliedFeatures.length > 0){
            filtrated = filtrated.filter(function(ad){
                return appliedFeatures.every(function(value){
                    return (ad.offer.features.indexOf(value) >= 0);
                });
            });
        }
    
        filtrated.forEach(window.renderPin);
    }   
}())