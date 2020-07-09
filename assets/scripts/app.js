const startAddBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = modal.querySelector('.btn--passive');
const addMovieBtn = cancelAddMovieBtn.nextElementSibling;

const userInputs = modal.querySelectorAll('input');

const movies = [];

const addMovieHandler = () => {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if(title.trim() === '' || 
  imageUrl.trim() === '' || 
  rating.trim() === '' || 
  +rating < 1 || +rating > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
};

// let addMovieInfo = {
//   title: movieTitle
// }
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};
const toggleModal = () => {
  modal.classList.toggle('visible');
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  toggleModal();
};

const backdropClickHandler = () => {
  toggleModal();
};

startAddBtn.addEventListener('click', toggleModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
addMovieBtn.addEventListener('click', addMovieHandler);
