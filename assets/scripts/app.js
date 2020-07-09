const startAddBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
}
const toggleModal = () => {
  modal.classList.toggle('visible');
  toggleBackdrop();

}


startAddBtn.addEventListener('click', toggleModal);
