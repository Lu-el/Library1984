import Navigo from 'navigo';

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.library__add-btn, .header__btn-add');
const btnsBack = document.querySelectorAll('.header__btn_back');
const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const searchClose = document.querySelector('.search__btn-close');
const fieldBtnSort = document.querySelector('.fields__btn_sort');
const fieldListSort = document.querySelector('.fields__list_sort');
const fieldBtnFilter = document.querySelector('.fields__btn_filter');
const fieldListFilter = document.querySelector('.fields__list_filter');
const form = document.querySelector('.add__form');
const fieldsets = document.querySelectorAll('.add__fieldset');
let count = 0;

const router = new Navigo('/', {
  hash: true,
});

const closeSearch = ({ target }) => {
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
    document.body.classList.remove('body__gradient');
  },
  'book': () => {
    closeAllPage();
    book.classList.remove('hidden');
    document.body.classList.add('body__gradient');
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

btnsBack.forEach(btn => {
  btn.addEventListener('click', () => {
    if (count === 0) {
      router.navigate('/');
      form.reset();
      fieldsets[count].classList.add('hidden');
      count = 0;
      fieldsets[count].classList.remove('hidden');
    }
    if (count >= 1) {
      fieldsets[count].classList.add('hidden');
      count -= 1;
      fieldsets[count].classList.remove('hidden');
    }
  })
});

btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.addEventListener('click', closeSearch, true);
  })
});

searchClose.addEventListener('click', () => {
  search.classList.remove('search_active');
});

const controlFields = (btn, list, offList) => {
  btn.addEventListener('click', () => {
    list.classList.toggle('fields__list_active');
    offList.classList.remove('fields__list_active')
  });

  list.addEventListener('click', ({ target }) => {
    if (target.classList.contains('fields__button')) {
      list.classList.remove('fields__list_active');
    }
  });
};

controlFields(fieldBtnSort, fieldListSort, fieldListFilter);
controlFields(fieldBtnFilter, fieldListFilter, fieldListSort);

const changeFieldset = () => {
  const addBtn = document.querySelector('.add__btn');

  addBtn.addEventListener('click', ({ target }) => {

    const fieldset = fieldsets[count];
    console.log(fieldset);
    let valid = true;

    for (const elem of fieldset.elements) {
      if (!elem.checkValidity()) {
        elem.classList.add('no-valid');
        valid = false;
      } else {
        elem.classList.remove('no-valid');
      }
    }

    if (valid) {

      count += 1;

      if (count === fieldsets.length - 1) {
        target.textContent = 'Добавить книгу';
      }

      if (count === fieldsets.length) {

        const data = true; // данные с сервера
        if (data) {
          form.reset();
          router.navigate('/');
          count = 0;
          target.textContent = 'Далее';
        }
      }

      fieldset.classList.add('hidden');
      fieldsets[count].classList.remove('hidden');
    }
  })
}

changeFieldset();
