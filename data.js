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
      name: "Wedding & Haldi",
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
      categoryName: "Wedding & Haldi",
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
      categoryName: "Wedding & Haldi",
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
      categoryName: "Wedding & Haldi",
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
      name: "Pooja Sharma",
      city: "Delhi NCR",
      rating: 5,
      date: "2 days ago",
      text: "Celebration Events made my husband's 30th birthday absolutely unforgettable! The decorator arrived 15 mins prior to the slot, set up the entire balloon arch in 1.5 hours without any mess. Truly India's best party expert!",
      verified: true,
      service: "Rose Gold Birthday Home Decor"
    },
    {
      name: "Rahul Verma",
      city: "Mumbai",
      rating: 5,
      date: "1 week ago",
      text: "Booked the Cabana Canopy on our terrace for our 5th anniversary. My wife was genuinely in tears of joy! The fairy lights and balloon styling was just magical. Worth every rupee!",
      verified: true,
      service: "Romantic Anniversary Room Celebration"
    },
    {
      name: "Ananya Deshmukh",
      city: "Pune",
      rating: 5,
      date: "2 weeks ago",
      text: "We ordered the Cocomelon theme for our son's 2nd birthday. The balloon quality was top notch - no pungent rubber smell, balloons lasted for over 3 days! Outstanding service.",
      verified: true,
      service: "Cocomelon Fun Kids Birthday Theme"
    },
    {
      name: "Karthik Subramanian",
      city: "Bangalore",
      rating: 5,
      date: "3 weeks ago",
      text: "Needed same day express setup in Koramangala within 3 hours. The customer support team coordinated seamlessly. Decorator arrived with pump, ribbons, lights and finished quickly!",
      verified: true,
      service: "Simple Balloon Decor for Home"
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
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.SITE_DATA = SITE_DATA;
}
