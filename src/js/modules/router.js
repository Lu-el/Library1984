import Navigo from 'navigo';
import {renderListBooks} from './renderListBooks.js';
import { renderBook } from './renderBook.js';

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.library__add-btn, .header__btn-add');
const btnsBack = document.querySelector('.book__btn_back');

export const router = new Navigo('/', {
  hash: true,
});

const closeAllPage = () => {
  library.classList.add('hidden');
  book.classList.add('hidden');
  add.classList.add('hidden');
}

router.on({
  '/': () => {
    closeAllPage();
    library.classList.remove('hidden');
    document.body.classList.remove('body__gradient');
    renderListBooks();
  },
  'book': ({params: {id}}) => {
    closeAllPage();
    book.classList.remove('hidden');
    document.body.classList.add('body__gradient');
    renderBook(id);
  },
  'add': () => {
    closeAllPage();
    add.classList.remove('hidden');
    document.body.classList.add('body__gradient');
  },
}).resolve();



addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add');
  })
});

  btnsBack.addEventListener('click', () => {
      router.navigate('/');
});
