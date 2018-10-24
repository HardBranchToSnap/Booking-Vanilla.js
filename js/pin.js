(function(){
  var PINS_OPACITY = 0.5;
  var NO_OPACITY = null;

  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#this_template')
                    .content.querySelector('#pin--template');

  window.PinElement = {
    PINS_FIELD: document.querySelector('.map__pins')
  };

  LimitCoord = {
    minX: 10,
    maxX: 1185,
    minY: 120,
    maxY: 650 
  }

  window.renderPin = function(objAd){
    var clonePin = pinTemplate.cloneNode(true);
    clonePin.style.left = objAd.location.x + 'px';
    clonePin.style.top = objAd.location.y + 'px';
    clonePin.firstChild.src = objAd.author.avatar;
    clonePin.firstChild.alt = objAd.offer.title;
    clonePin.id = 'pin--' + parseInt(window.ads.findIndex(function(el){ return el == objAd;}));

    window.PinElement.PINS_FIELD.appendChild(clonePin);
  };
  
  var setPinCoordsToAddressInput = function(locLeft, locTop){
    var addressEl = document.querySelector('#address');
    addressEl.value = locLeft + ', ' + locTop;
  };

  var addMainPinDragAndDrop = function(){
    mainPin.addEventListener('mousedown', function(evt){
      evt.preventDefault();

      window.startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      changeOpacityPins(evt.type);
    });

    var onMouseMove = function(moveEvt){
      moveEvt.preventDefault();

      var shift = {
        x: window.startCoordinates.x - moveEvt.clientX,
        y: window.startCoordinates.y - moveEvt.clientY
      };

      window.startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = Math.max( LimitCoord.minX, Math.min(LimitCoord.maxX, (mainPin.offsetLeft - shift.x)) ) + 'px';
      mainPin.style.top = Math.max( LimitCoord.minY, Math.min(LimitCoord.maxY, (mainPin.offsetTop - shift.y)) ) + 'px';

      setPinCoordsToAddressInput(mainPin.style.left, mainPin.style.top);
    };

    var onMouseUp = function(upEvt){
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      changeOpacityPins(upEvt.type);
    };

    var changeOpacityPins = function(evtType){
      var opacityStatus = (evtType == 'mousedown') ? PINS_OPACITY : NO_OPACITY;

      var miniPins = document.querySelectorAll('.mini__pin');
      miniPins.forEach(function(pin){
        pin.style.opacity = opacityStatus;
      });
    };
  };

  var activateWorkEnvironment = function(){
    mainPin.removeEventListener('mouseup', activateWorkEnvironment);
    addMainPinDragAndDrop();

    window.activateMap();
    window.loaddata().then(function(data) {
      window.ads = data;
      window.ads.forEach(window.renderPin);
      window.Support.showFilters();
  }).catch(function(error) {
      console.log(error);
  });
    
    window.activateForm();
  };

  var onMainPinMouseUp = mainPin.addEventListener('mouseup', activateWorkEnvironment);
}());