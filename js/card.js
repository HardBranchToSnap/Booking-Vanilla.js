(function(){
  var ESCAPE_KEYCODE = 27;
  var cardTemplate = document.querySelector('#this_template')
                    .content.querySelector('.map__card');
  
  var TypeName = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Сарай',
    'palace': 'Дворец'
  };

  var showPopupCard = function(evt) {
    // Проверяю, есть ли незакрытые карточки
    // Не заношу в условие ниже, чтоб закрывать в том числе и кликом по "молоку" на карте
    var popupCard = document.querySelector('#popup-card');
    if(popupCard){
      removePopupCard();
    }
    // Удостоверяюсь, чтоб клик был по всей отметке
    var targetPin = evt.target;
    var thisAd = targetPin.firstChild ? targetPin : targetPin.parentElement;

    if(thisAd.tagName.toLowerCase() == 'button' && thisAd.id != 'main-pin'){
      // Вытаскиваю числовое значение из id отметки
      var numberId = thisAd.id.split('-').pop();

      renderCard(window.ads[numberId]);

      // Закрывашка карточки
      var closeCardElement = document.querySelector('.popup__close');

      closeCardElement.addEventListener('click', removePopupCard);
      window.addEventListener('keydown', onPopupEscKeydown);
    }
  };

  var onPinElementClick = window.PinElement.PINS_FIELD.addEventListener('click', showPopupCard);


  var onPopupEscKeydown = function(evt){
    if(evt.keyCode == ESCAPE_KEYCODE){
      removePopupCard();
    }
  };


  var removePopupCard = function(){
    var cardElement = document.querySelector('#popup-card');
    cardElement.parentNode.removeChild(cardElement);
    window.removeEventListener('keydown', onPopupEscKeydown);
  };

  var renderCard = function(thisAd){
    var clonedMapCard =   cardTemplate.cloneNode(true);

    var Card = {
      avatarEl:      clonedMapCard.querySelector('.popup__avatar'),
      titleEl:       clonedMapCard.querySelector('.popup__title'),
      addressEl:     clonedMapCard.querySelector('.popup__text--address'),
      priceEl:       clonedMapCard.querySelector('.popup__price'),
      typeEl:          clonedMapCard.querySelector('.popup__type'),
      roomsOfferEl:  clonedMapCard.querySelector('.popup__text--capacity'),
      timeCheckEl:       clonedMapCard.querySelector('.popup__text--time'),

      featuresUl: clonedMapCard.querySelector('.popup__features'),
      photosUl: clonedMapCard.querySelector('.popup__pictures')
    };

    Card.avatarEl.src = thisAd.author.avatar;

    Card.titleEl.textContent = thisAd.offer.title;

    Card.addressEl.textContent = thisAd.offer.address;

    Card.priceEl.textContent = thisAd.offer.price + '₽/ночь';

    Card.typeEl.textContent = TypeName[thisAd.offer.type];

    Card.roomsOfferEl.textContent = getRoomsMessage(thisAd) + ' для ' + getGuestsMessage(thisAd);

    Card.timeCheckEl.textContent = 'Заезд после ' + thisAd.offer.checkin + ', выезд до' + thisAd.offer.checkout;


    var featuresList = thisAd.offer.features;

    featuresList.forEach(function(thisFeature){
      var thisLi = document.createElement('li');
      Card.featuresUl.appendChild(thisLi);
      thisLi.classList.add('feature', 'feature--' + thisFeature);
      thisLi.title = thisFeature;
    });

    var photosList = thisAd.offer.photos;
    photosList.forEach(function(photo){
      var photoLi = document.createElement('li');
      var imgLi = document.createElement('img');
      imgLi.classList.add('popup__img');
      imgLi.src = photo;
      Card.photosUl.appendChild(photoLi);
      photoLi.appendChild(imgLi);
    });
  
    clonedMapCard.id = 'popup-card';

    window.Map.mapEl.appendChild(clonedMapCard);
  };

  // Генерация правильных русских окончаний
  var getGuestsMessage = function(obj){
    var guests = obj.offer.guests;

    var ending = guests == 1 ? 'я' : 'ей';
    
    var message = guests + ' гост' + ending;
    return message;
  };

  var getRoomsMessage = function(obj){
    var rooms = obj.offer.rooms;
    var ending;

    if (rooms == 1){
      ending = 'а';
    }
    else if(rooms < 5){
      ending = 'ы';
    }
    else {
      ending = '';
    }
    var message = rooms + ' комнат' + ending;
    return message;
  };
})();