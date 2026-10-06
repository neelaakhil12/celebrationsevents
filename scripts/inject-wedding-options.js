const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const WEDDING_OPTIONS = {
  "house-decor": [
    {
      id: "hd_pendals",
      title: "Pendals In Front Of House",
      subPrompt: "Choose pendal type",
      subItems: ["Tenkaya pandhiri", "Normal pendals"]
    },
    {
      id: "hd_lighting",
      title: "Lighting Decoration For Building",
      subPrompt: "Building exterior illumination",
      subItems: ["3 Days (50 Serial Sets)", "5 Days (50 Serial Sets)"]
    },
    {
      id: "hd_banana",
      title: "Banana Trees & Mango Leaves",
      subPrompt: "Main doorway auspicious pillars",
      subItems: ["2 Fresh Banana Trees", "Fresh Mango Leaf Toran"]
    },
    {
      id: "hd_marigold",
      title: "Marigold Flowers For Main Door And Inside the House",
      subPrompt: "Choose flower type",
      subItems: ["Normal Marigold", "Special Double Petal"]
    },
    {
      id: "hd_gaja",
      title: "Gaja Maala For Main Door",
      subPrompt: "Royal flower entrance garland",
      subItems: ["Gaja Maala Garland"]
    }
  ],
  "nalugu-snanam": [
    {
      id: "ns_concept",
      title: "Main Decoration Services",
      subPrompt: "Traditional rituals decor",
      subItems: ["Nalugu Concept Decoration", "Mangala Sanam Decoration", "Flower Jewellery", "Nalugu Maala (Petals / Normal)"]
    },
    {
      id: "ns_food",
      title: "For Nalugu Event (Traditional Feast Menu)",
      subPrompt: "Select customary food items",
      subItems: ["Sweet", "Rice", "Pappu", "Sambar", "Rasam", "Curd", "Pickle", "Chips", "Oil Fry"]
    },
    {
      id: "ns_photo",
      title: "Photo & Videography Coverage",
      subPrompt: "Candid & traditional team",
      subItems: ["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"]
    },
    {
      id: "ns_melam",
      title: "Nalugu Mangala Melam (4 Members)",
      subPrompt: "Auspicious instrumental team",
      subItems: ["2 Dolu", "2 Sannai"]
    }
  ],
  "function-hall-decor": [
    {
      id: "fhd_entrance",
      title: "Entrance & Welcome",
      subPrompt: "Grand foyer styling",
      subItems: ["Entrance Arch With 2 Flex Banners", "Banana Trees & Mango Leaves", "Pendals With Side Wall Entrance", "Trust Box Entrance", "Ring Passage Entrance", "Foot roll Mats"]
    },
    {
      id: "fhd_stage",
      title: "Stage & Reception Mandapam",
      subPrompt: "Royal couple backdrop & rituals",
      subItems: ["Reception Decoration", "Reception Garlands (Petals) – 1 Pair", "Lord Ganesh Setup", "Muhurtham Royal Decoration", "Muhurtham Garlands & Jada With Venis", "Sangyam Garlands – 2 Pairs", "Basikalu 2", "Design Coconut [With Bride & Groom Names]"]
    },
    {
      id: "fhd_vehicle",
      title: "Vehicle & Flower Items",
      subPrompt: "Wedding cars and ritual florals",
      subItems: ["Car Decoration – 2 Cars [Stickers – 4]", "15 Muralu puvulu", "Adduthera"]
    },
    {
      id: "fhd_requirements",
      title: "Additional Requirements",
      subPrompt: "Hall furniture and amenities",
      subItems: ["Function Hall Chair Clothes", "VIP Sofas", "Stages", "Coolers"]
    }
  ],
  "catering": [
    {
      id: "cat_infrastructure",
      title: "Catering Requirements & Infrastructure",
      subPrompt: "Buffet counters and dining setup",
      subItems: ["LED Stalls", "Normal Cloth Stalls", "Round Tables With Cloth", "Chair Clothes [Dining]", "Vintage Brass Dishes", "Stainless Steel Dishes"]
    },
    {
      id: "cat_snacks",
      title: "Evening Snacks & Welcome Drinks (4:30pm Onwards)",
      subPrompt: "Live snack counters and beverages",
      subItems: ["Bajji", "Bonda", "Medhu Pakoda", "Onion Pakoda", "Corn Rolls", "Corn Samosa", "Veg. Cutlet", "Veg. Springroll", "Chutney", "Coffee & Tea", "Pulpy Mango", "Cold Badam Milk", "Hot Badam Milk", "Fresh Fruit Juice"]
    },
    {
      id: "cat_sweets",
      title: "Night Dinner Feast: Authentic Sweets",
      subPrompt: "Pure ghee desserts",
      subItems: ["Poli", "Basundi", "Jilebi", "Badham Halwa", "Kaju Cake", "Rasamalai", "Kala Jamoon", "Bandar Laddu", "Badhusha", "Laddu", "Mysore Pak"]
    },
    {
      id: "cat_mains",
      title: "Night Dinner Feast: Biriyanis, Curries & Accompaniments",
      subPrompt: "Traditional multi-course feast",
      subItems: ["Veg Biriyani", "Paneer Biriyani", "Kaju Capsicum Biriyani", "Paneer Butter Masala", "Nune Vankaya", "Mushroom Curry", "Rumal Roti", "Chapati", "Pulhora", "Lemon Rice", "Ghee Rice", "Bendakaya Fry", "Potato Fry", "Sambar", "Rasam", "Curd", "Chips or Papad"]
    }
  ],
  "sangyam-sweets": [
    {
      id: "sw_sweets",
      title: "Pure Ghee Sweets Selection (Packaged in Nos)",
      subPrompt: "Select sweet types for gift boxes",
      subItems: ["Motichoor Laddu (Pure Cow Ghee)", "Kaju Katli Special", "Mysore Pak Traditional", "Badam Halwa & Badusha", "Dry Fruit Peda & Rolls"]
    },
    {
      id: "sw_snacks",
      title: "Crisp Savory Hot Snacks (Packaged in Kgs)",
      subPrompt: "Fresh batch wedding savories",
      subItems: ["Masala Vada / Corn Samosa", "Alasanda Vada", "Murukku & Ribbon Pakoda Combo", "Chekkalu Crisp Savories"]
    },
    {
      id: "sw_boxes",
      title: "Customized Wedding Packaging Boxes",
      subPrompt: "Premium presentation packaging",
      subItems: ["Custom Velvet Embossed Box", "Royal Gold Foil Gift Box", "Individual Sweet Pouches"]
    }
  ],
  "photo-video": [
    {
      id: "pv_pre",
      title: "Pre-Wedding & Rituals Coverage",
      subPrompt: "Mehendi, Haldi & Sangeet",
      subItems: ["Traditional Photo (Stage)", "Traditional Full HD Video", "Candid Couple Photographer", "Candid Cinematographer", "Drone 4K Aerial Coverage"]
    },
    {
      id: "pv_reception",
      title: "Reception & Muhurtham Mega Coverage",
      subPrompt: "Main wedding day cinematography",
      subItems: ["Traditional Photo at Stage (High-Res Still)", "Traditional Video at Stage (4K Camera)", "Candid Couple Photographer", "Candid Videographer", "4K Drone Aerial Coverage", "LED Wall Live Stream", "YouTube Online HD Live Stream"]
    },
    {
      id: "pv_deliverables",
      title: "Deliverables & Luxury Albums",
      subPrompt: "Physical and digital deliverables",
      subItems: ["40-Page Premium Embossed Leather Photo Album", "3-5 Min Cinematic Wedding Teaser", "Full Length 60-90 Min Edited Film", "Pen Drive with all RAW High-Res Photos"]
    }
  ],
  "melam": [
    {
      id: "melam_troupe",
      title: "Traditional Mangala Melam Troupe",
      subPrompt: "Select team strength",
      subItems: ["4-Member Melam (2 Dolu, 2 Sannai)", "6-Member Melam Troupe", "8-Member Grand Auspicious Troupe"]
    },
    {
      id: "melam_instruments",
      title: "Special Instrument Performances",
      subPrompt: "Classical wedding sounds",
      subItems: ["Classical Nadaswaram Ensemble", "Tasha & Percussion Beats", "Live Shehnai Performance"]
    }
  ],
  "special-events": [
    {
      id: "se_pyro",
      title: "Cold Pyro & Sparkler Entry",
      subPrompt: "Smoke-free grand entrance",
      subItems: ["Cold Pyro Walkway Sparklers", "Handheld Cold Fire Guns for Bride & Groom"]
    },
    {
      id: "se_effects",
      title: "Atmospheric Visual Effects",
      subPrompt: "Dreamy couple moments",
      subItems: ["Low-Fog Dry Ice Cloud Effect for Couple Dance", "Flower Shower Cannon", "Paper Confetti Blaster", "Bubble Machine"]
    }
  ],
  "musical-events": [
    {
      id: "me_live",
      title: "Live Bands & Orchestras",
      subPrompt: "Live musical entertainment",
      subItems: ["Traditional Classical Ensemble", "Live Telugu/Hindi Orchestra with Singers", "High Energy Bollywood Live Band", "Sufi & Ghazal Evening"]
    },
    {
      id: "me_dj",
      title: "DJ & Sound Console Setup",
      subPrompt: "Dance floor sound & lights",
      subItems: ["Professional DJ & Sound Console", "Intelligent Moving Head Beam Lights & Truss"]
    }
  ],
  "sangyam-bags": [
    {
      id: "sb_bags",
      title: "Return Gift Bags & Boxes",
      subPrompt: "Custom wedding guest favors",
      subItems: ["Eco-Friendly Jute Return Gift Bags", "Pure Raw Silk Embroidered Bags", "Handcrafted Brass Urli / Boxes"]
    },
    {
      id: "sb_print",
      title: "Customized Bride & Groom Printing",
      subPrompt: "Personalized wedding branding",
      subItems: ["Gold Foil Embossed Names", "Custom Thank You Message Cards"]
    }
  ],
  "bridal-makeup": [
    {
      id: "bm_makeup",
      title: "Bridal Makeup Packages",
      subPrompt: "Certified makeup artists",
      subItems: ["HD Bridal Makeup & Hairstyling", "Luxury Airbrush Bridal Makeup", "Engagement & Reception Styling", "Mother & Sister Makeup Add-ons"]
    },
    {
      id: "bm_draping",
      title: "Hair Styling & Saree Draping",
      subPrompt: "Traditional finishing touches",
      subItems: ["Bridal Hairstyling with Fresh Flower Venis", "Traditional Saree Draping & Jewellery Setting"]
    }
  ],
  "mehandi": [
    {
      id: "mh_bridal",
      title: "Bridal Mehendi Designs",
      subPrompt: "Intricate bridal artistry",
      subItems: ["Traditional Rajasthani / Marwari Full Hand & Feet", "Arabic Floral Fusion Mehendi", "Figure & Portrait Custom Bridal Mehendi"]
    },
    {
      id: "mh_guests",
      title: "Guest Mehendi & Quality Cones",
      subPrompt: "Party counters for relatives",
      subItems: ["Guest Mehendi Artists (Group Booking)", "100% Organic Fresh Henna Cones"]
    }
  ],
  "sangeet": [
    {
      id: "sg_choreo",
      title: "Dance Choreography & Rehearsals",
      subPrompt: "Professional choreographers",
      subItems: ["Couple Dance Choreography (3-5 Days)", "Family & Friends Group Choreography", "Grand Entry Flashmob Setup"]
    },
    {
      id: "sg_stage",
      title: "Sangeet Stage, DJ & Lights",
      subPrompt: "High-energy party setup",
      subItems: ["Intelligent Moving Beam Lights & Trussing", "High-Resolution LED Stage Backdrop Wall", "Professional Sangeet DJ & Emcee"]
    }
  ]
};

// Check if weddingConfigs is defined
const siteData = require(dataPath);
siteData.weddingConfigs = WEDDING_OPTIONS;

// Also attach options directly into weddingServices
if (Array.isArray(siteData.weddingServices)) {
  siteData.weddingServices.forEach(s => {
    s.options = WEDDING_OPTIONS[s.id] || [];
  });
}

// Write back cleanly
fs.writeFileSync(dataPath, `const SITE_DATA = ${JSON.stringify(siteData, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.SITE_DATA = SITE_DATA;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = SITE_DATA;\n}\n`, 'utf-8');

console.log('✅ Successfully updated data.js with weddingConfigs and options for all 13 services!');
