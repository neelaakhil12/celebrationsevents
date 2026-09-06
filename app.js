// BalloonDekor Application Logic & Interactivity

let appState = {
  selectedCity: localStorage.getItem("balloondekor_city") || "Delhi NCR",
  currentCategory: "all",
  currentSort: "featured",
  cart: JSON.parse(localStorage.getItem("balloondekor_cart") || "[]"),
  appliedCoupon: null,
  activeModalProduct: null,
  selectedSlotInModal: null,
  selectedDateInModal: null,
  selectedAddonsInModal: [],
  carouselIndex: 0,
  carouselTimer: null
};

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS safely
  try {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 550,
        once: false,
        mirror: true,
        offset: 40,
        easing: "ease-out-cubic",
        debounceDelay: 50,
        throttleDelay: 99
      });
    }
  } catch (err) {
    console.warn("AOS init error:", err);
  }

  try { initCity(); } catch(e){}
  try { renderQuickCategories(); } catch(e){}
  try { renderProducts(); } catch(e){}
  try { renderReviews(); } catch(e){}
  try { renderFaqs(); } catch(e){}
  try { renderCitiesList(); } catch(e){}
  try { renderFooterCities(); } catch(e){}
  try { initHeroCarousel(); } catch(e){}
  try { initKeyboardShortcuts(); } catch(e){}
  try { updateCartBadge(); } catch(e){}
  try { initBookNowAnimations(); } catch(e){}
  try { scrollActiveNavIntoView(); } catch(e){}
  try { initSplashScreen(); } catch(e){}

  setTimeout(() => {
    if (typeof AOS !== "undefined") AOS.refresh();
  }, 120);

  // Set default date to tomorrow in modal
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split("T")[0];
  const dateInput = document.getElementById("bookingDateInput");
  if (dateInput) {
    dateInput.value = dateStr;
    dateInput.min = new Date().toISOString().split("T")[0];
    appState.selectedDateInModal = dateStr;
    dateInput.addEventListener("change", (e) => {
      appState.selectedDateInModal = e.target.value;
    });
  }

  // Setup Event Listeners
  setupEventListeners();
});

function setupEventListeners() {
  // City modal
  document.getElementById("citySelectorTrigger")?.addEventListener("click", openCityModal);

  // Search modal
  document.getElementById("searchTriggerBtn")?.addEventListener("click", openSearchModal);
  document.getElementById("mobileSearchBtn")?.addEventListener("click", openSearchModal);
  document.getElementById("liveSearchInput")?.addEventListener("input", handleLiveSearch);

  // Cart drawer
  document.getElementById("cartTriggerBtn")?.addEventListener("click", openCart);

  // Mobile menu
  document.getElementById("mobileMenuBtn")?.addEventListener("click", openMobileSidebar);

  // Filter pills
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-cat");
      filterCategory(cat);
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      appState.currentSort = e.target.value;
      renderProducts();
    });
  }
}

// ----------------------------------------------------
// City Management
// ----------------------------------------------------
function initCity() {
  const cityNameEl = document.getElementById("headerCityName");
  const mobileCityText = document.getElementById("mobileCityText");
  if (cityNameEl) cityNameEl.textContent = appState.selectedCity;
  if (mobileCityText) mobileCityText.textContent = appState.selectedCity;
}

function selectCity(cityIdOrName) {
  let cityName = cityIdOrName;
  const found = SITE_DATA.cities.find(c => c.id === cityIdOrName || c.name.toLowerCase() === cityIdOrName.toLowerCase());
  if (found) cityName = found.name;

  appState.selectedCity = cityName;
  localStorage.setItem("balloondekor_city", cityName);
  initCity();
  closeCityModal();
  renderCitiesList();
  showToast(`📍 Delivering to ${cityName}`);
}

function openCityModal() {
  document.getElementById("cityModalOverlay").classList.add("active");
}

function closeCityModal() {
  document.getElementById("cityModalOverlay").classList.remove("active");
}

