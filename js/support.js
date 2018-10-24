(function(){
  var FILTERS_CONTAINER = document.querySelector('.map__filters-container');

  window.Support = {
    showFilters: function(){
      FILTERS_CONTAINER.classList.remove('hidden');
  }
  };
}());