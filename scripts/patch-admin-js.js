const fs = require('fs');
const path = require('path');

const adminJsPath = path.join(__dirname, '..', 'admin', 'admin.js');
let code = fs.readFileSync(adminJsPath, 'utf-8');

const startMarker = `  /* ==========================================================================
     WEDDING SERVICE INSIDE INSPECTOR & OPTIONS MANAGER
     ========================================================================== */`;

const endMarker = `  function showToast(message, type = 'success') {`;

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found! startIndex:", startIndex, "endIndex:", endIndex);
  process.exit(1);
}

const replacementCode = `  /* ==========================================================================
     WEDDING SERVICE CUSTOMIZER & INSIDE OPTIONS BUILDER
     (Zero package fields - pure modular wedding services with full inside options)
     ========================================================================== */
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

      if (modalTitle) modalTitle.textContent = \`Edit Wedding Service: \${service.title}\`;
      if (titleInput) titleInput.value = service.title || '';
      if (slugInput) {
        slugInput.value = service.id || '';
        slugInput.readOnly = true;
      }
      if (badgeInput) badgeInput.value = service.badge || 'TRADITIONAL';
      if (imageInput) imageInput.value = service.image || '';
      if (previewImg) previewImg.src = service.image || '';
      if (taglineInput) taglineInput.value = service.description || service.desc || service.longDesc || '';
      if (liveLink) liveLink.href = \`../wedding.html#service-\${encodeURIComponent(service.id)}\`;

      // Load options
      let opts = [];
      if (Array.isArray(service.options) && service.options.length > 0) {
        opts = JSON.parse(JSON.stringify(service.options));
      } else if (window.SITE_DATA?.weddingConfigs?.[service.id]) {
        opts = JSON.parse(JSON.stringify(window.SITE_DATA.weddingConfigs[service.id]));
      } else if (Array.isArray(service.inclusions) && service.inclusions.length > 0) {
        opts = service.inclusions.map((inc, i) => ({
          id: \`opt_\${service.id}_\${i}\`,
          title: inc,
          subPrompt: 'Configuration details',
          subItems: ['Standard Setup', 'Custom Tuning']
        }));
      } else {
        opts = [
          {
            id: \`opt_\${service.id}_1\`,
            title: \`\${service.title} Arrangement\`,
            subPrompt: 'Select setup requirements',
            subItems: ['Full Setup', 'Standard Inclusions']
          }
        ];
      }
      appState.weddingEditorOptions = opts;
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Wedding Service';
      if (titleInput) titleInput.value = '';
      if (slugInput) {
        slugInput.value = '';
        slugInput.readOnly = false;
      }
      if (badgeInput) badgeInput.value = 'TRADITIONAL';
      if (imageInput) imageInput.value = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80';
      if (previewImg) previewImg.src = imageInput.value;
      if (taglineInput) taglineInput.value = '';
      if (liveLink) liveLink.href = '../wedding.html';

      appState.weddingEditorOptions = [
        {
          id: \`opt_custom_1\`,
          title: 'Primary Service Option',
          subPrompt: 'Choose preferred style or size',
          subItems: ['Standard Traditional Option', 'Grand Luxury Option']
        }
      ];
    }

    renderWeddingEditorOptions();
    modal.classList.add('active');
  }

  function renderWeddingEditorOptions() {
    const container = document.getElementById('wseOptionsContainer');
    if (!container) return;

    if (!Array.isArray(appState.weddingEditorOptions) || appState.weddingEditorOptions.length === 0) {
      container.innerHTML = \`
        <div style="text-align:center; padding:32px 16px; background:#f8fafc; border:1.5px dashed #cbd5e1; border-radius:12px; color:var(--text-muted);">
          <p style="font-size:14px; font-weight:700; margin:0 0 6px 0;">No inside options yet</p>
          <p style="font-size:12.5px; margin:0 0 14px 0;">Add Pendals, Lighting, Menu Items, Sweets, or any custom wedding service checklist item.</p>
          <button type="button" class="btn-primary" onclick="window.adminStudio.addWseOption()" style="padding:6px 16px; font-size:12px;">+ Add First Option</button>
        </div>
      \`;
      return;
    }

    container.innerHTML = appState.weddingEditorOptions.map((opt, optIdx) => \`
      <div class="wse-option-card" data-opt-idx="\${optIdx}">
        <div class="wse-opt-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="wse-opt-number">Option \${optIdx + 1}</span>
            <span style="font-size:11px; color:var(--text-dim); font-family:monospace;">ID: \${escapeHtml(opt.id || 'opt_' + optIdx)}</span>
          </div>
          <button type="button" class="wse-delete-opt-btn" onclick="window.adminStudio.removeWseOption(\${optIdx})" title="Delete this option">
            🗑️ Delete Option
          </button>
        </div>

        <div class="wse-opt-inputs-grid">
          <div>
            <label style="font-size:11.5px; font-weight:700; color:var(--text-main); margin-bottom:4px; display:block;">Option Title *</label>
            <input type="text" class="wse-opt-input" value="\${escapeHtml(opt.title || '')}" placeholder="e.g. Pendals In Front Of House" oninput="window.adminStudio.updateWseOptField(\${optIdx}, 'title', this.value)" required />
          </div>
          <div>
            <label style="font-size:11.5px; font-weight:700; color:var(--text-main); margin-bottom:4px; display:block;">Prompt / Subtitle</label>
            <input type="text" class="wse-opt-input" value="\${escapeHtml(opt.subPrompt || opt.subtitle || '')}" placeholder="e.g. Traditional entrance canopy" oninput="window.adminStudio.updateWseOptField(\${optIdx}, 'subPrompt', this.value)" />
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label style="font-size:11.5px; font-weight:700; color:var(--text-main);">Sub-items & Choices (\${(opt.subItems || []).length})</label>
            <span style="font-size:11px; color:var(--text-dim);">Selectable in customer quote</span>
          </div>

          <div class="wse-subitems-wrap">
            \${(opt.subItems && opt.subItems.length > 0) ? opt.subItems.map((subItem, subIdx) => \`
              <div class="wse-subitem-chip">
                <span>\${escapeHtml(subItem)}</span>
                <button type="button" class="wse-chip-del-btn" onclick="window.adminStudio.removeWseSubItem(\${optIdx}, \${subIdx})" title="Remove this choice">✕</button>
              </div>
            \`).join('') : '<span style="font-size:12px; color:var(--text-dim); font-style:italic;">No sub-items added yet.</span>'}
          </div>

          <div class="wse-add-subitem-row">
            <input type="text" id="wseNewSub_\${optIdx}" class="wse-new-subitem-input" placeholder="Type new choice (e.g. Tenkaya pandhiri, Biryani, 4K Drone)..." onkeydown="if(event.key==='Enter'){event.preventDefault();window.adminStudio.addWseSubItem(\${optIdx});}" />
            <button type="button" class="wse-add-subitem-btn" onclick="window.adminStudio.addWseSubItem(\${optIdx})">
              + Add Choice
            </button>
          </div>
        </div>
      </div>
    \`).join('');
  }

  function addWseOption() {
    if (!Array.isArray(appState.weddingEditorOptions)) {
      appState.weddingEditorOptions = [];
    }
    appState.weddingEditorOptions.push({
      id: \`opt_\${Date.now().toString(36)}\`,
      title: \`Service Option \${appState.weddingEditorOptions.length + 1}\`,
      subPrompt: 'Select preference',
      subItems: ['Standard Setup', 'Premium Choice']
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
    const input = document.getElementById(\`wseNewSub_\${optIdx}\`);
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const opt = appState.weddingEditorOptions?.[optIdx];
    if (!opt) return;

    if (!Array.isArray(opt.subItems)) {
      opt.subItems = [];
    }
    opt.subItems.push(val);
    input.value = '';
    renderWeddingEditorOptions();
  }

  function removeWseSubItem(optIdx, subIdx) {
    const opt = appState.weddingEditorOptions?.[optIdx];
    if (!opt || !Array.isArray(opt.subItems)) return;
    opt.subItems.splice(subIdx, 1);
    renderWeddingEditorOptions();
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

    await commitData(\`Wedding service "\${title}" and inside options saved!\`);
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
    if (countEl) countEl.textContent = \`• \${appState.blogs.length} Articles Published\`;

    if (!grid) return;

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
      grid.innerHTML = \`
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📝</div>
          <h3>No Blog Articles Found</h3>
          <p>No articles match your current search query or topic filter.</p>
          <button type="button" class="btn-add-primary" onclick="window.adminStudio.openBlogModal('add')">
            + Add New Article
          </button>
        </div>
      \`;
      return;
    }

    grid.innerHTML = items.map(b => \`
      <div class="blog-admin-card" data-blog-id="\${b.id}">
        <div class="blog-card-media">
          <img src="\${escapeHtml(b.image)}" alt="\${escapeHtml(b.title)}" onerror="this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'" loading="lazy" />
          <span class="blog-media-badge">\${escapeHtml(b.tag || 'EDITORIAL')}</span>
          <span class="blog-media-time">⏱️ \${escapeHtml(b.readTime || '5 min read')}</span>
        </div>
        <div class="blog-card-content">
          <span class="blog-card-topic-tag">\${escapeHtml(b.categoryName || b.category)}</span>
          <h3 class="blog-card-heading" title="\${escapeHtml(b.title)}">\${escapeHtml(b.title)}</h3>
          <p class="blog-card-summary">\${escapeHtml(b.excerpt || '')}</p>
          <div class="blog-card-meta-line">
            <span>✍️ <strong>\${escapeHtml(b.author || 'Celebration Team')}</strong></span>
            <span>📅 \${escapeHtml(b.date || 'Recent')}</span>
          </div>
          <div class="card-actions-row">
            <button type="button" class="btn-card-action btn-card-edit" onclick="window.adminStudio.openBlogModal('edit', '\${b.id}')">
              ✏️ Edit Article
            </button>
            <a href="../blog-detail.html?id=\${encodeURIComponent(b.id)}" target="_blank" class="btn-card-action btn-card-view" title="Read live on website">
              👁️
            </a>
            <button type="button" class="btn-card-action btn-card-delete" onclick="window.adminStudio.openDeleteModal('blog', '\${b.id}', '\${escapeHtml(b.title)}')" title="Delete article">
              🗑️
            </button>
          </div>
        </div>
      </div>
    \`).join('');
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
    const readInput = document.getElementById('blogReadTime');
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

      if (modalTitle) modalTitle.textContent = \`Edit Blog Article: \${blog.title}\`;
      if (submitBtn) submitBtn.textContent = 'Update Article';
      if (titleInput) titleInput.value = blog.title || '';
      if (slugInput) {
        slugInput.value = blog.id || '';
        slugInput.readOnly = true;
      }
      if (catSelect) catSelect.value = blog.category || 'balloon-tips';
      if (tagInput) tagInput.value = blog.tag || 'Decor Hacks';
      if (readInput) readInput.value = blog.readTime || '5 min read';
      if (authorInput) authorInput.value = blog.author || 'Celebration Events Team';
      if (dateInput) dateInput.value = blog.date || '';
      if (imageInput) imageInput.value = blog.image || '';
      if (previewImg) previewImg.src = blog.image || '';
      if (excerptInput) excerptInput.value = blog.excerpt || '';
      if (contentInput) contentInput.value = blog.content || '';
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Blog Article';
      if (submitBtn) submitBtn.textContent = 'Publish Article';
      document.getElementById('blogForm')?.reset();
      if (slugInput) {
        slugInput.value = '';
        slugInput.readOnly = false;
      }
      if (tagInput) tagInput.value = 'Decor Hacks';
      if (readInput) readInput.value = '5 min read';
      if (authorInput) authorInput.value = 'Celebration Events Team';
      
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
      if (dateInput) dateInput.value = dateFormatted;

      if (imageInput) imageInput.value = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';
      if (previewImg) previewImg.src = imageInput.value;
    }

    modal.classList.add('active');
  }

  async function handleBlogFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value.trim();
    const slug = slugify(document.getElementById('blogSlug').value.trim());
    const category = document.getElementById('blogCategory').value;
    const tag = document.getElementById('blogTag').value.trim();
    const readTime = document.getElementById('blogReadTime').value.trim();
    const author = document.getElementById('blogAuthor').value.trim();
    const date = document.getElementById('blogDate').value.trim();
    const image = document.getElementById('blogImage').value.trim();
    const excerpt = document.getElementById('blogExcerpt').value.trim();
    const content = document.getElementById('blogContent').value.trim();

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
      readTime: readTime || '5 min read',
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
        appState.blogs[idx] = blogData;
        await commitBlogs(\`Article "\${title}" updated successfully!\`);
      }
    } else {
      if (appState.blogs.some(b => b.id === slug)) {
        showToast(\`Article slug "\${slug}" already exists.\`, 'error');
        return;
      }
      appState.blogs.unshift(blogData);
      await commitBlogs(\`New article "\${title}" published successfully!\`);
    }

    closeAllModals();
  }

  async function commitBlogs(message = 'Blog articles updated!') {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(appState.blogs));
    if (typeof window.SITE_DATA !== 'undefined') {
      window.SITE_DATA.blogs = appState.blogs;
    }

    fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: appState.categories,
        products: appState.products,
        blogs: appState.blogs,
        updatedAt: new Date().toISOString()
      })
    }).catch(() => {});

    renderBlogs();
    updateMetrics();
    if (message) showToast(message, 'success');
  }

  `;

code = code.substring(0, startIndex) + replacementCode + code.substring(endIndex);

// Also update window.adminStudio
const oldAdminStudio = `  // Global methods
  window.adminStudio = {
    selectCategoryTab,
    openPackageModal,
    openCategoryModal,
    openDeleteModal,
    removeInclusionItem,
    removeGalleryItem,
    syncWebsiteDefaults,
    openWeddingServiceInspector,
    removeWsInclusion
  };`;

const newAdminStudio = `  // Global methods
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

if (code.includes(oldAdminStudio)) {
  code = code.replace(oldAdminStudio, newAdminStudio);
} else {
  console.warn("Could not find oldAdminStudio snippet for exact match, checking partial");
}

fs.writeFileSync(adminJsPath, code, 'utf-8');
console.log("Successfully patched admin.js!");
