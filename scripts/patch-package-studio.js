const fs = require('fs');
const path = require('path');

const adminJsPath = path.join(__dirname, '..', 'admin', 'admin.js');
let adminJs = fs.readFileSync(adminJsPath, 'utf8');

// 1. Update appState definition
const oldAppState = `  let appState = {
    categories: [],
    products: [],
    blogs: [],
    activeTab: 'packages',
    searchTerm: '',
    selectedCategory: 'all',
    selectedCategoryTab: 'all',
    selectedSort: 'default',
    editingPackageId: null,
    editingCategoryId: null,
    editingWeddingId: null,
    weddingEditorOptions: [],
    editingBlogId: null,
    inclusionsList: [],
    galleryList: [],
    deletingType: null,
    deletingId: null,
    supabaseConnected: false
  };`;

const newAppState = `  let appState = {
    categories: [],
    products: [],
    blogs: [],
    activeTab: 'packages',
    searchTerm: '',
    selectedCategory: 'all',
    selectedCategoryTab: 'all',
    selectedSort: 'default',
    editingPackageId: null,
    editingCategoryId: null,
    editingWeddingId: null,
    weddingEditorOptions: [],
    editingBlogId: null,
    inclusionsList: [],
    notIncludedList: [],
    galleryList: [],
    faqsList: [],
    addonsList: [],
    colorPalettesList: [],
    deletingType: null,
    deletingId: null,
    supabaseConnected: false
  };

  const DEFAULT_FAQS = [
    { q: "Can I customize the balloon colors?", a: "Yes, absolutely! You can choose from our color palette below (\\"Make It Yours\\") or discuss your custom preference directly with our decorator." },
    { q: "What time will the decorator arrive?", a: "Your certified decorator will arrive within the selected time slot you choose at booking." },
    { q: "Will wall tape leave marks on walls?", a: "No, we exclusively use painter-friendly removable paper tapes that peel off smoothly without peeling paint or leaving sticky residue." },
    { q: "Can I reschedule or cancel?", a: "Yes, free rescheduling is available up to 12 hours before your selected setup slot." }
  ];

  const DEFAULT_ADDONS = [
    { id: "milestone-board", name: "Milestone Board", price: 1999, badge: "POPULAR", image: "https://cdn.balloondekor.com/33/milestone-board-11342678129-371295.webp" },
    { id: "neon-light", name: "Neon Light (Rental)", price: 1999, badge: "POPULAR", image: "https://cdn.balloondekor.com/33/neon-light-11342678129-371296.webp" },
    { id: "rose-petals", name: "Fresh Rose Petals", price: 799, badge: "ROMANTIC", image: "https://cdn.balloondekor.com/33/rose-petals-11342678129-371297.webp" },
    { id: "tea-candles", name: "Tea Candles (Set of 20)", price: 399, badge: "HOT", image: "https://cdn.balloondekor.com/33/tea-candles-11342678129-371298.webp" },
    { id: "custom-board", name: "Customized Welcome Board", price: 1499, badge: "TRENDING", image: "https://cdn.balloondekor.com/33/welcome-board-11342678129-371299.webp" }
  ];

  const DEFAULT_COLOR_PALETTES = [
    { name: "Same as Image", gradient: "linear-gradient(135deg, #be123c 50%, #f59e0b 50%)" },
    { name: "Blue - Pink", gradient: "linear-gradient(135deg, #3b82f6 50%, #ec4899 50%)" },
    { name: "Multicolors", gradient: "linear-gradient(135deg, #ef4444 25%, #eab308 25%, #eab308 50%, #22c55e 50%, #22c55e 75%, #3b82f6 75%)" },
    { name: "Gold - Black", gradient: "linear-gradient(135deg, #f59e0b 50%, #0f172a 50%)" },
    { name: "Silver - Blue", gradient: "linear-gradient(135deg, #94a3b8 50%, #2563eb 50%)" },
    { name: "Red - White", gradient: "linear-gradient(135deg, #ef4444 50%, #ffffff 50%)" },
    { name: "White - Golden", gradient: "linear-gradient(135deg, #ffffff 50%, #f59e0b 50%)" },
    { name: "Pink - Blue", gradient: "linear-gradient(135deg, #f43f5e 50%, #0284c7 50%)" }
  ];

  const DEFAULT_NOT_INCLUDED = [
    "No Helium Gas (All balloons inflated with standard air)",
    "Ladder is not carried by decorator (Customer to provide chair/stool)"
  ];`;

