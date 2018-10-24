// Модуль формы отправки объявления
(function(){
  var BUNGALO_MIN_PRICE = 0;
  var HOUSE_MIN_PRICE = 1500;
  var PALACE_MIN_PRICE = 5000;
  var FLAT_MIN_PRICE = 700;

  var ONE_GUEST = 1;
  var TWO_GUESTS = 2;
  var THREE_GUESTS = 3;
  var FOUR_GUESTS = 4;
  var NOT_FOR_GUESTS = 0;

  window.FormElements = {
    ROOM_NUMBER_SELECTOR: document.querySelector('#room_number'),
    CAPACITY_CHOICES: document.querySelector('#capacity').children,
    TIME_IN: document.querySelector('#timein'),
    TIME_OUT: document.querySelector('#timeout'),
    LODGING_TYPE_SELECTOR: document.querySelector('#type'),
    NOTICE_FORM: document.querySelector('.notice__form')
  };

  window.activateForm = function(){
    window.FormElements.NOTICE_FORM.classList.remove('notice__form--disabled');
  };

// Синхронизируем поля "Колличество гостей" и "Колличество комнат" с заданными параметрами
  var synchronizeRoomGuestsValue = function(){
    disableAllChoices();
    if(roomsIs(1)){
      enableSelectedChoices(ONE_GUEST, TWO_GUESTS);
    }
    else if(roomsIs(2) || roomsIs(3)){
      enableSelectedChoices(TWO_GUESTS, THREE_GUESTS, FOUR_GUESTS);
    }
    else{
      enableSelectedChoices(NOT_FOR_GUESTS);
    }
  };


  var roomsIs = function(roomsCount){
    if(window.FormElements.ROOM_NUMBER_SELECTOR.value == roomsCount){
      return true;
    }
  };
  
// Активация выбранных опции селектора "Колличество мест"
  var enableSelectedChoices = function(){
    var args = Array.from(arguments);
    args.forEach(function(choice){
      window.FormElements.CAPACITY_CHOICES[choice].disabled = false;
    });
  };

// Деактивация всех опциий селектора "Колличество мест"
  var disableAllChoices = function(){
    for(i=0; i<window.FormElements.CAPACITY_CHOICES.length; i++){
      window.FormElements.CAPACITY_CHOICES[i].disabled = true;
    }
  };

// Синхронизируем поля "Время заезда" и "Время выезда"
  var synchronizeTimeValue = function(timeValue, currentEl){
    if(currentEl.id == 'timein'){
      window.FormElements.TIME_OUT.value = timeValue;
    }
    else if(currentEl.id == 'timeout'){
      window.FormElements.TIME_IN.value = timeValue;
    }
  };


  var changeMinPrice = function(minValue){
    var minPriceInput = document.querySelector('#price');
    minPriceInput.placeholder = minValue;
    minPriceInput.min = minValue;
  };


  // core functions for listeners
// Устанавливаем минимальный прайс за тип жилья
  var setLoadgingType = function(evt){
    var lodgingType = evt.currentTarget.value;
    if(lodgingType == 'bungalo'){ changeMinPrice(BUNGALO_MIN_PRICE); }
    else if(lodgingType == 'house'){ changeMinPrice(HOUSE_MIN_PRICE); }
    else if(lodgingType == 'palace'){ changeMinPrice(PALACE_MIN_PRICE); }
    else if(lodgingType == 'flat') { changeMinPrice(FLAT_MIN_PRICE); }
  };

  // listeners
  var onRoomNumberSelectorChange = window.FormElements.ROOM_NUMBER_SELECTOR.
                                  addEventListener('change', synchronizeRoomGuestsValue);

  var onTimeInSelectChange = window.FormElements.TIME_IN.addEventListener('change' , function(evt){
    synchronizeTimeValue(evt.currentTarget.value, evt.currentTarget);
  });


  var onTimeOutSelectChange = window.FormElements.TIME_OUT.addEventListener('change' , function(evt){
    synchronizeTimeValue(evt.currentTarget.value, evt.currentTarget);
  });


  var onLodgingTypeSelectChange = window.FormElements.LODGING_TYPE_SELECTOR.
                                addEventListener('change', setLoadgingType);

  // Вызываем синхронизацию для определения стартового состояния селектора в вёрстке
  synchronizeRoomGuestsValue();
//end of module
 })();