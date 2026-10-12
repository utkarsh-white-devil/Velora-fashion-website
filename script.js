const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#mainNav");
const bagCount = document.querySelector(".bag-count");
const bagToast = document.querySelector("#bagToast");
const cartMessage = document.querySelector("#cartMessage");
let bagItems = 0;
let toastTimer;

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".quick-add").forEach(button => {
  button.addEventListener("click", () => {
    bagItems += 1;
    bagCount.textContent = bagItems;
    const name = button.dataset.name;
    const price = Number(button.dataset.price).toLocaleString("en-IN");
    cartMessage.textContent = `${name} added to your bag.`;
    bagToast.textContent = `${name} added · ₹${price}`;
    bagToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => bagToast.classList.remove("show"), 2600);
  });
});

document.querySelectorAll(".wishlist").forEach(button => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", saved ? "Remove from wishlist" : "Add to wishlist");
  });
});

document.querySelector(".search-toggle").addEventListener("click", () => {
  const query = window.prompt("What are you looking for?");
  if (!query || !query.trim()) return;
  const term = query.toLowerCase().trim();
  let found = 0;
  document.querySelectorAll(".product-card").forEach(card => {
    const matches = card.innerText.toLowerCase().includes(term);
    card.hidden = !matches;
    if (matches) found++;
  });
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  document.querySelector("#new").scrollIntoView({ behavior: "smooth" });
  cartMessage.textContent = found ? `${found} item${found === 1 ? "" : "s"} found for “${query}”.` : `No products found for “${query}”. Try another search.`;
});

document.querySelector(".bag-button").addEventListener("click", () => {
  bagToast.textContent = bagItems ? `Your bag has ${bagItems} item${bagItems === 1 ? "" : "s"}. Checkout is a demo feature.` : "Your bag is empty — find something you love.";
  bagToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => bagToast.classList.remove("show"), 2600);
});

document.querySelector("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#email");
  document.querySelector("#newsletterMessage").textContent = `You're on the list! (Demo) ${email.value}`;
  email.value = "";
});