function renderCitiesList() {
  const container = document.getElementById("cityListModal");
  if (!container) return;

  container.innerHTML = SITE_DATA.cities.map(city => {
    const isSelected = city.name === appState.selectedCity;
    return `
      <button class="city-option-btn ${isSelected ? 'selected' : ''}" onclick="selectCity('${city.id}')">
        <span>📍</span>
        <span>${city.name}</span>
      </button>
    `;
  }).join("");
}

function renderFooterCities() {
  const container = document.getElementById("footerCitiesLinks");
  if (!container) return;

  container.innerHTML = SITE_DATA.cities.map(city => `
    <a href="#" onclick="selectCity('${city.id}'); window.scrollTo({top: 0, behavior: 'smooth'}); return false;">
      Balloon Decoration in ${city.name}
    </a>
  `).join("");
}

// ----------------------------------------------------
// Hero Banner Carousel
// ----------------------------------------------------
function initHeroCarousel() {
  const slidesContainer = document.getElementById("carouselSlides");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const heroEl = document.getElementById("heroCarousel");

  const totalSlides = dots.length;

  function goToSlide(index) {
    appState.carouselIndex = (index + totalSlides) % totalSlides;
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${appState.carouselIndex * 100}%)`;
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === appState.carouselIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(appState.carouselIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(appState.carouselIndex + 1));

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      goToSlide(idx);
    });
  });

  // Auto-play
  function startTimer() {
    stopTimer();
    appState.carouselTimer = setInterval(() => {
      goToSlide(appState.carouselIndex + 1);
    }, 5000);
  }

  function stopTimer() {
    if (appState.carouselTimer) clearInterval(appState.carouselTimer);
  }

  if (heroEl) {
    heroEl.addEventListener("mouseenter", stopTimer);
    heroEl.addEventListener("mouseleave", startTimer);
  }

  startTimer();
}

// ----------------------------------------------------
// ----------------------------------------------------
// Quick Visual Categories
// ----------------------------------------------------
function renderQuickCategories() {
  const container = document.getElementById("quickCategoryGrid");
  if (!container) return;

  const categoryUrlMap = {
    "birthday": "birthday.html",
    "anniversary": "anniversary.html",
    "kids": "kids.html",
    "baby-shower": "baby-shower.html",
    "wedding": "wedding.html",
    "corporate": "corporate.html"
  };

  container.innerHTML = SITE_DATA.categories.map((cat, idx) => {
    const pageUrl = categoryUrlMap[cat.id] || `birthday.html`;
    return `
      <a href="${pageUrl}" class="quick-category-card" data-aos="zoom-in" data-aos-delay="${(idx + 1) * 70}" style="text-decoration: none; color: inherit;">
        <span class="category-card-badge">${cat.badge}</span>
        <div class="category-img-box">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
        </div>
        <span class="category-name">${cat.icon} ${cat.name}</span>
      </a>
    `;
  }).join("");

  if (typeof AOS !== "undefined") AOS.refresh();
}

// ----------------------------------------------------
// Product Catalog Filtering & Rendering
// ----------------------------------------------------
function filterCategory(catId) {
  appState.currentCategory = catId;

  // Sync filter pills UI
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(p => {
    if (p.getAttribute("data-cat") === catId) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  // Update Section Header
  const heading = document.getElementById("catalogHeading");
  const subHeading = document.getElementById("catalogSubheading");

  if (catId === "all") {
    heading.textContent = "Featured Decoration Packages";
    subHeading.textContent = "Browse popular balloon decor designs and book your preferred technician slot";
  } else {
    const matched = SITE_DATA.categories.find(c => c.id === catId);
    if (matched) {
      heading.textContent = `${matched.name} Packages`;
      subHeading.textContent = matched.desc;
    }
  }

  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  let items = [...SITE_DATA.products];

  // Category filter
  if (appState.currentCategory !== "all") {
    items = items.filter(item => item.category === appState.currentCategory);
  }

  // Sort
  if (appState.currentSort === "price-low") {
    items.sort((a, b) => a.price - b.price);
  } else if (appState.currentSort === "price-high") {
    items.sort((a, b) => b.price - a.price);
  } else if (appState.currentSort === "rating") {
    items.sort((a, b) => b.rating - a.rating);
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--gray-400);">
        <p style="font-size: 18px; font-weight: 700;">No decoration packages found in this category.</p>
        <button class="slide-btn" style="margin-top: 14px;" onclick="filterCategory('all')">View All Packages</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((product, idx) => `
    <div class="product-card" id="card-${product.id}" data-aos="fade-up" data-aos-delay="${((idx % 5) + 1) * 60}">
      <div class="product-img-wrapper" onclick="openProductModal('${product.id}')">
        <span class="product-badge badge-${product.badge.toLowerCase().replace(/\s+/g, '')}">${product.badge}</span>
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); openProductModal('${product.id}')">
          Quick View 🔍
        </button>
      </div>

      <div class="product-details">
        <span class="product-category-tag">${product.categoryName}</span>
        <h3 class="product-title" onclick="openProductModal('${product.id}')" style="cursor: pointer;">
          ${product.title}
        </h3>

        <div class="product-rating-row">
          <span class="rating-pill">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${product.rating.toFixed(1)}
          </span>
          <span class="reviews-count">${product.reviewsCount} reviews</span>
        </div>

        <div class="product-pricing-row">
          <span class="current-price">₹${product.price.toLocaleString("en-IN")}</span>
          <span class="original-price">₹${product.originalPrice.toLocaleString("en-IN")}</span>
          <span class="discount-tag">${product.discount}% off</span>
        </div>

        <div class="product-action-btns">
          <button class="book-now-btn" onclick="openProductModal('${product.id}')">
            Book Now ⚡
          </button>
        </div>
      </div>
    </div>
  `).join("");

  if (typeof AOS !== "undefined") {
    setTimeout(() => AOS.refresh(), 80);
  }
}

// ----------------------------------------------------
// Product Quick View & Detail Modal
// ----------------------------------------------------
function openProductModal(productId) {
  const product = SITE_DATA.products.find(p => p.id === productId);
  if (!product) return;

  appState.activeModalProduct = product;
  appState.selectedSlotInModal = SITE_DATA.timeSlots[0].id;
  appState.selectedAddonsInModal = [];

  // Populate info
  document.getElementById("modalProductTitle").textContent = product.title;
  document.getElementById("modalProductMainImg").src = product.image;
  document.getElementById("modalProductBadge").textContent = product.badge;
  document.getElementById("modalRating").textContent = product.rating.toFixed(1);
  document.getElementById("modalProductDesc").textContent = product.description;
  document.getElementById("modalCurrentPrice").textContent = `₹${product.price.toLocaleString("en-IN")}`;
  document.getElementById("modalOriginalPrice").textContent = `₹${product.originalPrice.toLocaleString("en-IN")}`;
  document.getElementById("modalDiscount").textContent = `${product.discount}% off`;
  document.getElementById("modalSetupDuration").textContent = product.setupDuration;

  // Inclusions
  const inclusionsList = document.getElementById("modalInclusionsList");
  inclusionsList.innerHTML = product.inclusions.map(inc => `
    <li>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${inc}</span>
    </li>
  `).join("");

  // Slots
  renderModalSlots();

  // Addons
  renderModalAddons();

  // Show modal
  document.getElementById("productModalOverlay").classList.add("active");
}

function closeProductModal() {
  document.getElementById("productModalOverlay").classList.remove("active");
}

function renderModalSlots() {
  const container = document.getElementById("slotPickerGrid");
  container.innerHTML = SITE_DATA.timeSlots.map(slot => {
    const isSelected = slot.id === appState.selectedSlotInModal;
    return `
      <button class="slot-btn ${isSelected ? 'active' : ''}" onclick="selectModalSlot('${slot.id}')">
        <span class="slot-time">${slot.time}</span>
        <span class="slot-tag">${slot.label} • ${slot.tag}</span>
      </button>
    `;
  }).join("");
}

function selectModalSlot(slotId) {
  appState.selectedSlotInModal = slotId;
  renderModalSlots();
}

function renderModalAddons() {
  const container = document.getElementById("addonsChecklist");
  container.innerHTML = SITE_DATA.addons.map(addon => {
    const isChecked = appState.selectedAddonsInModal.includes(addon.id);
    return `
      <label class="addon-label">
        <div class="addon-left">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleModalAddon('${addon.id}', this.checked)" />
          <span>${addon.icon} ${addon.name}</span>
        </div>
        <span class="addon-price">+₹${addon.price}</span>
      </label>
    `;
  }).join("");
}

function toggleModalAddon(addonId, checked) {
  if (checked) {
    if (!appState.selectedAddonsInModal.includes(addonId)) {
      appState.selectedAddonsInModal.push(addonId);
    }
  } else {
    appState.selectedAddonsInModal = appState.selectedAddonsInModal.filter(id => id !== addonId);
  }
}

function handleAddToCartFromModal() {
  if (!appState.activeModalProduct) return;

  const product = appState.activeModalProduct;
  const slotObj = SITE_DATA.timeSlots.find(s => s.id === appState.selectedSlotInModal) || SITE_DATA.timeSlots[0];
  const dateVal = appState.selectedDateInModal || new Date().toISOString().split("T")[0];

  const addonsList = SITE_DATA.addons.filter(a => appState.selectedAddonsInModal.includes(a.id));

  // Add item
  const cartItem = {
    cartItemId: Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    product: product,
    date: dateVal,
    slot: slotObj,
    addons: addonsList
  };

  appState.cart.push(cartItem);
  saveCart();
  closeProductModal();
  openCart();
  showToast(`🎉 "${product.title}" added to cart!`);
}

function handleInstantBookFromModal() {
  handleAddToCartFromModal();
  openCheckoutModal();
}

// ----------------------------------------------------
// Cart Slide-Over Drawer
// ----------------------------------------------------
function openCart() {
  renderCart();
  document.getElementById("cartDrawerOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cartDrawerOverlay").classList.remove("active");
}

function updateCartBadge() {
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = appState.cart.length;
    badge.style.display = appState.cart.length > 0 ? "flex" : "none";
  }
}

function saveCart() {
  localStorage.setItem("balloondekor_cart", JSON.stringify(appState.cart));
  updateCartBadge();
}

function removeCartItem(cartItemId) {
  appState.cart = appState.cart.filter(item => item.cartItemId !== cartItemId);
  saveCart();
  renderCart();
  showToast("Item removed from cart");
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const footer = document.getElementById("cartFooter");

  if (appState.cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--gray-700); margin-bottom: 6px;">Your cart is empty</h4>
        <p style="font-size: 13px; margin-bottom: 16px;">Pick a stunning celebration package and choose your slot!</p>
        <button class="slide-btn" onclick="closeCart(); filterCategory('all');">Explore Decorations</button>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "flex";

  // Calculate totals
  let subtotal = 0;
  appState.cart.forEach(item => {
    subtotal += item.product.price;
    item.addons.forEach(addon => subtotal += addon.price);
  });

  let discount = 0;
  if (appState.appliedCoupon === "CELEBRATE10") {
    discount = Math.round(subtotal * 0.10);
  } else if (appState.appliedCoupon === "BALLOON500") {
    discount = Math.min(500, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discount);

  // In Cart items
  body.innerHTML = appState.cart.map(item => {
    let itemPrice = item.product.price;
    item.addons.forEach(a => itemPrice += a.price);

    const addonsText = item.addons.length > 0
      ? `<div style="font-size: 11px; color: var(--brand-700); margin-top: 4px;">+ Add-ons: ${item.addons.map(a => a.name).join(", ")}</div>`
      : "";

    return `
      <div class="cart-item-card">
        <img src="${item.product.image}" class="cart-item-img" alt="${item.product.title}" />
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.product.title}</h4>
          <div class="cart-item-meta">
            <span>📅 ${item.date}</span> • <span>⏰ ${item.slot.time}</span>
          </div>
          ${addonsText}
          <div class="cart-item-bottom">
            <span class="cart-item-price">₹${itemPrice.toLocaleString("en-IN")}</span>
            <button class="cart-item-delete-btn" onclick="removeCartItem('${item.cartItemId}')">
              🗑️ Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Update Bill summary
  document.getElementById("billSubtotal").textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  const discountRow = document.getElementById("billDiscountRow");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("billDiscount").textContent = `-₹${discount.toLocaleString("en-IN")}`;
  } else {
    discountRow.style.display = "none";
  }
  document.getElementById("billGrandTotal").textContent = `₹${grandTotal.toLocaleString("en-IN")}`;
}

