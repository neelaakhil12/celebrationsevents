const SITE_DATA = {
  "brand": {
    "name": "Celebration Events",
    "tagline": "India ka Party Expert",
    "phone": "+91 82820 25444",
    "whatsapp": "918282025444",
    "rating": "4.9/5",
    "completedEvents": "5,00,000+",
    "citiesCount": "100+"
  },
  "announcementBar": {
    "enabled": true,
    "text": "⚡ Same Day 2-Hour Express Delivery in 100+ Cities",
    "badge": "⚡ EXPRESS",
    "linkText": "Book Now",
    "linkUrl": "#",
    "theme": "rose-gradient",
    "bg": "linear-gradient(135deg, #be123c 0%, #fb7185 100%)"
  },
  "banners": [
    {
      "id": "banner-home-1",
      "location": "home",
      "locationName": "Homepage Carousel",
      "tag": "✨ India's #1 Decoration Service",
      "title": "Balloon Decorations That Wow Your Guests",
      "subtitle": "Same-day hassle-free setup at your home, terrace or party hall in 100+ cities. Clean, on-time and premium aesthetic guaranteed.",
      "image": "https://cdn.balloondekor.com/images/16/49e5480a-1fcd-42eb-ad97-cafd993c260d.webp",
      "linkText": "Explore Birthday Packages →",
      "linkUrl": "birthday.html",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-home-2",
      "location": "home",
      "locationName": "Homepage Carousel",
      "tag": "❤️ Romantic Surprises",
      "title": "Make Your Anniversary Unforgettable",
      "subtitle": "Canopy tents, floating ceiling balloons, glowing fairy lights, and personalized photo setups crafted with love.",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "linkText": "Book Anniversary Surprise →",
      "linkUrl": "anniversary.html",
      "active": true,
      "order": 2
    },
    {
      "id": "banner-home-3",
      "location": "home",
      "locationName": "Homepage Carousel",
      "tag": "🦄 Kids Dream Themes",
      "title": "Magical Parties Kids Will Remember Forever",
      "subtitle": "From Cocomelon & Baby Shark to Frozen & Jungle Safari - turn their birthday into a wonderland!",
      "image": "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      "linkText": "View Kids Themes →",
      "linkUrl": "kids.html",
      "active": true,
      "order": 3
    },
    {
      "id": "banner-cat-birthday",
      "location": "birthday",
      "locationName": "Birthday Page Banner",
      "tag": "🎂 The Ultimate Birthday Collection",
      "title": "Professional Birthday Balloon Decorations",
      "subtitle": "Make their milestone unforgettable! From simple living room surprises to grand circular arch sequin backdrops in 100+ cities.",
      "image": "https://cdn.balloondekor.com/images/16/49e5480a-1fcd-42eb-ad97-cafd993c260d.webp",
      "linkText": "Explore Setups Below ↓",
      "linkUrl": "#birthdayCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-anniversary",
      "location": "anniversary",
      "locationName": "Anniversary Page Banner",
      "tag": "❤️ Romantic Surprises",
      "title": "Unforgettable Anniversary Balloon Setups",
      "subtitle": "Surprise your spouse with dreamy canopy setups, floating ceiling hearts, and fairy lights styled right in your bedroom or terrace.",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "linkText": "Explore Romantic Setups ↓",
      "linkUrl": "#anniversaryCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-kids",
      "location": "kids",
      "locationName": "Kids Themes Page Banner",
      "tag": "🦄 Kids Party Magic",
      "title": "Spectacular Kids Theme Birthday Decorations",
      "subtitle": "Transform their special day into a magical adventure with their favorite cartoon & fairytale characters.",
      "image": "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      "linkText": "Explore Kids Themes ↓",
      "linkUrl": "#kidsCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-baby-shower",
      "location": "baby-shower",
      "locationName": "Baby Shower Page Banner",
      "tag": "👶 Baby Shower & Welcome",
      "title": "Welcoming & Baby Shower Balloon Celebrations",
      "subtitle": "Pastel balloons, baby blocks, welcome arches & customized newborn homecoming decor in 100+ cities.",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "linkText": "Explore Baby Shower Setups ↓",
      "linkUrl": "#babyShowerCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-wedding",
      "location": "wedding",
      "locationName": "Wedding Page Banner",
      "tag": "💍 Wedding & Ceremonies",
      "title": "Royal Haldi, Mehendi & Wedding Event Setups",
      "subtitle": "Traditional marigold flowers, pendals, stage decoration, photography & complete wedding service execution.",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "linkText": "Explore Wedding Services ↓",
      "linkUrl": "#weddingCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-corporate",
      "location": "corporate",
      "locationName": "Corporate Page Banner",
      "tag": "🏢 Corporate Celebrations",
      "title": "Corporate Events & Office Balloon Installations",
      "subtitle": "Brand promotions, annual day celebrations, office milestone anniversaries & balloon arch installations.",
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      "linkText": "Explore Corporate Packages ↓",
      "linkUrl": "#corporateCatalog",
      "active": true,
      "order": 1
    },
    {
      "id": "banner-cat-gifts",
      "location": "gifts",
      "locationName": "Gifts Page Banner",
      "tag": "🎁 Celebration Gifts",
      "title": "Personalized Celebration Gifts & Hampers",
      "subtitle": "Custom photo frames, milestone boards, balloon bouquets & surprise delivery across 100+ cities.",
      "image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      "linkText": "Shop Gifts ↓",
      "linkUrl": "#giftsCatalog",
      "active": true,
      "order": 1
    }
  ],
  "cities": [
    {
      "id": "delhi",
      "name": "Delhi NCR",
      "state": "Delhi",
      "popular": true
    },
    {
      "id": "mumbai",
      "name": "Mumbai",
      "state": "Maharashtra",
      "popular": true
    },
    {
      "id": "bangalore",
      "name": "Bangalore",
      "state": "Karnataka",
      "popular": true
    },
    {
      "id": "hyderabad",
      "name": "Hyderabad",
      "state": "Telangana",
      "popular": true
    },
    {
      "id": "pune",
      "name": "Pune",
      "state": "Maharashtra",
      "popular": true
    },
    {
      "id": "kolkata",
      "name": "Kolkata",
      "state": "West Bengal",
      "popular": true
    },
    {
      "id": "chennai",
      "name": "Chennai",
      "state": "Tamil Nadu",
      "popular": true
    },
    {
      "id": "ahmedabad",
      "name": "Ahmedabad",
      "state": "Gujarat",
      "popular": true
    },
    {
      "id": "jaipur",
      "name": "Jaipur",
      "state": "Rajasthan",
      "popular": true
    },
    {
      "id": "gurgaon",
      "name": "Gurgaon",
      "state": "Haryana",
      "popular": true
    },
    {
      "id": "noida",
      "name": "Noida",
      "state": "Uttar Pradesh",
      "popular": true
    },
    {
      "id": "chandigarh",
      "name": "Chandigarh",
      "state": "Punjab",
      "popular": true
    },
    {
      "id": "lucknow",
      "name": "Lucknow",
      "state": "Uttar Pradesh",
      "popular": false
    },
    {
      "id": "indore",
      "name": "Indore",
      "state": "Madhya Pradesh",
      "popular": false
    },
    {
      "id": "surat",
      "name": "Surat",
      "state": "Gujarat",
      "popular": false
    },
    {
      "id": "kochi",
      "name": "Kochi",
      "state": "Kerala",
      "popular": false
    }
  ],
  "categories": [
    {
      "id": "birthday",
      "name": "Birthday",
      "icon": "🎂",
      "badge": "POPULAR",
      "image": "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      "desc": "Stunning birthday setups for home, terrace & banquet",
      "subcategories": [
        {
          "id": "home",
          "name": "Simple Home Surprises",
          "icon": "🏠",
          "title": "Simple Home Birthday Setups"
        },
        {
          "id": "arch",
          "name": "Arch & Ring Backdrops",
          "icon": "⭕",
          "title": "Organic Arch & Ring Backdrop Setups"
        },
        {
          "id": "luxury",
          "name": "Luxury Boho & Grand",
          "icon": "✨",
          "title": "Luxury Boho & Grand Jubilee Decors"
        },
        {
          "id": "kids-link",
          "name": "Kids Themes →",
          "icon": "🦄",
          "title": "Kids Themes",
          "isLink": true,
          "href": "kids.html"
        }
      ]
    },
    {
      "id": "anniversary",
      "name": "Anniversary",
      "icon": "❤️",
      "badge": "HOT",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "desc": "Surprise room, canopy, candlelight & heart balloon decor",
      "subcategories": [
        {
          "id": "room",
          "name": "Room & Bedroom Surprises",
          "icon": "🌹",
          "title": "Room & Bedroom Anniversary Surprises"
        },
        {
          "id": "canopy",
          "name": "Cabana & Canopy Tents",
          "icon": "⛺",
          "title": "Cabana & Canopy Terrace Decors"
        },
        {
          "id": "ring",
          "name": "Ring Backdrop & Neon",
          "icon": "⭕",
          "title": "Circular Ring Backdrops with Neon Signs"
        },
        {
          "id": "grand",
          "name": "25th / 50th Jubilees",
          "icon": "✨",
          "title": "Grand 25th / 50th Jubilee Celebrations"
        }
      ]
    },
    {
      "id": "kids",
      "name": "Kids Themes",
      "icon": "🦄",
      "badge": "TRENDING",
      "image": "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
      "desc": "Cocomelon, Frozen, Superhero, Jungle & Barbie themes",
      "subcategories": [
        {
          "id": "cocomelon",
          "name": "Cocomelon",
          "icon": "🍉",
          "title": "Cocomelon Fun Kids Birthday Setups"
        },
        {
          "id": "babyshark",
          "name": "Baby Shark",
          "icon": "🦈",
          "title": "Baby Shark Underwater Theme Setups"
        },
        {
          "id": "bossbaby",
          "name": "The Boss Baby",
          "icon": "💼",
          "title": "The Boss Baby Theme Setups"
        },
        {
          "id": "jungle",
          "name": "Jungle Safari",
          "icon": "🦁",
          "title": "Wild Jungle Safari Birthday Themes"
        },
        {
          "id": "frozen",
          "name": "Frozen Wonderland",
          "icon": "❄️",
          "title": "Frozen Ice Wonderland Princess Themes"
        }
      ]
    },
    {
      "id": "baby-shower",
      "name": "Baby Shower & Welcome",
      "icon": "🍼",
      "badge": "LOVED",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "desc": "Celebrate motherhood with gentle pastel setups",
      "subcategories": [
        {
          "id": "shower",
          "name": "Baby Shower Celebrations",
          "icon": "🍼",
          "title": "Baby Shower Theme Packages"
        },
        {
          "id": "welcome",
          "name": "Welcome Baby Home",
          "icon": "👶",
          "title": "Welcome Baby Home Decor Packages"
        },
        {
          "id": "teddy",
          "name": "Teddy Bear Luxury Themes",
          "icon": "🧸",
          "title": "Luxury Teddy Bear Theme Setups"
        }
      ]
    },
    {
      "id": "wedding",
      "name": "Wedding",
      "icon": "💍",
      "badge": "SPECIAL",
      "image": "https://cdn.balloondekor.com/33/wedding-decoration-0c8b0952-fe10-44cb-ac91-8f640239beaf.webp",
      "desc": "Haldi marigold setups, car decor & bridal showers",
      "subcategories": [
        {
          "id": "house-decor",
          "name": "House Decoration",
          "icon": "🏠",
          "title": "Traditional House Decoration"
        },
        {
          "id": "nalugu-snanam",
          "name": "Nalugu & Mangala Snanam",
          "icon": "🌼",
          "title": "Auspicious Nalugu & Snanam Rituals"
        },
        {
          "id": "mandap-stage",
          "name": "Mandap & Reception Stages",
          "icon": "🏛️",
          "title": "Grand Wedding Mandaps & Reception Stages"
        },
        {
          "id": "photo-video",
          "name": "Photography & Shoots",
          "icon": "📸",
          "title": "Wedding Photo, Video & Drone Coverage"
        },
        {
          "id": "melam-music",
          "name": "Melam, Band & Orchestra",
          "icon": "🥁",
          "title": "Traditional Melam, Drums & DJ Entertainment"
        },
        {
          "id": "bridal-styling",
          "name": "Bridal Makeup & Mehendi",
          "icon": "💅",
          "title": "Bridal Makeup, Draping & Mehendi Art"
        }
      ]
    },
    {
      "id": "corporate",
      "name": "Corporate",
      "icon": "💼",
      "badge": "BUSINESS",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "desc": "Office anniversary, annual day & milestone celebrations",
      "subcategories": [
        {
          "id": "office",
          "name": "Office Inauguration & Milestones",
          "icon": "🏢",
          "title": "Office Inauguration & Milestone Decor"
        },
        {
          "id": "stage",
          "name": "Grand Stage & Annual Day",
          "icon": "🎉",
          "title": "Grand Stage & Annual Day Conferences"
        }
      ]
    },
    {
      "id": "gifts",
      "name": "Gifts Market",
      "icon": "🎁",
      "badge": "NEW",
      "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
      "desc": "Curated gift hampers, surprise boxes, flower bouquets & cakes",
      "subcategories": [
        {
          "id": "boys",
          "name": "Gifts for Boys",
          "icon": "👦",
          "title": "Curated Gifts for Boys"
        },
        {
          "id": "girls",
          "name": "Gifts for Girls",
          "icon": "👧",
          "title": "Curated Gifts for Girls"
        },
        {
          "id": "men",
          "name": "Gifts for Men",
          "icon": "👨",
          "title": "Handcrafted Gifts for Men"
        },
        {
          "id": "women",
          "name": "Gifts for Women",
          "icon": "👩",
          "title": "Luxury Gifts for Women"
        },
        {
          "id": "cakes",
          "name": "Cakes",
          "icon": "🎂",
          "title": "Fresh Celebration Cakes"
        },
        {
          "id": "flowers",
          "name": "Flowers",
          "icon": "💐",
          "title": "Fresh Floral Bouquets"
        }
      ]
    },
    {
      "id": "dusera",
      "name": "dusera",
      "icon": "",
      "badge": "TRENDING",
      "image": "https://res.cloudinary.com/gu0q1mxy/image/upload/v1791367187/celebration-categories/ptwy7yh1wvwg6xekh3bx.jpg",
      "desc": "asdfgnh",
      "subcategories": []
    }
  ],
  "weddingServices": [
    {
      "id": "house-decor",
      "title": "House Decoration",
      "icon": "house",
      "badge": "TRADITIONAL",
      "desc": "Pandals, lighting, banana trees, flowers & more",
      "longDesc": "Complete traditional home decoration for weddings including front gate pandals, vibrant LED string lights, fresh banana tree pillars, marigold entrance torans, and courtyard styling.",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Entrance Banana Trees with Fresh Floral Garlands",
        "Front Facade & Terrace Rice Light Pandal (Up to 100m)",
        "Marigold Toran for Main Doorway",
        "Courtyard Rangoli & Traditional Brass Urli with Floating Petals",
        "Complete on-site setup by our certified wedding florists"
      ],
      "options": [
        {
          "id": "hd_pendals",
          "title": "Pendals In Front Of House",
          "subPrompt": "Choose pendal type",
          "subItems": [
            "Tenkaya pandhiri",
            "Normal pendals"
          ]
        },
        {
          "id": "hd_lighting",
          "title": "Lighting Decoration For Building",
          "subPrompt": "3 or 5 Days with Max of 50 Serial Sets",
          "subItems": [
            "3 Days (Max 50 Serial Sets)",
            "5 Days (Max 50 Serial Sets)"
          ]
        },
        {
          "id": "hd_banana",
          "title": "Banana Trees & Mango Leaves",
          "subPrompt": "Main doorway auspicious pillars",
          "subItems": [
            "Banana Trees & Mango Leaves"
          ]
        },
        {
          "id": "hd_marigold",
          "title": "Marigold Flowers For Main Door And Inside the House",
          "subPrompt": "Choose flower type",
          "subItems": [
            "Normal",
            "Special"
          ]
        },
        {
          "id": "hd_gaja",
          "title": "Gaja Maala For Main Door",
          "subPrompt": "Grand entrance garland",
          "subItems": [
            "Yes",
            "No"
          ]
        }
      ]
    },
    {
      "id": "nalugu-snanam",
      "title": "Nalugu & Mangala Snanam Decoration",
      "icon": "flower",
      "badge": "RITUAL SPECIAL",
      "desc": "Traditional decorations, flower jewellery, nallu items",
      "longDesc": "Auspicious yellow and orange marigold setup designed for ritual purifications, Nalugu and Mangala Snanam. Features traditional brass urlis, wooden peeta, flower jewellery for the bride/groom, and vibrant backdrop frames.",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Traditional Brass Urli with fresh yellow marigold & rose petals",
        "Floral Backdrop Frame with yellow drapery & tassels",
        "Handcrafted Flower Jewellery Set for Bride",
        "Two Wooden / Brass Peetas (Seating Stools)",
        "Haldi Bowls, Kunkum plates & Traditional ritual props"
      ],
      "options": [
        {
          "id": "ns_concept",
          "title": "Main Decoration Services",
          "subPrompt": "Traditional rituals decor",
          "subItems": [
            "Nalugu Concept Decoration",
            "Mangala Sanam Decoration",
            "Flower Jewellery",
            "Nalugu Maala (Petals)",
            "Nalugu Maala (Normal)"
          ]
        },
        {
          "id": "ns_food",
          "title": "For Nalugu Event (Traditional Feast Menu)",
          "subPrompt": "Select customary food items",
          "subItems": [
            "Sweet",
            "Rice",
            "Pappu",
            "Sambar",
            "Rasam",
            "Curd",
            "Pickle",
            "Chips",
            "Oil Fry"
          ]
        },
        {
          "id": "ns_photo",
          "title": "Photo & Videography",
          "subPrompt": "Ceremony coverage",
          "subItems": [
            "Traditional Photo",
            "Traditional Video",
            "Candid Photo",
            "Candid Video"
          ]
        },
        {
          "id": "ns_melam",
          "title": "Nalugu Mangala Melam (4 - members)",
          "subPrompt": "Auspicious instrumental team",
          "subItems": [
            "2 Dolu",
            "2 Sannai"
          ]
        }
      ]
    },
    {
      "id": "function-hall-decor",
      "title": "Function Hall Flower Decoration",
      "icon": "hall",
      "badge": "GRAND STAGE",
      "desc": "Entrance, stage, reception, flower decoration & more",
      "longDesc": "Grand banquet hall and convention center wedding styling. Includes majestic grand entrance arch, mandapam / stage backdrop with exotic flowers, couple sofa, aisle walkway runners, and chandeliers.",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Grand Hall Entrance Floral Arch with welcome board",
        "Main Wedding Mandap / Stage with Royal Backdrop & Lighting",
        "Exclusive Maharaja Couple Sofa / Royal Chairs",
        "Red Carpet / Floral Aisle Walkway with pillars",
        "Round Table centerpieces with floral vases"
      ],
      "options": [
        {
          "id": "fhd_entrance",
          "title": "Entrance & Welcome",
          "subPrompt": "Grand foyer styling",
          "subItems": [
            "Entrance Arch With 2 Flex Banners",
            "Banana Trees & Mango Leaves",
            "Pendals With Side Wall Entrance",
            "Lighting Entrance",
            "Trust Box Entrance (Normal)",
            "Trust Box Entrance (Lighting)",
            "Ring Passage Entrance",
            "Foot roll Mats"
          ]
        },
        {
          "id": "fhd_stage",
          "title": "Stage & Reception",
          "subPrompt": "Royal couple backdrop & rituals",
          "subItems": [
            "Reception Decoration",
            "Reception Garlands (Petals) – 1 Pair",
            "Lord Ganesh Setup",
            "Muhurtham Decoration",
            "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)",
            "Sangyam Garlands [ Normal ] – 2 Pairs",
            "Basikalu 2",
            "Design Coconut [ With Bride & Groom Names ]"
          ]
        },
        {
          "id": "fhd_vehicle",
          "title": "Vehicle & Flower Items",
          "subPrompt": "Wedding cars and ritual florals",
          "subItems": [
            "Car Decoration – 2 Cars [ Stickers – 4 ]",
            "15 Muralu puvulu",
            "Adduthera"
          ]
        },
        {
          "id": "fhd_requirements",
          "title": "Additional Requirements",
          "subPrompt": "Hall furniture and amenities",
          "subItems": [
            "Function Hall Chair Clothes",
            "Vip Sofas",
            "Stages",
            "Coolers"
          ]
        }
      ]
    },
    {
      "id": "catering",
      "title": "Catering",
      "icon": "catering",
      "badge": "MULTI-CUISINE",
      "desc": "Customizable veg menu with multiple options",
      "longDesc": "Hygienic, authentic traditional and multi-cuisine wedding catering. Includes welcome mocktails, live chaat counter, traditional banana leaf / buffet service, signature curries, biryani, artisanal breads, and decadent desserts.",
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Welcome Drinks & Live Mocktail Station",
        "Live Street Food / Chaat Counters",
        "Multi-course Traditional Vegetarian Feast (Banana leaf or buffet)",
        "3 Signature Sweets & Hot Desserts (Jalebi, Gulab Jamun, Halwa)",
        "Professional uniformed serving staff & premium cutlery"
      ],
      "options": [
        {
          "id": "cat_infrastructure",
          "title": "Catering Requirements",
          "subPrompt": "Stalls & buffet setup",
          "subItems": [
            "LED Stalls",
            "Normal Cloth Stalls",
            "Round Tables With Cloth",
            "Chair Clothes [Dining]",
            "Brass Dishes",
            "Steel Dishes"
          ]
        },
        {
          "id": "cat_snacks",
          "title": "Evening Snacks (4.30pm Onwards)",
          "subPrompt": "Select up to 5 items & welcome drink",
          "subItems": [
            "Bajji",
            "Bonda",
            "Medhu Pakoda",
            "Onion Pokoda",
            "Corn Rolls",
            "Corn Samosa",
            "Onion Samosa",
            "Veg. Cutlet",
            "Veg. Springroll",
            "Chutney",
            "Tomato Sauce",
            "Coffee & Tea",
            "Pulpy Mango",
            "Pulpy Orange",
            "Cold Badam Milk",
            "Hot Badam Milk",
            "Fruit Juice"
          ]
        },
        {
          "id": "cat_sweets",
          "title": "Night Dinner Sweets (Select any two)",
          "subPrompt": "Authentic pure ghee sweets",
          "subItems": [
            "Poli",
            "Basundi",
            "Jilebi",
            "Badham Halwa",
            "Jangri",
            "Kaju Cake",
            "Rasamalai",
            "Kala Jamoon",
            "Bandar Laddu",
            "Badhusha",
            "Kaju Roll",
            "Badham Cake",
            "Dry Jamoon",
            "Carrot Halwa",
            "Laddu",
            "Pistha Roll",
            "Rasagulla",
            "Champakalli",
            "Kalakhand",
            "Mysore Pak",
            "Malai Sandwich",
            "Malaikaja",
            "Cham Cham",
            "Dry Fruit Halwa",
            "Agra Killi",
            "Kova Jangri",
            "Ravva Laddu",
            "Dry Fruit Laddu"
          ]
        },
        {
          "id": "cat_hot_biryani",
          "title": "Hot Items & Biriyani Rice",
          "subPrompt": "Crisp snacks & fragrant biriyanis",
          "subItems": [
            "Masala Vada",
            "Curd Vada",
            "Corn Samosa",
            "Alasanda Vada",
            "Corn Vada",
            "Veg Spring Roll",
            "Keera Vada (Leaves)",
            "Cabbage Vada",
            "Kaju Pakodi",
            "Vegetable Biriyani",
            "Babycorn Biriyani",
            "Kaju Capsicum Biriyani",
            "Mushroom Biriyani",
            "Panasa Biriyani",
            "Paneer Biriyani"
          ]
        },
        {
          "id": "cat_gravy_rice",
          "title": "Special Gravy & Special Rice",
          "subPrompt": "Rich curries & rice variations",
          "subItems": [
            "Nune Vankaya",
            "Mushroom Curry",
            "Vegetable Kurma",
            "Kaju Capsicum Curry",
            "Potato Green Peas Masala",
            "Karivepaku Rice",
            "Pulhora",
            "Lemon Rice",
            "Pudina Rice",
            "Mango Rice",
            "Tomato Rice",
            "Ghee Rice",
            "Gongura Rice",
            "Kothimira Rice",
            "Coconut Rice",
            "Palak Rice"
          ]
        },
        {
          "id": "cat_roti_fry",
          "title": "Roti, Raita, Fry & Traditional Essentials",
          "subPrompt": "Breads, accompaniments & curries",
          "subItems": [
            "Chapati",
            "Pulka",
            "Rumal",
            "Onion Raita",
            "Veg. Mixed Raita",
            "Paneer Butter Masala",
            "Alu Mutter",
            "Palak Paneer",
            "Chana Masala",
            "Methi Chaman",
            "Bendakaya Pakodi",
            "Bendakaya Fry",
            "Dondakayipakodi",
            "Potato Curry",
            "Rice",
            "Sambar",
            "Curd",
            "Rasam (Pappu/Pepper)",
            "Chips or Papad"
          ]
        }
      ]
    },
    {
      "id": "sangyam-sweets",
      "title": "Sangyam Sweets",
      "icon": "sweets",
      "badge": "PURE GHEE",
      "desc": "Traditional sweets & snacks",
      "longDesc": "Handcrafted authentic wedding sweets and savory snacks made with pure cow ghee. Packaged in customized wedding gift boxes, perfect for guest welcome and rituals.",
      "image": "assets/sangyam-sweets.jpg",
      "inclusions": [
        "Pure Desi Ghee Motichoor Laddoos & Kaju Katli",
        "Authentic Regional Sweets (Mysore Pak, Badusha, Peda)",
        "Crunchy Savories (Murukku, Mixture, Ribbon Pakoda)",
        "Customized Embossed Wedding Gift Boxes",
        "Fresh batch preparation with guaranteed shelf-life testing"
      ],
      "options": [
        {
          "id": "sw_sweets",
          "title": "Sweets (Select Sweet 1 & Sweet 2)",
          "subPrompt": "Select a sweet and quantity in Nos",
          "subItems": [
            "Kaju Katli",
            "Motichoor Laddu",
            "Mysore Pak",
            "Gulab Jamun",
            "Rasgulla",
            "Dry Fruit Halwa",
            "Peda",
            "Badusha",
            "Kala Jamun",
            "Rasmalai",
            "Basundi",
            "Kaju Roll"
          ]
        },
        {
          "id": "sw_hot",
          "title": "Hot Items (Savory Snacks)",
          "subPrompt": "Select hot items and quantity in Kgs",
          "subItems": [
            "Masala Vada",
            "Corn Samosa",
            "Veg Spring Roll",
            "Kaju Pakodi",
            "Alasanda Vada",
            "Onion Pakoda",
            "Murukku",
            "Ribbon Pakoda",
            "Chekkalu"
          ]
        }
      ]
    },
    {
      "id": "photo-video",
      "title": "Photo & Videography",
      "icon": "camera",
      "badge": "4K CINEMATIC",
      "desc": "Traditional & candid photography",
      "longDesc": "Top-tier wedding cinematographers capturing every emotional ritual and candid smile. Includes high-res digital albums, 4K cinematic wedding teaser, drone footage, and traditional full-length coverage.",
      "image": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "2 Candid Photographers + 2 Traditional Cameras",
        "4K Cinematic Wedding Teaser (3-5 minutes)",
        "Full HD Traditional Wedding Film (60-90 minutes)",
        "Aerial Drone Coverage for grand venue shots",
        "Premium Leather Photobook Album (100 pages, 300+ photos)"
      ],
      "options": [
        {
          "id": "pv_main",
          "title": "Main Photo & Video Coverage",
          "subPrompt": "Camera crew",
          "subItems": [
            "Traditional Photo",
            "Traditional Video",
            "One Videographer Coverage Entrance & Dining Hall",
            "Candid Photographer for couples",
            "Candid Videographer For Couples"
          ]
        },
        {
          "id": "pv_tech",
          "title": "Drone, Screen & Live Stream",
          "subPrompt": "Display & streaming technology",
          "subItems": [
            "Drone",
            "TV (Full / Half)",
            "LED Wall (Full / Half)",
            "Live Stream (Half Session)",
            "Live Stream (Full Session)"
          ]
        },
        {
          "id": "pv_shoots",
          "title": "Pre & Post Wedding Shoots",
          "subPrompt": "Cinematic shoots",
          "subItems": [
            "Pre Wedding Shoot (Normal)",
            "Pre Wedding Shoot (Cinematic)",
            "Post Wedding Shoot (Normal)",
            "Post Wedding Shoot (Cinematic)"
          ]
        },
        {
          "id": "pv_addons",
          "title": "Additional Services & Deliverables",
          "subPrompt": "Albums and digital gifts",
          "subItems": [
            "Whats App Invitation",
            "Promo (Only For Candid Video)",
            "Marriage Album (Sheets)",
            "Pendrive",
            "Photo Frame",
            "Harddisk [1 TB]"
          ]
        },
        {
          "id": "pv_vratham",
          "title": "Sathyanarayana Vratham Coverage",
          "subPrompt": "Vratham ceremony",
          "subItems": [
            "Yes",
            "No"
          ]
        }
      ]
    },
    {
      "id": "melam",
      "title": "Melam",
      "icon": "drums",
      "badge": "AUSPICIOUS",
      "desc": "Nadaswaram, Dhol, Traditional music",
      "longDesc": "Master musicians providing soul-stirring auspicious melodies for your muhurat and Baraat processions. Traditional Nadaswaram, Thavil, Punjabi Dhol, and Shehnai troupes.",
      "image": "assets/traditional-melam.jpg",
      "inclusions": [
        "Traditional Nadaswaram & Thavil Vidwans Troupe",
        "Punjabi Dhol Beats for energetic Baraat entry",
        "Auspicious Shehnai music for morning muhurat rituals",
        "Traditional ethnic attire for all performers",
        "Full sound reinforcement system included"
      ],
      "options": [
        {
          "id": "melam_mangala",
          "title": "Mangala Melam",
          "subPrompt": "Select instruments type",
          "subItems": [
            "Nalugu (4 Members) - 2 Dolu",
            "Nalugu (4 Members) - 2 Sannai"
          ]
        },
        {
          "id": "melam_welcoming",
          "title": "Welcoming Melam",
          "subPrompt": "Select welcoming location",
          "subItems": [
            "Welcoming (House)",
            "Welcoming (Function Hall)"
          ]
        },
        {
          "id": "melam_marriage",
          "title": "Marriage Melam",
          "subPrompt": "Select troupe size",
          "subItems": [
            "Marriage (6 Members)",
            "Marriage (9 Members)"
          ]
        },
        {
          "id": "melam_kerala_drums",
          "title": "Kerala Drums",
          "subPrompt": "Select members strength",
          "subItems": [
            "Kerala Drums (5 Members)",
            "Kerala Drums (10 Members)",
            "Kerala Drums (15 Members)"
          ]
        },
        {
          "id": "melam_band_set",
          "title": "Band Set",
          "subPrompt": "Select band strength",
          "subItems": [
            "Band Set (7 Members)",
            "Band Set (12 Members)",
            "Band Set (15 Members)"
          ]
        }
      ]
    },
    {
      "id": "special-events",
      "title": "Special Events",
      "icon": "sparkles",
      "badge": "THEME DECOR",
      "desc": "Sangeet, Reception, Theme events",
      "longDesc": "Full-scale themed pre-wedding parties and grand receptions. Includes concept design, special lighting, cold fire entry pyrotechnics, dry ice smoke, and personalized themes.",
      "image": "assets/special-events-pyro.jpg",
      "inclusions": [
        "Thematic Concept & Custom Lighting Rig",
        "Cold Pyro Sparkulars for Grand Bride & Groom Entry",
        "Heavy Dry Ice Fog for magical first dance",
        "Custom Monogram Floor Projection & Neon Backdrops",
        "Dedicated On-Site Event Coordinator"
      ],
      "options": [
        {
          "id": "se_col1",
          "title": "Event Options (Column 1)",
          "subPrompt": "Props & entries with quantities",
          "subItems": [
            "Photo Booth",
            "Crackers 120 Shots",
            "Pallaki With Boys",
            "Flower Shots – 25+",
            "Design Pot",
            "Fog – 4 times",
            "Sky Lanterns",
            "Welcoming Dance"
          ]
        },
        {
          "id": "se_col2",
          "title": "Event Options (Column 2)",
          "subPrompt": "Entries, horses & fireworks with quantities",
          "subItems": [
            "Horse",
            "Horse Cart",
            "Cold Fire – 4 times",
            "Harathi plates",
            "Design Umbrella",
            "Doli",
            "Special Entry",
            "Design Butta"
          ]
        }
      ]
    },
    {
      "id": "musical-events",
      "title": "Musical Events",
      "icon": "mic",
      "badge": "LIVE BAND",
      "desc": "Live music, orchestra, cultural programs",
      "longDesc": "Enthralling live musical bands, acoustic singers, Sufi ensembles, and classical fusion orchestras to keep your wedding guests mesmerized throughout the evening.",
      "image": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Live Acoustic / Bollywood / Sufi Fusion Band",
        "Professional Stage Audio & Line-Array Speakers",
        "Stage Lighting, Moving Heads & LED Par Cans",
        "Sound Engineer & Stage Tech Crew",
        "Customized 3-Hour Musical Performance Setlist"
      ],
      "options": [
        {
          "id": "me_options",
          "title": "Musical Entertainment Cards",
          "subPrompt": "Select music genres & setup",
          "subItems": [
            "Orchestra (Full orchestra for a grand musical experience)",
            "DJ (Professional DJ with latest music collection)",
            "Light Music (Melodious light music for a pleasant atmosphere)",
            "Live Instrumental Music (Live instrumental performance)"
          ]
        }
      ]
    },
    {
      "id": "sangyam-bags",
      "title": "Sangyam Bags",
      "icon": "bag",
      "badge": "RETURN GIFTS",
      "desc": "Return gifts & customized bags",
      "longDesc": "Exquisitely designed wedding favor bags featuring silk brocade, jute-cotton, or golden foil prints with bride and groom names. Perfect for distributing sweets, clothes, and tamboolam.",
      "image": "assets/sangyam-bags.jpg",
      "inclusions": [
        "Customized High-Quality Fabric / Paper Gift Bags",
        "Personalized Gold Foil Monogram (Names & Date)",
        "Traditional Tamboolam Coconut & Betel Leaf holders",
        "Choice of Vibrant Colors (Red, Gold, Royal Blue, Pink)",
        "Bulk order door delivery across your chosen venue"
      ],
      "options": [
        {
          "id": "sb_combo",
          "title": "Sangyam Bags (Combo)",
          "subPrompt": "Complete sangyam bag combo with all items",
          "subItems": [
            "Printed Name Bags",
            "Coconut",
            "Aku, Vakka",
            "Pasupu Kumkuma"
          ]
        },
        {
          "id": "sb_quantities",
          "title": "Combo Sets Quantity Selection",
          "subPrompt": "Standard order batch",
          "subItems": [
            "50 Sets",
            "100 Sets",
            "150 Sets",
            "200 Sets",
            "250 Sets",
            "500 Sets"
          ]
        }
      ]
    },
    {
      "id": "bridal-makeup",
      "title": "Bridal Makeup",
      "icon": "makeup",
      "badge": "CELEBRITY ARTISTS",
      "desc": "Professional bridal makeup",
      "longDesc": "Certified celebrity bridal hair and makeup artists providing HD and Airbrush makeup that stays flawless for 16+ hours through tearful farewells and intense photo flashes.",
      "image": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "HD / Airbrush Bridal Makeup using luxury international brands (MAC, Huda, Dior)",
        "Traditional / Modern Bridal Hairstyling with fresh floral gajras",
        "Saree / Lehenga Draping & Jewellery Setting",
        "Touch-up kit for reception & muhurat",
        "Optional Family / Bridesmaids Makeup Add-ons available"
      ],
      "options": [
        {
          "id": "bm_makeup",
          "title": "Bridal Makeup Packages",
          "subPrompt": "Certified makeup artists",
          "subItems": [
            "HD Bridal Makeup & Hairstyling",
            "Luxury Airbrush Bridal Makeup",
            "Engagement & Reception Styling",
            "Mother & Sister Makeup Add-ons"
          ]
        },
        {
          "id": "bm_draping",
          "title": "Hair Styling & Saree Draping",
          "subPrompt": "Traditional finishing touches",
          "subItems": [
            "Bridal Hairstyling with Fresh Flower Venis",
            "Traditional Saree Draping & Jewellery Setting"
          ]
        }
      ]
    },
    {
      "id": "mehandi",
      "title": "Mehandi",
      "icon": "henna",
      "badge": "ORGANIC HENNA",
      "desc": "Bridal & guest mehendi",
      "longDesc": "Master henna artists creating intricate Arabic, Marwari, floral, and portrait bridal mehendi with 100% organic, chemical-free henna paste for rich dark mahogany stains.",
      "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Full Arm & Leg Intricate Bridal Henna with personalized motifs (Couple portrait, wedding date)",
        "Team of 3+ Henna Artists for wedding guests & family",
        "100% Organic Home-Brewed Henna Cones with nilgiri/eucalyptus oils",
        "Sealing Clove Spray & Post-Mehendi Care Balm for deep dark color",
        "Mehendi lounge cushion seating styling"
      ],
      "options": [
        {
          "id": "mh_bridal",
          "title": "Bridal Mehendi Designs",
          "subPrompt": "Intricate bridal artistry",
          "subItems": [
            "Traditional Rajasthani / Marwari Full Hand & Feet",
            "Arabic Floral Fusion Mehendi",
            "Figure & Portrait Custom Bridal Mehendi"
          ]
        },
        {
          "id": "mh_guests",
          "title": "Guest Mehendi & Quality Cones",
          "subPrompt": "Party counters for relatives",
          "subItems": [
            "Guest Mehendi Artists (Group Booking)",
            "100% Organic Fresh Henna Cones"
          ]
        }
      ]
    },
    {
      "id": "sangeet",
      "title": "Sangeet",
      "icon": "dance",
      "badge": "PARTY & DJ",
      "desc": "Dance, music & entertainment",
      "longDesc": "Electrifying Sangeet night choreography and entertainment. Includes dance choreographers for family rehearsals, energetic wedding DJ with concert sound, and dazzling dance-floor LED screens.",
      "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      "inclusions": [
        "Professional Bollywood & Folk Dance Choreographer for Family Rehearsals (7 sessions)",
        "Top Club / Wedding DJ with customized track mixing",
        "Concert Stage Sound, Truss Lighting & Illuminated LED Dance Floor",
        "Fun Wedding Emcee / Anchor for interactive couple games",
        "Props (LED sticks, sunglasses, dhols) for ultimate party vibe"
      ],
      "options": [
        {
          "id": "sg_choreo",
          "title": "Dance Choreography & Rehearsals",
          "subPrompt": "Professional choreographers",
          "subItems": [
            "Couple Dance Choreography (3-5 Days)",
            "Family & Friends Group Choreography",
            "Grand Entry Flashmob Setup"
          ]
        },
        {
          "id": "sg_stage",
          "title": "Sangeet Stage, DJ & Lights",
          "subPrompt": "High-energy party setup",
          "subItems": [
            "Intelligent Moving Beam Lights & Trussing",
            "High-Resolution LED Stage Backdrop Wall",
            "Professional Sangeet DJ & Emcee"
          ]
        }
      ]
    },
    {
      "id": "dj-kolatam",
      "title": "dj & kolatam",
      "icon": "dj",
      "badge": "TRADITIONAL",
      "desc": "swedrtvfugbnhijmkl",
      "longDesc": "swedrtvfugbnhijmkl",
      "image": "https://res.cloudinary.com/gu0q1mxy/image/upload/v1791452557/celebration-wedding/eai6viqtzalynpl1aive.jpg",
      "inclusions": [
        "dj "
      ],
      "options": [
        {
          "id": "opt_muzclqut",
          "title": "dj ",
          "subPrompt": "choose dj type",
          "image": "https://res.cloudinary.com/gu0q1mxy/image/upload/v1791452638/celebration-wedding-options/uqyuzry2pqiuuivhrv0u.jpg",
          "subItems": [
            "3 pin",
            "5 pin",
            "8 pin"
          ]
        }
      ]
    }
  ],
  "addons": [
    {
      "id": "addon-milestone-board",
      "name": "Milestone Board",
      "category": "custom",
      "price": 1999,
      "image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&auto=format&fit=crop&q=80",
      "badge": ""
    },
    {
      "id": "addon-neon-light",
      "name": "Happy Birthday Neon Light",
      "category": "lights",
      "price": 1999,
      "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80",
      "badge": "On A Rental Basis"
    },
    {
      "id": "addon-rose-petals",
      "name": "Rose Petals Pathway (600 Pcs)",
      "category": "romantic",
      "price": 799,
      "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80",
      "badge": ""
    },
    {
      "id": "addon-tea-candles",
      "name": "20 Pcs Tea Candles",
      "category": "candles",
      "price": 399,
      "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&auto=format&fit=crop&q=80",
      "badge": ""
    },
    {
      "id": "addon-custom-board",
      "name": "Customized Board",
      "category": "custom",
      "price": 1999,
      "image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80",
      "badge": ""
    },
    {
      "id": "addon-lights",
      "name": "LED Fairy Warm Lights (10m)",
      "category": "bestseller",
      "price": 199,
      "image": "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=400&auto=format&fit=crop&q=80",
      "badge": "Bestseller"
    },
    {
      "id": "addon-pillar",
      "name": "Age on Balloon Pillar",
      "category": "bestseller",
      "price": 299,
      "image": "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      "badge": ""
    },
    {
      "id": "addon-poppers",
      "name": "Party Poppers (Set of 2)",
      "category": "more",
      "price": 149,
      "image": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
      "badge": ""
    }
  ],
  "timeSlots": [
    {
      "id": "slot-1",
      "time": "09:00 AM - 11:00 AM",
      "label": "Morning",
      "tag": "Available"
    },
    {
      "id": "slot-2",
      "time": "11:00 AM - 01:00 PM",
      "label": "Afternoon",
      "tag": "Popular"
    },
    {
      "id": "slot-3",
      "time": "02:00 PM - 04:00 PM",
      "label": "Afternoon",
      "tag": "Available"
    },
    {
      "id": "slot-4",
      "time": "04:00 PM - 06:00 PM",
      "label": "Evening",
      "tag": "Fast Filling"
    },
    {
      "id": "slot-5",
      "time": "06:00 PM - 08:00 PM",
      "label": "Evening",
      "tag": "High Demand"
    },
    {
      "id": "slot-6",
      "time": "08:00 PM - 10:00 PM",
      "label": "Night",
      "tag": "Late Slot"
    }
  ],
  "products": [
    {
      "id": "simple-balloon-decor-for-home",
      "title": "Simple Balloon Decor for Home",
      "category": "birthday",
      "categoryName": "Birthday",
      "price": 1499,
      "originalPrice": 1999,
      "discount": 25,
      "rating": 4.9,
      "reviewsCount": 313,
      "badge": "BESTSELLER",
      "image": "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
        "https://cdn.balloondekor.com/14/1744720943222.webp"
      ],
      "setupDuration": "1.5 - 2 Hours",
      "description": "A chic, minimalist home celebration setup featuring metallic latex balloons, happy birthday bunting, and fairy lights. Ideal for living rooms and bedroom surprises.",
      "inclusions": [
        "100 Metallic Balloons (Pastel Blue, White & Chrome Gold)",
        "1 'Happy Birthday' Rose Gold Cursive Cardstock Banner",
        "2 Star Foil Balloons (18 inches)",
        "Fairy String Lights (Warm White, 10 meters)",
        "Ribbons, Glue Dots & Complete Home Setup by Expert Decorator"
      ],
      "tags": [
        "Home Decor",
        "Same Day Available",
        "Budget Friendly"
      ],
      "subcategory": "home"
    },
    {
      "id": "rose-gold-birthday-home-decor",
      "title": "Rose Gold Birthday Home Decor",
      "category": "birthday",
      "categoryName": "Birthday",
      "price": 1999,
      "originalPrice": 2499,
      "discount": 20,
      "rating": 4.9,
      "reviewsCount": 352,
      "badge": "POPULAR",
      "image": "https://cdn.balloondekor.com/14/1744720943222.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/1744720943222.webp",
        "https://cdn.balloondekor.com/14/1748087900974.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Sophisticated rose gold luxury balloon ring with shimmering foil curtains, star balloons, and ambient fairy lights tailored for women and girls.",
      "inclusions": [
        "150 Metallic Rose Gold & Pastel Pink Balloons",
        "2 Shimmering Rose Gold Foil Curtains for Backdrop",
        "1 Happy Birthday Foil Balloon Set (16 inches)",
        "4 Rose Gold Confetti Transparent Balloons",
        "4 Heart & Star Foil Balloons",
        "Warm LED Rice Lights for Glamorous Glow"
      ],
      "tags": [
        "Rose Gold",
        "Girls Birthday",
        "Insta-Worthy"
      ],
      "subcategory": "home"
    },
    {
      "id": "adorable-birthday-arch-backdrop",
      "title": "Adorable Birthday Arch Backdrop",
      "category": "birthday",
      "categoryName": "Birthday",
      "price": 2499,
      "originalPrice": 3299,
      "discount": 24,
      "rating": 5,
      "reviewsCount": 374,
      "badge": "TOP RATED",
      "image": "https://cdn.balloondekor.com/14/1744890426934.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/1744890426934.webp",
        "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Stunning half-arch organic balloon garland framed on circular backdrop ring with customized name tag and ambient spotlight.",
      "inclusions": [
        "200 Chrome & Metallic Balloons (Golden, White, Chrome Mauve)",
        "Circular Metallic Backdrop Stand on Rental",
        "1 Happy Birthday Neon Sign (Warm White)",
        "4 Confetti Giant Balloons",
        "Professional Florist & Decor Team at Venue"
      ],
      "tags": [
        "Circular Arch",
        "Milestone 30th",
        "Banquet Hall"
      ],
      "subcategory": "arch"
    },
    {
      "id": "blush-glow-birthday-theme",
      "title": "Blush & Glow Birthday Theme",
      "category": "birthday",
      "categoryName": "Birthday",
      "price": 2199,
      "originalPrice": 2899,
      "discount": 24,
      "rating": 4.8,
      "reviewsCount": 228,
      "badge": "TRENDING",
      "image": "https://cdn.balloondekor.com/14/1748087900974.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/1748087900974.webp",
        "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Gentle blush pink and champagne gold theme with elegant cascading wall balloon drape and fairy canopy.",
      "inclusions": [
        "140 Pastel Pink, White & Champagne Balloons",
        "LED Neon Sign 'Happy Birthday'",
        "Fairy Light Backdrop Curtain (8x6 ft)",
        "2 Foil Number Balloons (32 inches, Golden)",
        "Table Decor with Confetti Sprinkles"
      ],
      "tags": [
        "Blush Pink",
        "Bedroom Surprise",
        "Evening Glow"
      ],
      "subcategory": "home"
    },
    {
      "id": "boho-theme-birthday-decoration",
      "title": "Boho Theme Luxury Birthday Decor",
      "category": "birthday",
      "categoryName": "Birthday",
      "price": 8499,
      "originalPrice": 10999,
      "discount": 23,
      "rating": 5,
      "reviewsCount": 395,
      "badge": "LUXURY",
      "image": "https://cdn.balloondekor.com/16/boho-theme-birthday-decoration-1785501861053-625298.webp",
      "gallery": [
        "https://cdn.balloondekor.com/16/boho-theme-birthday-decoration-1785501861053-625298.webp",
        "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp"
      ],
      "setupDuration": "3.5 Hours",
      "description": "Premium Bohemian celebration setup with natural pampas grass, macrame backdrops, earthy terracotta balloons, and ambient warm wicker lighting.",
      "inclusions": [
        "350 Earthy & Pastel Organic Balloons (Nude, Eucalyptus, Ivory)",
        "Custom Laser-cut Wooden Birthday Name Plaque",
        "Natural Dried Pampas Grass & Palm Leaves Floral Styling",
        "Boho Teepee Tent / Cabana with Floor Rugs & Cushions",
        "Wicker Lanterns with Warm Fairy Lights",
        "Senior Designer with 2 Assistants On-Site"
      ],
      "tags": [
        "Boho Luxury",
        "Pampas Grass",
        "Milestone 50th / 1st"
      ],
      "subcategory": "luxury"
    },
    {
      "id": "anniversary-home-decoration",
      "title": "Anniversary Home Surprise Decor",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 2199,
      "originalPrice": 2899,
      "discount": 24,
      "rating": 4.9,
      "reviewsCount": 284,
      "badge": "BESTSELLER",
      "image": "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp",
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "An enchanting romantic home surprise featuring metallic red heart balloons, fairy light curtains, and bed styling with rose petals.",
      "inclusions": [
        "120 Red & White Metallic Balloons with Curling Ribbons",
        "10 Heart Foil Balloons (18 inches)",
        "Happy Anniversary Foil Bunting Banner",
        "Fresh Rose Petal Bed Pathway & Heart Formation",
        "Tea-light LED Candles (Set of 12)",
        "Fairy String Lights (12 meters)"
      ],
      "tags": [
        "Romantic Surprise",
        "Bedroom Decor",
        "Rose Petals"
      ],
      "subcategory": "room"
    },
    {
      "id": "red-anniversary-home-decor",
      "title": "Red Passion Anniversary Canopy & Decor",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 2099,
      "originalPrice": 2699,
      "discount": 22,
      "rating": 4.8,
      "reviewsCount": 310,
      "badge": "POPULAR",
      "image": "https://cdn.balloondekor.com/14/1744883492822.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/1744883492822.webp",
        "https://cdn.balloondekor.com/14/anniversary-home-decoration-1785476722055-756184.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Passionate crimson red theme with balloon bunches, ceiling balloon drops with hanging couple photo polaroids, and heart foil clusters.",
      "inclusions": [
        "150 Crimson Red & Golden Chrome Balloons",
        "16 Custom Couple Polaroids printed & hung from ceiling balloons",
        "1 'Love' Cursive Foil Balloon",
        "Fairy Light Net Backdrop",
        "Fragranced Red Rose Petal Carpet Styling"
      ],
      "tags": [
        "Red Passion",
        "Polaroid Photos",
        "Proposals"
      ],
      "subcategory": "canopy"
    },
    {
      "id": "romantic-anniversary-room-celebration",
      "title": "Romantic Anniversary Room Celebration",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 2399,
      "originalPrice": 3199,
      "discount": 25,
      "rating": 5,
      "reviewsCount": 342,
      "badge": "TOP RATED",
      "image": "https://cdn.balloondekor.com/14/1744884242691.webp",
      "gallery": [
        "https://cdn.balloondekor.com/14/1744884242691.webp",
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Complete 360-degree hotel room or master bedroom styling with fairy light ceiling, balloon clusters, and candlelight floor pathway.",
      "inclusions": [
        "200 Metallic & Chrome Balloons (Red, Rose Gold, Pearl White)",
        "Happy Anniversary Neon Sign on Acrylic Board",
        "Romantic Canopy Structure with Sheer White Drapes",
        "40 Tealight LED Candles creating illuminated pathway",
        "Fresh Red Roses (10 Stems) & Flower Petal Art"
      ],
      "tags": [
        "Hotel Room",
        "Canopy",
        "Candlelight Pathway"
      ],
      "subcategory": "room"
    },
    {
      "id": "anniversary-bliss-setup",
      "title": "Anniversary Bliss Ring Setup",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 2499,
      "originalPrice": 3399,
      "discount": 26,
      "rating": 4.9,
      "reviewsCount": 198,
      "badge": "TRENDING",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "gallery": [
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
        "https://cdn.balloondekor.com/14/1744883492822.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Circular arch balloon ring in luxurious golden and white tones with warm spotlight and customized Anniversary message.",
      "inclusions": [
        "180 Metallic Chrome Gold & Pastel White Balloons",
        "Circular Ring Stand on Rental",
        "Warm White Neon Sign ('Better Together' or 'Happy Anniversary')",
        "Artificial Floral Bunches on Arch corners",
        "Complete hassle-free assembly & disassembly"
      ],
      "tags": [
        "Circular Arch",
        "Silver Jubilee",
        "Photo Booth"
      ],
      "subcategory": "ring"
    },
    {
      "id": "happy-anniversary-backdrop-decoration",
      "title": "Grand Golden Anniversary Backdrop",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 6499,
      "originalPrice": 8499,
      "discount": 24,
      "rating": 5,
      "reviewsCount": 412,
      "badge": "LUXURY",
      "image": "https://cdn.balloondekor.com/16/happy-anniversary-backdrop-decoration-1785501861053-832104.webp",
      "gallery": [
        "https://cdn.balloondekor.com/16/happy-anniversary-backdrop-decoration-1785501861053-832104.webp",
        "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
      ],
      "setupDuration": "3.5 Hours",
      "description": "Grand sequin shimmer wall backdrop with dual circular arches, custom LED numerals (25th / 50th), and organic balloon drapes.",
      "inclusions": [
        "Gold Shimmer Sequin Wall (8x8 ft)",
        "Giant 3D Light-up Numbers (e.g. '25' or '50')",
        "300 Chrome Gold, Black & Pearl White Balloon Garland",
        "Exotic Fresh Flower Clusters (Carnations, Orchids & Lilies)",
        "Ambient Up-lighting & Floor Fog Machine for Entry",
        "2 Senior Stylists with Venue Setup Coordinator"
      ],
      "tags": [
        "25th Silver Jubilee",
        "50th Golden Jubilee",
        "Shimmer Wall"
      ],
      "subcategory": "grand"
    },
    {
      "id": "cabana-canopy-terrace-decor",
      "title": "Magical Cabana Canopy Terrace Decor",
      "category": "anniversary",
      "categoryName": "Anniversary",
      "price": 3499,
      "originalPrice": 4499,
      "discount": 22,
      "rating": 4.9,
      "reviewsCount": 275,
      "badge": "ROMANTIC",
      "image": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Open-air terrace or lawn cabana tent draped in flowing chiffon fabrics with star fairy light canopy and floor mattress seating.",
      "inclusions": [
        "Wooden Cabana Structure with White Chiffon Drapes",
        "Curtain Fairy String Lights (30 meters)",
        "Floor Rugs, Satin Throw Pillows & Bolsters",
        "100 Red & Rose Gold Balloons around Cabana Pillars",
        "Fresh Rose Petals & Flameless LED Pathway"
      ],
      "tags": [
        "Terrace Cabana",
        "Stargazing Dinner",
        "Proposal"
      ],
      "subcategory": "canopy"
    },
    {
      "id": "cocomelon-kids-theme",
      "title": "Cocomelon Fun Kids Birthday Theme",
      "category": "kids",
      "categoryName": "Kids Themes",
      "price": 2999,
      "originalPrice": 3999,
      "discount": 25,
      "rating": 5,
      "reviewsCount": 412,
      "badge": "POPULAR",
      "image": "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp",
        "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Vibrant Cocomelon themed backdrop featuring JJ character cutouts, watermelon foil balloons, and bright pastel balloon arch.",
      "inclusions": [
        "220 Green, Yellow, Blue & Pink Pastel Balloons",
        "Round Cocomelon Fabric Backdrop (6ft Diameter)",
        "2 Standee Character Cutouts (JJ & Watermelon)",
        "Birthday Child Name Wooden Cutout",
        "Cocomelon Theme Foil Balloons (Set of 5)",
        "Complete assembly by kids party specialist"
      ],
      "tags": [
        "Cocomelon",
        "1st Birthday",
        "Toddlers"
      ],
      "subcategory": "cocomelon"
    },
    {
      "id": "baby-shark-underwater-theme",
      "title": "Baby Shark Underwater Theme",
      "category": "kids",
      "categoryName": "Kids Themes",
      "price": 3199,
      "originalPrice": 4299,
      "discount": 26,
      "rating": 4.9,
      "reviewsCount": 318,
      "badge": "LOVED",
      "image": "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      "gallery": [
        "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Dive into ocean fun! Baby shark character cutouts, sea-weed balloon pillars, bubble transparent balloons, and oceanic arch.",
      "inclusions": [
        "200 Ocean Blue, Teal & Sunshine Yellow Balloons",
        "Under-the-Sea Backdrop with Wave Cutouts",
        "Baby Shark Family Standees (Set of 3)",
        "Bubble Foil Balloons & Sea Creature Foils (Octopus, Starfish)",
        "LED Blue Stage Floodlight"
      ],
      "tags": [
        "Baby Shark",
        "Ocean Theme",
        "Under 5 Years"
      ],
      "subcategory": "babyshark"
    },
    {
      "id": "boss-baby-theme-decor",
      "title": "The Boss Baby Theme Decor",
      "category": "kids",
      "categoryName": "Kids Themes",
      "price": 3499,
      "originalPrice": 4599,
      "discount": 24,
      "rating": 4.8,
      "reviewsCount": 260,
      "badge": "TRENDING",
      "image": "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp",
      "gallery": [
        "https://cdn.balloondekor.com/images/33/8f427771-4dd9-4d69-be54-946fdf81b81d.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Sophisticated navy blue, baby blue, and chrome silver theme for your little boss with briefcase cutouts and bow-ties.",
      "inclusions": [
        "200 Navy Blue, Sky Blue & Chrome Silver Balloons",
        "Boss Baby Round Backdrop with Suit Monogram",
        "Boss Baby Standing Cutout (4ft Height)",
        "Custom Name Board: 'Boss [Child Name]'",
        "Foil Baby Bottle & Bow-tie Balloons"
      ],
      "tags": [
        "Boss Baby",
        "Boy Birthday",
        "Corporate Baby"
      ],
      "subcategory": "bossbaby"
    },
    {
      "id": "jungle-safari-kids-party",
      "title": "Wild Jungle Safari Theme Decor",
      "category": "kids",
      "categoryName": "Kids Themes",
      "price": 3299,
      "originalPrice": 4399,
      "discount": 25,
      "rating": 5,
      "reviewsCount": 388,
      "badge": "BESTSELLER",
      "image": "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp",
      "gallery": [
        "https://cdn.balloondekor.com/images/33/c43fa93c-2a62-4aa8-9fce-ba7a966838b9.webp"
      ],
      "setupDuration": "3 Hours",
      "description": "An adventurous jungle forest setting with lion, giraffe, and zebra foil cutouts, tropical palm leaves, and earthy balloon garlands.",
      "inclusions": [
        "250 Safari Green, Yellow, Brown & Gold Chrome Balloons",
        "Jungle Backdrop Screen with Wooden Gate Styling",
        "5 3D Animal Foil Balloons (Lion, Giraffe, Tiger, Zebra, Monkey)",
        "Artificial Monster Monstera Leaves & Vines",
        "Rustic Wooden Cake Stand on Rental"
      ],
      "tags": [
        "Jungle Safari",
        "Wild One",
        "Animals"
      ],
      "subcategory": "jungle"
    },
    {
      "id": "frozen-wonderland-theme",
      "title": "Frozen Ice Wonderland Theme",
      "category": "kids",
      "categoryName": "Kids Themes",
      "price": 3599,
      "originalPrice": 4799,
      "discount": 25,
      "rating": 4.9,
      "reviewsCount": 340,
      "badge": "LOVED",
      "image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "3 Hours",
      "description": "Magical snowy castle theme featuring Elsa and Olaf cutouts, snowflake balloon clusters, and glistening icy silver foil drapes.",
      "inclusions": [
        "220 Icy Blue, Metallic Purple & Chrome Silver Balloons",
        "Winter Ice Castle Backdrop Frame",
        "Elsa & Olaf Character Standees",
        "6 Glistening Snowflake Foil Balloons",
        "Fairy Lights with Cool White Ice Effect"
      ],
      "tags": [
        "Frozen",
        "Elsa & Olaf",
        "Princess Theme"
      ],
      "subcategory": "frozen"
    },
    {
      "id": "baby-shower-pastel-decor",
      "title": "Pastel Dream Baby Shower Decor",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "price": 2699,
      "originalPrice": 3499,
      "discount": 23,
      "rating": 4.9,
      "reviewsCount": 230,
      "badge": "LOVED",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Dreamy gender-neutral pastel palette with soft beige, blush and mint tones, 'Oh Baby' neon sign, and floral accents.",
      "inclusions": [
        "180 Macaron Pastel Balloons (Peach, Ivory, Mint & Gold)",
        "Curved Backdrop Screen with 'Oh Baby' Warm Neon Sign",
        "Artificial Pampas & White Rose Clusters",
        "Golden Baby Feet Foil Balloon",
        "Mom-to-be Satin Sash & Flower Crown"
      ],
      "tags": [
        "Gender Neutral",
        "Pastel Colors",
        "Mom To Be"
      ],
      "subcategory": "shower"
    },
    {
      "id": "newborn-welcome-baby-decor",
      "title": "Welcome Baby Home Decor (Boy/Girl)",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "price": 1899,
      "originalPrice": 2499,
      "discount": 24,
      "rating": 4.8,
      "reviewsCount": 195,
      "badge": "EXPRESS",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
      ],
      "setupDuration": "1.5 Hours",
      "description": "Hassle-free, quick 90-minute doorstep setup before mother and baby arrive from the hospital. Gentle noise-free setup.",
      "inclusions": [
        "100 Soft Metallic Balloons (Customizable: Pink or Blue)",
        "1 'Welcome Baby' Foil Letter Banner",
        "Cradle / Bassinet Ribbon & Balloon Garland",
        "Baby Carriage Foil Balloon",
        "Doorway Welcome Toran"
      ],
      "tags": [
        "Hospital Arrival",
        "Same Day Setup",
        "Baby Welcome"
      ],
      "subcategory": "welcome"
    },
    {
      "id": "baby-shower-teddy-bear-theme",
      "title": "Oh Baby Teddy Bear Luxury Theme Setup",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "price": 3499,
      "originalPrice": 4699,
      "discount": 26,
      "rating": 5,
      "reviewsCount": 310,
      "badge": "TRENDING",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Trendy 'We Can Bearly Wait' theme with giant plush teddy bear, caramel and cream organic arches, and baby block boxes.",
      "inclusions": [
        "220 Caramel, Sand White & Coffee Tone Balloons",
        "Plush 3ft Sitting Teddy Bear Mascot (Rental)",
        "4 Illuminated 'BABY' Letter Box Blocks",
        "Circular Wooden Arch with Custom Lettering",
        "Artificial Floral Arrangement on Arch"
      ],
      "tags": [
        "Teddy Bear",
        "Bearly Wait",
        "Godh Bharai"
      ],
      "subcategory": "teddy"
    },
    {
      "id": "baby-shower-teddy-cloud-cradle-decor",
      "title": "Teddy & Pastel Clouds Baby Shower Cradle Decor",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "price": 3499,
      "originalPrice": 4499,
      "discount": 22,
      "rating": 4.9,
      "reviewsCount": 220,
      "badge": "LOVED",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Fluffy balloon cloud clusters surrounding traditional ceremonial cradle with hanging stars and glowing moon.",
      "inclusions": [
        "180 White & Soft Blue/Pink Cloud Balloons",
        "Traditional Cradle Floral Garlanding",
        "Foil Crescent Moon & Stars cluster",
        "Warm Fairy Lights woven into cradle drapes",
        "Ceremonial Brass Pooja Thali Decoration"
      ],
      "tags": [
        "Cradle Decor",
        "Naming Ceremony",
        "Tradition"
      ],
      "subcategory": "teddy"
    },
    {
      "id": "baby-welcome-home-balloon-surprise",
      "title": "Baby Welcome Home Room Surprise Decor",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "price": 2199,
      "originalPrice": 2899,
      "discount": 24,
      "rating": 4.8,
      "reviewsCount": 180,
      "badge": "SWEET",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Bright, welcoming bedroom surprise for mommy and the newborn with customized welcome poster and floor balloon pool.",
      "inclusions": [
        "120 Metallic Pastel Balloons (Floor & Ceiling with Ribbons)",
        "Custom Name Poster: 'Welcome Home [Baby Name]'",
        "2 Foil Baby Feet (24 inches)",
        "Warm LED String Lights across bedroom",
        "Special Mom & Dad Congratulations Ribbon"
      ],
      "tags": [
        "Room Surprise",
        "Welcome Baby",
        "Newborn"
      ],
      "subcategory": "welcome"
    },
    {
      "id": "house-decor",
      "title": "House Decoration",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 9999,
      "originalPrice": 12999,
      "discount": 23,
      "rating": 4.9,
      "reviewsCount": 240,
      "badge": "TRADITIONAL",
      "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "3 - 4 Hours",
      "description": "Complete traditional home decoration for weddings including front gate pandals, vibrant LED string lights, fresh banana tree pillars, marigold entrance torans, and courtyard styling.",
      "inclusions": [
        "Entrance Banana Trees with Fresh Floral Garlands",
        "Front Facade & Terrace Rice Light Pandal (Up to 100m)",
        "Marigold Toran for Main Doorway",
        "Courtyard Rangoli & Traditional Brass Urli with Floating Petals",
        "Complete on-site setup by our certified wedding florists"
      ],
      "tags": [
        "Pandals",
        "Lighting",
        "Banana Trees",
        "Flowers"
      ],
      "options": [
        {
          "id": "hd_pendals",
          "title": "Pendals In Front Of House",
          "subPrompt": "Choose pendal type",
          "subItems": [
            "Tenkaya pandhiri",
            "Normal pendals"
          ]
        },
        {
          "id": "hd_lighting",
          "title": "Lighting Decoration For Building",
          "subPrompt": "3 or 5 Days with Max of 50 Serial Sets",
          "subItems": [
            "3 Days (Max 50 Serial Sets)",
            "5 Days (Max 50 Serial Sets)"
          ]
        },
        {
          "id": "hd_banana",
          "title": "Banana Trees & Mango Leaves",
          "subPrompt": "Main doorway auspicious pillars",
          "subItems": [
            "Banana Trees & Mango Leaves"
          ]
        },
        {
          "id": "hd_marigold",
          "title": "Marigold Flowers For Main Door And Inside the House",
          "subPrompt": "Choose flower type",
          "subItems": [
            "Normal",
            "Special"
          ]
        },
        {
          "id": "hd_gaja",
          "title": "Gaja Maala For Main Door",
          "subPrompt": "Grand entrance garland",
          "subItems": [
            "Yes",
            "No"
          ]
        }
      ],
      "subcategory": "house-decor"
    },
    {
      "id": "nalugu-snanam",
      "title": "Nalugu & Mangala Snanam Decoration",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 7499,
      "originalPrice": 9499,
      "discount": 21,
      "rating": 4.9,
      "reviewsCount": 185,
      "badge": "RITUAL SPECIAL",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "2 - 3 Hours",
      "description": "Auspicious yellow and orange marigold setup designed for ritual purifications, Nalugu and Mangala Snanam. Features traditional brass urlis, wooden peeta, flower jewellery for the bride/groom, and vibrant backdrop frames.",
      "inclusions": [
        "Traditional Brass Urli with fresh yellow marigold & rose petals",
        "Floral Backdrop Frame with yellow drapery & tassels",
        "Handcrafted Flower Jewellery Set for Bride",
        "Two Wooden / Brass Peetas (Seating Stools)",
        "Haldi Bowls, Kunkum plates & Traditional ritual props"
      ],
      "tags": [
        "Traditional decorations",
        "Flower jewellery",
        "Nallu items"
      ],
      "options": [
        {
          "id": "ns_concept",
          "title": "Main Decoration Services",
          "subPrompt": "Traditional rituals decor",
          "subItems": [
            "Nalugu Concept Decoration",
            "Mangala Sanam Decoration",
            "Flower Jewellery",
            "Nalugu Maala (Petals)",
            "Nalugu Maala (Normal)"
          ]
        },
        {
          "id": "ns_food",
          "title": "For Nalugu Event (Traditional Feast Menu)",
          "subPrompt": "Select customary food items",
          "subItems": [
            "Sweet",
            "Rice",
            "Pappu",
            "Sambar",
            "Rasam",
            "Curd",
            "Pickle",
            "Chips",
            "Oil Fry"
          ]
        },
        {
          "id": "ns_photo",
          "title": "Photo & Videography",
          "subPrompt": "Ceremony coverage",
          "subItems": [
            "Traditional Photo",
            "Traditional Video",
            "Candid Photo",
            "Candid Video"
          ]
        },
        {
          "id": "ns_melam",
          "title": "Nalugu Mangala Melam (4 - members)",
          "subPrompt": "Auspicious instrumental team",
          "subItems": [
            "2 Dolu",
            "2 Sannai"
          ]
        }
      ],
      "subcategory": "nalugu-snanam"
    },
    {
      "id": "function-hall-decor",
      "title": "Function Hall Flower Decoration",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 24999,
      "originalPrice": 32999,
      "discount": 24,
      "rating": 5,
      "reviewsCount": 310,
      "badge": "GRAND STAGE",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "4 - 6 Hours",
      "description": "Grand banquet hall and convention center wedding styling. Includes majestic grand entrance arch, mandapam / stage backdrop with exotic flowers, couple sofa, aisle walkway runners, and chandeliers.",
      "inclusions": [
        "Grand Hall Entrance Floral Arch with welcome board",
        "Main Wedding Mandap / Stage with Royal Backdrop & Lighting",
        "Exclusive Maharaja Couple Sofa / Royal Chairs",
        "Red Carpet / Floral Aisle Walkway with pillars",
        "Round Table centerpieces with floral vases"
      ],
      "tags": [
        "Entrance",
        "Stage",
        "Reception",
        "Flower decoration"
      ],
      "options": [
        {
          "id": "fhd_entrance",
          "title": "Entrance & Welcome",
          "subPrompt": "Grand foyer styling",
          "subItems": [
            "Entrance Arch With 2 Flex Banners",
            "Banana Trees & Mango Leaves",
            "Pendals With Side Wall Entrance",
            "Lighting Entrance",
            "Trust Box Entrance (Normal)",
            "Trust Box Entrance (Lighting)",
            "Ring Passage Entrance",
            "Foot roll Mats"
          ]
        },
        {
          "id": "fhd_stage",
          "title": "Stage & Reception",
          "subPrompt": "Royal couple backdrop & rituals",
          "subItems": [
            "Reception Decoration",
            "Reception Garlands (Petals) – 1 Pair",
            "Lord Ganesh Setup",
            "Muhurtham Decoration",
            "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)",
            "Sangyam Garlands [ Normal ] – 2 Pairs",
            "Basikalu 2",
            "Design Coconut [ With Bride & Groom Names ]"
          ]
        },
        {
          "id": "fhd_vehicle",
          "title": "Vehicle & Flower Items",
          "subPrompt": "Wedding cars and ritual florals",
          "subItems": [
            "Car Decoration – 2 Cars [ Stickers – 4 ]",
            "15 Muralu puvulu",
            "Adduthera"
          ]
        },
        {
          "id": "fhd_requirements",
          "title": "Additional Requirements",
          "subPrompt": "Hall furniture and amenities",
          "subItems": [
            "Function Hall Chair Clothes",
            "Vip Sofas",
            "Stages",
            "Coolers"
          ]
        }
      ],
      "subcategory": "mandap-stage"
    },
    {
      "id": "catering",
      "title": "Catering",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 49999,
      "originalPrice": 59999,
      "discount": 17,
      "rating": 4.8,
      "reviewsCount": 420,
      "badge": "MULTI-CUISINE",
      "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "Full Day Service",
      "description": "Hygienic, authentic traditional and multi-cuisine wedding catering. Includes welcome mocktails, live chaat counter, traditional banana leaf / buffet service, signature curries, biryani, artisanal breads, and decadent desserts.",
      "inclusions": [
        "Welcome Drinks & Live Mocktail Station",
        "Live Street Food / Chaat Counters",
        "Multi-course Traditional Vegetarian Feast (Banana leaf or buffet)",
        "3 Signature Sweets & Hot Desserts (Jalebi, Gulab Jamun, Halwa)",
        "Professional uniformed serving staff & premium cutlery"
      ],
      "tags": [
        "Customizable veg menu",
        "Buffet service",
        "Live counters"
      ],
      "options": [
        {
          "id": "cat_infrastructure",
          "title": "Catering Requirements",
          "subPrompt": "Stalls & buffet setup",
          "subItems": [
            "LED Stalls",
            "Normal Cloth Stalls",
            "Round Tables With Cloth",
            "Chair Clothes [Dining]",
            "Brass Dishes",
            "Steel Dishes"
          ]
        },
        {
          "id": "cat_snacks",
          "title": "Evening Snacks (4.30pm Onwards)",
          "subPrompt": "Select up to 5 items & welcome drink",
          "subItems": [
            "Bajji",
            "Bonda",
            "Medhu Pakoda",
            "Onion Pokoda",
            "Corn Rolls",
            "Corn Samosa",
            "Onion Samosa",
            "Veg. Cutlet",
            "Veg. Springroll",
            "Chutney",
            "Tomato Sauce",
            "Coffee & Tea",
            "Pulpy Mango",
            "Pulpy Orange",
            "Cold Badam Milk",
            "Hot Badam Milk",
            "Fruit Juice"
          ]
        },
        {
          "id": "cat_sweets",
          "title": "Night Dinner Sweets (Select any two)",
          "subPrompt": "Authentic pure ghee sweets",
          "subItems": [
            "Poli",
            "Basundi",
            "Jilebi",
            "Badham Halwa",
            "Jangri",
            "Kaju Cake",
            "Rasamalai",
            "Kala Jamoon",
            "Bandar Laddu",
            "Badhusha",
            "Kaju Roll",
            "Badham Cake",
            "Dry Jamoon",
            "Carrot Halwa",
            "Laddu",
            "Pistha Roll",
            "Rasagulla",
            "Champakalli",
            "Kalakhand",
            "Mysore Pak",
            "Malai Sandwich",
            "Malaikaja",
            "Cham Cham",
            "Dry Fruit Halwa",
            "Agra Killi",
            "Kova Jangri",
            "Ravva Laddu",
            "Dry Fruit Laddu"
          ]
        },
        {
          "id": "cat_hot_biryani",
          "title": "Hot Items & Biriyani Rice",
          "subPrompt": "Crisp snacks & fragrant biriyanis",
          "subItems": [
            "Masala Vada",
            "Curd Vada",
            "Corn Samosa",
            "Alasanda Vada",
            "Corn Vada",
            "Veg Spring Roll",
            "Keera Vada (Leaves)",
            "Cabbage Vada",
            "Kaju Pakodi",
            "Vegetable Biriyani",
            "Babycorn Biriyani",
            "Kaju Capsicum Biriyani",
            "Mushroom Biriyani",
            "Panasa Biriyani",
            "Paneer Biriyani"
          ]
        },
        {
          "id": "cat_gravy_rice",
          "title": "Special Gravy & Special Rice",
          "subPrompt": "Rich curries & rice variations",
          "subItems": [
            "Nune Vankaya",
            "Mushroom Curry",
            "Vegetable Kurma",
            "Kaju Capsicum Curry",
            "Potato Green Peas Masala",
            "Karivepaku Rice",
            "Pulhora",
            "Lemon Rice",
            "Pudina Rice",
            "Mango Rice",
            "Tomato Rice",
            "Ghee Rice",
            "Gongura Rice",
            "Kothimira Rice",
            "Coconut Rice",
            "Palak Rice"
          ]
        },
        {
          "id": "cat_roti_fry",
          "title": "Roti, Raita, Fry & Traditional Essentials",
          "subPrompt": "Breads, accompaniments & curries",
          "subItems": [
            "Chapati",
            "Pulka",
            "Rumal",
            "Onion Raita",
            "Veg. Mixed Raita",
            "Paneer Butter Masala",
            "Alu Mutter",
            "Palak Paneer",
            "Chana Masala",
            "Methi Chaman",
            "Bendakaya Pakodi",
            "Bendakaya Fry",
            "Dondakayipakodi",
            "Potato Curry",
            "Rice",
            "Sambar",
            "Curd",
            "Rasam (Pappu/Pepper)",
            "Chips or Papad"
          ]
        }
      ],
      "subcategory": "house-decor"
    },
    {
      "id": "sangyam-sweets",
      "title": "Sangyam Sweets",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 4999,
      "originalPrice": 5999,
      "discount": 17,
      "rating": 4.9,
      "reviewsCount": 190,
      "badge": "PURE GHEE",
      "image": "assets/sangyam-sweets.jpg",
      "gallery": [
        "assets/sangyam-sweets.jpg"
      ],
      "setupDuration": "Delivered to Venue",
      "description": "Handcrafted authentic wedding sweets and savory snacks made with pure cow ghee. Packaged in customized wedding gift boxes, perfect for guest welcome and rituals.",
      "inclusions": [
        "Pure Desi Ghee Motichoor Laddoos & Kaju Katli",
        "Authentic Regional Sweets (Mysore Pak, Badusha, Peda)",
        "Crunchy Savories (Murukku, Mixture, Ribbon Pakoda)",
        "Customized Embossed Wedding Gift Boxes",
        "Fresh batch preparation with guaranteed shelf-life testing"
      ],
      "tags": [
        "Traditional sweets",
        "Snacks",
        "Pure Ghee",
        "Sangyam"
      ],
      "options": [
        {
          "id": "sw_sweets",
          "title": "Sweets (Select Sweet 1 & Sweet 2)",
          "subPrompt": "Select a sweet and quantity in Nos",
          "subItems": [
            "Kaju Katli",
            "Motichoor Laddu",
            "Mysore Pak",
            "Gulab Jamun",
            "Rasgulla",
            "Dry Fruit Halwa",
            "Peda",
            "Badusha",
            "Kala Jamun",
            "Rasmalai",
            "Basundi",
            "Kaju Roll"
          ]
        },
        {
          "id": "sw_hot",
          "title": "Hot Items (Savory Snacks)",
          "subPrompt": "Select hot items and quantity in Kgs",
          "subItems": [
            "Masala Vada",
            "Corn Samosa",
            "Veg Spring Roll",
            "Kaju Pakodi",
            "Alasanda Vada",
            "Onion Pakoda",
            "Murukku",
            "Ribbon Pakoda",
            "Chekkalu"
          ]
        }
      ],
      "subcategory": "house-decor"
    },
    {
      "id": "photo-video",
      "title": "Photo & Videography",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 29999,
      "originalPrice": 39999,
      "discount": 25,
      "rating": 5,
      "reviewsCount": 260,
      "badge": "4K CINEMATIC",
      "image": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "Event Duration",
      "description": "Top-tier wedding cinematographers capturing every emotional ritual and candid smile. Includes high-res digital albums, 4K cinematic wedding teaser, drone footage, and traditional full-length coverage.",
      "inclusions": [
        "2 Candid Photographers + 2 Traditional Cameras",
        "4K Cinematic Wedding Teaser (3-5 minutes)",
        "Full HD Traditional Wedding Film (60-90 minutes)",
        "Aerial Drone Coverage for grand venue shots",
        "Premium Leather Photobook Album (100 pages, 300+ photos)"
      ],
      "tags": [
        "Traditional & candid photography",
        "4K Video",
        "Drone"
      ],
      "options": [
        {
          "id": "pv_main",
          "title": "Main Photo & Video Coverage",
          "subPrompt": "Camera crew",
          "subItems": [
            "Traditional Photo",
            "Traditional Video",
            "One Videographer Coverage Entrance & Dining Hall",
            "Candid Photographer for couples",
            "Candid Videographer For Couples"
          ]
        },
        {
          "id": "pv_tech",
          "title": "Drone, Screen & Live Stream",
          "subPrompt": "Display & streaming technology",
          "subItems": [
            "Drone",
            "TV (Full / Half)",
            "LED Wall (Full / Half)",
            "Live Stream (Half Session)",
            "Live Stream (Full Session)"
          ]
        },
        {
          "id": "pv_shoots",
          "title": "Pre & Post Wedding Shoots",
          "subPrompt": "Cinematic shoots",
          "subItems": [
            "Pre Wedding Shoot (Normal)",
            "Pre Wedding Shoot (Cinematic)",
            "Post Wedding Shoot (Normal)",
            "Post Wedding Shoot (Cinematic)"
          ]
        },
        {
          "id": "pv_addons",
          "title": "Additional Services & Deliverables",
          "subPrompt": "Albums and digital gifts",
          "subItems": [
            "Whats App Invitation",
            "Promo (Only For Candid Video)",
            "Marriage Album (Sheets)",
            "Pendrive",
            "Photo Frame",
            "Harddisk [1 TB]"
          ]
        },
        {
          "id": "pv_vratham",
          "title": "Sathyanarayana Vratham Coverage",
          "subPrompt": "Vratham ceremony",
          "subItems": [
            "Yes",
            "No"
          ]
        }
      ],
      "subcategory": "photo-video"
    },
    {
      "id": "melam",
      "title": "Melam",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 8499,
      "originalPrice": 10999,
      "discount": 23,
      "rating": 4.8,
      "reviewsCount": 140,
      "badge": "AUSPICIOUS",
      "image": "assets/traditional-melam.jpg",
      "gallery": [
        "assets/traditional-melam.jpg"
      ],
      "setupDuration": "Ritual Timings",
      "description": "Master musicians providing soul-stirring auspicious melodies for your muhurat and Baraat processions. Traditional Nadaswaram, Thavil, Punjabi Dhol, and Shehnai troupes.",
      "inclusions": [
        "Traditional Nadaswaram & Thavil Vidwans Troupe",
        "Punjabi Dhol Beats for energetic Baraat entry",
        "Auspicious Shehnai music for morning muhurat rituals",
        "Traditional ethnic attire for all performers",
        "Full sound reinforcement system included"
      ],
      "tags": [
        "Nadaswaram",
        "Dhol",
        "Traditional music"
      ],
      "options": [
        {
          "id": "melam_mangala",
          "title": "Mangala Melam",
          "subPrompt": "Select instruments type",
          "subItems": [
            "Nalugu (4 Members) - 2 Dolu",
            "Nalugu (4 Members) - 2 Sannai"
          ]
        },
        {
          "id": "melam_welcoming",
          "title": "Welcoming Melam",
          "subPrompt": "Select welcoming location",
          "subItems": [
            "Welcoming (House)",
            "Welcoming (Function Hall)"
          ]
        },
        {
          "id": "melam_marriage",
          "title": "Marriage Melam",
          "subPrompt": "Select troupe size",
          "subItems": [
            "Marriage (6 Members)",
            "Marriage (9 Members)"
          ]
        },
        {
          "id": "melam_kerala_drums",
          "title": "Kerala Drums",
          "subPrompt": "Select members strength",
          "subItems": [
            "Kerala Drums (5 Members)",
            "Kerala Drums (10 Members)",
            "Kerala Drums (15 Members)"
          ]
        },
        {
          "id": "melam_band_set",
          "title": "Band Set",
          "subPrompt": "Select band strength",
          "subItems": [
            "Band Set (7 Members)",
            "Band Set (12 Members)",
            "Band Set (15 Members)"
          ]
        }
      ],
      "subcategory": "melam-music"
    },
    {
      "id": "special-events",
      "title": "Special Events",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 11999,
      "originalPrice": 14999,
      "discount": 20,
      "rating": 4.9,
      "reviewsCount": 175,
      "badge": "THEME DECOR",
      "image": "assets/special-events-pyro.jpg",
      "gallery": [
        "assets/special-events-pyro.jpg"
      ],
      "setupDuration": "3 Hours",
      "description": "Full-scale themed pre-wedding parties and grand receptions. Includes concept design, special lighting, cold fire entry pyrotechnics, dry ice smoke, and personalized themes.",
      "inclusions": [
        "Thematic Concept & Custom Lighting Rig",
        "Cold Pyro Sparkulars for Grand Bride & Groom Entry",
        "Heavy Dry Ice Fog for magical first dance",
        "Custom Monogram Floor Projection & Neon Backdrops",
        "Dedicated On-Site Event Coordinator"
      ],
      "tags": [
        "Sangeet",
        "Reception",
        "Theme events",
        "Cold Pyro"
      ],
      "options": [
        {
          "id": "se_col1",
          "title": "Event Options (Column 1)",
          "subPrompt": "Props & entries with quantities",
          "subItems": [
            "Photo Booth",
            "Crackers 120 Shots",
            "Pallaki With Boys",
            "Flower Shots – 25+",
            "Design Pot",
            "Fog – 4 times",
            "Sky Lanterns",
            "Welcoming Dance"
          ]
        },
        {
          "id": "se_col2",
          "title": "Event Options (Column 2)",
          "subPrompt": "Entries, horses & fireworks with quantities",
          "subItems": [
            "Horse",
            "Horse Cart",
            "Cold Fire – 4 times",
            "Harathi plates",
            "Design Umbrella",
            "Doli",
            "Special Entry",
            "Design Butta"
          ]
        }
      ],
      "subcategory": "melam-music"
    },
    {
      "id": "musical-events",
      "title": "Musical Events",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 19999,
      "originalPrice": 24999,
      "discount": 20,
      "rating": 4.9,
      "reviewsCount": 160,
      "badge": "LIVE BAND",
      "image": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "3 Hours Show",
      "description": "Enthralling live musical bands, acoustic singers, Sufi ensembles, and classical fusion orchestras to keep your wedding guests mesmerized throughout the evening.",
      "inclusions": [
        "Live Acoustic / Bollywood / Sufi Fusion Band",
        "Professional Stage Audio & Line-Array Speakers",
        "Stage Lighting, Moving Heads & LED Par Cans",
        "Sound Engineer & Stage Tech Crew",
        "Customized 3-Hour Musical Performance Setlist"
      ],
      "tags": [
        "Live music",
        "Orchestra",
        "Cultural programs"
      ],
      "options": [
        {
          "id": "me_options",
          "title": "Musical Entertainment Cards",
          "subPrompt": "Select music genres & setup",
          "subItems": [
            "Orchestra (Full orchestra for a grand musical experience)",
            "DJ (Professional DJ with latest music collection)",
            "Light Music (Melodious light music for a pleasant atmosphere)",
            "Live Instrumental Music (Live instrumental performance)"
          ]
        }
      ],
      "subcategory": "melam-music"
    },
    {
      "id": "sangyam-bags",
      "title": "Sangyam Bags",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 2999,
      "originalPrice": 3999,
      "discount": 25,
      "rating": 4.8,
      "reviewsCount": 215,
      "badge": "RETURN GIFTS",
      "image": "assets/sangyam-bags.jpg",
      "gallery": [
        "assets/sangyam-bags.jpg"
      ],
      "setupDuration": "Delivered in Bulk",
      "description": "Exquisitely designed wedding favor bags featuring silk brocade, jute-cotton, or golden foil prints with bride and groom names. Perfect for distributing sweets, clothes, and tamboolam.",
      "inclusions": [
        "Customized High-Quality Fabric / Paper Gift Bags",
        "Personalized Gold Foil Monogram (Names & Date)",
        "Traditional Tamboolam Coconut & Betel Leaf holders",
        "Choice of Vibrant Colors (Red, Gold, Royal Blue, Pink)",
        "Bulk order door delivery across your chosen venue"
      ],
      "tags": [
        "Return gifts",
        "Customized bags",
        "Favors"
      ],
      "options": [
        {
          "id": "sb_combo",
          "title": "Sangyam Bags (Combo)",
          "subPrompt": "Complete sangyam bag combo with all items",
          "subItems": [
            "Printed Name Bags",
            "Coconut",
            "Aku, Vakka",
            "Pasupu Kumkuma"
          ]
        },
        {
          "id": "sb_quantities",
          "title": "Combo Sets Quantity Selection",
          "subPrompt": "Standard order batch",
          "subItems": [
            "50 Sets",
            "100 Sets",
            "150 Sets",
            "200 Sets",
            "250 Sets",
            "500 Sets"
          ]
        }
      ],
      "subcategory": "house-decor"
    },
    {
      "id": "bridal-makeup",
      "title": "Bridal Makeup",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 14999,
      "originalPrice": 18999,
      "discount": 21,
      "rating": 5,
      "reviewsCount": 280,
      "badge": "CELEBRITY ARTISTS",
      "image": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "3 Hours Session",
      "description": "Certified celebrity bridal hair and makeup artists providing HD and Airbrush makeup that stays flawless for 16+ hours through tearful farewells and intense photo flashes.",
      "inclusions": [
        "HD / Airbrush Bridal Makeup using luxury international brands (MAC, Huda, Dior)",
        "Traditional / Modern Bridal Hairstyling with fresh floral gajras",
        "Saree / Lehenga Draping & Jewellery Setting",
        "Touch-up kit for reception & muhurat",
        "Optional Family / Bridesmaids Makeup Add-ons available"
      ],
      "tags": [
        "Professional bridal makeup",
        "HD & Airbrush",
        "Styling"
      ],
      "options": [
        {
          "id": "bm_makeup",
          "title": "Bridal Makeup Packages",
          "subPrompt": "Certified makeup artists",
          "subItems": [
            "HD Bridal Makeup & Hairstyling",
            "Luxury Airbrush Bridal Makeup",
            "Engagement & Reception Styling",
            "Mother & Sister Makeup Add-ons"
          ]
        },
        {
          "id": "bm_draping",
          "title": "Hair Styling & Saree Draping",
          "subPrompt": "Traditional finishing touches",
          "subItems": [
            "Bridal Hairstyling with Fresh Flower Venis",
            "Traditional Saree Draping & Jewellery Setting"
          ]
        }
      ],
      "subcategory": "bridal-styling"
    },
    {
      "id": "mehandi",
      "title": "Mehandi",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 5999,
      "originalPrice": 7999,
      "discount": 25,
      "rating": 4.9,
      "reviewsCount": 310,
      "badge": "ORGANIC HENNA",
      "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "4 Hours Session",
      "description": "Master henna artists creating intricate Arabic, Marwari, floral, and portrait bridal mehendi with 100% organic, chemical-free henna paste for rich dark mahogany stains.",
      "inclusions": [
        "Full Arm & Leg Intricate Bridal Henna with personalized motifs (Couple portrait, wedding date)",
        "Team of 3+ Henna Artists for wedding guests & family",
        "100% Organic Home-Brewed Henna Cones with nilgiri/eucalyptus oils",
        "Sealing Clove Spray & Post-Mehendi Care Balm for deep dark color",
        "Mehendi lounge cushion seating styling"
      ],
      "tags": [
        "Bridal & guest mehendi",
        "Organic Henna",
        "Dark Stain"
      ],
      "options": [
        {
          "id": "mh_bridal",
          "title": "Bridal Mehendi Designs",
          "subPrompt": "Intricate bridal artistry",
          "subItems": [
            "Traditional Rajasthani / Marwari Full Hand & Feet",
            "Arabic Floral Fusion Mehendi",
            "Figure & Portrait Custom Bridal Mehendi"
          ]
        },
        {
          "id": "mh_guests",
          "title": "Guest Mehendi & Quality Cones",
          "subPrompt": "Party counters for relatives",
          "subItems": [
            "Guest Mehendi Artists (Group Booking)",
            "100% Organic Fresh Henna Cones"
          ]
        }
      ],
      "subcategory": "bridal-styling"
    },
    {
      "id": "sangeet",
      "title": "Sangeet",
      "category": "wedding",
      "categoryName": "Wedding",
      "price": 19999,
      "originalPrice": 24999,
      "discount": 20,
      "rating": 4.9,
      "reviewsCount": 220,
      "badge": "PARTY & DJ",
      "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      ],
      "setupDuration": "Event Duration",
      "description": "Electrifying Sangeet night choreography and entertainment. Includes dance choreographers for family rehearsals, energetic wedding DJ with concert sound, and dazzling dance-floor LED screens.",
      "inclusions": [
        "Professional Bollywood & Folk Dance Choreographer for Family Rehearsals (7 sessions)",
        "Top Club / Wedding DJ with customized track mixing",
        "Concert Stage Sound, Truss Lighting & Illuminated LED Dance Floor",
        "Fun Wedding Emcee / Anchor for interactive couple games",
        "Props (LED sticks, sunglasses, dhols) for ultimate party vibe"
      ],
      "tags": [
        "Dance",
        "Music & entertainment",
        "Sangeet DJ"
      ],
      "options": [
        {
          "id": "sg_choreo",
          "title": "Dance Choreography & Rehearsals",
          "subPrompt": "Professional choreographers",
          "subItems": [
            "Couple Dance Choreography (3-5 Days)",
            "Family & Friends Group Choreography",
            "Grand Entry Flashmob Setup"
          ]
        },
        {
          "id": "sg_stage",
          "title": "Sangeet Stage, DJ & Lights",
          "subPrompt": "High-energy party setup",
          "subItems": [
            "Intelligent Moving Beam Lights & Trussing",
            "High-Resolution LED Stage Backdrop Wall",
            "Professional Sangeet DJ & Emcee"
          ]
        }
      ],
      "subcategory": "melam-music"
    },
    {
      "id": "corporate-office-milestone-decor",
      "title": "Corporate Milestone & Office Celebration Decor",
      "category": "corporate",
      "categoryName": "Corporate",
      "price": 4499,
      "originalPrice": 5999,
      "discount": 25,
      "rating": 4.9,
      "reviewsCount": 165,
      "badge": "BUSINESS",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Professional office anniversary or company milestone balloon arch with brand colors, metallic pillars, and stage balloon bouquets.",
      "inclusions": [
        "200 Brand-Aligned Chrome & Metallic Balloons (PMS Match)",
        "Reception Entrance Balloon Arch (8x7 ft)",
        "6 Helium Balloon Bunches on Conference Tables",
        "1 Foil Number Milestone Balloon (e.g., '10 Years')",
        "Quiet after-hours or early morning setup by corporate team"
      ],
      "tags": [
        "Office Decor",
        "Foundation Day",
        "Brand Colors"
      ],
      "subcategory": "office"
    },
    {
      "id": "corporate-annual-day-grand-stage",
      "title": "Grand Corporate Annual Day & Conference Stage Decor",
      "category": "corporate",
      "categoryName": "Corporate",
      "price": 6999,
      "originalPrice": 9499,
      "discount": 26,
      "rating": 5,
      "reviewsCount": 210,
      "badge": "EXECUTIVE",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      "setupDuration": "3 Hours",
      "description": "Grand auditorium stage backdrop decoration with balloon clusters, customized company logo board, and VIP entry podium styling.",
      "inclusions": [
        "350 Chrome & Matte Balloons matching corporate palette",
        "Auditorium Stage Framing with dual organic pillars",
        "VIP Entrance Walkway Ribbon Cutting Setup",
        "Custom Acrylic Company Logo Emblem",
        "GST Invoice with dedicated B2B account manager"
      ],
      "tags": [
        "Annual Day",
        "Townhall",
        "Auditorium"
      ],
      "subcategory": "stage"
    },
    {
      "id": "corporate-product-launch-balloon-arch",
      "title": "Corporate Product Launch Ribbon Cutting Decor",
      "category": "corporate",
      "categoryName": "Corporate",
      "price": 4999,
      "originalPrice": 6499,
      "discount": 23,
      "rating": 4.8,
      "reviewsCount": 140,
      "badge": "LAUNCH",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      "setupDuration": "2.5 Hours",
      "description": "Sleek retail store or product showcase entrance arch with red carpet runner, brass stanchions with velvet ropes, and ceremonial scissors.",
      "inclusions": [
        "Grand Store Entrance Balloon Arch (250 Balloons)",
        "Red Carpet Runway (15 ft length)",
        "4 Golden Stanchion Poles with Red Velvet Ropes",
        "Ribbon Cutting Stand with Golden Scissors on Tray",
        "Product Pedestal Spotlight Highlighting"
      ],
      "tags": [
        "Product Launch",
        "Store Opening",
        "Ribbon Cutting"
      ],
      "subcategory": "office"
    },
    {
      "id": "corporate-cubicle-bay-festive-decor",
      "title": "Office Workstation & Cubicle Festive Surprise",
      "category": "corporate",
      "categoryName": "Corporate",
      "price": 2999,
      "originalPrice": 3999,
      "discount": 25,
      "rating": 4.7,
      "reviewsCount": 190,
      "badge": "FESTIVE",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      "setupDuration": "2 Hours",
      "description": "Transform open cubicle bays and workstations for Diwali, New Year, or Christmas with ceiling hangings and desk bunches.",
      "inclusions": [
        "150 Ceiling Suspended Metallic Balloons with Ribbons",
        "10 Desktop Balloon Bouquets for Department Pods",
        "Festive Bunting & LED Warm Rice Lights across bays",
        "Cafeteria / Breakout Zone Balloon Drop",
        "Quick clean-up safe adhesives used"
      ],
      "tags": [
        "Cubicle Decor",
        "Diwali",
        "Office Party"
      ],
      "subcategory": "office"
    },
    {
      "id": "corporate-executive-townhall-stage-backdrop",
      "title": "Executive Townhall & Leadership Meet Backdrop",
      "category": "corporate",
      "categoryName": "Corporate",
      "price": 7499,
      "originalPrice": 9999,
      "discount": 25,
      "rating": 5,
      "reviewsCount": 110,
      "badge": "PREMIUM",
      "image": "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp",
      "gallery": [
        "https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp"
      ],
      "setupDuration": "3 Hours",
      "description": "Sleek, minimalist conference backdrop for quarterly townhalls, board meetings, and high-level leadership summits.",
      "inclusions": [
        "Matte Black & Chrome Platinum Architectural Balloon Frame",
        "Dual Stage Podiums with Branded Floral Accents",
        "Sound-Dampened Backdrop Panel Integration",
        "Conference Stage LED Uplighting (Pair of 4 Lights)",
        "Dedicated Corporate Operations Supervisor"
      ],
      "tags": [
        "Townhall",
        "Leadership Meet",
        "Board Meeting"
      ],
      "subcategory": "stage"
    },
    {
      "id": "gift-01",
      "title": "Soft Teddy Bear",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 699,
      "originalPrice": 899,
      "discount": 22,
      "rating": 4.8,
      "reviewsCount": 320,
      "badge": "POPULAR",
      "image": "assets/soft-teddy-bear-hero.jpg",
      "gallery": [
        "assets/soft-teddy-bear-hero.jpg"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Adorable, ultra-soft plush teddy bear crafted with hypoallergenic material. A timeless gift for birthdays, anniversaries, and heartfelt surprises.",
      "inclusions": [
        "Premium Soft Fur Plush Teddy Bear (35cm)",
        "Gift Ribbon & Greeting Note Card",
        "Safe Dust-Free Packaging"
      ],
      "tags": [
        "Gifts for Boys",
        "Gifts for Girls",
        "TeddyJoy"
      ],
      "subcategory": "girls"
    },
    {
      "id": "gift-02",
      "title": "Personalized Photo Mug",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 499,
      "originalPrice": 699,
      "discount": 29,
      "rating": 4.6,
      "reviewsCount": 210,
      "badge": "CUSTOM",
      "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "High-grade ceramic coffee mug customized with your favorite memory and quote in vibrant, dishwasher-safe sublimation print.",
      "inclusions": [
        "325ml Premium Ceramic Gloss Mug",
        "High-Definition Photo & Name Printing",
        "Shockproof Thermocol Gift Box"
      ],
      "tags": [
        "Gifts for Men",
        "Gifts for Women",
        "Archies"
      ],
      "subcategory": "boys"
    },
    {
      "id": "gift-03",
      "title": "Luxury Gift Hamper for Women",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 1999,
      "originalPrice": 2499,
      "discount": 20,
      "rating": 4.7,
      "reviewsCount": 185,
      "badge": "LUXURY",
      "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Express Delivery",
      "description": "Curated luxury pampering hamper featuring scented soy candles, artisan bath bombs, Ferrero Rocher chocolates, and greeting card in a golden-embossed reusable box.",
      "inclusions": [
        "Aromatic Soy Wax Jar Candle",
        "Assorted Artisan Chocolates (8 Pcs)",
        "Rose Scented Bath Salts & Loofah",
        "Gold Embossed Reusable Keepsake Box"
      ],
      "tags": [
        "Gifts for Women",
        "Wedding Gifts",
        "Archies"
      ],
      "subcategory": "women"
    },
    {
      "id": "gift-04",
      "title": "Men's Analog Watch",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 2499,
      "originalPrice": 3499,
      "discount": 29,
      "rating": 4.5,
      "reviewsCount": 98,
      "badge": "ELEGANT",
      "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Sleek stainless steel analog timepiece featuring mineral glass dial, genuine leather strap, and water resistance in a signature presentation box.",
      "inclusions": [
        "Classic Analog Chronograph Watch",
        "Genuine Leather Strap (Brown/Black)",
        "1-Year Manufacturer Warranty Card",
        "Luxury Velvet Lined Gift Box"
      ],
      "tags": [
        "Gifts for Men",
        "Archies",
        "Analog Watch"
      ],
      "subcategory": "men"
    },
    {
      "id": "gift-05",
      "title": "Fresh Red Rose Bouquet",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 1299,
      "originalPrice": 1599,
      "discount": 19,
      "rating": 4.8,
      "reviewsCount": 412,
      "badge": "FRESH",
      "image": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "2-Hour Express Delivery",
      "description": "Bunch of 20 hand-picked Dutch red roses wrapped in matte black paper and tied with a crimson satin ribbon.",
      "inclusions": [
        "20 Fresh Dutch Long-Stem Red Roses",
        "Premium Matte Black & Gold Wrapping",
        "Satin Ribbon Bow & Greeting Note Card",
        "Flower Food Sachet for Longevity"
      ],
      "tags": [
        "Flowers",
        "Gifts for Women",
        "FlowerAura"
      ],
      "subcategory": "flowers"
    },
    {
      "id": "gift-06",
      "title": "Ferrero Rocher Chocolate Box",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 899,
      "originalPrice": 1099,
      "discount": 18,
      "rating": 4.6,
      "reviewsCount": 276,
      "badge": "SWEET",
      "image": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Crispy hazelnut chocolate pralines encased in gold foil, guaranteed to sweeten any celebration.",
      "inclusions": [
        "16 Pieces Authentic Ferrero Rocher Pralines",
        "Luxury Transparent Gift Case",
        "Decorative Gift Ribbon & Card"
      ],
      "tags": [
        "Chocolates",
        "Gifts for Women",
        "Gifts for Men",
        "Ferrero Rocher"
      ],
      "subcategory": "cakes"
    },
    {
      "id": "gift-07",
      "title": "Remote Control Car for Kids",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 1199,
      "originalPrice": 1599,
      "discount": 25,
      "rating": 4.4,
      "reviewsCount": 190,
      "badge": "KIDS SPECIAL",
      "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "High-speed drift RC racing sports car with LED headlights, rechargeable battery pack, and ergonomic remote controller.",
      "inclusions": [
        "1:16 Scale RC Racing Sports Car",
        "2.4GHz Wireless Remote Controller",
        "Rechargeable Lithium Battery & USB Cable"
      ],
      "tags": [
        "Gifts for Boys",
        "Archies",
        "RC Car"
      ],
      "subcategory": "boys"
    },
    {
      "id": "gift-08",
      "title": "Chocolate Truffle Cake (500g)",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 799,
      "originalPrice": 999,
      "discount": 20,
      "rating": 4.7,
      "reviewsCount": 305,
      "badge": "EGGLESS",
      "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "2-Hour Express Delivery",
      "description": "Decadent eggless dark chocolate truffle cake layered with rich Belgian ganache and chocolate curls.",
      "inclusions": [
        "500g Fresh Baked Eggless Chocolate Truffle Cake",
        "Celebration Sparkler Candle & Cake Knife",
        "Temperature-Controlled Delivery Box"
      ],
      "tags": [
        "Cakes",
        "FlowerAura",
        "Eggless Truffle"
      ],
      "subcategory": "cakes"
    },
    {
      "id": "gift-09",
      "title": "Elegant Wedding Greeting Card",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 49,
      "originalPrice": 99,
      "discount": 51,
      "rating": 4.5,
      "reviewsCount": 134,
      "badge": "HEARTFELT",
      "image": "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Intricately embossed laser-cut metallic gold greeting card with heartfelt warm wishes for newlyweds.",
      "inclusions": [
        "Laser Cut Embossed Wedding Card",
        "Matching Gold Foil Envelope",
        "Custom Message Printing Option"
      ],
      "tags": [
        "Cards",
        "Wedding Gifts",
        "Archies"
      ],
      "subcategory": "women"
    },
    {
      "id": "gift-10",
      "title": "Digital Invitation Video",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 299,
      "originalPrice": 499,
      "discount": 40,
      "rating": 4.6,
      "reviewsCount": 97,
      "badge": "DIGITAL",
      "image": "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Delivered in 2 Hours",
      "description": "Customized 1080p full HD animated video invite with background music, couple photos, event dates, and GPS venue directions for WhatsApp sharing.",
      "inclusions": [
        "Full HD Animated Video Invitation (MP4)",
        "Custom Background Score & Couple Photos",
        "Unlimited WhatsApp Sharing License"
      ],
      "tags": [
        "Digital Invitations",
        "Archies",
        "Video Invite"
      ],
      "subcategory": "men"
    },
    {
      "id": "gift-11",
      "title": "Return Gifts Combo (Set of 10)",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 999,
      "originalPrice": 1299,
      "discount": 23,
      "rating": 4.8,
      "reviewsCount": 221,
      "badge": "BULK SPECIAL",
      "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Set of 10 handcrafted brass diyas and aromatic wax votives packed in organza potlis for baby shower and birthday return gifts.",
      "inclusions": [
        "10 Handcrafted Traditional Brass Votives",
        "10 Organza Ribbon Pouch Bags",
        "Thank You Note Attached to Each"
      ],
      "tags": [
        "Returns Gifts",
        "Archies",
        "Set of 10"
      ],
      "subcategory": "boys"
    },
    {
      "id": "gift-12",
      "title": "Gift Hamper for Boys",
      "category": "gifts",
      "categoryName": "Gifts Market",
      "price": 1499,
      "originalPrice": 1899,
      "discount": 21,
      "rating": 4.7,
      "reviewsCount": 145,
      "badge": "POPULAR",
      "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
      ],
      "setupDuration": "Same Day Delivery",
      "description": "Fun celebration hamper for young boys containing action figures, chocolate bars, a superhero cap, and a party badge.",
      "inclusions": [
        "Superhero Toy Figurine",
        "Assorted Chocolate Energy Bars (4 Pcs)",
        "Embroidered Snapback Cap",
        "Celebration Keepsake Box"
      ],
      "tags": [
        "Gifts for Boys",
        "Archies",
        "Hamper"
      ],
      "subcategory": "boys"
    }
  ],
  "reviews": [
    {
      "id": "rev-1",
      "name": "Pooja Sharma",
      "city": "Delhi NCR",
      "rating": 5,
      "date": "2 days ago",
      "type": "video",
      "media": "customer-review-video-1.mp4",
      "poster": "https://cdn.balloondekor.com/14/1744720943222.webp",
      "service": "Rose Gold Birthday Setup",
      "text": "The decorator arrived 15 mins early and set up the balloon arch without any mess! Look at this magical video reel!",
      "verified": true
    },
    {
      "id": "rev-2",
      "name": "Rahul & Sneha",
      "city": "Mumbai",
      "rating": 5,
      "date": "5 days ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "service": "Cabana Terrace Anniversary",
      "text": "Booked the terrace cabana for our 5th anniversary. The fairy lights and balloon styling were unbelievable!",
      "verified": true
    },
    {
      "id": "rev-3",
      "name": "Ananya Deshmukh",
      "city": "Pune",
      "rating": 5,
      "date": "1 week ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      "service": "Cocomelon 2nd Birthday",
      "text": "Our son JJ was so thrilled! The balloon quality was top notch, vibrant colors and lasted 3 whole days.",
      "verified": true
    },
    {
      "id": "rev-4",
      "name": "Kunal & Riya Mehra",
      "city": "Bangalore",
      "rating": 5,
      "date": "1 week ago",
      "type": "video",
      "media": "customer-review-video-1.mp4",
      "poster": "https://cdn.balloondekor.com/14/1744890426934.webp",
      "service": "Golden Birthday Arch",
      "text": "Super smooth same-day booking in Indiranagar. Watch our live celebration reveal video!",
      "verified": true
    },
    {
      "id": "rev-5",
      "name": "Divya Nair",
      "city": "Hyderabad",
      "rating": 5,
      "date": "2 weeks ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/images/14/bf89ee2c-957e-4264-a433-c5e17a9bcbf5.webp",
      "service": "Boho Luxury Theme",
      "text": "Natural pampas grass and earthy balloons made our daughter's 1st birthday look straight out of Pinterest.",
      "verified": true
    },
    {
      "id": "rev-6",
      "name": "Vikram Singhania",
      "city": "Gurugram",
      "rating": 5,
      "date": "2 weeks ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/14/1748087900974.webp",
      "service": "Blush & Champagne Surprise",
      "text": "Ordered a midnight bedroom surprise decor for my wife. The LED fairy lights and backdrop were 10/10!",
      "verified": true
    },
    {
      "id": "rev-7",
      "name": "Neha & Amit Kapoor",
      "city": "Noida",
      "rating": 5,
      "date": "3 weeks ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
      "service": "Express Home Celebration",
      "text": "Fastest party setup ever! Booked at 2 PM, technician was at home by 4:30 PM with electric pump.",
      "verified": true
    },
    {
      "id": "rev-8",
      "name": "Rohan Joshi",
      "city": "Kolkata",
      "rating": 5,
      "date": "3 weeks ago",
      "type": "video",
      "media": "customer-review-video-1.mp4",
      "poster": "https://cdn.balloondekor.com/images/61/7ebf2dbd-60dd-4643-8029-763dc6a3e5e3.webp",
      "service": "Midnight Terrace Canopy",
      "text": "Check out this night tour video of our terrace setup! Truly worth every single rupee.",
      "verified": true
    },
    {
      "id": "rev-9",
      "name": "Kavita Reddy",
      "city": "Chennai",
      "rating": 5,
      "date": "1 month ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/33/teddy-baby-shower.webp",
      "service": "Oh Baby Teddy Bear Setup",
      "text": "The giant plush teddy bear and caramel pastel arch were the biggest hit of our baby shower.",
      "verified": true
    },
    {
      "id": "rev-10",
      "name": "Aman & Priya Verma",
      "city": "Jaipur",
      "rating": 5,
      "date": "1 month ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/33/haldi-decoration-92abeb45-8776-4485-8300-d177622d3c40.webp",
      "service": "Haldi Marigold & Balloons",
      "text": "Bright vibrant yellow marigold florals with metallic balloons. The photo shoot turned out stunning!",
      "verified": true
    },
    {
      "id": "rev-11",
      "name": "Ritu Malhotra",
      "city": "Chandigarh",
      "rating": 5,
      "date": "1 month ago",
      "type": "video",
      "media": "customer-review-video-1.mp4",
      "poster": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "service": "Welcome Baby Girl Decor",
      "text": "Welcomed our newborn princess home from hospital. Our entire family loved this cute setup!",
      "verified": true
    },
    {
      "id": "rev-12",
      "name": "Tanvi & Siddharth",
      "city": "Ahmedabad",
      "rating": 5,
      "date": "1 month ago",
      "type": "image",
      "media": "https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp",
      "service": "Bachelorette Glam Party",
      "text": "Foil fringe backdrop, giant champagne balloons and rose gold arches. Made our bride-to-be so happy!",
      "verified": true
    }
  ],
  "faqs": [
    {
      "q": "How far in advance should I book my decoration?",
      "a": "We recommend booking at least 24 to 48 hours in advance to reserve your preferred time slot. However, we also provide same-day express decoration services in all major cities with a 2 to 3-hour notice!"
    },
    {
      "q": "Will the balloons damage my wall or paint?",
      "a": "No! Our certified decorators use specialized removable paper tape and damage-free masking dots that do not peel or ruin wall paint or wallpaper."
    },
    {
      "q": "Do I need to provide anything to the decorator?",
      "a": "Our decorators bring all materials including high-speed electric air inflators, balloons, ribbons, tapes, and lights. All we need is a standard electrical plug point and a stool/ladder if high ceiling balloons are requested."
    },
    {
      "q": "Can I customize the color palette of my balloons?",
      "a": "Yes, absolutely! During checkout or in the booking notes, you can request custom color combinations (e.g., pastel pink + lilac, or gold + black) at zero extra cost."
    },
    {
      "q": "Are the balloons helium-filled or regular air?",
      "a": "Standard packages use premium metallic/pastel latex balloons filled with air and safely attached to ceilings with removable glue drops for a floating illusion. Helium clusters can be added as an optional party add-on."
    },
    {
      "q": "What is the cancellation and rescheduling policy?",
      "a": "You can reschedule your decoration up to 6 hours before the booked slot completely free of charge. Full refunds are provided for cancellations made 24 hours in advance."
    }
  ],
  "blogTopics": [
    {
      "id": "balloon-tips",
      "name": "Balloon Decoration Tips",
      "badge": "ESSENTIAL",
      "tagline": "Float times, DIY hacks & wall safety",
      "image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
      "count": 4
    },
    {
      "id": "birthday-ideas",
      "name": "Birthday Party Ideas",
      "badge": "POPULAR",
      "tagline": "Themes for kids, teens & adults",
      "image": "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      "count": 5
    },
    {
      "id": "anniversary-romance",
      "name": "Anniversary & Romance",
      "badge": "SURPRISES",
      "tagline": "Cabana setups, fairy lights & proposals",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "count": 3
    },
    {
      "id": "baby-shower",
      "name": "Baby Shower & Welcome",
      "badge": "FAMILY",
      "tagline": "Godh Bharai traditions & pastel themes",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "count": 3
    },
    {
      "id": "wedding-guides",
      "name": "Wedding & Haldi Guides",
      "badge": "TRADITIONAL",
      "tagline": "Mehendi, marigolds & bridal car styling",
      "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
      "count": 3
    },
    {
      "id": "cost-planning",
      "name": "Cost & Budget Planning",
      "badge": "PRICING",
      "tagline": "City rates, package costs & checklists",
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      "count": 4
    }
  ],
  "blogs": [
    {
      "id": "ultimate-2026-home-party-decoration-guide",
      "title": "The Ultimate 2026 Home Party Decoration Guide: Trends, Balloon Styles & Budget Secrets",
      "category": "birthday-ideas",
      "categoryName": "Birthday Ideas",
      "tag": "Editor's Choice",
      "featured": true,
      "author": "Pooja Deshmukh • Creative Director",
      "date": "September 24, 2026",
      "readTime": "6 min read",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "excerpt": "Planning a celebration at your apartment, terrace or party hall? Discover the newest color palettes, organic arches vs helium bouquets, technician timing tips, and how to create unforgettable photo zones without breaking your budget.",
      "content": "\n        <p>Planning an intimate celebration at home has become India's favorite way to mark life's biggest milestones. Whether you're celebrating a 1st birthday, a 25th silver anniversary, or a cozy terrace proposal, the right decoration sets the mood and turns your space into an unforgettable photo sanctuary.</p>\n        \n        <h3>1. Color Trends Dominating 2026</h3>\n        <p>Gone are the days of harsh primary colors. 2026 is defined by sophisticated, harmonious palettes:</p>\n        <ul>\n          <li><strong>Retro Boho:</strong> Eucalyptus green, warm nude, caramel brown, and matte ivory accents.</li>\n          <li><strong>Blush & Rose Gold:</strong> Rose gold chrome balloons paired with soft pastel pinks and fairy lights.</li>\n          <li><strong>Midnight Luxe:</strong> Deep royal navy, metallic gold foil arches, and warm yellow uplighting.</li>\n        </ul>\n\n        <div class=\"blog-modal-callout\">\n          <strong>Pro Decorator Tip:</strong> Always place your primary balloon arch opposite your home's main light source or window to avoid backlighting in your party photos!\n        </div>\n\n        <h3>2. Room Space & Setup Optimization</h3>\n        <p>Before booking any setup, ensure there is at least 8 to 10 feet of clear wall space. Our certified technicians bring removable silicone wall hooks and non-damaging adhesive strips so your paint remains 100% pristine after the party ends.</p>\n\n        <h3>3. Timing Your Technician Arrival</h3>\n        <p>For standard balloon arches, allow 1.5 to 2 hours of setup time. Book your slot so the team finishes at least 45 minutes before guests arrive, leaving plenty of time for cake delivery and family portraits.</p>\n      "
    },
    {
      "id": "helium-vs-air-filled-balloons-comparison",
      "title": "Helium Balloons vs Air-Filled Balloons: Cost, Longevity, and Safety Compared",
      "category": "balloon-tips",
      "categoryName": "Balloon Decoration Tips",
      "tag": "Decor Hacks",
      "featured": false,
      "author": "Vikram Malhotra • Master Decorator",
      "date": "September 20, 2026",
      "readTime": "4 min read",
      "image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
      "excerpt": "Should you choose helium floating balloons or air-filled organic arches for indoor celebrations? Here is what you need to know about float times, ceiling paint safety, and budget efficiency.",
      "content": "\n        <p>One of the most frequent questions our clients ask is whether they should opt for helium floating balloons or air-filled balloon clusters for their living room celebrations.</p>\n\n        <h3>Float Times and Physics</h3>\n        <p>Standard 10-inch latex balloons filled with helium typically float for 8 to 12 hours under Indian ambient temperatures. Air-filled balloon garlands, on the other hand, easily stay inflated and look vibrant for 48 to 72 hours.</p>\n\n        <h3>Ceiling Paint Safety</h3>\n        <p>When clients attach air balloons to the ceiling to mimic helium effects, using incorrect tapes can strip delicate wall putty. Celebration Events decorators use professional-grade removable balloon glue dots that leave zero marks or sticky residue.</p>\n      "
    },
    {
      "id": "how-to-prepare-your-home-before-decorators-arrive",
      "title": "How to Prepare Your Home Before the Decoration Team Arrives",
      "category": "balloon-tips",
      "categoryName": "Balloon Decoration Tips",
      "tag": "Checklist",
      "featured": false,
      "author": "Sneha Reddy • Operations Lead",
      "date": "September 18, 2026",
      "readTime": "3 min read",
      "image": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      "excerpt": "Save time and ensure flawless installation with our 5-point home preparation checklist, including plug points, ceiling fan tips, furniture shifting, and wall tape guidelines.",
      "content": "\n        <p>Our decorators pride themselves on fast, punctual setups. Following these simple preparation steps ensures a seamless experience on your big day:</p>\n        <ul>\n          <li><strong>Clear Wall Access:</strong> Shift lightweight sofas or dining chairs 3 feet away from the backdrop wall.</li>\n          <li><strong>Power Socket for Fairy Lights:</strong> Ensure an electric extension board is within 2 meters of the setup point for fairy lights or neon signage.</li>\n          <li><strong>Keep Ceiling Fans Turned Off:</strong> During balloon inflation and garland framing, high air currents can cause balloons to drift or burst against sharp edges.</li>\n          <li><strong>Pets & Little Ones:</strong> Keep curious pets in an adjoining room until balloons are secured in place.</li>\n        </ul>\n      "
    },
    {
      "id": "birthday-decoration-cost-breakdown-india",
      "title": "How Much Does Birthday Decoration Cost in India? City-Wise Price Guide",
      "category": "cost-planning",
      "categoryName": "Cost & Planning",
      "tag": "Pricing Guide",
      "featured": false,
      "author": "Rohan Verma • Event Analyst",
      "date": "September 15, 2026",
      "readTime": "5 min read",
      "image": "https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp",
      "excerpt": "From ₹1,499 simple living room packages to ₹10,000+ luxury ring backdrops with neon lights, understand transparent pricing across Delhi NCR, Mumbai, Bangalore and Tier-2 cities.",
      "content": "\n        <p>Transparent pricing is the core of Celebration Events. When you book directly through our platform, every package includes technician visit, all materials, setup labor, and clean-up guidance.</p>\n\n        <h3>Average Package Cost Tier Breakdown</h3>\n        <ul>\n          <li><strong>Standard Home Surprise (₹1,499 - ₹1,999):</strong> 60-80 balloons, metallic banner, wall frills, and door ribbon.</li>\n          <li><strong>Arch & Neon Backdrop (₹2,499 - ₹4,499):</strong> Organic circular balloon arch, warm fairy lights, custom age foil digits, and neon signs.</li>\n          <li><strong>Grand Theme & Sequins (₹6,999 - ₹12,999):</strong> Sequins shimmer backdrop, pedestal cake cylinder tables, marquee number lights, and character cutouts.</li>\n        </ul>\n      "
    },
    {
      "id": "trending-kids-birthday-themes-2026",
      "title": "Top 7 Kids Birthday Themes Trending in 2026: From Cocomelon to Space Explorer",
      "category": "birthday-ideas",
      "categoryName": "Birthday Ideas",
      "tag": "Kids Party",
      "featured": false,
      "author": "Ananya Sen • Kids Party Stylist",
      "date": "September 12, 2026",
      "readTime": "5 min read",
      "image": "https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp",
      "excerpt": "Discover the most demanded party themes for boys and girls aged 1 to 10, complete with character cutouts, balloon arches, matching cake tables, and return gift ideas.",
      "content": "\n        <p>Planning a child's birthday is all about sparking wonder. This year, storybook realism and immersive themed photo zones are stealing the show across Indian cities.</p>\n\n        <h3>Top Ranked Themes for 2026</h3>\n        <ul>\n          <li><strong>Jungle Safari:</strong> Sage greens, animal foil cutouts (lion, giraffe, elephant), and rustic palm fronds.</li>\n          <li><strong>Cosmic Space Explorer:</strong> Chrome blues, silver astronaut foils, and glowing star constellation backdrops.</li>\n          <li><strong>Pastel Unicorn & Rainbow:</strong> Iridescent shimmer curtains with soft lavender and pink balloon cascades.</li>\n          <li><strong>Superhero Squad:</strong> Bold red, blue, and yellow arches with high-resolution superhero wall silhouettes.</li>\n        </ul>\n      "
    },
    {
      "id": "romantic-anniversary-surprises-at-home",
      "title": "10 Romantic Surprise Ideas for Anniversaries: Cabanas, Petals & Fairy Lights",
      "category": "anniversary-romance",
      "categoryName": "Romantic & Anniversary",
      "tag": "Romance",
      "featured": false,
      "author": "Karan Singhania • Surprise Specialist",
      "date": "September 08, 2026",
      "readTime": "4 min read",
      "image": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "excerpt": "Planning a heartfelt surprise for your spouse or partner? Learn how terrace cabana tents, floating balloon ceilings, and personalized photo polaroids create an intimate haven at home.",
      "content": "\n        <p>You don't need an expensive destination trip to create romance. An intimate, thoughtfully decorated space in your own apartment or terrace can create lifelong memories.</p>\n\n        <h3>1. The Cabana Tent Experience</h3>\n        <p>Our pop-up chiffon cabanas create an enchanting private cocoon with soft pillows, floor rugs, and 30 meters of warm fairy lights.</p>\n\n        <h3>2. Ceiling Floating Balloons & Hanging Photos</h3>\n        <p>Tie curled satin ribbons to 50 floating balloons with printed polaroid memories of your favorite travels together hanging directly above your dining or cake table.</p>\n      "
    },
    {
      "id": "baby-shower-vs-godh-bharai-traditions",
      "title": "Baby Shower vs Godh Bharai: Traditions, Themes & Modern Decor Differences",
      "category": "baby-shower",
      "categoryName": "Baby Shower & Welcome",
      "tag": "Ceremony Guide",
      "featured": false,
      "author": "Meera Iyer • Cultural Decor Curator",
      "date": "September 04, 2026",
      "readTime": "5 min read",
      "image": "https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp",
      "excerpt": "Blending time-honored traditional rituals like marigold urlis with modern pastel teddy bear backdrops for Indian moms-to-be across modern families.",
      "content": "\n        <p>Welcoming a new life is celebrated with unmatched warmth across India. While Godh Bharai ceremonies emphasize sacred traditional blessings, baby showers focus on games, theme backdrops, and gifting.</p>\n        <p>Today's modern families often choose hybrid setups: a traditional flower urli and brass diya zone for morning rituals, followed by a pastel balloon arch with teddy bear cutouts for the afternoon cake cutting.</p>\n      "
    },
    {
      "id": "haldi-mehendi-decoration-ideas-at-home",
      "title": "Vibrant Haldi & Mehendi Decor Ideas: How to Style Your Courtyard or Terrace",
      "category": "wedding-guides",
      "categoryName": "Wedding Guides",
      "tag": "Wedding Prep",
      "featured": false,
      "author": "Rajesh Choudhary • Wedding Floral Head",
      "date": "August 30, 2026",
      "readTime": "6 min read",
      "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
      "excerpt": "Transform your balcony or living room into a cheerful celebration space using fresh marigold flower strings, brass urlis, colorful dupattas, and low seating bolsters.",
      "content": "\n        <p>Haldi and Mehendi functions are known for laughter, music, and vibrant colors. Our traditional wedding florists create lively setups right at home with banana tree entrance pillars, fresh yellow-orange marigold drops, and ethnic bolsters.</p>\n      "
    },
    {
      "id": "office-anniversary-and-product-launch-decor",
      "title": "Corporate Event Decor: How to Brand Your Office For Milestones & Annual Days",
      "category": "cost-planning",
      "categoryName": "Cost & Planning",
      "tag": "Corporate",
      "featured": false,
      "author": "Aarav Patel • B2B Event Strategist",
      "date": "August 24, 2026",
      "readTime": "4 min read",
      "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      "excerpt": "Elevate company culture and celebrate company achievements with branded balloon arches, stage backdrops, entrance pillars, and desk-side balloon bunches.",
      "content": "\n        <p>From tech startups hitting funding milestones to annual corporate townhalls, visual celebrations boost employee morale and create high-engagement LinkedIn photo moments.</p>\n        <p>Celebration Events offers GST invoicing, brand color matching (Pantone/Hex alignment), and quiet after-hours setup so business operations remain undisturbed.</p>\n      "
    }
  ],
  "weddingConfigs": {
    "house-decor": [
      {
        "id": "hd_pendals",
        "title": "Pendals In Front Of House",
        "subPrompt": "Choose pendal type",
        "subItems": [
          "Tenkaya pandhiri",
          "Normal pendals"
        ]
      },
      {
        "id": "hd_lighting",
        "title": "Lighting Decoration For Building",
        "subPrompt": "3 or 5 Days with Max of 50 Serial Sets",
        "subItems": [
          "3 Days (Max 50 Serial Sets)",
          "5 Days (Max 50 Serial Sets)"
        ]
      },
      {
        "id": "hd_banana",
        "title": "Banana Trees & Mango Leaves",
        "subPrompt": "Main doorway auspicious pillars",
        "subItems": [
          "Banana Trees & Mango Leaves"
        ]
      },
      {
        "id": "hd_marigold",
        "title": "Marigold Flowers For Main Door And Inside the House",
        "subPrompt": "Choose flower type",
        "subItems": [
          "Normal",
          "Special"
        ]
      },
      {
        "id": "hd_gaja",
        "title": "Gaja Maala For Main Door",
        "subPrompt": "Grand entrance garland",
        "subItems": [
          "Yes",
          "No"
        ]
      }
    ],
    "nalugu-snanam": [
      {
        "id": "ns_concept",
        "title": "Main Decoration Services",
        "subPrompt": "Traditional rituals decor",
        "subItems": [
          "Nalugu Concept Decoration",
          "Mangala Sanam Decoration",
          "Flower Jewellery",
          "Nalugu Maala (Petals)",
          "Nalugu Maala (Normal)"
        ]
      },
      {
        "id": "ns_food",
        "title": "For Nalugu Event (Traditional Feast Menu)",
        "subPrompt": "Select customary food items",
        "subItems": [
          "Sweet",
          "Rice",
          "Pappu",
          "Sambar",
          "Rasam",
          "Curd",
          "Pickle",
          "Chips",
          "Oil Fry"
        ]
      },
      {
        "id": "ns_photo",
        "title": "Photo & Videography",
        "subPrompt": "Ceremony coverage",
        "subItems": [
          "Traditional Photo",
          "Traditional Video",
          "Candid Photo",
          "Candid Video"
        ]
      },
      {
        "id": "ns_melam",
        "title": "Nalugu Mangala Melam (4 - members)",
        "subPrompt": "Auspicious instrumental team",
        "subItems": [
          "2 Dolu",
          "2 Sannai"
        ]
      }
    ],
    "function-hall-decor": [
      {
        "id": "fhd_entrance",
        "title": "Entrance & Welcome",
        "subPrompt": "Grand foyer styling",
        "subItems": [
          "Entrance Arch With 2 Flex Banners",
          "Banana Trees & Mango Leaves",
          "Pendals With Side Wall Entrance",
          "Lighting Entrance",
          "Trust Box Entrance (Normal)",
          "Trust Box Entrance (Lighting)",
          "Ring Passage Entrance",
          "Foot roll Mats"
        ]
      },
      {
        "id": "fhd_stage",
        "title": "Stage & Reception",
        "subPrompt": "Royal couple backdrop & rituals",
        "subItems": [
          "Reception Decoration",
          "Reception Garlands (Petals) – 1 Pair",
          "Lord Ganesh Setup",
          "Muhurtham Decoration",
          "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)",
          "Sangyam Garlands [ Normal ] – 2 Pairs",
          "Basikalu 2",
          "Design Coconut [ With Bride & Groom Names ]"
        ]
      },
      {
        "id": "fhd_vehicle",
        "title": "Vehicle & Flower Items",
        "subPrompt": "Wedding cars and ritual florals",
        "subItems": [
          "Car Decoration – 2 Cars [ Stickers – 4 ]",
          "15 Muralu puvulu",
          "Adduthera"
        ]
      },
      {
        "id": "fhd_requirements",
        "title": "Additional Requirements",
        "subPrompt": "Hall furniture and amenities",
        "subItems": [
          "Function Hall Chair Clothes",
          "Vip Sofas",
          "Stages",
          "Coolers"
        ]
      }
    ],
    "catering": [
      {
        "id": "cat_infrastructure",
        "title": "Catering Requirements",
        "subPrompt": "Stalls & buffet setup",
        "subItems": [
          "LED Stalls",
          "Normal Cloth Stalls",
          "Round Tables With Cloth",
          "Chair Clothes [Dining]",
          "Brass Dishes",
          "Steel Dishes"
        ]
      },
      {
        "id": "cat_snacks",
        "title": "Evening Snacks (4.30pm Onwards)",
        "subPrompt": "Select up to 5 items & welcome drink",
        "subItems": [
          "Bajji",
          "Bonda",
          "Medhu Pakoda",
          "Onion Pokoda",
          "Corn Rolls",
          "Corn Samosa",
          "Onion Samosa",
          "Veg. Cutlet",
          "Veg. Springroll",
          "Chutney",
          "Tomato Sauce",
          "Coffee & Tea",
          "Pulpy Mango",
          "Pulpy Orange",
          "Cold Badam Milk",
          "Hot Badam Milk",
          "Fruit Juice"
        ]
      },
      {
        "id": "cat_sweets",
        "title": "Night Dinner Sweets (Select any two)",
        "subPrompt": "Authentic pure ghee sweets",
        "subItems": [
          "Poli",
          "Basundi",
          "Jilebi",
          "Badham Halwa",
          "Jangri",
          "Kaju Cake",
          "Rasamalai",
          "Kala Jamoon",
          "Bandar Laddu",
          "Badhusha",
          "Kaju Roll",
          "Badham Cake",
          "Dry Jamoon",
          "Carrot Halwa",
          "Laddu",
          "Pistha Roll",
          "Rasagulla",
          "Champakalli",
          "Kalakhand",
          "Mysore Pak",
          "Malai Sandwich",
          "Malaikaja",
          "Cham Cham",
          "Dry Fruit Halwa",
          "Agra Killi",
          "Kova Jangri",
          "Ravva Laddu",
          "Dry Fruit Laddu"
        ]
      },
      {
        "id": "cat_hot_biryani",
        "title": "Hot Items & Biriyani Rice",
        "subPrompt": "Crisp snacks & fragrant biriyanis",
        "subItems": [
          "Masala Vada",
          "Curd Vada",
          "Corn Samosa",
          "Alasanda Vada",
          "Corn Vada",
          "Veg Spring Roll",
          "Keera Vada (Leaves)",
          "Cabbage Vada",
          "Kaju Pakodi",
          "Vegetable Biriyani",
          "Babycorn Biriyani",
          "Kaju Capsicum Biriyani",
          "Mushroom Biriyani",
          "Panasa Biriyani",
          "Paneer Biriyani"
        ]
      },
      {
        "id": "cat_gravy_rice",
        "title": "Special Gravy & Special Rice",
        "subPrompt": "Rich curries & rice variations",
        "subItems": [
          "Nune Vankaya",
          "Mushroom Curry",
          "Vegetable Kurma",
          "Kaju Capsicum Curry",
          "Potato Green Peas Masala",
          "Karivepaku Rice",
          "Pulhora",
          "Lemon Rice",
          "Pudina Rice",
          "Mango Rice",
          "Tomato Rice",
          "Ghee Rice",
          "Gongura Rice",
          "Kothimira Rice",
          "Coconut Rice",
          "Palak Rice"
        ]
      },
      {
        "id": "cat_roti_fry",
        "title": "Roti, Raita, Fry & Traditional Essentials",
        "subPrompt": "Breads, accompaniments & curries",
        "subItems": [
          "Chapati",
          "Pulka",
          "Rumal",
          "Onion Raita",
          "Veg. Mixed Raita",
          "Paneer Butter Masala",
          "Alu Mutter",
          "Palak Paneer",
          "Chana Masala",
          "Methi Chaman",
          "Bendakaya Pakodi",
          "Bendakaya Fry",
          "Dondakayipakodi",
          "Potato Curry",
          "Rice",
          "Sambar",
          "Curd",
          "Rasam (Pappu/Pepper)",
          "Chips or Papad"
        ]
      }
    ],
    "sangyam-sweets": [
      {
        "id": "sw_sweets",
        "title": "Sweets (Select Sweet 1 & Sweet 2)",
        "subPrompt": "Select a sweet and quantity in Nos",
        "subItems": [
          "Kaju Katli",
          "Motichoor Laddu",
          "Mysore Pak",
          "Gulab Jamun",
          "Rasgulla",
          "Dry Fruit Halwa",
          "Peda",
          "Badusha",
          "Kala Jamun",
          "Rasmalai",
          "Basundi",
          "Kaju Roll"
        ]
      },
      {
        "id": "sw_hot",
        "title": "Hot Items (Savory Snacks)",
        "subPrompt": "Select hot items and quantity in Kgs",
        "subItems": [
          "Masala Vada",
          "Corn Samosa",
          "Veg Spring Roll",
          "Kaju Pakodi",
          "Alasanda Vada",
          "Onion Pakoda",
          "Murukku",
          "Ribbon Pakoda",
          "Chekkalu"
        ]
      }
    ],
    "photo-video": [
      {
        "id": "pv_main",
        "title": "Main Photo & Video Coverage",
        "subPrompt": "Camera crew",
        "subItems": [
          "Traditional Photo",
          "Traditional Video",
          "One Videographer Coverage Entrance & Dining Hall",
          "Candid Photographer for couples",
          "Candid Videographer For Couples"
        ]
      },
      {
        "id": "pv_tech",
        "title": "Drone, Screen & Live Stream",
        "subPrompt": "Display & streaming technology",
        "subItems": [
          "Drone",
          "TV (Full / Half)",
          "LED Wall (Full / Half)",
          "Live Stream (Half Session)",
          "Live Stream (Full Session)"
        ]
      },
      {
        "id": "pv_shoots",
        "title": "Pre & Post Wedding Shoots",
        "subPrompt": "Cinematic shoots",
        "subItems": [
          "Pre Wedding Shoot (Normal)",
          "Pre Wedding Shoot (Cinematic)",
          "Post Wedding Shoot (Normal)",
          "Post Wedding Shoot (Cinematic)"
        ]
      },
      {
        "id": "pv_addons",
        "title": "Additional Services & Deliverables",
        "subPrompt": "Albums and digital gifts",
        "subItems": [
          "Whats App Invitation",
          "Promo (Only For Candid Video)",
          "Marriage Album (Sheets)",
          "Pendrive",
          "Photo Frame",
          "Harddisk [1 TB]"
        ]
      },
      {
        "id": "pv_vratham",
        "title": "Sathyanarayana Vratham Coverage",
        "subPrompt": "Vratham ceremony",
        "subItems": [
          "Yes",
          "No"
        ]
      }
    ],
    "melam": [
      {
        "id": "melam_mangala",
        "title": "Mangala Melam",
        "subPrompt": "Select instruments type",
        "subItems": [
          "Nalugu (4 Members) - 2 Dolu",
          "Nalugu (4 Members) - 2 Sannai"
        ]
      },
      {
        "id": "melam_welcoming",
        "title": "Welcoming Melam",
        "subPrompt": "Select welcoming location",
        "subItems": [
          "Welcoming (House)",
          "Welcoming (Function Hall)"
        ]
      },
      {
        "id": "melam_marriage",
        "title": "Marriage Melam",
        "subPrompt": "Select troupe size",
        "subItems": [
          "Marriage (6 Members)",
          "Marriage (9 Members)"
        ]
      },
      {
        "id": "melam_kerala_drums",
        "title": "Kerala Drums",
        "subPrompt": "Select members strength",
        "subItems": [
          "Kerala Drums (5 Members)",
          "Kerala Drums (10 Members)",
          "Kerala Drums (15 Members)"
        ]
      },
      {
        "id": "melam_band_set",
        "title": "Band Set",
        "subPrompt": "Select band strength",
        "subItems": [
          "Band Set (7 Members)",
          "Band Set (12 Members)",
          "Band Set (15 Members)"
        ]
      }
    ],
    "special-events": [
      {
        "id": "se_col1",
        "title": "Event Options (Column 1)",
        "subPrompt": "Props & entries with quantities",
        "subItems": [
          "Photo Booth",
          "Crackers 120 Shots",
          "Pallaki With Boys",
          "Flower Shots – 25+",
          "Design Pot",
          "Fog – 4 times",
          "Sky Lanterns",
          "Welcoming Dance"
        ]
      },
      {
        "id": "se_col2",
        "title": "Event Options (Column 2)",
        "subPrompt": "Entries, horses & fireworks with quantities",
        "subItems": [
          "Horse",
          "Horse Cart",
          "Cold Fire – 4 times",
          "Harathi plates",
          "Design Umbrella",
          "Doli",
          "Special Entry",
          "Design Butta"
        ]
      }
    ],
    "musical-events": [
      {
        "id": "me_options",
        "title": "Musical Entertainment Cards",
        "subPrompt": "Select music genres & setup",
        "subItems": [
          "Orchestra (Full orchestra for a grand musical experience)",
          "DJ (Professional DJ with latest music collection)",
          "Light Music (Melodious light music for a pleasant atmosphere)",
          "Live Instrumental Music (Live instrumental performance)"
        ]
      }
    ],
    "sangyam-bags": [
      {
        "id": "sb_combo",
        "title": "Sangyam Bags (Combo)",
        "subPrompt": "Complete sangyam bag combo with all items",
        "subItems": [
          "Printed Name Bags",
          "Coconut",
          "Aku, Vakka",
          "Pasupu Kumkuma"
        ]
      },
      {
        "id": "sb_quantities",
        "title": "Combo Sets Quantity Selection",
        "subPrompt": "Standard order batch",
        "subItems": [
          "50 Sets",
          "100 Sets",
          "150 Sets",
          "200 Sets",
          "250 Sets",
          "500 Sets"
        ]
      }
    ],
    "bridal-makeup": [
      {
        "id": "bm_makeup",
        "title": "Bridal Makeup Packages",
        "subPrompt": "Certified makeup artists",
        "subItems": [
          "HD Bridal Makeup & Hairstyling",
          "Luxury Airbrush Bridal Makeup",
          "Engagement & Reception Styling",
          "Mother & Sister Makeup Add-ons"
        ]
      },
      {
        "id": "bm_draping",
        "title": "Hair Styling & Saree Draping",
        "subPrompt": "Traditional finishing touches",
        "subItems": [
          "Bridal Hairstyling with Fresh Flower Venis",
          "Traditional Saree Draping & Jewellery Setting"
        ]
      }
    ],
    "mehandi": [
      {
        "id": "mh_bridal",
        "title": "Bridal Mehendi Designs",
        "subPrompt": "Intricate bridal artistry",
        "subItems": [
          "Traditional Rajasthani / Marwari Full Hand & Feet",
          "Arabic Floral Fusion Mehendi",
          "Figure & Portrait Custom Bridal Mehendi"
        ]
      },
      {
        "id": "mh_guests",
        "title": "Guest Mehendi & Quality Cones",
        "subPrompt": "Party counters for relatives",
        "subItems": [
          "Guest Mehendi Artists (Group Booking)",
          "100% Organic Fresh Henna Cones"
        ]
      }
    ],
    "sangeet": [
      {
        "id": "sg_choreo",
        "title": "Dance Choreography & Rehearsals",
        "subPrompt": "Professional choreographers",
        "subItems": [
          "Couple Dance Choreography (3-5 Days)",
          "Family & Friends Group Choreography",
          "Grand Entry Flashmob Setup"
        ]
      },
      {
        "id": "sg_stage",
        "title": "Sangeet Stage, DJ & Lights",
        "subPrompt": "High-energy party setup",
        "subItems": [
          "Intelligent Moving Beam Lights & Trussing",
          "High-Resolution LED Stage Backdrop Wall",
          "Professional Sangeet DJ & Emcee"
        ]
      }
    ],
    "house-decoration": [
      {
        "id": "hd_pendals",
        "title": "Pendals In Front Of House",
        "subPrompt": "Choose pendal type",
        "subItems": [
          "Tenkaya pandhiri",
          "Normal pendals"
        ]
      },
      {
        "id": "hd_lighting",
        "title": "Lighting Decoration For Building",
        "subPrompt": "3 or 5 Days with Max of 50 Serial Sets",
        "subItems": [
          "3 Days (Max 50 Serial Sets)",
          "5 Days (Max 50 Serial Sets)"
        ]
      },
      {
        "id": "hd_banana",
        "title": "Banana Trees & Mango Leaves",
        "subPrompt": "Main doorway auspicious pillars",
        "subItems": [
          "Banana Trees & Mango Leaves"
        ]
      },
      {
        "id": "hd_marigold",
        "title": "Marigold Flowers For Main Door And Inside the House",
        "subPrompt": "Choose flower type",
        "subItems": [
          "Normal",
          "Special"
        ]
      },
      {
        "id": "hd_gaja",
        "title": "Gaja Maala For Main Door",
        "subPrompt": "Grand entrance garland",
        "subItems": [
          "Yes",
          "No"
        ]
      }
    ]
  }
};

if (typeof window !== "undefined") {
  window.SITE_DATA = SITE_DATA;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_DATA;
}
