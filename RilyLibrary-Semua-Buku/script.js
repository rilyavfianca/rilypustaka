let books = [];
let selectedCategory = "Semua";
let currentSort = "default";
let favorites = JSON.parse(localStorage.getItem("rilyFavorites") || "[]");

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const sortSelect = document.getElementById("sortSelect");
const categoriesEl = document.getElementById("categories");

// Modal
const modal = document.getElementById("bookModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// Chat
const chatBubble = document.getElementById("chatBubble");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// Fallback data (untuk offline) + local covers
const fallbackBooks = [
  {"id":1,"title":"Laskar Pelangi","author":"Andrea Hirata","category":"Fiksi","year":2005,"status":"Tersedia","cover":"https://covers.openlibrary.org/b/isbn/9789793062792-M.jpg"},
  {"id":2,"title":"Bumi","author":"Tere Liye","category":"Fiksi","year":2014,"status":"Dipinjam","cover":"https://covers.openlibrary.org/b/isbn/9786020332116-M.jpg"},
  {"id":3,"title":"Filosofi Teras","author":"Henry Manampiring","category":"Pendidikan","year":2018,"status":"Tersedia","cover":"https://covers.openlibrary.org/b/isbn/9786024125189-M.jpg"},
  {"id":4,"title":"Ensiklopedia Sains","author":"Tim Edukasi","category":"Sains","year":2022,"status":"Tersedia","cover":"covers/ensiklopedia-sains.jpg"},
  {"id":5,"title":"Sejarah Indonesia","author":"Tim Sejarah","category":"Sejarah","year":2020,"status":"Tersedia","cover":"covers/sejarah-indonesia.jpg"},
  {"id":6,"title":"Harry Potter and the Sorcerer's Stone","author":"J.K. Rowling","category":"Fiksi","year":1997,"status":"Tersedia","cover":"https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg"},
  {"id":13,"title":"The Hobbit","author":"J.R.R. Tolkien","category":"Fiksi","year":1937,"status":"Tersedia","cover":"https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg"},
  {"id":18,"title":"The Hunger Games","author":"Suzanne Collins","category":"Fiksi","year":2008,"status":"Tersedia","cover":"https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg"}
];

async function loadBooks() {
  try {
    const res = await fetch("data/books.json");
    if (!res.ok) throw new Error();
    const allBooks = await res.json();
    // Hanya ambil buku yang punya cover
    books = allBooks.filter(book => book.cover && book.cover !== null && book.cover !== "");
  } catch {
    books = fallbackBooks.filter(book => book.cover);
  }
  renderBooks();
}

function getCoverHTML(book) {
  if (book.cover) {
    return `<img src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)}" loading="lazy" 
      onerror="this.onerror=null; this.src='https://via.placeholder.com/200x300/5C2121/F8F1E9?text=' + encodeURIComponent('${escapeHtml(book.title).replace(/'/g, "\\'")}');">`;
  }
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:12px;text-align:center;font-weight:600;">${escapeHtml(book.title)}</div>`;
}

function renderBooks() {
  const query = searchInput.value.toLowerCase().trim();
  let filtered = books.filter(book => {
    const matchCat = selectedCategory === "Semua" || book.category === selectedCategory;
    const matchSearch = !query || 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  // Sorting
  if (currentSort === "title") {
    filtered.sort((a,b) => a.title.localeCompare(b.title));
  } else if (currentSort === "year-desc") {
    filtered.sort((a,b) => b.year - a.year);
  } else if (currentSort === "year-asc") {
    filtered.sort((a,b) => a.year - b.year);
  }

  bookList.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach(book => {
    const isFav = favorites.includes(book.id);
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${book.id}">${isFav ? '♥' : '♡'}</button>
      <div class="cover">${getCoverHTML(book)}</div>
      <div class="book-info">
        <h3>${escapeHtml(book.title)}</h3>
        <p>${escapeHtml(book.author)}</p>
        <p>${book.year} · ${book.category}</p>
        <span class="status ${book.status.toLowerCase()}">${book.status}</span>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("fav-btn")) openModal(book);
    });
    bookList.appendChild(card);
  });

  // Favorite buttons
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(Number(btn.dataset.id), btn);
    });
  });
}

function toggleFavorite(id, btn) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    btn.textContent = "♡";
    btn.classList.remove("active");
  } else {
    favorites.push(id);
    btn.textContent = "♥";
    btn.classList.add("active");
  }
  localStorage.setItem("rilyFavorites", JSON.stringify(favorites));
}

function openModal(book) {
  const cover = book.cover 
    ? `<img src="${escapeHtml(book.cover)}" alt="${escapeHtml(book.title)}" onerror="this.outerHTML='<div class=\\'modal-cover\\'>${escapeHtml(book.title)}</div>'">`
    : `<div class="modal-cover">${escapeHtml(book.title)}</div>`;

  modalBody.innerHTML = `
    ${cover}
    <div class="modal-info">
      <h3>${escapeHtml(book.title)}</h3>
      <p><strong>Penulis:</strong> ${escapeHtml(book.author)}</p>
      <p><strong>Kategori:</strong> ${escapeHtml(book.category)}</p>
      <p><strong>Tahun:</strong> ${book.year}</p>
      <p><strong>Status:</strong> <span class="status ${book.status.toLowerCase()}">${book.status}</span></p>
      <p style="margin-top:12px;">Klik hati di kartu buku untuk menyimpan sebagai favorit.</p>
    </div>
  `;
  modal.classList.add("open");
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, m => ({
    '&':'&','<':'<','>':'>','"':'"',"'":'&#39;'
  }[m]));
}

// Events
searchInput.addEventListener("input", renderBooks);
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderBooks();
});

categoriesEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.dataset.category;
    renderBooks();
  }
});

modalClose.addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// Chat
chatBubble.addEventListener("click", () => chatPanel.classList.toggle("open"));
closeChat.addEventListener("click", () => chatPanel.classList.remove("open"));

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = "Terima kasih! Pesan kamu sudah kami terima. Tim RilyLibrary akan segera membalas.";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
});

// Init
loadBooks();
