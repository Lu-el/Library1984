const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const searchClose = document.querySelector('.search__btn-close');

const closeSearch = ({ target }) => {
  if (target.closest('.search, .header__btn_search')) {
    return;
  }
  search.classList.remove('search_active');
  document.removeEventListener('click', closeSearch);
};


btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.addEventListener('click', closeSearch, true);
  })
});

searchClose.addEventListener('click', () => {
  search.classList.remove('search_active');
});
