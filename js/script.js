const searchbar = document.querySelector('.search-bar')

async function getCardsFromJSON(url) {
    const res = await fetch(url)

    if(!res.ok) {
        throw new Error(`Oops! Couldn't get cards from ${url}. Code status: ${res.status}`)
    }

    return await res.json()
}

function displayCards() {
    class BookCards {
        constructor(img, alt, title, author, parentSelector) {
            this.img = img
            this.alt = alt
            this.title = title
            this.author = author
            this.parent = document.querySelector(parentSelector)
        }

        render() {
            let bookCard = document.createElement('div')
            bookCard.classList.add('book-card')

            bookCard.innerHTML = `
                <img src="${this.img}" alt="${this.alt}" class="book-image">
                <h2 class="book-title">${this.title}</h2>
                <p class="book-author">${this.author}</p>
            `

            this.parent.append(bookCard)
        }
    }

    getCardsFromJSON('http://localhost:3000/books')
        .then(data => {
            data.forEach(({img, alt, title, author}) => {
                new BookCards(img, alt, title, author, '.book-cards').render()
            })

            filterBooks()
        })
}

displayCards()

function filterBooks() {
    const bookCards = document.querySelectorAll('.book-card')

    searchbar.addEventListener('input', () => {
        const searchValue = searchbar.value.toLowerCase()

        bookCards.forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase()

            if(title.includes(searchValue)) {
                card.style.display = ''
            } else {
                card.style.display = 'none'
            }
        })
    })
}