function applyCoupon() {
  const code = (document.getElementById("couponInput").value || "").trim().toUpperCase();
  if (code === "CELEBRATE10") {
    appState.appliedCoupon = "CELEBRATE10";
    showToast("🎉 10% discount applied successfully!");
    renderCart();
  } else if (code === "BALLOON500") {
    appState.appliedCoupon = "BALLOON500";
    showToast("🎉 ₹500 discount coupon applied!");
    renderCart();
  } else {
    showToast("⚠️ Invalid coupon code. Try CELEBRATE10");
  }
}

// ----------------------------------------------------
// Checkout Modal & Order Placement
// ----------------------------------------------------
function openCheckoutModal() {
  if (appState.cart.length === 0) {
    showToast("Your cart is empty! Add a decoration package first.");
    return;
  }
  closeCart();

  // Compute payable
  let subtotal = 0;
  appState.cart.forEach(item => {
    subtotal += item.product.price;
    item.addons.forEach(a => subtotal += a.price);
  });
  let discount = appState.appliedCoupon === "CELEBRATE10" ? Math.round(subtotal * 0.10) : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  document.getElementById("checkoutPayAmount").textContent = `₹${grandTotal.toLocaleString("en-IN")}`;
  document.getElementById("checkoutModalOverlay").classList.add("active");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModalOverlay").classList.remove("active");
}

