import './modules/router.js';
import './modules/search.js';
import changeFieldset from './modules/changeFieldset.js';
import { controlFields } from './modules/controlFields.js';
import './modules/upload.js';
import { renderListBooks } from './modules/renderListBooks.js';



const fieldBtnSort = document.querySelector('.fields__btn_sort');
const fieldListSort = document.querySelector('.fields__list_sort');
const fieldBtnFilter = document.querySelector('.fields__btn_filter');
const fieldListFilter = document.querySelector('.fields__list_filter');

controlFields(fieldBtnSort, fieldListSort, fieldListFilter);
controlFields(fieldBtnFilter, fieldListFilter, fieldListSort);

changeFieldset();
renderListBooks();
