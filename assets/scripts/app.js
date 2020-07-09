const startAddBtn = document.querySelector('header button');
const modal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = modal.querySelector('.btn--passive');
const addMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = modal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const removeMovie = document.getElementById('delete-modal');

let moviesArr;
if (localStorage.getItem('movies')) {
  moviesArr = JSON.parse(localStorage.getItem('movies'))
} else {
  moviesArr = [];
}

localStorage.setItem('movies', JSON.stringify(moviesArr));
const data = JSON.parse(localStorage.getItem('movies'));

window.addEventListener('load', () => {
  if(data) {
    data.forEach(item => {
      renderNewMovie(item.id, item.title, item.imageUrl, item.rating);
      updateUI();
    });
  }
});

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if(moviesArr.length === 0 ) {
    entryText.style.display = 'block';
  } else {
    entryText.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  removeMovie.classList.remove('visible');

};
const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of moviesArr) {
      if (movie.id === movieId) {
        break;
      }
      movieIndex++;
    }
    moviesArr.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
    localStorage.setItem('movies', JSON.stringify(moviesArr));

};



const deleteMovieHandler = (movieId) => {
  removeMovie.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = removeMovie.querySelector('.btn--passive');
  let confirmDelBtn = removeMovie.querySelector('.btn--danger');

  confirmDelBtn.replaceWith(confirmDelBtn.cloneNode(true));
  confirmDelBtn = removeMovie.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal);

  cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
  confirmDelBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovie = (id, title, imageUrl, rating) => {
  const newElMovie = document.createElement('li');
  newElMovie.className = 'movie-element';
  newElMovie.innerHTML = `
    <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    
    </div>
  
  `
  newElMovie.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newElMovie);
};


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
    id: Math.random().toString(),
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue
  };

  moviesArr.push(newMovie);
  localStorage.setItem('movies', JSON.stringify(moviesArr));

  console.log(moviesArr);
  closeModal();
  toggleBackdrop();
  clearInput();
  updateUI();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.imageUrl, newMovie.rating);
};


const closeModal = () => {
  modal.classList.remove('visible');
}

const showModal = () => {
  modal.classList.add('visible');
  toggleBackdrop();
};

const clearInput = () => {
  for (const input of userInputs) {
    input.value = '';
  }
}

const cancelAddMovieHandler = () => {
  closeModal();
  toggleBackdrop();
  clearInput();

};

const backdropClickHandler = () => {
  closeModal();
  closeMovieDeletionModal();
  clearInput();
};

startAddBtn.addEventListener('click', showModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
addMovieBtn.addEventListener('click', addMovieHandler);
