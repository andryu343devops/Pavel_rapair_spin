const mainBtn = document.querySelector('.top .main__button');
const popupClose = document.querySelector('.menu__close-popup');
const popup = document.querySelector('.popup');
const overlayPopup = document.querySelector('.overlay-popup');

mainBtn.addEventListener('click', () => {
  popup.classList.toggle('popup--open');
  overlayPopup.classList.toggle('active');
});

popupClose.addEventListener('click', () => {
  popup.classList.remove('popup--open');
  overlayPopup.classList.remove('active');
});

console.log('lkkk')