function handleOrderSubmission(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const orderId = "BD-" + Math.floor(100000 + Math.random() * 900000);

  const firstItem = appState.cart[0];
  const dateStr = firstItem.date;
  const slotStr = firstItem.slot.time;

  // Render Festive Booking Success Screen
  const body = document.getElementById("checkoutBody");
  body.innerHTML = `
    <div style="text-align: center; padding: 24px 10px;">
      <div style="font-size: 60px; margin-bottom: 12px; animation: bounce 1s infinite alternate;">🎈🥳✨</div>
      <h3 style="font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 6px;">
        Decoration Slot Confirmed!
      </h3>
      <p style="font-size: 13.5px; color: var(--gray-600); margin-bottom: 20px;">
        Thank you, <strong>${name}</strong>! Your booking has been registered under <strong>Order #${orderId}</strong>.
      </p>

      <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 16px; text-align: left; font-size: 13px; margin-bottom: 20px;">
        <div style="margin-bottom: 6px;">📍 <strong>City & Venue:</strong> ${appState.selectedCity} (${address})</div>
        <div style="margin-bottom: 6px;">📅 <strong>Event Date:</strong> ${dateStr}</div>
        <div style="margin-bottom: 6px;">⏰ <strong>Technician Arrival:</strong> ${slotStr}</div>
        <div>📞 <strong>Updates to:</strong> +91 ${phone}</div>
      </div>

      <p style="font-size: 12px; color: var(--gray-500); margin-bottom: 20px;">
        Our certified Celebration Events decorator will arrive with high-speed electric pumps, wall-safe paper tape, and sanitized tools.
      </p>

      <div style="display: flex; gap: 10px; justify-content: center;">
        <a href="https://wa.me/918282025444?text=Hello,%20I%20just%20booked%20Order%20${orderId}%20for%20${encodeURIComponent(name)}" target="_blank" class="slide-btn" style="background: #25d366; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
          Get WhatsApp Updates 📲
        </a>
        <button class="slide-btn" style="background: var(--gray-900);" onclick="closeCheckoutModal(); window.location.reload();">
          Done
        </button>
      </div>
    </div>
  `;

  // Empty cart
  appState.cart = [];
  saveCart();
}

