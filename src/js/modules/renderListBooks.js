import { getBooks, getLabels, API_URI } from "./serviceBook.js";

const libraryList = document.querySelector('.library__list');

const getStars = (n) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="Рейтинг ${n} из 5">`);
    } else if (i < n) {
      stars.push(`<img class="cart__rating-star" src="img/star.svg" alt="">`);
    } else {
      stars.push(`<img class="cart__rating-star" src="img/star-o.svg" alt="">`);
    }
  }

  return stars;
};

export const renderListBooks = async () => {
  // const books = await getBooks();
  // const labels = await getLabels();

  const [books, labels] = await Promise.all([getBooks(), getLabels()]);
  console.log(books);

  libraryList.textContent = '';

  books.forEach(({ author, description, id, image, label, rating, title }) => {
    const item = document.createElement('li');
    item.classList.add('library__item');
    item.innerHTML = `
    <a href="/#/book?id=${id}">
      <article class="cart">
        <div class="cart__wrapper">
          <img src="${API_URI}${image}" alt="Обложка книги: ${title}" class="cart__image">

          <p class="cart__label">${labels[label]}</p>
        </div>

        <div class="cart__content">
          <h3 class="cart__title">${title}</h3>

          <p class="cart__author">${author}</p>

          <p class="cart__description">${description.substring(0, 80)}...</p>

          <div class="cart__rating">
          ${getStars(rating).join('')}
          </div>
        </div>
      </article>
    </a>
    `;

    libraryList.append(item);
  });
}


