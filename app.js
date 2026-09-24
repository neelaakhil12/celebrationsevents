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
  carouselTimer: null,
  showAllProducts: false
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

  // Filter pills (Home page main catalog)
  const homeFilterPills = document.querySelectorAll("#filterPills .filter-pill");
  homeFilterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = pill.getAttribute("data-cat");
      if (!cat) return;
      homeFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
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
// Hero Banner Carousel (Manual Controls)
// ----------------------------------------------------
function initHeroCarousel() {
  const slidesContainer = document.getElementById("carouselSlides");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const heroEl = document.getElementById("heroCarousel");

  const totalSlides = dots.length;
  if (!totalSlides) return;

  // Clear any existing timer so banners do NOT scroll automatically
  if (appState.carouselTimer) {
    clearInterval(appState.carouselTimer);
    appState.carouselTimer = null;
  }

  function goToSlide(index) {
    appState.carouselIndex = (index + totalSlides) % totalSlides;
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${appState.carouselIndex * 100}%)`;
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === appState.carouselIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(appState.carouselIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(appState.carouselIndex + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      if (!isNaN(idx)) goToSlide(idx);
    });
  });

  // Touch swipe support for mobile devices
  if (heroEl) {
    let startX = 0;
    let endX = 0;
    heroEl.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    heroEl.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(appState.carouselIndex + 1); // Swipe left -> Next
        } else {
          goToSlide(appState.carouselIndex - 1); // Swipe right -> Prev
        }
      }
    }, { passive: true });
  }

  // Ensure first slide is active initially
  goToSlide(appState.carouselIndex || 0);
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
  appState.showAllProducts = false;

  // Sync filter pills UI on home page
  const pills = document.querySelectorAll("#filterPills .filter-pill");
  if (catId) {
    pills.forEach(p => {
      if (p.getAttribute("data-cat") === catId) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
  }

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

function getProductsPerRow() {
  if (window.innerWidth >= 1340) return 5;
  if (window.innerWidth > 1024) return 4;
  if (window.innerWidth > 640) return 3;
  return 2;
}

function toggleShowAllProducts() {
  appState.showAllProducts = !appState.showAllProducts;
  renderProducts();
  if (!appState.showAllProducts) {
    const catalogSec = document.getElementById("catalogSection");
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function renderProducts() {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  const moreContainer = document.getElementById("catalogMoreWrap");

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
    if (moreContainer) moreContainer.innerHTML = "";
    return;
  }

  const rowSize = getProductsPerRow();
  const isCategoryFilter = appState.currentCategory && appState.currentCategory !== "all";

  // For specific category, show exactly 1 row; for all, show up to 3 rows
  const maxItemsLimit = isCategoryFilter ? rowSize : (rowSize * 3);
  const maxItems = appState.showAllProducts ? items.length : maxItemsLimit;
  const visibleItems = items.slice(0, maxItems);

  container.innerHTML = visibleItems.map((product, idx) => `
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

  // Render Action / Redirection button below products
  if (moreContainer) {
    if (isCategoryFilter) {
      const catRedirectMap = {
        "birthday": { url: "birthday.html", label: "View More Birthday Packages" },
        "anniversary": { url: "anniversary.html", label: "View More Romantic & Anniversary Packages" },
        "kids": { url: "kids.html", label: "View More Kids Themes Packages" },
        "baby-shower": { url: "baby-shower.html", label: "View More Baby Shower Packages" },
        "wedding": { url: "wedding.html", label: "View More Wedding Packages" },
        "corporate": { url: "corporate.html", label: "View More Corporate Packages" },
        "gifts": { url: "marketplace.html", label: "View More Gifts & Hampers" }
      };
      const target = catRedirectMap[appState.currentCategory] || {
        url: `${appState.currentCategory}.html`,
        label: `View More Packages`
      };

      moreContainer.innerHTML = `
        <a href="${target.url}" class="catalog-view-all-btn" style="text-decoration: none;" aria-label="${target.label}">
          <span>${target.label}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="arrow-right">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      `;
    } else {
      if (items.length > maxItemsLimit) {
        if (!appState.showAllProducts) {
          const remainingCount = items.length - visibleItems.length;
          moreContainer.innerHTML = `
            <button class="catalog-view-all-btn" onclick="toggleShowAllProducts()" aria-label="View all packages">
              <span>View All Packages (${remainingCount} More)</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          `;
        } else {
          moreContainer.innerHTML = `
            <button class="catalog-view-all-btn show-less" onclick="toggleShowAllProducts()" aria-label="Show less packages">
              <span>Show Less (3 Rows)</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
          `;
        }
      } else {
        moreContainer.innerHTML = "";
      }
    }
  }

  if (typeof AOS !== "undefined") {
    setTimeout(() => AOS.refresh(), 80);
  }
}

// ----------------------------------------------------
// ----------------------------------------------------
// Fullscreen Package Details View
// ----------------------------------------------------
function openProductModal(productId) {
  if (!productId) return;
  const currentPath = window.location.pathname.toLowerCase();
  if (currentPath.includes("blog")) {
    return; // Do not redirect or open package modal on blog pages
  }
  const isPackagePage = currentPath.includes("package");
  if (isPackagePage) {
    if (typeof loadPackageData === "function") {
      history.replaceState(null, "", `package.html?id=${encodeURIComponent(productId)}`);
      loadPackageData(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof initPackagePage === "function") {
      history.replaceState(null, "", `package.html?id=${encodeURIComponent(productId)}`);
      initPackagePage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }
  window.location.href = `package.html?id=${encodeURIComponent(productId)}`;
  return;
  const product = SITE_DATA.products.find(p => p.id === productId);
  if (!product) return;

  appState.activeModalProduct = product;
  appState.selectedSlotInModal = SITE_DATA.timeSlots[0].id;
  appState.selectedAddonsInModal = [];

  // Populate title & breadcrumb
  const titleEl = document.getElementById("modalProductTitle");
  if (titleEl) titleEl.textContent = product.title;

  const breadcrumbEl = document.getElementById("modalPkgBreadcrumbTitle");
  if (breadcrumbEl) breadcrumbEl.textContent = product.title;

  const catEl = document.getElementById("modalPkgCategory");
  if (catEl) catEl.textContent = product.categoryName || "Birthday Decoration";

  const catPill = document.getElementById("modalCategoryPill");
  if (catPill) catPill.textContent = (product.categoryName || "CELEBRATION DECORATION").toUpperCase();

  // Image & Badge
  const imgEl = document.getElementById("modalProductMainImg");
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.title;
  }

  const badgeEl = document.getElementById("modalProductBadge");
  if (badgeEl) {
    badgeEl.textContent = product.badge || "BESTSELLER";
    badgeEl.className = `product-badge badge-${(product.badge || 'bestseller').toLowerCase().replace(/\s+/g, '')}`;
  }

  // Rating & description
  const ratingEl = document.getElementById("modalRating");
  if (ratingEl) ratingEl.textContent = product.rating.toFixed(1);

  const descEl = document.getElementById("modalProductDesc");
  if (descEl) descEl.textContent = product.description;

  // Pricing
  const currPriceEl = document.getElementById("modalCurrentPrice");
  if (currPriceEl) currPriceEl.textContent = `₹${product.price.toLocaleString("en-IN")}`;

  const origPriceEl = document.getElementById("modalOriginalPrice");
  if (origPriceEl) origPriceEl.textContent = `₹${product.originalPrice.toLocaleString("en-IN")}`;

  const discEl = document.getElementById("modalDiscount");
  if (discEl) discEl.textContent = `${product.discount}% off`;

  const durationEl = document.getElementById("modalSetupDuration");
  if (durationEl) durationEl.textContent = product.setupDuration || "2 Hours";

  // Date selection (default today, min today)
  const dateInput = document.getElementById("bookingDateInput");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    if (!dateInput.value || dateInput.value < today) {
      dateInput.value = today;
    }
    appState.selectedDateInModal = dateInput.value;
    dateInput.onchange = (e) => {
      appState.selectedDateInModal = e.target.value;
    };
  }

  // Delivery Location
  const cityEl = document.getElementById("modalDeliveringCity");
  if (cityEl) cityEl.textContent = appState.selectedCity || "Delhi NCR";

  // Tab 1: Inclusions 2-column checklist (Screenshot 2 Match)
  const incCount = document.getElementById("modalIncludedCount");
  if (incCount) incCount.textContent = `${(product.inclusions || []).length} items`;

  const incGrid = document.getElementById("modalInclusionsGrid");
  if (incGrid) {
    incGrid.innerHTML = (product.inclusions || []).map(inc => `
      <div class="included-item">
        <span class="included-check-icon">✓</span>
        <span>${inc}</span>
      </div>
    `).join("");
  }

  const tabDuration = document.getElementById("modalTabDuration");
  if (tabDuration) tabDuration.textContent = product.setupDuration || "2 Hours";

  // About Package description (Screenshot 2 Match)
  const aboutBody = document.getElementById("modalAboutPackageBody");
  if (aboutBody) {
    aboutBody.innerHTML = `
      <p>${product.description || ""}</p>
      <p style="margin-top: 10px; color: var(--gray-600);">
        ${product.title} offers an easy, no-fuss celebration setup with premium balloons and party props for a neat finish. It is tailored for special celebrations and works well in a living room, bedroom, terrace, or any wall corner you'd like to turn into a joyful party focal point. Order this setup for a quick, verified, and budget-friendly decoration at home.
      </p>
    `;
  }

  // Reset tab to 'included'
  const firstTabBtn = document.querySelector(".pkg-tab-btn");
  if (firstTabBtn) switchPkgTab("included", firstTabBtn);

  // Render Time Slots & Visual Add-ons (Screenshot 1 Match)
  renderModalSlots();
  activeAddonsFilter = "all";
  const allAddonPills = document.querySelectorAll(".addon-cat-pill");
  allAddonPills.forEach((p, idx) => {
    if (idx === 0) p.classList.add("active");
    else p.classList.remove("active");
  });
  renderVisualAddons("all");

  // Update Live Pricing
  updateModalLivePrice();

  // Render Related Packages for this category
  renderRelatedPackages(product);

  // Update WhatsApp links with pre-filled message
  const waMsg = encodeURIComponent(`Hi Celebration Events, I would like to book/customize "${product.title}" (₹${product.price.toLocaleString("en-IN")}) in ${appState.selectedCity || 'Delhi NCR'}. Please confirm availability!`);
  const topWa = document.getElementById("modalWhatsappTopBtn");
  if (topWa) topWa.href = `https://wa.me/919999999999?text=${waMsg}`;
  const directWa = document.getElementById("modalDirectWaLink");
  if (directWa) directWa.href = `https://wa.me/919999999999?text=${waMsg}`;

  // Open Fullscreen Overlay
  const overlay = document.getElementById("productModalOverlay");
  if (overlay) {
    overlay.classList.add("active");
    const bodyScroll = overlay.querySelector(".fullscreen-pkg-body") || overlay;
    bodyScroll.scrollTop = 0;
  }
  document.body.style.overflow = "hidden";

  // Sync browser URL hash smoothly
  try {
    if (window.location.hash !== `#package-${product.id}`) {
      history.pushState({ packageOpen: product.id }, "", `#package-${product.id}`);
    }
  } catch(e) {}
}

