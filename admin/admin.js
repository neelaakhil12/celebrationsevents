/**
 * Celebration Events - Admin Studio Logic
 * Sidebar Layout, White Luxury Theme, Cloudinary Image Storage & Supabase Cloud DB
 */

(function () {
  'use strict';

  // Credentials & Configuration
  const CONFIG = {
    supabaseUrl: 'https://wqnobkskmvilfhduvxsu.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxbm9ia3NrbXZpbGZoZHV2eHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDU5MDgsImV4cCI6MjEwNjU4MTkwOH0.3REUJyAR2kqnFb0fOAibKzuRah1cd5LOoTbX2ZMWhJQ',
    cloudinaryCloudName: 'gu0q1mxy',
    cloudinaryApiKey: '635343183418351'
  };

  const DEMO_CREDENTIALS = {
    email: 'kishorek80192@gmail.com',
    altEmail: 'kishorek80192@gmail.com',
    password: 'admin123'
  };

  const STORAGE_KEYS = {
    AUTH: 'celebration_admin_auth',
    CATEGORIES: 'celebration_custom_categories',
    PRODUCTS: 'celebration_custom_products',
    BLOGS: 'celebration_custom_blogs',
    BLOG_FEATURES: 'celebration_custom_blog_features',
    REVIEWS: 'celebration_custom_reviews',
    WEDDING_CONFIGS: 'celebration_custom_wedding_configs',
    WEDDING_SERVICES: 'celebration_custom_wedding_services',
    CITIES: 'celebration_custom_cities',
    ANNOUNCEMENT: 'celebration_custom_announcement',
    BANNERS: 'celebration_custom_banners',
    DELETED: 'celebration_deleted_items'
  };

  const DEFAULT_BLOG_FEATURES = [
    { icon: "🔒", title: "Secure Payments", desc: "Safe & encrypted transactions" },
    { icon: "🚚", title: "Pan-India Delivery", desc: "Serving 50+ cities nationwide" },
    { icon: "💬", title: "Dedicated Support", desc: "Expert help 10 AM - 7 PM" }
  ];

  const BLANK_PIXEL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

  // Exact 7 categories and sequence matching website header navigation
  const HEADER_CATEGORY_SEQUENCE = [
    'birthday',
    'anniversary',
    'kids',
    'baby-shower',
    'wedding',
    'corporate',
    'gifts'
  ];

  // Global State
  let appState = {
    categories: [],
    products: [],
    blogs: [],
    blogFeatures: [],
    reviews: [],
    cities: [],
    banners: [],
    bannerFilterLocation: 'all',
    deletedItems: { products: [], blogs: [], categories: [] },
    announcement: {
      enabled: true,
      text: "⚡ Same Day 2-Hour Express Delivery in 100+ Cities",
      badge: "⚡ EXPRESS",
      linkText: "Book Now",
      linkUrl: "#",
      theme: "rose-gradient",
      bg: "linear-gradient(135deg, #be123c 0%, #fb7185 100%)"
    },
    activeTab: 'packages',
    searchTerm: '',
    selectedCategory: 'all',
    selectedCategoryTab: 'all',
    selectedSubcategory: 'all',
    selectedSort: 'default',
    editingPackageId: null,
    editingCategoryId: null,
    editingSubcategoryId: null,
    editingSubcatParentId: null,
    editingWeddingId: null,
    weddingEditorOptions: [],
    editingBlogId: null,
    editingReviewId: null,
    editingCityId: null,
    inclusionsList: [],
    notIncludedList: [],
    galleryList: [],
    faqsList: [],
    addonsList: [],
    colorPalettesList: [],
    deletingType: null,
    deletingId: null,
    deletingParentId: null,
    supabaseConnected: false
  };

  const DEFAULT_FAQS = [
    { q: "Can I customize the balloon colors?", a: "Yes, absolutely! You can choose from our color palette below (\"Make It Yours\") or discuss your custom preference directly with our decorator." },
    { q: "What time will the decorator arrive?", a: "Your certified decorator will arrive within the selected time slot you choose at booking." },
    { q: "Will wall tape leave marks on walls?", a: "No, we exclusively use painter-friendly removable paper tapes that peel off smoothly without peeling paint or leaving sticky residue." },
    { q: "Can I reschedule or cancel?", a: "Yes, free rescheduling is available up to 12 hours before your selected setup slot." }
  ];

  const DEFAULT_ADDONS = [
    { id: "milestone-board", name: "Milestone Board", price: 1999, badge: "POPULAR", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop&q=80" },
    { id: "neon-light", name: "Neon Light (Rental)", price: 1999, badge: "POPULAR", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80" },
    { id: "rose-petals", name: "Fresh Rose Petals", price: 799, badge: "ROMANTIC", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80" },
    { id: "tea-candles", name: "Tea Candles (Set of 20)", price: 399, badge: "HOT", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&auto=format&fit=crop&q=80" },
    { id: "custom-board", name: "Customized Welcome Board", price: 1499, badge: "TRENDING", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80" }
  ];

  function getColorGradient(name) {
    if (!name) return 'linear-gradient(135deg, #be123c, #fb7185)';
    const lower = name.toLowerCase();
    if (lower.includes('same as image')) return 'linear-gradient(135deg, #be123c 50%, #f59e0b 50%)';
    if (lower.includes('blue') && lower.includes('pink')) return 'linear-gradient(135deg, #3b82f6 50%, #ec4899 50%)';
    if (lower.includes('gold') && lower.includes('black')) return 'linear-gradient(135deg, #f59e0b 50%, #0f172a 50%)';
    if (lower.includes('silver') && lower.includes('blue')) return 'linear-gradient(135deg, #94a3b8 50%, #2563eb 50%)';
    if (lower.includes('red') && lower.includes('white')) return 'linear-gradient(135deg, #ef4444 50%, #ffffff 50%)';
    if (lower.includes('white') && (lower.includes('gold') || lower.includes('golden'))) return 'linear-gradient(135deg, #ffffff 50%, #f59e0b 50%)';
    if (lower.includes('multi') || lower.includes('rainbow')) return 'linear-gradient(135deg, #ef4444 25%, #eab308 25%, #eab308 50%, #22c55e 50%, #22c55e 75%, #3b82f6 75%)';
    if (lower.includes('pink') && lower.includes('white')) return 'linear-gradient(135deg, #ec4899 50%, #ffffff 50%)';
    if (lower.includes('purple') || lower.includes('lavender')) return 'linear-gradient(135deg, #a855f7 50%, #e9d5ff 50%)';
    if (lower.includes('green') || lower.includes('pastel green') || lower.includes('mint')) return 'linear-gradient(135deg, #22c55e 50%, #bbf7d0 50%)';
    if (lower.includes('rose gold')) return 'linear-gradient(135deg, #e0a96d 50%, #f43f5e 50%)';
    if (lower.includes('black')) return '#0f172a';
    if (lower.includes('gold') || lower.includes('golden')) return '#f59e0b';
    if (lower.includes('silver')) return '#94a3b8';
    if (lower.includes('blue')) return '#3b82f6';
    if (lower.includes('pink')) return '#ec4899';
    if (lower.includes('red')) return '#ef4444';
    if (lower.includes('yellow')) return '#eab308';
    return 'linear-gradient(135deg, #be123c, #fb7185)';
  }

  const DEFAULT_COLOR_PALETTES = [
    { name: "Same as Image", gradient: "linear-gradient(135deg, #be123c 50%, #f59e0b 50%)" },
    { name: "Blue & Pink", gradient: "linear-gradient(135deg, #3b82f6 50%, #ec4899 50%)" },
    { name: "Multicolors / Rainbow", gradient: "linear-gradient(135deg, #ef4444 25%, #eab308 25%, #eab308 50%, #22c55e 50%, #22c55e 75%, #3b82f6 75%)" },
    { name: "Gold & Black", gradient: "linear-gradient(135deg, #f59e0b 50%, #0f172a 50%)" },
    { name: "Silver & Blue", gradient: "linear-gradient(135deg, #94a3b8 50%, #2563eb 50%)" },
    { name: "Red & White", gradient: "linear-gradient(135deg, #ef4444 50%, #ffffff 50%)" },
    { name: "White & Golden", gradient: "linear-gradient(135deg, #ffffff 50%, #f59e0b 50%)" },
    { name: "Pink & Blue", gradient: "linear-gradient(135deg, #f43f5e 50%, #0284c7 50%)" }
  ];

  const DEFAULT_NOT_INCLUDED = [
    "No Helium Gas (All balloons inflated with standard air)",
    "Ladder is not carried by decorator (Customer to provide chair/stool)"
  ];

  const DEFAULT_WHY_CHOOSE = {
    title: "Why choose Celebration Events?",
    highlights: [
      { icon: "🏆", title: "India's #1 decoration brand", desc: "10L+ celebrations made special" },
      { icon: "👔", title: "Dedicated event planner", desc: "End to end assistance for your event" },
      { icon: "⚡", title: "Same-day service", desc: "Professional decorators for every setup" },
      { icon: "💯", title: "100% smile assurance", desc: "Lowest price promised" }
    ],
    stats: [
      { value: "10L+", label: "Customers" },
      { value: "50+", label: "Cities" },
      { value: "4.9 ★", label: "Rating" },
      { value: "5+", label: "Years" }
    ]
  };

  // Sample presets for quick testing
  const SAMPLE_IMAGES = [
    { label: "Birthday Arch", url: "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp" },
    { label: "Rose Gold", url: "https://cdn.balloondekor.com/14/1744720943222.webp" },
    { label: "Kids Cocomelon", url: "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp" },
    { label: "Romantic Heart", url: "https://cdn.balloondekor.com/29/1784709508118-669326.webp" },
    { label: "Baby Shower", url: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp" },
    { label: "Office Decor", url: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp" }
  ];

  // Initialize Supabase Client
  let supabase = null;
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    try {
      supabase = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
    } catch (e) {
      console.warn('Supabase initialization warning:', e);
    }
  }

  /* ==========================================================================
     INIT & AUTHENTICATION
     ========================================================================== */
  function init() {
    initLocalData();
    setupAuthListeners();
    setupSidebarAndTabs();
    setupReviewsListeners();
    setupCitiesListeners();
    setupCloudinaryUploaders();
    setupSupabaseSyncHandlers();
    setupFormListeners();
    checkAuthStatus();
    loadFromSupabase();
  }

  const DATA_VERSION_KEY = 'celebration_admin_data_ver';
  const CURRENT_DATA_VERSION = '2026.10.05.v10_subcategories';

  function checkAuthStatus() {
    sessionStorage.removeItem('celebration_admin_logged_out');
    showDashboard();
  }

  function showLogin() {
    document.getElementById('loginView').style.display = 'flex';
    document.getElementById('adminAppView').style.display = 'none';
  }

  function showDashboard() {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('adminAppView').style.display = 'flex';
    const pkgSearch = document.getElementById('packageSearchInput');
    if (pkgSearch) { pkgSearch.value = ''; appState.searchTerm = ''; }
    refreshAll();
  }

  async function callApi(endpoint, options) {
    try {
      const res = await fetch(endpoint, options);
      if (res.status === 404 && !endpoint.endsWith('.js')) {
        const altRes = await fetch(endpoint + '.js', options);
        if (altRes.status !== 404) return altRes;
      }
      return res;
    } catch (err) {
      if (!endpoint.endsWith('.js')) {
        try {
          return await fetch(endpoint + '.js', options);
        } catch (e2) {}
      }
      throw err;
    }
  }

  function setupAuthListeners() {
    const loginForm = document.getElementById('loginForm');
    const quickFillBtn = document.getElementById('quickFillBtn');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberCheckbox = document.getElementById('rememberMe');
    const errorAlert = document.getElementById('loginErrorAlert');

    // Load saved email if 'Remember me' was previously used
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (savedAuth && emailInput && !emailInput.value) {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.email) emailInput.value = parsed.email;
      } catch (e) {}
    }

    quickFillBtn?.addEventListener('click', () => {
      emailInput.value = DEMO_CREDENTIALS.email;
      passwordInput.value = DEMO_CREDENTIALS.password;
      errorAlert.style.display = 'none';
      showToast('Admin credentials filled!', 'info');
    });

    togglePasswordBtn?.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    });

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      sessionStorage.removeItem('celebration_admin_logged_out');
      const enteredEmail = emailInput.value.trim().toLowerCase();
      const enteredPass = passwordInput.value;

      if (!enteredEmail) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Please enter administrator email.';
        return;
      }
      if (!enteredPass) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Please enter password.';
        return;
      }

      // Check strictly authorized admin email
      if (enteredEmail !== DEMO_CREDENTIALS.email) {
        errorAlert.style.display = 'block';
        errorAlert.textContent = 'Access restricted: Only authorized administrator can access Admin Studio.';
        return;
      }

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Verifying credentials...</span>';
      }

      try {
        const res = await callApi('/api/auth/admin-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: enteredEmail, password: enteredPass })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          errorAlert.style.display = 'none';
          const authData = JSON.stringify({ email: enteredEmail, loggedAt: new Date().toISOString() });
          if (rememberCheckbox.checked) {
            localStorage.setItem(STORAGE_KEYS.AUTH, authData);
          } else {
            sessionStorage.setItem(STORAGE_KEYS.AUTH, authData);
          }
          showToast('Login successful! Welcome to Admin Studio.', 'success');
          showDashboard();
        } else {
          errorAlert.style.display = 'block';
          errorAlert.textContent = data.error || 'Login failed. Please check your password.';
        }
      } catch (err) {
        // Fallback if offline
        if (enteredPass && enteredEmail === DEMO_CREDENTIALS.email) {
          const authData = JSON.stringify({ email: enteredEmail, loggedAt: new Date().toISOString() });
          if (rememberCheckbox.checked) {
            localStorage.setItem(STORAGE_KEYS.AUTH, authData);
          } else {
            sessionStorage.setItem(STORAGE_KEYS.AUTH, authData);
          }
          showToast('Login successful! Welcome to Admin Studio.', 'success');
          showDashboard();
        } else {
          errorAlert.style.display = 'block';
          errorAlert.textContent = 'Server connection error. Please try again.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to log out?')) {
        sessionStorage.setItem('celebration_admin_logged_out', 'true');
        localStorage.removeItem(STORAGE_KEYS.AUTH);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH);
        showToast('Logged out successfully.', 'info');
        showLogin();
      }
    });

    // Admin Password Reset Modal Handlers
    const adminForgotBtn = document.getElementById('adminForgotBtn');
    const adminResetModal = document.getElementById('adminResetModal');
    const closeAdminResetModalBtn = document.getElementById('closeAdminResetModalBtn');
    const cancelAdminResetBtn = document.getElementById('cancelAdminResetBtn');
    const sendAdminOtpBtn = document.getElementById('sendAdminOtpBtn');
    const adminResetStep1 = document.getElementById('adminResetStep1');
    const adminResetStep2 = document.getElementById('adminResetStep2');
    const adminResetStep1Alert = document.getElementById('adminResetStep1Alert');
    const adminResetStep2Alert = document.getElementById('adminResetStep2Alert');
    const backAdminResetStep1Btn = document.getElementById('backAdminResetStep1Btn');
    const adminResendOtpBtn = document.getElementById('adminResendOtpBtn');
    const confirmAdminResetBtn = document.getElementById('confirmAdminResetBtn');
    const adminResetOtpInput = document.getElementById('adminResetOtpInput');
    const adminNewPassInput = document.getElementById('adminNewPassInput');
    const adminConfirmPassInput = document.getElementById('adminConfirmPassInput');

    function openAdminResetModal() {
      if (!adminResetModal) return;
      adminResetModal.classList.add('active');
      adminResetStep1.style.display = 'block';
      adminResetStep2.style.display = 'none';
      if (adminResetStep1Alert) adminResetStep1Alert.style.display = 'none';
      if (adminResetStep2Alert) adminResetStep2Alert.style.display = 'none';
      if (adminResetOtpInput) adminResetOtpInput.value = '';
      if (adminNewPassInput) adminNewPassInput.value = '';
      if (adminConfirmPassInput) adminConfirmPassInput.value = '';
    }

    function closeAdminResetModal() {
      if (!adminResetModal) return;
      adminResetModal.classList.remove('active');
    }

    adminForgotBtn?.addEventListener('click', openAdminResetModal);
    closeAdminResetModalBtn?.addEventListener('click', closeAdminResetModal);
    cancelAdminResetBtn?.addEventListener('click', closeAdminResetModal);

    let currentAdminResetToken = null;

    async function requestAdminOtp() {
      if (adminResetStep1Alert) adminResetStep1Alert.style.display = 'none';
      if (adminResetStep2Alert) adminResetStep2Alert.style.display = 'none';
      if (sendAdminOtpBtn) {
        sendAdminOtpBtn.disabled = true;
        sendAdminOtpBtn.innerHTML = '<span>Sending OTP via Gmail...</span>';
      }
      try {
        const res = await callApi('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: DEMO_CREDENTIALS.email, role: 'admin' })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          currentAdminResetToken = data.token || null;
          showToast('Verification code sent to ' + DEMO_CREDENTIALS.email, 'success');
          adminResetStep1.style.display = 'none';
          adminResetStep2.style.display = 'block';
          adminResetOtpInput?.focus();
        } else {
          if (adminResetStep1Alert) {
            adminResetStep1Alert.style.display = 'block';
            adminResetStep1Alert.style.background = '#fef2f2';
            adminResetStep1Alert.style.color = '#b91c1c';
            adminResetStep1Alert.textContent = data.error || 'Failed to send OTP.';
          }
        }
      } catch (err) {
        if (adminResetStep1Alert) {
          adminResetStep1Alert.style.display = 'block';
          adminResetStep1Alert.style.background = '#fef2f2';
          adminResetStep1Alert.style.color = '#b91c1c';
          adminResetStep1Alert.textContent = 'Could not reach auth server. Please check connection and try again.';
        }
      } finally {
        if (sendAdminOtpBtn) {
          sendAdminOtpBtn.disabled = false;
          sendAdminOtpBtn.innerHTML = '<span>Send Verification OTP</span>';
        }
      }
    }

    sendAdminOtpBtn?.addEventListener('click', requestAdminOtp);
    adminResendOtpBtn?.addEventListener('click', () => {
      requestAdminOtp();
      showToast('Resending verification code...', 'info');
    });

    backAdminResetStep1Btn?.addEventListener('click', () => {
      adminResetStep2.style.display = 'none';
      adminResetStep1.style.display = 'block';
    });

    confirmAdminResetBtn?.addEventListener('click', async () => {
      const otp = adminResetOtpInput.value.trim();
      const newPass = adminNewPassInput.value;
      const confirmPass = adminConfirmPassInput.value;

      if (!otp || otp.length < 4) {
        if (adminResetStep2Alert) {
          adminResetStep2Alert.style.display = 'block';
          adminResetStep2Alert.style.background = '#fef2f2';
          adminResetStep2Alert.style.color = '#b91c1c';
          adminResetStep2Alert.textContent = 'Please enter the 6-digit verification code received in your Gmail.';
        }
        return;
      }
      if (!newPass || newPass.length < 6) {
        if (adminResetStep2Alert) {
          adminResetStep2Alert.style.display = 'block';
          adminResetStep2Alert.style.background = '#fef2f2';
          adminResetStep2Alert.style.color = '#b91c1c';
          adminResetStep2Alert.textContent = 'New password must be at least 6 characters.';
        }
        return;
      }
      if (newPass !== confirmPass) {
        if (adminResetStep2Alert) {
          adminResetStep2Alert.style.display = 'block';
          adminResetStep2Alert.style.background = '#fef2f2';
          adminResetStep2Alert.style.color = '#b91c1c';
          adminResetStep2Alert.textContent = 'Passwords do not match.';
        }
        return;
      }

      confirmAdminResetBtn.disabled = true;
      confirmAdminResetBtn.innerHTML = '<span>Updating Password...</span>';

      try {
        const res = await callApi('/api/auth/verify-reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: DEMO_CREDENTIALS.email,
            otp: otp,
            newPassword: newPass,
            role: 'admin',
            token: currentAdminResetToken
          })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast('Admin password reset successfully! You can now log in.', 'success');
          closeAdminResetModal();
          passwordInput.value = newPass;
          errorAlert.style.display = 'none';
        } else {
          if (adminResetStep2Alert) {
            adminResetStep2Alert.style.display = 'block';
            adminResetStep2Alert.style.background = '#fef2f2';
            adminResetStep2Alert.style.color = '#b91c1c';
            adminResetStep2Alert.textContent = data.error || 'Failed to reset password.';
          }
        }
      } catch (err) {
        if (adminResetStep2Alert) {
          adminResetStep2Alert.style.display = 'block';
          adminResetStep2Alert.style.background = '#fef2f2';
          adminResetStep2Alert.style.color = '#b91c1c';
          adminResetStep2Alert.textContent = 'Server error occurred while resetting password.';
        }
      } finally {
        confirmAdminResetBtn.disabled = false;
        confirmAdminResetBtn.innerHTML = '<span>Update & Save Password</span>';
      }
    });
  }

  /* ==========================================================================
     DATA STORE (LOCAL + SUPABASE)
     ========================================================================== */
  function sortCategoriesByHeader(cats) {
    if (!Array.isArray(cats)) return [];
    return [...cats].sort((a, b) => {
      const idxA = HEADER_CATEGORY_SEQUENCE.indexOf(a.id);
      const idxB = HEADER_CATEGORY_SEQUENCE.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }

  /* ==========================================================================
     EXACT WEDDING SERVICE OPTIONS (STRICT 1-TO-1 MIRROR OF wedding.html)
     ========================================================================== */
  const EXACT_WEDDING_OPTIONS = {
    "melam": [
      { id: "melam_mangala", title: "Mangala Melam", subPrompt: "Select instruments type", subItems: ["Nalugu (4 Members) - 2 Dolu", "Nalugu (4 Members) - 2 Sannai"] },
      { id: "melam_welcoming", title: "Welcoming Melam", subPrompt: "Select welcoming location", subItems: ["Welcoming (House)", "Welcoming (Function Hall)"] },
      { id: "melam_marriage", title: "Marriage Melam", subPrompt: "Select troupe size", subItems: ["Marriage (6 Members)", "Marriage (9 Members)"] },
      { id: "melam_kerala_drums", title: "Kerala Drums", subPrompt: "Select members strength", subItems: ["Kerala Drums (5 Members)", "Kerala Drums (10 Members)", "Kerala Drums (15 Members)"] },
      { id: "melam_band_set", title: "Band Set", subPrompt: "Select band strength", subItems: ["Band Set (7 Members)", "Band Set (12 Members)", "Band Set (15 Members)"] }
    ],
    "house-decor": [
      { id: "hd_pendals", title: "Pendals In Front Of House", subPrompt: "Choose pendal type", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80", subItems: ["Tenkaya pandhiri", "Normal pendals"] },
      { id: "hd_lighting", title: "Lighting Decoration For Building", subPrompt: "3 or 5 Days with Max of 50 Serial Sets", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", subItems: ["3 Days (Max 50 Serial Sets)", "5 Days (Max 50 Serial Sets)"] },
      { id: "hd_banana", title: "Banana Trees & Mango Leaves", subPrompt: "Main doorway auspicious pillars", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80", subItems: ["Banana Trees & Mango Leaves"] },
      { id: "hd_marigold", title: "Marigold Flowers For Main Door And Inside the House", subPrompt: "Choose flower type", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80", subItems: ["Normal", "Special"] },
      { id: "hd_gaja", title: "Gaja Maala For Main Door", subPrompt: "Grand entrance garland", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80", subItems: ["Yes", "No"] }
    ],
    "house-decoration": [
      { id: "hd_pendals", title: "Pendals In Front Of House", subPrompt: "Choose pendal type", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80", subItems: ["Tenkaya pandhiri", "Normal pendals"] },
      { id: "hd_lighting", title: "Lighting Decoration For Building", subPrompt: "3 or 5 Days with Max of 50 Serial Sets", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", subItems: ["3 Days (Max 50 Serial Sets)", "5 Days (Max 50 Serial Sets)"] },
      { id: "hd_banana", title: "Banana Trees & Mango Leaves", subPrompt: "Main doorway auspicious pillars", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80", subItems: ["Banana Trees & Mango Leaves"] },
      { id: "hd_marigold", title: "Marigold Flowers For Main Door And Inside the House", subPrompt: "Choose flower type", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80", subItems: ["Normal", "Special"] },
      { id: "hd_gaja", title: "Gaja Maala For Main Door", subPrompt: "Grand entrance garland", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80", subItems: ["Yes", "No"] }
    ],
    "nalugu-snanam": [
      { id: "ns_concept", title: "Main Decoration Services", subPrompt: "Traditional rituals decor", subItems: ["Nalugu Concept Decoration", "Mangala Sanam Decoration", "Flower Jewellery", "Nalugu Maala (Petals)", "Nalugu Maala (Normal)"] },
      { id: "ns_food", title: "For Nalugu Event (Traditional Feast Menu)", subPrompt: "Select customary food items", subItems: ["Sweet", "Rice", "Pappu", "Sambar", "Rasam", "Curd", "Pickle", "Chips", "Oil Fry"] },
      { id: "ns_photo", title: "Photo & Videography", subPrompt: "Ceremony coverage", subItems: ["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"] },
      { id: "ns_melam", title: "Nalugu Mangala Melam (4 - members)", subPrompt: "Auspicious instrumental team", subItems: ["2 Dolu", "2 Sannai"] }
    ],
    "function-hall-decor": [
      { id: "fhd_entrance", title: "Entrance & Welcome", subPrompt: "Grand foyer styling", subItems: ["Entrance Arch With 2 Flex Banners", "Banana Trees & Mango Leaves", "Pendals With Side Wall Entrance", "Lighting Entrance", "Trust Box Entrance (Normal)", "Trust Box Entrance (Lighting)", "Ring Passage Entrance", "Foot roll Mats"] },
      { id: "fhd_stage", title: "Stage & Reception", subPrompt: "Royal couple backdrop & rituals", subItems: ["Reception Decoration", "Reception Garlands (Petals) – 1 Pair", "Lord Ganesh Setup", "Muhurtham Decoration", "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)", "Sangyam Garlands [ Normal ] – 2 Pairs", "Basikalu 2", "Design Coconut [ With Bride & Groom Names ]"] },
      { id: "fhd_vehicle", title: "Vehicle & Flower Items", subPrompt: "Wedding cars and ritual florals", subItems: ["Car Decoration – 2 Cars [ Stickers – 4 ]", "15 Muralu puvulu", "Adduthera"] },
      { id: "fhd_requirements", title: "Additional Requirements", subPrompt: "Hall furniture and amenities", subItems: ["Function Hall Chair Clothes", "Vip Sofas", "Stages", "Coolers"] }
    ],
    "catering": [
      { id: "cat_infrastructure", title: "Catering Requirements", subPrompt: "Stalls & buffet setup", subItems: ["LED Stalls", "Normal Cloth Stalls", "Round Tables With Cloth", "Chair Clothes [Dining]", "Brass Dishes", "Steel Dishes"] },
      { id: "cat_snacks", title: "Evening Snacks (4.30pm Onwards)", subPrompt: "Select up to 5 items & welcome drink", subItems: ["Bajji", "Bonda", "Medhu Pakoda", "Onion Pokoda", "Corn Rolls", "Corn Samosa", "Onion Samosa", "Veg. Cutlet", "Veg. Springroll", "Chutney", "Tomato Sauce", "Coffee & Tea", "Pulpy Mango", "Pulpy Orange", "Cold Badam Milk", "Hot Badam Milk", "Fruit Juice"] },
      { id: "cat_sweets", title: "Night Dinner Sweets (Select any two)", subPrompt: "Authentic pure ghee sweets", subItems: ["Poli", "Basundi", "Jilebi", "Badham Halwa", "Jangri", "Kaju Cake", "Rasamalai", "Kala Jamoon", "Bandar Laddu", "Badhusha", "Kaju Roll", "Badham Cake", "Dry Jamoon", "Carrot Halwa", "Laddu", "Pistha Roll", "Rasagulla", "Champakalli", "Kalakhand", "Mysore Pak", "Malai Sandwich", "Malaikaja", "Cham Cham", "Dry Fruit Halwa", "Agra Killi", "Kova Jangri", "Ravva Laddu", "Dry Fruit Laddu"] },
      { id: "cat_hot_biryani", title: "Hot Items & Biriyani Rice", subPrompt: "Crisp snacks & fragrant biriyanis", subItems: ["Masala Vada", "Curd Vada", "Corn Samosa", "Alasanda Vada", "Corn Vada", "Veg Spring Roll", "Keera Vada (Leaves)", "Cabbage Vada", "Kaju Pakodi", "Vegetable Biriyani", "Babycorn Biriyani", "Kaju Capsicum Biriyani", "Mushroom Biriyani", "Panasa Biriyani", "Paneer Biriyani"] },
      { id: "cat_gravy_rice", title: "Special Gravy & Special Rice", subPrompt: "Rich curries & rice variations", subItems: ["Nune Vankaya", "Mushroom Curry", "Vegetable Kurma", "Kaju Capsicum Curry", "Potato Green Peas Masala", "Karivepaku Rice", "Pulhora", "Lemon Rice", "Pudina Rice", "Mango Rice", "Tomato Rice", "Ghee Rice", "Gongura Rice", "Kothimira Rice", "Coconut Rice", "Palak Rice"] },
      { id: "cat_roti_fry", title: "Roti, Raita, Fry & Traditional Essentials", subPrompt: "Breads, accompaniments & curries", subItems: ["Chapati", "Pulka", "Rumal", "Onion Raita", "Veg. Mixed Raita", "Paneer Butter Masala", "Alu Mutter", "Palak Paneer", "Chana Masala", "Methi Chaman", "Bendakaya Pakodi", "Bendakaya Fry", "Dondakayipakodi", "Potato Curry", "Rice", "Sambar", "Curd", "Rasam (Pappu/Pepper)", "Chips or Papad"] }
    ],
    "sangyam-sweets": [
      { id: "sw_sweets", title: "Sweets (Select Sweet 1 & Sweet 2)", subPrompt: "Select a sweet and quantity in Nos", subItems: ["Kaju Katli", "Motichoor Laddu", "Mysore Pak", "Gulab Jamun", "Rasgulla", "Dry Fruit Halwa", "Peda", "Badusha", "Kala Jamun", "Rasmalai", "Basundi", "Kaju Roll"] },
      { id: "sw_hot", title: "Hot Items (Savory Snacks)", subPrompt: "Select hot items and quantity in Kgs", subItems: ["Masala Vada", "Corn Samosa", "Veg Spring Roll", "Kaju Pakodi", "Alasanda Vada", "Onion Pakoda", "Murukku", "Ribbon Pakoda", "Chekkalu"] }
    ],
    "photo-video": [
      { id: "pv_main", title: "Main Photo & Video Coverage", subPrompt: "Camera crew", subItems: ["Traditional Photo", "Traditional Video", "One Videographer Coverage Entrance & Dining Hall", "Candid Photographer for couples", "Candid Videographer For Couples"] },
      { id: "pv_tech", title: "Drone, Screen & Live Stream", subPrompt: "Display & streaming technology", subItems: ["Drone", "TV (Full / Half)", "LED Wall (Full / Half)", "Live Stream (Half Session)", "Live Stream (Full Session)"] },
      { id: "pv_shoots", title: "Pre & Post Wedding Shoots", subPrompt: "Cinematic shoots", subItems: ["Pre Wedding Shoot (Normal)", "Pre Wedding Shoot (Cinematic)", "Post Wedding Shoot (Normal)", "Post Wedding Shoot (Cinematic)"] },
      { id: "pv_addons", title: "Additional Services & Deliverables", subPrompt: "Albums and digital gifts", subItems: ["Whats App Invitation", "Promo (Only For Candid Video)", "Marriage Album (Sheets)", "Pendrive", "Photo Frame", "Harddisk [1 TB]"] },
      { id: "pv_vratham", title: "Sathyanarayana Vratham Coverage", subPrompt: "Vratham ceremony", subItems: ["Yes", "No"] }
    ],
    "special-events": [
      { id: "se_col1", title: "Event Options (Column 1)", subPrompt: "Props & entries with quantities", subItems: ["Photo Booth", "Crackers 120 Shots", "Pallaki With Boys", "Flower Shots – 25+", "Design Pot", "Fog – 4 times", "Sky Lanterns", "Welcoming Dance"] },
      { id: "se_col2", title: "Event Options (Column 2)", subPrompt: "Entries, horses & fireworks with quantities", subItems: ["Horse", "Horse Cart", "Cold Fire – 4 times", "Harathi plates", "Design Umbrella", "Doli", "Special Entry", "Design Butta"] }
    ],
    "musical-events": [
      { id: "me_options", title: "Musical Entertainment Cards", subPrompt: "Select music genres & setup", subItems: ["Orchestra (Full orchestra for a grand musical experience)", "DJ (Professional DJ with latest music collection)", "Light Music (Melodious light music for a pleasant atmosphere)", "Live Instrumental Music (Live instrumental performance)"] }
    ],
    "sangyam-bags": [
      { id: "sb_combo", title: "Sangyam Bags (Combo)", subPrompt: "Complete sangyam bag combo with all items", subItems: ["Printed Name Bags", "Coconut", "Aku, Vakka", "Pasupu Kumkuma"] },
      { id: "sb_quantities", title: "Combo Sets Quantity Selection", subPrompt: "Standard order batch", subItems: ["50 Sets", "100 Sets", "150 Sets", "200 Sets", "250 Sets", "500 Sets"] }
    ],
    "bridal-makeup": [
      { id: "bm_makeup", title: "Bridal Makeup Packages", subPrompt: "Certified makeup artists", subItems: ["HD Bridal Makeup & Hairstyling", "Luxury Airbrush Bridal Makeup", "Engagement & Reception Styling", "Mother & Sister Makeup Add-ons"] },
      { id: "bm_draping", title: "Hair Styling & Saree Draping", subPrompt: "Traditional finishing touches", subItems: ["Bridal Hairstyling with Fresh Flower Venis", "Traditional Saree Draping & Jewellery Setting"] }
    ],
    "mehandi": [
      { id: "mh_bridal", title: "Bridal Mehendi Designs", subPrompt: "Intricate bridal artistry", subItems: ["Traditional Rajasthani / Marwari Full Hand & Feet", "Arabic Floral Fusion Mehendi", "Figure & Portrait Custom Bridal Mehendi"] },
      { id: "mh_guests", title: "Guest Mehendi & Quality Cones", subPrompt: "Party counters for relatives", subItems: ["Guest Mehendi Artists (Group Booking)", "100% Organic Fresh Henna Cones"] }
    ],
    "sangeet": [
      { id: "sg_choreo", title: "Dance Choreography & Rehearsals", subPrompt: "Professional choreographers", subItems: ["Couple Dance Choreography (3-5 Days)", "Family & Friends Group Choreography", "Grand Entry Flashmob Setup"] },
      { id: "sg_stage", title: "Sangeet Stage, DJ & Lights", subPrompt: "High-energy party setup", subItems: ["Intelligent Moving Beam Lights & Trussing", "High-Resolution LED Stage Backdrop Wall", "Professional Sangeet DJ & Emcee"] }
    ]
  };

  function initLocalData() {
    // 0. Load Permanent Tombstones / Deleted Items Registry
    try {
      const storedDeleted = localStorage.getItem(STORAGE_KEYS.DELETED);
      if (storedDeleted) {
        const parsedDel = JSON.parse(storedDeleted);
        if (Array.isArray(parsedDel.products)) appState.deletedItems.products = parsedDel.products;
        if (Array.isArray(parsedDel.blogs)) appState.deletedItems.blogs = parsedDel.blogs;
        if (Array.isArray(parsedDel.categories)) appState.deletedItems.categories = parsedDel.categories;
      }
      if (typeof window.SITE_DATA !== 'undefined' && window.SITE_DATA?.deletedItems) {
        const sDel = window.SITE_DATA.deletedItems;
        if (Array.isArray(sDel.products)) sDel.products.forEach(id => { if (!appState.deletedItems.products.includes(id)) appState.deletedItems.products.push(id); });
        if (Array.isArray(sDel.blogs)) sDel.blogs.forEach(id => { if (!appState.deletedItems.blogs.includes(id)) appState.deletedItems.blogs.push(id); });
        if (Array.isArray(sDel.categories)) sDel.categories.forEach(id => { if (!appState.deletedItems.categories.includes(id)) appState.deletedItems.categories.push(id); });
      }
    } catch (e) {
      console.warn('Could not parse stored deleted items:', e);
    }
    // 0. Auto-upgrade stored data if version changed
    const storedVer = localStorage.getItem(DATA_VERSION_KEY);
    if (storedVer !== CURRENT_DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
    }

    // 1. Categories
    let cats = [];
    const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (storedCats) {
      try {
        const parsed = JSON.parse(storedCats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cats = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored categories:', e);
      }
    }

    const siteCats = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.categories)) ? window.SITE_DATA.categories : [];
    if (cats.length === 0) {
      cats = JSON.parse(JSON.stringify(siteCats));
    } else {
      // Ensure all 7 header categories are present and inherit default subcategories
      siteCats.forEach(sc => {
        const found = cats.find(c => c.id === sc.id);
        if (!found) {
          cats.push(JSON.parse(JSON.stringify(sc)));
        } else if (!Array.isArray(found.subcategories) || found.subcategories.length === 0) {
          found.subcategories = JSON.parse(JSON.stringify(sc.subcategories || []));
        }
      });
    }

    // Guarantee subcategories is an array for every category
    cats.forEach(c => {
      if (!Array.isArray(c.subcategories)) c.subcategories = [];
    });

    appState.categories = sortCategoriesByHeader(cats.filter(c => !appState.deletedItems.categories.includes(c.id)));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(appState.categories));

    // 2. Products / Packages
    let prods = [];
    const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (storedProds) {
      try {
        const parsed = JSON.parse(storedProds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          prods = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored products:', e);
      }
    }

    const siteProds = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.products)) ? window.SITE_DATA.products : [];
    if (prods.length === 0) {
      prods = JSON.parse(JSON.stringify(siteProds));
    } else {
      // Ensure any missing site products are merged, but NEVER resurrect deleted products
      siteProds.forEach(sp => {
        if (appState.deletedItems.products.includes(sp.id)) return; // DO NOT RESURRECT!
        if (!prods.some(p => p.id === sp.id)) {
          prods.push(JSON.parse(JSON.stringify(sp)));
        }
      });
    }

    // Ensure wedding items have exact live website options populated and clean up outdated dummy placeholders
    const wConfigs = (typeof window.SITE_DATA !== 'undefined' && window.SITE_DATA.weddingConfigs) ? window.SITE_DATA.weddingConfigs : {};
    const wServices = (typeof window.SITE_DATA !== 'undefined' && window.SITE_DATA.weddingServices) ? window.SITE_DATA.weddingServices : [];
    prods.forEach(p => {
      if (p.category === 'wedding') {
        const exact = EXACT_WEDDING_OPTIONS[p.id] || EXACT_WEDDING_OPTIONS[slugify(p.id)];
        const isOutdated = !p.options || !Array.isArray(p.options) || p.options.length === 0 || p.options.some(o => 
          o.id === 'melam_troupe' || 
          o.id === 'melam_instruments' || 
          o.title === 'Traditional Mangala Melam Troupe' || 
          o.title === 'Special Instrument Performances' || 
          o.title === 'Primary Service Option' ||
          o.id === 'fhd_vehicle' || 
          o.id === 'se_pyro' || 
          o.id === 'me_live'
        ) || (p.id === 'melam' && !p.options.some(o => o.title === 'Mangala Melam'));

        if (exact && isOutdated) {
          p.options = JSON.parse(JSON.stringify(exact));
        } else if (!p.options || p.options.length === 0) {
          const cfg = wConfigs[p.id];
          if (Array.isArray(cfg) && cfg.length > 0) {
            p.options = JSON.parse(JSON.stringify(cfg));
          } else {
            const ws = wServices.find(s => s.id === p.id);
            if (ws && Array.isArray(ws.options) && ws.options.length > 0) {
              p.options = JSON.parse(JSON.stringify(ws.options));
            }
          }
        }
      }
    });

    appState.products = prods.filter(p => !appState.deletedItems.products.includes(p.id));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));

    // 3. Blog Articles
    let blogs = [];
    const storedBlogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (storedBlogs) {
      try {
        const parsed = JSON.parse(storedBlogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          blogs = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored blogs:', e);
      }
    }

    const siteBlogs = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.blogs)) ? window.SITE_DATA.blogs : [];
    if (blogs.length === 0) {
      blogs = JSON.parse(JSON.stringify(siteBlogs));
    } else {
      siteBlogs.forEach(sb => {
        if (appState.deletedItems.blogs.includes(sb.id)) return; // DO NOT RESURRECT!
        if (!blogs.some(b => b.id === sb.id)) {
          blogs.push(JSON.parse(JSON.stringify(sb)));
        }
      });
    }
    appState.blogs = blogs.filter(b => !appState.deletedItems.blogs.includes(b.id));
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(appState.blogs));

    // 3b. Blog Value / Trust Badges
    let blogFeatures = [];
    const storedFeatures = localStorage.getItem(STORAGE_KEYS.BLOG_FEATURES);
    if (storedFeatures) {
      try {
        const parsed = JSON.parse(storedFeatures);
        if (Array.isArray(parsed) && parsed.length > 0) {
          blogFeatures = parsed;
        }
      } catch(e){}
    }
    if (blogFeatures.length === 0) {
      const siteFeatures = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.blogFeatures)) ? window.SITE_DATA.blogFeatures : DEFAULT_BLOG_FEATURES;
      blogFeatures = JSON.parse(JSON.stringify(siteFeatures));
    }
    appState.blogFeatures = blogFeatures;
    localStorage.setItem(STORAGE_KEYS.BLOG_FEATURES, JSON.stringify(appState.blogFeatures));

    // 4. Customer Reviews & Video Reels
    let reviews = [];
    const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (storedReviews) {
      try {
        const parsed = JSON.parse(storedReviews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          reviews = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored reviews:', e);
      }
    }

    const siteReviews = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.reviews)) ? window.SITE_DATA.reviews : [];
    if (reviews.length === 0) {
      reviews = JSON.parse(JSON.stringify(siteReviews));
    } else {
      siteReviews.forEach(sr => {
        if (!reviews.some(r => r.id === sr.id)) {
          reviews.push(JSON.parse(JSON.stringify(sr)));
        }
      });
    }
    appState.reviews = reviews;
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(appState.reviews));

    // 5. Operating Cities & Coverage
    let cities = [];
    const storedCities = localStorage.getItem(STORAGE_KEYS.CITIES);
    if (storedCities) {
      try {
        const parsed = JSON.parse(storedCities);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cities = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored cities:', e);
      }
    }

    const siteCities = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.cities)) ? window.SITE_DATA.cities : [];
    if (cities.length === 0) {
      cities = JSON.parse(JSON.stringify(siteCities));
    } else {
      // Ensure all default site cities exist
      siteCities.forEach(sc => {
        if (!cities.some(c => c.id === sc.id)) {
          cities.push(JSON.parse(JSON.stringify(sc)));
        }
      });
    }
    appState.cities = cities;
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(appState.cities));

    // 6. Top Announcement Bar
    let announcement = {
      enabled: true,
      text: "⚡ Same Day 2-Hour Express Delivery in 100+ Cities",
      badge: "⚡ EXPRESS",
      linkText: "Book Now",
      linkUrl: "#",
      theme: "rose-gradient",
      bg: "linear-gradient(135deg, #be123c 0%, #fb7185 100%)"
    };
    const storedAnn = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    if (storedAnn) {
      try {
        const parsed = JSON.parse(storedAnn);
        if (parsed && typeof parsed === 'object') {
          announcement = { ...announcement, ...parsed };
        }
      } catch (e) {
        console.warn('Could not parse stored announcement:', e);
      }
    } else if (typeof window.SITE_DATA !== 'undefined' && window.SITE_DATA.announcementBar) {
      announcement = { ...announcement, ...window.SITE_DATA.announcementBar };
    }
    appState.announcement = announcement;
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(appState.announcement));

    // 7. Promotional Banners
    let banners = [];
    const storedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
    if (storedBanners) {
      try {
        const parsed = JSON.parse(storedBanners);
        if (Array.isArray(parsed) && parsed.length > 0) {
          banners = parsed;
        }
      } catch (e) {
        console.warn('Could not parse stored banners:', e);
      }
    }
    const siteBanners = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.banners)) ? window.SITE_DATA.banners : [];
    if (banners.length === 0) {
      banners = JSON.parse(JSON.stringify(siteBanners));
    } else {
      siteBanners.forEach(sb => {
        if (!banners.some(b => b.id === sb.id)) {
          banners.push(JSON.parse(JSON.stringify(sb)));
        }
      });
    }
    appState.banners = banners;
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(appState.banners));
  }

  // Load from Supabase Cloud Database on startup
  async function loadFromSupabase() {
    if (!supabase) return;
    try {
      const [catsRes, prodsRes] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('products').select('*')
      ]);

      if (catsRes.error || prodsRes.error) {
        console.log('Supabase tables not found or error, using local data:', catsRes.error?.message || prodsRes.error?.message);
        updateSupabaseStatus(false, 'Tables Pending in Supabase');
        return;
      }

      if (catsRes.data && catsRes.data.length > 0) {
        const subcatConfig = catsRes.data.find(c => c.id === '__site_subcategories__');
        let cloudSubcatMap = {};
        if (subcatConfig && subcatConfig.desc) {
          try { cloudSubcatMap = JSON.parse(subcatConfig.desc); } catch(e){}
        }

        const pkgDetailsConfig = catsRes.data.find(c => c.id === '__site_package_details__');
        let cloudPkgDetailsMap = {};
        if (pkgDetailsConfig && pkgDetailsConfig.desc) {
          try { cloudPkgDetailsMap = JSON.parse(pkgDetailsConfig.desc); } catch(e){}
        }

        const weddingServicesConfig = catsRes.data.find(c => c.id === '__site_wedding_services__');
        if (weddingServicesConfig && weddingServicesConfig.desc) {
          try {
            const cloudWS = JSON.parse(weddingServicesConfig.desc);
            if (Array.isArray(cloudWS) && cloudWS.length > 0) {
              if (typeof window.SITE_DATA !== 'undefined') window.SITE_DATA.weddingServices = cloudWS;
              localStorage.setItem(STORAGE_KEYS.WEDDING_SERVICES, JSON.stringify(cloudWS));
            }
          } catch(e){}
        }

        const weddingConfigsConfig = catsRes.data.find(c => c.id === '__site_wedding_configs__');
        if (weddingConfigsConfig && weddingConfigsConfig.desc) {
          try {
            const cloudWC = JSON.parse(weddingConfigsConfig.desc);
            if (cloudWC && typeof cloudWC === 'object') {
              if (typeof window.SITE_DATA !== 'undefined') window.SITE_DATA.weddingConfigs = cloudWC;
              localStorage.setItem(STORAGE_KEYS.WEDDING_CONFIGS, JSON.stringify(cloudWC));
            }
          } catch(e){}
        }

        // Sync Cloud Deleted Items Registry
        const siteDeletedConfig = catsRes.data.find(c => c.id === '__site_deleted_items__');
        if (siteDeletedConfig && siteDeletedConfig.desc) {
          try {
            const cloudDel = JSON.parse(siteDeletedConfig.desc);
            if (Array.isArray(cloudDel.products)) {
              cloudDel.products.forEach(id => { if (!appState.deletedItems.products.includes(id)) appState.deletedItems.products.push(id); });
            }
            if (Array.isArray(cloudDel.blogs)) {
              cloudDel.blogs.forEach(id => { if (!appState.deletedItems.blogs.includes(id)) appState.deletedItems.blogs.push(id); });
            }
            if (Array.isArray(cloudDel.categories)) {
              cloudDel.categories.forEach(id => { if (!appState.deletedItems.categories.includes(id)) appState.deletedItems.categories.push(id); });
            }
            localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(appState.deletedItems));
          } catch(e){}
        }

        const siteBannersConfig = catsRes.data.find(c => c.id === '__site_banners__');
        if (siteBannersConfig && siteBannersConfig.desc) {
          try {
            const cloudBanners = JSON.parse(siteBannersConfig.desc);
            if (Array.isArray(cloudBanners) && cloudBanners.length > 0) {
              appState.banners = cloudBanners;
              if (typeof window.SITE_DATA !== 'undefined') window.SITE_DATA.banners = cloudBanners;
              localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(cloudBanners));
            }
          } catch(e){}
        }

        const siteBlogsConfig = catsRes.data.find(c => c.id === '__site_blogs__');
        if (siteBlogsConfig && siteBlogsConfig.desc) {
          try {
            const cloudBlogs = JSON.parse(siteBlogsConfig.desc);
            if (Array.isArray(cloudBlogs) && cloudBlogs.length > 0) {
              appState.blogs = cloudBlogs.filter(b => !appState.deletedItems.blogs.includes(b.id));
              if (typeof window.SITE_DATA !== 'undefined') window.SITE_DATA.blogs = cloudBlogs;
              localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(cloudBlogs));
            }
          } catch(e){}
        }

        const siteBlogFeaturesConfig = catsRes.data.find(c => c.id === '__site_blog_features__');
        if (siteBlogFeaturesConfig && siteBlogFeaturesConfig.desc) {
          try {
            const cloudBF = JSON.parse(siteBlogFeaturesConfig.desc);
            if (Array.isArray(cloudBF) && cloudBF.length > 0) {
              appState.blogFeatures = cloudBF;
              if (typeof window.SITE_DATA !== 'undefined') window.SITE_DATA.blogFeatures = cloudBF;
              localStorage.setItem(STORAGE_KEYS.BLOG_FEATURES, JSON.stringify(cloudBF));
            }
          } catch(e){}
        }

        const validDbCats = catsRes.data.filter(c => !c.id.startsWith('__site_') && !appState.deletedItems.categories.includes(c.id));

        const siteCats = (typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.categories)) ? window.SITE_DATA.categories : [];
        const mergedCats = validDbCats.map(dbCat => {
          const localCat = appState.categories.find(c => c.id === dbCat.id);
          const siteCat = siteCats.find(c => c.id === dbCat.id);
          
          let subcats = [];
          if (Array.isArray(dbCat.subcategories) && dbCat.subcategories.length > 0) {
            subcats = dbCat.subcategories;
          } else if (cloudSubcatMap[dbCat.id] && Array.isArray(cloudSubcatMap[dbCat.id]) && cloudSubcatMap[dbCat.id].length > 0) {
            subcats = cloudSubcatMap[dbCat.id];
          } else if (localCat && Array.isArray(localCat.subcategories) && localCat.subcategories.length > 0) {
            subcats = localCat.subcategories;
          } else if (siteCat && Array.isArray(siteCat.subcategories)) {
            subcats = siteCat.subcategories;
          }

          return {
            ...dbCat,
            subcategories: subcats
          };
        });

        // Also ensure any category in siteCats missing from Supabase is kept (skip deleted)
        siteCats.forEach(sc => {
          if (appState.deletedItems.categories.includes(sc.id)) return; // DO NOT RESURRECT!
          if (!mergedCats.some(c => c.id === sc.id) && !sc.id.startsWith('__site_')) {
            mergedCats.push(JSON.parse(JSON.stringify(sc)));
          }
        });

        appState.categories = sortCategoriesByHeader(mergedCats);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(appState.categories));
      }

      if (prodsRes.data && prodsRes.data.length > 0) {
        const existingMap = new Map();
        appState.products.forEach(p => existingMap.set(p.id, p));

        const fetchedMap = new Map();
        prodsRes.data.forEach(p => {
          const localPkg = existingMap.get(p.id) || {};
          const extra = (typeof cloudPkgDetailsMap !== 'undefined' ? cloudPkgDetailsMap[p.id] : null) || {};
          let subcat = p.subcategory || extra.subcategory || localPkg.subcategory || '';
          if (!subcat && Array.isArray(p.tags)) {
            const subTag = p.tags.find(t => typeof t === 'string' && t.startsWith('subcat:'));
            if (subTag) subcat = subTag.replace('subcat:', '');
          }
          const deliveryNoteVal = (p.delivery_note !== undefined && p.delivery_note !== null && p.delivery_note !== '')
            ? p.delivery_note
            : (extra.deliveryNote || p.deliveryNote || localPkg.deliveryNote || '');
          const decoratorNoteVal = (p.decorator_note !== undefined && p.decorator_note !== null && p.decorator_note !== '')
            ? p.decorator_note
            : (extra.decoratorNote || p.decoratorNote || localPkg.decoratorNote || '');
          const lifespanNoteVal = (p.lifespan_note !== undefined && p.lifespan_note !== null && p.lifespan_note !== '')
            ? p.lifespan_note
            : (extra.lifespanNote || p.lifespanNote || localPkg.lifespanNote || '');
          const locationNoteVal = (p.location_note !== undefined && p.location_note !== null && p.location_note !== '')
            ? p.location_note
            : (extra.locationNote || p.locationNote || localPkg.locationNote || '');
          const aboutDescVal = p.about_description || extra.aboutDescription || p.aboutDescription || localPkg.aboutDescription || p.description || '';
          const setupDurVal = p.setup_duration || p.setupDuration || localPkg.setupDuration || '1.5 - 2 Hours';
          const slotsAlertVal = p.slots_alert || extra.slotsAlert || p.slotsAlert || localPkg.slotsAlert || '';
          const optionsVal = (Array.isArray(p.options) && p.options.length > 0)
            ? p.options
            : (extra.options || localPkg.options || (window.SITE_DATA?.weddingConfigs?.[p.id]) || []);

          const mergedPkg = {
            ...localPkg,
            ...p,
            subcategory: subcat,
            categoryName: p.category_name || p.categoryName || p.category,
            originalPrice: p.original_price != null ? p.original_price : (p.originalPrice != null ? p.originalPrice : p.price),
            setupDuration: setupDurVal,
            setup_duration: setupDurVal,
            reviewsCount: p.reviews_count != null ? p.reviews_count : (p.reviewsCount != null ? p.reviewsCount : 100),
            faqs: (p.faqs && p.faqs.length > 0) ? p.faqs : ((extra.faqs && extra.faqs.length > 0) ? extra.faqs : (localPkg.faqs || [])),
            addons: (p.addons && p.addons.length > 0) ? p.addons : ((extra.addons && extra.addons.length > 0) ? extra.addons : (localPkg.addons || [])),
            notIncluded: (Array.isArray(p.not_included) && p.not_included.length > 0) ? p.not_included : ((Array.isArray(p.notIncluded) && p.notIncluded.length > 0) ? p.notIncluded : ((Array.isArray(extra.notIncluded) && extra.notIncluded.length > 0) ? extra.notIncluded : (localPkg.notIncluded || []))),
            not_included: (Array.isArray(p.not_included) && p.not_included.length > 0) ? p.not_included : ((Array.isArray(p.notIncluded) && p.notIncluded.length > 0) ? p.notIncluded : ((Array.isArray(extra.notIncluded) && extra.notIncluded.length > 0) ? extra.notIncluded : (localPkg.notIncluded || []))),
            aboutDescription: aboutDescVal,
            about_description: aboutDescVal,
            deliveryNote: deliveryNoteVal,
            delivery_note: deliveryNoteVal,
            decoratorNote: decoratorNoteVal,
            decorator_note: decoratorNoteVal,
            lifespanNote: lifespanNoteVal,
            lifespan_note: lifespanNoteVal,
            locationNote: locationNoteVal,
            location_note: locationNoteVal,
            colorPalettes: (Array.isArray(p.color_palettes) && p.color_palettes.length > 0) ? p.color_palettes : ((Array.isArray(p.colorPalettes) && p.color_palettes.length > 0) ? p.colorPalettes : ((Array.isArray(extra.colorPalettes) && extra.colorPalettes.length > 0) ? extra.colorPalettes : (localPkg.colorPalettes || []))),
            color_palettes: (Array.isArray(p.color_palettes) && p.color_palettes.length > 0) ? p.color_palettes : ((Array.isArray(p.colorPalettes) && p.color_palettes.length > 0) ? p.colorPalettes : ((Array.isArray(extra.colorPalettes) && extra.colorPalettes.length > 0) ? extra.colorPalettes : (localPkg.colorPalettes || []))),
            slotsAlert: slotsAlertVal,
            slots_alert: slotsAlertVal,
            whyChoose: p.why_choose || p.whyChoose || extra.whyChoose || localPkg.whyChoose || DEFAULT_WHY_CHOOSE,
            options: optionsVal,
            material: p.material || extra.material || localPkg.material || '',
            dimensions: p.dimensions || extra.dimensions || localPkg.dimensions || '',
            color: p.color || extra.color || localPkg.color || '',
            recommendedAge: p.recommended_age || p.recommendedAge || extra.recommendedAge || localPkg.recommendedAge || '',
            washCare: p.wash_care || p.washCare || extra.washCare || localPkg.washCare || '',
            packaging: p.packaging || extra.packaging || localPkg.packaging || '',
            specs: p.specs || extra.specs || localPkg.specs || {},
            subtitle: p.subtitle || extra.subtitle || localPkg.subtitle || '',
            boughtText: p.bought_text || p.boughtText || extra.boughtText || localPkg.boughtText || '',
            highlights: (Array.isArray(p.highlights) && p.highlights.length > 0) ? p.highlights : ((Array.isArray(extra.highlights) && extra.highlights.length > 0) ? extra.highlights : (localPkg.highlights || []))
          };
          fetchedMap.set(p.id, mergedPkg);
        });

        // Retain any locally created packages not yet in Supabase (skip deleted)
        existingMap.forEach((localPkg, id) => {
          if (appState.deletedItems.products.includes(id)) return; // DO NOT RESURRECT!
          if (!fetchedMap.has(id)) {
            fetchedMap.set(id, localPkg);
          }
        });

        // Ensure wedding services in window.SITE_DATA.weddingServices are also updated from Supabase
        const weddingProds = Array.from(fetchedMap.values()).filter(p => p.category === 'wedding');
        if (weddingProds.length > 0) {
          if (typeof window.SITE_DATA === 'undefined') window.SITE_DATA = {};
          if (!Array.isArray(window.SITE_DATA.weddingServices)) window.SITE_DATA.weddingServices = [];
          if (!window.SITE_DATA.weddingConfigs) window.SITE_DATA.weddingConfigs = {};

          weddingProds.forEach(wp => {
            let existingWs = window.SITE_DATA.weddingServices.find(s => s.id === wp.id);
            const wpOptions = Array.isArray(wp.options) && wp.options.length > 0 ? wp.options : (window.SITE_DATA.weddingConfigs[wp.id] || []);
            const wsObj = {
              id: wp.id,
              title: wp.title,
              badge: wp.badge || 'TRADITIONAL',
              image: wp.image,
              desc: wp.aboutDescription || wp.description || '',
              options: wpOptions
            };
            if (existingWs) {
              Object.assign(existingWs, wsObj);
            } else {
              window.SITE_DATA.weddingServices.push(wsObj);
            }
            if (wpOptions && wpOptions.length > 0) {
              window.SITE_DATA.weddingConfigs[wp.id] = wpOptions;
            }
          });
          localStorage.setItem(STORAGE_KEYS.WEDDING_SERVICES, JSON.stringify(window.SITE_DATA.weddingServices));
          localStorage.setItem(STORAGE_KEYS.WEDDING_CONFIGS, JSON.stringify(window.SITE_DATA.weddingConfigs));
        }

        appState.products = Array.from(fetchedMap.values()).filter(p => !appState.deletedItems.products.includes(p.id));
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));
      }

      appState.supabaseConnected = true;
      updateSupabaseStatus(true, '🟢 Connected to Supabase');
      refreshAll();
    } catch (e) {
      console.warn('Could not fetch from Supabase:', e);
      updateSupabaseStatus(false, 'Local Offline Mode');
    }
  }

  function syncWebsiteDefaults() {
    if (typeof window.SITE_DATA !== 'undefined' && window.SITE_DATA.categories && window.SITE_DATA.products) {
      appState.categories = sortCategoriesByHeader(JSON.parse(JSON.stringify(window.SITE_DATA.categories)));
      appState.products = JSON.parse(JSON.stringify(window.SITE_DATA.products));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(appState.categories));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));
      refreshAll();
      showToast(`Website Catalog Synced! (${appState.categories.length} Categories, ${appState.products.length} Packages)`, 'success');
    } else {
      showToast('Live website dataset not found.', 'error');
    }
  }

  function updateSupabaseStatus(connected, text) {
    const statusText = document.getElementById('supabaseStatusText');
    const cloudStatusText = document.getElementById('cloudStatusText');
    const navStatus = document.getElementById('supabaseNavStatus');

    if (statusText) statusText.textContent = text;
    if (cloudStatusText) {
      cloudStatusText.textContent = connected ? 'Supabase & Cloudinary Synced' : 'Cloudinary Active • Local Store';
    }
    if (navStatus) {
      navStatus.textContent = connected ? 'Synced' : 'Sync';
    }
  }

  // Commit changes locally and push to Supabase
  async function commitData(message = 'Changes saved successfully!') {
    // 1. LocalStorage
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(appState.categories));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(appState.cities));
    if (appState.announcement) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(appState.announcement));
    }
    if (appState.banners) {
      localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(appState.banners));
    }

    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.categories = appState.categories;
      window.SITE_DATA.products = appState.products;
      window.SITE_DATA.cities = appState.cities;
      if (appState.announcement) {
        window.SITE_DATA.announcementBar = appState.announcement;
      }
      if (appState.banners) {
        window.SITE_DATA.banners = appState.banners;
      }
    }

    // 2. Dev server disk persistence
    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deletedItems: appState.deletedItems,
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        reviews: appState.reviews,
        cities: appState.cities,
        announcement: appState.announcement,
        banners: appState.banners,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    // 3. Supabase Cloud Sync (Instant cross-device & Vercel sync)
    if (supabase) {
      try {
        const syncPromises = [];

        // Sync subcategories mapping
        const subcatMap = {};
        appState.categories.forEach(c => {
          if (c.id !== '__site_subcategories__' && c.id !== '__site_package_details__' && Array.isArray(c.subcategories) && c.subcategories.length > 0) {
            subcatMap[c.id] = c.subcategories;
          }
        });
        syncPromises.push(
          supabase.from('categories').upsert({
            id: '__site_subcategories__',
            name: 'Global Subcategories Mapping',
            image: 'https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp',
            desc: JSON.stringify(subcatMap)
          }).then(({ error }) => {
            if (!error) console.log('Subcategories synced to Supabase Cloud');
            else console.warn('Supabase subcategories sync warning:', error);
          })
        );

        // Sync extended package details (faqs, addons, notIncluded, notes, etc.)
        const pkgDetailsMap = {};
        appState.products.forEach(p => {
          if (p.id) {
            pkgDetailsMap[p.id] = {
              subcategory: p.subcategory || '',
              faqs: p.faqs || [],
              addons: p.addons || [],
              notIncluded: p.notIncluded || [],
              aboutDescription: p.aboutDescription || p.description || '',
              deliveryNote: p.deliveryNote || '',
              decoratorNote: p.decoratorNote || '',
              lifespanNote: p.lifespanNote || '',
              locationNote: p.locationNote || '',
              colorPalettes: p.colorPalettes || [],
              slotsAlert: p.slotsAlert || '',
              whyChoose: p.whyChoose || DEFAULT_WHY_CHOOSE,
              options: p.options || [],
              material: p.material || p.specs?.material || '',
              dimensions: p.dimensions || p.specs?.dimensions || '',
              color: p.color || p.specs?.color || '',
              recommendedAge: p.recommendedAge || p.specs?.recommendedAge || '',
              washCare: p.washCare || p.specs?.washCare || '',
              packaging: p.packaging || p.specs?.packaging || '',
              specs: p.specs || {},
              subtitle: p.subtitle || '',
              boughtText: p.boughtText || '',
              highlights: p.highlights || []
            };
          }
        });
        syncPromises.push(
          supabase.from('categories').upsert({
            id: '__site_package_details__',
            name: 'Global Package Extended Details',
            image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
            desc: JSON.stringify(pkgDetailsMap)
          }).then(({ error }) => {
            if (!error) console.log('Package extended details synced to Supabase Cloud');
            else console.warn('Supabase details sync warning:', error);
          })
        );

        // Sync wedding services & configs to Supabase Cloud
        if (window.SITE_DATA?.weddingServices) {
          syncPromises.push(
            supabase.from('categories').upsert({
              id: '__site_wedding_services__',
              name: 'Global Wedding Services List',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
              desc: JSON.stringify(window.SITE_DATA.weddingServices)
            }).then(({ error }) => {
              if (!error) console.log('Wedding services synced to Supabase Cloud');
              else console.warn('Supabase wedding services sync warning:', error);
            })
          );
        }

        if (window.SITE_DATA?.weddingConfigs) {
          syncPromises.push(
            supabase.from('categories').upsert({
              id: '__site_wedding_configs__',
              name: 'Global Wedding Configs & Options',
              image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
              desc: JSON.stringify(window.SITE_DATA.weddingConfigs)
            }).then(({ error }) => {
              if (!error) console.log('Wedding configs synced to Supabase Cloud');
              else console.warn('Supabase wedding configs sync warning:', error);
            })
          );
        }

        if (Array.isArray(appState.banners) && appState.banners.length > 0) {
          syncPromises.push(
            supabase.from('categories').upsert({
              id: '__site_banners__',
              name: 'Site Banners Configuration',
              image: '',
              desc: JSON.stringify(appState.banners)
            }).then(({ error }) => {
              if (!error) console.log('Site banners synced to Supabase Cloud');
              else console.warn('Supabase site banners sync warning:', error);
            })
          );
        }

        const catRows = appState.categories
          .filter(c => !c.id.startsWith('__site_'))
          .map(c => ({
            id: c.id,
            name: c.name,
            icon: c.icon || '🎈',
            badge: c.badge || 'POPULAR',
            image: c.image,
            desc: c.desc || ''
          }));
        syncPromises.push(
          supabase.from('categories').upsert(catRows).then(({ error }) => {
            if (!error) console.log('Categories synced to Supabase Cloud');
          })
        );

        await Promise.allSettled(syncPromises);
      } catch (err) {
        console.warn('Supabase sync warning in commitData:', err);
      }
    }

    try { window.dispatchEvent(new CustomEvent('celebration:data-updated')); } catch(e){}
    refreshAll();
    if (message) showToast(message, 'success');
  }

  /* ==========================================================================
     SIDEBAR NAVIGATION & TABS
     ========================================================================== */
  function setupSidebarAndTabs() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('adminSidebar');

    // All Packages tab button
    const allPkgsBtn = document.getElementById('sidebarAllPackagesBtn');
    allPkgsBtn?.addEventListener('click', () => {
      selectCategoryTab('all');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Sidebar + Add Category button
    const addCatBtn = document.getElementById('sidebarAddCatBtn');
    addCatBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      openCategoryModal('add');
    });

    // Blog Articles tab button
    const blogsBtn = document.getElementById('sidebarBlogsBtn');
    blogsBtn?.addEventListener('click', () => {
      switchTab('blogs');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Reviews & Reels tab button
    const reviewsBtn = document.getElementById('sidebarReviewsBtn');
    reviewsBtn?.addEventListener('click', () => {
      switchTab('reviews');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Operating Cities tab button
    const citiesBtn = document.getElementById('sidebarCitiesBtn');
    citiesBtn?.addEventListener('click', () => {
      switchTab('cities');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Promotional Banners tab button
    const bannersBtn = document.getElementById('sidebarBannersBtn');
    bannersBtn?.addEventListener('click', () => {
      switchTab('banners');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Top Announcement Bar tab button
    const announcementBtn = document.getElementById('sidebarAnnouncementBtn');
    announcementBtn?.addEventListener('click', () => {
      switchTab('announcement');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    // Settings / Backup tab button
    const settingsBtn = document.getElementById('sidebarSettingsBtn');
    settingsBtn?.addEventListener('click', () => {
      switchTab('settings');
      if (window.innerWidth <= 960) sidebar?.classList.remove('mobile-open');
    });

    mobileToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('mobile-open');
    });

    // Topbar Add Banner quick button
    document.getElementById('topbarAddBannerBtn')?.addEventListener('click', () => {
      openBannerModal('add');
    });

    // Topbar Announcement quick button
    document.getElementById('topbarEditAnnouncementBtn')?.addEventListener('click', () => {
      switchTab('announcement');
    });

    document.getElementById('topbarAddPackageBtn')?.addEventListener('click', () => {
      if (appState.selectedCategoryTab === 'gifts') {
        openGiftModal('add');
      } else {
        const activeCat = appState.selectedCategoryTab !== 'all' ? appState.selectedCategoryTab : null;
        openPackageModal('add', null, activeCat);
      }
    });

    document.getElementById('topbarAddCatBtn')?.addEventListener('click', () => {
      openCategoryModal('add');
    });

    document.getElementById('topbarSyncCatalogBtn')?.addEventListener('click', () => {
      syncWebsiteDefaults();
    });
  }

  function renderSidebarCategories() {
    const container = document.getElementById('sidebarCategoriesContainer');
    if (!container) return;

    if (appState.categories.length === 0) {
      container.innerHTML = `
        <div style="font-size:12px; color:var(--text-dim); padding:6px 12px;">
          No categories found.
        </div>
      `;
      return;
    }

    container.innerHTML = appState.categories.map(cat => {
      const count = appState.products.filter(p => p.category === cat.id).length;
      const isActive = (appState.activeTab === 'packages' && appState.selectedCategoryTab === cat.id);
      return `
        <button type="button" class="sidebar-item ${isActive ? 'active' : ''}" data-cat-id="${cat.id}">
          <div class="sidebar-item-left">
            <span class="sidebar-item-icon">${cat.icon || '🎈'}</span>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHtml(cat.name)}</span>
          </div>
          <span class="sidebar-item-badge">${count}</span>
        </button>
      `;
    }).join('');

    // Attach click events to each individual category tab
    container.querySelectorAll('.sidebar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        if (catId) {
          selectCategoryTab(catId);
          if (window.innerWidth <= 960) {
            document.getElementById('adminSidebar')?.classList.remove('mobile-open');
          }
        }
      });
    });
  }

  // Render Category Header Banner Card (Direct in Category View)
  function renderCategoryBannerHtml(catObj) {
    if (!catObj) return '';
    const catId = catObj.id;
    const catName = catObj.name || catId;
    const isWedding = (catId === 'wedding');
    const catBanner = (Array.isArray(appState.banners)) ? appState.banners.find(b => b.location === catId) : null;
    const livePageUrl = isWedding ? '../wedding.html' : `../category.html?id=${encodeURIComponent(catId)}`;

    if (catBanner) {
      const isActive = (catBanner.active !== false);
      return `
        <div class="category-banner-block" id="categoryBannerCard_${escapeHtml(catId)}">
          <div class="category-banner-block-header">
            <div class="category-banner-block-title-row">
              <span style="font-size:18px;">🖼️</span>
              <h3>${escapeHtml(catName)} Page Header Banner</h3>
              ${isActive 
                ? '<span style="background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; font-size:11px; font-weight:700; padding:2px 9px; border-radius:99px;">● Active on Live Page</span>' 
                : '<span style="background:#f1f5f9; color:#64748b; font-size:11px; font-weight:700; padding:2px 9px; border-radius:99px;">Hidden</span>'}
              <span style="font-size:11.5px; color:#94a3b8; font-weight:500;">(Recommended: 1200×380px or 16:5 ratio)</span>
            </div>
            <div>
              <a href="${livePageUrl}" target="_blank" style="font-size:12px; font-weight:700; color:var(--brand-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
                🌐 View on Live Website →
              </a>
            </div>
          </div>

          <!-- Live Visual Banner Preview -->
          <div class="category-banner-preview-box">
            <img src="${escapeHtml(catBanner.image || '')}" alt="${escapeHtml(catBanner.title || 'Banner')}" class="category-banner-preview-img" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'" />
            <div class="category-banner-preview-overlay"></div>
            <div class="category-banner-preview-content">
              ${catBanner.tag ? `<span class="category-banner-preview-tag">${escapeHtml(catBanner.tag)}</span>` : ''}
              <h2 class="category-banner-preview-title">${escapeHtml(catBanner.title || `${catName} Decorations`)}</h2>
              ${catBanner.subtitle ? `<p class="category-banner-preview-sub">${escapeHtml(catBanner.subtitle)}</p>` : ''}
              ${catBanner.linkText ? `<span class="category-banner-preview-btn">${escapeHtml(catBanner.linkText)}</span>` : ''}
            </div>
          </div>

          <!-- Banner Action Controls Toolbar -->
          <div class="category-banner-controls">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <label class="btn-secondary" style="margin:0; padding:7px 15px; font-size:12.5px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px;">
                <span>📁 Upload New Banner Photo</span>
                <input type="file" accept="image/*" style="display:none;" onchange="window.adminStudio.handleCategoryBannerDirectUpload(event, '${escapeHtml(catId)}')" />
              </label>
              <button type="button" class="btn-secondary" onclick="window.adminStudio.openCategoryBannerModal('${escapeHtml(catId)}')" style="padding:7px 15px; font-size:12.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer;">
                ✏️ Edit Text & Link
              </button>
            </div>
            <div>
              <button type="button" onclick="window.adminStudio.deleteCategoryBanner('${escapeHtml(catId)}')" style="padding:7px 14px; font-size:12.5px; font-weight:700; color:#b91c1c; background:#fef2f2; border:1px solid #fecdd3; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
                🗑️ Delete Banner
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Empty banner state
      return `
        <div class="category-banner-block" id="categoryBannerCard_${escapeHtml(catId)}">
          <div class="category-banner-empty-box">
            <div style="font-size:32px; margin-bottom:8px;">🖼️</div>
            <h4 style="margin:0 0 6px 0; font-family:var(--font-heading); font-size:16px; font-weight:800; color:var(--text-main);">
              No Custom Header Banner for ${escapeHtml(catName)}
            </h4>
            <p style="margin:0 auto 16px auto; font-size:13px; color:var(--text-muted); max-width:540px; line-height:1.5;">
              Upload a landscape banner photo (1200×380px) to showcase at the top of the <strong>${escapeHtml(catName)}</strong> page, exactly like Birthday & Anniversary banner designs.
            </p>
            <div style="display:flex; justify-content:center; align-items:center; gap:10px; flex-wrap:wrap;">
              <label class="btn-primary" style="margin:0; padding:8px 18px; font-size:13px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px; border-radius:8px;">
                <span>📁 Upload Banner Image</span>
                <input type="file" accept="image/*" style="display:none;" onchange="window.adminStudio.handleCategoryBannerDirectUpload(event, '${escapeHtml(catId)}')" />
              </label>
              <button type="button" class="btn-secondary" onclick="window.adminStudio.openCategoryBannerModal('${escapeHtml(catId)}')" style="padding:8px 16px; font-size:13px; font-weight:700; border-radius:8px; cursor:pointer; background:#ffffff; border:1px solid #cbd5e1;">
                ➕ Create with Custom Text
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  async function handleCategoryBannerDirectUpload(event, catId) {
    const file = event.target.files?.[0];
    if (!file) return;

    const catObj = appState.categories.find(c => c.id === catId);
    const catName = catObj?.name || catId;

    showToast(`⏳ Uploading banner image for ${catName} to Cloudinary...`, 'info');

    try {
      const uploadedUrl = await uploadToCloudinary(file, 'celebration-banners');
      if (!uploadedUrl) {
        showToast('Image upload failed. Please try again.', 'error');
        return;
      }

      let banner = appState.banners.find(b => b.location === catId);
      if (banner) {
        banner.image = uploadedUrl;
        banner.active = true;
        banner.updatedAt = new Date().toISOString();
      } else {
        banner = {
          id: `banner-cat-${catId}`,
          location: catId,
          locationName: `${catName} Page Banner`,
          tag: `✨ The Ultimate ${catName} Collection`,
          title: `Professional ${catName} Balloon Decorations`,
          subtitle: `Make their milestone unforgettable! Premium celebration setups in 100+ cities.`,
          image: uploadedUrl,
          linkText: 'Explore Setups Below ↓',
          linkUrl: `#${catId}Catalog`,
          active: true,
          order: 1,
          updatedAt: new Date().toISOString()
        };
        appState.banners.push(banner);
      }

      await commitBanners(`🎉 Banner for ${catName} updated successfully!`);
      if (appState.selectedCategoryTab === catId) {
        selectCategoryTab(catId);
      }
    } catch (err) {
      console.error('Banner upload error:', err);
      showToast('Failed to upload banner: ' + err.message, 'error');
    }
  }

  async function deleteCategoryBanner(catId) {
    const catObj = appState.categories.find(c => c.id === catId);
    const catName = catObj?.name || catId;
    const banner = appState.banners.find(b => b.location === catId);
    if (!banner) return;

    if (!confirm(`Are you sure you want to delete the promotional banner for "${catName}"?\n\nThe customer page will fall back to default header styling.`)) {
      return;
    }

    appState.banners = appState.banners.filter(b => b.location !== catId);
    await commitBanners(`Banner for "${catName}" deleted.`);
    if (appState.selectedCategoryTab === catId) {
      selectCategoryTab(catId);
    }
  }

  function openCategoryBannerModal(catId) {
    const existing = appState.banners.find(b => b.location === catId);
    if (existing) {
      openBannerModal('edit', existing.id, catId);
    } else {
      openBannerModal('add', null, catId);
    }
  }

  function selectCategoryTab(catId) {
    appState.activeTab = 'packages';
    appState.selectedCategoryTab = catId;
    appState.selectedCategory = catId;
    appState.selectedSubcategory = 'all';

    // Clear search on category switch to prevent cross-category search locks
    appState.searchTerm = '';
    const pkgSearchInput = document.getElementById('packageSearchInput');
    if (pkgSearchInput) pkgSearchInput.value = '';

    // Show packages tab, hide other tabs
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.toggle('active', c.id === 'packagesTab');
    });

    // Update active highlight on sidebar items
    const allBtn = document.getElementById('sidebarAllPackagesBtn');
    if (allBtn) {
      allBtn.classList.toggle('active', catId === 'all');
    }
    const settingsBtn = document.getElementById('sidebarSettingsBtn');
    if (settingsBtn) {
      settingsBtn.classList.remove('active');
    }
    const blogsBtn = document.getElementById('sidebarBlogsBtn');
    if (blogsBtn) {
      blogsBtn.classList.remove('active');
    }

    const catButtons = document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item');
    catButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat-id') === catId);
    });

    // Sync dropdown filter
    const filterSelect = document.getElementById('packageCategoryFilter');
    if (filterSelect && filterSelect.value !== catId) {
      filterSelect.value = catId;
    }

    // Update Topbar and Category Hero Header
    const topbarTitle = document.getElementById('topbarPageTitle');
    const heroContainer = document.getElementById('categoryHeroContainer');

    const topbarAddBtn = document.getElementById('topbarAddPackageBtn');

    appState.selectedSubcategory = 'all';

    if (catId === 'all') {
      if (topbarTitle) topbarTitle.textContent = `All Decoration Packages (${appState.products.length})`;
      if (topbarAddBtn) topbarAddBtn.querySelector('span').textContent = 'Add Package';
      if (heroContainer) heroContainer.innerHTML = '';
      const subcatContainer = document.getElementById('categorySubcategoriesContainer');
      if (subcatContainer) subcatContainer.innerHTML = '';
    } else {
      const catObj = appState.categories.find(c => c.id === catId);
      if (catObj) {
        const pkgCount = appState.products.filter(p => p.category === catObj.id).length;
        const isWedding = (catObj.id === 'wedding');
        const isGifts = (catObj.id === 'gifts');
        
        if (topbarTitle) {
          topbarTitle.textContent = isWedding 
            ? `💍 Wedding Services (${pkgCount})` 
            : isGifts 
              ? `🎁 Gift Marketplace (${pkgCount})` 
              : `${catObj.icon || '🎈'} ${catObj.name} Packages (${pkgCount})`;
        }
        if (topbarAddBtn) {
          topbarAddBtn.querySelector('span').textContent = isWedding 
            ? 'Add Wedding Service' 
            : isGifts 
              ? 'Add Gift / Hamper' 
              : 'Add Package';
        }

        if (heroContainer) {
          heroContainer.innerHTML = `
            <div class="category-hero">
              <div class="category-hero-media">
                <img src="${escapeHtml(catObj.image)}" alt="${escapeHtml(catObj.name)}" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'" />
                <div class="category-hero-icon">${catObj.icon || '🎈'}</div>
              </div>
              <div class="category-hero-info">
                <div class="category-hero-top">
                  <h2 class="category-hero-title">${isWedding ? 'Wedding Services & Quotation Builder' : (isGifts ? 'Gift Marketplace' : escapeHtml(catObj.name))}</h2>
                  <span class="category-hero-badge">${isWedding ? 'MODULAR SERVICES' : (isGifts ? 'CURATED GIFTS' : escapeHtml(catObj.badge || 'POPULAR'))}</span>
                  <span class="category-hero-count">• ${pkgCount} ${isWedding ? 'Services Available' : (isGifts ? 'Gifts & Hampers Available' : 'Packages Available')}</span>
                </div>
                <p class="category-hero-desc">
                  ${isWedding 
                    ? 'Individual wedding services (House Decor, Nalugu, Catering, Photography, Melam, Sweets, etc.). Each service has custom inside options and checklists for generating customized WhatsApp quotations.' 
                    : (isGifts 
                      ? 'Curated gift hampers, surprise boxes, flower bouquets, personalized gifts & cakes delivered across India.' 
                      : escapeHtml(catObj.desc || `All premier ${catObj.name} celebration setups, themes, and decoration packages.`))}
                </p>
                <div class="category-hero-actions">
                  <button type="button" class="btn-hero-add-pkg" onclick="${isGifts ? `window.adminStudio.openGiftModal('add')` : `window.adminStudio.openPackageModal('add', null, '${catObj.id}')`}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span>${isWedding ? 'Add Wedding Service' : (isGifts ? 'Add Gift / Hamper' : `Add Package to ${escapeHtml(catObj.name)}`)}</span>
                  </button>
                  ${!isWedding ? `
                  <button type="button" class="btn-hero-action" onclick="window.adminStudio.openSubcategoryModal('add', '${catObj.id}')" style="color:var(--brand-primary); font-weight:700;">
                    ➕ Add Subcategory
                  </button>
                  ` : ''}
                  ${isWedding ? `
                    <a href="../wedding.html" target="_blank" class="btn-hero-action" style="text-decoration:none;">
                      🌐 View Live Wedding Page
                    </a>
                  ` : ''}
                  ${isGifts ? `
                    <a href="../marketplace.html" target="_blank" class="btn-hero-action" style="text-decoration:none;">
                      🌐 View Live Gift Marketplace
                    </a>
                  ` : ''}
                  <button type="button" class="btn-hero-action" onclick="window.adminStudio.openCategoryModal('edit', '${catObj.id}')">
                    ✏️ Edit Category
                  </button>
                  <button type="button" class="btn-hero-action btn-hero-delete" onclick="window.adminStudio.openDeleteModal('category', '${catObj.id}', '${escapeHtml(catObj.name)}')">
                    🗑️ Delete Category
                  </button>
                </div>
              </div>
            </div>
            ${renderCategoryBannerHtml(catObj)}
          `;
        }

        if (catObj.id === 'wedding') {
          const subcatContainer = document.getElementById('categorySubcategoriesContainer');
          if (subcatContainer) subcatContainer.innerHTML = '';
        } else {
          renderCategorySubcategoriesBar(catObj.id);
        }
      } else {
        if (topbarTitle) topbarTitle.textContent = 'Decoration Packages';
        if (heroContainer) heroContainer.innerHTML = '';
        const subcatContainer = document.getElementById('categorySubcategoriesContainer');
        if (subcatContainer) subcatContainer.innerHTML = '';
      }
    }

    renderPackages();
  }

  function matchesSubcategory(product, subId, categoryId) {
    if (!product || !subId || subId === 'all') return true;
    if (categoryId && categoryId !== 'all' && product.category !== categoryId) return false;

    const targetSub = String(subId).trim().toLowerCase();
    const pkgSub = String(product.subcategory || '').trim().toLowerCase();

    // 1. Exact match on subcategory ID or clean slug
    if (pkgSub && (pkgSub === targetSub || pkgSub === targetSub.replace(/[^a-z0-9]/g, ''))) {
      return true;
    }

    // 2. Match in tags (e.g. 'subcat:home' or 'home')
    if (Array.isArray(product.tags)) {
      const hasTag = product.tags.some(t => {
        if (typeof t !== 'string') return false;
        const lower = t.toLowerCase().trim();
        return lower === `subcat:${targetSub}` || lower === targetSub;
      });
      if (hasTag) return true;
    }

    // 3. Fallback smart heuristic matching for legacy unassigned packages
    if (!pkgSub) {
      const cat = product.category || categoryId || '';
      const title = (product.title || '').toLowerCase();
      const id = (product.id || '').toLowerCase();
      const price = Number(product.price) || 0;

      if (cat === 'birthday') {
        if (targetSub === 'home') return (price > 0 && price < 2500) || title.includes('home') || title.includes('simple');
        if (targetSub === 'arch') return title.includes('arch') || title.includes('backdrop') || title.includes('ring');
        if (targetSub === 'luxury') return price >= 3000 || title.includes('boho') || title.includes('luxury');
      } else if (cat === 'anniversary') {
        if (targetSub === 'room') return title.includes('room') || title.includes('bedroom') || title.includes('surprise');
        if (targetSub === 'canopy') return title.includes('canopy') || title.includes('cabana') || title.includes('terrace');
        if (targetSub === 'ring') return title.includes('ring') || title.includes('neon') || title.includes('bliss');
        if (targetSub === 'grand') return title.includes('grand') || title.includes('golden') || title.includes('jubilee');
      } else if (cat === 'kids') {
        if (targetSub === 'cocomelon') return title.includes('cocomelon') || id.includes('cocomelon');
        if (targetSub === 'babyshark') return title.includes('shark') || id.includes('shark');
        if (targetSub === 'bossbaby') return title.includes('boss') || id.includes('boss');
        if (targetSub === 'jungle') return title.includes('jungle') || title.includes('safari');
        if (targetSub === 'frozen') return title.includes('frozen');
      } else if (cat === 'baby-shower') {
        if (targetSub === 'shower') return title.includes('pastel') || title.includes('shower');
        if (targetSub === 'welcome') return title.includes('welcome') || title.includes('newborn');
        if (targetSub === 'teddy') return title.includes('teddy');
      } else if (cat === 'corporate') {
        if (targetSub === 'office') return title.includes('office') || title.includes('milestone') || title.includes('cubicle') || title.includes('launch');
        if (targetSub === 'stage') return title.includes('stage') || title.includes('annual') || title.includes('townhall');
      } else if (cat === 'gifts') {
        if (targetSub === 'flowers') return title.includes('rose') || title.includes('flower') || title.includes('bouquet');
        if (targetSub === 'cakes') return title.includes('cake') || title.includes('chocolate');
        if (targetSub === 'women') return title.includes('women') || title.includes('card');
        if (targetSub === 'men') return title.includes('men') || title.includes('watch') || title.includes('video');
        if (targetSub === 'boys') return title.includes('boy') || title.includes('car') || title.includes('mug') || title.includes('return');
        if (targetSub === 'girls') return title.includes('girl') || title.includes('teddy');
      } else if (cat === 'wedding') {
        if (targetSub === 'house-decor') return title.includes('house') || title.includes('catering') || title.includes('sweet') || title.includes('bag');
        if (targetSub === 'nalugu-snanam') return title.includes('nalugu') || title.includes('snanam');
        if (targetSub === 'mandap-stage') return title.includes('mandap') || title.includes('stage') || title.includes('hall');
        if (targetSub === 'photo-video') return title.includes('photo') || title.includes('video');
        if (targetSub === 'melam-music') return title.includes('melam') || title.includes('music') || title.includes('event') || title.includes('sangeet');
        if (targetSub === 'bridal-styling') return title.includes('bridal') || title.includes('makeup') || title.includes('mehandi');
      }
    }

    return false;
  }

  function renderCategorySubcategoriesBar(catId) {
    const container = document.getElementById('categorySubcategoriesContainer');
    if (!container) return;

    if (!catId || catId === 'all' || catId === 'wedding') {
      container.innerHTML = '';
      return;
    }

    const catObj = appState.categories.find(c => c.id === catId);
    if (!catObj) {
      container.innerHTML = '';
      return;
    }

    const subcats = Array.isArray(catObj.subcategories) ? catObj.subcategories : [];
    const totalCount = appState.products.filter(p => p.category === catId).length;
    const isAllActive = (appState.selectedSubcategory === 'all');

    container.innerHTML = `
      <div class="category-subcategories-bar">
        <div class="subcat-bar-header">
          <div class="subcat-bar-title-wrap">
            <span class="subcat-bar-icon">🏷️</span>
            <h3 class="subcat-bar-title">${escapeHtml(catObj.name)} Subcategories</h3>
            <span class="subcat-bar-count">${subcats.length} Active</span>
          </div>
          <div class="subcat-bar-actions">
            <button type="button" class="btn-subcat-add" onclick="window.adminStudio.openSubcategoryModal('add', '${catObj.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>+ Add Subcategory</span>
            </button>
          </div>
        </div>

        <div class="subcat-pills-row">
          <div class="admin-subcat-pill ${isAllActive ? 'active' : ''}">
            <span class="admin-subcat-pill-target" onclick="window.adminStudio.selectSubcategoryFilter('all')">
              <span>${catObj.id === 'gifts' ? 'All Gifts & Hampers' : 'All Packages'}</span>
              <span class="subcat-pill-count">${totalCount}</span>
            </span>
          </div>

          ${subcats.map(sub => {
            const count = appState.products.filter(p => p.category === catId && matchesSubcategory(p, sub.id, catId)).length;
            const isActive = (appState.selectedSubcategory === sub.id);
            return `
              <div class="admin-subcat-pill ${isActive ? 'active' : ''}">
                <span class="admin-subcat-pill-target" onclick="window.adminStudio.selectSubcategoryFilter('${sub.id}')" title="Filter packages by ${escapeHtml(sub.name)}">
                  <span>${sub.icon || '🏷️'}</span>
                  <span>${escapeHtml(sub.name)}</span>
                  <span class="subcat-pill-count">${count}</span>
                </span>
                <div class="subcat-pill-btns">
                  <button type="button" class="btn-subcat-pill-action" onclick="window.adminStudio.openSubcategoryModal('edit', '${catObj.id}', '${sub.id}')" title="Edit subcategory">✏️</button>
                  <button type="button" class="btn-subcat-pill-action" onclick="window.adminStudio.openDeleteModal('subcategory', '${sub.id}', '${escapeHtml(sub.name)}', '${catObj.id}')" title="Delete subcategory" style="color:#ef4444;">🗑️</button>
                </div>
              </div>
            `;
          }).join('')}

          ${subcats.length === 0 ? `
            <div style="font-size:12px; color:var(--text-muted); font-style:italic; padding:6px 0;">
              No subcategories created yet for ${escapeHtml(catObj.name)}. Click "+ Add Subcategory" to add your first one!
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function selectSubcategoryFilter(subId) {
    appState.selectedSubcategory = subId;
    renderCategorySubcategoriesBar(appState.selectedCategoryTab);
    renderPackages();
  }

  function switchTab(tabId) {
    appState.activeTab = tabId;

    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.toggle('active', c.id === `${tabId}Tab`);
    });

    const allBtn = document.getElementById('sidebarAllPackagesBtn');
    const settingsBtn = document.getElementById('sidebarSettingsBtn');
    const blogsBtn = document.getElementById('sidebarBlogsBtn');
    const reviewsBtn = document.getElementById('sidebarReviewsBtn');
    const citiesBtn = document.getElementById('sidebarCitiesBtn');
    const bannersBtn = document.getElementById('sidebarBannersBtn');
    const announcementBtn = document.getElementById('sidebarAnnouncementBtn');
    const heroContainer = document.getElementById('categoryHeroContainer');

    if (tabId === 'settings') {
      if (allBtn) allBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = 'Backup & Store Settings';
      if (heroContainer) heroContainer.innerHTML = '';
    } else if (tabId === 'banners') {
      if (allBtn) allBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = `🖼️ Promotional Banners & Hero Carousels (${appState.banners.length})`;
      if (heroContainer) heroContainer.innerHTML = '';
      renderBannersAdmin();
    } else if (tabId === 'announcement') {
      if (allBtn) allBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = '📢 Top Announcement Bar & Website Ticker';
      if (heroContainer) heroContainer.innerHTML = '';
      renderAnnouncementAdmin();
    } else if (tabId === 'blogs') {
      if (allBtn) allBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = `📝 Event Guides & Blog Articles (${appState.blogs.length})`;
      if (heroContainer) heroContainer.innerHTML = '';
      renderBlogs();
    } else if (tabId === 'reviews') {
      if (allBtn) allBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = `⭐ Real Photos & Video Customer Reviews (${appState.reviews.length})`;
      if (heroContainer) heroContainer.innerHTML = '';
      renderReviewsList();
    } else if (tabId === 'cities') {
      if (allBtn) allBtn.classList.remove('active');
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.add('active');
      document.querySelectorAll('#sidebarCategoriesContainer .sidebar-item').forEach(b => b.classList.remove('active'));
      const topbarTitle = document.getElementById('topbarPageTitle');
      if (topbarTitle) topbarTitle.textContent = `📍 Operating Cities & Coverage (${appState.cities.length})`;
      if (heroContainer) heroContainer.innerHTML = '';
      renderCitiesAdmin();
    } else {
      if (settingsBtn) settingsBtn.classList.remove('active');
      if (blogsBtn) blogsBtn.classList.remove('active');
      if (reviewsBtn) reviewsBtn.classList.remove('active');
      if (citiesBtn) citiesBtn.classList.remove('active');
      if (bannersBtn) bannersBtn.classList.remove('active');
      if (announcementBtn) announcementBtn.classList.remove('active');
      selectCategoryTab(appState.selectedCategoryTab || 'all');
    }
  }

  function refreshAll() {
    updateMetrics();
    renderSidebarCategories();
    renderCategoryFilterOptions();
    renderCategories();

    // Verify if currently selected category still exists
    if (appState.selectedCategoryTab !== 'all') {
      const exists = appState.categories.some(c => c.id === appState.selectedCategoryTab);
      if (!exists) {
        appState.selectedCategoryTab = 'all';
        appState.selectedCategory = 'all';
      }
    }

    if (appState.activeTab === 'packages') {
      selectCategoryTab(appState.selectedCategoryTab || 'all');
    } else {
      switchTab(appState.activeTab);
    }
  }

  function updateMetrics() {
    const totalPkgsEl = document.getElementById('metricTotalPackages');
    const totalCatsEl = document.getElementById('metricTotalCategories');
    const avgPriceEl = document.getElementById('metricAvgPrice');
    const topRatedEl = document.getElementById('metricTopRated');

    const sidebarAllBadge = document.getElementById('sidebarAllBadge');
    const sidebarBlogsBadge = document.getElementById('sidebarBlogsBadge');
    const sidebarReviewsBadge = document.getElementById('sidebarReviewsBadge');
    const sidebarCitiesBadge = document.getElementById('sidebarCitiesBadge');
    const sidebarBannersBadge = document.getElementById('sidebarBannersBadge');
    const sidebarAnnouncementBadge = document.getElementById('sidebarAnnouncementBadge');
    const reviewsTabCountText = document.getElementById('reviewsTabCountText');

    const pkgsCount = appState.products.length;
    const catsCount = appState.categories.length;

    if (totalPkgsEl) totalPkgsEl.textContent = pkgsCount;
    if (totalCatsEl) totalCatsEl.textContent = catsCount;
    if (sidebarAllBadge) sidebarAllBadge.textContent = pkgsCount;
    if (sidebarBlogsBadge) sidebarBlogsBadge.textContent = appState.blogs.length;
    if (sidebarReviewsBadge) sidebarReviewsBadge.textContent = appState.reviews.length;
    if (sidebarCitiesBadge) sidebarCitiesBadge.textContent = appState.cities.length;
    if (sidebarBannersBadge) sidebarBannersBadge.textContent = appState.banners.length;
    if (reviewsTabCountText) reviewsTabCountText.textContent = `• ${appState.reviews.length} Reviews Live`;

    if (sidebarAnnouncementBadge) {
      const isLive = appState.announcement?.enabled !== false;
      sidebarAnnouncementBadge.textContent = isLive ? 'LIVE' : 'OFF';
      sidebarAnnouncementBadge.style.background = isLive ? '#fee2e2' : '#f1f5f9';
      sidebarAnnouncementBadge.style.color = isLive ? '#be123c' : '#64748b';
    }

    if (pkgsCount > 0) {
      const sum = appState.products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
      const avg = Math.round(sum / pkgsCount);
      if (avgPriceEl) avgPriceEl.textContent = `₹${avg.toLocaleString('en-IN')}`;

      const topRated = appState.products.filter(p => (Number(p.rating) || 0) >= 4.9).length;
      if (topRatedEl) topRatedEl.textContent = topRated;
    }
  }

  /* ==========================================================================
     CLOUDINARY IMAGE UPLOAD ENGINE
     ========================================================================== */
  function setupCloudinaryUploaders() {
    // 1. Package Primary Image Upload
    const pkgImgFile = document.getElementById('pkgImageFile');
    const pkgUploadProgress = document.getElementById('pkgUploadProgress');
    const pkgUploadLabel = document.getElementById('pkgUploadLabel');

    pkgImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (pkgUploadProgress) pkgUploadProgress.style.display = 'block';
      if (pkgUploadLabel) pkgUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-packages');
        document.getElementById('pkgImage').value = url;
        const prevImg = document.getElementById('pkgModalImgPreview');
        if (prevImg) prevImg.src = url;
        showToast('Image uploaded to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (pkgUploadProgress) pkgUploadProgress.style.display = 'none';
        if (pkgUploadLabel) pkgUploadLabel.textContent = '☁️ Upload to Cloudinary';
        e.target.value = '';
      }
    });

    // 2. Package Gallery Image Upload
    const galleryImgFile = document.getElementById('galleryImageFile');
    const galleryUploadLabel = document.getElementById('galleryUploadLabel');

    galleryImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (galleryUploadLabel) galleryUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-gallery');
        appState.galleryList.push(url);
        renderGalleryList();
        showToast('Gallery image added to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (galleryUploadLabel) galleryUploadLabel.textContent = '☁️ Upload Photo to Cloudinary';
        e.target.value = '';
      }
    });

    // 3. Category Cover Banner Upload
    const catImgFile = document.getElementById('catImageFile');
    const catUploadProgress = document.getElementById('catUploadProgress');
    const catUploadLabel = document.getElementById('catUploadLabel');

    catImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (catUploadProgress) catUploadProgress.style.display = 'block';
      if (catUploadLabel) catUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-categories');
        const catInput = document.getElementById('catImage');
        if (catInput) {
          catInput.value = url;
          catInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const prev = document.getElementById('catImagePreview');
        if (prev) {
          prev.src = url;
          prev.style.display = 'block';
        }
        showToast('Category banner uploaded to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (catUploadProgress) catUploadProgress.style.display = 'none';
        if (catUploadLabel) catUploadLabel.textContent = '☁️ Upload Banner';
        e.target.value = '';
      }
    });

    // 4. Cloudinary Direct Tab Upload
    const directUpload = document.getElementById('cloudinaryDirectUpload');
    const directStatus = document.getElementById('cloudinaryDirectUploadStatus');
    const lastUploadedBox = document.getElementById('lastUploadedBox');
    const lastUploadedThumb = document.getElementById('lastUploadedThumb');
    const lastUploadedUrl = document.getElementById('lastUploadedUrl');

    directUpload?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (directStatus) directStatus.style.display = 'block';

      try {
        const url = await uploadToCloudinary(file, 'celebration-media');
        if (lastUploadedBox) lastUploadedBox.style.display = 'block';
        if (lastUploadedThumb) lastUploadedThumb.src = url;
        if (lastUploadedUrl) lastUploadedUrl.value = url;
        showToast('Image uploaded successfully to Cloudinary!', 'success');
      } catch (err) {
        showToast('Upload failed: ' + err.message, 'error');
      } finally {
        if (directStatus) directStatus.style.display = 'none';
        e.target.value = '';
      }
    });

    // 5. Wedding Service Cover Image Upload
    const wseImgFile = document.getElementById('wseImageFile');
    const wseUploadProgress = document.getElementById('wseUploadProgress');
    const wseUploadLabel = document.getElementById('wseUploadLabel');

    wseImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (wseUploadProgress) wseUploadProgress.style.display = 'block';
      if (wseUploadLabel) wseUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-wedding');
        document.getElementById('wseImage').value = url;
        const prev = document.getElementById('wseImgPreview');
        if (prev) prev.src = url;
        showToast('Wedding service image uploaded to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (wseUploadProgress) wseUploadProgress.style.display = 'none';
        if (wseUploadLabel) wseUploadLabel.textContent = '☁️ Upload';
        e.target.value = '';
      }
    });

    // 6. Blog Article Cover Image Upload
    const blogImgFile = document.getElementById('blogImageFile');
    const blogUploadProgress = document.getElementById('blogUploadProgress');
    const blogUploadLabel = document.getElementById('blogUploadLabel');

    blogImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (blogUploadProgress) blogUploadProgress.style.display = 'block';
      if (blogUploadLabel) blogUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-blogs');
        document.getElementById('blogImage').value = url;
        const prev = document.getElementById('blogImgPreview');
        if (prev) prev.src = url;
        showToast('Blog cover image uploaded to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (blogUploadProgress) blogUploadProgress.style.display = 'none';
        if (blogUploadLabel) blogUploadLabel.textContent = '☁️ Upload to Cloudinary';
        e.target.value = '';
      }
    });

    // 7. Promotional Banner Image Upload
    const bannerImgFile = document.getElementById('bannerImageFileInput');
    const bannerUploadProgress = document.getElementById('bannerUploadProgress');
    const bannerUploadLabel = document.getElementById('bannerUploadLabel');

    bannerImgFile?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (bannerUploadProgress) bannerUploadProgress.style.display = 'block';
      if (bannerUploadLabel) bannerUploadLabel.textContent = 'Uploading...';

      try {
        const url = await uploadToCloudinary(file, 'celebration-banners');
        const imgInput = document.getElementById('bannerImageUrlInput');
        if (imgInput) imgInput.value = url;
        const prev = document.getElementById('bannerModalPreviewImg');
        if (prev) prev.src = url;
        showToast('Banner image uploaded to Cloudinary!', 'success');
      } catch (err) {
        showToast('Cloudinary upload error: ' + err.message, 'error');
      } finally {
        if (bannerUploadProgress) bannerUploadProgress.style.display = 'none';
        if (bannerUploadLabel) bannerUploadLabel.textContent = '☁️ Upload';
        e.target.value = '';
      }
    });

    document.getElementById('copyUploadedUrlBtn')?.addEventListener('click', () => {
      const input = document.getElementById('lastUploadedUrl');
      if (input && input.value) {
        navigator.clipboard.writeText(input.value);
        showToast('Cloudinary URL copied to clipboard!', 'info');
      }
    });
  }

  // Helper: Resizes/compresses high-resolution images on canvas before uploading
  // This prevents oversized Base64 payloads (>4.5MB) from triggering Vercel payload limits.
  function compressImageBeforeUpload(file, maxDimension = 1600, quality = 0.85) {
    return new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      };
      img.src = objectUrl;
    });
  }

  // Upload helper: converts to compressed Base64 and sends to /api/upload-image
  async function uploadToCloudinary(file, folder = 'celebration-events') {
    const dataUrl = await compressImageBeforeUpload(file);
    if (!dataUrl) {
      throw new Error('Failed to process image file');
    }

    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: dataUrl,
        folder: folder
      })
    });

    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    } else {
      throw new Error(data.error || 'Cloudinary upload failed');
    }
  }

  /* ==========================================================================
     SUPABASE CLOUD DATABASE SYNC HANDLERS
     ========================================================================== */
  function setupSupabaseSyncHandlers() {
    const syncBtn = document.getElementById('syncSupabaseBtn');
    const copySchemaBtn = document.getElementById('copySqlSchemaBtn');

    syncBtn?.addEventListener('click', async () => {
      if (!supabase) {
        showToast('Supabase client is not initialized.', 'error');
        return;
      }

      syncBtn.disabled = true;
      syncBtn.textContent = '⏳ Syncing to Supabase...';

      try {
        // 1. Sync Categories & Subcategories
        const subcatMap = {};
        appState.categories.forEach(c => {
          if (c.id !== '__site_subcategories__' && Array.isArray(c.subcategories) && c.subcategories.length > 0) {
            subcatMap[c.id] = c.subcategories;
          }
        });
        await supabase.from('categories').upsert({
          id: '__site_subcategories__',
          name: 'Global Subcategories Mapping',
          image: 'https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp',
          desc: JSON.stringify(subcatMap)
        });

        const pkgDetailsMap = {};
        appState.products.forEach(p => {
          if (p.id) {
            pkgDetailsMap[p.id] = {
              subcategory: p.subcategory || '',
              faqs: p.faqs || [],
              addons: p.addons || [],
              notIncluded: p.notIncluded || [],
              aboutDescription: p.aboutDescription || p.description || '',
              deliveryNote: p.deliveryNote || '',
              decoratorNote: p.decoratorNote || '',
              lifespanNote: p.lifespanNote || '',
              locationNote: p.locationNote || '',
              colorPalettes: p.colorPalettes || [],
              slotsAlert: p.slotsAlert || '',
              whyChoose: p.whyChoose || DEFAULT_WHY_CHOOSE,
              options: p.options || [],
              material: p.material || p.specs?.material || '',
              dimensions: p.dimensions || p.specs?.dimensions || '',
              color: p.color || p.specs?.color || '',
              recommendedAge: p.recommendedAge || p.specs?.recommendedAge || '',
              washCare: p.washCare || p.specs?.washCare || '',
              packaging: p.packaging || p.specs?.packaging || '',
              specs: p.specs || {},
              subtitle: p.subtitle || '',
              boughtText: p.boughtText || '',
              highlights: p.highlights || []
            };
          }
        });
        await supabase.from('categories').upsert({
          id: '__site_package_details__',
          name: 'Global Package Extended Details',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
          desc: JSON.stringify(pkgDetailsMap)
        });

        const catRows = appState.categories
          .filter(c => c.id !== '__site_subcategories__')
          .map(c => ({
            id: c.id,
            name: c.name,
            icon: c.icon || '🎈',
            badge: c.badge || 'POPULAR',
            image: c.image,
            desc: c.desc || ''
          }));

        const { error: catErr } = await supabase.from('categories').upsert(catRows);
        if (catErr) throw catErr;

        // 2. Sync Products (with subcat tag encoding)
        const prodRows = appState.products.map(p => {
          const tagsWithSubcat = p.subcategory 
            ? Array.from(new Set([...(p.tags || []), `subcat:${p.subcategory}`]))
            : (p.tags || []);
          return {
            id: p.id,
            title: p.title,
            category: p.category,
            category_name: p.categoryName || p.category,
            subcategory: p.subcategory || '',
            price: Number(p.price) || 0,
            original_price: Number(p.originalPrice) || Number(p.price) || 0,
            discount: Number(p.discount) || 0,
            rating: Number(p.rating) || 4.9,
            reviews_count: Number(p.reviewsCount) || 100,
            badge: p.badge || 'BESTSELLER',
            setup_duration: p.setupDuration || '1.5 - 2 Hours',
            slots_alert: p.slotsAlert || '',
            image: p.image,
            gallery: p.gallery || [p.image],
            description: p.description || '',
            about_description: p.aboutDescription || p.description || '',
            inclusions: p.inclusions || [],
            not_included: p.notIncluded || [],
            faqs: p.faqs || [],
            addons: p.addons || [],
            delivery_note: p.deliveryNote || '',
            decorator_note: p.decoratorNote || '',
            lifespan_note: p.lifespanNote || '',
            location_note: p.locationNote || '',
            color_palettes: p.colorPalettes || [],
            options: p.options || [],
            tags: tagsWithSubcat
          };
        });

        // 3. Sync Wedding Services & Configs
        if (window.SITE_DATA?.weddingServices) {
          await supabase.from('categories').upsert({
            id: '__site_wedding_services__',
            name: 'Global Wedding Services List',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            desc: JSON.stringify(window.SITE_DATA.weddingServices)
          });
        }

        if (window.SITE_DATA?.weddingConfigs) {
          await supabase.from('categories').upsert({
            id: '__site_wedding_configs__',
            name: 'Global Wedding Configs & Options',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
            desc: JSON.stringify(window.SITE_DATA.weddingConfigs)
          });
        }

        // 4. Sync Site Banners Configuration
        if (Array.isArray(appState.banners) && appState.banners.length > 0) {
          await supabase.from('categories').upsert({
            id: '__site_banners__',
            name: 'Site Banners Configuration',
            image: '',
            desc: JSON.stringify(appState.banners)
          });
        }

        const { error: prodErr } = await supabase.from('products').upsert(prodRows);
        if (prodErr) throw prodErr;

        updateSupabaseStatus(true, '🟢 Synced with Supabase');
        showToast(`Successfully synced ${catRows.length} categories & ${prodRows.length} packages to Supabase!`, 'success');
      } catch (err) {
        console.error('Supabase sync error:', err);
        showToast('Supabase error: ' + err.message + '. Run SQL schema in Supabase first.', 'error');
      } finally {
        syncBtn.disabled = false;
        syncBtn.textContent = '⚡ Sync All Data to Supabase';
      }
    });

    copySchemaBtn?.addEventListener('click', () => {
      const sqlSchema = `-- Celebration Events - Supabase Schema & Migration
-- 1. Create Tables (if setting up fresh)
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '🎈',
    badge TEXT DEFAULT 'POPULAR',
    image TEXT NOT NULL,
    "desc" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
    subcategory TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    discount NUMERIC DEFAULT 0,
    rating NUMERIC DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 100,
    badge TEXT DEFAULT 'BESTSELLER',
    setup_duration TEXT DEFAULT '1.5 - 2 Hours',
    slots_alert TEXT,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    about_description TEXT,
    inclusions JSONB DEFAULT '[]'::jsonb,
    not_included JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    addons JSONB DEFAULT '[]'::jsonb,
    delivery_note TEXT,
    decorator_note TEXT,
    lifespan_note TEXT,
    location_note TEXT,
    color_palettes JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add columns if table already exists (Run this to add missing columns)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slots_alert TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS about_description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS not_included JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS addons JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS delivery_note TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS decorator_note TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS lifespan_note TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS location_note TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS color_palettes JSONB DEFAULT '[]'::jsonb;

-- 3. Row Level Security Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow public delete categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON public.products FOR DELETE USING (true);`;

      navigator.clipboard.writeText(sqlSchema);
      showToast('SQL Schema copied! Paste into Supabase SQL Editor.', 'info');
    });
  }

  /* ==========================================================================
     PACKAGES SECTION (CRUD)
     ========================================================================== */
  function renderCategoryFilterOptions() {
    const filterSelect = document.getElementById('packageCategoryFilter');
    const modalCatSelect = document.getElementById('pkgCategory');

    if (filterSelect) {
      const currentVal = filterSelect.value;
      filterSelect.innerHTML = `<option value="all">All Categories (${appState.products.length})</option>` +
        appState.categories.map(c => {
          const count = appState.products.filter(p => p.category === c.id).length;
          return `<option value="${c.id}">${c.icon || '🎈'} ${c.name} (${count})</option>`;
        }).join('');
      filterSelect.value = currentVal;
    }

    if (modalCatSelect) {
      modalCatSelect.innerHTML = appState.categories.map(c => {
        return `<option value="${c.id}">${c.icon || '🎈'} ${c.name}</option>`;
      }).join('');
    }
  }

  function renderPackages() {
    const grid = document.getElementById('packagesGrid');
    if (!grid) return;

    let items = [...appState.products];

    // Filter by search
    if (appState.searchTerm) {
      if (appState.searchTerm.includes('@')) {
        appState.searchTerm = '';
        const searchInputEl = document.getElementById('packageSearchInput');
        if (searchInputEl) searchInputEl.value = '';
      } else {
        items = items.filter(p => {
          const t = (p.title || '').toLowerCase();
          const id = (p.id || '').toLowerCase();
          const d = (p.description || '').toLowerCase();
          const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : '';
          return t.includes(appState.searchTerm) || id.includes(appState.searchTerm) || d.includes(appState.searchTerm) || tags.includes(appState.searchTerm);
        });
      }
    }

    // Filter by category
    if (appState.selectedCategory !== 'all') {
      items = items.filter(p => p.category === appState.selectedCategory);
    }

    // Filter by subcategory
    if (appState.selectedSubcategory && appState.selectedSubcategory !== 'all') {
      items = items.filter(p => matchesSubcategory(p, appState.selectedSubcategory, appState.selectedCategory !== 'all' ? appState.selectedCategory : p.category));
    }

    // Sort
    if (appState.selectedSort === 'price-low') {
      items.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (appState.selectedSort === 'price-high') {
      items.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (appState.selectedSort === 'rating') {
      items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (appState.selectedSort === 'title') {
      items.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No Packages Found</h3>
          <p>No celebration packages match your current filter or search criteria.</p>
          <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:14px;">
            <button type="button" class="btn-secondary" onclick="window.adminStudio.clearPackageSearch()" style="background:#f1f5f9; color:#0f172a; padding:10px 18px; border-radius:8px; font-weight:600; border:1.5px solid #cbd5e1; cursor:pointer;">
              ✕ Reset Search & Filters
            </button>
            <button class="btn-add-primary" onclick="window.adminStudio.openPackageModal('add')">
              + Add New Package
            </button>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(p => {
      const isWedding = (p.category === 'wedding');
      const isGifts = (p.category === 'gifts');
      const catObj = appState.categories.find(c => c.id === p.category);
      const catName = isWedding ? '💍 Wedding Service' : (isGifts ? '🎁 Gift Marketplace' : (catObj ? `${catObj.icon || '🎈'} ${catObj.name}` : (p.categoryName || p.category)));
      const subcatObj = (catObj && Array.isArray(catObj.subcategories)) ? catObj.subcategories.find(s => s.id === p.subcategory) : null;
      const subcatBadge = subcatObj 
        ? `<span class="card-subcat-tag">${subcatObj.icon || '🏷️'} ${escapeHtml(subcatObj.name)}</span>` 
        : (p.subcategory ? `<span class="card-subcat-tag">🏷️ ${escapeHtml(p.subcategory)}</span>` : '');
      const inclusionsCount = Array.isArray(p.inclusions) ? p.inclusions.length : 0;
      const optionsCount = (p.options && p.options.length) || (window.SITE_DATA?.weddingConfigs?.[p.id]?.length) || 4;
      const discountBadge = p.discount ? `<span class="discount-tag">${p.discount}% OFF</span>` : '';
      const origPrice = p.originalPrice ? `<span class="original-price">₹${Number(p.originalPrice).toLocaleString('en-IN')}</span>` : '';

      return `
        <div class="package-admin-card" data-pkg-id="${p.id}">
          <div class="card-img-wrap" ${isWedding ? `onclick="window.adminStudio.openWeddingServiceEditor('${p.id}')" style="cursor:pointer;" title="Click to edit inside options & service"` : ''}>
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" onerror="this.src='https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80'" loading="lazy" />
            ${p.badge ? `<span class="card-badge-top">${escapeHtml(p.badge)}</span>` : ''}
            <span class="card-category-pill">${escapeHtml(catName)}</span>
          </div>
          <div class="card-body">
            <h4 class="card-title" title="${escapeHtml(p.title)}" ${isWedding ? `onclick="window.adminStudio.openWeddingServiceEditor('${p.id}')" style="cursor:pointer;" title="Click to edit options"` : ''}>${escapeHtml(p.title)}</h4>
            <div class="card-slug">ID: ${escapeHtml(p.id)}</div>
            ${subcatBadge}
            
            ${isWedding ? `
              <div class="card-price-row">
                <span class="card-wedding-quote-tag">💍 Modular Wedding Service</span>
                <span style="font-size:12px; color:var(--brand-primary); font-weight:700;">Custom Quote</span>
              </div>
            ` : `
              <div class="card-price-row">
                <span class="current-price">₹${Number(p.price || 0).toLocaleString('en-IN')}</span>
                ${origPrice}
                ${discountBadge}
              </div>
            `}

            ${isWedding ? `
              <div class="card-meta-row" style="font-size:12px; color:var(--text-muted); line-height:1.4;">
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100%; display:block;">${escapeHtml(p.description || p.desc || 'Custom traditional wedding service')}</span>
              </div>
            ` : isGifts ? `
              <div class="card-meta-row">
                <span class="meta-rating">★ ${p.rating || '4.9'} <span style="color:var(--text-dim);font-weight:400;">(${p.reviewsCount || 100})</span></span>
                <span class="meta-time">🚚 Express Pan-India Delivery</span>
              </div>
            ` : `
              <div class="card-meta-row">
                <span class="meta-rating">★ ${p.rating || '4.9'} <span style="color:var(--text-dim);font-weight:400;">(${p.reviewsCount || 100})</span></span>
                <span class="meta-time">⏱️ ${escapeHtml(p.setupDuration || '1.5 - 2 Hours')}</span>
              </div>
            `}

            <div class="card-inclusions-summary">
              ${isWedding 
                ? `⚙️ <strong>${optionsCount} Inside Option Sections</strong> • 100% Configurable` 
                : isGifts 
                  ? `🎁 Curated <strong>Gift Hamper / Bouquet / Cake</strong>` 
                  : `✨ Includes <strong>${inclusionsCount} items</strong> ${Array.isArray(p.tags) && p.tags.length > 0 ? `• ${p.tags[0]}` : ''}`}
            </div>

            <div class="card-actions-row">
              ${isWedding ? `
                <button type="button" class="btn-card-action btn-card-options" onclick="window.adminStudio.openWeddingServiceEditor('${p.id}')">
                  ⚙️ Inside Options & Edit
                </button>
                <a href="../wedding.html#service-${encodeURIComponent(p.id)}" target="_blank" class="btn-card-action btn-card-view" title="Live Customer Experience">
                  👁️
                </a>
                <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('package', '${p.id}', '${escapeHtml(p.title)}')" title="Delete Service">
                  🗑️
                </button>
              ` : `
                ${isGifts ? `
                  <button type="button" class="btn-card-action btn-card-edit" onclick="window.adminStudio.openGiftModal('edit', '${p.id}')">
                    ✏️ Edit Gift
                  </button>
                  <a href="../gift-detail.html?id=${encodeURIComponent(p.id)}" target="_blank" class="btn-card-action btn-card-view" title="Preview live on Gift Marketplace">
                    👁️
                  </a>
                  <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('package', '${p.id}', '${escapeHtml(p.title)}')" title="Delete Gift">
                    🗑️
                  </button>
                ` : `
                  <button type="button" class="btn-card-action btn-card-edit" onclick="window.adminStudio.openPackageModal('edit', '${p.id}')">
                    ✏️ Edit Package
                  </button>
                  <a href="../package.html?id=${encodeURIComponent(p.id)}" target="_blank" class="btn-card-action btn-card-view" title="Preview live on website">
                    👁️
                  </a>
                  <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('package', '${p.id}', '${escapeHtml(p.title)}')" title="Delete package">
                    🗑️
                  </button>
                `}
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function switchPackageTab(tabId, btn) {
    document.querySelectorAll('.pkg-studio-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pkg-studio-pane').forEach(p => p.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
    } else {
      const activeBtn = document.querySelector(`.pkg-studio-tab-btn[onclick*="'${tabId}'"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
    const target = document.getElementById('pkgPane-' + tabId);
    if (target) target.classList.add('active');
  }

  function updatePackageSubcategoryOptions(catId, selectedSubId = '') {
    const select = document.getElementById('pkgSubcategory');
    if (!select) return;
    let cat = appState.categories.find(c => c.id === catId);
    let subcats = (cat && Array.isArray(cat.subcategories) && cat.subcategories.length > 0)
      ? cat.subcategories
      : ((window.SITE_DATA?.categories?.find(c => c.id === catId)?.subcategories) || []);

    // Self-heal cat.subcategories in appState if empty
    if (cat && (!Array.isArray(cat.subcategories) || cat.subcategories.length === 0) && subcats.length > 0) {
      cat.subcategories = JSON.parse(JSON.stringify(subcats));
    }

    select.innerHTML = `
      <option value="">(All / General)</option>
      ${subcats.map(s => `
        <option value="${s.id}" ${s.id === selectedSubId ? 'selected' : ''}>${s.icon || '🏷️'} ${escapeHtml(s.name)}</option>
      `).join('')}
      <option value="__create_new__" style="color:var(--brand-primary); font-weight:700;">➕ + Create New Subcategory...</option>
    `;
    select.value = selectedSubId || '';
  }

  function openSubcategoryModalFromPackageModal() {
    const pkgCategory = document.getElementById('pkgCategory')?.value || appState.selectedCategoryTab || 'birthday';
    appState.openedSubcatFromPackageModal = true;
    openSubcategoryModal('add', pkgCategory);
  }

  function closeSubcategoryModal() {
    const modal = document.getElementById('subcategoryModal');
    if (modal) modal.classList.remove('active');
    appState.openedSubcatFromPackageModal = false;
  }

  function openPackageModal(mode, packageId = null, preselectedCat = null) {
    if (mode === 'edit' && packageId) {
      const pkg = appState.products.find(p => p.id === packageId);
      if (pkg && pkg.category === 'wedding') {
        openWeddingServiceEditor(packageId);
        return;
      }
      if (pkg && pkg.category === 'gifts') {
        openGiftModal(mode, packageId);
        return;
      }
    } else if (preselectedCat === 'wedding') {
      openWeddingServiceEditor(null);
      return;
    } else if (preselectedCat === 'gifts' || (appState.selectedCategoryTab === 'gifts' && !packageId)) {
      openGiftModal(mode, packageId);
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
      modalTitle.textContent = isWedding ? `Edit Wedding Service: ${pkg.title}` : `Edit Package: ${pkg.title}`;
      submitBtn.textContent = isWedding ? 'Update Wedding Service' : 'Update Package';
      slugInput.readOnly = true;

      // Tab 1: Core & Pricing
      document.getElementById('pkgTitle').value = pkg.title || '';
      slugInput.value = pkg.id || '';
      document.getElementById('pkgCategory').value = pkg.category || (appState.categories[0]?.id || 'birthday');
      let curSub = pkg.subcategory || '';
      if (!curSub && pkg.category) {
        const catObj = appState.categories.find(c => c.id === pkg.category);
        if (catObj && Array.isArray(catObj.subcategories)) {
          const foundSub = catObj.subcategories.find(s => matchesSubcategory(pkg, s.id, pkg.category));
          if (foundSub) curSub = foundSub.id;
        }
      }
      updatePackageSubcategoryOptions(pkg.category || (appState.categories[0]?.id || 'birthday'), curSub);
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
      appState.notIncludedList = Array.isArray(pkg.notIncluded) ? [...pkg.notIncluded] : [];

      // Tab 4: About This Package
      document.getElementById('pkgDescription').value = pkg.description || '';
      document.getElementById('pkgAboutDescription').value = pkg.aboutDescription || pkg.about_description || pkg.description || '';

      // Tab 5: FAQs
      appState.faqsList = Array.isArray(pkg.faqs) ? JSON.parse(JSON.stringify(pkg.faqs)) : [];

      // Tab 6: Delivery & Care
      document.getElementById('pkgDeliveryNote').value = pkg.deliveryNote || pkg.delivery_note || '';
      document.getElementById('pkgDecoratorNote').value = pkg.decoratorNote || pkg.decorator_note || '';
      document.getElementById('pkgLifespanNote').value = pkg.lifespanNote || pkg.lifespan_note || '';
      document.getElementById('pkgLocationNote').value = pkg.locationNote || pkg.location_note || '';

      // Tab 7: Add-ons & Colors
      const loadedAddons = Array.isArray(pkg.addons) ? JSON.parse(JSON.stringify(pkg.addons)) : [];
      appState.addonsList = loadedAddons.map(a => {
        const isBroken = !a.image || a.image.includes('cdn.balloondekor.com/33/milestone-board') || a.image.includes('cdn.balloondekor.com/33/neon-light') || a.image.includes('cdn.balloondekor.com/33/rose-petals') || a.image.includes('cdn.balloondekor.com/33/tea-candles') || a.image.includes('cdn.balloondekor.com/33/welcome-board');
        if (isBroken) {
          const matched = DEFAULT_ADDONS.find(d => d.id === a.id || d.name.toLowerCase() === (a.name || '').toLowerCase());
          return { ...a, image: matched ? matched.image : 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop&q=80' };
        }
        return a;
      });

      appState.colorPalettesList = Array.isArray(pkg.colorPalettes) ? JSON.parse(JSON.stringify(pkg.colorPalettes)) : [];

      // Tab 8: Why Choose Us
      populateWhyChooseInputs(pkg.whyChoose || DEFAULT_WHY_CHOOSE);

    } else {
      const defaultCategory = preselectedCat || (appState.selectedCategoryTab !== 'all' ? appState.selectedCategoryTab : (appState.categories[0]?.id || 'birthday'));
      const isWedding = (defaultCategory === 'wedding');
      modalTitle.textContent = isWedding ? 'Add New Wedding Service' : 'Add New Decoration Package';
      submitBtn.textContent = isWedding ? 'Create Wedding Service' : 'Create Package';
      slugInput.readOnly = false;

      document.getElementById('packageForm').reset();
      slugInput.value = '';
      document.getElementById('pkgTitle').value = '';
      document.getElementById('pkgCategory').value = defaultCategory;
      const preselectedSub = (appState.selectedSubcategory && appState.selectedSubcategory !== 'all') ? appState.selectedSubcategory : '';
      updatePackageSubcategoryOptions(defaultCategory, preselectedSub);

      document.getElementById('pkgPrice').value = '';
      document.getElementById('pkgOrigPrice').value = '';
      document.getElementById('pkgDiscount').value = '';
      document.getElementById('pkgRating').value = '';
      document.getElementById('pkgReviews').value = '';
      document.getElementById('pkgDuration').value = '';
      document.getElementById('pkgSlotsAlert').value = '';
      document.getElementById('pkgBadge').value = '';
      document.getElementById('pkgTags').value = '';
      document.getElementById('pkgImage').value = '';
      document.getElementById('pkgDescription').value = '';
      document.getElementById('pkgAboutDescription').value = '';
      document.getElementById('pkgDeliveryNote').value = '';
      document.getElementById('pkgDecoratorNote').value = '';
      document.getElementById('pkgLifespanNote').value = '';
      document.getElementById('pkgLocationNote').value = '';

      const newInc = document.getElementById('newInclusionInput');
      if (newInc) newInc.value = '';
      const newNotInc = document.getElementById('newNotIncludedInput');
      if (newNotInc) newNotInc.value = '';
      const newGal = document.getElementById('newGalleryInput');
      if (newGal) newGal.value = '';

      appState.inclusionsList = [];
      appState.notIncludedList = [];
      appState.galleryList = [];
      appState.faqsList = [];
      appState.addonsList = [];
      appState.colorPalettesList = [];

      // Tab 8: Why Choose Us (defaults pre-filled)
      populateWhyChooseInputs(DEFAULT_WHY_CHOOSE);
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
      container.innerHTML = `<div style="font-size:12px;color:var(--text-dim);padding:6px;">No inclusions added yet. Add key decoration items above.</div>`;
      return;
    }
    container.innerHTML = appState.inclusionsList.map((item, idx) => `
      <div class="inclusion-item">
        <span>✓ ${escapeHtml(item)}</span>
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeInclusionItem(${idx})" title="Remove item">✕</button>
      </div>
    `).join('');
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
      container.innerHTML = `<div style="font-size:12px;color:#9f1239;padding:6px;">No exclusions listed. Add terms like "No Helium Gas" above.</div>`;
      return;
    }
    container.innerHTML = appState.notIncludedList.map((item, idx) => `
      <div class="not-inc-item">
        <span>✕ ${escapeHtml(item)}</span>
        <button type="button" class="btn-remove-not-inc" onclick="window.adminStudio.removeNotIncludedItem(${idx})" title="Remove exclusion">✕</button>
      </div>
    `).join('');
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
    container.innerHTML = appState.galleryList.map((url, idx) => `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px;">
        <img src="${escapeHtml(url)}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;background:#f1f5f9;" onerror="this.src='https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=100&q=80'" />
        <span style="font-size:12px;color:var(--text-muted);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(url)}</span>
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeGalleryItem(${idx})">✕</button>
      </div>
    `).join('');
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
      container.innerHTML = `<div style="font-size:12px;color:var(--text-dim);padding:8px;">No FAQs added yet. Click "+ Add New Question" to add one.</div>`;
      return;
    }
    container.innerHTML = appState.faqsList.map((faq, idx) => `
      <div class="faq-builder-item">
        <div class="faq-builder-top">
          <strong style="font-size:12px;color:var(--text-muted);">Question #${idx + 1}</strong>
          <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removePkgFaq(${idx})" title="Delete FAQ">✕</button>
        </div>
        <div class="form-field" style="margin-bottom:8px;">
          <input type="text" placeholder="e.g. Can I customize the balloon colors?" value="${escapeHtml(faq.q)}" oninput="window.adminStudio.updatePkgFaq(${idx}, 'q', this.value)" />
        </div>
        <div class="form-field">
          <textarea rows="2" placeholder="Answer to the customer..." oninput="window.adminStudio.updatePkgFaq(${idx}, 'a', this.value)">${escapeHtml(faq.a)}</textarea>
        </div>
      </div>
    `).join('');
  }

  // --- Add-ons Handlers ---
  function addPkgAddon() {
    appState.addonsList.push({
      id: 'addon-' + Date.now(),
      name: '',
      price: '',
      badge: '',
      image: ''
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

  async function uploadAddonImage(idx, inputEl) {
    const file = inputEl.files?.[0];
    if (!file) return;
    try {
      showToast('Uploading add-on photo...', 'info');
      const url = await uploadToCloudinary(file, 'celebration-addons');
      if (appState.addonsList[idx]) {
        appState.addonsList[idx].image = url;
        const imgEl = document.getElementById(`addonImgPreview_${idx}`);
        if (imgEl) {
          imgEl.src = url;
          imgEl.onerror = null;
        }
        showToast('Add-on photo updated!', 'success');
      }
    } catch (err) {
      showToast('Photo upload error: ' + err.message, 'error');
    }
  }

  function renderAddonsList() {
    const container = document.getElementById('addonsList');
    if (!container) return;
    if (appState.addonsList.length === 0) {
      container.innerHTML = `<div style="font-size:13px; color:#64748b; padding:18px; background:#f8fafc; border:1.5px dashed #cbd5e1; border-radius:10px; text-align:center;">No add-on products added yet. Click "+ Add New Add-on" above to create one.</div>`;
      return;
    }
    container.innerHTML = appState.addonsList.map((addon, idx) => `
      <div class="addon-builder-item" style="background:#ffffff; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px 16px; margin-bottom:12px; display:flex; align-items:center; gap:14px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
        <!-- 54x54 Thumbnail with clean '+' Add/Change Image button (No cloud symbol) -->
        <div style="position:relative; width:54px; height:54px; min-width:54px; max-width:54px; flex-shrink:0;">
          <img id="addonImgPreview_${idx}" 
               src="${escapeHtml(addon.image || 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2254%22 height=%2254%22 viewBox=%220 0 54 54%22><rect width=%22100%%22 height=%22100%%22 fill=%22%23f1f5f9%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 font-size=%2218%22>📷</text></svg>')}" 
               onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2254%22 height=%2254%22 viewBox=%220 0 54 54%22><rect width=%22100%%22 height=%22100%%22 fill=%22%23f1f5f9%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 font-size=%2218%22>📷</text></svg>';" 
               alt="${escapeHtml(addon.name || 'Add-on')}" 
               style="width:54px !important; height:54px !important; border-radius:10px !important; object-fit:cover !important; border:1.5px solid #cbd5e1 !important; display:block !important; background:#f8fafc;" />
          <label title="Add / Change Photo" style="position:absolute; bottom:-5px; right:-5px; background:#be123c; color:#ffffff; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; line-height:1; cursor:pointer; box-shadow:0 2px 6px rgba(190,18,60,0.35); border:2px solid #ffffff; transition:all 0.15s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            +
            <input type="file" accept="image/*" style="display:none;" onchange="window.adminStudio.uploadAddonImage(${idx}, this)" />
          </label>
        </div>

        <!-- Title -->
        <div style="flex:2; min-width:140px;">
          <label style="font-size:11px; font-weight:700; color:#475569; margin-bottom:3px; display:block;">Add-on Name / Title *</label>
          <input type="text" value="${escapeHtml(addon.name || '')}" placeholder="e.g. Milestone Board" oninput="window.adminStudio.updatePkgAddon(${idx}, 'name', this.value)" style="width:100%; box-sizing:border-box; padding:8px 12px; font-size:13px; border:1.5px solid #cbd5e1; border-radius:8px; background:#f8fafc; outline:none;" />
        </div>

        <!-- Price -->
        <div style="width:110px; flex-shrink:0;">
          <label style="font-size:11px; font-weight:700; color:#475569; margin-bottom:3px; display:block;">Price (₹) *</label>
          <input type="number" value="${addon.price !== '' && addon.price !== undefined ? addon.price : ''}" placeholder="1999" min="0" oninput="window.adminStudio.updatePkgAddon(${idx}, 'price', this.value)" style="width:100%; box-sizing:border-box; padding:8px 12px; font-size:13px; border:1.5px solid #cbd5e1; border-radius:8px; background:#f8fafc; outline:none;" />
        </div>

        <!-- Badge -->
        <div style="width:110px; flex-shrink:0;">
          <label style="font-size:11px; font-weight:700; color:#475569; margin-bottom:3px; display:block;">Badge</label>
          <input type="text" value="${escapeHtml(addon.badge || '')}" placeholder="e.g. POPULAR" oninput="window.adminStudio.updatePkgAddon(${idx}, 'badge', this.value)" style="width:100%; box-sizing:border-box; padding:8px 12px; font-size:13px; border:1.5px solid #cbd5e1; border-radius:8px; background:#f8fafc; outline:none;" />
        </div>

        <!-- Delete button -->
        <button type="button" onclick="window.adminStudio.removePkgAddon(${idx})" title="Remove Add-on" style="background:#fff1f2; border:1px solid #fecdd3; color:#e11d48; width:34px; height:34px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; margin-top:16px;">
          🗑️
        </button>
      </div>
    `).join('');
  }

  // --- Balloon Color Choices Handlers (Simple Color Names) ---
  function addPkgColorPalette(customName) {
    const nameToAdd = (typeof customName === 'string' && customName.trim())
      ? customName.trim()
      : '';
    appState.colorPalettesList.push({
      name: nameToAdd,
      gradient: getColorGradient(nameToAdd)
    });
    renderColorPalettesList();
  }

  function removePkgColorPalette(idx) {
    appState.colorPalettesList.splice(idx, 1);
    renderColorPalettesList();
  }

  function updatePkgColorPalette(idx, val) {
    if (appState.colorPalettesList[idx]) {
      const name = val || '';
      appState.colorPalettesList[idx] = {
        name: name,
        gradient: getColorGradient(name)
      };
      const dot = document.getElementById(`colorDotPreview_${idx}`);
      if (dot) {
        dot.style.background = getColorGradient(name);
      }
    }
  }

  function renderColorPalettesList() {
    const container = document.getElementById('colorPalettesList');
    if (!container) return;
    if (appState.colorPalettesList.length === 0) {
      container.innerHTML = `<div style="font-size:13px; color:#64748b; padding:18px; background:#f8fafc; border:1.5px dashed #cbd5e1; border-radius:10px; text-align:center;">No balloon color options added. Click "+ Add Color Name" above.</div>`;
      return;
    }
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${appState.colorPalettesList.map((cp, idx) => {
          const colorName = typeof cp === 'string' ? cp : (cp.name || '');
          const gradient = (typeof cp === 'object' && cp.gradient) ? cp.gradient : getColorGradient(colorName);
          return `
            <div class="color-palette-item" style="display:flex; align-items:center; gap:12px; background:#ffffff; border:1.5px solid #e2e8f0; border-radius:10px; padding:8px 12px; box-shadow:0 1px 3px rgba(0,0,0,0.02); transition:all 0.15s ease;">
              <span id="colorDotPreview_${idx}" style="width:26px; height:26px; min-width:26px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 0 1.5px #cbd5e1; flex-shrink:0; background:${gradient}; display:inline-block;"></span>
              <input type="text" value="${escapeHtml(colorName)}" placeholder="e.g. Same as Image, Pastel Blue & Pink, Gold & Black..." oninput="window.adminStudio.updatePkgColorPalette(${idx}, this.value)" style="flex:1; padding:9px 14px; font-size:13.5px; font-weight:600; color:#1e293b; border:1.5px solid #e2e8f0; border-radius:8px; background:#f8fafc; outline:none;" onfocus="this.style.borderColor='#be123c'; this.style.background='#fff';" onblur="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';" />
              <button type="button" onclick="window.adminStudio.removePkgColorPalette(${idx})" title="Delete Color" style="background:#fff1f2; border:1px solid #fecdd3; color:#e11d48; width:34px; height:34px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; transition:all 0.15s;">
                🗑️
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Quick Preset Suggestions -->
      <div style="margin-top:12px; padding:12px; background:#f8fafc; border-radius:10px; border:1px dashed #cbd5e1;">
        <span style="font-size:11.5px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:8px;">💡 Quick Presets (Click to add):</span>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Same as Image')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Same as Image</button>
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Rose Gold & White')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Rose Gold & White</button>
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Gold & Black')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Gold & Black</button>
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Pastel Blue & White')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Pastel Blue & White</button>
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Pink & Purple')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Pink & Purple</button>
          <button type="button" onclick="window.adminStudio.addPkgColorPalette('Multicolors / Rainbow')" style="font-size:11.5px; font-weight:600; padding:4px 10px; border-radius:99px; background:#ffffff; border:1px solid #cbd5e1; cursor:pointer; color:#334155;">+ Multicolors / Rainbow</button>
        </div>
      </div>
    `;
  }

  function populateWhyChooseInputs(data) {
    const why = (data && typeof data === 'object') ? data : DEFAULT_WHY_CHOOSE;
    const titleEl = document.getElementById('pkgWhyTitle');
    if (titleEl) titleEl.value = why.title || DEFAULT_WHY_CHOOSE.title;

    const highlights = (Array.isArray(why.highlights) && why.highlights.length >= 4) ? why.highlights : DEFAULT_WHY_CHOOSE.highlights;
    for (let i = 0; i < 4; i++) {
      const h = highlights[i] || DEFAULT_WHY_CHOOSE.highlights[i];
      const iconEl = document.getElementById(`pkgWhyItem${i + 1}Icon`);
      const titleInput = document.getElementById(`pkgWhyItem${i + 1}Title`);
      const descInput = document.getElementById(`pkgWhyItem${i + 1}Desc`);
      if (iconEl) iconEl.value = h.icon || DEFAULT_WHY_CHOOSE.highlights[i].icon;
      if (titleInput) titleInput.value = h.title || DEFAULT_WHY_CHOOSE.highlights[i].title;
      if (descInput) descInput.value = h.desc || DEFAULT_WHY_CHOOSE.highlights[i].desc;
    }

    const stats = (Array.isArray(why.stats) && why.stats.length >= 4) ? why.stats : DEFAULT_WHY_CHOOSE.stats;
    for (let i = 0; i < 4; i++) {
      const s = stats[i] || DEFAULT_WHY_CHOOSE.stats[i];
      const valEl = document.getElementById(`pkgWhyStat${i + 1}Val`);
      const labelEl = document.getElementById(`pkgWhyStat${i + 1}Label`);
      if (valEl) valEl.value = s.value || DEFAULT_WHY_CHOOSE.stats[i].value;
      if (labelEl) labelEl.value = s.label || DEFAULT_WHY_CHOOSE.stats[i].label;
    }
  }

  function readWhyChooseInputs() {
    const title = document.getElementById('pkgWhyTitle')?.value?.trim() || DEFAULT_WHY_CHOOSE.title;
    const highlights = [];
    for (let i = 0; i < 4; i++) {
      highlights.push({
        icon: document.getElementById(`pkgWhyItem${i + 1}Icon`)?.value?.trim() || DEFAULT_WHY_CHOOSE.highlights[i].icon,
        title: document.getElementById(`pkgWhyItem${i + 1}Title`)?.value?.trim() || DEFAULT_WHY_CHOOSE.highlights[i].title,
        desc: document.getElementById(`pkgWhyItem${i + 1}Desc`)?.value?.trim() || DEFAULT_WHY_CHOOSE.highlights[i].desc
      });
    }

    const stats = [];
    for (let i = 0; i < 4; i++) {
      stats.push({
        value: document.getElementById(`pkgWhyStat${i + 1}Val`)?.value?.trim() || DEFAULT_WHY_CHOOSE.stats[i].value,
        label: document.getElementById(`pkgWhyStat${i + 1}Label`)?.value?.trim() || DEFAULT_WHY_CHOOSE.stats[i].label
      });
    }

    return { title, highlights, stats };
  }

  function resetWhyChooseDefaults() {
    populateWhyChooseInputs(DEFAULT_WHY_CHOOSE);
    showToast('Why Choose Us fields reset to brand defaults', 'info');
  }

  function updatePackageModalPreview() {
    const title = document.getElementById('pkgTitle')?.value?.trim() || '';
    const price = document.getElementById('pkgPrice')?.value?.trim() || '';
    const orig = document.getElementById('pkgOrigPrice')?.value?.trim() || '';
    const imgUrl = document.getElementById('pkgImage')?.value?.trim() || '';
    const badge = document.getElementById('pkgBadge')?.value?.trim() || '';

    const prevImg = document.getElementById('pkgModalImgPreview');
    const prevTitle = document.getElementById('pkgModalTitlePreview');
    const prevPrice = document.getElementById('pkgModalPricePreview');
    const prevBadge = document.getElementById('pkgModalBadgePreview');

    if (prevImg) {
      if (imgUrl) {
        prevImg.src = imgUrl;
        prevImg.style.display = 'block';
      } else {
        prevImg.src = BLANK_PIXEL;
        prevImg.style.display = 'none';
      }
    }
    if (prevTitle) prevTitle.textContent = title || 'Package Title Preview';
    if (prevPrice) prevPrice.textContent = price ? `₹${Number(price).toLocaleString('en-IN')}${orig ? ` (Orig ₹${Number(orig).toLocaleString('en-IN')})` : ''}` : '₹0';
    if (prevBadge) {
      if (badge) {
        prevBadge.textContent = badge;
        prevBadge.style.display = 'inline-block';
      } else {
        prevBadge.style.display = 'none';
      }
    }
  }

  async function handlePackageFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('pkgTitle').value.trim();
    let slug = document.getElementById('pkgSlug').value.trim();
    const category = document.getElementById('pkgCategory').value;
    const subcategory = document.getElementById('pkgSubcategory')?.value || '';
    const price = parseInt(document.getElementById('pkgPrice').value, 10);
    const origPrice = parseInt(document.getElementById('pkgOrigPrice').value, 10) || price;
    const discount = parseInt(document.getElementById('pkgDiscount').value, 10) || 0;
    const rating = parseFloat(document.getElementById('pkgRating').value) || 4.9;
    const reviewsCount = parseInt(document.getElementById('pkgReviews').value, 10) || 0;
    const badge = document.getElementById('pkgBadge').value.trim();
    const duration = document.getElementById('pkgDuration').value.trim() || '';
    const slotsAlert = document.getElementById('pkgSlotsAlert')?.value.trim() || '';
    const image = document.getElementById('pkgImage').value.trim();
    const description = document.getElementById('pkgDescription').value.trim();
    const aboutDescription = document.getElementById('pkgAboutDescription')?.value.trim() || description;
    const tagsRaw = document.getElementById('pkgTags').value.trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    const deliveryNote = document.getElementById('pkgDeliveryNote')?.value.trim() || '';
    const decoratorNote = document.getElementById('pkgDecoratorNote')?.value.trim() || '';
    const lifespanNote = document.getElementById('pkgLifespanNote')?.value.trim() || '';
    const locationNote = document.getElementById('pkgLocationNote')?.value.trim() || '';

    if (!title || !price || isNaN(price)) {
      showToast('Please fill out all required fields (Title & Price).', 'error');
      switchPackageTab('core');
      return;
    }

    if (!image) {
      showToast('Please provide a Primary Cover Image URL or upload one.', 'error');
      switchPackageTab('media');
      return;
    }

    if (!slug) slug = slugify(title);

    const catObj = appState.categories.find(c => c.id === category);
    const categoryName = catObj ? catObj.name : category;

    let gallery = [...appState.galleryList];
    if (image && !gallery.includes(image)) gallery.unshift(image);

    const packageData = {
      id: slug,
      title,
      category,
      categoryName,
      subcategory,
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
      description,
      aboutDescription,
      about_description: aboutDescription,
      inclusions: [...appState.inclusionsList],
      notIncluded: [...appState.notIncludedList],
      not_included: [...appState.notIncludedList],
      faqs: JSON.parse(JSON.stringify(appState.faqsList || [])),
      deliveryNote,
      delivery_note: deliveryNote,
      decoratorNote,
      decorator_note: decoratorNote,
      lifespanNote,
      lifespan_note: lifespanNote,
      locationNote,
      location_note: locationNote,
      addons: JSON.parse(JSON.stringify(appState.addonsList || [])),
      colorPalettes: JSON.parse(JSON.stringify(appState.colorPalettesList || [])),
      color_palettes: JSON.parse(JSON.stringify(appState.colorPalettesList || [])),
      whyChoose: readWhyChooseInputs(),
      why_choose: readWhyChooseInputs(),
      tags
    };

    if (appState.editingPackageId) {
      const idx = appState.products.findIndex(p => p.id === appState.editingPackageId);
      if (idx !== -1) {
        appState.products[idx] = packageData;
      }
    } else {
      if (appState.products.some(p => p.id === slug)) {
        showToast(`Package ID "${slug}" already exists.`, 'error');
        return;
      }
      appState.products.unshift(packageData);
    }

    // Save to local & commit
    commitData(`Package "${title}" saved with complete studio details!`);

    // Sync to Supabase in background
    if (supabase) {
      const tagsWithSubcat = subcategory 
        ? Array.from(new Set([...tags, `subcat:${subcategory}`]))
        : tags;

      supabase.from('products').upsert({
        id: slug,
        title,
        category,
        category_name: categoryName,
        subcategory: packageData.subcategory || '',
        price,
        original_price: origPrice,
        discount,
        rating,
        reviews_count: reviewsCount,
        badge,
        setup_duration: duration,
        slots_alert: packageData.slotsAlert || '',
        image,
        gallery,
        description: packageData.description,
        about_description: packageData.aboutDescription || packageData.description || '',
        inclusions: packageData.inclusions,
        not_included: packageData.notIncluded || [],
        faqs: packageData.faqs || [],
        addons: packageData.addons || [],
        delivery_note: packageData.deliveryNote || '',
        decorator_note: packageData.decoratorNote || '',
        lifespan_note: packageData.lifespanNote || '',
        location_note: packageData.locationNote || '',
        color_palettes: packageData.colorPalettes || [],
        why_choose: packageData.whyChoose,
        tags: tagsWithSubcat
      }).then(({ error }) => {
        if (!error) console.log('Package synced to Supabase:', slug);
        else console.warn('Supabase product sync warning:', error);
      });
    }

    closeAllModals();
  }
  /* ==========================================================================
     CATEGORIES SECTION (CRUD)
     ========================================================================== */
  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    if (appState.categories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🏷️</div>
          <h3>No Categories Found</h3>
          <p>Add your first celebration occasion category to organize packages.</p>
          <button class="btn-add-primary" onclick="window.adminStudio.openCategoryModal('add')">
            + Add New Category
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = appState.categories.map(c => {
      const pkgCount = appState.products.filter(p => p.category === c.id).length;
      return `
        <div class="category-admin-card" data-cat-id="${c.id}">
          <div class="cat-banner-box">
            <img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.name)}" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'" loading="lazy" />
            <div class="cat-icon-badge">${c.icon || '🎈'}</div>
            ${c.badge ? `<span class="cat-badge-tag">${escapeHtml(c.badge)}</span>` : ''}
          </div>
          <div class="cat-body">
            <div class="cat-title-row">
              <h4 class="cat-name">${escapeHtml(c.name)}</h4>
              <span class="cat-pkg-count">${pkgCount} packages</span>
            </div>
            <div class="cat-slug">Slug: ${escapeHtml(c.id)}</div>
            <p class="cat-desc">${escapeHtml(c.desc || 'No description provided.')}</p>

            <div class="cat-actions">
              <button class="btn-card-action btn-card-edit" onclick="window.adminStudio.openCategoryModal('edit', '${c.id}')">
                ✏️ Edit Category
              </button>
              <button class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('category', '${c.id}', '${escapeHtml(c.name)}')" title="Delete category">
                🗑️
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderCatModalSubcategories(catId) {
    const listEl = document.getElementById('catModalSubcategoriesList');
    const countEl = document.getElementById('catModalSubcatCount');
    const sectionEl = document.getElementById('categoryModalSubcatSection');
    if (!listEl) return;

    if (!catId) {
      if (sectionEl) sectionEl.style.display = 'none';
      return;
    }
    if (sectionEl) sectionEl.style.display = 'block';

    const cat = appState.categories.find(c => c.id === catId);
    const subcats = (cat && Array.isArray(cat.subcategories)) ? cat.subcategories : [];
    if (countEl) countEl.textContent = subcats.length;

    if (subcats.length === 0) {
      listEl.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No subcategories added yet.</span>';
      return;
    }

    listEl.innerHTML = subcats.map(s => `
      <div class="cat-modal-subcat-item">
        <span>${s.icon || '🏷️'}</span>
        <span>${escapeHtml(s.name)}</span>
        <button type="button" class="btn-remove-sub" onclick="window.adminStudio.deleteSubcategoryDirect('${cat.id}', '${s.id}')" title="Delete subcategory">✕</button>
      </div>
    `).join('');
  }

  function openCategoryModal(mode, categoryId = null) {
    appState.editingCategoryId = (mode === 'edit') ? categoryId : null;
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('categoryModalTitle');
    const slugInput = document.getElementById('catSlug');
    const submitBtn = document.getElementById('saveCategoryBtn');
    const imgPreview = document.getElementById('catImagePreview');

    if (mode === 'edit' && categoryId) {
      const cat = appState.categories.find(c => c.id === categoryId);
      if (!cat) return;
      modalTitle.textContent = `Edit Category: ${cat.name}`;
      submitBtn.textContent = 'Update Category';
      slugInput.readOnly = true;

      document.getElementById('catName').value = cat.name || '';
      slugInput.value = cat.id || '';
      document.getElementById('catBadge').value = cat.badge || '';
      document.getElementById('catImage').value = cat.image || '';
      document.getElementById('catDesc').value = cat.desc || '';
      if (imgPreview) {
        if (cat.image) {
          imgPreview.src = cat.image;
          imgPreview.style.display = 'block';
        } else {
          imgPreview.src = BLANK_PIXEL;
          imgPreview.style.display = 'none';
        }
      }
      renderCatModalSubcategories(categoryId);
    } else {
      modalTitle.textContent = 'Add New Category';
      submitBtn.textContent = 'Create Category';
      slugInput.readOnly = false;

      document.getElementById('categoryForm').reset();
      slugInput.value = '';
      document.getElementById('catName').value = '';
      document.getElementById('catBadge').value = '';
      document.getElementById('catImage').value = '';
      document.getElementById('catDesc').value = '';
      if (imgPreview) {
        imgPreview.src = BLANK_PIXEL;
        imgPreview.style.display = 'none';
      }
      renderCatModalSubcategories(null);
    }

    modal.classList.add('active');
  }

  async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('catName').value.trim();
    let slug = document.getElementById('catSlug').value.trim();
    const badge = document.getElementById('catBadge').value.trim();
    const image = document.getElementById('catImage').value.trim();
    const desc = document.getElementById('catDesc').value.trim();

    if (!name) {
      showToast('Please specify a category name.', 'error');
      return;
    }

    if (!image) {
      showToast('Please provide a Category Banner Image URL or upload one.', 'error');
      return;
    }

    if (!slug) slug = slugify(name);

    const existingCat = appState.editingCategoryId ? appState.categories.find(c => c.id === appState.editingCategoryId) : null;
    const subcategories = existingCat && Array.isArray(existingCat.subcategories) ? existingCat.subcategories : [];
    const icon = existingCat?.icon || '';

    const categoryData = {
      id: slug,
      name,
      icon,
      badge,
      image,
      desc: desc || '',
      subcategories
    };

    if (appState.editingCategoryId) {
      const oldSlug = appState.editingCategoryId;
      const idx = appState.categories.findIndex(c => c.id === oldSlug);
      if (idx !== -1) {
        appState.categories[idx] = categoryData;
        appState.products.forEach(p => {
          if (p.category === oldSlug) {
            p.category = slug;
            p.categoryName = name;
          }
        });
        commitData(`Category "${name}" updated!`);
      }
    } else {
      if (appState.categories.some(c => c.id === slug)) {
        showToast(`Category slug "${slug}" already exists.`, 'error');
        return;
      }
      appState.categories.push(categoryData);
      commitData(`New category "${name}" created!`);
    }

    // Sync to Supabase
    if (supabase) {
      supabase.from('categories').upsert(categoryData).then(({ error }) => {
        if (!error) console.log('Category synced to Supabase:', slug);
      });
    }

    closeAllModals();
  }

  /* ==========================================================================
     SUBCATEGORIES MANAGEMENT (FULL CRUD & FILTERING)
     ========================================================================== */
  function openSubcategoryModal(mode, parentCatId = null, subcatId = null) {
    appState.editingSubcategoryId = (mode === 'edit') ? subcatId : null;
    appState.editingSubcatParentId = parentCatId;

    const modal = document.getElementById('subcategoryModal');
    if (!modal) return;

    const titleEl = document.getElementById('subcategoryModalTitle');
    const submitBtn = document.getElementById('saveSubcategoryBtn');
    const catSelect = document.getElementById('subcatParentCategory');
    const nameInput = document.getElementById('subcatName');
    const slugInput = document.getElementById('subcatSlug');
    const headerTitleInput = document.getElementById('subcatTitle');

    // Populate Parent Category options
    if (catSelect) {
      catSelect.innerHTML = appState.categories.map(c => `
        <option value="${c.id}" ${c.id === parentCatId ? 'selected' : ''}>${c.icon ? c.icon + ' ' : ''}${escapeHtml(c.name)}</option>
      `).join('');
    }

    if (mode === 'edit' && parentCatId && subcatId) {
      const parentCat = appState.categories.find(c => c.id === parentCatId);
      const sub = parentCat?.subcategories?.find(s => s.id === subcatId);
      if (!sub) {
        showToast('Subcategory not found', 'error');
        return;
      }
      titleEl.textContent = `Edit Subcategory: ${sub.name}`;
      submitBtn.textContent = 'Update Subcategory';
      catSelect.disabled = true;
      nameInput.value = sub.name || '';
      slugInput.value = sub.id || '';
      slugInput.readOnly = true;
      headerTitleInput.value = sub.title || sub.name || '';
    } else {
      titleEl.textContent = 'Add New Subcategory';
      submitBtn.textContent = 'Create Subcategory';
      catSelect.disabled = false;
      document.getElementById('subcategoryForm')?.reset();
      if (parentCatId && catSelect) catSelect.value = parentCatId;
      slugInput.readOnly = false;
      slugInput.value = '';
      nameInput.value = '';
      headerTitleInput.value = '';
    }

    modal.classList.add('active');
  }

  async function handleSubcategoryFormSubmit(e) {
    e.preventDefault();
    const parentCatId = document.getElementById('subcatParentCategory').value;
    const name = document.getElementById('subcatName').value.trim();
    let slug = document.getElementById('subcatSlug').value.trim();
    const title = document.getElementById('subcatTitle').value.trim();

    if (!name) {
      showToast('Please provide a subcategory name.', 'error');
      return;
    }

    if (!slug) slug = slugify(name);

    const parentCat = appState.categories.find(c => c.id === parentCatId);
    if (!parentCat) {
      showToast('Parent category not found.', 'error');
      return;
    }

    if (!Array.isArray(parentCat.subcategories)) {
      parentCat.subcategories = [];
    }

    const existingSub = parentCat.subcategories.find(s => s.id === (appState.editingSubcategoryId || slug));
    const icon = existingSub?.icon || '';

    const subData = {
      id: slug,
      name,
      icon,
      title: title || `${name} Setups`
    };

    if (appState.editingSubcategoryId) {
      const idx = parentCat.subcategories.findIndex(s => s.id === appState.editingSubcategoryId);
      if (idx !== -1) {
        parentCat.subcategories[idx] = subData;
        if (appState.editingSubcategoryId !== slug) {
          appState.products.forEach(p => {
            if (p.category === parentCatId && p.subcategory === appState.editingSubcategoryId) {
              p.subcategory = slug;
            }
          });
        }
        await commitData(`Subcategory "${name}" updated!`);
      }
    } else {
      if (parentCat.subcategories.some(s => s.id === slug)) {
        showToast(`Subcategory key "${slug}" already exists in ${parentCat.name}.`, 'error');
        return;
      }
      parentCat.subcategories.push(subData);
      await commitData(`Subcategory "${name}" added to ${parentCat.name}!`);
    }

    if (appState.openedSubcatFromPackageModal) {
      appState.openedSubcatFromPackageModal = false;
      const subModal = document.getElementById('subcategoryModal');
      if (subModal) subModal.classList.remove('active');
      const pkgCatSelect = document.getElementById('pkgCategory');
      if (pkgCatSelect) {
        if (pkgCatSelect.value !== parentCatId) {
          pkgCatSelect.value = parentCatId;
        }
        updatePackageSubcategoryOptions(parentCatId, slug);
      }
    } else {
      closeAllModals();
    }
    renderCategorySubcategoriesBar(appState.selectedCategoryTab);
    renderCatModalSubcategories(appState.editingCategoryId);
    renderPackages();
  }

  async function deleteSubcategoryDirect(catId, subId) {
    const parentCat = appState.categories.find(c => c.id === catId);
    if (!parentCat || !Array.isArray(parentCat.subcategories)) return;
    const sub = parentCat.subcategories.find(s => s.id === subId);
    if (!confirm(`Delete subcategory "${sub?.name || subId}" from ${parentCat.name}?`)) return;

    parentCat.subcategories = parentCat.subcategories.filter(s => s.id !== subId);
    appState.products.forEach(p => {
      if (p.category === catId && p.subcategory === subId) {
        p.subcategory = '';
      }
    });
    if (appState.selectedSubcategory === subId) {
      appState.selectedSubcategory = 'all';
    }
    await commitData(`Subcategory "${sub?.name || subId}" deleted.`);
    renderCategorySubcategoriesBar(appState.selectedCategoryTab);
    renderCatModalSubcategories(catId);
    renderPackages();
  }

  /* ==========================================================================
     DELETE CONFIRMATION
     ========================================================================== */
  function openDeleteModal(type, id, displayName, parentCatId = null) {
    appState.deletingType = type;
    appState.deletingId = id;
    appState.deletingParentId = parentCatId;

    const modal = document.getElementById('deleteConfirmModal');
    const titleEl = document.getElementById('deleteModalItemName');
    const msgEl = document.getElementById('deleteModalWarning');

    titleEl.textContent = `"${displayName}"`;

    if (type === 'category') {
      const count = appState.products.filter(p => p.category === id).length;
      msgEl.innerHTML = count > 0 
        ? `⚠️ Warning: This category currently has <strong>${count} package(s)</strong> attached to it.`
        : `Are you sure you want to permanently delete this category?`;
    } else if (type === 'subcategory') {
      const parentCat = appState.categories.find(c => c.id === parentCatId);
      const count = appState.products.filter(p => p.category === parentCatId && p.subcategory === id).length;
      msgEl.innerHTML = `Are you sure you want to delete subcategory <strong>"${displayName}"</strong> from <strong>${parentCat?.name || parentCatId}</strong>?${count > 0 ? ` (${count} package(s) currently tagged with it)` : ''}`;
    } else if (type === 'blog') {
      msgEl.innerHTML = `Are you sure you want to permanently delete this blog article from your website?`;
    } else {
      const delPkg = appState.products.find(p => p.id === id);
      if (delPkg?.category === 'gifts') {
        msgEl.innerHTML = `Are you sure you want to permanently delete this gift / hamper from Gift Marketplace?`;
      } else if (delPkg?.category === 'wedding') {
        msgEl.innerHTML = `Are you sure you want to permanently delete this wedding service?`;
      } else {
        msgEl.innerHTML = `Are you sure you want to permanently delete this decoration package?`;
      }
    }

    modal.classList.add('active');
  }

  async function handleConfirmDelete() {
    if (!appState.deletingType || !appState.deletingId) return;

    if (appState.deletingType === 'category') {
      const catId = appState.deletingId;
      const catObj = appState.categories.find(c => c.id === catId);
      appState.categories = appState.categories.filter(c => c.id !== catId);

      if (!appState.deletedItems.categories.includes(catId)) {
        appState.deletedItems.categories.push(catId);
      }
      localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(appState.deletedItems));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(appState.categories));

      if (appState.selectedCategoryTab === catId) {
        appState.selectedCategoryTab = 'all';
        appState.selectedCategory = 'all';
      }

      await commitData(`Category "${catObj ? catObj.name : catId}" deleted permanently.`);

      if (supabase) {
        try {
          await supabase.from('categories').delete().eq('id', catId);
          await supabase.from('categories').upsert({
            id: '__site_deleted_items__',
            name: 'Deleted Items Registry',
            desc: JSON.stringify(appState.deletedItems)
          }, { onConflict: 'id' });
        } catch(err) {
          console.warn('Supabase category deletion error:', err);
        }
      }
    } else if (appState.deletingType === 'subcategory') {
      const subId = appState.deletingId;
      const parentCatId = appState.deletingParentId;
      const parentCat = appState.categories.find(c => c.id === parentCatId);
      if (parentCat && Array.isArray(parentCat.subcategories)) {
        parentCat.subcategories = parentCat.subcategories.filter(s => s.id !== subId);
        appState.products.forEach(p => {
          if (p.category === parentCatId && p.subcategory === subId) {
            p.subcategory = '';
          }
        });
        if (appState.selectedSubcategory === subId) {
          appState.selectedSubcategory = 'all';
        }
        await commitData(`Subcategory "${subId}" deleted from ${parentCat.name}.`);
        renderCategorySubcategoriesBar(appState.selectedCategoryTab);
        renderCatModalSubcategories(appState.editingCategoryId);
        renderPackages();
      }
    } else if (appState.deletingType === 'package') {
      const pkgId = appState.deletingId;
      const pkgObj = appState.products.find(p => p.id === pkgId);
      const isGift = pkgObj?.category === 'gifts';
      const itemLabel = isGift ? 'Gift / Hamper' : (pkgObj?.category === 'wedding' ? 'Wedding service' : 'Package');
      
      appState.products = appState.products.filter(p => p.id !== pkgId);
      if (!appState.deletedItems.products.includes(pkgId)) {
        appState.deletedItems.products.push(pkgId);
      }
      localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(appState.deletedItems));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));

      await commitData(`${itemLabel} "${pkgObj ? pkgObj.title : pkgId}" deleted permanently.`);

      if (supabase) {
        try {
          await supabase.from('products').delete().eq('id', pkgId);
          await supabase.from('categories').upsert({
            id: '__site_deleted_items__',
            name: 'Deleted Items Registry',
            desc: JSON.stringify(appState.deletedItems)
          }, { onConflict: 'id' });
        } catch(err) {
          console.warn('Supabase product deletion error:', err);
        }
      }
    } else if (appState.deletingType === 'blog') {
      const blogId = appState.deletingId;
      const blogObj = appState.blogs.find(b => b.id === blogId);
      appState.blogs = appState.blogs.filter(b => b.id !== blogId);

      if (!appState.deletedItems.blogs.includes(blogId)) {
        appState.deletedItems.blogs.push(blogId);
      }
      localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(appState.deletedItems));
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(appState.blogs));

      await commitBlogs(`Article "${blogObj ? blogObj.title : blogId}" deleted permanently.`);

      if (supabase) {
        try {
          await supabase.from('categories').upsert({
            id: '__site_deleted_items__',
            name: 'Deleted Items Registry',
            desc: JSON.stringify(appState.deletedItems)
          }, { onConflict: 'id' });
        } catch(err) {
          console.warn('Supabase blog deletion error:', err);
        }
      }
    }

    appState.deletingType = null;
    appState.deletingId = null;
    appState.deletingParentId = null;
    closeAllModals();
  }

  /* ==========================================================================
     FORM & UI EVENT LISTENERS
     ========================================================================== */
  function clearPackageSearch() {
    appState.searchTerm = '';
    const pkgSearchInput = document.getElementById('packageSearchInput');
    if (pkgSearchInput) pkgSearchInput.value = '';
    appState.selectedSubcategory = 'all';
    renderPackages();
  }

  function setupFormListeners() {
    // Search & Filters
    document.getElementById('packageSearchInput')?.addEventListener('input', (e) => {
      const raw = (e.target.value || '').trim();
      if (raw.includes('@')) {
        e.target.value = '';
        appState.searchTerm = '';
      } else {
        appState.searchTerm = raw.toLowerCase();
      }
      renderPackages();
    });

    document.getElementById('packageCategoryFilter')?.addEventListener('change', (e) => {
      selectCategoryTab(e.target.value);
    });

    document.getElementById('packageSortFilter')?.addEventListener('change', (e) => {
      appState.selectedSort = e.target.value;
      renderPackages();
    });

    // Modals
    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAllModals();
      });
    });

    document.getElementById('packageForm')?.addEventListener('submit', handlePackageFormSubmit);
    document.getElementById('categoryForm')?.addEventListener('submit', handleCategoryFormSubmit);
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', handleConfirmDelete);

    // Auto calculate discount
    const pkgPrice = document.getElementById('pkgPrice');
    const pkgOrig = document.getElementById('pkgOrigPrice');
    const pkgDisc = document.getElementById('pkgDiscount');

    function autoCalcDiscount() {
      const p = parseFloat(pkgPrice.value) || 0;
      const o = parseFloat(pkgOrig.value) || 0;
      if (o > p && o > 0) {
        pkgDisc.value = Math.round(((o - p) / o) * 100);
      } else {
        pkgDisc.value = 0;
      }
      updatePackageModalPreview();
    }

    pkgPrice?.addEventListener('input', autoCalcDiscount);
    pkgOrig?.addEventListener('input', autoCalcDiscount);

    document.getElementById('pkgTitle')?.addEventListener('input', (e) => {
      if (appState.editingPackageId === null) {
        document.getElementById('pkgSlug').value = slugify(e.target.value);
      }
      updatePackageModalPreview();
    });

    document.getElementById('pkgImage')?.addEventListener('input', updatePackageModalPreview);
    document.getElementById('pkgBadge')?.addEventListener('change', updatePackageModalPreview);

    document.getElementById('addInclusionBtn')?.addEventListener('click', addInclusionItem);
    document.getElementById('addNotIncludedBtn')?.addEventListener('click', addNotIncludedItem);
    document.getElementById('newNotIncludedInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addNotIncludedItem();
      }
    });
    document.getElementById('newInclusionInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addInclusionItem();
      }
    });

    document.getElementById('addGalleryBtn')?.addEventListener('click', addGalleryItem);

    document.getElementById('catName')?.addEventListener('input', (e) => {
      if (appState.editingCategoryId === null) {
        document.getElementById('catSlug').value = slugify(e.target.value);
      }
    });

    document.getElementById('catImage')?.addEventListener('input', (e) => {
      const img = document.getElementById('catImagePreview');
      if (img) {
        img.src = e.target.value || '';
        img.style.display = e.target.value ? 'block' : 'none';
      }
    });

    // Subcategory Listeners
    document.getElementById('subcategoryForm')?.addEventListener('submit', handleSubcategoryFormSubmit);
    document.getElementById('catModalAddSubcatBtn')?.addEventListener('click', () => {
      openSubcategoryModal('add', appState.editingCategoryId);
    });
    document.getElementById('pkgCategory')?.addEventListener('change', (e) => {
      updatePackageSubcategoryOptions(e.target.value);
    });
    document.getElementById('subcatName')?.addEventListener('input', (e) => {
      if (appState.editingSubcategoryId === null) {
        document.getElementById('subcatSlug').value = slugify(e.target.value);
      }
    });

    // Backup & Settings
    document.getElementById('exportBackupBtn')?.addEventListener('click', exportDataBackup);
    document.getElementById('importFileBtn')?.addEventListener('click', () => {
      document.getElementById('importFileInput')?.click();
    });
    document.getElementById('resetDefaultsBtn')?.addEventListener('click', resetToFactoryDefaults);

    // Wedding Service Customizer Listeners
    document.getElementById('wseImage')?.addEventListener('input', (e) => {
      const img = document.getElementById('wseImgPreview');
      if (img) img.src = e.target.value;
    });
    document.getElementById('wseTitle')?.addEventListener('input', (e) => {
      if (appState.editingWeddingId === null) {
        document.getElementById('wseSlug').value = slugify(e.target.value);
      }
    });
    document.getElementById('wseAddOptionBtn')?.addEventListener('click', addWseOption);
    document.getElementById('weddingServiceForm')?.addEventListener('submit', handleWeddingServiceFormSubmit);

    // Blog Articles Listeners
    document.getElementById('blogSearchInput')?.addEventListener('input', renderBlogs);
    document.getElementById('blogTopicFilter')?.addEventListener('change', renderBlogs);
    document.getElementById('blogTitle')?.addEventListener('input', (e) => {
      const slugInput = document.getElementById('blogSlug');
      if (slugInput) slugInput.value = slugify(e.target.value);
    });
    document.getElementById('blogImage')?.addEventListener('input', (e) => {
      const img = document.getElementById('blogImgPreview');
      if (img) img.src = e.target.value;
    });
    document.getElementById('blogForm')?.addEventListener('submit', handleBlogFormSubmit);
  }

  function exportDataBackup() {
    const dataToExport = {
      brand: "Celebration Events",
      exportedAt: new Date().toISOString(),
      categories: appState.categories,
      products: appState.products
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `celebration_events_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Backup JSON downloaded successfully!', 'success');
  }

  function importDataBackup(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported.categories) && Array.isArray(imported.products)) {
          if (confirm(`Import ${imported.categories.length} categories and ${imported.products.length} packages? This will replace current data.`)) {
            appState.categories = imported.categories;
            appState.products = imported.products;
            commitData('Data imported successfully!');
          }
        } else {
          showToast('Invalid JSON backup file.', 'error');
        }
      } catch (err) {
        showToast('Error parsing JSON backup.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function resetToFactoryDefaults() {
    if (confirm('Are you sure you want to RESET all categories and packages back to original defaults?')) {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      
      if (typeof window.SITE_DATA !== 'undefined') {
        appState.categories = [...(window.SITE_DATA.categories || [])];
        appState.products = [...(window.SITE_DATA.products || [])];
      }
      
      commitData('Reset back to factory defaults!');
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
      modal.style.display = '';
    });
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     WEDDING SERVICE CUSTOMIZER & INSIDE OPTIONS BUILDER
     (Pure modular wedding services with full inside options matching wedding.html)
     ========================================================================== */

  function resetWseToWebsiteDefaults() {
    const serviceId = appState.editingWeddingId;
    if (!serviceId) {
      showToast('No wedding service selected', 'warning');
      return;
    }
    const defOpts = EXACT_WEDDING_OPTIONS[serviceId] || EXACT_WEDDING_OPTIONS[slugify(serviceId)];
    if (defOpts) {
      appState.weddingEditorOptions = JSON.parse(JSON.stringify(defOpts));
      renderWeddingEditorOptions();
      showToast('Options reset to live website defaults!', 'success');
    } else {
      showToast('No default options found for this service', 'info');
    }
  }

  function openWeddingServiceEditor(serviceId = null) {
    appState.editingWeddingId = serviceId;
    const modal = document.getElementById('weddingServiceCustomModal');
    if (!modal) return;

    const modalTitle = document.getElementById('wseModalTitle');
    const titleInput = document.getElementById('wseTitle');
    const slugInput = document.getElementById('wseSlug');
    const badgeInput = document.getElementById('wseBadge');
    const imageInput = document.getElementById('wseImage');
    const previewImg = document.getElementById('wseImgPreview');
    const taglineInput = document.getElementById('wseTagline');
    const liveLink = document.getElementById('wseLivePreviewLink');

    if (serviceId) {
      let service = appState.products.find(p => p.id === serviceId);
      if (!service && window.SITE_DATA?.weddingServices) {
        service = window.SITE_DATA.weddingServices.find(s => s.id === serviceId);
      }
      if (!service) {
        showToast('Wedding service not found', 'error');
        return;
      }

      if (modalTitle) modalTitle.textContent = `Edit Wedding Service: ${service.title}`;
      if (titleInput) titleInput.value = service.title || '';
      if (slugInput) {
        slugInput.value = service.id || '';
        slugInput.readOnly = true;
      }
      if (badgeInput) badgeInput.value = service.badge || 'TRADITIONAL';
      if (imageInput) imageInput.value = service.image || '';
      if (previewImg) previewImg.src = service.image || '';
      if (taglineInput) taglineInput.value = service.description || service.desc || service.longDesc || '';
      if (liveLink) liveLink.href = `../wedding.html#service-${encodeURIComponent(service.id)}`;

      // Load options: Prioritize EXACT_WEDDING_OPTIONS if service.options is empty, missing, or has old mismatched placeholder ids
      const exactPreset = EXACT_WEDDING_OPTIONS[service.id] || EXACT_WEDDING_OPTIONS[serviceId] || EXACT_WEDDING_OPTIONS[slugify(service.id)];
      const hasOldOutdatedOptions = !Array.isArray(service.options) || service.options.length === 0 || service.options.some(o => 
        o.id === 'melam_troupe' || 
        o.id === 'melam_instruments' || 
        o.title === 'Traditional Mangala Melam Troupe' || 
        o.title === 'Special Instrument Performances' || 
        o.title === 'Primary Service Option' ||
        o.id === 'fhd_vehicle' || 
        o.id === 'se_pyro' || 
        o.id === 'me_live'
      ) || (service.id === 'melam' && !service.options.some(o => o.title === 'Mangala Melam'));

      let opts = [];
      if (exactPreset && hasOldOutdatedOptions) {
        opts = JSON.parse(JSON.stringify(exactPreset));
        service.options = opts;
      } else if (Array.isArray(service.options) && service.options.length > 0) {
        opts = JSON.parse(JSON.stringify(service.options));
      } else if (exactPreset) {
        opts = JSON.parse(JSON.stringify(exactPreset));
      } else if (window.SITE_DATA?.weddingConfigs?.[service.id]) {
        opts = JSON.parse(JSON.stringify(window.SITE_DATA.weddingConfigs[service.id]));
      } else {
        opts = exactPreset ? JSON.parse(JSON.stringify(exactPreset)) : [];
      }
      opts.forEach(opt => {
        if (Array.isArray(opt.subItems)) {
          opt.subItems = opt.subItems.map(item => {
            if (typeof item === 'object' && item !== null) {
              return { name: item.name || '', image: item.image || '' };
            }
            return { name: String(item || ''), image: '' };
          });
        }
      });
      appState.weddingEditorOptions = opts;
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Wedding Service';
      if (titleInput) titleInput.value = '';
      if (slugInput) {
        slugInput.value = '';
        slugInput.readOnly = false;
      }
      if (badgeInput) badgeInput.value = '';
      if (imageInput) imageInput.value = '';
      if (previewImg) {
        previewImg.src = BLANK_PIXEL;
        previewImg.style.display = 'none';
      }
      if (taglineInput) taglineInput.value = '';
      if (liveLink) liveLink.href = '../wedding.html';

      appState.weddingEditorOptions = [];
    }

    renderWeddingEditorOptions();
    modal.classList.add('active');
  }

  function renderWeddingEditorOptions() {
    const container = document.getElementById('wseOptionsContainer');
    if (!container) return;

    if (!Array.isArray(appState.weddingEditorOptions) || appState.weddingEditorOptions.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:36px 20px; background:#f8fafc; border:2px dashed #cbd5e1; border-radius:14px; color:var(--text-muted);">
          <div style="font-size:28px; margin-bottom:8px;">📋</div>
          <p style="font-size:15px; font-weight:700; color:#1e293b; margin:0 0 6px 0;">No inside options yet</p>
          <p style="font-size:13px; color:#64748b; margin:0 0 16px 0;">Add Pendals, Lighting, Menu Items, Sweets, or any custom wedding checklist element.</p>
          <button type="button" class="btn-primary" onclick="window.adminStudio.addWseOption()" style="padding:8px 20px; font-size:13px; font-weight:700;">+ Add First Option</button>
        </div>
      `;
      return;
    }

    container.innerHTML = appState.weddingEditorOptions.map((opt, optIdx) => `
      <div class="wse-option-card" data-opt-idx="${optIdx}" style="background:#ffffff; border:1.5px solid #e2e8f0; border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 3px 10px rgba(0,0,0,0.03);">
        <div class="wse-opt-header" style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; padding-bottom:12px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="wse-opt-number" style="font-size:11.5px; font-weight:800; color:#be123c; background:#fff1f2; border:1px solid #fecdd3; padding:4px 12px; border-radius:99px; letter-spacing:0.5px;">OPTION ${optIdx + 1}</span>
            <span style="font-weight:700; font-size:14px; color:#1e293b;">${escapeHtml(opt.title || 'Untitled Option')}</span>
          </div>
          <button type="button" class="wse-delete-opt-btn" onclick="window.adminStudio.removeWseOption(${optIdx})" title="Delete this option" style="background:#fff1f2; border:1px solid #fecdd3; color:#e11d48; font-size:12px; font-weight:700; padding:6px 12px; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
            🗑️ Delete Option
          </button>
        </div>

        <div class="wse-opt-inputs-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
          <div>
            <label style="font-size:12px; font-weight:700; color:#334155; margin-bottom:6px; display:block;">Option Title *</label>
            <input type="text" class="wse-opt-input" value="${escapeHtml(opt.title || '')}" placeholder="e.g. Pendals In Front Of House" oninput="window.adminStudio.updateWseOptField(${optIdx}, 'title', this.value)" style="width:100%; box-sizing:border-box; padding:10px 14px; font-size:13.5px; color:#0f172a; background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:8px; outline:none;" required />
          </div>
          <div>
            <label style="font-size:12px; font-weight:700; color:#334155; margin-bottom:6px; display:block;">Prompt / Subtitle (Customer View)</label>
            <input type="text" class="wse-opt-input" value="${escapeHtml(opt.subPrompt || opt.subtitle || '')}" placeholder="e.g. Choose pendal type" oninput="window.adminStudio.updateWseOptField(${optIdx}, 'subPrompt', this.value)" style="width:100%; box-sizing:border-box; padding:10px 14px; font-size:13.5px; color:#0f172a; background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:8px; outline:none;" />
          </div>
        </div>

        <!-- Option Image Upload Section (Tap to Preview on Website) -->
        <div class="wse-opt-image-box" style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; padding:12px 14px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="font-size:12px; font-weight:700; color:#334155; display:flex; align-items:center; gap:6px; margin:0;">
              <span>🖼️ Option Preview Photo</span>
              <span style="font-weight:400; color:#64748b; font-size:11.5px;">(Displayed on left viewer when customer taps this option)</span>
            </label>
            <label class="btn-secondary" style="font-size:11.5px; padding:4px 12px; cursor:pointer; background:#f0f9ff; border:1px solid #bae6fd; color:#0284c7; border-radius:6px; display:inline-flex; align-items:center; gap:5px; font-weight:700;">
              <span id="wseOptUploadLabel_${optIdx}">☁️ Upload Photo</span>
              <input type="file" accept="image/*" style="display:none;" onchange="window.adminStudio.handleWseOptImageUpload(${optIdx}, this)" />
            </label>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <input type="url" class="wse-opt-input" value="${escapeHtml(opt.image || '')}" placeholder="Paste image URL (https://...) or click Upload Photo" oninput="window.adminStudio.updateWseOptField(${optIdx}, 'image', this.value)" style="flex:1; padding:9px 12px; font-size:13px; color:#0f172a; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; outline:none;" />
            ${opt.image ? `
              <div style="width:42px; height:42px; border-radius:8px; overflow:hidden; border:1.5px solid #cbd5e1; flex-shrink:0; background:#0f172a; display:flex; align-items:center; justify-content:center;">
                <img src="${escapeHtml(opt.image)}" alt="Preview" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'" />
              </div>
              <button type="button" onclick="window.adminStudio.updateWseOptField(${optIdx}, 'image', ''); window.adminStudio.renderWeddingEditorOptions();" title="Remove photo" style="background:#fee2e2; border:1px solid #fecdd3; color:#e11d48; border-radius:6px; padding:6px 10px; font-size:12px; font-weight:700; cursor:pointer;">✕</button>
            ` : ''}
          </div>
          <div id="wseOptUploadProgress_${optIdx}" style="display:none; font-size:11.5px; color:#0284c7; font-weight:700; margin-top:6px;">
            ⏳ Uploading photo to Cloudinary...
          </div>
        </div>

        <div class="wse-choices-box" style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12.5px; font-weight:700; color:#1e293b;">Selectable Choices / Menu Items</span>
              <span style="background:#e2e8f0; color:#334155; font-size:11px; font-weight:800; padding:2px 10px; border-radius:99px; white-space:nowrap;">${(opt.subItems || []).length} Choices</span>
            </div>
            <span style="font-size:11.5px; color:#64748b;">(e.g. 2 pin, 4 pin, 8 pin, Live Counter, etc.)</span>
          </div>

          <div class="wse-subitems-wrap" style="display:flex; flex-direction:column; gap:8px; margin:8px 0;">
            ${(opt.subItems && opt.subItems.length > 0) ? opt.subItems.map((subItem, subIdx) => {
              const subName = (typeof subItem === 'object' && subItem !== null) ? (subItem.name || '') : String(subItem || '');
              return `
              <div class="wse-subitem-row" style="display:flex; align-items:center; gap:10px; background:#ffffff; border:1.5px solid #cbd5e1; border-radius:10px; padding:8px 12px; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
                <span style="font-size:11.5px; font-weight:800; color:#64748b; background:#f1f5f9; padding:5px 9px; border-radius:6px; white-space:nowrap; flex-shrink:0;">#${subIdx + 1}</span>
                <input type="text" value="${escapeHtml(subName)}" placeholder="Choice name (e.g. 2 pin, 4 pin, 8 pin)" oninput="window.adminStudio.updateWseSubItemName(${optIdx}, ${subIdx}, this.value)" style="flex:1; padding:8px 12px; font-size:13.5px; font-weight:600; color:#0f172a; border:1.5px solid #cbd5e1; border-radius:8px; background:#f8fafc; outline:none;" />
                <button type="button" onclick="window.adminStudio.removeWseSubItem(${optIdx}, ${subIdx})" title="Delete this choice" style="background:#fff1f2; border:1px solid #fecdd3; color:#ef4444; font-size:14px; font-weight:800; cursor:pointer; padding:7px 12px; border-radius:8px; flex-shrink:0;">✕</button>
              </div>
              `;
            }).join('') : '<div style="font-size:12px; color:#94a3b8; font-style:italic; padding:6px 0;">No choices added yet. Type below to add choices.</div>'}
          </div>

          <div class="wse-add-subitem-row" style="display:flex; gap:10px; margin-top:10px; align-items:center;">
            <input type="text" id="wseNewSub_${optIdx}" class="wse-new-subitem-input" placeholder="Type new choice (e.g. 2 pin, 4 pin, 8 pin) and click Add..." onkeydown="if(event.key==='Enter'){event.preventDefault();window.adminStudio.addWseSubItem(${optIdx});}" style="flex:1; padding:9px 14px; font-size:13px; border:1.5px dashed #cbd5e1; border-radius:8px; background:#ffffff; box-sizing:border-box; outline:none;" />
            <button type="button" class="wse-add-subitem-btn" onclick="window.adminStudio.addWseSubItem(${optIdx})" style="padding:9px 18px; font-size:12.5px; font-weight:700; border-radius:8px; background:#15803d; color:#ffffff; border:none; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px;">
              ➕ Add Choice
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function updateWseSubItemName(optIdx, subIdx, val) {
    const opt = appState.weddingEditorOptions?.[optIdx];
    if (opt && Array.isArray(opt.subItems) && opt.subItems[subIdx] !== undefined) {
      if (typeof opt.subItems[subIdx] === 'object' && opt.subItems[subIdx] !== null) {
        opt.subItems[subIdx].name = (val || '').trim();
      } else {
        opt.subItems[subIdx] = (val || '').trim();
      }
    }
  }

  function addWseOption() {
    if (!Array.isArray(appState.weddingEditorOptions)) {
      appState.weddingEditorOptions = [];
    }
    appState.weddingEditorOptions.push({
      id: `opt_${Date.now().toString(36)}`,
      title: '',
      subPrompt: '',
      image: '',
      subItems: []
    });
    renderWeddingEditorOptions();
  }

  function removeWseOption(optIdx) {
    if (!Array.isArray(appState.weddingEditorOptions)) return;
    appState.weddingEditorOptions.splice(optIdx, 1);
    renderWeddingEditorOptions();
  }

  function updateWseOptField(optIdx, field, val) {
    if (appState.weddingEditorOptions && appState.weddingEditorOptions[optIdx]) {
      appState.weddingEditorOptions[optIdx][field] = val;
    }
  }

  function addWseSubItem(optIdx) {
    const input = document.getElementById(`wseNewSub_${optIdx}`);
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const opt = appState.weddingEditorOptions?.[optIdx];
    if (!opt) return;

    if (!Array.isArray(opt.subItems)) {
      opt.subItems = [];
    }
    opt.subItems.push({ name: val, image: '' });
    input.value = '';
    renderWeddingEditorOptions();
  }

  function removeWseSubItem(optIdx, subIdx) {
    const opt = appState.weddingEditorOptions?.[optIdx];
    if (!opt || !Array.isArray(opt.subItems)) return;
    opt.subItems.splice(subIdx, 1);
    renderWeddingEditorOptions();
  }

  async function handleWseOptImageUpload(optIdx, fileInput) {
    const file = fileInput.files?.[0];
    if (!file) return;

    const progressEl = document.getElementById(`wseOptUploadProgress_${optIdx}`);
    const labelEl = document.getElementById(`wseOptUploadLabel_${optIdx}`);
    if (progressEl) progressEl.style.display = 'block';
    if (labelEl) labelEl.textContent = 'Uploading...';

    try {
      showToast('Uploading option photo to Cloudinary...', 'info');
      const url = await uploadToCloudinary(file, 'celebration-wedding-options');
      if (appState.weddingEditorOptions && appState.weddingEditorOptions[optIdx]) {
        appState.weddingEditorOptions[optIdx].image = url;
        renderWeddingEditorOptions();
        showToast('Option photo uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast('Cloudinary upload error: ' + err.message, 'error');
    } finally {
      if (progressEl) progressEl.style.display = 'none';
      if (labelEl) labelEl.textContent = '☁️ Upload Photo';
      fileInput.value = '';
    }
  }

  async function handleWeddingServiceFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('wseTitle').value.trim();
    const slug = slugify(document.getElementById('wseSlug').value.trim());
    const badge = document.getElementById('wseBadge').value.trim();
    const image = document.getElementById('wseImage').value.trim();
    const tagline = document.getElementById('wseTagline').value.trim();

    if (!title || !slug) {
      showToast('Please provide both Title and Slug for the wedding service.', 'error');
      return;
    }

    const cleanOptions = JSON.parse(JSON.stringify(appState.weddingEditorOptions || []));
    const inclusions = cleanOptions.map(o => o.title).filter(Boolean);

    let existingPkg = appState.products.find(p => p.id === slug || p.id === appState.editingWeddingId);
    if (existingPkg) {
      existingPkg.title = title;
      existingPkg.badge = badge;
      existingPkg.image = image;
      existingPkg.description = tagline;
      existingPkg.options = cleanOptions;
      existingPkg.inclusions = inclusions;
      existingPkg.category = 'wedding';
      existingPkg.categoryName = 'Wedding';
    } else {
      const newService = {
        id: slug,
        title,
        category: 'wedding',
        categoryName: 'Wedding',
        badge: badge || 'TRADITIONAL',
        image,
        gallery: [image],
        description: tagline,
        options: cleanOptions,
        inclusions: inclusions.length > 0 ? inclusions : ['Custom Decor', 'Authentic Traditional Setup'],
        tags: ['Wedding', 'Custom Decor']
      };
      appState.products.push(newService);
    }

    // Keep SITE_DATA.weddingConfigs and SITE_DATA.weddingServices synchronized
    if (typeof window.SITE_DATA !== 'undefined') {
      if (!window.SITE_DATA.weddingConfigs) window.SITE_DATA.weddingConfigs = {};
      window.SITE_DATA.weddingConfigs[slug] = cleanOptions;

      if (Array.isArray(window.SITE_DATA.weddingServices)) {
        let ws = window.SITE_DATA.weddingServices.find(s => s.id === slug || s.id === appState.editingWeddingId);
        if (ws) {
          ws.title = title;
          ws.badge = badge;
          ws.image = image;
          ws.desc = tagline;
          ws.options = cleanOptions;
        } else {
          window.SITE_DATA.weddingServices.push({
            id: slug,
            title,
            badge: badge || 'TRADITIONAL',
            image,
            desc: tagline,
            options: cleanOptions
          });
        }
      }
    }

    localStorage.setItem(STORAGE_KEYS.WEDDING_CONFIGS, JSON.stringify(window.SITE_DATA?.weddingConfigs || {}));
    if (window.SITE_DATA?.weddingServices) {
      localStorage.setItem(STORAGE_KEYS.WEDDING_SERVICES, JSON.stringify(window.SITE_DATA.weddingServices));
    }

    // Direct Supabase Cloud Sync
    if (supabase) {
      const prodRecord = {
        id: slug,
        title,
        category: 'wedding',
        category_name: 'Wedding',
        subcategory: '',
        price: Number(existingPkg?.price) || 0,
        original_price: Number(existingPkg?.originalPrice) || 0,
        discount: 0,
        rating: 4.9,
        reviews_count: 100,
        badge: badge || 'TRADITIONAL',
        setup_duration: 'Custom Schedule',
        slots_alert: '',
        image,
        gallery: [image],
        description: tagline,
        about_description: tagline,
        inclusions: inclusions,
        not_included: [],
        faqs: [],
        addons: [],
        tags: ['Wedding', 'Custom Decor'],
        options: cleanOptions
      };

      supabase.from('products').upsert(prodRecord).then(({ error }) => {
        if (!error) console.log('Wedding service synced to Supabase products table:', slug);
        else console.warn('Supabase product sync warning:', error);
      });

      supabase.from('categories').upsert({
        id: '__site_wedding_services__',
        name: 'Global Wedding Services List',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
        desc: JSON.stringify(window.SITE_DATA?.weddingServices || [])
      }).then(({ error }) => {
        if (!error) console.log('Wedding services synced to Supabase Cloud');
      });

      supabase.from('categories').upsert({
        id: '__site_wedding_configs__',
        name: 'Global Wedding Configs & Options',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
        desc: JSON.stringify(window.SITE_DATA?.weddingConfigs || {})
      }).then(({ error }) => {
        if (!error) console.log('Wedding configs synced to Supabase Cloud');
      });
    }

    await commitData(`Wedding service "${title}" saved & synced to Supabase!`);
    closeAllModals();
  }

  /* ==========================================================================
     BLOG ARTICLES MANAGEMENT (FULL CRUD & SEARCH/FILTER)
     ========================================================================== */
  function renderBlogs() {
    const grid = document.getElementById('blogsGrid');
    const countEl = document.getElementById('blogsTabCountText');
    const badgeEl = document.getElementById('sidebarBlogsBadge');

    if (badgeEl) badgeEl.textContent = appState.blogs.length;
    if (countEl) countEl.textContent = `• ${appState.blogs.length} Articles Published`;

    if (!grid) return;
    renderBlogFeaturesAdmin();

    let items = [...appState.blogs];

    // Filter by Search
    const searchVal = (document.getElementById('blogSearchInput')?.value || '').toLowerCase().trim();
    if (searchVal) {
      items = items.filter(b => {
        const t = (b.title || '').toLowerCase();
        const a = (b.author || '').toLowerCase();
        const tag = (b.tag || '').toLowerCase();
        const ex = (b.excerpt || '').toLowerCase();
        const c = (b.category || '').toLowerCase();
        return t.includes(searchVal) || a.includes(searchVal) || tag.includes(searchVal) || ex.includes(searchVal) || c.includes(searchVal);
      });
    }

    // Filter by Topic
    const topicVal = document.getElementById('blogTopicFilter')?.value || 'all';
    if (topicVal !== 'all') {
      items = items.filter(b => b.category === topicVal);
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📝</div>
          <h3>No Blog Articles Found</h3>
          <p>No articles match your current search query or topic filter.</p>
          <button type="button" class="btn-add-primary" onclick="window.adminStudio.openBlogModal('add')">
            + Add New Article
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(b => `
      <div class="blog-admin-card" data-blog-id="${b.id}">
        <div class="blog-card-media">
          <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.title)}" onerror="this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'" loading="lazy" />
          <span class="blog-media-badge">${escapeHtml(b.tag || 'EDITORIAL')}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-top-row">
            <span class="blog-card-topic-tag">${escapeHtml(b.categoryName || b.category)}</span>
            <span class="blog-card-id-tag">ID: ${escapeHtml(b.id)}</span>
          </div>
          <h3 class="blog-card-heading" title="${escapeHtml(b.title)}">${escapeHtml(b.title)}</h3>
          <p class="blog-card-summary">${escapeHtml(b.excerpt || '')}</p>
          <div class="blog-card-meta-line">
            <span>✍️ <strong>${escapeHtml(b.author || 'Celebration Team')}</strong></span>
            <span>📅 ${escapeHtml(b.date || 'Recent')}</span>
          </div>
          <div class="card-actions-row">
            <button type="button" class="btn-card-action btn-card-edit" onclick="window.adminStudio.openBlogModal('edit', '${b.id}')">
              ✏️ Edit Article
            </button>
            <a href="../blog-detail.html?id=${encodeURIComponent(b.id)}" target="_blank" class="btn-card-action btn-card-view" title="Read live on website">
              👁️ View
            </a>
            <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('blog', '${b.id}', '${escapeHtml(b.title)}')" title="Delete article">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function htmlToCleanText(html) {
    if (!html) return '';
    let text = html;

    // Convert headings to clean headings with linebreaks
    text = text.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, (m, c) => `\n\n${c.trim()}\n`);

    // Convert callouts / tips
    text = text.replace(/<div class="blog-modal-callout"[^>]*>(.*?)<\/div>/gi, (m, c) => `\n\n${c.trim()}\n`);

    // Convert list items to bullet points
    text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, (m, c) => `\n• ${c.trim()}`);

    // Convert paragraphs to clean double line breaks
    text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, (m, c) => `\n\n${c.trim()}\n`);

    // Convert line breaks
    text = text.replace(/<br\s*\/?>/gi, '\n');

    // Strip any remaining HTML tags (like <strong>, <em>, <span>, <div>, etc.)
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    text = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');

    // Normalize spacing: at most 2 consecutive newlines, trimmed
    text = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

    return text;
  }

  function cleanTextToHtml(rawText) {
    if (!rawText) return '';
    // If the content already has standard HTML tags, return as is
    if (/<(h[1-6]|p|div|ul|ol|li)\b[^>]*>/i.test(rawText)) {
      return rawText;
    }

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const htmlBlocks = [];
    let inList = false;
    let listItems = [];

    function flushList() {
      if (inList && listItems.length > 0) {
        htmlBlocks.push(`<ul>\n${listItems.map(li => `  <li>${li}</li>`).join('\n')}\n</ul>`);
        listItems = [];
        inList = false;
      }
    }

    for (const line of lines) {
      // Bullet items: starts with • or - or *
      if (/^[•\-\*]\s+/.test(line)) {
        inList = true;
        listItems.push(escapeHtml(line.replace(/^[•\-\*]\s+/, '')));
        continue;
      }

      flushList();

      // Pro tips / Note callout
      if (/^(Pro Decorator Tip|Tip|Note):/i.test(line)) {
        const parts = line.split(':');
        const prefix = parts[0];
        const body = parts.slice(1).join(':').trim();
        htmlBlocks.push(`<div class="blog-modal-callout"><strong>${escapeHtml(prefix)}:</strong> ${escapeHtml(body)}</div>`);
        continue;
      }

      // Headings: e.g. "1. Trends", "Step 1:", "# Heading", or short lines without trailing punctuation
      if (/^(\d+[\.\)]\s+|Step\s+\d+:|#+\s+)/i.test(line) || (line.length <= 60 && !line.endsWith('.') && !line.endsWith(','))) {
        const cleanHeading = line.replace(/^#+\s*/, '');
        htmlBlocks.push(`<h3>${escapeHtml(cleanHeading)}</h3>`);
        continue;
      }

      // Standard paragraph
      htmlBlocks.push(`<p>${escapeHtml(line)}</p>`);
    }

    flushList();
    return htmlBlocks.join('\n\n');
  }

  function insertBlogTemplate(type) {
    const textarea = document.getElementById('blogContent');
    if (!textarea) return;
    let snippet = '';
    if (type === 'heading') {
      snippet = '\n\n4. Your Section Heading Here\n';
    } else if (type === 'bullet') {
      snippet = '\n• New highlight or tip point';
    } else if (type === 'tip') {
      snippet = '\n\nPro Decorator Tip: Add helpful recommendation for your clients here.\n';
    }
    textarea.value += snippet;
    textarea.focus();
  }

  function cleanAllBlogHtmlTags() {
    const textarea = document.getElementById('blogContent');
    if (!textarea) return;
    textarea.value = htmlToCleanText(textarea.value);
    showToast('Cleaned all HTML tags and arrows!', 'success');
  }

  function openBlogModal(mode, blogId = null) {
    appState.editingBlogId = (mode === 'edit') ? blogId : null;
    const modal = document.getElementById('blogModal');
    if (!modal) return;

    const modalTitle = document.getElementById('blogModalTitle');
    const titleInput = document.getElementById('blogTitle');
    const slugInput = document.getElementById('blogSlug');
    const catSelect = document.getElementById('blogCategory');
    const tagInput = document.getElementById('blogTag');
    const authorInput = document.getElementById('blogAuthor');
    const dateInput = document.getElementById('blogDate');
    const imageInput = document.getElementById('blogImage');
    const previewImg = document.getElementById('blogImgPreview');
    const excerptInput = document.getElementById('blogExcerpt');
    const contentInput = document.getElementById('blogContent');
    const submitBtn = document.getElementById('saveBlogBtn');

    if (mode === 'edit' && blogId) {
      const blog = appState.blogs.find(b => b.id === blogId);
      if (!blog) {
        showToast('Blog article not found', 'error');
        return;
      }

      if (modalTitle) modalTitle.textContent = `Edit Blog Article: ${blog.title}`;
      if (submitBtn) submitBtn.textContent = 'Update Article';
      if (titleInput) titleInput.value = blog.title || '';
      if (slugInput) {
        slugInput.value = blog.id || '';
        slugInput.readOnly = false; // Always editable and synced with title
      }
      if (catSelect) catSelect.value = blog.category || 'balloon-tips';
      if (tagInput) tagInput.value = blog.tag || 'Decor Hacks';
      if (authorInput) authorInput.value = blog.author || 'Celebration Events Team';
      if (dateInput) dateInput.value = blog.date || '';
      if (imageInput) imageInput.value = blog.image || '';
      if (previewImg) {
        if (blog.image) {
          previewImg.src = blog.image;
          previewImg.style.display = 'block';
        } else {
          previewImg.src = BLANK_PIXEL;
          previewImg.style.display = 'none';
        }
      }
      if (excerptInput) excerptInput.value = blog.excerpt || '';
      if (contentInput) contentInput.value = htmlToCleanText(blog.content || '');
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Blog Article';
      if (submitBtn) submitBtn.textContent = 'Publish Article';
      document.getElementById('blogForm')?.reset();
      if (slugInput) {
        slugInput.value = '';
        slugInput.readOnly = false;
      }
      if (titleInput) titleInput.value = '';
      if (tagInput) tagInput.value = '';
      if (authorInput) authorInput.value = '';
      
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
      if (dateInput) dateInput.value = dateFormatted;

      if (imageInput) imageInput.value = '';
      if (previewImg) {
        previewImg.src = BLANK_PIXEL;
        previewImg.style.display = 'none';
      }
      if (excerptInput) excerptInput.value = '';
      if (contentInput) contentInput.value = '';
    }

    modal.classList.add('active');
  }

  async function handleBlogFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value.trim();
    const slug = slugify(document.getElementById('blogSlug').value.trim());
    const category = document.getElementById('blogCategory').value;
    const tag = document.getElementById('blogTag').value.trim();
    const author = document.getElementById('blogAuthor').value.trim();
    const date = document.getElementById('blogDate').value.trim();
    const image = document.getElementById('blogImage').value.trim();
    const excerpt = document.getElementById('blogExcerpt').value.trim();
    const rawContent = document.getElementById('blogContent').value.trim();
    const content = cleanTextToHtml(rawContent);

    if (!title || !slug) {
      showToast('Please provide both Article Title and Slug.', 'error');
      return;
    }

    const topicMap = {
      'balloon-tips': 'Balloon Tips & Hacks',
      'birthday-ideas': 'Birthday Ideas',
      'anniversary-romance': 'Anniversary & Romance',
      'baby-shower': 'Baby Shower & Welcome',
      'wedding-guides': 'Wedding Guides',
      'cost-planning': 'Cost & Planning'
    };
    const categoryName = topicMap[category] || 'Event Guide';

    const blogData = {
      id: slug,
      title,
      category,
      categoryName,
      tag: tag || 'Decor Guide',
      author: author || 'Celebration Events Team',
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      image,
      excerpt,
      content,
      featured: false
    };

    if (appState.editingBlogId) {
      const idx = appState.blogs.findIndex(b => b.id === appState.editingBlogId);
      if (idx !== -1) {
        // If slug changed, ensure no other blog is using the same slug
        if (slug !== appState.editingBlogId && appState.blogs.some((b, i) => i !== idx && b.id === slug)) {
          showToast(`Article slug "${slug}" already exists on another article.`, 'error');
          return;
        }
        appState.blogs[idx] = blogData;
        await commitBlogs(`Article "${title}" updated successfully!`);
      }
    } else {
      if (appState.blogs.some(b => b.id === slug)) {
        showToast(`Article slug "${slug}" already exists.`, 'error');
        return;
      }
      appState.blogs.unshift(blogData);
      await commitBlogs(`New article "${title}" published successfully!`);
    }

    closeAllModals();
  }

  async function commitBlogs(message = 'Blog articles updated!') {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(appState.blogs));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.blogs = appState.blogs;
    }

    // Direct Supabase Cloud Sync
    if (supabase) {
      try {
        await supabase.from('categories').upsert({
          id: '__site_blogs__',
          name: 'Site Blog Articles',
          desc: JSON.stringify(appState.blogs),
          image: '',
          badge: ''
        }, { onConflict: 'id' });
      } catch(e) {
        console.warn('Supabase blogs sync error:', e);
      }
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        blogFeatures: appState.blogFeatures,
        reviews: appState.reviews,
        cities: appState.cities,
        announcement: appState.announcement,
        banners: appState.banners,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderBlogs();
    updateMetrics();
    if (message) showToast(message, 'success');
  }

  // --- Blog Value / Trust Badges Management ---
  function renderBlogFeaturesAdmin() {
    const container = document.getElementById('blogFeaturesPreviewBadges');
    if (!container) return;

    const features = (Array.isArray(appState.blogFeatures) && appState.blogFeatures.length > 0)
      ? appState.blogFeatures
      : DEFAULT_BLOG_FEATURES;

    container.innerHTML = features.map((f, idx) => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; min-width:180px; display:flex; align-items:center; gap:10px;">
        <span style="font-size:22px;">${escapeHtml(f.icon || '🛡️')}</span>
        <div>
          <strong style="display:block; font-size:13px; color:#1e293b;">${escapeHtml(f.title || `Badge ${idx + 1}`)}</strong>
          <span style="display:block; font-size:11.5px; color:#64748b;">${escapeHtml(f.desc || '')}</span>
        </div>
      </div>
    `).join('');
  }

  function openBlogFeaturesModal() {
    const modal = document.getElementById('blogFeaturesModal');
    if (!modal) return;

    const features = (Array.isArray(appState.blogFeatures) && appState.blogFeatures.length >= 3)
      ? appState.blogFeatures
      : DEFAULT_BLOG_FEATURES;

    for (let i = 1; i <= 3; i++) {
      const item = features[i - 1] || DEFAULT_BLOG_FEATURES[i - 1] || { icon: '🛡️', title: '', desc: '' };
      const iconInput = document.getElementById(`bfIcon${i}`);
      const titleInput = document.getElementById(`bfTitle${i}`);
      const descInput = document.getElementById(`bfDesc${i}`);

      if (iconInput) iconInput.value = item.icon || '';
      if (titleInput) titleInput.value = item.title || '';
      if (descInput) descInput.value = item.desc || '';
    }

    modal.classList.add('active');
  }

  async function saveBlogFeatures(event) {
    if (event && event.preventDefault) event.preventDefault();

    const newFeatures = [];
    for (let i = 1; i <= 3; i++) {
      const icon = (document.getElementById(`bfIcon${i}`)?.value || '').trim() || '🛡️';
      const title = (document.getElementById(`bfTitle${i}`)?.value || '').trim();
      const desc = (document.getElementById(`bfDesc${i}`)?.value || '').trim();

      if (!title || !desc) {
        showToast(`Please fill title and description for Badge ${i}.`, 'error');
        return;
      }

      newFeatures.push({ icon, title, desc });
    }

    appState.blogFeatures = newFeatures;
    await commitBlogFeatures('🎉 Blog value & trust badges updated and synced live!');
    const modal = document.getElementById('blogFeaturesModal');
    if (modal) modal.classList.remove('active');
  }

  async function commitBlogFeatures(message = 'Blog badges updated!') {
    localStorage.setItem(STORAGE_KEYS.BLOG_FEATURES, JSON.stringify(appState.blogFeatures));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.blogFeatures = appState.blogFeatures;
    }

    // Direct Supabase Cloud Sync
    if (supabase) {
      try {
        await supabase.from('categories').upsert({
          id: '__site_blog_features__',
          name: 'Site Blog Trust Badges',
          desc: JSON.stringify(appState.blogFeatures),
          image: '',
          badge: ''
        }, { onConflict: 'id' });
      } catch(e) {
        console.warn('Supabase blog features sync error:', e);
      }
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        blogFeatures: appState.blogFeatures,
        reviews: appState.reviews,
        cities: appState.cities,
        announcement: appState.announcement,
        banners: appState.banners,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderBlogFeaturesAdmin();
    if (message) showToast(message, 'success');
  }

  /* ==========================================================================
     REAL PHOTOS & VIDEO REVIEWS MANAGEMENT SYSTEM
     ========================================================================== */
  function renderReviewsList() {
    const grid = document.getElementById('reviewsGridAdmin');
    const countEl = document.getElementById('reviewsTabCountText');
    const badgeEl = document.getElementById('sidebarReviewsBadge');

    if (badgeEl) badgeEl.textContent = appState.reviews.length;
    if (countEl) countEl.textContent = `• ${appState.reviews.length} Reviews Live`;
    if (!grid) return;

    const searchInput = document.getElementById('reviewSearchInput');
    const typeFilter = document.getElementById('reviewTypeFilter');
    const ratingFilter = document.getElementById('reviewRatingFilter');

    const searchVal = (searchInput?.value || '').trim().toLowerCase();
    const typeVal = typeFilter?.value || 'all';
    const ratingVal = ratingFilter?.value || 'all';

    let filtered = appState.reviews || [];

    if (searchVal) {
      filtered = filtered.filter(r =>
        (r.name && r.name.toLowerCase().includes(searchVal)) ||
        (r.city && r.city.toLowerCase().includes(searchVal)) ||
        (r.service && r.service.toLowerCase().includes(searchVal)) ||
        (r.text && r.text.toLowerCase().includes(searchVal))
      );
    }

    if (typeVal !== 'all') {
      filtered = filtered.filter(r => r.type === typeVal);
    }

    if (ratingVal !== 'all') {
      const minRating = parseFloat(ratingVal);
      filtered = filtered.filter(r => (Number(r.rating) || 5) >= minRating);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border: 2px dashed #e2e8f0; border-radius: 16px;">
          <div style="font-size: 40px; margin-bottom: 12px;">⭐</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">No Reviews Found</h3>
          <p style="font-size: 13.5px; color: #64748b; max-width: 420px; margin: 0 auto 18px;">
            ${searchVal ? 'No customer reviews match your search filter.' : 'You have not added any customer photo or video reviews yet.'}
          </p>
          <button type="button" class="btn-add-primary" onclick="window.adminStudio.openReviewModal('add')">
            + Add New Customer Review / Reel
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(r => {
      const isVideo = r.type === 'video';
      const rating = Number(r.rating) || 5;
      const fullStars = Math.min(5, Math.max(1, Math.floor(rating)));
      const starsStr = '★'.repeat(fullStars) + '☆'.repeat(Math.max(0, 5 - fullStars));
      const avatarInitial = (r.name || 'C').charAt(0).toUpperCase();

      return `
        <div class="review-admin-card" data-review-id="${escapeHtml(r.id)}">
          <div class="review-card-media">
            ${isVideo ? `
              <video src="${escapeHtml(r.media)}" poster="${escapeHtml(r.poster || '')}" muted loop playsinline></video>
              <div class="review-media-badge" style="background: rgba(225, 29, 72, 0.9);">
                <span>🎥 REEL</span>
              </div>
            ` : `
              <img src="${escapeHtml(r.media)}" alt="${escapeHtml(r.name)}" onerror="this.src='https://cdn.balloondekor.com/images/61/7ebf2dbd-60dd-4643-8029-763dc6a3e5e3.webp'" />
              <div class="review-media-badge" style="background: rgba(15, 23, 42, 0.85);">
                <span>📸 PHOTO</span>
              </div>
            `}
            <div class="review-service-pill">
              ${escapeHtml(r.service || 'Celebration Service')}
            </div>
          </div>

          <div class="review-card-content">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div style="color: #f59e0b; font-size: 13px; font-weight: 700; letter-spacing: 1px;">
                ${starsStr} <span style="font-size: 12px; color: #475569; margin-left: 4px;">${rating.toFixed(1)}</span>
              </div>
              <span style="font-size: 11px; font-family: monospace; color: #94a3b8;">${escapeHtml(r.id)}</span>
            </div>

            <div class="review-card-quote">
              "${escapeHtml(r.text || '')}"
            </div>

            <div class="review-card-author-row">
              <div class="review-author-info">
                <div class="review-author-avatar">${avatarInitial}</div>
                <div>
                  <div class="review-author-name">
                    ${escapeHtml(r.name)} ${r.verified !== false ? '<span style="color:#16a34a; font-size:11px;">✓</span>' : ''}
                  </div>
                  <div class="review-author-city">
                    📍 ${escapeHtml(r.city || 'India')} • ${escapeHtml(r.date || 'Recent')}
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn-card-action btn-card-edit" onclick="window.adminStudio.openReviewModal('edit', '${escapeHtml(r.id)}')" title="Edit Review">
                  ✏️
                </button>
                <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.deleteReview('${escapeHtml(r.id)}')" title="Delete Review">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function setupReviewsListeners() {
    const searchInput = document.getElementById('reviewSearchInput');
    const typeFilter = document.getElementById('reviewTypeFilter');
    const ratingFilter = document.getElementById('reviewRatingFilter');

    searchInput?.addEventListener('input', renderReviewsList);
    typeFilter?.addEventListener('change', renderReviewsList);
    ratingFilter?.addEventListener('change', renderReviewsList);
  }

  function openReviewModal(mode, reviewId = null) {
    appState.editingReviewId = (mode === 'edit') ? reviewId : null;
    const modal = document.getElementById('reviewModal');
    if (!modal) return;

    const modalTitle = document.getElementById('reviewModalTitle');
    const nameInput = document.getElementById('reviewName');
    const cityInput = document.getElementById('reviewCity');
    const serviceInput = document.getElementById('reviewService');
    const typeSelect = document.getElementById('reviewType');
    const ratingSelect = document.getElementById('reviewRating');
    const dateInput = document.getElementById('reviewDate');
    const verifiedCheck = document.getElementById('reviewVerified');
    const mediaInput = document.getElementById('reviewMedia');
    const posterInput = document.getElementById('reviewPoster');
    const textInput = document.getElementById('reviewText');
    const submitBtn = document.getElementById('saveReviewBtn');

    if (mode === 'edit' && reviewId) {
      const rev = appState.reviews.find(r => r.id === reviewId);
      if (!rev) {
        showToast('Review not found', 'error');
        return;
      }

      if (modalTitle) modalTitle.textContent = `Edit Review: ${rev.name}`;
      if (submitBtn) submitBtn.textContent = 'Update Review';
      if (nameInput) nameInput.value = rev.name || '';
      if (cityInput) cityInput.value = rev.city || '';
      if (serviceInput) serviceInput.value = rev.service || '';
      if (typeSelect) typeSelect.value = rev.type || 'image';
      if (ratingSelect) ratingSelect.value = String(rev.rating || 5);
      if (dateInput) dateInput.value = rev.date || '';
      if (verifiedCheck) verifiedCheck.checked = rev.verified !== false;
      if (mediaInput) mediaInput.value = rev.media || '';
      if (posterInput) posterInput.value = rev.poster || '';
      if (textInput) textInput.value = rev.text || '';

      toggleReviewTypeFields(rev.type || 'image');
      updateReviewPreview();
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Customer Review / Reel';
      if (submitBtn) submitBtn.textContent = 'Save Review';
      document.getElementById('reviewForm')?.reset();
      if (nameInput) nameInput.value = '';
      if (cityInput) cityInput.value = '';
      if (serviceInput) serviceInput.value = '';
      if (typeSelect) typeSelect.value = 'image';
      if (ratingSelect) ratingSelect.value = '5';
      if (dateInput) dateInput.value = '';
      if (verifiedCheck) verifiedCheck.checked = true;
      if (mediaInput) mediaInput.value = '';
      if (posterInput) posterInput.value = '';
      if (textInput) textInput.value = '';

      toggleReviewTypeFields('image');
      updateReviewPreview();
    }

    modal.classList.add('active');
  }

  function toggleReviewTypeFields(type) {
    const posterField = document.getElementById('reviewPosterField');
    const mediaLabel = document.getElementById('reviewMediaLabel');
    const uploadLabel = document.getElementById('reviewUploadLabel');
    const mediaInput = document.getElementById('reviewMedia');

    if (type === 'video') {
      if (posterField) posterField.style.display = 'block';
      if (mediaLabel) mediaLabel.textContent = 'Video Reel URL / MP4 File *';
      if (uploadLabel) uploadLabel.textContent = '☁️ Upload Reel (MP4)';
      if (mediaInput && !mediaInput.value.includes('.mp4')) {
        mediaInput.placeholder = 'customer-review-video-1.mp4 or https://...';
      }
    } else {
      if (posterField) posterField.style.display = 'none';
      if (mediaLabel) mediaLabel.textContent = 'Customer Photo URL *';
      if (uploadLabel) uploadLabel.textContent = '☁️ Upload Photo';
      if (mediaInput) mediaInput.placeholder = 'https://cdn.balloondekor.com/...';
    }
    updateReviewPreview();
  }

  function updateReviewPreview() {
    const container = document.getElementById('reviewPreviewContainer');
    const mediaVal = document.getElementById('reviewMedia')?.value.trim();
    const posterVal = document.getElementById('reviewPoster')?.value.trim();
    const typeVal = document.getElementById('reviewType')?.value;

    if (!container) return;

    if (!mediaVal) {
      container.innerHTML = '<span style="color:#94a3b8; font-size:13px;">No media selected</span>';
      return;
    }

    if (typeVal === 'video') {
      container.innerHTML = `
        <video src="${escapeHtml(mediaVal)}" poster="${escapeHtml(posterVal || '')}" controls playsinline style="width:100%; height:100%; object-fit:contain;"></video>
      `;
    } else {
      container.innerHTML = `
        <img src="${escapeHtml(mediaVal)}" alt="Preview" style="width:100%; height:100%; object-fit:contain;" onerror="this.parentElement.innerHTML='<span style=\\'color:#ef4444; font-size:12px;\\'>Failed to load image URL</span>'" />
      `;
    }
  }

  async function handleReviewMediaUpload(fileInput) {
    const file = fileInput?.files?.[0];
    if (!file) return;

    const progressEl = document.getElementById('reviewUploadProgress');
    if (progressEl) progressEl.style.display = 'block';

    try {
      const url = await uploadToCloudinary(file, 'celebration-reviews');
      const mediaInput = document.getElementById('reviewMedia');
      if (mediaInput) {
        mediaInput.value = url;
        updateReviewPreview();
      }
      showToast('Media uploaded to Cloudinary successfully!', 'success');
    } catch (err) {
      showToast('Upload failed: ' + err.message, 'error');
    } finally {
      if (progressEl) progressEl.style.display = 'none';
      if (fileInput) fileInput.value = '';
    }
  }

  async function handleReviewPosterUpload(fileInput) {
    const file = fileInput?.files?.[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file, 'celebration-reviews');
      const posterInput = document.getElementById('reviewPoster');
      if (posterInput) {
        posterInput.value = url;
        updateReviewPreview();
      }
      showToast('Poster uploaded successfully!', 'success');
    } catch (err) {
      showToast('Poster upload failed: ' + err.message, 'error');
    } finally {
      if (fileInput) fileInput.value = '';
    }
  }

  async function handleReviewFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const service = document.getElementById('reviewService').value.trim();
    const type = document.getElementById('reviewType').value;
    const rating = parseFloat(document.getElementById('reviewRating').value) || 5;
    const date = document.getElementById('reviewDate').value.trim() || 'Recent';
    const verified = document.getElementById('reviewVerified').checked;
    const media = document.getElementById('reviewMedia').value.trim();
    const poster = document.getElementById('reviewPoster')?.value.trim() || '';
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !city || !service || !media || !text) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    const reviewObj = {
      id: appState.editingReviewId || `rev-${Date.now()}`,
      name,
      city,
      rating,
      date,
      type,
      media,
      poster: type === 'video' ? poster : undefined,
      service,
      text,
      verified
    };

    if (appState.editingReviewId) {
      const idx = appState.reviews.findIndex(r => r.id === appState.editingReviewId);
      if (idx !== -1) {
        appState.reviews[idx] = reviewObj;
        await commitReviews(`Review from "${name}" updated successfully!`);
      }
    } else {
      appState.reviews.unshift(reviewObj);
      await commitReviews(`New review from "${name}" added successfully!`);
    }

    closeAllModals();
  }

  async function deleteReview(reviewId) {
    const rev = appState.reviews.find(r => r.id === reviewId);
    if (!rev) return;

    if (!confirm(`Are you sure you want to delete the review by "${rev.name}" (${rev.service})? This will remove it from all live website categories.`)) {
      return;
    }

    appState.reviews = appState.reviews.filter(r => r.id !== reviewId);
    await commitReviews(`Review from "${rev.name}" deleted successfully.`);
  }

  async function commitReviews(message = 'Customer reviews updated!') {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(appState.reviews));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.reviews = appState.reviews;
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        reviews: appState.reviews,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderReviewsList();
    updateMetrics();
    if (message) showToast(message, 'success');
  }

  /* ==========================================================================
     OPERATING CITIES MANAGEMENT (CRUD)
     ========================================================================== */

  function setupCitiesListeners() {
    const searchInput = document.getElementById('citySearchInputAdmin');
    const popularFilter = document.getElementById('cityPopularFilterAdmin');
    searchInput?.addEventListener('input', renderCitiesAdmin);
    popularFilter?.addEventListener('change', renderCitiesAdmin);
  }

  function renderCitiesAdmin() {
    const grid = document.getElementById('citiesGridAdmin');
    if (!grid) return;

    const searchTerm = (document.getElementById('citySearchInputAdmin')?.value || '').toLowerCase().trim();
    const popularFilter = document.getElementById('cityPopularFilterAdmin')?.value || 'all';

    let filtered = appState.cities || [];

    if (searchTerm) {
      filtered = filtered.filter(c =>
        (c.name && c.name.toLowerCase().includes(searchTerm)) ||
        (c.state && c.state.toLowerCase().includes(searchTerm)) ||
        (c.id && c.id.toLowerCase().includes(searchTerm))
      );
    }

    if (popularFilter === 'popular') {
      filtered = filtered.filter(c => !!c.popular);
    } else if (popularFilter === 'standard') {
      filtered = filtered.filter(c => !c.popular);
    }

    const countText = document.getElementById('citiesTabCountText');
    const totalCount = appState.cities.length;
    const popularCount = appState.cities.filter(c => !!c.popular).length;
    if (countText) {
      countText.textContent = `• ${totalCount} Operational Cities (${popularCount} Top Cities)`;
    }

    const badge = document.getElementById('sidebarCitiesBadge');
    if (badge) badge.textContent = totalCount;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border: 1.5px dashed var(--admin-border); border-radius: 16px;">
          <div style="font-size: 40px; margin-bottom: 12px;">📍</div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">No Operating Cities Found</h3>
          <p style="font-size: 13px; color: var(--text-muted); max-width: 420px; margin: 0 auto 16px;">
            ${searchTerm || popularFilter !== 'all' ? 'No cities match your current search or filter. Try clearing filters.' : 'You haven\'t added any operating cities yet. Click "+ Add New Operating City" to add one.'}
          </p>
          <button type="button" class="btn-primary" onclick="window.adminStudio.openCityModal('add')" style="padding: 9px 20px;">
            + Add New Operating City
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(city => {
      const isTop = !!city.popular;
      return `
        <div class="city-admin-card ${isTop ? 'is-popular' : ''}" data-city-id="${escapeHtml(city.id)}">
          <div class="city-card-header">
            <div class="city-card-left">
              <div class="city-card-pin">${isTop ? '⭐' : '📍'}</div>
              <div class="city-card-title-wrap">
                <h3 class="city-card-name" title="${escapeHtml(city.name)}">${escapeHtml(city.name)}</h3>
                <div class="city-card-state">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>
                  <span>${escapeHtml(city.state || 'India')}</span>
                </div>
              </div>
            </div>
            ${isTop ? '<span class="city-badge-popular">⭐ Top City</span>' : '<span class="city-badge-standard">📍 Standard</span>'}
          </div>

          <div class="city-card-meta">
            <span class="city-slug-text">/${escapeHtml(city.id)}</span>
            <span class="city-status-text">● Live Coverage</span>
          </div>

          <div class="city-card-actions">
            <button type="button" class="btn-city-toggle ${isTop ? 'is-featured' : ''}" onclick="window.adminStudio.toggleCityPopular('${escapeHtml(city.id)}')" title="${isTop ? 'Remove from top operating cities' : 'Mark as top operating city'}">
              ${isTop ? '★ Featured Top' : '☆ Mark as Top'}
            </button>
            <button type="button" class="btn-city-edit" onclick="window.adminStudio.openCityModal('edit', '${escapeHtml(city.id)}')" title="Edit City Details">
              ✏️ Edit
            </button>
            <button type="button" class="btn-city-delete" onclick="window.adminStudio.deleteCity('${escapeHtml(city.id)}')" title="Delete Operating City">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function openCityModal(mode = 'add', cityId = null) {
    const modal = document.getElementById('cityModalAdmin');
    const titleEl = document.getElementById('cityModalTitle');
    const modeInput = document.getElementById('cityModalMode');
    const origIdInput = document.getElementById('cityOriginalId');
    const nameInput = document.getElementById('cityNameInput');
    const stateInput = document.getElementById('cityStateInput');
    const slugInput = document.getElementById('citySlugInput');
    const popularCheckbox = document.getElementById('cityPopularCheckbox');
    const saveBtn = document.getElementById('saveCityBtn');

    if (!modal) return;

    if (mode === 'edit' && cityId) {
      const city = appState.cities.find(c => c.id === cityId);
      if (!city) {
        showToast('City not found.', 'error');
        return;
      }
      appState.editingCityId = cityId;
      if (modeInput) modeInput.value = 'edit';
      if (origIdInput) origIdInput.value = city.id;
      if (titleEl) titleEl.textContent = `Edit Operating City: ${city.name}`;
      if (saveBtn) saveBtn.textContent = 'Update City';
      if (nameInput) nameInput.value = city.name || '';
      if (stateInput) stateInput.value = city.state || '';
      if (slugInput) slugInput.value = city.id || '';
      if (popularCheckbox) popularCheckbox.checked = !!city.popular;
    } else {
      appState.editingCityId = null;
      if (modeInput) modeInput.value = 'add';
      if (origIdInput) origIdInput.value = '';
      if (titleEl) titleEl.textContent = 'Add New Operating City';
      if (saveBtn) saveBtn.textContent = 'Save City';
      if (nameInput) nameInput.value = '';
      if (stateInput) stateInput.value = '';
      if (slugInput) slugInput.value = '';
      if (popularCheckbox) popularCheckbox.checked = false;
    }

    modal.classList.add('active');
    setTimeout(() => nameInput?.focus(), 50);
  }

  function closeCityModalAdmin() {
    const modal = document.getElementById('cityModalAdmin');
    if (modal) modal.classList.remove('active');
  }

  function handleCityNameInput(inputEl) {
    const modeInput = document.getElementById('cityModalMode');
    const slugInput = document.getElementById('citySlugInput');
    if (modeInput && modeInput.value === 'add' && slugInput) {
      slugInput.value = slugify(inputEl.value);
    }
  }

  async function saveCity(e) {
    if (e && e.preventDefault) e.preventDefault();

    const mode = document.getElementById('cityModalMode')?.value || 'add';
    const origId = document.getElementById('cityOriginalId')?.value || '';
    const name = document.getElementById('cityNameInput')?.value.trim();
    const state = document.getElementById('cityStateInput')?.value.trim();
    let slug = document.getElementById('citySlugInput')?.value.trim();
    const popular = !!document.getElementById('cityPopularCheckbox')?.checked;

    if (!name || !state) {
      showToast('Please enter both City Name and State.', 'error');
      return;
    }

    slug = slugify(slug || name);
    if (!slug) {
      showToast('Please provide a valid slug or code for the city.', 'error');
      return;
    }

    if (mode === 'add') {
      const exists = appState.cities.some(c => c.id === slug);
      if (exists) {
        showToast(`A city with slug "${slug}" already exists! Please use a unique slug.`, 'error');
        return;
      }
      const newCity = {
        id: slug,
        name,
        state,
        popular
      };
      appState.cities.push(newCity);
      await commitCities(`Operating city "${name}" added successfully!`);
    } else {
      // Editing
      const idx = appState.cities.findIndex(c => c.id === origId);
      if (idx === -1) {
        showToast('City to update could not be found.', 'error');
        return;
      }
      if (slug !== origId) {
        const conflict = appState.cities.some((c, i) => i !== idx && c.id === slug);
        if (conflict) {
          showToast(`Slug "${slug}" conflicts with another existing city.`, 'error');
          return;
        }
      }
      appState.cities[idx] = {
        id: slug,
        name,
        state,
        popular
      };
      await commitCities(`Operating city "${name}" updated successfully!`);
    }

    closeCityModalAdmin();
  }

  async function deleteCity(cityId) {
    const city = appState.cities.find(c => c.id === cityId);
    if (!city) return;

    if (!confirm(`Are you sure you want to remove "${city.name}" (${city.state}) from operating cities?\n\nThis will remove it from the customer website city selector and footer.`)) {
      return;
    }

    appState.cities = appState.cities.filter(c => c.id !== cityId);
    await commitCities(`Operating city "${city.name}" deleted.`);
  }

  async function toggleCityPopular(cityId) {
    const city = appState.cities.find(c => c.id === cityId);
    if (!city) return;

    city.popular = !city.popular;
    await commitCities(`"${city.name}" ${city.popular ? 'marked as Top Operating City ⭐' : 'removed from Top Operating Cities'}.`);
  }

  async function commitCities(message = 'Operating cities updated!') {
    localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(appState.cities));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.cities = appState.cities;
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        reviews: appState.reviews,
        cities: appState.cities,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderCitiesAdmin();
    updateMetrics();
    if (message) showToast(message, 'success');
  }

  /* ==========================================================================
     TOP ANNOUNCEMENT BAR & TICKER MANAGEMENT
     ========================================================================== */
  const ANNOUNCEMENT_PRESETS = {
    express: {
      text: '⚡ Same Day 2-Hour Express Delivery in 100+ Cities',
      badge: '⚡ EXPRESS',
      linkText: 'Book Now',
      linkUrl: '#',
      theme: 'rose-gradient',
      bg: 'linear-gradient(135deg, #be123c 0%, #fb7185 100%)'
    },
    discount: {
      text: '🎉 Flat ₹500 OFF on Orders Above ₹2999 | Use Code: CELEBRATE500',
      badge: '🔥 OFFER',
      linkText: 'Claim Offer',
      linkUrl: '#',
      theme: 'emerald-gradient',
      bg: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
    },
    midnight: {
      text: '🌙 Midnight 12 AM Delivery Available in Delhi NCR, Mumbai & Bangalore',
      badge: 'MIDNIGHT',
      linkText: 'Reserve Slot',
      linkUrl: '#',
      theme: 'midnight-gradient',
      bg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'
    },
    festive: {
      text: '✨ Grand Wedding & Festive Balloon Setups Booking Open For Next Month',
      badge: '✨ SEASON',
      linkText: 'Explore Themes',
      linkUrl: '#',
      theme: 'sunset-gradient',
      bg: 'linear-gradient(135deg, #c2410c 0%, #f59e0b 100%)'
    }
  };

  function renderAnnouncementAdmin() {
    const ann = appState.announcement || ANNOUNCEMENT_PRESETS.express;
    const enabledInput = document.getElementById('announcementEnabled');
    const textInput = document.getElementById('announcementText');
    const badgeInput = document.getElementById('announcementBadge');
    const linkTextInput = document.getElementById('announcementLinkText');
    const linkUrlInput = document.getElementById('announcementLinkUrl');
    const themeInput = document.getElementById('announcementTheme');
    const customBgInput = document.getElementById('announcementCustomBg');

    if (enabledInput) enabledInput.checked = (ann.enabled !== false);
    if (textInput) textInput.value = ann.text || '';
    if (badgeInput) badgeInput.value = ann.badge || '';
    if (linkTextInput) linkTextInput.value = ann.linkText || '';
    if (linkUrlInput) linkUrlInput.value = ann.linkUrl || '';
    if (themeInput) themeInput.value = ann.theme || 'rose-gradient';
    if (customBgInput) customBgInput.value = ann.bg || 'linear-gradient(135deg, #be123c 0%, #fb7185 100%)';

    // Highlight selected theme button
    document.querySelectorAll('.ann-theme-btn').forEach(btn => {
      const isSelected = btn.getAttribute('data-theme') === (ann.theme || 'rose-gradient');
      btn.style.borderColor = isSelected ? '#be123c' : 'transparent';
      btn.style.boxShadow = isSelected ? '0 0 0 2px rgba(190, 18, 60, 0.25)' : 'none';
    });

    updateAnnouncementPreview();
  }

  function updateAnnouncementPreview() {
    const enabledInput = document.getElementById('announcementEnabled');
    const textInput = document.getElementById('announcementText');
    const badgeInput = document.getElementById('announcementBadge');
    const linkTextInput = document.getElementById('announcementLinkText');
    const linkUrlInput = document.getElementById('announcementLinkUrl');
    const customBgInput = document.getElementById('announcementCustomBg');

    const isEnabled = enabledInput ? enabledInput.checked : true;
    const text = (textInput ? textInput.value : '').trim() || '⚡ Same Day 2-Hour Express Delivery in 100+ Cities';
    const badge = (badgeInput ? badgeInput.value : '').trim();
    const linkText = (linkTextInput ? linkTextInput.value : '').trim();
    const linkUrl = (linkUrlInput ? linkUrlInput.value : '').trim() || '#';
    const bg = (customBgInput ? customBgInput.value : '') || 'linear-gradient(135deg, #be123c 0%, #fb7185 100%)';

    // Desktop Preview elements
    const desktopPrev = document.getElementById('announcementDesktopPreview');
    const prevBadgeEl = document.getElementById('prevBadgeEl');
    const prevTextEl = document.getElementById('prevTextEl');
    const prevLinkEl = document.getElementById('prevLinkEl');

    // Mobile Preview elements
    const mobileWrap = document.getElementById('announcementMobilePreviewWrap');
    const prevMobileBadgeEl = document.getElementById('prevMobileBadgeEl');
    const prevMobileTickerEl = document.getElementById('prevMobileTickerEl');
    const visBadge = document.getElementById('previewVisibilityBadge');
    const statusText = document.getElementById('announcementStatusText');

    if (desktopPrev) {
      desktopPrev.style.background = bg;
      desktopPrev.style.opacity = isEnabled ? '1' : '0.45';
    }
    if (mobileWrap) {
      mobileWrap.style.background = bg;
      mobileWrap.style.opacity = isEnabled ? '1' : '0.45';
    }

    if (prevBadgeEl) {
      if (badge) {
        prevBadgeEl.style.display = 'inline-block';
        prevBadgeEl.textContent = badge;
      } else {
        prevBadgeEl.style.display = 'none';
      }
    }

    if (prevTextEl) {
      prevTextEl.textContent = text;
    }

    if (prevLinkEl) {
      if (linkText) {
        prevLinkEl.style.display = 'inline-block';
        prevLinkEl.textContent = linkText;
        prevLinkEl.href = linkUrl;
      } else {
        prevLinkEl.style.display = 'none';
      }
    }

    if (prevMobileBadgeEl) {
      if (badge) {
        prevMobileBadgeEl.style.display = 'inline-block';
        prevMobileBadgeEl.textContent = badge;
      } else {
        prevMobileBadgeEl.style.display = 'none';
      }
    }

    if (prevMobileTickerEl) {
      prevMobileTickerEl.textContent = `${text} ${linkText ? '• ' + linkText : ''}`;
    }

    if (visBadge) {
      if (isEnabled) {
        visBadge.textContent = 'ACTIVE & VISIBLE';
        visBadge.style.background = '#ecfdf5';
        visBadge.style.color = '#059669';
        visBadge.style.borderColor = '#a7f3d0';
      } else {
        visBadge.textContent = 'HIDDEN / OFF';
        visBadge.style.background = '#fef2f2';
        visBadge.style.color = '#dc2626';
        visBadge.style.borderColor = '#fecaca';
      }
    }

    if (statusText) {
      statusText.textContent = isEnabled ? '• Live Across All Pages' : '• Currently Hidden';
      statusText.style.color = isEnabled ? '#e11d48' : '#94a3b8';
    }
  }

  function selectAnnouncementTheme(btn) {
    if (!btn) return;
    const theme = btn.getAttribute('data-theme');
    const bg = btn.getAttribute('data-bg');

    const themeInput = document.getElementById('announcementTheme');
    const customBgInput = document.getElementById('announcementCustomBg');
    if (themeInput) themeInput.value = theme;
    if (customBgInput) customBgInput.value = bg;

    document.querySelectorAll('.ann-theme-btn').forEach(b => {
      const match = (b === btn);
      b.style.borderColor = match ? '#be123c' : 'transparent';
      b.style.boxShadow = match ? '0 0 0 2px rgba(190, 18, 60, 0.25)' : 'none';
    });

    updateAnnouncementPreview();
  }

  function fillAnnouncementTemplate(type) {
    const template = ANNOUNCEMENT_PRESETS[type] || ANNOUNCEMENT_PRESETS.express;
    const textInput = document.getElementById('announcementText');
    const badgeInput = document.getElementById('announcementBadge');
    const linkTextInput = document.getElementById('announcementLinkText');
    const linkUrlInput = document.getElementById('announcementLinkUrl');
    const themeInput = document.getElementById('announcementTheme');
    const customBgInput = document.getElementById('announcementCustomBg');

    if (textInput) textInput.value = template.text;
    if (badgeInput) badgeInput.value = template.badge;
    if (linkTextInput) linkTextInput.value = template.linkText;
    if (linkUrlInput) linkUrlInput.value = template.linkUrl;
    if (themeInput) themeInput.value = template.theme;
    if (customBgInput) customBgInput.value = template.bg;

    document.querySelectorAll('.ann-theme-btn').forEach(b => {
      const match = b.getAttribute('data-theme') === template.theme;
      b.style.borderColor = match ? '#be123c' : 'transparent';
      b.style.boxShadow = match ? '0 0 0 2px rgba(190, 18, 60, 0.25)' : 'none';
    });

    updateAnnouncementPreview();
    showToast(`Template applied: ${template.badge || 'Banner'}! Click "Save & Publish Live" to apply.`, 'info');
  }

  function resetAnnouncementDefaults() {
    fillAnnouncementTemplate('express');
    const enabledInput = document.getElementById('announcementEnabled');
    if (enabledInput) enabledInput.checked = true;
    updateAnnouncementPreview();
    showToast('Reset to default Express delivery settings.', 'info');
  }

  async function saveAnnouncementFromTab(event) {
    if (event && event.preventDefault) event.preventDefault();

    const enabledInput = document.getElementById('announcementEnabled');
    const textInput = document.getElementById('announcementText');
    const badgeInput = document.getElementById('announcementBadge');
    const linkTextInput = document.getElementById('announcementLinkText');
    const linkUrlInput = document.getElementById('announcementLinkUrl');
    const themeInput = document.getElementById('announcementTheme');
    const customBgInput = document.getElementById('announcementCustomBg');

    const text = (textInput ? textInput.value : '').trim();
    if (!text) {
      showToast('Announcement text cannot be empty.', 'error');
      textInput?.focus();
      return;
    }

    appState.announcement = {
      enabled: enabledInput ? enabledInput.checked : true,
      text: text,
      badge: (badgeInput ? badgeInput.value : '').trim(),
      linkText: (linkTextInput ? linkTextInput.value : '').trim(),
      linkUrl: (linkUrlInput ? linkUrlInput.value : '').trim() || '#',
      theme: (themeInput ? themeInput.value : 'rose-gradient') || 'rose-gradient',
      bg: (customBgInput ? customBgInput.value : '') || 'linear-gradient(135deg, #be123c 0%, #fb7185 100%)',
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(appState.announcement));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.announcementBar = appState.announcement;
    }

    const saveBtn = document.getElementById('saveAnnouncementBtn');
    const originalText = saveBtn ? saveBtn.innerHTML : '';
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<span>Saving & Syncing...</span>';
    }

    try {
      await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: appState.categories,
          products: appState.products,
          blogs: appState.blogs,
          reviews: appState.reviews,
          cities: appState.cities,
          announcement: appState.announcement,
          updatedAt: new Date().toISOString()
        })
      });
    } catch(e) {
      console.warn('Dev server sync error:', e);
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
      }
    }

    updateMetrics();
    updateAnnouncementPreview();
    showToast('📢 Top Announcement Bar saved & published live across website!', 'success');
  }

  /* ==========================================================================
     PROMOTIONAL BANNERS & HERO CAROUSEL MANAGEMENT (HOMEPAGE & CATEGORY PAGES)
     ========================================================================== */
  const BANNER_LOCATION_LABELS = {
    'home': '🏠 Homepage Carousel',
    'birthday': '🎂 Birthday Category Page',
    'anniversary': '❤️ Anniversary Category Page',
    'kids': '🦄 Kids Themes Category Page',
    'baby-shower': '👶 Baby Shower Category Page',
    'wedding': '💍 Wedding Category Page',
    'corporate': '🏢 Corporate Category Page',
    'gifts': '🎁 Gifts Category Page'
  };

  function renderBannersAdmin() {
    const grid = document.getElementById('bannersGridAdmin');
    if (!grid) return;

    const searchTerm = (document.getElementById('bannerSearchInput')?.value || '').trim().toLowerCase();
    const filterLoc = appState.bannerFilterLocation || 'all';

    let list = Array.isArray(appState.banners) ? appState.banners : [];

    // Filter by location
    if (filterLoc === 'home') {
      list = list.filter(b => b.location === 'home');
    } else if (filterLoc === 'category') {
      list = list.filter(b => b.location !== 'home');
    }

    // Filter by search query
    if (searchTerm) {
      list = list.filter(b => {
        const titleMatch = (b.title || '').toLowerCase().includes(searchTerm);
        const subMatch = (b.subtitle || '').toLowerCase().includes(searchTerm);
        const tagMatch = (b.tag || '').toLowerCase().includes(searchTerm);
        const locMatch = (BANNER_LOCATION_LABELS[b.location] || b.location || '').toLowerCase().includes(searchTerm);
        return titleMatch || subMatch || tagMatch || locMatch;
      });
    }

    // Sort: homepage banners first by order, then category banners
    list.sort((a, b) => {
      if (a.location === 'home' && b.location !== 'home') return -1;
      if (a.location !== 'home' && b.location === 'home') return 1;
      return (a.order || 99) - (b.order || 99);
    });

    // Update counts
    const totalCount = appState.banners.length;
    const homeCount = appState.banners.filter(b => b.location === 'home').length;
    const catCount = appState.banners.filter(b => b.location !== 'home').length;

    const countAllEl = document.getElementById('countBannerAll');
    const countHomeEl = document.getElementById('countBannerHome');
    const countCatEl = document.getElementById('countBannerCategory');
    const totalTextEl = document.getElementById('bannersTotalCountText');

    if (countAllEl) countAllEl.textContent = totalCount;
    if (countHomeEl) countHomeEl.textContent = homeCount;
    if (countCatEl) countCatEl.textContent = catCount;
    if (totalTextEl) totalTextEl.textContent = `• ${totalCount} Banners Active`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1 / -1; text-align:center; padding:50px 20px; background:#f8fafc; border:1.5px dashed #cbd5e1; border-radius:16px;">
          <div style="font-size:36px; margin-bottom:10px;">🖼️</div>
          <h3 style="margin:0 0 6px 0; color:#334155;">No Banners Found</h3>
          <p style="color:#64748b; font-size:13px; margin:0 0 16px 0;">No banners matched your current filter or search criteria.</p>
          <button type="button" class="btn-primary" onclick="window.adminStudio.openBannerModal('add')" style="padding:8px 18px; font-size:13px;">
            + Add Promotional Banner
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(b => {
      const locLabel = BANNER_LOCATION_LABELS[b.location] || `🏷️ ${b.location}`;
      const isActive = (b.active !== false);

      return `
        <div class="banner-admin-card" data-banner-id="${b.id}">
          <div class="banner-card-media">
            <img src="${escapeHtml(b.image || '')}" alt="${escapeHtml(b.title || 'Banner')}" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'" />
            <div class="banner-card-overlay"></div>
            <span class="banner-badge-loc">${locLabel}</span>
            <span class="banner-badge-status ${isActive ? 'banner-status-active' : 'banner-status-hidden'}">
              ${isActive ? '✓ ACTIVE' : '✕ HIDDEN'}
            </span>
          </div>

          <div class="banner-card-body">
            ${b.tag ? `<span class="banner-card-tag">${escapeHtml(b.tag)}</span>` : ''}
            <h3 class="banner-card-title">${escapeHtml(b.title || 'Untitled Banner')}</h3>
            <p class="banner-card-sub">${escapeHtml(b.subtitle || 'No description provided.')}</p>

            <div class="banner-card-meta">
              <span><strong>CTA:</strong> ${escapeHtml(b.linkText || 'None')}</span>
              <span><strong>Target:</strong> ${escapeHtml(b.linkUrl || '#')}</span>
              <span><strong>Order:</strong> #${b.order || 1}</span>
            </div>

            <div class="banner-card-actions">
              <button type="button" class="btn-banner-action" onclick="window.adminStudio.toggleBannerActive('${b.id}')" title="Toggle visibility">
                ${isActive ? '👁️ Hide' : '✓ Activate'}
              </button>
              <button type="button" class="btn-banner-action btn-banner-edit" onclick="window.adminStudio.openBannerModal('edit', '${b.id}')">
                ✏️ Edit
              </button>
              <button type="button" class="btn-banner-action btn-banner-del" onclick="window.adminStudio.deleteBanner('${b.id}')" title="Delete banner">
                🗑️
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterBannersByLocation(loc, btn) {
    appState.bannerFilterLocation = loc;
    document.querySelectorAll('.banner-loc-filter-btn').forEach(b => {
      const isCurrent = (b === btn);
      b.style.background = isCurrent ? '#0284c7' : '#ffffff';
      b.style.color = isCurrent ? '#ffffff' : '#334155';
      b.style.borderColor = isCurrent ? '#0284c7' : '#cbd5e1';
      b.style.fontWeight = isCurrent ? '700' : '600';
    });
    renderBannersAdmin();
  }

  function populateBannerLocationSelect(selectedVal = null) {
    const locSelect = document.getElementById('bannerLocationSelect');
    if (!locSelect) return;

    const currentVal = selectedVal || locSelect.value || 'home';
    let html = `
      <optgroup label="Homepage">
        <option value="home">🏠 Homepage Carousel Slide</option>
      </optgroup>
      <optgroup label="Category Pages">
    `;

    if (Array.isArray(appState.categories)) {
      appState.categories.forEach(cat => {
        if (!cat.id.startsWith('__site_')) {
          const icon = cat.icon || '🎈';
          html += `<option value="${escapeHtml(cat.id)}">${icon} ${escapeHtml(cat.name)} Category Page</option>`;
        }
      });
    }

    html += `</optgroup>`;
    locSelect.innerHTML = html;
    locSelect.value = currentVal;
  }

  function openBannerModal(mode = 'add', bannerId = null, preselectedLoc = null) {
    const modal = document.getElementById('bannerModal');
    if (!modal) return;

    populateBannerLocationSelect(preselectedLoc);

    const modeInput = document.getElementById('bannerModalMode');
    const origIdInput = document.getElementById('bannerOriginalId');
    const titleModal = document.getElementById('bannerModalTitle');

    const locSelect = document.getElementById('bannerLocationSelect');
    const orderInput = document.getElementById('bannerOrderInput');
    const tagInput = document.getElementById('bannerTagInput');
    const titleInput = document.getElementById('bannerTitleInput');
    const subInput = document.getElementById('bannerSubtitleInput');
    const imgUrlInput = document.getElementById('bannerImageUrlInput');
    const previewImg = document.getElementById('bannerModalPreviewImg');
    const linkTextInput = document.getElementById('bannerLinkTextInput');
    const linkUrlInput = document.getElementById('bannerLinkUrlInput');
    const activeCheckbox = document.getElementById('bannerActiveCheckbox');

    if (mode === 'add') {
      const targetLoc = preselectedLoc || ((appState.bannerFilterLocation === 'home') ? 'home' : (appState.bannerFilterLocation === 'category' ? 'birthday' : 'home'));
      const catObj = appState.categories.find(c => c.id === targetLoc);
      const catName = catObj?.name || targetLoc;

      if (modeInput) modeInput.value = 'add';
      if (origIdInput) origIdInput.value = '';
      if (titleModal) titleModal.textContent = preselectedLoc ? `Add Banner for ${catName}` : 'Add New Promotional Banner';

      if (locSelect) locSelect.value = targetLoc;
      if (orderInput) orderInput.value = (appState.banners.length + 1);
      if (tagInput) tagInput.value = preselectedLoc ? `✨ The Ultimate ${catName} Collection` : '';
      if (titleInput) titleInput.value = preselectedLoc ? `Professional ${catName} Balloon Decorations` : '';
      if (subInput) subInput.value = preselectedLoc ? `Make their milestone unforgettable! Premium celebration setups in 100+ cities.` : '';
      if (imgUrlInput) imgUrlInput.value = '';
      if (previewImg) previewImg.src = BLANK_PIXEL;
      const previewWrap = document.getElementById('bannerModalPreviewWrap');
      if (previewWrap) previewWrap.style.display = 'none';
      if (linkTextInput) linkTextInput.value = preselectedLoc ? 'Explore Setups Below ↓' : '';
      if (linkUrlInput) linkUrlInput.value = preselectedLoc ? `#${preselectedLoc}Catalog` : '';
      if (activeCheckbox) activeCheckbox.checked = true;
    } else {
      // Editing
      const banner = appState.banners.find(b => b.id === bannerId);
      if (!banner) {
        showToast('Banner not found.', 'error');
        return;
      }

      if (modeInput) modeInput.value = 'edit';
      if (origIdInput) origIdInput.value = banner.id;
      if (titleModal) titleModal.textContent = `Edit Banner: ${banner.title || ''}`;

      if (locSelect) locSelect.value = banner.location || 'home';
      if (orderInput) orderInput.value = banner.order || 1;
      if (tagInput) tagInput.value = banner.tag || '';
      if (titleInput) titleInput.value = banner.title || '';
      if (subInput) subInput.value = banner.subtitle || '';
      if (imgUrlInput) imgUrlInput.value = banner.image || '';
      if (previewImg) previewImg.src = banner.image || BLANK_PIXEL;
      const previewWrap = document.getElementById('bannerModalPreviewWrap');
      previewWrap.style.display = banner.image ? 'block' : 'none';
      if (linkTextInput) linkTextInput.value = banner.linkText || '';
      if (linkUrlInput) linkUrlInput.value = banner.linkUrl || '';
      if (activeCheckbox) activeCheckbox.checked = (banner.active !== false);
    }

    modal.classList.add('active');
  }

  function closeBannerModalAdmin() {
    const modal = document.getElementById('bannerModal');
    if (modal) modal.classList.remove('active');
  }

  function previewBannerModalImage(url) {
    const previewImg = document.getElementById('bannerModalPreviewImg');
    const previewWrap = document.getElementById('bannerModalPreviewWrap');
    if (previewImg) {
      previewImg.src = url || BLANK_PIXEL;
    }
    if (previewWrap) {
      previewWrap.style.display = url ? 'block' : 'none';
    }
  }

  function handleBannerLocationChange(loc) {
    // Keep inputs untouched for the admin to configure
  }

  async function saveBanner(event) {
    if (event && event.preventDefault) event.preventDefault();

    const mode = document.getElementById('bannerModalMode')?.value || 'add';
    const origId = document.getElementById('bannerOriginalId')?.value;

    const locSelect = document.getElementById('bannerLocationSelect');
    const orderInput = document.getElementById('bannerOrderInput');
    const tagInput = document.getElementById('bannerTagInput');
    const titleInput = document.getElementById('bannerTitleInput');
    const subInput = document.getElementById('bannerSubtitleInput');
    const imgUrlInput = document.getElementById('bannerImageUrlInput');
    const linkTextInput = document.getElementById('bannerLinkTextInput');
    const linkUrlInput = document.getElementById('bannerLinkUrlInput');
    const activeCheckbox = document.getElementById('bannerActiveCheckbox');

    const title = (titleInput?.value || '').trim();
    const image = (imgUrlInput?.value || '').trim();
    const location = locSelect?.value || 'home';

    if (!title) {
      showToast('Please enter a banner headline / title.', 'error');
      titleInput?.focus();
      return;
    }

    if (!image) {
      showToast('Please enter or upload a banner image URL.', 'error');
      imgUrlInput?.focus();
      return;
    }

    const bannerObj = {
      location: location,
      locationName: BANNER_LOCATION_LABELS[location] || location,
      tag: (tagInput?.value || '').trim(),
      title: title,
      subtitle: (subInput?.value || '').trim(),
      image: image,
      linkText: (linkTextInput?.value || '').trim(),
      linkUrl: (linkUrlInput?.value || '').trim() || '#',
      order: parseInt(orderInput?.value || '1', 10) || 1,
      active: activeCheckbox ? activeCheckbox.checked : true,
      updatedAt: new Date().toISOString()
    };

    if (mode === 'add') {
      bannerObj.id = `banner-${location}-${Date.now()}`;
      appState.banners.push(bannerObj);
      await commitBanners(`Promotional Banner "${title}" added successfully!`);
    } else {
      const idx = appState.banners.findIndex(b => b.id === origId);
      if (idx === -1) {
        showToast('Banner to update could not be found.', 'error');
        return;
      }
      bannerObj.id = origId;
      appState.banners[idx] = bannerObj;
      await commitBanners(`Promotional Banner "${title}" updated successfully!`);
    }

    closeBannerModalAdmin();
  }

  async function deleteBanner(bannerId) {
    const banner = appState.banners.find(b => b.id === bannerId);
    if (!banner) return;

    if (!confirm(`Are you sure you want to delete banner "${banner.title}"?\n\nThis will remove it from the live website slider.`)) {
      return;
    }

    appState.banners = appState.banners.filter(b => b.id !== bannerId);
    await commitBanners(`Banner "${banner.title}" deleted.`);
  }

  async function toggleBannerActive(bannerId) {
    const banner = appState.banners.find(b => b.id === bannerId);
    if (!banner) return;

    banner.active = (banner.active === false) ? true : false;
    await commitBanners(`Banner "${banner.title}" is now ${banner.active ? 'Visible on website' : 'Hidden from website'}.`);
  }

  async function commitBanners(message = 'Promotional banners updated!') {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(appState.banners));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.banners = appState.banners;
    }

    // Supabase Cloud Sync for banners
    if (supabase) {
      try {
        await supabase.from('categories').upsert({
          id: '__site_banners__',
          name: 'Site Banners Configuration',
          desc: JSON.stringify(appState.banners),
          image: '',
          badge: ''
        }, { onConflict: 'id' });
      } catch(e) {
        console.warn('Supabase banner sync error:', e);
      }
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        reviews: appState.reviews,
        cities: appState.cities,
        announcement: appState.announcement,
        banners: appState.banners,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderBannersAdmin();
    if (appState.activeTab === 'packages' && appState.selectedCategoryTab && appState.selectedCategoryTab !== 'all') {
      selectCategoryTab(appState.selectedCategoryTab);
    }
    updateMetrics();
    if (message) showToast(message, 'success');
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `<span style="font-size:16px;">${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // Global methods
  
  /* ==========================================================================
     DEDICATED GIFT MARKETPLACE STUDIO LOGIC (Exact Specifications)
     ========================================================================== */
  let currentGiftGallery = [];
  let currentGiftHighlights = [];
  let currentGiftWhy = [];

  function switchGiftTab(tabId, btn) {
    document.querySelectorAll('#giftStudioNav .pkg-studio-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#giftModal .pkg-studio-pane').forEach(p => {
      p.classList.remove('active');
      p.style.setProperty('display', 'none', 'important');
    });
    if (btn) {
      btn.classList.add('active');
    } else {
      const targetBtn = document.querySelector(`#giftStudioNav .pkg-studio-tab-btn[onclick*="'${tabId}'"]`);
      if (targetBtn) targetBtn.classList.add('active');
    }
    const targetPane = document.getElementById('giftPane-' + tabId);
    if (targetPane) {
      targetPane.classList.add('active');
      targetPane.style.setProperty('display', 'flex', 'important');
    }
  }

  function previewGiftImage(url) {
    const preview = document.getElementById('giftImagePreview');
    const wrap = document.getElementById('giftImagePreviewWrap');
    if (preview && url) {
      preview.src = url;
      if (wrap) wrap.style.display = 'block';
    }
  }

  async function handleGiftImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const statusEl = document.getElementById('giftUploadStatus');
    const inputEl = document.getElementById('giftImage');
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.textContent = '⏳ Uploading image to Cloudinary...';
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result;
        try {
          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, folder: 'celebration_gifts' })
          });
          const data = await res.json();
          if (data && data.url) {
            inputEl.value = data.url;
            previewGiftImage(data.url);
            if (statusEl) {
              statusEl.textContent = '✓ Image uploaded to Cloudinary successfully!';
              statusEl.style.color = '#059669';
              setTimeout(() => { statusEl.style.display = 'none'; }, 2500);
            }
          } else {
            throw new Error(data.error || 'Upload failed');
          }
        } catch(err) {
          console.warn('Direct upload fallback:', err);
          inputEl.value = base64;
          previewGiftImage(base64);
          if (statusEl) {
            statusEl.textContent = '✓ Photo loaded locally';
            statusEl.style.color = '#059669';
            setTimeout(() => { statusEl.style.display = 'none'; }, 2000);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch(err) {
      if (statusEl) statusEl.textContent = 'Upload error: ' + err.message;
    }
  }

  function renderGiftGalleryInputs() {
    const container = document.getElementById('giftGalleryContainer');
    if (!container) return;
    if (currentGiftGallery.length === 0) {
      container.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No additional gallery angles yet. Click + Add Image to upload or enter image URL.</span>';
      return;
    }
    container.innerHTML = currentGiftGallery.map((imgUrl, idx) => `
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="url" class="form-control" value="${escapeHtml(imgUrl)}" placeholder="https://..." onchange="window.adminStudio.updateGiftGalleryImage(${idx}, this.value)" />
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeGiftGalleryImage(${idx})" title="Remove">✕</button>
      </div>
    `).join('');
  }

  function addGiftGalleryField(defaultVal = '') {
    currentGiftGallery.push(defaultVal);
    renderGiftGalleryInputs();
  }

  function updateGiftGalleryImage(idx, val) {
    if (currentGiftGallery[idx] !== undefined) currentGiftGallery[idx] = val;
  }

  function removeGiftGalleryImage(idx) {
    currentGiftGallery.splice(idx, 1);
    renderGiftGalleryInputs();
  }

  function renderGiftHighlightsInputs() {
    const container = document.getElementById('giftHighlightsContainer');
    if (!container) return;
    if (currentGiftHighlights.length === 0) {
      container.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No key highlights added yet. Click + Add Highlight.</span>';
      return;
    }
    container.innerHTML = currentGiftHighlights.map((text, idx) => `
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" class="form-control" value="${escapeHtml(text)}" placeholder="e.g. UV400 cool sunglasses / 15 Fresh Dutch Roses" onchange="window.adminStudio.updateGiftHighlight(${idx}, this.value)" />
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeGiftHighlight(${idx})" title="Remove">✕</button>
      </div>
    `).join('');
  }

  function addGiftHighlightField(defaultVal = '') {
    currentGiftHighlights.push(defaultVal);
    renderGiftHighlightsInputs();
  }

  function updateGiftHighlight(idx, val) {
    if (currentGiftHighlights[idx] !== undefined) currentGiftHighlights[idx] = val;
  }

  function removeGiftHighlight(idx) {
    currentGiftHighlights.splice(idx, 1);
    renderGiftHighlightsInputs();
  }

  function renderGiftWhyInputs() {
    const container = document.getElementById('giftWhyContainer');
    if (!container) return;
    if (currentGiftWhy.length === 0) {
      container.innerHTML = '<span style="font-size:12px; color:var(--text-muted); font-style:italic;">No why choose points added yet. Click + Add Reason.</span>';
      return;
    }
    container.innerHTML = currentGiftWhy.map((text, idx) => `
      <div style="display:flex; gap:10px; align-items:center;">
        <input type="text" class="form-control" value="${escapeHtml(text)}" placeholder="e.g. Same day express delivery (2 to 4 hours)" onchange="window.adminStudio.updateGiftWhy(${idx}, this.value)" />
        <button type="button" class="btn-remove-inclusion" onclick="window.adminStudio.removeGiftWhy(${idx})" title="Remove">✕</button>
      </div>
    `).join('');
  }

  function addGiftWhyField(defaultVal = '') {
    currentGiftWhy.push(defaultVal);
    renderGiftWhyInputs();
  }

  function updateGiftWhy(idx, val) {
    if (currentGiftWhy[idx] !== undefined) currentGiftWhy[idx] = val;
  }

  function removeGiftWhy(idx) {
    currentGiftWhy.splice(idx, 1);
    renderGiftWhyInputs();
  }

  function openGiftModal(mode, giftId = null) {
    try {
      appState.editingGiftId = (mode === 'edit') ? giftId : null;
      const modal = document.getElementById('giftModal');
      const titleEl = document.getElementById('giftModalTitle');
      const form = document.getElementById('giftForm');
      if (!modal || !form) {
        console.error('Gift modal or form element not found in DOM');
        return;
      }

      modal.classList.add('active');
      modal.style.setProperty('display', 'flex', 'important');
      modal.style.setProperty('z-index', '999999', 'important');
      modal.style.setProperty('visibility', 'visible', 'important');
      modal.style.setProperty('opacity', '1', 'important');
      switchGiftTab('core');

      // Populate subcategories dropdown
      const subcatSelect = document.getElementById('giftSubcategory');
      const giftsCat = appState.categories.find(c => c.id === 'gifts');
      if (subcatSelect && giftsCat && Array.isArray(giftsCat.subcategories) && giftsCat.subcategories.length > 0) {
        subcatSelect.innerHTML = giftsCat.subcategories.map(s => `
          <option value="${s.id}">${s.icon || '🏷️'} ${escapeHtml(s.name)}</option>
        `).join('');
      }

      if (mode === 'edit' && giftId) {
        let g = appState.products.find(p => p.id === giftId);
        if (!g && typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.products)) {
          g = window.SITE_DATA.products.find(p => p.id === giftId);
        }
        if (!g) {
          g = { id: giftId, title: giftId, price: 999, subcategory: 'boys' };
        }

        if (titleEl) titleEl.textContent = `Edit Gift: "${g.title}"`;
        const titleInput = document.getElementById('giftTitle');
        if (titleInput) titleInput.value = g.title || '';
        const slugInput = document.getElementById('giftSlug');
        if (slugInput) {
          slugInput.value = g.id || '';
          slugInput.readOnly = true;
        }

        if (subcatSelect) subcatSelect.value = g.subcategory || 'boys';
        const badgeEl = document.getElementById('giftBadge');
        if (badgeEl) badgeEl.value = g.badge || '';
        const priceEl = document.getElementById('giftPrice');
        if (priceEl) priceEl.value = g.price || '';
        const origPriceEl = document.getElementById('giftOriginalPrice');
        if (origPriceEl) origPriceEl.value = g.originalPrice || g.original_price || '';
        const boughtEl = document.getElementById('giftBoughtText');
        if (boughtEl) boughtEl.value = g.boughtText || '';
        const ratingEl = document.getElementById('giftRating');
        if (ratingEl) ratingEl.value = g.rating || '4.8';
        const revCountEl = document.getElementById('giftReviewsCount');
        if (revCountEl) revCountEl.value = g.reviewsCount || g.reviews_count || '150';
        const delNoteEl = document.getElementById('giftDeliveryNote');
        if (delNoteEl) delNoteEl.value = g.deliveryNote || g.delivery_note || 'Same Day Delivery: Get it delivered in 2 to 4 hours at your location.';

        const imgEl = document.getElementById('giftImage');
        if (imgEl) imgEl.value = g.image || '';
        previewGiftImage(g.image || '');
        currentGiftGallery = Array.isArray(g.gallery) ? [...g.gallery.filter(x => x !== g.image)] : [];
        renderGiftGalleryInputs();

        // Product Details / Specifications
        const s = g.specs || {};
        const matEl = document.getElementById('giftMaterial');
        if (matEl) matEl.value = g.material || s.material || '';
        const dimEl = document.getElementById('giftDimensions');
        if (dimEl) dimEl.value = g.dimensions || s.dimensions || '';
        const colEl = document.getElementById('giftColor');
        if (colEl) colEl.value = g.color || s.color || '';
        const ageEl = document.getElementById('giftRecommendedAge');
        if (ageEl) ageEl.value = g.recommendedAge || s.recommendedAge || '';
        const washEl = document.getElementById('giftWashCare');
        if (washEl) washEl.value = g.washCare || s.washCare || '';
        const packEl = document.getElementById('giftPackaging');
        if (packEl) packEl.value = g.packaging || s.packaging || '';

        // Description & Highlights
        const subEl = document.getElementById('giftSubtitle');
        if (subEl) subEl.value = g.subtitle || '';
        const descEl = document.getElementById('giftDescription');
        if (descEl) descEl.value = g.description || g.aboutDescription || '';
        currentGiftHighlights = Array.isArray(g.highlights) ? [...g.highlights] : (Array.isArray(g.inclusions) ? [...g.inclusions] : []);
        renderGiftHighlightsInputs();

        let whyList = [];
        if (Array.isArray(g.whyChoose)) {
          whyList = g.whyChoose.map(w => typeof w === 'string' ? w : (w?.title ? `${w.title} - ${w.desc || ''}` : JSON.stringify(w)));
        } else if (g.whyChoose && Array.isArray(g.whyChoose.highlights)) {
          whyList = g.whyChoose.highlights.map(h => typeof h === 'string' ? h : (h?.title ? `${h.title} - ${h.desc || ''}` : ''));
        }
        currentGiftWhy = whyList.length > 0 ? whyList : [
          "Premium quality guaranteed",
          "Safe shockproof packaging",
          "Express same day delivery in 2 to 4 hours"
        ];
        renderGiftWhyInputs();
      } else {
        if (titleEl) titleEl.textContent = '+ Add New Gift / Hamper';
        form.reset();
        const slugInput = document.getElementById('giftSlug');
        if (slugInput) {
          slugInput.value = '';
          slugInput.readOnly = false;
        }
        const ratingEl = document.getElementById('giftRating');
        if (ratingEl) ratingEl.value = '4.8';
        const revCountEl = document.getElementById('giftReviewsCount');
        if (revCountEl) revCountEl.value = '150';
        const boughtEl = document.getElementById('giftBoughtText');
        if (boughtEl) boughtEl.value = '250+ bought in last month';
        const delNoteEl = document.getElementById('giftDeliveryNote');
        if (delNoteEl) delNoteEl.value = 'Same Day Delivery: Get it delivered in 2 to 4 hours at your location.';
        const badgeEl = document.getElementById('giftBadge');
        if (badgeEl) badgeEl.value = 'Best Gift';
        const prevWrap = document.getElementById('giftImagePreviewWrap');
        if (prevWrap) prevWrap.style.display = 'none';

        currentGiftGallery = [];
        renderGiftGalleryInputs();
        currentGiftHighlights = [
          "Handcrafted luxury gift presentation",
          "Tested safe and child-friendly components",
          "Includes personalized greeting message card"
        ];
        renderGiftHighlightsInputs();
        currentGiftWhy = [
          "Premium quality guaranteed",
          "Safe shockproof packaging",
          "Express same day delivery in 2 to 4 hours"
        ];
        renderGiftWhyInputs();

        // Auto slug generator from title
        const titleInput = document.getElementById('giftTitle');
        if (titleInput) {
          titleInput.oninput = () => {
            if (slugInput && !slugInput.readOnly) {
              slugInput.value = 'gift-' + slugify(titleInput.value);
            }
          };
        }
      }

      modal.classList.add('active');
    } catch(err) {
      console.error('Error opening Gift Modal:', err);
      const modal = document.getElementById('giftModal');
      if (modal) modal.classList.add('active');
    }
  }

  // Also bind to window directly for global accessibility
  window.openGiftModal = openGiftModal;
  window.switchGiftTab = switchGiftTab;
  window.previewGiftImage = previewGiftImage;
  window.saveGift = saveGift;

  // Direct Event Delegation Fallback for Edit Gift Buttons
  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-card-edit');
    if (editBtn) {
      const card = editBtn.closest('.package-admin-card');
      const pkgId = card ? card.getAttribute('data-pkg-id') : null;
      if (pkgId) {
        let item = appState.products.find(p => p.id === pkgId);
        if (!item && typeof window.SITE_DATA !== 'undefined' && Array.isArray(window.SITE_DATA.products)) {
          item = window.SITE_DATA.products.find(p => p.id === pkgId);
        }
        const isGiftItem = (item && item.category === 'gifts') || pkgId.startsWith('gift-') || (editBtn.textContent && editBtn.textContent.includes('Gift'));
        if (isGiftItem) {
          e.preventDefault();
          e.stopPropagation();
          openGiftModal('edit', pkgId);
        }
      }
    }
  }, true);

  async function saveGift(event) {
    event.preventDefault();
    const title = document.getElementById('giftTitle')?.value.trim();
    const rawSlug = document.getElementById('giftSlug')?.value.trim();
    const slug = rawSlug.startsWith('gift-') ? rawSlug : ('gift-' + slugify(rawSlug));
    const subcategory = document.getElementById('giftSubcategory')?.value || 'boys';
    const badge = document.getElementById('giftBadge')?.value.trim() || 'Best Gift';
    const price = parseFloat(document.getElementById('giftPrice')?.value) || 0;
    const origPrice = parseFloat(document.getElementById('giftOriginalPrice')?.value) || Math.round(price * 1.25);
    const boughtText = document.getElementById('giftBoughtText')?.value.trim() || '250+ bought in last month';
    const rating = parseFloat(document.getElementById('giftRating')?.value) || 4.8;
    const reviewsCount = parseInt(document.getElementById('giftReviewsCount')?.value, 10) || 120;
    const deliveryNote = document.getElementById('giftDeliveryNote')?.value.trim() || 'Same Day Delivery: Get it delivered in 2 to 4 hours at your location.';
    const image = document.getElementById('giftImage')?.value.trim() || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';

    const material = document.getElementById('giftMaterial')?.value.trim() || 'Ultra-Soft Hypoallergenic Plush & PP Cotton';
    const dimensions = document.getElementById('giftDimensions')?.value.trim() || '35 cm (Sitting Height)';
    const color = document.getElementById('giftColor')?.value.trim() || 'Warm Honey Brown with Silk Ribbon';
    const recommendedAge = document.getElementById('giftRecommendedAge')?.value.trim() || 'Safe for all age groups (3+ to Adults)';
    const washCare = document.getElementById('giftWashCare')?.value.trim() || 'Hand wash with mild detergent or damp wipe';
    const packaging = document.getElementById('giftPackaging')?.value.trim() || 'Gift Wrapped in Polka Box with Satin Bow';

    const subtitle = document.getElementById('giftSubtitle')?.value.trim() || title;
    const description = document.getElementById('giftDescription')?.value.trim() || subtitle;

    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
    const gallery = [image, ...currentGiftGallery.filter(x => x && x !== image)];

    const giftData = {
      id: slug,
      title: title,
      category: 'gifts',
      category_name: 'Gift Marketplace',
      categoryName: 'Gift Marketplace',
      subcategory: subcategory,
      badge: badge,
      price: price,
      original_price: origPrice,
      originalPrice: origPrice,
      discount: discount,
      rating: rating,
      reviews_count: reviewsCount,
      reviewsCount: reviewsCount,
      boughtText: boughtText,
      image: image,
      gallery: gallery,
      material: material,
      dimensions: dimensions,
      color: color,
      recommendedAge: recommendedAge,
      washCare: washCare,
      packaging: packaging,
      specs: {
        material: material,
        dimensions: dimensions,
        color: color,
        recommendedAge: recommendedAge,
        washCare: washCare,
        packaging: packaging
      },
      subtitle: subtitle,
      description: description,
      aboutDescription: description,
      about_description: description,
      deliveryNote: deliveryNote,
      delivery_note: deliveryNote,
      highlights: currentGiftHighlights.filter(h => h && h.trim()),
      inclusions: currentGiftHighlights.filter(h => h && h.trim()),
      whyChoose: currentGiftWhy.filter(w => w && w.trim()),
      tags: ['Gift Marketplace', subcategory, `subcat:${subcategory}`]
    };

    if (appState.editingGiftId) {
      const idx = appState.products.findIndex(p => p.id === appState.editingGiftId);
      if (idx !== -1) {
        appState.products[idx] = { ...appState.products[idx], ...giftData };
      } else {
        appState.products.unshift(giftData);
      }
      await commitData(`Gift "${title}" updated successfully!`);
    } else {
      if (appState.products.some(p => p.id === slug)) {
        showToast(`Gift with ID "${slug}" already exists.`, 'error');
        return;
      }
      appState.products.unshift(giftData);
      await commitData(`New Gift "${title}" published to Gift Marketplace!`);
    }

    closeAllModals();
    renderPackages();
    updateMetrics();
  }

  window.adminStudio = {
    openGiftModal,
    switchGiftTab,
    previewGiftImage,
    handleGiftImageUpload,
    addGiftGalleryField,
    updateGiftGalleryImage,
    removeGiftGalleryImage,
    addGiftHighlightField,
    updateGiftHighlight,
    removeGiftHighlight,
    addGiftWhyField,
    updateGiftWhy,
    removeGiftWhy,
    saveGift,
    selectCategoryTab,
    clearPackageSearch,
    openPackageModal,
    openCategoryModal,
    openDeleteModal,
    switchPackageTab,
    resetWhyChooseDefaults,
    removeInclusionItem,
    removeNotIncludedItem,
    removeGalleryItem,
    addPkgFaq,
    removePkgFaq,
    updatePkgFaq,
    addPkgAddon,
    removePkgAddon,
    updatePkgAddon,
    uploadAddonImage,
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
    handleWseOptImageUpload,
    updateWseSubItemName,
    openBlogModal,
    insertBlogTemplate,
    cleanAllBlogHtmlTags,
    renderBlogs,
    openBlogFeaturesModal,
    saveBlogFeatures,
    renderBlogFeaturesAdmin,
    openReviewModal,
    deleteReview,
    handleReviewFormSubmit,
    toggleReviewTypeFields,
    updateReviewPreview,
    handleReviewMediaUpload,
    handleReviewPosterUpload,
    renderReviewsList,
    openSubcategoryModal,
    openSubcategoryModalFromPackageModal,
    closeSubcategoryModal,
    selectSubcategoryFilter,
    deleteSubcategoryDirect,
    renderCategorySubcategoriesBar,
    // Operating Cities CRUD methods
    renderCitiesAdmin,
    openCityModal,
    closeCityModalAdmin,
    handleCityNameInput,
    saveCity,
    deleteCity,
    toggleCityPopular,
    // Top Announcement Bar CRUD & Preview methods
    renderAnnouncementAdmin,
    updateAnnouncementPreview,
    selectAnnouncementTheme,
    fillAnnouncementTemplate,
    resetAnnouncementDefaults,
    saveAnnouncementFromTab,
    // Promotional Banners CRUD methods
    renderBannersAdmin,
    filterBannersByLocation,
    openBannerModal,
    closeBannerModalAdmin,
    previewBannerModalImage,
    handleBannerLocationChange,
    saveBanner,
    deleteBanner,
    toggleBannerActive,
    // Category In-View Banner Methods
    renderCategoryBannerHtml,
    handleCategoryBannerDirectUpload,
    deleteCategoryBanner,
    openCategoryBannerModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
