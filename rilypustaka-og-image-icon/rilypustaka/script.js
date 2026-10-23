let books = [];
let selectedCategory = "Semua";

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

// Data cadangan membuat website tetap bisa dicoba saat index.html
// dibuka langsung secara offline (file://), ketika fetch JSON diblokir browser.
const fallbackBooks = [
  {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "category": "Fiksi",
    "year": 2005,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9789793062792-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 2,
    "title": "Bumi",
    "author": "Tere Liye",
    "category": "Fiksi",
    "year": 2014,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9786020332116-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 3,
    "title": "Filosofi Teras",
    "author": "Henry Manampiring",
    "category": "Pendidikan",
    "year": 2018,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9786024125189-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 4,
    "title": "Ensiklopedia Sains",
    "author": "Tim Edukasi",
    "category": "Sains",
    "year": 2022,
    "status": "Tersedia",
    "cover": null,
    "source": "No cover assigned"
  },
  {
    "id": 5,
    "title": "Sejarah Indonesia",
    "author": "Tim Sejarah",
    "category": "Sejarah",
    "year": 2020,
    "status": "Tersedia",
    "cover": null,
    "source": "No cover assigned"
  },
  {
    "id": 6,
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 1997,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 7,
    "title": "Harry Potter and the Chamber of Secrets",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 1998,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439064866-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 8,
    "title": "Harry Potter and the Prisoner of Azkaban",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 1999,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439136358-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 9,
    "title": "Harry Potter and the Goblet of Fire",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 2000,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439139595-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 10,
    "title": "Harry Potter and the Order of the Phoenix",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 2003,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439358071-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 11,
    "title": "Harry Potter and the Half-Blood Prince",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 2005,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439784542-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 12,
    "title": "Harry Potter and the Deathly Hallows",
    "author": "J.K. Rowling",
    "category": "Fiksi",
    "year": 2007,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9780545010221-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 13,
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "category": "Fiksi",
    "year": 1937,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 14,
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "category": "Fiksi",
    "year": 1954,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780544003415-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 15,
    "title": "The Little Prince",
    "author": "Antoine de Saint-Exupéry",
    "category": "Fiksi",
    "year": 1943,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 16,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "category": "Fiksi",
    "year": 1813,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 17,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "category": "Fiksi",
    "year": 1988,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 18,
    "title": "The Hunger Games",
    "author": "Suzanne Collins",
    "category": "Fiksi",
    "year": 2008,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 19,
    "title": "Divergent",
    "author": "Veronica Roth",
    "category": "Fiksi",
    "year": 2011,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780062024039-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 20,
    "title": "The Fault in Our Stars",
    "author": "John Green",
    "category": "Fiksi",
    "year": 2012,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780062208118-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 21,
    "title": "Wonder",
    "author": "R.J. Palacio",
    "category": "Fiksi",
    "year": 2012,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780375869020-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 22,
    "title": "Percy Jackson and the Olympians: The Lightning Thief",
    "author": "Rick Riordan",
    "category": "Fiksi",
    "year": 2005,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9780786856299-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 23,
    "title": "Coraline",
    "author": "Neil Gaiman",
    "category": "Fiksi",
    "year": 2002,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780380807345-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 24,
    "title": "Matilda",
    "author": "Roald Dahl",
    "category": "Fiksi",
    "year": 1988,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780142410370-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 25,
    "title": "Charlie and the Chocolate Factory",
    "author": "Roald Dahl",
    "category": "Fiksi",
    "year": 1964,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780142410318-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 26,
    "title": "The Chronicles of Narnia",
    "author": "C.S. Lewis",
    "category": "Fiksi",
    "year": 1950,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780064404990-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 27,
    "title": "The Giver",
    "author": "Lois Lowry",
    "category": "Fiksi",
    "year": 1993,
    "status": "Dipinjam",
    "cover": "https://covers.openlibrary.org/b/isbn/9780385732550-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 28,
    "title": "The Kite Runner",
    "author": "Khaled Hosseini",
    "category": "Fiksi",
    "year": 2003,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9781594631931-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 29,
    "title": "Norwegian Wood",
    "author": "Haruki Murakami",
    "category": "Fiksi",
    "year": 1987,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9780375704024-M.jpg?default=false",
    "source": "Open Library Covers API"
  },
  {
    "id": 30,
    "title": "A Man Called Ove",
    "author": "Fredrik Backman",
    "category": "Fiksi",
    "year": 2012,
    "status": "Tersedia",
    "cover": "https://covers.openlibrary.org/b/isbn/9781476738024-M.jpg?default=false",
    "source": "Open Library Covers API"
  }
];

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function loadBooks() {
  try {
    const response = await fetch("data/books.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Gagal memuat books.json");
    books = await response.json();
  } catch (error) {
    console.warn("books.json tidak dapat dimuat. Menggunakan data cadangan.", error);
    books = fallbackBooks;
  }
  renderBooks();
}

function renderBooks() {
  const keyword = normalize(searchInput.value.trim());

  const filtered = books.filter(book => {
    const matchesCategory =
      selectedCategory === "Semua" ||
      normalize(book.category) === normalize(selectedCategory);

    const searchableText = normalize(
      `${book.title} ${book.author} ${book.category} ${book.year}`
    );

    return matchesCategory && searchableText.includes(keyword);
  });

  bookList.innerHTML = filtered.map(book => `
    <article class="book-card">
      <div class="cover">
        ${book.cover ? `<img src="${escapeHtml(book.cover)}" alt="Sampul ${escapeHtml(book.title)}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-cover'); this.parentElement.insertAdjacentText('afterbegin','📖');">` : '📖'}
      </div>
      <h3>${escapeHtml(book.title)}</h3>
      <p>${escapeHtml(book.author)}</p>
      <p>${escapeHtml(book.category)} · ${book.year}</p>
      <p class="status">${escapeHtml(book.status)}</p>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

searchInput.addEventListener("input", renderBooks);

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    renderBooks();
  });
});

loadBooks();
