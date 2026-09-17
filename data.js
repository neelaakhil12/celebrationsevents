// BalloonDekor Comprehensive Dataset
const SITE_DATA = {
  brand: {
    name: "Celebration Events",
    tagline: "India ka Party Expert",
    phone: "+91 82820 25444",
    whatsapp: "918282025444",
    rating: "4.9/5",
    completedEvents: "5,00,000+",
    citiesCount: "100+"
  },
  cities: [
    { id: "delhi", name: "Delhi NCR", state: "Delhi", popular: true },
    { id: "mumbai", name: "Mumbai", state: "Maharashtra", popular: true },
    { id: "bangalore", name: "Bangalore", state: "Karnataka", popular: true },
    { id: "hyderabad", name: "Hyderabad", state: "Telangana", popular: true },
    { id: "pune", name: "Pune", state: "Maharashtra", popular: true },
    { id: "kolkata", name: "Kolkata", state: "West Bengal", popular: true },
    { id: "chennai", name: "Chennai", state: "Tamil Nadu", popular: true },
    { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", popular: true },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan", popular: true },
    { id: "gurgaon", name: "Gurgaon", state: "Haryana", popular: true },
    { id: "noida", name: "Noida", state: "Uttar Pradesh", popular: true },
    { id: "chandigarh", name: "Chandigarh", state: "Punjab", popular: true },
    { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", popular: false },
    { id: "indore", name: "Indore", state: "Madhya Pradesh", popular: false },
    { id: "surat", name: "Surat", state: "Gujarat", popular: false },
    { id: "kochi", name: "Kochi", state: "Kerala", popular: false }
  ],
  categories: [
    {
      id: "birthday",
      name: "Birthday Decoration",
      icon: "🎂",
      badge: "POPULAR",
      image: "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      desc: "Stunning birthday setups for home, terrace & banquet"
    },
    {
      id: "kids",
      name: "Kids Themes",
      icon: "🦄",
      badge: "TRENDING",
      image: "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
      desc: "Cocomelon, Frozen, Superhero, Jungle & Barbie themes"
    },
    {
      id: "anniversary",
      name: "Romantic & Anniversary",
      icon: "❤️",
      badge: "HOT",
      image: "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      desc: "Surprise room, canopy, candlelight & heart balloon decor"
    },
    {
      id: "baby-shower",
      name: "Baby Shower & Welcome",
      icon: "🍼",
      badge: "LOVED",
      image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      desc: "Celebrate motherhood with gentle pastel setups"
    },
    {
      id: "wedding",
      name: "Wedding",
      icon: "💍",
      badge: "SPECIAL",
      image: "https://cdn.balloondekor.com/33/wedding-decoration-0c8b0952-fe10-44cb-ac91-8f640239beaf.webp",
      desc: "Haldi marigold setups, car decor & bridal showers"
    },
    {
      id: "corporate",
      name: "Corporate & Office",
      icon: "💼",
      badge: "BUSINESS",
      image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      desc: "Office anniversary, annual day & milestone celebrations"
    }
  ],
  weddingServices: [
    {
      id: "house-decor",
      title: "House Decoration",
      icon: "house",
      badge: "TRADITIONAL",
      desc: "Pandals, lighting, banana trees, flowers & more",
      longDesc: "Complete traditional home decoration for weddings including front gate pandals, vibrant LED string lights, fresh banana tree pillars, marigold entrance torans, and courtyard styling.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Entrance Banana Trees with Fresh Floral Garlands",
        "Front Facade & Terrace Rice Light Pandal (Up to 100m)",
        "Marigold Toran for Main Doorway",
        "Courtyard Rangoli & Traditional Brass Urli with Floating Petals",
        "Complete on-site setup by our certified wedding florists"
      ]
    },
    {
      id: "nalugu-snanam",
      title: "Nalugu & Mangala Snanam Decoration",
      icon: "flower",
      badge: "RITUAL SPECIAL",
      desc: "Traditional decorations, flower jewellery, nallu items",
      longDesc: "Auspicious yellow and orange marigold setup designed for ritual purifications, Nalugu and Mangala Snanam. Features traditional brass urlis, wooden peeta, flower jewellery for the bride/groom, and vibrant backdrop frames.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Traditional Brass Urli with fresh yellow marigold & rose petals",
        "Floral Backdrop Frame with yellow drapery & tassels",
        "Handcrafted Flower Jewellery Set for Bride",
        "Two Wooden / Brass Peetas (Seating Stools)",
        "Haldi Bowls, Kunkum plates & Traditional ritual props"
      ]
    },
    {
      id: "function-hall-decor",
      title: "Function Hall Flower Decoration",
      icon: "hall",
      badge: "GRAND STAGE",
      desc: "Entrance, stage, reception, flower decoration & more",
      longDesc: "Grand banquet hall and convention center wedding styling. Includes majestic grand entrance arch, mandapam / stage backdrop with exotic flowers, couple sofa, aisle walkway runners, and chandeliers.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Grand Hall Entrance Floral Arch with welcome board",
        "Main Wedding Mandap / Stage with Royal Backdrop & Lighting",
        "Exclusive Maharaja Couple Sofa / Royal Chairs",
        "Red Carpet / Floral Aisle Walkway with pillars",
        "Round Table centerpieces with floral vases"
      ]
    },
    {
      id: "catering",
      title: "Catering",
      icon: "catering",
      badge: "MULTI-CUISINE",
      desc: "Customizable veg menu with multiple options",
      longDesc: "Hygienic, authentic traditional and multi-cuisine wedding catering. Includes welcome mocktails, live chaat counter, traditional banana leaf / buffet service, signature curries, biryani, artisanal breads, and decadent desserts.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Welcome Drinks & Live Mocktail Station",
        "Live Street Food / Chaat Counters",
        "Multi-course Traditional Vegetarian Feast (Banana leaf or buffet)",
        "3 Signature Sweets & Hot Desserts (Jalebi, Gulab Jamun, Halwa)",
        "Professional uniformed serving staff & premium cutlery"
      ]
    },
    {
      id: "sangyam-sweets",
      title: "Sangyam Sweets",
      icon: "sweets",
      badge: "PURE GHEE",
      desc: "Traditional sweets & snacks",
      longDesc: "Handcrafted authentic wedding sweets and savory snacks made with pure cow ghee. Packaged in customized wedding gift boxes, perfect for guest welcome and rituals.",
      image: "assets/sangyam-sweets.jpg",
      inclusions: [
        "Pure Desi Ghee Motichoor Laddoos & Kaju Katli",
        "Authentic Regional Sweets (Mysore Pak, Badusha, Peda)",
        "Crunchy Savories (Murukku, Mixture, Ribbon Pakoda)",
        "Customized Embossed Wedding Gift Boxes",
        "Fresh batch preparation with guaranteed shelf-life testing"
      ]
    },
    {
      id: "photo-video",
      title: "Photo & Videography",
      icon: "camera",
      badge: "4K CINEMATIC",
      desc: "Traditional & candid photography",
      longDesc: "Top-tier wedding cinematographers capturing every emotional ritual and candid smile. Includes high-res digital albums, 4K cinematic wedding teaser, drone footage, and traditional full-length coverage.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "2 Candid Photographers + 2 Traditional Cameras",
        "4K Cinematic Wedding Teaser (3-5 minutes)",
        "Full HD Traditional Wedding Film (60-90 minutes)",
        "Aerial Drone Coverage for grand venue shots",
        "Premium Leather Photobook Album (100 pages, 300+ photos)"
      ]
    },
    {
      id: "melam",
      title: "Melam",
      icon: "drums",
      badge: "AUSPICIOUS",
      desc: "Nadaswaram, Dhol, Traditional music",
      longDesc: "Master musicians providing soul-stirring auspicious melodies for your muhurat and Baraat processions. Traditional Nadaswaram, Thavil, Punjabi Dhol, and Shehnai troupes.",
      image: "assets/traditional-melam.jpg",
      inclusions: [
        "Traditional Nadaswaram & Thavil Vidwans Troupe",
        "Punjabi Dhol Beats for energetic Baraat entry",
        "Auspicious Shehnai music for morning muhurat rituals",
        "Traditional ethnic attire for all performers",
        "Full sound reinforcement system included"
      ]
    },
    {
      id: "special-events",
      title: "Special Events",
      icon: "sparkles",
      badge: "THEME DECOR",
      desc: "Sangeet, Reception, Theme events",
      longDesc: "Full-scale themed pre-wedding parties and grand receptions. Includes concept design, special lighting, cold fire entry pyrotechnics, dry ice smoke, and personalized themes.",
      image: "assets/special-events-pyro.jpg",
      inclusions: [
        "Thematic Concept & Custom Lighting Rig",
        "Cold Pyro Sparkulars for Grand Bride & Groom Entry",
        "Heavy Dry Ice Fog for magical first dance",
        "Custom Monogram Floor Projection & Neon Backdrops",
        "Dedicated On-Site Event Coordinator"
      ]
    },
    {
      id: "musical-events",
      title: "Musical Events",
      icon: "mic",
      badge: "LIVE BAND",
      desc: "Live music, orchestra, cultural programs",
      longDesc: "Enthralling live musical bands, acoustic singers, Sufi ensembles, and classical fusion orchestras to keep your wedding guests mesmerized throughout the evening.",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Live Acoustic / Bollywood / Sufi Fusion Band",
        "Professional Stage Audio & Line-Array Speakers",
        "Stage Lighting, Moving Heads & LED Par Cans",
        "Sound Engineer & Stage Tech Crew",
        "Customized 3-Hour Musical Performance Setlist"
      ]
    },
    {
      id: "sangyam-bags",
      title: "Sangyam Bags",
      icon: "bag",
      badge: "RETURN GIFTS",
      desc: "Return gifts & customized bags",
      longDesc: "Exquisitely designed wedding favor bags featuring silk brocade, jute-cotton, or golden foil prints with bride and groom names. Perfect for distributing sweets, clothes, and tamboolam.",
      image: "assets/sangyam-bags.jpg",
      inclusions: [
        "Customized High-Quality Fabric / Paper Gift Bags",
        "Personalized Gold Foil Monogram (Names & Date)",
        "Traditional Tamboolam Coconut & Betel Leaf holders",
        "Choice of Vibrant Colors (Red, Gold, Royal Blue, Pink)",
        "Bulk order door delivery across your chosen venue"
      ]
    },
    {
      id: "bridal-makeup",
      title: "Bridal Makeup",
      icon: "makeup",
      badge: "CELEBRITY ARTISTS",
      desc: "Professional bridal makeup",
      longDesc: "Certified celebrity bridal hair and makeup artists providing HD and Airbrush makeup that stays flawless for 16+ hours through tearful farewells and intense photo flashes.",
      image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "HD / Airbrush Bridal Makeup using luxury international brands (MAC, Huda, Dior)",
        "Traditional / Modern Bridal Hairstyling with fresh floral gajras",
        "Saree / Lehenga Draping & Jewellery Setting",
        "Touch-up kit for reception & muhurat",
        "Optional Family / Bridesmaids Makeup Add-ons available"
      ]
    },
    {
      id: "mehandi",
      title: "Mehandi",
      icon: "henna",
      badge: "ORGANIC HENNA",
      desc: "Bridal & guest mehendi",
      longDesc: "Master henna artists creating intricate Arabic, Marwari, floral, and portrait bridal mehendi with 100% organic, chemical-free henna paste for rich dark mahogany stains.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Full Arm & Leg Intricate Bridal Henna with personalized motifs (Couple portrait, wedding date)",
        "Team of 3+ Henna Artists for wedding guests & family",
        "100% Organic Home-Brewed Henna Cones with nilgiri/eucalyptus oils",
        "Sealing Clove Spray & Post-Mehendi Care Balm for deep dark color",
        "Mehendi lounge cushion seating styling"
      ]
    },
    {
      id: "sangeet",
      title: "Sangeet",
      icon: "dance",
      badge: "PARTY & DJ",
      desc: "Dance, music & entertainment",
      longDesc: "Electrifying Sangeet night choreography and entertainment. Includes dance choreographers for family rehearsals, energetic wedding DJ with concert sound, and dazzling dance-floor LED screens.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      inclusions: [
        "Professional Bollywood & Folk Dance Choreographer for Family Rehearsals (7 sessions)",
        "Top Club / Wedding DJ with customized track mixing",
        "Concert Stage Sound, Truss Lighting & Illuminated LED Dance Floor",
        "Fun Wedding Emcee / Anchor for interactive couple games",
        "Props (LED sticks, sunglasses, dhols) for ultimate party vibe"
      ]
    }
  ],
  addons: [
    { id: "add-led", name: "LED Digit Light (Age/Year)", price: 499, icon: "💡" },
    { id: "add-helium", name: "Set of 5 Metallic Helium Balloons", price: 699, icon: "🎈" },
    { id: "add-cake", name: "Designer Cake Table & Riser Stand", price: 799, icon: "🍰" },
    { id: "add-neon", name: "Neon Sign ('Happy Birthday' / 'Better Together')", price: 899, icon: "✨" },
    { id: "add-petals", name: "Fresh Rose Petals & Tea-light Pathway", price: 549, icon: "🌹" },
    { id: "add-photo", name: "Customized Hanging Polaroids (Set of 16)", price: 399, icon: "📸" }
  ],
  timeSlots: [
    { id: "slot-1", label: "Morning Slot", time: "10:00 AM - 01:00 PM", tag: "Express" },
    { id: "slot-2", label: "Afternoon Slot", time: "01:00 PM - 04:00 PM", tag: "Popular" },
    { id: "slot-3", label: "Evening Slot", time: "04:00 PM - 07:00 PM", tag: "Prime" },
    { id: "slot-4", label: "Night Surprise", time: "07:00 PM - 10:00 PM", tag: "Surprise" },
    { id: "slot-5", label: "Midnight Setup", time: "11:00 PM - 12:00 AM", tag: "Special (+₹400)" }
  ],
  products: [
    {
      id: "simple-balloon-decor-for-home",
      title: "Simple Balloon Decor for Home",
      category: "birthday",
      categoryName: "Birthday Decoration",
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
      categoryName: "Birthday Decoration",
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
      categoryName: "Birthday Decoration",
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      rating: 5.0,
      reviewsCount: 374,
      badge: "TOP RATED",
      image: "https://cdn.balloondekor.com/14/1744890426934.webp",
      gallery: [
        "https://cdn.balloondekor.com/14/1744890426934.webp",
        "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp"
      ],
      setupDuration: "2 - 2.5 Hours",
      description: "Magnificent organic balloon arch frame complemented with custom age numbers, chrome accents, and photo-ready backdrop styling.",
      inclusions: [
        "200 Premium Pastel & Chrome Latex Balloons in Organic Arch",
        "Circular Backdrop Stand (Rental included)",
        "Personalized Cardstock Bunting with Name",
        "2 LED Strip Lights and Ambient Focus Spotlight",
        "Clean Hassle-Free Takedown Guide Included"
      ],
      tags: ["Balloon Arch", "Circular Backdrop", "Milestone Birthday"]
    },
    {
      id: "blush-glow-birthday-theme",
      title: "Blush & Glow Birthday Theme",
      category: "birthday",
      categoryName: "Birthday Decoration",
      price: 2199,
      originalPrice: 2399,
      discount: 8,
      rating: 4.9,
      reviewsCount: 287,
      badge: "ELEGANT",
      image: "https://cdn.balloondekor.com/14/1748087900974.webp",
      gallery: [
        "https://cdn.balloondekor.com/14/1748087900974.webp"
      ],
      setupDuration: "2 Hours",
      description: "Gentle blush peach tones with champagne gold details and warm lighting designed to give your photos an ethereal, soft aesthetic.",
      inclusions: [
        "160 Blush Peach, Cream & Gold Chrome Balloons",
        "White Sheer Net Backdrop with Cascading Balloons",
        "Fairy Twinkle Lights woven into the drapery",
        "Acrylic 'Happy Birthday' Neon Accent Board",
        "Floor Clusters & Floating Ceiling Effect"
      ],
      tags: ["Blush Theme", "Photogenic", "Birthday For Her"]
    },
    {
      id: "boho-theme-birthday-decoration",
      title: "Boho Theme Luxury Birthday Decor",
      category: "birthday",
      categoryName: "Birthday Decoration",
      price: 8499,
      originalPrice: 9999,
      discount: 15,
      rating: 4.9,
      reviewsCount: 357,
      badge: "LUXURY",
      image: "https://cdn.balloondekor.com/images/14/bf89ee2c-957e-4264-a433-c5e17a9bcbf5.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/14/bf89ee2c-957e-4264-a433-c5e17a9bcbf5.webp"
      ],
      setupDuration: "3 Hours",
      description: "Earthy pampas grass accents, rustic wooden arch, customized signage, and organic desert-sand balloon garland for a high-end celebration.",
      inclusions: [
        "300 Organic Matte Balloons (Terracotta, Desert Sand, White Sand & Olive)",
        "Hexagonal / Arch Wooden Frame Setup",
        "Natural Pampas Grass Floral Bouquets",
        "Custom Wooden Acrylic Name Engraving",
        "Warm Warm-white LED Flood Uplights"
      ],
      tags: ["Luxury Boho", "Grand Setup", "Pampas Floral"]
    },
    {
      id: "cocomelon-kids-theme",
      title: "Cocomelon Fun Kids Birthday Theme",
      category: "kids",
      categoryName: "Kids Themes",
      price: 2999,
      originalPrice: 3899,
      discount: 23,
      rating: 4.9,
      reviewsCount: 420,
      badge: "KIDS FAVORITE",
      image: "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp"
      ],
      setupDuration: "2 Hours",
      description: "Bring JJ and friends to life! Bright watermelon colors, cheerful rainbow balloon arch, and high-resolution Cocomelon character cutouts.",
      inclusions: [
        "180 Green, Yellow, Blue & Red Theme Balloons",
        "Large Cocomelon Character Cutouts (Set of 4)",
        "Watermelon Theme Foil Balloons (2 pieces)",
        "Rainbow Balloon Garland Arch with Birthday Banner",
        "Kids Safety-certified materials only"
      ],
      tags: ["Kids 1st-5th", "Cocomelon", "Vibrant"]
    },
    {
      id: "baby-shark-underwater-theme",
      title: "Baby Shark Underwater Theme",
      category: "kids",
      categoryName: "Kids Themes",
      price: 3199,
      originalPrice: 3999,
      discount: 20,
      rating: 4.8,
      reviewsCount: 290,
      badge: "POPULAR",
      image: "https://cdn.balloondekor.com/images/33/63f93c9c-e24f-483c-88bb-b7352cfd564b.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/33/63f93c9c-e24f-483c-88bb-b7352cfd564b.webp"
      ],
      setupDuration: "2 Hours",
      description: "Doo doo doo doo! Dive into an underwater ocean adventure with baby shark foils, sea bubbles, and blue oceanic balloon garland.",
      inclusions: [
        "Family Baby Shark Foil Balloon Set (5 pieces)",
        "200 Blue, Aqua, Yellow & Pearl White Balloons",
        "Sea Weed & Ocean Animal Foil Accents",
        "Fairy Lights & Ocean Wave Foil Curtains",
        "Name Board Customized for Kid"
      ],
      tags: ["Baby Shark", "Kids Birthday", "Ocean Theme"]
    },
    {
      id: "boss-baby-theme-decor",
      title: "The Boss Baby Theme Decor",
      category: "kids",
      categoryName: "Kids Themes",
      price: 3499,
      originalPrice: 4499,
      discount: 22,
      rating: 4.9,
      reviewsCount: 195,
      badge: "TRENDING",
      image: "https://cdn.balloondekor.com/images/33/509c9e90-fa70-4e5b-bfa0-dd873fc0919e.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/33/509c9e90-fa70-4e5b-bfa0-dd873fc0919e.webp"
      ],
      setupDuration: "2 Hours",
      description: "For the true little boss of the house! Black, powder blue, and chrome silver aesthetic with briefcase and suit cutouts.",
      inclusions: [
        "200 Powder Blue, Black & Metallic Silver Balloons",
        "Life-size Boss Baby Character Backdrop Board",
        "Tie & Briefcase Theme Foil Accents",
        "Custom 'Boss [Kid Name]' Age Signage",
        "Professional On-Site Balloon Sculpting"
      ],
      tags: ["Boss Baby", "Boy Birthday", "Stylish"]
    },
    {
      id: "jungle-safari-kids-party",
      title: "Wild Jungle Safari Theme Decor",
      category: "kids",
      categoryName: "Kids Themes",
      price: 3299,
      originalPrice: 4299,
      discount: 23,
      rating: 4.9,
      reviewsCount: 310,
      badge: "EVERGREEN",
      image: "https://cdn.balloondekor.com/images/33/c9f48859-63fc-4ba5-93b9-63349a3097b0.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/33/c9f48859-63fc-4ba5-93b9-63349a3097b0.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Roar into celebrations! Lush forest greens, tropical palm leaves, lion, tiger, and giraffe jumbo foil balloons.",
      inclusions: [
        "220 Olive Green, Dark Green, Golden & Khaki Balloons",
        "5 Giant Safari Animals Foil Balloons (Lion, Giraffe, Tiger, Zebra, Monkey)",
        "Artificial Tropical Monstera & Palm Leaves",
        "Wooden Stand Frame with 'Wild One' or Birthday Name Bunting",
        "Warm Ambience Fairy Rice Lights"
      ],
      tags: ["Jungle Safari", "1st Birthday", "Animal Foil"]
    },
    {
      id: "frozen-wonderland-theme",
      title: "Frozen Ice Wonderland Theme",
      category: "kids",
      categoryName: "Kids Themes",
      price: 3599,
      originalPrice: 4599,
      discount: 21,
      rating: 5.0,
      reviewsCount: 268,
      badge: "PRINCESS PICK",
      image: "https://cdn.balloondekor.com/images/33/06dd1bb3-1a5a-470c-9d5f-7936b7b46dd4.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/33/06dd1bb3-1a5a-470c-9d5f-7936b7b46dd4.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Magical snowy castle vibes with Elsa and Anna foil cutouts, holographic snowflakes, and icy blue balloon cascade.",
      inclusions: [
        "220 Icy Blue, Metallic Silver, Violet & Snow White Balloons",
        "Elsa & Olaf Character Foil Balloons",
        "6 Holographic Hanging Snowflakes",
        "Silver Shimmer Tinsel Backdrop Curtains",
        "Fairy Lights for Sparkling Ice Castle Feel"
      ],
      tags: ["Frozen", "Princess", "Winter Theme"]
    },
    {
      id: "anniversary-home-decoration",
      title: "Anniversary Home Surprise Decor",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 2199,
      originalPrice: 2999,
      discount: 27,
      rating: 4.9,
      reviewsCount: 165,
      badge: "MOST LOVED",
      image: "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      gallery: [
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
        "https://cdn.balloondekor.com/29/1744791701209.webp"
      ],
      setupDuration: "1.5 Hours",
      description: "The ultimate romantic bedroom or living room surprise for your spouse. Heart-shaped balloon cluster, red metallic accents, and soft romantic lighting.",
      inclusions: [
        "150 Crimson Red & Warm Gold Metallic Balloons",
        "1 Happy Anniversary Banner (Foil / Cardstock)",
        "6 Heart Foil Balloons Floating on Ceiling",
        "Bed decoration with balloon bunches and ribbons",
        "Warm LED fairy lights spanning 15 meters"
      ],
      tags: ["For Husband/Wife", "Romantic Surprise", "Heart Balloons"]
    },
    {
      id: "red-anniversary-home-decor",
      title: "Red Passion Anniversary Canopy & Decor",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 2099,
      originalPrice: 2499,
      discount: 16,
      rating: 4.8,
      reviewsCount: 185,
      badge: "ROMANTIC",
      image: "https://cdn.balloondekor.com/29/1744791701209.webp",
      gallery: [
        "https://cdn.balloondekor.com/29/1744791701209.webp"
      ],
      setupDuration: "2 Hours",
      description: "Intimate canopy or bed setup with cascading fairy lights, red roses inspiration, and celebration backdrop.",
      inclusions: [
        "140 Deep Red & White Pearl Latex Balloons",
        "Heart Shape Arch / Backdrop arrangement",
        "Fairy lights weaving through sheer white drapes",
        "Ribbons attached to ceiling balloons",
        "Custom greeting card and setup cleanup"
      ],
      tags: ["Canopy Decor", "Intimate", "First Night"]
    },
    {
      id: "romantic-anniversary-room-celebration",
      title: "Romantic Anniversary Room Celebration",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 2399,
      originalPrice: 2499,
      discount: 4,
      rating: 4.4,
      reviewsCount: 183,
      badge: "SPECIAL",
      image: "https://cdn.balloondekor.com/29/1744815775277.webp",
      gallery: [
        "https://cdn.balloondekor.com/29/1744815775277.webp"
      ],
      setupDuration: "2 Hours",
      description: "Fill the entire room with love! Floating balloons across the ceiling, path of rose petals, and LED candles.",
      inclusions: [
        "120 Red & Rose Gold Metallic Balloons on Ceiling",
        "Path of Artificial Silk Rose Petals & LED Tea Lights",
        "Love Foil Balloon Script in Center",
        "Curtain Foil Backdrop with fairy string lights",
        "Photo hanging ribbons (bring your own prints)"
      ],
      tags: ["Room Decor", "Rose Petals", "Proposal Ready"]
    },
    {
      id: "anniversary-bliss-setup",
      title: "Anniversary Bliss Ring Setup",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      rating: 4.6,
      reviewsCount: 255,
      badge: "PREMIUM",
      image: "https://cdn.balloondekor.com/29/1744888510950.webp",
      gallery: [
        "https://cdn.balloondekor.com/29/1744888510950.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Modern circular ring backdrop adorned with red, white, and gold organic balloon garland and neon glow sign.",
      inclusions: [
        "Metal Circular Arch Stand",
        "180 Organic Red, White and Gold Chrome Balloons",
        "'Happy Anniversary' LED Neon Signboard (Rental)",
        "2 LED Focus Spotlights",
        "Complete on-time technician execution"
      ],
      tags: ["Ring Stand", "Neon Sign", "Terrace or Hall"]
    },
    {
      id: "happy-anniversary-backdrop-decoration",
      title: "Grand Golden Anniversary Backdrop",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 6499,
      originalPrice: 7899,
      discount: 18,
      rating: 4.6,
      reviewsCount: 135,
      badge: "GRAND",
      image: "https://cdn.balloondekor.com/images/29/fd8f43b0-23c2-4e6c-8000-1e5207b435ff.webp",
      gallery: [
        "https://cdn.balloondekor.com/images/29/fd8f43b0-23c2-4e6c-8000-1e5207b435ff.webp"
      ],
      setupDuration: "3 Hours",
      description: "Fit for 25th or 50th silver/golden jubilees! Grand archway, sequins backdrop, personalized name cutouts and ambient spotlights.",
      inclusions: [
        "300 Chrome Gold, Pearl White & Black Luxury Balloons",
        "Double Arch Backdrop with Shimmer Sequin Wall",
        "Custom Golden Acrylic Lettering with Couple's Names",
        "Warm Amber Light Flood Units (4 pieces)",
        "Complimentary Balloon Bouquet on Cake Table"
      ],
      tags: ["25th Anniversary", "50th Jubilee", "Grand Backdrop"]
    },
    {
      id: "baby-shower-pastel-decor",
      title: "Pastel Dream Baby Shower Decor",
      category: "baby-shower",
      categoryName: "Baby Shower & Welcome",
      price: 2699,
      originalPrice: 3499,
      discount: 22,
      rating: 4.9,
      reviewsCount: 310,
      badge: "MOM FAVORITE",
      image: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
      ],
      setupDuration: "2 Hours",
      description: "Celebrate the arrival of little footprints with charming pastel pink, mint green, and baby blue balloon clusters with 'Baby Shower' or 'Mom To Be' sash.",
      inclusions: [
        "180 Soft Pastel Balloons (Mint, Baby Pink, Lavender, Yellow)",
        "'Baby Shower' Gold Foil Letter Balloons",
        "Baby Bottle, Feet & Stroller Theme Foil Accents",
        "White Net Backdrop with Twinkle Fairy Lights",
        "Complimentary 'Mom-to-Be' Satin Sash"
      ],
      tags: ["Baby Shower", "Pastel Decor", "Mom to Be"]
    },
    {
      id: "newborn-welcome-baby-decor",
      title: "Welcome Baby Home Decor (Boy/Girl)",
      category: "baby-shower",
      categoryName: "Baby Shower & Welcome",
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      rating: 4.9,
      reviewsCount: 275,
      badge: "BEST VALUE",
      image: "https://cdn.balloondekor.com/33/newborn-welcome.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/newborn-welcome.webp"
      ],
      setupDuration: "1.5 Hours",
      description: "Welcoming the newest family member from the hospital! Delightful balloon arch at main entrance and crib decoration.",
      inclusions: [
        "120 Pastel Blue & White / Pastel Pink & White Balloons",
        "1 'Welcome Baby' Foil Banner",
        "2 Large Baby Foil Balloons (Boy / Girl theme)",
        "Door Arch Balloon Garland to greet visitors",
        "Room ribbon streamers and balloon bunches"
      ],
      tags: ["Welcome Home", "Newborn", "Fast Setup"]
    },
    {
      id: "haldi-ceremony-traditional-decor",
      title: "Vibrant Haldi Ceremony Floral & Balloon Decor",
      category: "wedding",
      categoryName: "Wedding",
      price: 3999,
      originalPrice: 5299,
      discount: 25,
      rating: 4.8,
      reviewsCount: 198,
      badge: "WEDDING HIT",
      image: "https://cdn.balloondekor.com/33/haldi-decoration-92abeb45-8776-4485-8300-d177622d3c40.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/haldi-decoration-92abeb45-8776-4485-8300-d177622d3c40.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Bright yellow marigold florals intertwined with mustard and chrome gold balloons, perfect for joyful haldi photo shoots.",
      inclusions: [
        "200 Yellow, Mustard & Metallic Gold Latex Balloons",
        "Artificial Marigold (Genda Phool) Garlands Backdrop",
        "Traditional Wooden Urli Decor (Rental)",
        "Traditional Gotta Patti Umbrellas & Props",
        "Spotlights for vibrant natural glow in pictures"
      ],
      tags: ["Haldi Ceremony", "Marigold Floral", "Pre-Wedding"]
    },
    {
      id: "bachelorette-party-bridal-shower",
      title: "Glam Bachelorette & Bridal Shower Decor",
      category: "wedding",
      categoryName: "Wedding",
      price: 2899,
      originalPrice: 3699,
      discount: 21,
      rating: 4.9,
      reviewsCount: 162,
      badge: "PARTY READY",
      image: "https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp"
      ],
      setupDuration: "2 Hours",
      description: "Celebrate the bride's final fling! Rose gold and silver aesthetics with 'Bride to Be' foil, champagne bottle foil balloons, and photo booth frame.",
      inclusions: [
        "160 Metallic Rose Gold, Champagne & White Balloons",
        "'Bride to Be' Foil Letter Banner (16 inches)",
        "Giant Champagne Bottle & Ring Foil Balloon",
        "Holographic Silver Tinsel Shimmer Fringe Backdrop",
        "Bridal Shower Props & Fun Selfie Cutouts"
      ],
      tags: ["Bachelorette", "Bride To Be", "Girls Night"]
    },
    {
      id: "corporate-office-milestone-decor",
      title: "Corporate Milestone & Office Celebration Decor",
      category: "corporate",
      categoryName: "Corporate & Office",
      price: 4499,
      originalPrice: 5999,
      discount: 25,
      rating: 4.8,
      reviewsCount: 140,
      badge: "PROFESSIONAL",
      image: "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Tailored brand color schemes for office inaugurations, annual days, project success milestones, and festive team gatherings.",
      inclusions: [
        "250 Brand Matching Balloons (Custom 2-3 Color Selection)",
        "Office Entrance Grand Balloon Arch (8x8 ft)",
        "Pillar & Reception Desk Wrap Balloon Garlands",
        "Celebration Foil Banners & Milestone Numbers",
        "Clean, corporate-grade fast installation before office hours"
      ],
      tags: ["Corporate", "Office Decor", "Custom Colors"]
    },
    {
      id: "corporate-annual-day-grand-stage",
      title: "Grand Corporate Annual Day & Conference Stage Decor",
      category: "corporate",
      categoryName: "Corporate & Office",
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      rating: 4.9,
      reviewsCount: 118,
      badge: "EXECUTIVE",
      image: "https://cdn.balloondekor.com/33/annual-day-decor.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/annual-day-decor.webp"
      ],
      setupDuration: "3 Hours",
      description: "Sophisticated stage and podium balloon styling for corporate awards, townhalls, and annual celebrations.",
      inclusions: [
        "350 Chrome & Metallic Balloons in corporate palette",
        "Double Circular Ring Arch Backdrop Frame",
        "Stage Podium & Entrance Pillar Balloon Pillars",
        "LED Spotlights & Focus Lights",
        "On-site supervisor during setup"
      ],
      tags: ["Annual Day", "Conference", "Townhall"]
    },
    {
      id: "baby-shower-teddy-bear-theme",
      title: "Oh Baby Teddy Bear Luxury Theme Setup",
      category: "baby-shower",
      categoryName: "Baby Shower & Welcome",
      price: 3499,
      originalPrice: 4499,
      discount: 22,
      rating: 5.0,
      reviewsCount: 224,
      badge: "TRENDING",
      image: "https://cdn.balloondekor.com/33/teddy-baby-shower.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/teddy-baby-shower.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Charming beige, caramel brown, and pastel white balloon arch featuring giant plush teddy bear and warm golden neon 'Oh Baby' sign.",
      inclusions: [
        "220 Organic Pastel, Mocha & Cream Balloons",
        "Circular Arch Frame with 'Oh Baby' Neon Sign",
        "Large Plush Teddy Bear Mascot Standee",
        "Cylinder Cake Plinth Table with Velvet Cover",
        "Warm Glow Amber Ambience Lights"
      ],
      tags: ["Teddy Bear", "Oh Baby", "Gender Neutral"]
    },
    {
      id: "wedding-cocktail-mehendi-decor",
      title: "Boho Chic Mehendi & Sangeet Lounge Decor",
      category: "wedding",
      categoryName: "Wedding",
      price: 4999,
      originalPrice: 6499,
      discount: 23,
      rating: 4.9,
      reviewsCount: 175,
      badge: "POPULAR",
      image: "https://cdn.balloondekor.com/33/mehendi-decor.webp",
      gallery: [
        "https://cdn.balloondekor.com/33/mehendi-decor.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Bohemian dry pampas grass, warm copper fairy lights, floral backdrop, and colorful balloon clusters for home mehendi celebrations.",
      inclusions: [
        "200 Rust Orange, Olive Green & Chrome Gold Balloons",
        "Boho Macrame Backdrop & Pampas Grass Styling",
        "Comfortable Floor Seating Rug & Colorful Cushions",
        "Mehendi Signboard with Custom Couple Names",
        "Warm Edison Bulb String Lights"
      ],
      tags: ["Mehendi Decor", "Boho Wedding", "Sangeet Lounge"]
    },
    {
      id: "cabana-canopy-terrace-decor",
      title: "Magical Cabana Canopy Terrace Decor",
      category: "anniversary",
      categoryName: "Romantic & Anniversary",
      price: 3499,
      originalPrice: 4699,
      discount: 25,
      rating: 5.0,
      reviewsCount: 389,
      badge: "DREAM SETUP",
      image: "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      gallery: [
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
      ],
      setupDuration: "2.5 Hours",
      description: "Fairytale canopy tent setup with sheer white flowing curtains, warm fairy lights, mattress cushions styling, and balloon cluster.",
      inclusions: [
        "Wooden / Metal Cabana Tent Frame Structure",
        "Flowing White Chiffon Draping Curtains",
        "100 Pastel & Chrome Balloons Framing Canopy",
        "30 Meters of Cascading Twinkle Fairy Lights",
        "Mattress, Cushions & Low Table Styling Setup"
      ],
      tags: ["Cabana", "Terrace Surprise", "Candlelight"]
    }
  ],
  reviews: [
    {
      id: "rev-1",
      name: "Pooja Sharma",
      city: "Delhi NCR",
      rating: 5,
      date: "2 days ago",
      type: "video",
      media: "customer-review-video-1.mp4",
      poster: "https://cdn.balloondekor.com/14/1744720943222.webp",
      service: "Rose Gold Birthday Setup",
      text: "The decorator arrived 15 mins early and set up the balloon arch without any mess! Look at this magical video reel!",
      verified: true
    },
    {
      id: "rev-2",
      name: "Rahul & Sneha",
      city: "Mumbai",
      rating: 5,
      date: "5 days ago",
      type: "image",
      media: "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      service: "Cabana Terrace Anniversary",
      text: "Booked the terrace cabana for our 5th anniversary. The fairy lights and balloon styling were unbelievable!",
      verified: true
    },
    {
      id: "rev-3",
      name: "Ananya Deshmukh",
      city: "Pune",
      rating: 5,
      date: "1 week ago",
      type: "image",
      media: "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      service: "Cocomelon 2nd Birthday",
      text: "Our son JJ was so thrilled! The balloon quality was top notch, vibrant colors and lasted 3 whole days.",
      verified: true
    },
    {
      id: "rev-4",
      name: "Kunal & Riya Mehra",
      city: "Bangalore",
      rating: 5,
      date: "1 week ago",
      type: "video",
      media: "customer-review-video-1.mp4",
      poster: "https://cdn.balloondekor.com/14/1744890426934.webp",
      service: "Golden Birthday Arch",
      text: "Super smooth same-day booking in Indiranagar. Watch our live celebration reveal video!",
      verified: true
    },
    {
      id: "rev-5",
      name: "Divya Nair",
      city: "Hyderabad",
      rating: 5,
      date: "2 weeks ago",
      type: "image",
      media: "https://cdn.balloondekor.com/images/14/bf89ee2c-957e-4264-a433-c5e17a9bcbf5.webp",
      service: "Boho Luxury Theme",
      text: "Natural pampas grass and earthy balloons made our daughter's 1st birthday look straight out of Pinterest.",
      verified: true
    },
    {
      id: "rev-6",
      name: "Vikram Singhania",
      city: "Gurugram",
      rating: 5,
      date: "2 weeks ago",
      type: "image",
      media: "https://cdn.balloondekor.com/14/1748087900974.webp",
      service: "Blush & Champagne Surprise",
      text: "Ordered a midnight bedroom surprise decor for my wife. The LED fairy lights and backdrop were 10/10!",
      verified: true
    },
    {
      id: "rev-7",
      name: "Neha & Amit Kapoor",
      city: "Noida",
      rating: 5,
      date: "3 weeks ago",
      type: "image",
      media: "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
      service: "Express Home Celebration",
      text: "Fastest party setup ever! Booked at 2 PM, technician was at home by 4:30 PM with electric pump.",
      verified: true
    },
    {
      id: "rev-8",
      name: "Rohan Joshi",
      city: "Kolkata",
      rating: 5,
      date: "3 weeks ago",
      type: "video",
      media: "customer-review-video-1.mp4",
      poster: "https://cdn.balloondekor.com/images/61/7ebf2dbd-60dd-4643-8029-763dc6a3e5e3.webp",
      service: "Midnight Terrace Canopy",
      text: "Check out this night tour video of our terrace setup! Truly worth every single rupee.",
      verified: true
    },
    {
      id: "rev-9",
      name: "Kavita Reddy",
      city: "Chennai",
      rating: 5,
      date: "1 month ago",
      type: "image",
      media: "https://cdn.balloondekor.com/33/teddy-baby-shower.webp",
      service: "Oh Baby Teddy Bear Setup",
      text: "The giant plush teddy bear and caramel pastel arch were the biggest hit of our baby shower.",
      verified: true
    },
    {
      id: "rev-10",
      name: "Aman & Priya Verma",
      city: "Jaipur",
      rating: 5,
      date: "1 month ago",
      type: "image",
      media: "https://cdn.balloondekor.com/33/haldi-decoration-92abeb45-8776-4485-8300-d177622d3c40.webp",
      service: "Haldi Marigold & Balloons",
      text: "Bright vibrant yellow marigold florals with metallic balloons. The photo shoot turned out stunning!",
      verified: true
    },
    {
      id: "rev-11",
      name: "Ritu Malhotra",
      city: "Chandigarh",
      rating: 5,
      date: "1 month ago",
      type: "video",
      media: "customer-review-video-1.mp4",
      poster: "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      service: "Welcome Baby Girl Decor",
      text: "Welcomed our newborn princess home from hospital. Our entire family loved this cute setup!",
      verified: true
    },
    {
      id: "rev-12",
      name: "Tanvi & Siddharth",
      city: "Ahmedabad",
      rating: 5,
      date: "1 month ago",
      type: "image",
      media: "https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp",
      service: "Bachelorette Glam Party",
      text: "Foil fringe backdrop, giant champagne balloons and rose gold arches. Made our bride-to-be so happy!",
      verified: true
    }
  ],
  faqs: [
    {
      q: "How far in advance should I book my decoration?",
      a: "We recommend booking at least 24 to 48 hours in advance to reserve your preferred time slot. However, we also provide same-day express decoration services in all major cities with a 2 to 3-hour notice!"
    },
    {
      q: "Will the balloons damage my wall or paint?",
      a: "No! Our certified decorators use specialized removable paper tape and damage-free masking dots that do not peel or ruin wall paint or wallpaper."
    },
    {
      q: "Do I need to provide anything to the decorator?",
      a: "Our decorators bring all materials including high-speed electric air inflators, balloons, ribbons, tapes, and lights. All we need is a standard electrical plug point and a stool/ladder if high ceiling balloons are requested."
    },
    {
      q: "Can I customize the color palette of my balloons?",
      a: "Yes, absolutely! During checkout or in the booking notes, you can request custom color combinations (e.g., pastel pink + lilac, or gold + black) at zero extra cost."
    },
    {
      q: "Are the balloons helium-filled or regular air?",
      a: "Standard packages use premium metallic/pastel latex balloons filled with air and safely attached to ceilings with removable glue drops for a floating illusion. Helium clusters can be added as an optional party add-on."
    },
    {
      q: "What is the cancellation and rescheduling policy?",
      a: "You can reschedule your decoration up to 6 hours before the booked slot completely free of charge. Full refunds are provided for cancellations made 24 hours in advance."
    }
  ],
  timeSlots: [
    { id: "slot-1", time: "09:00 AM - 11:00 AM", label: "Morning", tag: "Available" },
    { id: "slot-2", time: "11:00 AM - 01:00 PM", label: "Afternoon", tag: "Popular" },
    { id: "slot-3", time: "02:00 PM - 04:00 PM", label: "Afternoon", tag: "Available" },
    { id: "slot-4", time: "04:00 PM - 06:00 PM", label: "Evening", tag: "Fast Filling" },
    { id: "slot-5", time: "06:00 PM - 08:00 PM", label: "Evening", tag: "High Demand" },
    { id: "slot-6", time: "08:00 PM - 10:00 PM", label: "Night", tag: "Late Slot" }
  ],
  addons: [
    {
      id: "addon-pillar",
      name: "Age on Balloon Pillar (per foil)",
      category: "bestseller",
      price: 199,
      image: "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      badge: ""
    },
    {
      id: "addon-lanterns",
      name: "Colorful Paper Lanterns (1pc)",
      category: "more",
      price: 249,
      image: "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
      badge: ""
    },
    {
      id: "addon-gems-cake",
      name: "Simple Gems Cake (1 kg)",
      category: "cake",
      price: 1999,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80",
      badge: "Book 1 day in advance"
    },
    {
      id: "addon-butterscotch",
      name: "Butterscotch Cake (500 gms)",
      category: "cake",
      price: 799,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop&q=80",
      badge: ""
    },
    {
      id: "addon-blackforest",
      name: "Black Forest Cake (500 gms)",
      category: "cake",
      price: 799,
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&auto=format&fit=crop&q=80",
      badge: ""
    },
    {
      id: "addon-lights",
      name: "LED Fairy Warm Lights (10m)",
      category: "bestseller",
      price: 199,
      image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=400&auto=format&fit=crop&q=80",
      badge: "Bestseller"
    },
    {
      id: "addon-poppers",
      name: "Party Poppers (Set of 2)",
      category: "more",
      price: 149,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
      badge: ""
    },
    {
      id: "addon-sash",
      name: "Birthday Sash & Crown",
      category: "more",
      price: 299,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80",
      badge: ""
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.SITE_DATA = SITE_DATA;
}
