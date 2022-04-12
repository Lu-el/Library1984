import Navigo from 'navigo';

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.library__add-btn, .library__add-btn');
const btnsBack = document.querySelectorAll('.header__btn_back');
const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const searchClose = document.querySelector('.search__btn-close');


const router = new Navigo('/', {
  hash: true,
});

const closeSearch = ({target}) => {
  if (target.closest('.search, .header__btn_search')) {
    return;
  }
  search.classList.remove('search_active');
  document.removeEventListener('click', closeSearch);
};

const closeAllPage = () => {
  library.classList.add('hidden');
  book.classList.add('hidden');
  add.classList.add('hidden');
}

router.on({
  '/': () => {
    closeAllPage();
    library.classList.remove('hidden');
  },
  'book': () => {
    closeAllPage();
    book.classList.remove('hidden');
    search.classList.remove('search_active');
  },
  'add': () => {
    closeAllPage();
    add.classList.remove('hidden');
  },
}).resolve();

addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add');
  })
});

btnsBack.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('/');
  })
});

btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.addEventListener('click', closeSearch);
  })
});

searchClose.addEventListener('click', () => {
  search.classList.remove('search_active');
});
