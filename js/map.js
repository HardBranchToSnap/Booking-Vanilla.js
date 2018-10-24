(function(){
  window.Map = {
    mapEl: document.querySelector('.map')
  };

  window.activateMap = function(){
    window.Map.mapEl.classList.remove('map--faded');
  };
}());