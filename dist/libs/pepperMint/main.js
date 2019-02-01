var slider = Peppermint(document.getElementById('peppermint'),{
  //скорость перехода между слайдами, мс
  speed: 300,

  //скорость перехода между слайдами после тача, мс
  touchSpeed: 300,

  //включить слайдшоу
  slideshow: true,

  //интервал переключения слайдов, мс
  slideshowInterval: 4000,

  //останавливать слайдшоу после переключения слайда пользователем
  stopSlideshowAfterInteraction: true,

  //начальный слайд
  startSlide: 0,

  //разрешить управление мышкой
  mouseDrag: true,

  //не включать Peppermint, если слайд один
  disableIfOneSlide: true,

  //Префикс для служебных классов слайдера,
  //таких как `inactive`, `active`, `mouse`, `drag` и т. д.
  //Не забудьте поменять стили соответствующим образом!
  cssPrefix: 'peppermint-',

  //показывать точки
  dots: true,

  //положить точки в начало блока `dotsContainer` (по умолчанию кладутся в конец)
  dotsPrepend: false,

  //Элемент, в который положить точки. По умолчанию корневой элемент слайдера.
  //Может быть где угодно на странице.
  dotsContainer: undefined,  

  //Элемент, содержащий слайды. По умолчанию корневой элемент слайдера.
  slidesContainer: undefined,

  //Callback-функция, вызывается при смене слайда.
  //В качестве параметра получает номер слайда.
  onSlideChange: undefined,

  //Callback-функция, вызывается пойсле завершения установки.
  //В качестве параметра получает количество слайдов.
  onSetup: undefined
});