function closeProductModal() {
  const overlay = document.getElementById("productModalOverlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";

  try {
    if (window.location.hash.startsWith("#package-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  } catch(e) {}
}

// ----------------------------------------------------
// Tabs Navigation (Screenshot 2)
// ----------------------------------------------------
function switchPkgTab(tabKey, btn) {
  const allBtns = document.querySelectorAll(".pkg-tab-btn");
  allBtns.forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const allPanes = document.querySelectorAll(".pkg-tab-pane");
  allPanes.forEach(p => p.classList.remove("active"));

  const targetPane = document.getElementById(`tabPane${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`);
  if (targetPane) targetPane.classList.add("active");
}

// ----------------------------------------------------
// Visual Add-ons Management (Screenshot 1)
// ----------------------------------------------------
let activeAddonsFilter = "all";

function filterModalAddons(category, btn) {
  activeAddonsFilter = category;
  const allPills = document.querySelectorAll(".addon-cat-pill");
  allPills.forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderVisualAddons(category);
}

function renderVisualAddons(category = "all") {
  const container = document.getElementById("addonsCardsSlider");
  if (!container) return;

  let items = SITE_DATA.addons || [];
  if (category === "bestseller") {
    items = items.filter(a => a.category === "bestseller" || a.badge === "Bestseller");
  } else if (category === "cake") {
    items = items.filter(a => a.category === "cake");
  } else if (category === "more") {
    items = items.filter(a => a.category === "more");
  }

  container.innerHTML = items.map(addon => {
    const isSelected = appState.selectedAddonsInModal.includes(addon.id);
    return `
      <div class="addon-visual-card ${isSelected ? 'selected' : ''}" onclick="toggleModalAddon('${addon.id}')">
        ${addon.badge ? `<span class="addon-card-badge">${addon.badge}</span>` : ''}
        <div class="addon-thumb-box">
          <img src="${addon.image}" alt="${addon.name}" loading="lazy" />
          <button class="addon-add-btn ${isSelected ? 'added' : ''}" onclick="event.stopPropagation(); toggleModalAddon('${addon.id}')" aria-label="Add addon">
            ${isSelected ? '✓' : '+'}
          </button>
        </div>
        <div class="addon-card-body">
          <h5 class="addon-card-title">${addon.name}</h5>
          <span class="addon-card-price">₹${addon.price.toLocaleString("en-IN")}</span>
        </div>
      </div>
    `;
  }).join("");
}

function toggleModalAddon(addonId) {
  if (appState.selectedAddonsInModal.includes(addonId)) {
    appState.selectedAddonsInModal = appState.selectedAddonsInModal.filter(id => id !== addonId);
  } else {
    appState.selectedAddonsInModal.push(addonId);
  }
  renderVisualAddons(activeAddonsFilter);
  updateModalLivePrice();
}

function updateModalLivePrice() {
  if (!appState.activeModalProduct) return;
  const basePrice = appState.activeModalProduct.price;
  const addonsTotal = (appState.selectedAddonsInModal || []).reduce((sum, addonId) => {
    const addon = (SITE_DATA.addons || []).find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const grandTotal = basePrice + addonsTotal;

  const baseEl = document.getElementById("modalCalcBasePrice");
  if (baseEl) baseEl.textContent = `₹${basePrice.toLocaleString("en-IN")}`;

  const addonsRow = document.getElementById("modalAddonsCalcRow");
  const addonsVal = document.getElementById("modalCalcAddonsPrice");
  if (addonsRow && addonsVal) {
    if (addonsTotal > 0) {
      addonsRow.style.display = "flex";
      addonsVal.textContent = `+₹${addonsTotal.toLocaleString("en-IN")}`;
    } else {
      addonsRow.style.display = "none";
    }
  }

  const grandEl = document.getElementById("modalGrandTotal");
  if (grandEl) grandEl.textContent = `₹${grandTotal.toLocaleString("en-IN")}`;
}

function renderModalSlots() {
  const container = document.getElementById("slotPickerGrid");
  if (!container) return;
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

function renderRelatedPackages(currentProduct) {
  const container = document.getElementById("relatedPackagesSlider");
  const catNameEl = document.getElementById("relatedCategoryName");
  if (!container || !currentProduct) return;

  if (catNameEl) {
    catNameEl.textContent = currentProduct.categoryName || "Celebration";
  }

  // Filter packages in same category (excluding currently active product)
  let related = (SITE_DATA.products || []).filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);

  // If fewer than 3, complement with trending products from other categories
  if (related.length < 3) {
    const others = (SITE_DATA.products || []).filter(p => p.id !== currentProduct.id && !related.some(r => r.id === p.id));
    related = [...related, ...others].slice(0, 8);
  }

  const section = document.getElementById("pkgRelatedSection");
  if (related.length === 0) {
    if (section) section.style.display = "none";
    return;
  } else {
    if (section) section.style.display = "flex";
  }

  container.innerHTML = related.map(pkg => `
    <div class="related-pkg-card" onclick="openProductModal('${pkg.id}')">
      <div class="related-pkg-img-wrap">
        <span class="related-pkg-badge">${pkg.badge || 'POPULAR'}</span>
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" />
      </div>
      <div class="related-pkg-body">
        <div class="related-pkg-rating">
          <span>★</span>
          <span>${pkg.rating ? pkg.rating.toFixed(1) : '4.9'}</span>
          <span style="color: var(--gray-400); font-weight: 500;">(${pkg.reviewsCount || 100}+)</span>
        </div>
        <h4 class="related-pkg-title" title="${pkg.title}">${pkg.title}</h4>
        <div class="related-pkg-prices">
          <span class="related-pkg-current">₹${pkg.price.toLocaleString("en-IN")}</span>
          <span class="related-pkg-orig">₹${pkg.originalPrice.toLocaleString("en-IN")}</span>
          <span class="related-pkg-discount">${pkg.discount}% off</span>
        </div>
        <button class="related-pkg-btn" type="button" onclick="event.stopPropagation(); openProductModal('${pkg.id}')">
          View Setup →
        </button>
      </div>
    </div>
  `).join("");
}

function scrollRelatedPackages(direction) {
  const container = document.getElementById("relatedPackagesSlider");
  if (!container) return;
  const scrollAmount = 300 * direction;
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
// Reviews & FAQ Dynamic Rendering (2-Row Streaming Video/Photo Showcase)
// ----------------------------------------------------
function createStreamReviewCard(rev) {
  const isVideo = rev.type === "video";
  return `
    <div class="stream-review-card ${isVideo ? 'is-video' : 'is-photo'}" 
         onclick="openReviewMediaModal('${rev.id}')"
         onmouseenter="${isVideo ? "try{this.querySelector('video').play();}catch(e){}" : ""}"
         onmouseleave="${isVideo ? "try{const v=this.querySelector('video'); v.pause(); v.currentTime=0;}catch(e){}" : ""}">
      <div class="stream-media-wrap">
        ${isVideo ? `
          <video class="stream-card-video" src="${rev.media}" poster="${rev.poster || ''}" muted loop playsinline preload="metadata"></video>
          <div class="stream-video-badge">
            <span class="live-blink-dot"></span> REEL
          </div>
          <div class="stream-play-hint">
            <span class="play-icon-glow">▶</span>
          </div>
        ` : `
          <img class="stream-card-img" src="${rev.media}" alt="${rev.name}" loading="lazy" />
          <div class="stream-photo-badge">
            <span>📸 PHOTO</span>
          </div>
        `}
        <div class="stream-media-gradient"></div>
        <div class="stream-tag-pill">${rev.service}</div>
      </div>

      <div class="stream-card-content">
        <div class="stream-rating-row">
          <div class="stream-stars">★★★★★</div>
          <span class="stream-rating-num">5.0</span>
        </div>
        <p class="stream-quote">"${rev.text}"</p>
        <div class="stream-user-row">
          <div class="stream-user-avatar">${rev.name.charAt(0)}</div>
          <div class="stream-user-info">
            <div class="stream-user-name">
              ${rev.name} <span class="stream-verified">✓ Verified</span>
            </div>
            <div class="stream-user-city">📍 ${rev.city} • ${rev.date}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderReviews() {
  const track1 = document.getElementById("reviewsTrackRow1");
  const track2 = document.getElementById("reviewsTrackRow2");

  if (!track1 || !track2) {
    // Fallback for pages with legacy reviewsGrid
    const grid = document.getElementById("reviewsGrid");
    if (grid && SITE_DATA.reviews) {
      grid.innerHTML = SITE_DATA.reviews.slice(0, 4).map(createStreamReviewCard).join("");
    }
    return;
  }

  const allReviews = SITE_DATA.reviews || [];
  const mid = Math.ceil(allReviews.length / 2);
  const row1List = allReviews.slice(0, mid);
  const row2List = allReviews.slice(mid);

  // Duplicate each list once to ensure 100% seamless, infinite, continuous scrolling
  const row1Html = [...row1List, ...row1List].map(createStreamReviewCard).join("");
  const row2Html = [...row2List, ...row2List].map(createStreamReviewCard).join("");

  track1.innerHTML = row1Html;
  track2.innerHTML = row2Html;
}

function openReviewMediaModal(reviewId) {
  const rev = (SITE_DATA.reviews || []).find(r => r.id === reviewId);
  if (!rev) return;

  const modalBody = document.getElementById("reviewModalBody");
  const overlay = document.getElementById("reviewMediaModalOverlay");
  if (!modalBody || !overlay) return;

  const mediaHtml = rev.type === "video"
    ? `<video src="${rev.media}" poster="${rev.poster || ''}" controls autoplay playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>`
    : `<img src="${rev.media}" alt="${rev.name}" style="width: 100%; height: 100%; object-fit: contain;" />`;

  modalBody.innerHTML = `
    <div class="modal-media-col">
      ${mediaHtml}
    </div>
    <div class="modal-info-col">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 11px; font-weight: 800; color: var(--brand-600); background: var(--brand-50); border: 1px solid var(--brand-200); padding: 3px 9px; border-radius: 99px;">
            ${rev.type === 'video' ? '🎥 Verified Video Reel' : '📸 Customer Photo Review'}
          </span>
          <span style="color: #f59e0b; font-size: 14px; letter-spacing: 1px;">★★★★★</span>
        </div>

        <h3 style="font-size: 20px; font-weight: 800; color: var(--gray-900); margin-bottom: 4px;">
          ${rev.service}
        </h3>
        <p style="font-size: 12.5px; color: var(--gray-400); margin-bottom: 16px;">
          📍 ${rev.city} • ${rev.date}
        </p>

        <div style="background: var(--gray-50); border-left: 3px solid var(--brand-600); padding: 14px 16px; border-radius: 0 12px 12px 0; margin-bottom: 20px;">
          <p style="font-size: 13.5px; color: var(--gray-800); line-height: 1.5; font-style: italic; margin: 0;">
            "${rev.text}"
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="stream-user-avatar" style="width: 42px; height: 42px; font-size: 16px;">
            ${rev.name.charAt(0)}
          </div>
          <div>
            <div style="font-size: 14px; font-weight: 700; color: var(--gray-900);">
              ${rev.name} <span style="font-size: 10.5px; font-weight: 800; color: #16a34a; background: rgba(22, 163, 74, 0.1); padding: 2px 6px; border-radius: 4px;">✓ Verified Customer</span>
            </div>
            <div style="font-size: 11.5px; color: var(--gray-400);">100% Genuine Celebration Booking</div>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="slide-btn" style="flex: 1; justify-content: center;" onclick="closeReviewMediaModal(); filterCategory('all'); const cat=document.getElementById('catalogSection'); if(cat) cat.scrollIntoView({behavior: 'smooth'});">
          Explore Decoration Packages 🎈
        </button>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReviewMediaModal(e) {
  if (e && e.target && e.target.id !== "reviewMediaModalOverlay" && !e.target.classList.contains("review-modal-close-btn")) {
    return;
  }
  const overlay = document.getElementById("reviewMediaModalOverlay");
  if (overlay) {
    const video = overlay.querySelector("video");
    if (video) video.pause();
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
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
let resizeTimer;
window.addEventListener("resize", () => {
  try { scrollActiveNavIntoView(); } catch(e){}
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!appState.showAllProducts && document.getElementById("productsGrid")) {
      renderProducts();
    }
  }, 150);
});

// ----------------------------------------------------
// Browser History & Auto-Open Package Handler
// ----------------------------------------------------
window.addEventListener("popstate", () => {
  const overlay = document.getElementById("productModalOverlay");
  if (overlay && overlay.classList.contains("active")) {
    if (!window.location.hash.startsWith("#package-")) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  const weddingModal = document.getElementById("weddingServiceDetailModal");
  if (weddingModal && weddingModal.classList.contains("active")) {
    if (!window.location.hash.startsWith("#service-")) {
      weddingModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  try {
    const currentPath = window.location.pathname.toLowerCase();
    // Do NOT auto-redirect or treat ?id= as package on blog, gift, marketplace, about, or contact pages
    if (
      currentPath.includes("package") ||
      currentPath.includes("blog") ||
      currentPath.includes("gift") ||
      currentPath.includes("marketplace") ||
      currentPath.includes("about") ||
      currentPath.includes("contact")
    ) {
      return; // Dedicated pages handle their own content without package redirection
    }

    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get("package") || (currentPath.includes("index") || currentPath === "/" || currentPath.endsWith("/") ? urlParams.get("id") : null);
    const hashMatch = window.location.hash.match(/#package-([a-zA-Z0-9_-]+)/);
    const targetId = paramId || (hashMatch ? hashMatch[1] : null);

    if (targetId) {
      setTimeout(() => {
        openProductModal(targetId);
      }, 180);
    }

    const weddingServiceMatch = window.location.hash.match(/#service-([a-zA-Z0-9_-]+)/);
    if (weddingServiceMatch) {
      setTimeout(() => {
        openWeddingServiceModal(weddingServiceMatch[1]);
      }, 180);
    }
  } catch(e) {}
});

// ====================================================
// Complete Wedding Packages Page Logic (Exact Match)
// ====================================================
let selectedWeddingServices = [];
let activeWeddingModalServiceId = null;

const WEDDING_SERVICE_ICONS = {
  house: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  flower: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M12 22a4 4 0 0 0 4-4v-2a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4z"/><path d="M2 12a4 4 0 0 0 4 4h2a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z"/><path d="M22 12a4 4 0 0 0-4-4h-2a4 4 0 0 0 0 8h2a4 4 0 0 0 4-4z"/></svg>`,
  hall: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13"/><path d="M2 7c2-2 6-3 10-3s8 1 10 3"/><path d="M4 11c2 2 4 4 4 10"/><path d="M20 11c-2 2-4 4-4 10"/><circle cx="12" cy="12" r="2"/></svg>`,
  catering: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4V2"/><path d="M4 14h16"/><path d="M20 14c0-4.4-3.6-8-8-8s-8 3.6-8 8"/><path d="M2 18h20"/><path d="M2 18v2h20v-2"/></svg>`,
  sweets: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4V2"/><path d="M4 14h16"/><path d="M20 14c0-4.4-3.6-8-8-8s-8 3.6-8 8"/><path d="M2 18h20"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  drums: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="8" ry="3.5"/><path d="M4 7v10c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5V7"/><line x1="6" y1="8" x2="10" y2="19"/><line x1="18" y1="8" x2="14" y2="19"/><line x1="12" y1="10.5" x2="12" y2="20.5"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 5.2L20 8l-4 4.2 1 5.8-5-3-5 3 1-5.8-4-4.2 5.6-.8L12 2z"/></svg>`,
  party: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3L2 22l10.7-3.8L5.8 11.3z"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><circle cx="12" cy="7" r="1"/></svg>`,
  music: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  makeup: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/><path d="M12 9v6M9 12h6"/></svg>`,
  henna: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2"/></svg>`,
  dance: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M9 22l3-6 3 6M9 13l3-2 3 2M6 10l6-4 6 4"/></svg>`,
  orchestra: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  dj: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 15V8a6 6 0 0 1 12 0v7"/><line x1="6" y1="18" x2="6.01" y2="18"/><line x1="18" y1="18" x2="18.01" y2="18"/></svg>`,
  guitar: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l12-12"/><path d="M19 9l-4-4"/><circle cx="7.5" cy="16.5" r="4.5"/></svg>`
};

function initWeddingServicesPage() {
  renderWeddingServicesGrid();
  updateWeddingQuoteBar();
}

function renderWeddingServicesGrid() {
  const grid = document.getElementById("weddingServicesGrid");
  if (!grid || !SITE_DATA.weddingServices) return;

  grid.innerHTML = SITE_DATA.weddingServices.map(service => {
    const isSelected = selectedWeddingServices.includes(service.id);
    const iconSvg = WEDDING_SERVICE_ICONS[service.icon] || WEDDING_SERVICE_ICONS.sparkles;

    return `
      <div class="wedding-service-card ${isSelected ? 'selected' : ''}" id="card-${service.id}" onclick="handleWeddingCardClick('${service.id}', event)">
        <div class="service-card-img-wrap">
          <img src="${service.image}" alt="${service.title}" loading="lazy" />
          <button class="service-checkbox-btn" aria-label="Select service" type="button" onclick="event.stopPropagation(); toggleWeddingService('${service.id}');">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
        <div class="service-card-body">
          <div class="service-icon-and-title">
            <div class="service-icon-circle">
              ${iconSvg}
            </div>
            <div class="service-title-wrap">
              <h4 class="service-card-title">${service.title}</h4>
              <p class="service-card-desc">${service.desc}</p>
            </div>
          </div>
          <button class="service-view-btn" type="button" onclick="event.stopPropagation(); openWeddingServiceModal('${service.id}');">
            View Details →
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function handleWeddingCardClick(serviceId, event) {
  if (event.target.closest(".service-checkbox-btn")) {
    toggleWeddingService(serviceId);
    return;
  }
  openWeddingServiceModal(serviceId);
}

function toggleWeddingService(serviceId, event) {
  if (selectedWeddingServices.includes(serviceId)) {
    selectedWeddingServices = selectedWeddingServices.filter(id => id !== serviceId);
  } else {
    selectedWeddingServices.push(serviceId);
  }

  const card = document.getElementById(`card-${serviceId}`);
  if (card) {
    if (selectedWeddingServices.includes(serviceId)) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  }

  updateWeddingQuoteBar();
}

function updateWeddingQuoteBar() {
  const bar = document.getElementById("weddingQuoteBar");
  const countBadge = document.getElementById("quoteCountBadge");
  const titleEl = document.getElementById("quoteSummaryTitle");
  const listEl = document.getElementById("quoteSummaryList");
  if (!bar || !countBadge) return;

  const count = selectedWeddingServices.length;
  countBadge.textContent = count;

  if (count > 0) {
    bar.classList.add("active");
    if (titleEl) titleEl.textContent = `${count} Wedding Service${count > 1 ? 's' : ''} Selected`;
    
    const selectedObjs = (SITE_DATA.weddingServices || []).filter(s => selectedWeddingServices.includes(s.id));
    const names = selectedObjs.map(s => s.title);
    if (listEl) listEl.textContent = names.join(" • ");
  } else {
    bar.classList.remove("active");
    if (titleEl) titleEl.textContent = "0 Services Selected";
    if (listEl) listEl.textContent = "Select services above to generate your customized quotation";
  }
}

function clearSelectedWeddingServices() {
  selectedWeddingServices = [];
  const cards = document.querySelectorAll(".wedding-service-card");
  cards.forEach(c => c.classList.remove("selected"));
  updateWeddingQuoteBar();
  showToast("Selection cleared");
}

function sendWeddingWhatsAppQuote() {
  if (selectedWeddingServices.length === 0) {
    showToast("Please select at least 1 wedding service first!");
    return;
  }

  const selectedObjs = (SITE_DATA.weddingServices || []).filter(s => selectedWeddingServices.includes(s.id));
  const city = appState.selectedCity || "Delhi NCR";

  let msg = `💍 *WEDDING PACKAGE QUOTATION ENQUIRY*\n`;
  msg += `📍 *Delivery / Venue City:* ${city}\n`;
  msg += `✨ *Selected Wedding Services (${selectedObjs.length}):*\n`;
  selectedObjs.forEach((s, idx) => {
    msg += `${idx + 1}. ${s.title}\n`;
  });
  msg += `\nPlease share customized package quotation, available dates, and decorator team details!`;

  const waUrl = `https://wa.me/918282025444?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

// ====================================================
// EXACT MODAL CONFIGURATIONS & SPECIALIZED RENDERERS
// ====================================================
const WEDDING_MODAL_CONFIGS = {
  "house-decor": {
    title: "House Decoration",
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80",
    tagline: "Make your home special with traditional and elegant decorations.",
    icon: "house",
    type: "individual",
    options: [
      {
        id: "hd_pendals",
        title: "Pendals In Front Of House",
        checked: false,
        subPrompt: "Choose pendal type",
        radioName: "hd_pendal_type",
        radios: ["Tenkaya pandhiri", "Normal pendals"],
        selectedRadio: "Tenkaya pandhiri"
      },
      {
        id: "hd_lighting",
        title: "Lighting Decoration For Building",
        subtitle: "3 or 5 Days with Max of 50 Serial Sets",
        checked: false
      },
      {
        id: "hd_banana",
        title: "Banana Trees & Mango Leaves",
        checked: false
      },
      {
        id: "hd_marigold",
        title: "Marigold Flowers For Main Door And Inside the House",
        checked: false,
        subPrompt: "Choose flower type",
        radioName: "hd_flower_type",
        radios: ["Normal", "Special"],
        selectedRadio: "Normal"
      },
      {
        id: "hd_gaja",
        title: "Gaja Maala For Main Door",
        checked: false,
        subPrompt: "",
        radioName: "hd_gaja_choice",
        radios: ["Yes", "No"],
        selectedRadio: "No"
      }
    ]
  },
  "nalugu-snanam": {
    title: "Nalugu & Mangala Sanam Decoration",
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    tagline: "Make your Nalugu event more special with beautiful decorations, traditional elements and complete arrangements.",
    icon: "flower",
    type: "grouped",
    groups: [
      {
        header: "Main Decoration Services",
        items: [
          { id: "ns_concept", label: "Nalugu Concept Decoration", checked: false },
          { id: "ns_sanam", label: "Mangala Sanam Decoration", checked: false },
          { id: "ns_jewel", label: "Flower Jewellery", checked: false },
          {
            id: "ns_maala",
            label: "Nalugu Maala",
            checked: false,
            radioName: "ns_maala_type",
            radios: ["Petals", "Normal"],
            selectedRadio: "Normal"
          }
        ]
      },
      {
        header: "For Nalugu Event",
        items: [
          {
            id: "ns_food",
            label: "Nalugu Food",
            checked: false,
            subchecks: ["Sweet", "Rice", "Pappu", "Sambar", "Rasam", "Curd", "Pickle", "Chips", "Oil Fry"]
          }
        ]
      },
      {
        header: "Photo & Videography",
        items: [
          { id: "ns_photo_trad", label: "Traditional Photo", checked: false },
          { id: "ns_video_trad", label: "Traditional Video", checked: false },
          { id: "ns_photo_candid", label: "Candid Photo", checked: false },
          { id: "ns_video_candid", label: "Candid Video", checked: false }
        ]
      },
      {
        header: "Nalugu Mangala Melam (4 - members)",
        items: [
          {
            id: "ns_melam",
            label: "Nalugu Mangala Melam",
            checked: false,
            subchecks: ["2 Dolu", "2 Sannai"]
          }
        ]
      }
    ]
  },
  "function-hall-decor": {
    title: "Function Hall Flower Decoration",
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tagline: "Beautiful decorations for your special day, creating memorable moments.",
    icon: "hall",
    type: "grouped",
    groups: [
      {
        header: "Entrance & Welcome",
        items: [
          { id: "fhd_arch", label: "Entrance Arch With 2 Flex Banners", checked: false },
          { id: "fhd_banana", label: "Banana Trees & Mango Leaves", checked: false },
          {
            id: "fhd_pendals",
            label: "Pendals With Side Wall Entrance",
            checked: false,
            radioName: "fhd_pendal_type",
            radios: ["Side Wall Entrance", "Lighting Entrance"]
          },
          {
            id: "fhd_trust",
            label: "Trust Box Entrance",
            checked: false,
            radioName: "fhd_trust_type",
            radios: ["Normal", "Lighting Entrance"]
          },
          { id: "fhd_ring", label: "Ring Passage Entrance", checked: false },
          { id: "fhd_foot", label: "Foot roll Mats", checked: false }
        ]
      },
      {
        header: "Stage & Reception",
        items: [
          { id: "fhd_reception", label: "Reception Decoration", checked: false },
          { id: "fhd_reception_garlands", label: "Reception Garlands (Petals) – 1 Pair", checked: false },
          { id: "fhd_ganesh", label: "Lord Ganesh Setup", checked: false },
          { id: "fhd_muhurtham", label: "Muhurtham Decoration", checked: false },
          { id: "fhd_muhurtham_garlands", label: "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)", checked: false },
          { id: "fhd_sangyam_garlands", label: "Sangyam Garlands [ Normal ] – 2 Pairs", checked: false },
          { id: "fhd_basikalu", label: "Basikalu 2", checked: false },
          { id: "fhd_coconut", label: "Design Coconut [ With Bride & Groom Names ]", checked: false }
        ]
      },
      {
        header: "Vehicle & Flower Items",
        items: [
          {
            id: "fhd_car",
            label: "Car Decoration – 2 Cars [ Stickers – 4 ]",
            checked: false,
            radioName: "fhd_car_type",
            radios: ["Simple Decoration"]
          },
          { id: "fhd_muralu", label: "15 Muralu puvulu", checked: false },
          { id: "fhd_adduthera", label: "Adduthera", checked: false }
        ]
      },
      {
        header: "Additional Requirements",
        items: [
          { id: "fhd_chair_clothes", label: "Function Hall Chair Clothes", checked: false },
          { id: "fhd_sofas", label: "Vip Sofas", checked: false },
          { id: "fhd_stages", label: "Stages", checked: false },
          { id: "fhd_coolers", label: "Coolers", checked: false }
        ]
      }
    ]
  },
  "catering": {
    title: "Catering",
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    tagline: "Delicious food for your special moments. Choose from a wide variety of menus and live counters.",
    icon: "catering",
    type: "catering"
  },
  "sangyam-sweets": {
    title: "Sangyam Sweets",
    subtitle: "Select the sweets and hot items you need. Dates and time will be confirmed later.",
    image: "assets/sangyam-sweets.jpg",
    tagline: "Traditional sweets to make your celebration sweeter and more memorable.",
    icon: "sweets",
    type: "sweets"
  },
  "photo-video": {
    title: "Photo & Videography",
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    tagline: "Capture your special moments with our professional photo & videography services.",
    icon: "camera",
    type: "photo-video"
  },
  "melam": {
    title: "Melam",
    subtitle: "Select the melam services you need. Dates and time will be confirmed later.",
    image: "assets/traditional-melam.jpg",
    tagline: "Traditional melam for a grand and auspicious celebration.",
    icon: "drums",
    type: "melam"
  },
  "special-events": {
    title: "Special Events",
    subtitle: "Select the special event services you need. You can modify your selection anytime.",
    image: "assets/special-events-pyro.jpg",
    tagline: "Make your celebration extra special with unique and memorable event experiences.",
    icon: "party",
    type: "special-events"
  },
  "musical-events": {
    title: "Musical Events",
    subtitle: "Select the musical event services you need. Dates and time will be confirmed later.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    tagline: "Make your celebration more memorable with live music and entertainment.",
    icon: "music",
    type: "musical-events"
  },
  "sangyam-bags": {
    title: "Sangyam Bags",
    subtitle: "Select the sangyam bags combo you need. Dates and time will be confirmed later.",
    image: "assets/sangyam-bags.jpg",
    tagline: "Traditional sangyam bags combo with all essentials for your celebration.",
    icon: "bag",
    type: "sangyam-bags"
  }
};

function openWeddingServiceModal(serviceId) {
  const service = (SITE_DATA.weddingServices || []).find(s => s.id === serviceId);
  if (!service) return;

  activeWeddingModalServiceId = serviceId;
  const modal = document.getElementById("weddingServiceDetailModal");
  if (!modal) return;

  const cfg = WEDDING_MODAL_CONFIGS[serviceId] || {
    title: service.title,
    subtitle: "Select the services you need. Dates and time will be confirmed later.",
    image: service.image,
    tagline: `Make your ${service.title} special with professional setup and quality arrangements.`,
    icon: service.icon || "sparkles",
    type: "fallback",
    items: (service.inclusions || []).map((inc, i) => ({
      id: `${serviceId}_inc_${i}`,
      title: inc,
      checked: false
    }))
  };

  // Set header info
  const titleEl = document.getElementById("wcmTitle");
  if (titleEl) titleEl.textContent = cfg.title;

  const subEl = document.getElementById("wcmSubtitle");
  if (subEl) subEl.textContent = cfg.subtitle;

  const imgEl = document.getElementById("wcmPhoto");
  if (imgEl) imgEl.src = cfg.image;

  const tagText = document.getElementById("wcmTaglineText");
  if (tagText) tagText.textContent = cfg.tagline;

  const tagIcon = document.getElementById("wcmTaglineIcon");
  if (tagIcon) tagIcon.innerHTML = WEDDING_SERVICE_ICONS[cfg.icon] || WEDDING_SERVICE_ICONS.sparkles;

  const headerIcon = document.getElementById("wcmHeaderIcon");
  if (headerIcon) headerIcon.innerHTML = WEDDING_SERVICE_ICONS[cfg.icon] || WEDDING_SERVICE_ICONS.sparkles;

  const listEl = document.getElementById("wcmOptionsList");
  if (!listEl) return;

  // Render modal content by type
  if (cfg.type === "individual") {
    renderWcmIndividual(listEl, cfg);
  } else if (cfg.type === "grouped") {
    renderWcmGrouped(listEl, cfg);
  } else if (cfg.type === "catering") {
    renderWcmCatering(listEl);
  } else if (cfg.type === "sweets") {
    renderWcmSweets(listEl);
  } else if (cfg.type === "photo-video") {
    renderWcmPhotoVideo(listEl);
  } else if (cfg.type === "melam") {
    renderWcmMelam(listEl);
  } else if (cfg.type === "special-events") {
    renderWcmSpecialEvents(listEl);
  } else if (cfg.type === "musical-events") {
    renderWcmMusicalEvents(listEl);
  } else if (cfg.type === "sangyam-bags") {
    renderWcmSangyamBags(listEl);
  } else {
    renderWcmFallback(listEl, cfg);
  }

  updateWcmSelectedCount();
  modal.classList.add("active");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";

  try {
    if (window.location.hash !== `#service-${serviceId}`) {
      history.pushState({ weddingServiceOpen: serviceId }, "", `#service-${serviceId}`);
    }
  } catch(e) {}
}

// 1. Individual mode renderer (House Decoration)
function renderWcmIndividual(listEl, cfg) {
  listEl.innerHTML = cfg.options.map(opt => `
    <div class="wcm-option-card ${opt.checked ? 'active' : ''}" id="wcm_card_${opt.id}">
      <div class="wcm-option-header" onclick="toggleWcmOption('${opt.id}')">
        <div class="wcm-checkbox">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="wcm-option-title-box">
          <h4 class="wcm-option-title">${opt.title}</h4>
          ${opt.subtitle ? `<p class="wcm-option-subtitle">${opt.subtitle}</p>` : ''}
        </div>
      </div>
      ${opt.radios ? `
        <div class="wcm-sub-options-row">
          ${opt.subPrompt ? `<span class="wcm-sub-prompt">${opt.subPrompt}</span>` : ''}
          <div class="wcm-radios-wrap">
            ${opt.radios.map((r, i) => `
              <label class="wcm-radio-label">
                <input type="radio" name="${opt.radioName}" value="${r}" class="wcm-radio-input" ${r === opt.selectedRadio ? 'checked' : ''} onchange="updateWcmRadio('${opt.id}', '${r}')" />
                <span>${r}</span>
              </label>
            `).join("")}
          </div>
        </div>
      ` : ''}
    </div>
  `).join("");
}

// 2. Grouped mode renderer (Nalugu & Function Hall Flower)
function renderWcmGrouped(listEl, cfg) {
  listEl.innerHTML = cfg.groups.map(grp => `
    <div class="wcm-group-card">
      <div class="wcm-group-header">${grp.header}</div>
      <div class="wcm-group-body">
        ${grp.items.map(item => `
          <div class="wcm-group-row">
            <label class="wcm-check-label" onclick="event.stopPropagation();">
              <input type="checkbox" class="wcm-check-input" id="chk_${item.id}" ${item.checked ? 'checked' : ''} onchange="updateWcmSelectedCount()" />
              <span>${item.label}</span>
            </label>

            ${item.radios ? `
              <div class="wcm-radios-wrap" style="gap: 14px;">
                ${item.radios.map(r => `
                  <label class="wcm-radio-label">
                    <input type="radio" name="${item.radioName}" value="${r}" class="wcm-radio-input" onchange="handleWcmRadioCheck('${item.id}')" />
                    <span>${r}</span>
                  </label>
                `).join("")}
              </div>
            ` : ''}

            ${item.subchecks ? `
              <div class="wcm-sub-checklist">
                ${item.subchecks.map(sub => `
                  <label class="wcm-sub-check-item">
                    <input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" />
                    <span>${sub}</span>
                  </label>
                `).join("")}
              </div>
            ` : ''}
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// 3. Catering renderer
function renderWcmCatering(listEl) {
  listEl.innerHTML = `
    <!-- Section 1: Catering Requirements -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Catering Requirements</div>
      <div class="wcm-group-body">
        <div class="wcm-cat-req-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>LED Stalls</span></label>
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Normal Cloth Stalls</span></label>
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Round Tables With Cloth</span></label>
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Chair Clothes [Dining]</span></label>
        </div>
        <div class="wcm-group-row" style="margin-top: 6px;">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" id="chk_cat_dishes" onchange="updateWcmSelectedCount()" /> <span>Dishes</span></label>
          <div class="wcm-radios-wrap">
            <label class="wcm-radio-label"><input type="radio" name="cat_dishes_type" value="Brass" class="wcm-radio-input" onchange="handleWcmRadioCheck('cat_dishes')" /> <span>Brass</span></label>
            <label class="wcm-radio-label"><input type="radio" name="cat_dishes_type" value="Steel" class="wcm-radio-input" onchange="handleWcmRadioCheck('cat_dishes')" /> <span>Steel</span></label>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Evening Snacks -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Evening Snacks (4.30pm Onwards)</div>
      <div class="wcm-group-body">
        <div class="wcm-subhead-note">Select up to 5 items</div>
        <div class="wcm-cat-grid-snacks">
          ${["Bajji", "Bonda", "Medhu Pakoda", "Onion Pokoda", "Corn Rolls", "Corn Samosa", "Onion Samosa", "Veg. Cutlet", "Veg. Springroll", "Chutney", "Tomato Sauce", "Coffee & Tea"].map(item => `
            <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
          `).join("")}
        </div>
        <div class="wcm-group-row" style="border-top: 1px solid #f1f5f9; padding-top: 10px;">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <strong>Welcome Drink</strong></label>
          <div class="wcm-radios-wrap" style="gap: 14px;">
            ${["Pulpy Mango", "Pulpy Orange", "Cold Badam Milk", "Hot Badam Milk", "Fruit Juice"].map(drink => `
              <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${drink}</span></label>
            `).join("")}
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3: Night Dinner -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Night Dinner (For Members + 10% Extra)</div>
      <div class="wcm-group-body">
        <span class="wcm-red-label">Sweets (Select any two)</span>
        <div class="wcm-sweets-grid">
          <div class="wcm-items-list">
            ${["Poli", "Basundi", "Jilebi", "Badham Halwa", "Jangri"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
          <div class="wcm-items-list">
            ${["Kaju Cake", "Rasamalai", "Kala Jamoon", "Bandar Laddu", "Badhusha"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
          <div class="wcm-items-list">
            ${["Kaju Roll", "Badham Cake", "Dry Jamoon", "Carrot Halwa", "Laddu"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
          <div class="wcm-items-list">
            ${["Pistha Roll", "Rasagulla", "Champakalli", "Kalakhand", "Mysore Pak"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
          <div class="wcm-items-list">
            ${["Malai Sandwich", "Malaikaja", "Cham Cham", "Dry Fruit Halwa"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
          <div class="wcm-items-list">
            ${["Agra Killi", "Kova Jangri", "Ravva Laddu", "Dry Fruit Laddu"].map(s => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${s}</span></label>`).join("")}
          </div>
        </div>

        <!-- Row 1: Hot Items & Biriyani Rice -->
        <div class="wcm-two-col-grid">
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Hot Items</h5>
            <div class="wcm-items-col-3">
              ${["Masala Vada", "Curd Vada", "Corn Samosa", "Alasanda Vada", "Corn Vada", "Veg Spring Roll", "Keera Vada (Leaves)", "Cabbage Vada", "Kaju Pakodi"].map(item => `
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
              `).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Biriyani Rice</h5>
            <div class="wcm-items-col-2">
              ${["Vegetable Biriyani", "Babycorn Biriyani", "Kaju Capsicum Biriyani", "Mushroom Biriyani", "Panasa Biriyani", "Paneer Biriyani"].map(item => `
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Row 2: Special Gravy & Special Rice -->
        <div class="wcm-two-col-grid">
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Special Gravy</h5>
            <div class="wcm-items-list">
              ${["Nune Vankaya", "Mushroom Curry", "Vegetable Kurma", "Kaju Capsicum Curry", "Potato Green Peas Masala"].map(item => `
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
              `).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Special Rice</h5>
            <div class="wcm-items-col-3">
              ${["Karivepaku Rice", "Pulhora", "Lemon Rice", "Pudina Rice", "Mango Rice", "Tomato Rice", "Ghee Rice", "Gongura Rice", "Kothimira Rice", "Coconut Rice", "Palak Rice"].map(item => `
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Row 3: Raita, Roti Item, Roti Gravy -->
        <div class="wcm-three-col-grid">
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Raita</h5>
            <div class="wcm-items-list">
              ${["Onion Raita", "Veg. Mixed Raita"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Roti Item</h5>
            <div class="wcm-items-list">
              ${["Chapati", "Pulka", "Rumal"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Roti Gravy</h5>
            <div class="wcm-items-col-2">
              ${["Paneer Butter Masala", "Alu Mutter", "Palak Paneer", "Chana Masala", "Methi Chaman", "Mixed Veg Kadai", "Mushroom Curry", "Paneer Kaju Masala"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
          </div>
        </div>

        <!-- Row 4: Oil Fry, Boiled Fry, Other Items -->
        <div class="wcm-three-col-grid">
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Oil Fry</h5>
            <div class="wcm-items-list">
              ${["Bendakaya Pakodi", "Bendakaya Fry", "Dondakayipakodi"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
            <button type="button" class="wcm-show-more-link" onclick="toggleWcmMoreItems(this, 'more_oil_fry')">+ Show more</button>
            <div id="more_oil_fry" style="display:none; flex-direction:column; gap:6px; margin-top:6px;">
              ${["Kakarakaya Fry", "Aratikaya Fry", "Potato Finger Chips"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Boiled Fry</h5>
            <div class="wcm-items-list">
              ${["National Curry (Carrot, Cabbage & Beens)", "Potato Curry", "Banana Curry"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
            <button type="button" class="wcm-show-more-link" onclick="toggleWcmMoreItems(this, 'more_boiled_fry')">+ Show more</button>
            <div id="more_boiled_fry" style="display:none; flex-direction:column; gap:6px; margin-top:6px;">
              ${["Beetroot Curry", "Sorakaya Curry", "Dondakaya Curry"].map(item => `<label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>`).join("")}
            </div>
          </div>
          <div class="wcm-sub-box">
            <h5 class="wcm-sub-box-title">Other Items</h5>
            <div class="wcm-items-list">
              <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Rice</span></label>
              <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Sambar</span></label>
              <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Curd</span></label>
              <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Pappu (Tamota / Mango / Leaves / Dosakaya)</span></label>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Rasam</span></label>
                <label class="wcm-radio-label"><input type="radio" name="rasam_type" value="Pappu" class="wcm-radio-input" /> <span>Pappu</span></label>
                <label class="wcm-radio-label"><input type="radio" name="rasam_type" value="Pepper" class="wcm-radio-input" /> <span>Pepper</span></label>
              </div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <label class="wcm-sub-check-item"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Chips</span></label>
                <span>or</span>
                <label class="wcm-radio-label"><input type="radio" name="chips_type" value="Papad" class="wcm-radio-input" /> <span>Papad</span></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4. Sangyam Sweets renderer
function renderWcmSweets(listEl) {
  const sweetOptions = ["Kaju Katli", "Motichoor Laddu", "Mysore Pak", "Gulab Jamun", "Rasgulla", "Dry Fruit Halwa", "Peda", "Badusha", "Kala Jamun", "Rasmalai", "Basundi", "Kaju Roll"];
  const hotItemOptions = ["Masala Vada", "Corn Samosa", "Veg Spring Roll", "Kaju Pakodi", "Alasanda Vada", "Onion Pakoda", "Murukku", "Ribbon Pakoda", "Chekkalu"];
  const nosOptions = ["25", "50", "75", "100", "150", "200", "250", "500"];
  const kgsOptions = ["1 Kg", "2 Kgs", "3 Kgs", "5 Kgs", "10 Kgs", "15 Kgs", "20 Kgs"];

  listEl.innerHTML = `
    <!-- Sweets Group -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Sweets</div>
      <div class="wcm-group-body">
        <div class="wcm-select-row">
          <label class="wcm-select-label-wrap">
            <input type="checkbox" class="wcm-check-input" id="chk_sw_1" onchange="updateWcmSelectedCount()" />
            <span>Sweet 1</span>
          </label>
          <select class="wcm-select-control" onchange="handleWcmSelectChange('chk_sw_1')">
            <option value="">Select a sweet</option>
            ${sweetOptions.map(s => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <div class="wcm-qty-wrap">
            <span>Nos</span>
            <select class="wcm-qty-select">
              <option value="">Select</option>
              ${nosOptions.map(n => `<option value="${n}">${n}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="wcm-select-row">
          <label class="wcm-select-label-wrap">
            <input type="checkbox" class="wcm-check-input" id="chk_sw_2" onchange="updateWcmSelectedCount()" />
            <span>Sweet 2</span>
          </label>
          <select class="wcm-select-control" onchange="handleWcmSelectChange('chk_sw_2')">
            <option value="">Select a sweet</option>
            ${sweetOptions.map(s => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <div class="wcm-qty-wrap">
            <span>Nos</span>
            <select class="wcm-qty-select">
              <option value="">Select</option>
              ${nosOptions.map(n => `<option value="${n}">${n}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Hot Items Group -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Hot Items</div>
      <div class="wcm-group-body">
        <div class="wcm-select-row">
          <label class="wcm-select-label-wrap">
            <input type="checkbox" class="wcm-check-input" id="chk_hot_item" onchange="updateWcmSelectedCount()" />
            <span>Hot Item</span>
          </label>
          <select class="wcm-select-control" onchange="handleWcmSelectChange('chk_hot_item')">
            <option value="">Select a hot item</option>
            ${hotItemOptions.map(h => `<option value="${h}">${h}</option>`).join("")}
          </select>
          <div class="wcm-qty-wrap">
            <span>Kgs</span>
            <select class="wcm-qty-select">
              <option value="">Select</option>
              ${kgsOptions.map(k => `<option value="${k}">${k}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 5. Photo & Videography renderer
function renderWcmPhotoVideo(listEl) {
  listEl.innerHTML = `
    <!-- Row 1: Three Group Cards side by side -->
    <div class="wcm-row-3-cols">
      <div class="wcm-group-card">
        <div class="wcm-group-header">Sangeet / Mehandi Coverage</div>
        <div class="wcm-group-body">
          <div class="wcm-sub-head-checks">
            <label class="wcm-radio-label"><input type="radio" name="pv_sm_type" value="Sangeet" class="wcm-radio-input" /> <span>Sangeet</span></label>
            <label class="wcm-radio-label"><input type="radio" name="pv_sm_type" value="Mehandi" class="wcm-radio-input" /> <span>Mehandi Coverage</span></label>
          </div>
          ${["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"].map(item => `
            <div class="wcm-group-row">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="wcm-group-card">
        <div class="wcm-group-header">Mangala Snanam Coverage</div>
        <div class="wcm-group-body">
          <div class="wcm-sub-head-checks">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Bride</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Groom</span></label>
          </div>
          ${["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"].map(item => `
            <div class="wcm-group-row">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="wcm-group-card">
        <div class="wcm-group-header">Nalugu Coverage</div>
        <div class="wcm-group-body">
          <div class="wcm-sub-head-checks">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Bride</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Groom</span></label>
          </div>
          ${["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"].map(item => `
            <div class="wcm-group-row">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>${item}</span></label>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Row 2: Welcoming Photo & Video -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Welcoming Photo & Video Coverage (In Hall)</div>
      <div class="wcm-group-body" style="padding: 10px 16px;">
        <div class="wcm-radios-wrap">
          <label class="wcm-radio-label"><input type="radio" name="pv_welcoming" value="Yes" class="wcm-radio-input" /> <span>Yes</span></label>
          <label class="wcm-radio-label"><input type="radio" name="pv_welcoming" value="No" class="wcm-radio-input" /> <span>No</span></label>
        </div>
      </div>
    </div>

    <!-- Row 3: Reception & Muhurtham Coverage -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Reception & Muhurtham Coverage</div>
      <div class="wcm-group-body">
        <div class="wcm-reception-grid">
          <div class="wcm-items-list">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Traditional photo at Stage (one Still Photo)</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Traditional Video at Stage (One Video Camera 4k)</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>One Videographer Coverage Entrance & Dining Hall</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Candid Photographer for couples</span></label>
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Candid Videographer For Couples</span></label>
          </div>
          <div class="wcm-items-list">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Drone</span></label>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>TV</span></label>
              <span>OR</span>
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>LED Wall</span></label>
              <label class="wcm-radio-label"><input type="radio" name="pv_tv_size" value="Full" class="wcm-radio-input" /> <span>Full</span></label>
              <label class="wcm-radio-label"><input type="radio" name="pv_tv_size" value="Half" class="wcm-radio-input" /> <span>Half</span></label>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Live Stream</span></label>
              <label class="wcm-radio-label"><input type="radio" name="pv_stream_len" value="Half Session" class="wcm-radio-input" /> <span>Half Session</span></label>
              <label class="wcm-radio-label"><input type="radio" name="pv_stream_len" value="Full Session" class="wcm-radio-input" /> <span>Full Session</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 4: Pre & Post Wedding Shoots -->
    <div class="wcm-row-2-cols">
      <div class="wcm-group-card">
        <div class="wcm-group-header">Pre Wedding Shoot</div>
        <div class="wcm-group-body">
          <div class="wcm-radios-wrap">
            <label class="wcm-radio-label"><input type="radio" name="pv_pre_shoot" value="Normal" class="wcm-radio-input" /> <span>Normal (Photo Shoot)</span></label>
            <label class="wcm-radio-label"><input type="radio" name="pv_pre_shoot" value="Cinematic" class="wcm-radio-input" /> <span>Cinematic</span></label>
          </div>
        </div>
      </div>
      <div class="wcm-group-card">
        <div class="wcm-group-header">Post Wedding Shoot</div>
        <div class="wcm-group-body">
          <div class="wcm-radios-wrap">
            <label class="wcm-radio-label"><input type="radio" name="pv_post_shoot" value="Normal" class="wcm-radio-input" /> <span>Normal (Photoshoot)</span></label>
            <label class="wcm-radio-label"><input type="radio" name="pv_post_shoot" value="Cinematic" class="wcm-radio-input" /> <span>Cinematic</span></label>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 5: Additional Services & Products -->
    <div class="wcm-row-2-cols">
      <div class="wcm-group-card">
        <div class="wcm-group-header">Additional Services</div>
        <div class="wcm-group-body">
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Whats App Invitation</span></label>
          </div>
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Promo (Only For Candid Video)</span></label>
          </div>
        </div>
      </div>
      <div class="wcm-group-card">
        <div class="wcm-group-header">Products</div>
        <div class="wcm-group-body">
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Marriage Album</span></label>
            <input type="text" class="wcm-input-sheets" placeholder="Sheets" />
          </div>
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Pendrive</span></label>
          </div>
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Photo Frame</span></label>
          </div>
          <div class="wcm-group-row">
            <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Harddisk [1 TB]</span></label>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 6: Sathyanarayana Vratham Coverage -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Sathyanarayana Vratham Coverage</div>
      <div class="wcm-group-body" style="padding: 10px 16px;">
        <div class="wcm-radios-wrap">
          <label class="wcm-radio-label"><input type="radio" name="pv_vratham" value="Yes" class="wcm-radio-input" /> <span>Yes</span></label>
          <label class="wcm-radio-label"><input type="radio" name="pv_vratham" value="No" class="wcm-radio-input" /> <span>No</span></label>
        </div>
      </div>
    </div>
  `;
}

// 6. Melam renderer
function renderWcmMelam(listEl) {
  listEl.innerHTML = `
    <!-- Mangala Melam -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Mangala Melam</div>
      <div class="wcm-group-body">
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" id="chk_melam_nalugu" onchange="updateWcmSelectedCount()" /> <span>Nalugu (4 Members)</span></label>
          <div class="wcm-radios-wrap">
            <span style="font-size:13px; font-weight:700; color:#374151;">Type</span>
            <label class="wcm-radio-label"><input type="radio" name="mm_nalugu_type" value="2 Dolu" class="wcm-radio-input" onchange="handleWcmRadioCheck('melam_nalugu')" /> <span>2 Dolu</span></label>
            <label class="wcm-radio-label"><input type="radio" name="mm_nalugu_type" value="2 Sannai" class="wcm-radio-input" onchange="handleWcmRadioCheck('melam_nalugu')" /> <span>2 Sannai</span></label>
          </div>
        </div>
      </div>
    </div>

    <!-- Welcoming Melam -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Welcoming Melam</div>
      <div class="wcm-group-body">
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Welcoming (House)</span></label>
          <input type="number" class="wcm-number-input" min="1" max="20" placeholder="1" />
        </div>
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Welcoming (Function Hall)</span></label>
          <input type="number" class="wcm-number-input" min="1" max="20" placeholder="1" />
        </div>
      </div>
    </div>

    <!-- Marriage Melam -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Marriage Melam</div>
      <div class="wcm-group-body">
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Marriage (6 Members)</span></label>
          <input type="number" class="wcm-number-input" min="1" max="20" placeholder="1" />
        </div>
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Marriage (9 Members)</span></label>
          <input type="number" class="wcm-number-input" min="1" max="20" placeholder="1" />
        </div>
      </div>
    </div>

    <!-- Kerala Drums -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Kerala Drums</div>
      <div class="wcm-group-body">
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Kerala Drums</span></label>
          <div class="wcm-stepper-wrap">
            <input type="number" class="wcm-number-input" min="1" max="30" placeholder="5" />
            <span>Members</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Band Set -->
    <div class="wcm-group-card">
      <div class="wcm-group-header">Band Set</div>
      <div class="wcm-group-body">
        <div class="wcm-group-row">
          <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" onchange="updateWcmSelectedCount()" /> <span>Band Set</span></label>
          <div class="wcm-stepper-wrap">
            <input type="number" class="wcm-number-input" min="1" max="30" placeholder="7" />
            <span>Members</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 7. Special Events renderer (- 1 + steppers)
function renderWcmSpecialEvents(listEl) {
  const col1Items = [
    { id: "se_photo_booth", label: "Photo Booth" },
    { id: "se_crackers", label: "Crackers 120 Shots" },
    { id: "se_pallaki", label: "Pallaki With Boys" },
    { id: "se_flower_shots", label: "Flower Shots – 25+" },
    { id: "se_pot", label: "Design Pot" },
    { id: "se_fog", label: "Fog – 4 times" },
    { id: "se_sky_lanterns", label: "Sky Lanterns" },
    { id: "se_dance", label: "Welcoming Dance" }
  ];

  const col2Items = [
    { id: "se_horse", label: "Horse" },
    { id: "se_horse_cart", label: "Horse Cart" },
    { id: "se_cold_fire", label: "Cold Fire – 4 times" },
    { id: "se_harathi", label: "Harathi plates" },
    { id: "se_umbrella", label: "Design Umbrella" },
    { id: "se_doli", label: "Doli" },
    { id: "se_special_entry", label: "Special Entry" },
    { id: "se_butta", label: "Design Butta" }
  ];

  listEl.innerHTML = `
    <div class="wcm-row-2-cols">
      <!-- Column 1 -->
      <div class="wcm-group-card">
        <div class="wcm-group-header">Event Options</div>
        <div class="wcm-group-body">
          ${col1Items.map(item => `
            <div class="wcm-group-row">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" id="chk_${item.id}" onchange="updateWcmSelectedCount()" /> <span>${item.label}</span></label>
              <div class="wcm-qty-stepper">
                <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_${item.id}', -1, 1)">−</button>
                <input type="text" class="wcm-stepper-val" id="qty_${item.id}" value="1" readonly />
                <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_${item.id}', 1, 1); autoCheckWcmItem('chk_${item.id}')">+</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Column 2 -->
      <div class="wcm-group-card">
        <div class="wcm-group-header">Event Options</div>
        <div class="wcm-group-body">
          ${col2Items.map(item => `
            <div class="wcm-group-row">
              <label class="wcm-check-label"><input type="checkbox" class="wcm-check-input" id="chk_${item.id}" onchange="updateWcmSelectedCount()" /> <span>${item.label}</span></label>
              <div class="wcm-qty-stepper">
                <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_${item.id}', -1, 1)">−</button>
                <input type="text" class="wcm-stepper-val" id="qty_${item.id}" value="1" readonly />
                <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_${item.id}', 1, 1); autoCheckWcmItem('chk_${item.id}')">+</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// 8. Musical Events renderer (Icon cards)
function renderWcmMusicalEvents(listEl) {
  const cards = [
    { id: "me_orchestra", title: "Orchestra", desc: "Full orchestra for a grand musical experience", icon: WEDDING_SERVICE_ICONS.orchestra },
    { id: "me_dj", title: "DJ", desc: "Professional DJ with latest music collection", icon: WEDDING_SERVICE_ICONS.dj },
    { id: "me_light_music", title: "Light Music", desc: "Melodious light music for a pleasant atmosphere", icon: WEDDING_SERVICE_ICONS.music },
    { id: "me_instrumental", title: "Live Instrumental Music", desc: "Live instrumental performance", icon: WEDDING_SERVICE_ICONS.guitar }
  ];

  listEl.innerHTML = cards.map(c => `
    <div class="wcm-icon-card" id="wcm_card_${c.id}" onclick="toggleWcmOption('${c.id}')">
      <div class="wcm-checkbox">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="wcm-card-round-icon">
        ${c.icon}
      </div>
      <div class="wcm-card-text-wrap">
        <h4 class="wcm-card-text-title">${c.title}</h4>
        <p class="wcm-card-text-desc">${c.desc}</p>
      </div>
    </div>
  `).join("");
}

// 9. Sangyam Bags renderer
function renderWcmSangyamBags(listEl) {
  listEl.innerHTML = `
    <div class="wcm-combo-card">
      <div class="wcm-combo-top-row">
        <div class="wcm-combo-title-wrap">
          <input type="checkbox" class="wcm-check-input" id="chk_sb_combo" style="margin-top:3px;" onchange="updateWcmSelectedCount()" checked />
          <div>
            <h4 style="font-size:15px; font-weight:800; color:#111827; margin:0 0 3px;">Sangyam Bags (Combo)</h4>
            <p style="font-size:12.5px; color:#64748b; margin:0;">Complete sangyam bag combo with all items.</p>
          </div>
        </div>
        <div class="wcm-qty-stepper">
          <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_sb_combo', -50, 50)">−</button>
          <input type="text" class="wcm-stepper-val" id="qty_sb_combo" value="100" style="width:40px;" readonly />
          <button type="button" class="wcm-stepper-btn" onclick="changeWcmQty('qty_sb_combo', 50, 50); autoCheckWcmItem('chk_sb_combo')">+</button>
        </div>
      </div>

      <!-- Combo Inclusions Box -->
      <div class="wcm-combo-inclusions-box">
        <div class="wcm-combo-item-row">
          <div class="wcm-combo-thumb">🛍️</div>
          <span class="wcm-combo-item-name">Printed Name Bags</span>
        </div>
        <div class="wcm-combo-item-row">
          <div class="wcm-combo-thumb">🥥</div>
          <span class="wcm-combo-item-name">Coconut</span>
        </div>
        <div class="wcm-combo-item-row">
          <div class="wcm-combo-thumb">🌿</div>
          <span class="wcm-combo-item-name">Aku, Vakka</span>
        </div>
        <div class="wcm-combo-item-row">
          <div class="wcm-combo-thumb">✨</div>
          <span class="wcm-combo-item-name">Pasupu Kumkuma</span>
        </div>
      </div>

      <div class="wcm-combo-hint">Example: 100 or 200 sets</div>
    </div>
  `;
}

// 10. Fallback renderer
function renderWcmFallback(listEl, cfg) {
  listEl.innerHTML = cfg.items.map(item => `
    <div class="wcm-option-card ${item.checked ? 'active' : ''}" id="wcm_card_${item.id}" onclick="toggleWcmOption('${item.id}')">
      <div class="wcm-option-header">
        <div class="wcm-checkbox">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="wcm-option-title-box">
          <h4 class="wcm-option-title">${item.title}</h4>
        </div>
      </div>
    </div>
  `).join("");
}

// Interactive helper functions
function toggleWcmOption(optId) {
  const card = document.getElementById(`wcm_card_${optId}`);
  if (!card) return;
  card.classList.toggle("active");
  updateWcmSelectedCount();
}

function updateWcmRadio(optId, radioVal) {
  const card = document.getElementById(`wcm_card_${optId}`);
  if (card && !card.classList.contains("active")) {
    card.classList.add("active");
  }
  updateWcmSelectedCount();
}

function handleWcmRadioCheck(itemId) {
  const chk = document.getElementById(`chk_${itemId}`);
  if (chk && !chk.checked) {
    chk.checked = true;
  }
  updateWcmSelectedCount();
}

function handleWcmSelectChange(chkId) {
  const chk = document.getElementById(chkId);
  if (chk && !chk.checked) {
    chk.checked = true;
  }
  updateWcmSelectedCount();
}

function autoCheckWcmItem(chkId) {
  const chk = document.getElementById(chkId);
  if (chk && !chk.checked) {
    chk.checked = true;
  }
  updateWcmSelectedCount();
}

function changeWcmQty(inputId, delta, min = 1) {
  const el = document.getElementById(inputId);
  if (!el) return;
  let val = parseInt(el.value || el.textContent || min, 10);
  if (isNaN(val)) val = min;
  val = Math.max(min, val + delta);
  if (el.tagName === "INPUT") el.value = val;
  else el.textContent = val;
  updateWcmSelectedCount();
}

function toggleWcmMoreItems(btn, containerId) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  if (cont.style.display === "none" || !cont.style.display) {
    cont.style.display = "flex";
    btn.textContent = "− Show less";
  } else {
    cont.style.display = "none";
    btn.textContent = "+ Show more";
  }
}

function updateWcmSelectedCount() {
  const modal = document.getElementById("weddingServiceDetailModal");
  if (!modal) return;

  let count = 0;
  // Count active cards
  const activeCards = modal.querySelectorAll(".wcm-option-card.active, .wcm-icon-card.active");
  count += activeCards.length;

  // Count checked checkboxes
  const checkedBoxes = modal.querySelectorAll(".wcm-check-input:checked");
  count += checkedBoxes.length;

  const countText = document.getElementById("wcmSelectedCountText");
  if (countText) {
    if (activeWeddingModalServiceId === "sangyam-sweets") {
      countText.textContent = `${count} item${count === 1 ? '' : 's'} selected`;
    } else if (activeWeddingModalServiceId === "sangyam-bags") {
      countText.textContent = `${count} combo${count === 1 ? '' : 's'} selected`;
    } else {
      countText.textContent = `${count} service${count === 1 ? '' : 's'} selected`;
    }
  }
}

function closeWeddingServiceModal() {
  const modal = document.getElementById("weddingServiceDetailModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";

  try {
    if (window.location.hash.startsWith("#service-")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  } catch(e) {}
}

function confirmWeddingCustomModal() {
  if (activeWeddingModalServiceId) {
    if (!selectedWeddingServices.includes(activeWeddingModalServiceId)) {
      selectedWeddingServices.push(activeWeddingModalServiceId);
    }
    const card = document.getElementById(`card-${activeWeddingModalServiceId}`);
    if (card) card.classList.add("selected");
    updateWeddingQuoteBar();
    showToast("🎉 Services added to your wedding quotation!");
  }
  closeWeddingServiceModal();
}

function openWeddingCallbackModal() {
  const modal = document.getElementById("weddingCallbackModal");
  if (!modal) return;

  const preview = document.getElementById("cbSelectedServicesPreview");
  if (preview) {
    const selectedObjs = (SITE_DATA.weddingServices || []).filter(s => selectedWeddingServices.includes(s.id));
    if (selectedObjs.length > 0) {
      preview.textContent = selectedObjs.map(s => s.title).join(", ");
    } else {
      preview.textContent = "No specific services selected. Our team will guide you through all options.";
    }
  }

  const cityInput = document.getElementById("cbWeddingCity");
  if (cityInput) cityInput.value = appState.selectedCity || "Delhi NCR";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWeddingCallbackModal() {
  const modal = document.getElementById("weddingCallbackModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleWeddingCallbackSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("cbCustomerName").value;
  const phone = document.getElementById("cbCustomerPhone").value;
  const date = document.getElementById("cbWeddingDate").value;
  const city = document.getElementById("cbWeddingCity").value;

  closeWeddingCallbackModal();
  showToast(`🎉 Thank you, ${name}! Your wedding quotation request has been received. Our expert will call you shortly!`);
}


