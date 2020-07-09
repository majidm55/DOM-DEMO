const startAddBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = modal.querySelector('.btn--passive');
const addMovieBtn = cancelAddMovieBtn.nextElementSibling;

const userInputs = modal.querySelectorAll('input');

const movies = [];

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if(titleValue.trim() === '' || 
  imageUrlValue.trim() === '' || 
  ratingValue.trim() === '' || 
  +ratingValue < 1 || +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleModal();
  clearInput();
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

const clearInput = () => {
  for (const input of userInputs) {
    input.value = '';
  }
}

const cancelAddMovieHandler = () => {
  toggleModal();
  clearInput();
};

const backdropClickHandler = () => {
  toggleModal();
};

startAddBtn.addEventListener('click', toggleModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
addMovieBtn.addEventListener('click', addMovieHandler);
