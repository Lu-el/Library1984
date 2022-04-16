import { getBooks, getLabels, API_URI } from "./serviceBook.js";

const bookBlock = document.querySelector('.book__block'); //lheujt

const getStars = (n) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img class="book__rating-star" src="img/star.svg" alt="Рейтинг ${n} из 5">`);
    } else if (i < n) {
      stars.push(`<img class="book__rating-star" src="img/star.svg" alt="">`);
    } else {
      stars.push(`<img class="book__rating-star" src="img/star-o.svg" alt="">`);
    }
  }

  return stars;
};

export const renderBook = async (id) => {

  const [book, labels] = await Promise.all([getBooks(id), getLabels()]);

  bookBlock.textContent = '';

    const item = document.createElement('div');
    item.innerHTML = `
    <div class="container book__container">
      <div class="book__wrapper">
        <img class="book__image" src="${API_URI}${book.image}" alt="Обложка книги: ${book.title}">

        <button class="book__label book__label-btn hidden">${labels[book.label]}</button>
      </div>

      <div class="book__content">
        <h2 class="book__title">${book.title}</h2>

        <p class="book__author">${book.author}</p>

        <div class="book__rating">
        ${getStars(book.rating).join('')}
        </div>

        <h3 class="book__subtitle">Описание</h3>

        <p class="book__description">${book.description}</p>

      </div>
      </div>
      <footer class="footer footer__book">
  <button class="footer__btn book__label">${labels[book.label]}</button>
</footer>
      `;

      bookBlock.append(item);
}

