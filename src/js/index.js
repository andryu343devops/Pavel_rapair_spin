const menuBtn = document.querySelector('.burger');
const menuClose = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');
const overlay = document.querySelector('.overlay');

menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('menu__list--open');
  overlay.classList.toggle('active');
});

menuClose.addEventListener('click', () => {
  menuList.classList.remove('menu__list--open');
  overlay.classList.remove('active');
});
