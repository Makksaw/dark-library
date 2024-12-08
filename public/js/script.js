const searchbar = document.querySelector('.search-bar'),
    modal = document.querySelector('.modal'),
    closeModal = document.querySelector('.close-btn'),
    modalImg = document.querySelector('.modal-image'),
    modalTitle = document.querySelector('.modal-title'),
    modalAuthor = document.querySelector('.modal-author'),
    modalDescr = document.querySelector('.modal-description'),
    modalPages = document.querySelector('.modal-pages'),
    modalYear = document.querySelector('.modal-year'),
    modalGenre = document.querySelector('.modal-genre');
bookCards = document.querySelectorAll('.book-card');

function getInfoByURL(route) {
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//${window.location.hostname}${port}/api/${route}`;
}

function openModal(book) {
    modal.style.display = 'flex';
    modalImg.src = book.img;
    modalImg.alt = book.alt;
    modalTitle.textContent = `Title: ${book.title}`;
    modalAuthor.textContent = `Author: ${book.author}`;
    modalDescr.textContent = `Description: ${book.description}`;
    modalPages.textContent = `Pages: ${book.pages}`;
    modalYear.textContent = `Year: ${book.year}`;
    modalGenre.textContent = `Genre: ${book.genre}`;
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

async function getCardsFromJSON(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(
            `Oops! Couldn't get cards from ${url}. Code status: ${res.status}`
        );
    }

    return await res.json();
}

function displayCards() {
    class BookCards {
        constructor(
            img,
            alt,
            title,
            author,
            description,
            pages,
            year,
            genre,
            parentSelector
        ) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.author = author;
            this.description = description;
            this.pages = pages;
            this.year = year;
            this.genre = genre;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            let bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            bookCard.innerHTML = `
                <img src="${this.img}" alt="${this.alt}" class="book-image">
                <h2 class="book-title">${this.title}</h2>
                <p class="book-author">${this.author}</p>
            `;

            bookCard.addEventListener('click', () =>
                openModal({
                    img: this.img,
                    alt: this.alt,
                    title: this.title,
                    author: this.author,
                    description: this.description,
                    pages: this.pages,
                    year: this.year,
                    genre: this.genre,
                })
            );

            this.parent.append(bookCard);
        }
    }

    getCardsFromJSON(getInfoByURL('books')).then((data) => {
        data.forEach(
            ({ img, alt, title, author, description, pages, year, genre }) => {
                new BookCards(
                    img,
                    alt,
                    title,
                    author,
                    description,
                    pages,
                    year,
                    genre,
                    '.book-cards'
                ).render();
            }
        );

        filterBooks();
    });
}

displayCards();

function filterBooks() {
    const bookCards = document.querySelectorAll('.book-card');

    searchbar.addEventListener('input', () => {
        const searchValue = searchbar.value.toLowerCase();

        bookCards.forEach((card) => {
            const title = card
                .querySelector('.book-title')
                .textContent.toLowerCase();

            if (title.includes(searchValue)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