if (adminJs.includes(oldAppState)) {
  adminJs = adminJs.replace(oldAppState, newAppState);
  console.log('Updated appState & defaults in admin.js');
} else {
  console.log('Could not find exact oldAppState, checking...');
}

// 2. Replace openPackageModal and handlers up to CATEGORIES SECTION
const targetStart = `  function openPackageModal(mode, packageId = null, preselectedCat = null) {`;
const targetEnd = `  /* ==========================================================================
     CATEGORIES SECTION (CRUD)`;

const startIndex = adminJs.indexOf(targetStart);
const endIndex = adminJs.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate block for openPackageModal! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const newPackageStudioFunctions = `  function switchPackageTab(tabId, btn) {
    document.querySelectorAll('.pkg-studio-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pkg-studio-pane').forEach(p => p.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      const activeBtn = document.querySelector(\`.pkg-studio-tab-btn[onclick*="'\${tabId}'"]\`);
      if (activeBtn) activeBtn.classList.add('active');
    }
    const target = document.getElementById('pkgPane-' + tabId);
    if (target) target.classList.add('active');
  }

  function openPackageModal(mode, packageId = null, preselectedCat = null) {
    if (mode === 'edit' && packageId) {
      const pkg = appState.products.find(p => p.id === packageId);
      if (pkg && pkg.category === 'wedding') {
        openWeddingServiceEditor(packageId);
        return;
      }
    } else if (preselectedCat === 'wedding') {
      openWeddingServiceEditor(null);
      return;
    }

    appState.editingPackageId = (mode === 'edit') ? packageId : null;
    const modal = document.getElementById('packageModal');
    const modalTitle = document.getElementById('packageModalTitle');
    const slugInput = document.getElementById('pkgSlug');
    const submitBtn = document.getElementById('savePackageBtn');

    renderCategoryFilterOptions();

    // Default to the first tab (Core & Pricing)
    switchPackageTab('core');

    if (mode === 'edit' && packageId) {
      const pkg = appState.products.find(p => p.id === packageId);
      if (!pkg) return;
      const isWedding = (pkg.category === 'wedding');
      modalTitle.textContent = isWedding ? \`Edit Wedding Service: \${pkg.title}\` : \`Edit Package: \${pkg.title}\`;
      submitBtn.textContent = isWedding ? 'Update Wedding Service' : 'Update Package';
      slugInput.readOnly = true;

      // Tab 1: Core & Pricing
      document.getElementById('pkgTitle').value = pkg.title || '';
      slugInput.value = pkg.id || '';
      document.getElementById('pkgCategory').value = pkg.category || (appState.categories[0]?.id || 'birthday');
      document.getElementById('pkgBadge').value = pkg.badge || 'POPULAR';
      document.getElementById('pkgPrice').value = pkg.price || '';
      document.getElementById('pkgOrigPrice').value = pkg.originalPrice || '';
      document.getElementById('pkgDiscount').value = pkg.discount || 0;
      document.getElementById('pkgRating').value = pkg.rating || 4.9;
      document.getElementById('pkgReviews').value = pkg.reviewsCount || 150;
      document.getElementById('pkgDuration').value = pkg.setupDuration || '1.5 - 2 Hours';
      document.getElementById('pkgSlotsAlert').value = pkg.slotsAlert || 'Only 5 slots left this weekend';
      document.getElementById('pkgTags').value = Array.isArray(pkg.tags) ? pkg.tags.join(', ') : '';

      // Tab 2: Media & Gallery
      document.getElementById('pkgImage').value = pkg.image || '';
      appState.galleryList = Array.isArray(pkg.gallery) ? [...pkg.gallery] : [pkg.image || ''];

      // Tab 3: Inclusions & Exclusions
      appState.inclusionsList = Array.isArray(pkg.inclusions) ? [...pkg.inclusions] : [];
      appState.notIncludedList = (Array.isArray(pkg.notIncluded) && pkg.notIncluded.length > 0)
        ? [...pkg.notIncluded]
        : [...DEFAULT_NOT_INCLUDED];

      // Tab 4: About This Package
      document.getElementById('pkgDescription').value = pkg.description || '';
      document.getElementById('pkgAboutDescription').value = pkg.aboutDescription || pkg.description || 'This celebration home setup keeps things simple and pocket-friendly with balloons floating on ceiling and floor to make every corner photo-ready. A happy birthday foil and ribbons finish the look with party charm.';

      // Tab 5: FAQs
      appState.faqsList = (Array.isArray(pkg.faqs) && pkg.faqs.length > 0)
        ? JSON.parse(JSON.stringify(pkg.faqs))
        : JSON.parse(JSON.stringify(DEFAULT_FAQS));

      // Tab 6: Delivery & Care
      document.getElementById('pkgDeliveryNote').value = pkg.deliveryNote || "Available in 100+ cities including Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, and Kolkata.";
      document.getElementById('pkgDecoratorNote').value = pkg.decoratorNote || "Arrives equipped with electric pumps, ladder-ready equipment, and premium materials.";
      document.getElementById('pkgLifespanNote').value = pkg.lifespanNote || "Air-filled latex balloons remain inflated for 24 to 48 hours indoors in room temperature.";
      document.getElementById('pkgLocationNote').value = pkg.locationNote || "Keep away from sharp edges, hot direct halogen lights, and outdoor harsh sunlight.";

      // Tab 7: Add-ons & Colors
      appState.addonsList = (Array.isArray(pkg.addons) && pkg.addons.length > 0)
        ? JSON.parse(JSON.stringify(pkg.addons))
        : JSON.parse(JSON.stringify(DEFAULT_ADDONS));

      appState.colorPalettesList = (Array.isArray(pkg.colorPalettes) && pkg.colorPalettes.length > 0)
        ? JSON.parse(JSON.stringify(pkg.colorPalettes))
        : JSON.parse(JSON.stringify(DEFAULT_COLOR_PALETTES));

    } else {
      const defaultCategory = preselectedCat || (appState.selectedCategoryTab !== 'all' ? appState.selectedCategoryTab : (appState.categories[0]?.id || 'birthday'));
      const isWedding = (defaultCategory === 'wedding');
      modalTitle.textContent = isWedding ? 'Add New Wedding Service' : 'Add New Decoration Package';
      submitBtn.textContent = isWedding ? 'Create Wedding Service' : 'Create Package';
      slugInput.readOnly = false;

      document.getElementById('packageForm').reset();
      slugInput.value = '';
      document.getElementById('pkgCategory').value = defaultCategory;

      document.getElementById('pkgRating').value = 4.9;
      document.getElementById('pkgReviews').value = 120;
      document.getElementById('pkgDuration').value = '1.5 - 2 Hours';
      document.getElementById('pkgSlotsAlert').value = 'Only 5 slots left this weekend';
      document.getElementById('pkgBadge').value = 'BESTSELLER';
      document.getElementById('pkgImage').value = SAMPLE_IMAGES[0].url;
      document.getElementById('pkgDescription').value = 'Stunning celebration decor arranged at your doorstep by expert decorators.';
      document.getElementById('pkgAboutDescription').value = 'This celebration home setup keeps things simple and pocket-friendly with balloons floating on ceiling and floor to make every corner photo-ready.';
      document.getElementById('pkgDeliveryNote').value = 'Available in 100+ cities including Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, and Kolkata.';
      document.getElementById('pkgDecoratorNote').value = 'Arrives equipped with electric pumps, ladder-ready equipment, and premium materials.';
      document.getElementById('pkgLifespanNote').value = 'Air-filled latex balloons remain inflated for 24 to 48 hours indoors in room temperature.';
      document.getElementById('pkgLocationNote').value = 'Keep away from sharp edges, hot direct halogen lights, and outdoor harsh sunlight.';

      appState.inclusionsList = [
        "100 Premium Metallic Balloons (Custom Theme Colors)",
        "Happy Birthday Cursive Cardstock Banner",
        "2 Star / Heart 18-inch Foil Accents",
        "Warm LED Rice String Lights (10m)",
        "Doorstep Setup by Certified Decorator"
      ];
      appState.notIncludedList = [...DEFAULT_NOT_INCLUDED];
      appState.galleryList = [SAMPLE_IMAGES[0].url];
      appState.faqsList = JSON.parse(JSON.stringify(DEFAULT_FAQS));
      appState.addonsList = JSON.parse(JSON.stringify(DEFAULT_ADDONS));
      appState.colorPalettesList = JSON.parse(JSON.stringify(DEFAULT_COLOR_PALETTES));
    }

    renderInclusionsList();
    renderNotIncludedList();
    renderGalleryList();
    renderFaqsList();
    renderAddonsList();
    renderColorPalettesList();
    updatePackageModalPreview();
    modal.classList.add('active');
  }

  // --- Inclusions Handlers ---
  function addInclusionItem() {
    const input = document.getElementById('newInclusionInput');
    const text = input ? input.value.trim() : '';
    if (text) {
      appState.inclusionsList.push(text);
      input.value = '';
      renderInclusionsList();
    }
  }

  function removeInclusionItem(idx) {
    appState.inclusionsList.splice(idx, 1);
    renderInclusionsList();
  }

  function renderInclusionsList() {
    const container = document.getElementById('inclusionsList');
    if (!container) return;
    if (appState.inclusionsList.length === 0) {
      container.innerHTML = \`<div style="font-size:12px;color:var(--text-dim);padding:6px;">No inclusions added yet. Add key decoration items above.</div>\`;
      return;
    }
    container.innerHTML = appState.inclusionsList.map((item, idx) => \`
      <div class="inclusion-item">
        <span>✓ \${escapeHtml(item)}</span>
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeInclusionItem(\${idx})" title="Remove item">✕</button>
      </div>
    \`).join('');
  }

  // --- Not Included (Exclusions) Handlers ---
  function addNotIncludedItem() {
    const input = document.getElementById('newNotIncludedInput');
    const text = input ? input.value.trim() : '';
    if (text) {
      appState.notIncludedList.push(text);
      input.value = '';
      renderNotIncludedList();
    }
  }

  function removeNotIncludedItem(idx) {
    appState.notIncludedList.splice(idx, 1);
    renderNotIncludedList();
  }

  function renderNotIncludedList() {
    const container = document.getElementById('notIncludedList');
    if (!container) return;
    if (appState.notIncludedList.length === 0) {
      container.innerHTML = \`<div style="font-size:12px;color:#9f1239;padding:6px;">No exclusions listed. Add terms like "No Helium Gas" above.</div>\`;
      return;
    }
    container.innerHTML = appState.notIncludedList.map((item, idx) => \`
      <div class="not-inc-item">
        <span>✕ \${escapeHtml(item)}</span>
        <button type="button" class="btn-remove-not-inc" onclick="window.adminStudio.removeNotIncludedItem(\${idx})" title="Remove exclusion">✕</button>
      </div>
    \`).join('');
  }

  // --- Gallery Handlers ---
  function addGalleryItem() {
    const input = document.getElementById('newGalleryInput');
    const url = input ? input.value.trim() : '';
    if (url) {
      appState.galleryList.push(url);
      input.value = '';
      renderGalleryList();
    }
  }

  function removeGalleryItem(idx) {
    appState.galleryList.splice(idx, 1);
    renderGalleryList();
  }

  function renderGalleryList() {
    const container = document.getElementById('galleryList');
    if (!container) return;
    container.innerHTML = appState.galleryList.map((url, idx) => \`
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px;">
        <img src="\${escapeHtml(url)}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;background:#f1f5f9;" onerror="this.src='https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=100&q=80'" />
        <span style="font-size:12px;color:var(--text-muted);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${escapeHtml(url)}</span>
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeGalleryItem(\${idx})">✕</button>
      </div>
    \`).join('');
  }

  // --- FAQs Handlers ---
  function addPkgFaq() {
    appState.faqsList.push({ q: '', a: '' });
    renderFaqsList();
  }

  function removePkgFaq(idx) {
    appState.faqsList.splice(idx, 1);
    renderFaqsList();
  }

  function updatePkgFaq(idx, field, val) {
    if (appState.faqsList[idx]) {
      appState.faqsList[idx][field] = val;
    }
  }

  function renderFaqsList() {
    const container = document.getElementById('faqsList');
    if (!container) return;
    if (appState.faqsList.length === 0) {
      container.innerHTML = \`<div style="font-size:12px;color:var(--text-dim);padding:8px;">No FAQs added yet. Click "+ Add New Question" to add one.</div>\`;
      return;
    }
    container.innerHTML = appState.faqsList.map((faq, idx) => \`
      <div class="faq-builder-item">
        <div class="faq-builder-top">
          <strong style="font-size:12px;color:var(--text-muted);">Question #\${idx + 1}</strong>
          <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removePkgFaq(\${idx})" title="Delete FAQ">✕</button>
        </div>
        <div class="form-field" style="margin-bottom:8px;">
          <input type="text" placeholder="e.g. Can I customize the balloon colors?" value="\${escapeHtml(faq.q)}" oninput="window.adminStudio.updatePkgFaq(\${idx}, 'q', this.value)" />
        </div>
        <div class="form-field">
          <textarea rows="2" placeholder="Answer to the customer..." oninput="window.adminStudio.updatePkgFaq(\${idx}, 'a', this.value)">\${escapeHtml(faq.a)}</textarea>
        </div>
      </div>
    \`).join('');
  }

  // --- Add-ons Handlers ---
  function addPkgAddon() {
    appState.addonsList.push({
      id: 'addon-' + Date.now(),
      name: 'Custom Add-on Item',
      price: 999,
      badge: 'POPULAR',
      image: SAMPLE_IMAGES[0].url
    });
    renderAddonsList();
  }

  function removePkgAddon(idx) {
    appState.addonsList.splice(idx, 1);
    renderAddonsList();
  }

  function updatePkgAddon(idx, field, val) {
    if (appState.addonsList[idx]) {
      if (field === 'price') {
        appState.addonsList[idx][field] = parseInt(val, 10) || 0;
      } else {
        appState.addonsList[idx][field] = val;
      }
    }
  }

  function renderAddonsList() {
    const container = document.getElementById('addonsList');
    if (!container) return;
    if (appState.addonsList.length === 0) {
      container.innerHTML = \`<div style="font-size:12px;color:var(--text-dim);padding:8px;">No add-on products added yet. Click "+ Add New Add-on" to create one.</div>\`;
      return;
    }
    container.innerHTML = appState.addonsList.map((addon, idx) => \`
      <div class="addon-builder-item">
        <img class="addon-thumb-box" src="\${escapeHtml(addon.image || SAMPLE_IMAGES[0].url)}" onerror="this.src='\${SAMPLE_IMAGES[0].url}'" alt="Addon" />
        <div class="form-field" style="margin:0;">
          <label style="font-size:10px;margin-bottom:2px;">Title / Name</label>
          <input type="text" value="\${escapeHtml(addon.name || '')}" placeholder="Add-on Name" oninput="window.adminStudio.updatePkgAddon(\${idx}, 'name', this.value)" />
        </div>
        <div class="form-field" style="margin:0;">
          <label style="font-size:10px;margin-bottom:2px;">Price (₹)</label>
          <input type="number" value="\${addon.price || 0}" placeholder="Price" min="0" oninput="window.adminStudio.updatePkgAddon(\${idx}, 'price', this.value)" />
        </div>
        <div class="form-field" style="margin:0;">
          <label style="font-size:10px;margin-bottom:2px;">Badge</label>
          <input type="text" value="\${escapeHtml(addon.badge || '')}" placeholder="e.g. POPULAR, HOT" oninput="window.adminStudio.updatePkgAddon(\${idx}, 'badge', this.value)" />
        </div>
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removePkgAddon(\${idx})" title="Remove Add-on">✕</button>
      </div>
    \`).join('');
  }

  // --- Balloon Color Palettes Handlers ---
  function addPkgColorPalette() {
    appState.colorPalettesList.push({
      name: 'New Color Palette',
      gradient: 'linear-gradient(135deg, #3b82f6 50%, #ec4899 50%)'
    });
    renderColorPalettesList();
  }

  function removePkgColorPalette(idx) {
    appState.colorPalettesList.splice(idx, 1);
    renderColorPalettesList();
  }

  function updatePkgColorPalette(idx, field, val) {
    if (appState.colorPalettesList[idx]) {
      appState.colorPalettesList[idx][field] = val;
      const dot = document.getElementById(\`colorDotPreview_\${idx}\`);
      if (dot && field === 'gradient') {
        dot.style.background = val;
      }
    }
  }

  function renderColorPalettesList() {
    const container = document.getElementById('colorPalettesList');
    if (!container) return;
    if (appState.colorPalettesList.length === 0) {
      container.innerHTML = \`<div style="font-size:12px;color:var(--text-dim);padding:8px;">No balloon color palettes added. Click "+ Add Color Palette" above.</div>\`;
      return;
    }
    container.innerHTML = appState.colorPalettesList.map((cp, idx) => \`
      <div class="color-palette-item">
        <div id="colorDotPreview_\${idx}" class="color-dot-preview" style="background: \${escapeHtml(cp.gradient)};"></div>
        <input type="text" style="flex:1;" value="\${escapeHtml(cp.name)}" placeholder="Palette Name (e.g. Gold - Black)" oninput="window.adminStudio.updatePkgColorPalette(\${idx}, 'name', this.value)" />
        <input type="text" style="flex:1.5;font-family:monospace;font-size:11px;" value="\${escapeHtml(cp.gradient)}" placeholder="CSS linear-gradient(...) or hex" oninput="window.adminStudio.updatePkgColorPalette(\${idx}, 'gradient', this.value)" />
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removePkgColorPalette(\${idx})" title="Delete Palette">✕</button>
      </div>
    \`).join('');
  }

  function updatePackageModalPreview() {
    const title = document.getElementById('pkgTitle')?.value || 'Package Title Preview';
    const price = document.getElementById('pkgPrice')?.value || '1999';
    const orig = document.getElementById('pkgOrigPrice')?.value || '';
    const imgUrl = document.getElementById('pkgImage')?.value || SAMPLE_IMAGES[0].url;
    const badge = document.getElementById('pkgBadge')?.value || 'BESTSELLER';

    const prevImg = document.getElementById('pkgModalImgPreview');
    const prevTitle = document.getElementById('pkgModalTitlePreview');
    const prevPrice = document.getElementById('pkgModalPricePreview');
    const prevBadge = document.getElementById('pkgModalBadgePreview');

    if (prevImg) prevImg.src = imgUrl;
    if (prevTitle) prevTitle.textContent = title;
    if (prevPrice) prevPrice.textContent = \`₹\${Number(price).toLocaleString('en-IN')}\${orig ? \` (Orig ₹\${Number(orig).toLocaleString('en-IN')})\` : ''}\`;
    if (prevBadge) prevBadge.textContent = badge;
  }

  async function handlePackageFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('pkgTitle').value.trim();
    let slug = document.getElementById('pkgSlug').value.trim();
    const category = document.getElementById('pkgCategory').value;
    const price = parseInt(document.getElementById('pkgPrice').value, 10);
    const origPrice = parseInt(document.getElementById('pkgOrigPrice').value, 10) || price;
    const discount = parseInt(document.getElementById('pkgDiscount').value, 10) || 0;
    const rating = parseFloat(document.getElementById('pkgRating').value) || 4.9;
    const reviewsCount = parseInt(document.getElementById('pkgReviews').value, 10) || 100;
    const badge = document.getElementById('pkgBadge').value.trim();
    const duration = document.getElementById('pkgDuration').value.trim() || '1.5 - 2 Hours';
    const slotsAlert = document.getElementById('pkgSlotsAlert')?.value.trim() || 'Only 5 slots left this weekend';
    const image = document.getElementById('pkgImage').value.trim() || SAMPLE_IMAGES[0].url;
    const description = document.getElementById('pkgDescription').value.trim();
    const aboutDescription = document.getElementById('pkgAboutDescription')?.value.trim() || description;
    const tagsRaw = document.getElementById('pkgTags').value.trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : ['Home Decor'];

    const deliveryNote = document.getElementById('pkgDeliveryNote')?.value.trim() || "Available in 100+ cities including Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, and Kolkata.";
    const decoratorNote = document.getElementById('pkgDecoratorNote')?.value.trim() || "Arrives equipped with electric pumps, ladder-ready equipment, and premium materials.";
    const lifespanNote = document.getElementById('pkgLifespanNote')?.value.trim() || "Air-filled latex balloons remain inflated for 24 to 48 hours indoors in room temperature.";
    const locationNote = document.getElementById('pkgLocationNote')?.value.trim() || "Keep away from sharp edges, hot direct halogen lights, and outdoor harsh sunlight.";

    if (!title || !price || isNaN(price)) {
      showToast('Please fill out all required fields properly.', 'error');
      return;
    }

    if (!slug) slug = slugify(title);

    const catObj = appState.categories.find(c => c.id === category);
    const categoryName = catObj ? catObj.name : category;

    let gallery = [...appState.galleryList];
    if (!gallery.includes(image)) gallery.unshift(image);

    const packageData = {
      id: slug,
      title,
      category,
      categoryName,
      price,
      originalPrice: origPrice,
      discount,
      rating,
      reviewsCount,
      badge,
      setupDuration: duration,
      slotsAlert,
      image,
      gallery,
      description: description || \`Stunning \${title} party setup arranged at your doorstep by expert decorators.\`,
      aboutDescription,
      inclusions: appState.inclusionsList.length > 0 ? [...appState.inclusionsList] : ["Complete setup by expert balloon stylist", "All helium/metallic balloons included"],
      notIncluded: appState.notIncludedList.length > 0 ? [...appState.notIncludedList] : [...DEFAULT_NOT_INCLUDED],
      faqs: appState.faqsList.length > 0 ? JSON.parse(JSON.stringify(appState.faqsList)) : [...DEFAULT_FAQS],
      deliveryNote,
      decoratorNote,
      lifespanNote,
      locationNote,
      addons: appState.addonsList.length > 0 ? JSON.parse(JSON.stringify(appState.addonsList)) : [...DEFAULT_ADDONS],
      colorPalettes: appState.colorPalettesList.length > 0 ? JSON.parse(JSON.stringify(appState.colorPalettesList)) : [...DEFAULT_COLOR_PALETTES],
      tags
    };

    if (appState.editingPackageId) {
      const idx = appState.products.findIndex(p => p.id === appState.editingPackageId);
      if (idx !== -1) {
        appState.products[idx] = packageData;
      }
    } else {
      if (appState.products.some(p => p.id === slug)) {
        showToast(\`Package ID "\${slug}" already exists.\`, 'error');
        return;
      }
      appState.products.unshift(packageData);
    }

    // Save to local & commit
    commitData(\`Package "\${title}" saved with complete studio details!\`);

    // Sync to Supabase in background
    if (supabase) {
      supabase.from('products').upsert({
        id: slug,
        title,
        category,
        category_name: categoryName,
        price,
        original_price: origPrice,
        discount,
        rating,
        reviews_count: reviewsCount,
        badge,
        setup_duration: duration,
        image,
        gallery,
        description: packageData.description,
        inclusions: packageData.inclusions,
        tags
      }).then(({ error }) => {
        if (!error) console.log('Package synced to Supabase:', slug);
      });
    }

    closeAllModals();
  }
`;

