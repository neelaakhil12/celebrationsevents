/**
 * Celebration Events - Exact Website-to-Admin Catalog Builder
 * Replaces SITE_DATA.products in data.js with the exact 51 items matching the website pages:
 * - Birthday: 5 packages from birthday.html
 * - Anniversary: 6 packages from anniversary.html
 * - Kids Themes: 5 packages from kids.html
 * - Baby Shower & Welcome: 5 packages from baby-shower.html
 * - Wedding: 13 exact wedding services from wedding.html & wedding-packages.html
 * - Corporate: 5 packages from corporate.html
 * - Gifts Market: 12 exact gifts from marketplace.html
 */

const fs = require('fs');
const path = require('path');

const dataJsPath = path.resolve(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataJsPath, 'utf-8');

const EXACT_PRODUCTS = [
  // ==========================================
  // 1. BIRTHDAY (5 packages from birthday.html)
  // ==========================================
  {
    id: "simple-balloon-decor-for-home",
    title: "Simple Balloon Decor for Home",
    category: "birthday",
    categoryName: "Birthday",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.9,
    reviewsCount: 313,
    badge: "BESTSELLER",
    image: "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
      "https://cdn.balloondekor.com/14/1744720943222.webp"
    ],
    setupDuration: "1.5 - 2 Hours",
    description: "A chic, minimalist home celebration setup featuring metallic latex balloons, happy birthday bunting, and fairy lights. Ideal for living rooms and bedroom surprises.",
    inclusions: [
      "100 Metallic Balloons (Pastel Blue, White & Chrome Gold)",
      "1 'Happy Birthday' Rose Gold Cursive Cardstock Banner",
      "2 Star Foil Balloons (18 inches)",
      "Fairy String Lights (Warm White, 10 meters)",
      "Ribbons, Glue Dots & Complete Home Setup by Expert Decorator"
    ],
    tags: ["Home Decor", "Same Day Available", "Budget Friendly"]
  },
  {
    id: "rose-gold-birthday-home-decor",
    title: "Rose Gold Birthday Home Decor",
    category: "birthday",
    categoryName: "Birthday",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.9,
    reviewsCount: 352,
    badge: "POPULAR",
    image: "https://cdn.balloondekor.com/14/1744720943222.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/1744720943222.webp",
      "https://cdn.balloondekor.com/14/1748087900974.webp"
    ],
    setupDuration: "2 Hours",
    description: "Sophisticated rose gold luxury balloon ring with shimmering foil curtains, star balloons, and ambient fairy lights tailored for women and girls.",
    inclusions: [
      "150 Metallic Rose Gold & Pastel Pink Balloons",
      "2 Shimmering Rose Gold Foil Curtains for Backdrop",
      "1 Happy Birthday Foil Balloon Set (16 inches)",
      "4 Rose Gold Confetti Transparent Balloons",
      "4 Heart & Star Foil Balloons",
      "Warm LED Rice Lights for Glamorous Glow"
    ],
    tags: ["Rose Gold", "Girls Birthday", "Insta-Worthy"]
  },
  {
    id: "adorable-birthday-arch-backdrop",
    title: "Adorable Birthday Arch Backdrop",
    category: "birthday",
    categoryName: "Birthday",
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 5.0,
    reviewsCount: 374,
    badge: "TOP RATED",
    image: "https://cdn.balloondekor.com/14/1744890426934.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/1744890426934.webp",
      "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Stunning half-arch organic balloon garland framed on circular backdrop ring with customized name tag and ambient spotlight.",
    inclusions: [
      "200 Chrome & Metallic Balloons (Golden, White, Chrome Mauve)",
      "Circular Metallic Backdrop Stand on Rental",
      "1 Happy Birthday Neon Sign (Warm White)",
      "4 Confetti Giant Balloons",
      "Professional Florist & Decor Team at Venue"
    ],
    tags: ["Circular Arch", "Milestone 30th", "Banquet Hall"]
  },
  {
    id: "blush-glow-birthday-theme",
    title: "Blush & Glow Birthday Theme",
    category: "birthday",
    categoryName: "Birthday",
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    rating: 4.8,
    reviewsCount: 228,
    badge: "TRENDING",
    image: "https://cdn.balloondekor.com/14/1748087900974.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/1748087900974.webp",
      "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp"
    ],
    setupDuration: "2 Hours",
    description: "Gentle blush pink and champagne gold theme with elegant cascading wall balloon drape and fairy canopy.",
    inclusions: [
      "140 Pastel Pink, White & Champagne Balloons",
      "LED Neon Sign 'Happy Birthday'",
      "Fairy Light Backdrop Curtain (8x6 ft)",
      "2 Foil Number Balloons (32 inches, Golden)",
      "Table Decor with Confetti Sprinkles"
    ],
    tags: ["Blush Pink", "Bedroom Surprise", "Evening Glow"]
  },
  {
    id: "boho-theme-birthday-decoration",
    title: "Boho Theme Luxury Birthday Decor",
    category: "birthday",
    categoryName: "Birthday",
    price: 8499,
    originalPrice: 10999,
    discount: 23,
    rating: 5.0,
    reviewsCount: 395,
    badge: "LUXURY",
    image: "https://cdn.balloondekor.com/16/boho-theme-birthday-decoration-1785501861053-625298.webp",
    gallery: [
      "https://cdn.balloondekor.com/16/boho-theme-birthday-decoration-1785501861053-625298.webp",
      "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp"
    ],
    setupDuration: "3.5 Hours",
    description: "Premium Bohemian celebration setup with natural pampas grass, macrame backdrops, earthy terracotta balloons, and ambient warm wicker lighting.",
    inclusions: [
      "350 Earthy & Pastel Organic Balloons (Nude, Eucalyptus, Ivory)",
      "Custom Laser-cut Wooden Birthday Name Plaque",
      "Natural Dried Pampas Grass & Palm Leaves Floral Styling",
      "Boho Teepee Tent / Cabana with Floor Rugs & Cushions",
      "Wicker Lanterns with Warm Fairy Lights",
      "Senior Designer with 2 Assistants On-Site"
    ],
    tags: ["Boho Luxury", "Pampas Grass", "Milestone 50th / 1st"]
  },

  // ==========================================
  // 2. ANNIVERSARY (6 packages from anniversary.html)
  // ==========================================
  {
    id: "anniversary-home-decoration",
    title: "Anniversary Home Surprise Decor",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    rating: 4.9,
    reviewsCount: 284,
    badge: "BESTSELLER",
    image: "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp",
      "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
    ],
    setupDuration: "2 Hours",
    description: "An enchanting romantic home surprise featuring metallic red heart balloons, fairy light curtains, and bed styling with rose petals.",
    inclusions: [
      "120 Red & White Metallic Balloons with Curling Ribbons",
      "10 Heart Foil Balloons (18 inches)",
      "Happy Anniversary Foil Bunting Banner",
      "Fresh Rose Petal Bed Pathway & Heart Formation",
      "Tea-light LED Candles (Set of 12)",
      "Fairy String Lights (12 meters)"
    ],
    tags: ["Romantic Surprise", "Bedroom Decor", "Rose Petals"]
  },
  {
    id: "red-anniversary-home-decor",
    title: "Red Passion Anniversary Canopy & Decor",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 2099,
    originalPrice: 2699,
    discount: 22,
    rating: 4.8,
    reviewsCount: 310,
    badge: "POPULAR",
    image: "https://cdn.balloondekor.com/14/1744883492822.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/1744883492822.webp",
      "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp"
    ],
    setupDuration: "2 Hours",
    description: "Passionate crimson red theme with balloon bunches, ceiling balloon drops with hanging couple photo polaroids, and heart foil clusters.",
    inclusions: [
      "150 Crimson Red & Golden Chrome Balloons",
      "16 Custom Couple Polaroids printed & hung from ceiling balloons",
      "1 'Love' Cursive Foil Balloon",
      "Fairy Light Net Backdrop",
      "Fragranced Red Rose Petal Carpet Styling"
    ],
    tags: ["Red Passion", "Polaroid Photos", "Proposals"]
  },
  {
    id: "romantic-anniversary-room-celebration",
    title: "Romantic Anniversary Room Celebration",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 2399,
    originalPrice: 3199,
    discount: 25,
    rating: 5.0,
    reviewsCount: 342,
    badge: "TOP RATED",
    image: "https://cdn.balloondekor.com/14/1744884242691.webp",
    gallery: [
      "https://cdn.balloondekor.com/14/1744884242691.webp",
      "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Complete 360-degree hotel room or master bedroom styling with fairy light ceiling, balloon clusters, and candlelight floor pathway.",
    inclusions: [
      "200 Metallic & Chrome Balloons (Red, Rose Gold, Pearl White)",
      "Happy Anniversary Neon Sign on Acrylic Board",
      "Romantic Canopy Structure with Sheer White Drapes",
      "40 Tealight LED Candles creating illuminated pathway",
      "Fresh Red Roses (10 Stems) & Flower Petal Art"
    ],
    tags: ["Hotel Room", "Canopy", "Candlelight Pathway"]
  },
  {
    id: "anniversary-bliss-setup",
    title: "Anniversary Bliss Ring Setup",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 2499,
    originalPrice: 3399,
    discount: 26,
    rating: 4.9,
    reviewsCount: 198,
    badge: "TRENDING",
    image: "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
    gallery: [
      "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "https://cdn.balloondekor.com/14/1744883492822.webp"
    ],
    setupDuration: "2 Hours",
    description: "Circular arch balloon ring in luxurious golden and white tones with warm spotlight and customized Anniversary message.",
    inclusions: [
      "180 Metallic Chrome Gold & Pastel White Balloons",
      "Circular Ring Stand on Rental",
      "Warm White Neon Sign ('Better Together' or 'Happy Anniversary')",
      "Artificial Floral Bunches on Arch corners",
      "Complete hassle-free assembly & disassembly"
    ],
    tags: ["Circular Arch", "Silver Jubilee", "Photo Booth"]
  },
  {
    id: "happy-anniversary-backdrop-decoration",
    title: "Grand Golden Anniversary Backdrop",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 6499,
    originalPrice: 8499,
    discount: 24,
    rating: 5.0,
    reviewsCount: 412,
    badge: "LUXURY",
    image: "https://cdn.balloondekor.com/16/happy-anniversary-backdrop-decoration-1785501861053-832104.webp",
    gallery: [
      "https://cdn.balloondekor.com/16/happy-anniversary-backdrop-decoration-1785501861053-832104.webp",
      "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
    ],
    setupDuration: "3.5 Hours",
    description: "Grand sequin shimmer wall backdrop with dual circular arches, custom LED numerals (25th / 50th), and organic balloon drapes.",
    inclusions: [
      "Gold Shimmer Sequin Wall (8x8 ft)",
      "Giant 3D Light-up Numbers (e.g. '25' or '50')",
      "300 Chrome Gold, Black & Pearl White Balloon Garland",
      "Exotic Fresh Flower Clusters (Carnations, Orchids & Lilies)",
      "Ambient Up-lighting & Floor Fog Machine for Entry",
      "2 Senior Stylists with Venue Setup Coordinator"
    ],
    tags: ["25th Silver Jubilee", "50th Golden Jubilee", "Shimmer Wall"]
  },
  {
    id: "cabana-canopy-terrace-decor",
    title: "Magical Cabana Canopy Terrace Decor",
    category: "anniversary",
    categoryName: "Anniversary",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewsCount: 275,
    badge: "ROMANTIC",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
    ],
    setupDuration: "2.5 Hours",
    description: "Open-air terrace or lawn cabana tent draped in flowing chiffon fabrics with star fairy light canopy and floor mattress seating.",
    inclusions: [
      "Wooden Cabana Structure with White Chiffon Drapes",
      "Curtain Fairy String Lights (30 meters)",
      "Floor Rugs, Satin Throw Pillows & Bolsters",
      "100 Red & Rose Gold Balloons around Cabana Pillars",
      "Fresh Rose Petals & Flameless LED Pathway"
    ],
    tags: ["Terrace Cabana", "Stargazing Dinner", "Proposal"]
  },

  // ==========================================
  // 3. KIDS THEMES (5 packages from kids.html)
  // ==========================================
  {
    id: "cocomelon-kids-theme",
    title: "Cocomelon Fun Kids Birthday Theme",
    category: "kids",
    categoryName: "Kids Themes",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 5.0,
    reviewsCount: 412,
    badge: "POPULAR",
    image: "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
      "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Vibrant Cocomelon themed backdrop featuring JJ character cutouts, watermelon foil balloons, and bright pastel balloon arch.",
    inclusions: [
      "220 Green, Yellow, Blue & Pink Pastel Balloons",
      "Round Cocomelon Fabric Backdrop (6ft Diameter)",
      "2 Standee Character Cutouts (JJ & Watermelon)",
      "Birthday Child Name Wooden Cutout",
      "Cocomelon Theme Foil Balloons (Set of 5)",
      "Complete assembly by kids party specialist"
    ],
    tags: ["Cocomelon", "1st Birthday", "Toddlers"]
  },
  {
    id: "baby-shark-underwater-theme",
    title: "Baby Shark Underwater Theme",
    category: "kids",
    categoryName: "Kids Themes",
    price: 3199,
    originalPrice: 4299,
    discount: 26,
    rating: 4.9,
    reviewsCount: 318,
    badge: "LOVED",
    image: "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
    gallery: [
      "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Dive into ocean fun! Baby shark character cutouts, sea-weed balloon pillars, bubble transparent balloons, and oceanic arch.",
    inclusions: [
      "200 Ocean Blue, Teal & Sunshine Yellow Balloons",
      "Under-the-Sea Backdrop with Wave Cutouts",
      "Baby Shark Family Standees (Set of 3)",
      "Bubble Foil Balloons & Sea Creature Foils (Octopus, Starfish)",
      "LED Blue Stage Floodlight"
    ],
    tags: ["Baby Shark", "Ocean Theme", "Under 5 Years"]
  },
  {
    id: "boss-baby-theme-decor",
    title: "The Boss Baby Theme Decor",
    category: "kids",
    categoryName: "Kids Themes",
    price: 3499,
    originalPrice: 4599,
    discount: 24,
    rating: 4.8,
    reviewsCount: 260,
    badge: "TRENDING",
    image: "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp",
    gallery: [
      "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Sophisticated navy blue, baby blue, and chrome silver theme for your little boss with briefcase cutouts and bow-ties.",
    inclusions: [
      "200 Navy Blue, Sky Blue & Chrome Silver Balloons",
      "Boss Baby Round Backdrop with Suit Monogram",
      "Boss Baby Standing Cutout (4ft Height)",
      "Custom Name Board: 'Boss [Child Name]'",
      "Foil Baby Bottle & Bow-tie Balloons"
    ],
    tags: ["Boss Baby", "Boy Birthday", "Corporate Baby"]
  },
  {
    id: "jungle-safari-kids-party",
    title: "Wild Jungle Safari Theme Decor",
    category: "kids",
    categoryName: "Kids Themes",
    price: 3299,
    originalPrice: 4399,
    discount: 25,
    rating: 5.0,
    reviewsCount: 388,
    badge: "BESTSELLER",
    image: "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp",
    gallery: [
      "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp"
    ],
    setupDuration: "3 Hours",
    description: "An adventurous jungle forest setting with lion, giraffe, and zebra foil cutouts, tropical palm leaves, and earthy balloon garlands.",
    inclusions: [
      "250 Safari Green, Yellow, Brown & Gold Chrome Balloons",
      "Jungle Backdrop Screen with Wooden Gate Styling",
      "5 3D Animal Foil Balloons (Lion, Giraffe, Tiger, Zebra, Monkey)",
      "Artificial Monster Monstera Leaves & Vines",
      "Rustic Wooden Cake Stand on Rental"
    ],
    tags: ["Jungle Safari", "Wild One", "Animals"]
  },
  {
    id: "frozen-wonderland-theme",
    title: "Frozen Ice Wonderland Theme",
    category: "kids",
    categoryName: "Kids Themes",
    price: 3599,
    originalPrice: 4799,
    discount: 25,
    rating: 4.9,
    reviewsCount: 340,
    badge: "LOVED",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80"
    ],
    setupDuration: "3 Hours",
    description: "Magical snowy castle theme featuring Elsa and Olaf cutouts, snowflake balloon clusters, and glistening icy silver foil drapes.",
    inclusions: [
      "220 Icy Blue, Metallic Purple & Chrome Silver Balloons",
      "Winter Ice Castle Backdrop Frame",
      "Elsa & Olaf Character Standees",
      "6 Glistening Snowflake Foil Balloons",
      "Fairy Lights with Cool White Ice Effect"
    ],
    tags: ["Frozen", "Elsa & Olaf", "Princess Theme"]
  },

  // ==========================================
  // 4. BABY SHOWER & WELCOME (5 packages from baby-shower.html)
  // ==========================================
  {
    id: "baby-shower-pastel-decor",
    title: "Pastel Dream Baby Shower Decor",
    category: "baby-shower",
    categoryName: "Baby Shower & Welcome",
    price: 2699,
    originalPrice: 3499,
    discount: 23,
    rating: 4.9,
    reviewsCount: 230,
    badge: "LOVED",
    image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
    ],
    setupDuration: "2 Hours",
    description: "Dreamy gender-neutral pastel palette with soft beige, blush and mint tones, 'Oh Baby' neon sign, and floral accents.",
    inclusions: [
      "180 Macaron Pastel Balloons (Peach, Ivory, Mint & Gold)",
      "Curved Backdrop Screen with 'Oh Baby' Warm Neon Sign",
      "Artificial Pampas & White Rose Clusters",
      "Golden Baby Feet Foil Balloon",
      "Mom-to-be Satin Sash & Flower Crown"
    ],
    tags: ["Gender Neutral", "Pastel Colors", "Mom To Be"]
  },
  {
    id: "newborn-welcome-baby-decor",
    title: "Welcome Baby Home Decor (Boy/Girl)",
    category: "baby-shower",
    categoryName: "Baby Shower & Welcome",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewsCount: 195,
    badge: "EXPRESS",
    image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
    ],
    setupDuration: "1.5 Hours",
    description: "Hassle-free, quick 90-minute doorstep setup before mother and baby arrive from the hospital. Gentle noise-free setup.",
    inclusions: [
      "100 Soft Metallic Balloons (Customizable: Pink or Blue)",
      "1 'Welcome Baby' Foil Letter Banner",
      "Cradle / Bassinet Ribbon & Balloon Garland",
      "Baby Carriage Foil Balloon",
      "Doorway Welcome Toran"
    ],
    tags: ["Hospital Arrival", "Same Day Setup", "Baby Welcome"]
  },
  {
    id: "baby-shower-teddy-bear-theme",
    title: "Oh Baby Teddy Bear Luxury Theme Setup",
    category: "baby-shower",
    categoryName: "Baby Shower & Welcome",
    price: 3499,
    originalPrice: 4699,
    discount: 26,
    rating: 5.0,
    reviewsCount: 310,
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
    ],
    setupDuration: "2.5 Hours",
    description: "Trendy 'We Can Bearly Wait' theme with giant plush teddy bear, caramel and cream organic arches, and baby block boxes.",
    inclusions: [
      "220 Caramel, Sand White & Coffee Tone Balloons",
      "Plush 3ft Sitting Teddy Bear Mascot (Rental)",
      "4 Illuminated 'BABY' Letter Box Blocks",
      "Circular Wooden Arch with Custom Lettering",
      "Artificial Floral Arrangement on Arch"
    ],
    tags: ["Teddy Bear", "Bearly Wait", "Godh Bharai"]
  },
  {
    id: "baby-shower-teddy-cloud-cradle-decor",
    title: "Teddy & Pastel Clouds Baby Shower Cradle Decor",
    category: "baby-shower",
    categoryName: "Baby Shower & Welcome",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewsCount: 220,
    badge: "LOVED",
    image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Fluffy balloon cloud clusters surrounding traditional ceremonial cradle with hanging stars and glowing moon.",
    inclusions: [
      "180 White & Soft Blue/Pink Cloud Balloons",
      "Traditional Cradle Floral Garlanding",
      "Foil Crescent Moon & Stars cluster",
      "Warm Fairy Lights woven into cradle drapes",
      "Ceremonial Brass Pooja Thali Decoration"
    ],
    tags: ["Cradle Decor", "Naming Ceremony", "Tradition"]
  },
  {
    id: "baby-welcome-home-balloon-surprise",
    title: "Baby Welcome Home Room Surprise Decor",
    category: "baby-shower",
    categoryName: "Baby Shower & Welcome",
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    rating: 4.8,
    reviewsCount: 180,
    badge: "SWEET",
    image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
    ],
    setupDuration: "2 Hours",
    description: "Bright, welcoming bedroom surprise for mommy and the newborn with customized welcome poster and floor balloon pool.",
    inclusions: [
      "120 Metallic Pastel Balloons (Floor & Ceiling with Ribbons)",
      "Custom Name Poster: 'Welcome Home [Baby Name]'",
      "2 Foil Baby Feet (24 inches)",
      "Warm LED String Lights across bedroom",
      "Special Mom & Dad Congratulations Ribbon"
    ],
    tags: ["Room Surprise", "Welcome Baby", "Newborn"]
  },

  // ==========================================
  // 5. WEDDING (EXACT 13 SERVICES from wedding.html & wedding-packages.html)
  // ==========================================
  {
    id: "house-decor",
    title: "House Decoration",
    category: "wedding",
    categoryName: "Wedding",
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    rating: 4.9,
    reviewsCount: 240,
    badge: "TRADITIONAL",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "3 - 4 Hours",
    description: "Complete traditional home decoration for weddings including front gate pandals, vibrant LED string lights, fresh banana tree pillars, marigold entrance torans, and courtyard styling.",
    inclusions: [
      "Entrance Banana Trees with Fresh Floral Garlands",
      "Front Facade & Terrace Rice Light Pandal (Up to 100m)",
      "Marigold Toran for Main Doorway",
      "Courtyard Rangoli & Traditional Brass Urli with Floating Petals",
      "Complete on-site setup by our certified wedding florists"
    ],
    tags: ["Pandals", "Lighting", "Banana Trees", "Flowers"]
  },
  {
    id: "nalugu-snanam",
    title: "Nalugu & Mangala Snanam Decoration",
    category: "wedding",
    categoryName: "Wedding",
    price: 7499,
    originalPrice: 9499,
    discount: 21,
    rating: 4.9,
    reviewsCount: 185,
    badge: "RITUAL SPECIAL",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "2 - 3 Hours",
    description: "Auspicious yellow and orange marigold setup designed for ritual purifications, Nalugu and Mangala Snanam. Features traditional brass urlis, wooden peeta, flower jewellery for the bride/groom, and vibrant backdrop frames.",
    inclusions: [
      "Traditional Brass Urli with fresh yellow marigold & rose petals",
      "Floral Backdrop Frame with yellow drapery & tassels",
      "Handcrafted Flower Jewellery Set for Bride",
      "Two Wooden / Brass Peetas (Seating Stools)",
      "Haldi Bowls, Kunkum plates & Traditional ritual props"
    ],
    tags: ["Traditional decorations", "Flower jewellery", "Nallu items"]
  },
  {
    id: "function-hall-decor",
    title: "Function Hall Flower Decoration",
    category: "wedding",
    categoryName: "Wedding",
    price: 24999,
    originalPrice: 32999,
    discount: 24,
    rating: 5.0,
    reviewsCount: 310,
    badge: "GRAND STAGE",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "4 - 6 Hours",
    description: "Grand banquet hall and convention center wedding styling. Includes majestic grand entrance arch, mandapam / stage backdrop with exotic flowers, couple sofa, aisle walkway runners, and chandeliers.",
    inclusions: [
      "Grand Hall Entrance Floral Arch with welcome board",
      "Main Wedding Mandap / Stage with Royal Backdrop & Lighting",
      "Exclusive Maharaja Couple Sofa / Royal Chairs",
      "Red Carpet / Floral Aisle Walkway with pillars",
      "Round Table centerpieces with floral vases"
    ],
    tags: ["Entrance", "Stage", "Reception", "Flower decoration"]
  },
  {
    id: "catering",
    title: "Catering",
    category: "wedding",
    categoryName: "Wedding",
    price: 49999,
    originalPrice: 59999,
    discount: 17,
    rating: 4.8,
    reviewsCount: 420,
    badge: "MULTI-CUISINE",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "Full Day Service",
    description: "Hygienic, authentic traditional and multi-cuisine wedding catering. Includes welcome mocktails, live chaat counter, traditional banana leaf / buffet service, signature curries, biryani, artisanal breads, and decadent desserts.",
    inclusions: [
      "Welcome Drinks & Live Mocktail Station",
      "Live Street Food / Chaat Counters",
      "Multi-course Traditional Vegetarian Feast (Banana leaf or buffet)",
      "3 Signature Sweets & Hot Desserts (Jalebi, Gulab Jamun, Halwa)",
      "Professional uniformed serving staff & premium cutlery"
    ],
    tags: ["Customizable veg menu", "Buffet service", "Live counters"]
  },
  {
    id: "sangyam-sweets",
    title: "Sangyam Sweets",
    category: "wedding",
    categoryName: "Wedding",
    price: 4999,
    originalPrice: 5999,
    discount: 17,
    rating: 4.9,
    reviewsCount: 190,
    badge: "PURE GHEE",
    image: "assets/sangyam-sweets.jpg",
    gallery: ["assets/sangyam-sweets.jpg"],
    setupDuration: "Delivered to Venue",
    description: "Handcrafted authentic wedding sweets and savory snacks made with pure cow ghee. Packaged in customized wedding gift boxes, perfect for guest welcome and rituals.",
    inclusions: [
      "Pure Desi Ghee Motichoor Laddoos & Kaju Katli",
      "Authentic Regional Sweets (Mysore Pak, Badusha, Peda)",
      "Crunchy Savories (Murukku, Mixture, Ribbon Pakoda)",
      "Customized Embossed Wedding Gift Boxes",
      "Fresh batch preparation with guaranteed shelf-life testing"
    ],
    tags: ["Traditional sweets", "Snacks", "Pure Ghee", "Sangyam"]
  },
  {
    id: "photo-video",
    title: "Photo & Videography",
    category: "wedding",
    categoryName: "Wedding",
    price: 29999,
    originalPrice: 39999,
    discount: 25,
    rating: 5.0,
    reviewsCount: 260,
    badge: "4K CINEMATIC",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "Event Duration",
    description: "Top-tier wedding cinematographers capturing every emotional ritual and candid smile. Includes high-res digital albums, 4K cinematic wedding teaser, drone footage, and traditional full-length coverage.",
    inclusions: [
      "2 Candid Photographers + 2 Traditional Cameras",
      "4K Cinematic Wedding Teaser (3-5 minutes)",
      "Full HD Traditional Wedding Film (60-90 minutes)",
      "Aerial Drone Coverage for grand venue shots",
      "Premium Leather Photobook Album (100 pages, 300+ photos)"
    ],
    tags: ["Traditional & candid photography", "4K Video", "Drone"]
  },
  {
    id: "melam",
    title: "Melam",
    category: "wedding",
    categoryName: "Wedding",
    price: 8499,
    originalPrice: 10999,
    discount: 23,
    rating: 4.8,
    reviewsCount: 140,
    badge: "AUSPICIOUS",
    image: "assets/traditional-melam.jpg",
    gallery: ["assets/traditional-melam.jpg"],
    setupDuration: "Ritual Timings",
    description: "Master musicians providing soul-stirring auspicious melodies for your muhurat and Baraat processions. Traditional Nadaswaram, Thavil, Punjabi Dhol, and Shehnai troupes.",
    inclusions: [
      "Traditional Nadaswaram & Thavil Vidwans Troupe",
      "Punjabi Dhol Beats for energetic Baraat entry",
      "Auspicious Shehnai music for morning muhurat rituals",
      "Traditional ethnic attire for all performers",
      "Full sound reinforcement system included"
    ],
    tags: ["Nadaswaram", "Dhol", "Traditional music"]
  },
  {
    id: "special-events",
    title: "Special Events",
    category: "wedding",
    categoryName: "Wedding",
    price: 11999,
    originalPrice: 14999,
    discount: 20,
    rating: 4.9,
    reviewsCount: 175,
    badge: "THEME DECOR",
    image: "assets/special-events-pyro.jpg",
    gallery: ["assets/special-events-pyro.jpg"],
    setupDuration: "3 Hours",
    description: "Full-scale themed pre-wedding parties and grand receptions. Includes concept design, special lighting, cold fire entry pyrotechnics, dry ice smoke, and personalized themes.",
    inclusions: [
      "Thematic Concept & Custom Lighting Rig",
      "Cold Pyro Sparkulars for Grand Bride & Groom Entry",
      "Heavy Dry Ice Fog for magical first dance",
      "Custom Monogram Floor Projection & Neon Backdrops",
      "Dedicated On-Site Event Coordinator"
    ],
    tags: ["Sangeet", "Reception", "Theme events", "Cold Pyro"]
  },
  {
    id: "musical-events",
    title: "Musical Events",
    category: "wedding",
    categoryName: "Wedding",
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    rating: 4.9,
    reviewsCount: 160,
    badge: "LIVE BAND",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "3 Hours Show",
    description: "Enthralling live musical bands, acoustic singers, Sufi ensembles, and classical fusion orchestras to keep your wedding guests mesmerized throughout the evening.",
    inclusions: [
      "Live Acoustic / Bollywood / Sufi Fusion Band",
      "Professional Stage Audio & Line-Array Speakers",
      "Stage Lighting, Moving Heads & LED Par Cans",
      "Sound Engineer & Stage Tech Crew",
      "Customized 3-Hour Musical Performance Setlist"
    ],
    tags: ["Live music", "Orchestra", "Cultural programs"]
  },
  {
    id: "sangyam-bags",
    title: "Sangyam Bags",
    category: "wedding",
    categoryName: "Wedding",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.8,
    reviewsCount: 215,
    badge: "RETURN GIFTS",
    image: "assets/sangyam-bags.jpg",
    gallery: ["assets/sangyam-bags.jpg"],
    setupDuration: "Delivered in Bulk",
    description: "Exquisitely designed wedding favor bags featuring silk brocade, jute-cotton, or golden foil prints with bride and groom names. Perfect for distributing sweets, clothes, and tamboolam.",
    inclusions: [
      "Customized High-Quality Fabric / Paper Gift Bags",
      "Personalized Gold Foil Monogram (Names & Date)",
      "Traditional Tamboolam Coconut & Betel Leaf holders",
      "Choice of Vibrant Colors (Red, Gold, Royal Blue, Pink)",
      "Bulk order door delivery across your chosen venue"
    ],
    tags: ["Return gifts", "Customized bags", "Favors"]
  },
  {
    id: "bridal-makeup",
    title: "Bridal Makeup",
    category: "wedding",
    categoryName: "Wedding",
    price: 14999,
    originalPrice: 18999,
    discount: 21,
    rating: 5.0,
    reviewsCount: 280,
    badge: "CELEBRITY ARTISTS",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "3 Hours Session",
    description: "Certified celebrity bridal hair and makeup artists providing HD and Airbrush makeup that stays flawless for 16+ hours through tearful farewells and intense photo flashes.",
    inclusions: [
      "HD / Airbrush Bridal Makeup using luxury international brands (MAC, Huda, Dior)",
      "Traditional / Modern Bridal Hairstyling with fresh floral gajras",
      "Saree / Lehenga Draping & Jewellery Setting",
      "Touch-up kit for reception & muhurat",
      "Optional Family / Bridesmaids Makeup Add-ons available"
    ],
    tags: ["Professional bridal makeup", "HD & Airbrush", "Styling"]
  },
  {
    id: "mehandi",
    title: "Mehandi",
    category: "wedding",
    categoryName: "Wedding",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    rating: 4.9,
    reviewsCount: 310,
    badge: "ORGANIC HENNA",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "4 Hours Session",
    description: "Master henna artists creating intricate Arabic, Marwari, floral, and portrait bridal mehendi with 100% organic, chemical-free henna paste for rich dark mahogany stains.",
    inclusions: [
      "Full Arm & Leg Intricate Bridal Henna with personalized motifs (Couple portrait, wedding date)",
      "Team of 3+ Henna Artists for wedding guests & family",
      "100% Organic Home-Brewed Henna Cones with nilgiri/eucalyptus oils",
      "Sealing Clove Spray & Post-Mehendi Care Balm for deep dark color",
      "Mehendi lounge cushion seating styling"
    ],
    tags: ["Bridal & guest mehendi", "Organic Henna", "Dark Stain"]
  },
  {
    id: "sangeet",
    title: "Sangeet",
    category: "wedding",
    categoryName: "Wedding",
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    rating: 4.9,
    reviewsCount: 220,
    badge: "PARTY & DJ",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"],
    setupDuration: "Event Duration",
    description: "Electrifying Sangeet night choreography and entertainment. Includes dance choreographers for family rehearsals, energetic wedding DJ with concert sound, and dazzling dance-floor LED screens.",
    inclusions: [
      "Professional Bollywood & Folk Dance Choreographer for Family Rehearsals (7 sessions)",
      "Top Club / Wedding DJ with customized track mixing",
      "Concert Stage Sound, Truss Lighting & Illuminated LED Dance Floor",
      "Fun Wedding Emcee / Anchor for interactive couple games",
      "Props (LED sticks, sunglasses, dhols) for ultimate party vibe"
    ],
    tags: ["Dance", "Music & entertainment", "Sangeet DJ"]
  },

  // ==========================================
  // 6. CORPORATE (5 packages from corporate.html)
  // ==========================================
  {
    id: "corporate-office-milestone-decor",
    title: "Corporate Milestone & Office Celebration Decor",
    category: "corporate",
    categoryName: "Corporate",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    rating: 4.9,
    reviewsCount: 165,
    badge: "BUSINESS",
    image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
    ],
    setupDuration: "2 Hours",
    description: "Professional office anniversary or company milestone balloon arch with brand colors, metallic pillars, and stage balloon bouquets.",
    inclusions: [
      "200 Brand-Aligned Chrome & Metallic Balloons (PMS Match)",
      "Reception Entrance Balloon Arch (8x7 ft)",
      "6 Helium Balloon Bunches on Conference Tables",
      "1 Foil Number Milestone Balloon (e.g., '10 Years')",
      "Quiet after-hours or early morning setup by corporate team"
    ],
    tags: ["Office Decor", "Foundation Day", "Brand Colors"]
  },
  {
    id: "corporate-annual-day-grand-stage",
    title: "Grand Corporate Annual Day & Conference Stage Decor",
    category: "corporate",
    categoryName: "Corporate",
    price: 6999,
    originalPrice: 9499,
    discount: 26,
    rating: 5.0,
    reviewsCount: 210,
    badge: "EXECUTIVE",
    image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
    ],
    setupDuration: "3 Hours",
    description: "Grand auditorium stage backdrop decoration with balloon clusters, customized company logo board, and VIP entry podium styling.",
    inclusions: [
      "350 Chrome & Matte Balloons matching corporate palette",
      "Auditorium Stage Framing with dual organic pillars",
      "VIP Entrance Walkway Ribbon Cutting Setup",
      "Custom Acrylic Company Logo Emblem",
      "GST Invoice with dedicated B2B account manager"
    ],
    tags: ["Annual Day", "Townhall", "Auditorium"]
  },
  {
    id: "corporate-product-launch-balloon-arch",
    title: "Corporate Product Launch Ribbon Cutting Decor",
    category: "corporate",
    categoryName: "Corporate",
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    rating: 4.8,
    reviewsCount: 140,
    badge: "LAUNCH",
    image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
    ],
    setupDuration: "2.5 Hours",
    description: "Sleek retail store or product showcase entrance arch with red carpet runner, brass stanchions with velvet ropes, and ceremonial scissors.",
    inclusions: [
      "Grand Store Entrance Balloon Arch (250 Balloons)",
      "Red Carpet Runway (15 ft length)",
      "4 Golden Stanchion Poles with Red Velvet Ropes",
      "Ribbon Cutting Stand with Golden Scissors on Tray",
      "Product Pedestal Spotlight Highlighting"
    ],
    tags: ["Product Launch", "Store Opening", "Ribbon Cutting"]
  },
  {
    id: "corporate-cubicle-bay-festive-decor",
    title: "Office Workstation & Cubicle Festive Surprise",
    category: "corporate",
    categoryName: "Corporate",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.7,
    reviewsCount: 190,
    badge: "FESTIVE",
    image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
    ],
    setupDuration: "2 Hours",
    description: "Transform open cubicle bays and workstations for Diwali, New Year, or Christmas with ceiling hangings and desk bunches.",
    inclusions: [
      "150 Ceiling Suspended Metallic Balloons with Ribbons",
      "10 Desktop Balloon Bouquets for Department Pods",
      "Festive Bunting & LED Warm Rice Lights across bays",
      "Cafeteria / Breakout Zone Balloon Drop",
      "Quick clean-up safe adhesives used"
    ],
    tags: ["Cubicle Decor", "Diwali", "Office Party"]
  },
  {
    id: "corporate-executive-townhall-stage-backdrop",
    title: "Executive Townhall & Leadership Meet Backdrop",
    category: "corporate",
    categoryName: "Corporate",
    price: 7499,
    originalPrice: 9999,
    discount: 25,
    rating: 5.0,
    reviewsCount: 110,
    badge: "PREMIUM",
    image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
    gallery: [
      "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
    ],
    setupDuration: "3 Hours",
    description: "Sleek, minimalist conference backdrop for quarterly townhalls, board meetings, and high-level leadership summits.",
    inclusions: [
      "Matte Black & Chrome Platinum Architectural Balloon Frame",
      "Dual Stage Podiums with Branded Floral Accents",
      "Sound-Dampened Backdrop Panel Integration",
      "Conference Stage LED Uplighting (Pair of 4 Lights)",
      "Dedicated Corporate Operations Supervisor"
    ],
    tags: ["Townhall", "Leadership Meet", "Board Meeting"]
  },

  // ==========================================
  // 7. GIFTS MARKET (EXACT 12 GIFTS from marketplace.html)
  // ==========================================
  {
    id: "gift-01",
    title: "Soft Teddy Bear",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.8,
    reviewsCount: 320,
    badge: "POPULAR",
    image: "assets/soft-teddy-bear-hero.jpg",
    gallery: ["assets/soft-teddy-bear-hero.jpg"],
    setupDuration: "Same Day Delivery",
    description: "Adorable, ultra-soft plush teddy bear crafted with hypoallergenic material. A timeless gift for birthdays, anniversaries, and heartfelt surprises.",
    inclusions: [
      "Premium Soft Fur Plush Teddy Bear (35cm)",
      "Gift Ribbon & Greeting Note Card",
      "Safe Dust-Free Packaging"
    ],
    tags: ["Gifts for Boys", "Gifts for Girls", "TeddyJoy"]
  },
  {
    id: "gift-02",
    title: "Personalized Photo Mug",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.6,
    reviewsCount: 210,
    badge: "CUSTOM",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "High-grade ceramic coffee mug customized with your favorite memory and quote in vibrant, dishwasher-safe sublimation print.",
    inclusions: [
      "325ml Premium Ceramic Gloss Mug",
      "High-Definition Photo & Name Printing",
      "Shockproof Thermocol Gift Box"
    ],
    tags: ["Gifts for Men", "Gifts for Women", "Archies"]
  },
  {
    id: "gift-03",
    title: "Luxury Gift Hamper for Women",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.7,
    reviewsCount: 185,
    badge: "LUXURY",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Express Delivery",
    description: "Curated luxury pampering hamper featuring scented soy candles, artisan bath bombs, Ferrero Rocher chocolates, and greeting card in a golden-embossed reusable box.",
    inclusions: [
      "Aromatic Soy Wax Jar Candle",
      "Assorted Artisan Chocolates (8 Pcs)",
      "Rose Scented Bath Salts & Loofah",
      "Gold Embossed Reusable Keepsake Box"
    ],
    tags: ["Gifts for Women", "Wedding Gifts", "Archies"]
  },
  {
    id: "gift-04",
    title: "Men's Analog Watch",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.5,
    reviewsCount: 98,
    badge: "ELEGANT",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "Sleek stainless steel analog timepiece featuring mineral glass dial, genuine leather strap, and water resistance in a signature presentation box.",
    inclusions: [
      "Classic Analog Chronograph Watch",
      "Genuine Leather Strap (Brown/Black)",
      "1-Year Manufacturer Warranty Card",
      "Luxury Velvet Lined Gift Box"
    ],
    tags: ["Gifts for Men", "Archies", "Analog Watch"]
  },
  {
    id: "gift-05",
    title: "Fresh Red Rose Bouquet",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviewsCount: 412,
    badge: "FRESH",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "2-Hour Express Delivery",
    description: "Bunch of 20 hand-picked Dutch red roses wrapped in matte black paper and tied with a crimson satin ribbon.",
    inclusions: [
      "20 Fresh Dutch Long-Stem Red Roses",
      "Premium Matte Black & Gold Wrapping",
      "Satin Ribbon Bow & Greeting Note Card",
      "Flower Food Sachet for Longevity"
    ],
    tags: ["Flowers", "Gifts for Women", "FlowerAura"]
  },
  {
    id: "gift-06",
    title: "Ferrero Rocher Chocolate Box",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.6,
    reviewsCount: 276,
    badge: "SWEET",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "Crispy hazelnut chocolate pralines encased in gold foil, guaranteed to sweeten any celebration.",
    inclusions: [
      "16 Pieces Authentic Ferrero Rocher Pralines",
      "Luxury Transparent Gift Case",
      "Decorative Gift Ribbon & Card"
    ],
    tags: ["Chocolates", "Gifts for Women", "Gifts for Men", "Ferrero Rocher"]
  },
  {
    id: "gift-07",
    title: "Remote Control Car for Kids",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.4,
    reviewsCount: 190,
    badge: "KIDS SPECIAL",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "High-speed drift RC racing sports car with LED headlights, rechargeable battery pack, and ergonomic remote controller.",
    inclusions: [
      "1:16 Scale RC Racing Sports Car",
      "2.4GHz Wireless Remote Controller",
      "Rechargeable Lithium Battery & USB Cable"
    ],
    tags: ["Gifts for Boys", "Archies", "RC Car"]
  },
  {
    id: "gift-08",
    title: "Chocolate Truffle Cake (500g)",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.7,
    reviewsCount: 305,
    badge: "EGGLESS",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "2-Hour Express Delivery",
    description: "Decadent eggless dark chocolate truffle cake layered with rich Belgian ganache and chocolate curls.",
    inclusions: [
      "500g Fresh Baked Eggless Chocolate Truffle Cake",
      "Celebration Sparkler Candle & Cake Knife",
      "Temperature-Controlled Delivery Box"
    ],
    tags: ["Cakes", "FlowerAura", "Eggless Truffle"]
  },
  {
    id: "gift-09",
    title: "Elegant Wedding Greeting Card",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 49,
    originalPrice: 99,
    discount: 51,
    rating: 4.5,
    reviewsCount: 134,
    badge: "HEARTFELT",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "Intricately embossed laser-cut metallic gold greeting card with heartfelt warm wishes for newlyweds.",
    inclusions: [
      "Laser Cut Embossed Wedding Card",
      "Matching Gold Foil Envelope",
      "Custom Message Printing Option"
    ],
    tags: ["Cards", "Wedding Gifts", "Archies"]
  },
  {
    id: "gift-10",
    title: "Digital Invitation Video",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.6,
    reviewsCount: 97,
    badge: "DIGITAL",
    image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Delivered in 2 Hours",
    description: "Customized 1080p full HD animated video invite with background music, couple photos, event dates, and GPS venue directions for WhatsApp sharing.",
    inclusions: [
      "Full HD Animated Video Invitation (MP4)",
      "Custom Background Score & Couple Photos",
      "Unlimited WhatsApp Sharing License"
    ],
    tags: ["Digital Invitations", "Archies", "Video Invite"]
  },
  {
    id: "gift-11",
    title: "Return Gifts Combo (Set of 10)",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    rating: 4.8,
    reviewsCount: 221,
    badge: "BULK SPECIAL",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "Set of 10 handcrafted brass diyas and aromatic wax votives packed in organza potlis for baby shower and birthday return gifts.",
    inclusions: [
      "10 Handcrafted Traditional Brass Votives",
      "10 Organza Ribbon Pouch Bags",
      "Thank You Note Attached to Each"
    ],
    tags: ["Returns Gifts", "Archies", "Set of 10"]
  },
  {
    id: "gift-12",
    title: "Gift Hamper for Boys",
    category: "gifts",
    categoryName: "Gifts Market",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.7,
    reviewsCount: 145,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"],
    setupDuration: "Same Day Delivery",
    description: "Fun celebration hamper for young boys containing action figures, chocolate bars, a superhero cap, and a party badge.",
    inclusions: [
      "Superhero Toy Figurine",
      "Assorted Chocolate Energy Bars (4 Pcs)",
      "Embroidered Snapback Cap",
      "Celebration Keepsake Box"
    ],
    tags: ["Gifts for Boys", "Archies", "Hamper"]
  }
];

// Now replace the products: [...] in data.js
const productsStartIdx = dataContent.indexOf('  products: [');
const reviewsStartIdx = dataContent.indexOf('  reviews: [');

if (productsStartIdx === -1 || reviewsStartIdx === -1) {
  console.error('Could not find products array in data.js');
  process.exit(1);
}

const formattedProducts = JSON.stringify(EXACT_PRODUCTS, null, 4)
  .split('\n')
  .map(line => '  ' + line)
  .join('\n');

const newContent = dataContent.slice(0, productsStartIdx) +
  '  products: ' + formattedProducts.trim() + ',\n' +
  dataContent.slice(reviewsStartIdx);

fs.writeFileSync(dataJsPath, newContent, 'utf-8');
console.log('✅ data.js successfully updated with exact 51 products!');
console.log('Category Counts:');
const counts = {};
EXACT_PRODUCTS.forEach(p => counts[p.category] = (counts[p.category] || 0) + 1);
console.log(counts);