// ----------------------------------------------------
// Live Search Modal
// ----------------------------------------------------
function openSearchModal() {
  const overlay = document.getElementById("searchModalOverlay");
  overlay.classList.add("active");
  const input = document.getElementById("liveSearchInput");
  setTimeout(() => input.focus(), 100);
  handleLiveSearch();
}

function closeSearchModal() {
  document.getElementById("searchModalOverlay").classList.remove("active");
}

function quickSearch(tag) {
  const input = document.getElementById("liveSearchInput");
  input.value = tag;
  handleLiveSearch();
}

function handleLiveSearch() {
  const query = (document.getElementById("liveSearchInput").value || "").trim().toLowerCase();
  const resultsContainer = document.getElementById("searchResultsContainer");

  let matches = SITE_DATA.products;
  if (query.length > 0) {
    matches = matches.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--gray-400); font-size: 13px;">
        No packages matching "${query}". Try searching "Birthday", "Kids" or "Anniversary".
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = matches.slice(0, 8).map(p => `
    <div class="search-result-item" onclick="closeSearchModal(); openProductModal('${p.id}')">
      <img src="${p.image}" class="search-item-thumb" alt="${p.title}" />
      <div class="search-item-info">
        <div class="search-item-title">${p.title}</div>
        <div style="font-size: 11px; color: var(--gray-400);">${p.categoryName} • ${p.setupDuration}</div>
      </div>
      <div class="search-item-price">₹${p.price.toLocaleString("en-IN")}</div>
    </div>
  `).join("");
}