adminJs = adminJs.substring(0, startIndex) + newPackageStudioFunctions + adminJs.substring(endIndex);
console.log('Replaced openPackageModal & handlers successfully.');

// 3. Add window.adminStudio exports
const oldExports = `  // Global methods
  window.adminStudio = {
    selectCategoryTab,
    openPackageModal,
    openCategoryModal,
    openDeleteModal,
    removeInclusionItem,
    removeGalleryItem,
    syncWebsiteDefaults,
    openWeddingServiceEditor,
    openWeddingServiceInspector: openWeddingServiceEditor,
    renderWeddingEditorOptions,
    addWseOption,
    removeWseOption,
    updateWseOptField,
    addWseSubItem,
    removeWseSubItem,
    openBlogModal,
    renderBlogs
  };`;

const newExports = `  // Global methods
  window.adminStudio = {
    selectCategoryTab,
    openPackageModal,
    openCategoryModal,
    openDeleteModal,
    switchPackageTab,
    removeInclusionItem,
    removeNotIncludedItem,
    removeGalleryItem,
    addPkgFaq,
    removePkgFaq,
    updatePkgFaq,
    addPkgAddon,
    removePkgAddon,
    updatePkgAddon,
    addPkgColorPalette,
    removePkgColorPalette,
    updatePkgColorPalette,
    syncWebsiteDefaults,
    openWeddingServiceEditor,
    openWeddingServiceInspector: openWeddingServiceEditor,
    renderWeddingEditorOptions,
    addWseOption,
    removeWseOption,
    updateWseOptField,
    addWseSubItem,
    removeWseSubItem,
    openBlogModal,
    renderBlogs
  };`;

if (adminJs.includes(oldExports)) {
  adminJs = adminJs.replace(oldExports, newExports);
  console.log('Updated window.adminStudio exports.');
}

// 4. Add event listener for addNotIncludedBtn & enter key in setupEventListeners
const notIncListenerAnchor = `document.getElementById('addInclusionBtn')?.addEventListener('click', addInclusionItem);`;
const notIncListenerAddition = `document.getElementById('addInclusionBtn')?.addEventListener('click', addInclusionItem);
    document.getElementById('addNotIncludedBtn')?.addEventListener('click', addNotIncludedItem);
    document.getElementById('newNotIncludedInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addNotIncludedItem();
      }
    });`;

if (adminJs.includes(notIncListenerAnchor)) {
  adminJs = adminJs.replace(notIncListenerAnchor, notIncListenerAddition);
  console.log('Added notIncluded event listeners.');
}

fs.writeFileSync(adminJsPath, adminJs, 'utf8');
console.log('admin.js updated successfully!');