// ----------------------------------------------------
// Reviews & FAQ Dynamic Rendering
// ----------------------------------------------------
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = SITE_DATA.reviews.map((rev, idx) => `
    <div class="review-card" data-aos="fade-up" data-aos-delay="${(idx + 1) * 80}">
      <div>
        <div class="review-stars">★★★★★</div>
        <p class="review-quote">"${rev.text}"</p>
      </div>
      <div class="review-user-row">
        <div class="user-avatar">${rev.name.charAt(0)}</div>
        <div class="user-meta">
          <h5>${rev.name} ${rev.verified ? '<span style="color: var(--accent-green); font-weight: 800;">✓ Verified</span>' : ''}</h5>
          <span>${rev.city} • ${rev.date}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function renderFaqs() {
  const container = document.getElementById("faqList");
  if (!container) return;

  container.innerHTML = SITE_DATA.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}" data-aos="fade-up" data-aos-delay="${(idx + 1) * 50}">
      <button class="faq-question" onclick="toggleFaq(this)">
        <span>${faq.q}</span>
        <span class="faq-chevron">⌄</span>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join("");
}

function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  item.classList.toggle("open");
}

// ----------------------------------------------------
// Mobile Sidebar & Keyboard Shortcuts
// ----------------------------------------------------
function openMobileSidebar() {
  const overlay = document.getElementById("mobileSidebarOverlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMobileSidebar() {
  const overlay = document.getElementById("mobileSidebarOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Cmd+K or Ctrl+K for search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    }
    // Escape key closes modals
    if (e.key === "Escape") {
      closeCityModal();
      closeSearchModal();
      closeProductModal();
      closeCart();
      closeCheckoutModal();
      closeMobileSidebar();
    }
  });
}

function openLoginPrompt() {
  showToast("🔐 Decorator & Client Portal: Please enter your mobile to receive an OTP.");
}

// Toast notification helper
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ----------------------------------------------------
// Star SIP Streaming & Tactile Animation for Book Now Button
// ----------------------------------------------------
function initBookNowAnimations() {
  document.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest(".book-now-btn");
    if (!btn) return;

    // Create ripple effect on Book Now click
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "btn-ripple-wave btn-ripple-light";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// ----------------------------------------------------
// Auto-Scroll Active Navigation Tab into View (Mobile Optimization)
// ----------------------------------------------------
function scrollActiveNavIntoView() {
  const rawPath = window.location.pathname.split("/").pop() || "index.html";
  const currentPath = rawPath.toLowerCase();
  const triggers = document.querySelectorAll(".secondary-nav .nav-trigger");
  if (!triggers.length) return;

  let activeBtn = null;

  triggers.forEach(t => {
    t.classList.remove("active");
    t.closest(".nav-item")?.classList.remove("active");
    if (t.style.borderBottom) t.style.borderBottom = "";

    const href = (t.getAttribute("href") || "").toLowerCase().split("/").pop();
    if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
      activeBtn = t;
    }
  });

  // Fallback match based on page path keywords
  if (!activeBtn) {
    triggers.forEach(t => {
      const text = t.textContent.toLowerCase();
      if (currentPath.includes("kid") && text.includes("kid")) activeBtn = t;
      else if (currentPath.includes("anniversary") && text.includes("anniversary")) activeBtn = t;
      else if (currentPath.includes("birthday") && text.includes("birthday")) activeBtn = t;
      else if ((currentPath.includes("shower") || currentPath.includes("baby")) && text.includes("baby")) activeBtn = t;
      else if (currentPath.includes("wedding") && text.includes("wedding")) activeBtn = t;
      else if (currentPath.includes("corporate") && text.includes("corporate")) activeBtn = t;
    });
  }

  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.closest(".nav-item")?.classList.add("active");

    const scrollContainer = activeBtn.closest(".nav-container") || activeBtn.closest(".secondary-nav");
    if (scrollContainer) {
      const performScroll = () => {
        const containerRect = scrollContainer.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const currentScroll = scrollContainer.scrollLeft;
        // Exact pixel distance of the button from the left edge of scroll content
        const btnRelativeLeft = (btnRect.left - containerRect.left) + currentScroll;
        const targetScrollLeft = btnRelativeLeft - (containerRect.width / 2) + (btnRect.width / 2);

        scrollContainer.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth"
        });
      };

      // Perform centering immediately and follow up after fonts/layout settle
      performScroll();
      setTimeout(performScroll, 100);
      setTimeout(performScroll, 300);
    }
  }
}

window.addEventListener("load", () => {
  try { scrollActiveNavIntoView(); } catch(e){}
});
window.addEventListener("resize", () => {
  try { scrollActiveNavIntoView(); } catch(e){}
});

// ----------------------------------------------------
// ----------------------------------------------------
// App Launch Splash Screen (Typewriter without cursor line)
// ----------------------------------------------------
function initSplashScreen() {
  // Only show on homepage or initial website entry
  const rawPath = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isHomepage = rawPath === "" || rawPath === "index.html";

  // In self-contained style block to guarantee full-screen rendering regardless of browser cache
  if (!document.getElementById("splashDynamicStyles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "splashDynamicStyles";
    styleTag.textContent = `
      .splash-screen {
        position: fixed !important;
        inset: 0 !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        background: radial-gradient(circle at center, #240a1a 0%, #090207 100%) !important;
        z-index: 999999999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), 
                    filter 0.65s ease !important;
      }
      .splash-screen.hide-splash {
        opacity: 0 !important;
        transform: scale(1.06) !important;
        filter: blur(10px) !important;
        pointer-events: none !important;
      }
      .splash-content {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        padding: 24px !important;
        position: relative !important;
        z-index: 2 !important;
      }
      .splash-balloon-box {
        position: relative !important;
        width: 96px !important;
        height: 96px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-bottom: 20px !important;
      }
      .splash-balloon {
        font-size: 64px !important;
        display: inline-block !important;
        animation: splashBalloonFloat 2.2s ease-in-out infinite alternate !important;
        filter: drop-shadow(0 12px 28px rgba(225, 29, 72, 0.65)) !important;
      }
      @keyframes splashBalloonFloat {
        0% { transform: translateY(0px) rotate(-4deg) scale(1); }
        100% { transform: translateY(-16px) rotate(4deg) scale(1.08); }
      }
      .splash-glow {
        position: absolute !important;
        width: 160px !important;
        height: 160px !important;
        background: radial-gradient(circle, rgba(225, 29, 72, 0.45) 0%, rgba(225, 29, 72, 0) 70%) !important;
        border-radius: 50% !important;
        animation: splashGlowPulse 2.2s ease-in-out infinite alternate !important;
        z-index: -1 !important;
      }
      @keyframes splashGlowPulse {
        0% { transform: scale(0.85); opacity: 0.4; }
        100% { transform: scale(1.35); opacity: 0.9; }
      }
      .splash-brand-title {
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;
        font-size: 36px !important;
        font-weight: 800 !important;
        letter-spacing: -0.5px !important;
        color: #ffffff !important;
        min-height: 48px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: linear-gradient(135deg, #ffffff 40%, #fda4af 85%, #f43f5e 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        margin-bottom: 8px !important;
      }
      .splash-brand-title::after, .splash-brand-title::before,
      #splashTypewriterText::after, #splashTypewriterText::before {
        display: none !important;
        content: none !important;
        border: none !important;
      }
      .splash-tagline {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #f472b6 !important;
        letter-spacing: 0.4px !important;
        opacity: 0 !important;
        transform: translateY(10px) !important;
        transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        margin-bottom: 24px !important;
      }
      .splash-tagline.show {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .splash-loader-bar {
        width: 160px !important;
        height: 3.5px !important;
        background: rgba(255, 255, 255, 0.15) !important;
        border-radius: 99px !important;
        overflow: hidden !important;
        position: relative !important;
      }
      .splash-loader-fill {
        width: 0% !important;
        height: 100% !important;
        background: linear-gradient(90deg, #f43f5e, #fb7185, #ffffff) !important;
        border-radius: 99px !important;
        transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
        box-shadow: 0 0 12px rgba(244, 63, 94, 0.9) !important;
      }
      @media (max-width: 640px) {
        .splash-brand-title { font-size: 26px !important; min-height: 38px !important; }
        .splash-balloon { font-size: 52px !important; }
        .splash-balloon-box { width: 76px !important; height: 76px !important; margin-bottom: 14px !important; }
        .splash-tagline { font-size: 12px !important; margin-bottom: 20px !important; }
        .splash-loader-bar { width: 130px !important; }
      }
    `;
    document.head.appendChild(styleTag);
  }

  // If not on homepage and user hasn't explicitly entered a splash container, don't interrupt category browsing
  if (!isHomepage && !document.getElementById("splashScreen")) {
    return;
  }

  let splash = document.getElementById("splashScreen");
  if (!splash) {
    splash = document.createElement("div");
    splash.id = "splashScreen";
    splash.className = "splash-screen";
    splash.innerHTML = `
      <div class="splash-content">
        <div class="splash-balloon-box">
          <span class="splash-balloon">🎈</span>
          <div class="splash-glow"></div>
        </div>
        <div class="splash-title-wrap">
          <h1 class="splash-brand-title">
            <span id="splashTypewriterText"></span>
          </h1>
        </div>
        <p class="splash-tagline" id="splashTagline">India's Trusted Party & Event Expert ✨</p>
        <div class="splash-loader-bar">
          <div class="splash-loader-fill"></div>
        </div>
      </div>
    `;
    document.body.prepend(splash);
  }

  const textEl = document.getElementById("splashTypewriterText");
  const taglineEl = document.getElementById("splashTagline");
  const loaderEl = splash.querySelector(".splash-loader-fill");
  if (!textEl) return;

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const brandText = "Celebration Events®";
  let charIdx = 0;
  textEl.textContent = "";

  if (loaderEl) {
    setTimeout(() => {
      loaderEl.style.width = "100%";
    }, 80);
  }

  // Typewriter effect without any cursor line
  const typingTimer = setInterval(() => {
    if (charIdx < brandText.length) {
      textEl.textContent += brandText.charAt(charIdx);
      charIdx++;
    } else {
      clearInterval(typingTimer);

      // Fade in tagline
      if (taglineEl) taglineEl.classList.add("show");

      // Hold briefly to admire brand name, then smoothly reveal website
      setTimeout(() => {
        splash.classList.add("hide-splash");
        document.body.style.overflow = originalOverflow || "";

        setTimeout(() => {
          splash.remove();
        }, 700);
      }, 700);
    }
  }, 60);
}



