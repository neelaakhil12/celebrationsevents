const fs = require('fs');
const path = require('path');

const EXACT_WEDDING_OPTIONS = {
  "melam": [
    {
      id: "melam_mangala",
      title: "Mangala Melam",
      subPrompt: "Select instruments type",
      subItems: ["Nalugu (4 Members) - 2 Dolu", "Nalugu (4 Members) - 2 Sannai"]
    },
    {
      id: "melam_welcoming",
      title: "Welcoming Melam",
      subPrompt: "Select welcoming location",
      subItems: ["Welcoming (House)", "Welcoming (Function Hall)"]
    },
    {
      id: "melam_marriage",
      title: "Marriage Melam",
      subPrompt: "Select troupe size",
      subItems: ["Marriage (6 Members)", "Marriage (9 Members)"]
    },
    {
      id: "melam_kerala_drums",
      title: "Kerala Drums",
      subPrompt: "Select members strength",
      subItems: ["Kerala Drums (5 Members)", "Kerala Drums (10 Members)", "Kerala Drums (15 Members)"]
    },
    {
      id: "melam_band_set",
      title: "Band Set",
      subPrompt: "Select band strength",
      subItems: ["Band Set (7 Members)", "Band Set (12 Members)", "Band Set (15 Members)"]
    }
  ],
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
      subPrompt: "3 or 5 Days with Max of 50 Serial Sets",
      subItems: ["3 Days (Max 50 Serial Sets)", "5 Days (Max 50 Serial Sets)"]
    },
    {
      id: "hd_banana",
      title: "Banana Trees & Mango Leaves",
      subPrompt: "Main doorway auspicious pillars",
      subItems: ["Banana Trees & Mango Leaves"]
    },
    {
      id: "hd_marigold",
      title: "Marigold Flowers For Main Door And Inside the House",
      subPrompt: "Choose flower type",
      subItems: ["Normal", "Special"]
    },
    {
      id: "hd_gaja",
      title: "Gaja Maala For Main Door",
      subPrompt: "Grand entrance garland",
      subItems: ["Yes", "No"]
    }
  ],
  "house-decoration": [
    {
      id: "hd_pendals",
      title: "Pendals In Front Of House",
      subPrompt: "Choose pendal type",
      subItems: ["Tenkaya pandhiri", "Normal pendals"]
    },
    {
      id: "hd_lighting",
      title: "Lighting Decoration For Building",
      subPrompt: "3 or 5 Days with Max of 50 Serial Sets",
      subItems: ["3 Days (Max 50 Serial Sets)", "5 Days (Max 50 Serial Sets)"]
    },
    {
      id: "hd_banana",
      title: "Banana Trees & Mango Leaves",
      subPrompt: "Main doorway auspicious pillars",
      subItems: ["Banana Trees & Mango Leaves"]
    },
    {
      id: "hd_marigold",
      title: "Marigold Flowers For Main Door And Inside the House",
      subPrompt: "Choose flower type",
      subItems: ["Normal", "Special"]
    },
    {
      id: "hd_gaja",
      title: "Gaja Maala For Main Door",
      subPrompt: "Grand entrance garland",
      subItems: ["Yes", "No"]
    }
  ],
  "nalugu-snanam": [
    {
      id: "ns_concept",
      title: "Main Decoration Services",
      subPrompt: "Traditional rituals decor",
      subItems: ["Nalugu Concept Decoration", "Mangala Sanam Decoration", "Flower Jewellery", "Nalugu Maala (Petals)", "Nalugu Maala (Normal)"]
    },
    {
      id: "ns_food",
      title: "For Nalugu Event (Traditional Feast Menu)",
      subPrompt: "Select customary food items",
      subItems: ["Sweet", "Rice", "Pappu", "Sambar", "Rasam", "Curd", "Pickle", "Chips", "Oil Fry"]
    },
    {
      id: "ns_photo",
      title: "Photo & Videography",
      subPrompt: "Ceremony coverage",
      subItems: ["Traditional Photo", "Traditional Video", "Candid Photo", "Candid Video"]
    },
    {
      id: "ns_melam",
      title: "Nalugu Mangala Melam (4 - members)",
      subPrompt: "Auspicious instrumental team",
      subItems: ["2 Dolu", "2 Sannai"]
    }
  ],
  "function-hall-decor": [
    {
      id: "fhd_entrance",
      title: "Entrance & Welcome",
      subPrompt: "Grand foyer styling",
      subItems: ["Entrance Arch With 2 Flex Banners", "Banana Trees & Mango Leaves", "Pendals With Side Wall Entrance", "Lighting Entrance", "Trust Box Entrance (Normal)", "Trust Box Entrance (Lighting)", "Ring Passage Entrance", "Foot roll Mats"]
    },
    {
      id: "fhd_stage",
      title: "Stage & Reception",
      subPrompt: "Royal couple backdrop & rituals",
      subItems: ["Reception Decoration", "Reception Garlands (Petals) – 1 Pair", "Lord Ganesh Setup", "Muhurtham Decoration", "Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)", "Sangyam Garlands [ Normal ] – 2 Pairs", "Basikalu 2", "Design Coconut [ With Bride & Groom Names ]"]
    },
    {
      id: "fhd_vehicle",
      title: "Vehicle & Flower Items",
      subPrompt: "Wedding cars and ritual florals",
      subItems: ["Car Decoration – 2 Cars [ Stickers – 4 ]", "15 Muralu puvulu", "Adduthera"]
    },
    {
      id: "fhd_requirements",
      title: "Additional Requirements",
      subPrompt: "Hall furniture and amenities",
      subItems: ["Function Hall Chair Clothes", "Vip Sofas", "Stages", "Coolers"]
    }
  ],
  "catering": [
    {
      id: "cat_infrastructure",
      title: "Catering Requirements",
      subPrompt: "Stalls & buffet setup",
      subItems: ["LED Stalls", "Normal Cloth Stalls", "Round Tables With Cloth", "Chair Clothes [Dining]", "Brass Dishes", "Steel Dishes"]
    },
    {
      id: "cat_snacks",
      title: "Evening Snacks (4.30pm Onwards)",
      subPrompt: "Select up to 5 items & welcome drink",
      subItems: ["Bajji", "Bonda", "Medhu Pakoda", "Onion Pokoda", "Corn Rolls", "Corn Samosa", "Onion Samosa", "Veg. Cutlet", "Veg. Springroll", "Chutney", "Tomato Sauce", "Coffee & Tea", "Pulpy Mango", "Pulpy Orange", "Cold Badam Milk", "Hot Badam Milk", "Fruit Juice"]
    },
    {
      id: "cat_sweets",
      title: "Night Dinner Sweets (Select any two)",
      subPrompt: "Authentic pure ghee sweets",
      subItems: ["Poli", "Basundi", "Jilebi", "Badham Halwa", "Jangri", "Kaju Cake", "Rasamalai", "Kala Jamoon", "Bandar Laddu", "Badhusha", "Kaju Roll", "Badham Cake", "Dry Jamoon", "Carrot Halwa", "Laddu", "Pistha Roll", "Rasagulla", "Champakalli", "Kalakhand", "Mysore Pak", "Malai Sandwich", "Malaikaja", "Cham Cham", "Dry Fruit Halwa", "Agra Killi", "Kova Jangri", "Ravva Laddu", "Dry Fruit Laddu"]
    },
    {
      id: "cat_hot_biryani",
      title: "Hot Items & Biriyani Rice",
      subPrompt: "Crisp snacks & fragrant biriyanis",
      subItems: ["Masala Vada", "Curd Vada", "Corn Samosa", "Alasanda Vada", "Corn Vada", "Veg Spring Roll", "Keera Vada (Leaves)", "Cabbage Vada", "Kaju Pakodi", "Vegetable Biriyani", "Babycorn Biriyani", "Kaju Capsicum Biriyani", "Mushroom Biriyani", "Panasa Biriyani", "Paneer Biriyani"]
    },
    {
      id: "cat_gravy_rice",
      title: "Special Gravy & Special Rice",
      subPrompt: "Rich curries & rice variations",
      subItems: ["Nune Vankaya", "Mushroom Curry", "Vegetable Kurma", "Kaju Capsicum Curry", "Potato Green Peas Masala", "Karivepaku Rice", "Pulhora", "Lemon Rice", "Pudina Rice", "Mango Rice", "Tomato Rice", "Ghee Rice", "Gongura Rice", "Kothimira Rice", "Coconut Rice", "Palak Rice"]
    },
    {
      id: "cat_roti_fry",
      title: "Roti, Raita, Fry & Traditional Essentials",
      subPrompt: "Breads, accompaniments & curries",
      subItems: ["Chapati", "Pulka", "Rumal", "Onion Raita", "Veg. Mixed Raita", "Paneer Butter Masala", "Alu Mutter", "Palak Paneer", "Chana Masala", "Methi Chaman", "Bendakaya Pakodi", "Bendakaya Fry", "Dondakayipakodi", "Potato Curry", "Rice", "Sambar", "Curd", "Rasam (Pappu/Pepper)", "Chips or Papad"]
    }
  ],
  "sangyam-sweets": [
    {
      id: "sw_sweets",
      title: "Sweets (Select Sweet 1 & Sweet 2)",
      subPrompt: "Select a sweet and quantity in Nos",
      subItems: ["Kaju Katli", "Motichoor Laddu", "Mysore Pak", "Gulab Jamun", "Rasgulla", "Dry Fruit Halwa", "Peda", "Badusha", "Kala Jamun", "Rasmalai", "Basundi", "Kaju Roll"]
    },
    {
      id: "sw_hot",
      title: "Hot Items (Savory Snacks)",
      subPrompt: "Select hot items and quantity in Kgs",
      subItems: ["Masala Vada", "Corn Samosa", "Veg Spring Roll", "Kaju Pakodi", "Alasanda Vada", "Onion Pakoda", "Murukku", "Ribbon Pakoda", "Chekkalu"]
    }
  ],
  "photo-video": [
    {
      id: "pv_main",
      title: "Main Photo & Video Coverage",
      subPrompt: "Camera crew",
      subItems: ["Traditional Photo", "Traditional Video", "One Videographer Coverage Entrance & Dining Hall", "Candid Photographer for couples", "Candid Videographer For Couples"]
    },
    {
      id: "pv_tech",
      title: "Drone, Screen & Live Stream",
      subPrompt: "Display & streaming technology",
      subItems: ["Drone", "TV (Full / Half)", "LED Wall (Full / Half)", "Live Stream (Half Session)", "Live Stream (Full Session)"]
    },
    {
      id: "pv_shoots",
      title: "Pre & Post Wedding Shoots",
      subPrompt: "Cinematic shoots",
      subItems: ["Pre Wedding Shoot (Normal)", "Pre Wedding Shoot (Cinematic)", "Post Wedding Shoot (Normal)", "Post Wedding Shoot (Cinematic)"]
    },
    {
      id: "pv_addons",
      title: "Additional Services & Deliverables",
      subPrompt: "Albums and digital gifts",
      subItems: ["Whats App Invitation", "Promo (Only For Candid Video)", "Marriage Album (Sheets)", "Pendrive", "Photo Frame", "Harddisk [1 TB]"]
    },
    {
      id: "pv_vratham",
      title: "Sathyanarayana Vratham Coverage",
      subPrompt: "Vratham ceremony",
      subItems: ["Yes", "No"]
    }
  ],
  "special-events": [
    {
      id: "se_col1",
      title: "Event Options (Column 1)",
      subPrompt: "Props & entries with quantities",
      subItems: ["Photo Booth", "Crackers 120 Shots", "Pallaki With Boys", "Flower Shots – 25+", "Design Pot", "Fog – 4 times", "Sky Lanterns", "Welcoming Dance"]
    },
    {
      id: "se_col2",
      title: "Event Options (Column 2)",
      subPrompt: "Entries, horses & fireworks with quantities",
      subItems: ["Horse", "Horse Cart", "Cold Fire – 4 times", "Harathi plates", "Design Umbrella", "Doli", "Special Entry", "Design Butta"]
    }
  ],
  "musical-events": [
    {
      id: "me_options",
      title: "Musical Entertainment Cards",
      subPrompt: "Select music genres & setup",
      subItems: [
        "Orchestra (Full orchestra for a grand musical experience)",
        "DJ (Professional DJ with latest music collection)",
        "Light Music (Melodious light music for a pleasant atmosphere)",
        "Live Instrumental Music (Live instrumental performance)"
      ]
    }
  ],
  "sangyam-bags": [
    {
      id: "sb_combo",
      title: "Sangyam Bags (Combo)",
      subPrompt: "Complete sangyam bag combo with all items",
      subItems: ["Printed Name Bags", "Coconut", "Aku, Vakka", "Pasupu Kumkuma"]
    },
    {
      id: "sb_quantities",
      title: "Combo Sets Quantity Selection",
      subPrompt: "Standard order batch",
      subItems: ["50 Sets", "100 Sets", "150 Sets", "200 Sets", "250 Sets", "500 Sets"]
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

// 1. Update data.js
const dataPath = path.resolve(__dirname, '..', 'data.js');
delete require.cache[require.resolve('../data.js')];
const siteData = require('../data.js');

if (Array.isArray(siteData.weddingServices)) {
  siteData.weddingServices.forEach(s => {
    const exactOpts = EXACT_WEDDING_OPTIONS[s.id];
    if (exactOpts) {
      s.options = exactOpts;
    }
  });
}

if (Array.isArray(siteData.products)) {
  siteData.products.forEach(p => {
    if (p.category === 'wedding') {
      const exactOpts = EXACT_WEDDING_OPTIONS[p.id];
      if (exactOpts) {
        p.options = exactOpts;
      }
    }
  });
}

// Also update weddingConfigs if present
if (siteData.weddingConfigs) {
  for (const [id, opts] of Object.entries(EXACT_WEDDING_OPTIONS)) {
    siteData.weddingConfigs[id] = opts;
  }
}

const updatedPrefix = `const SITE_DATA = ${JSON.stringify(siteData, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.SITE_DATA = SITE_DATA;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = SITE_DATA;\n}\n`;
fs.writeFileSync(dataPath, updatedPrefix, 'utf-8');
console.log('Successfully updated data.js with EXACT_WEDDING_OPTIONS!');

// 2. Generate Supabase SQL file
let sql = `-- ==============================================================================
-- Celebration Events: Sync Wedding Services Exact Options to Supabase
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wqnobkskmvilfhduvxsu/sql/new
-- ==============================================================================

-- 1. Ensure 'options' column exists on public.products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS options JSONB DEFAULT '[]'::jsonb;

-- 2. Upsert each wedding service with exact options matching wedding.html:
\n`;

for (const [serviceId, options] of Object.entries(EXACT_WEDDING_OPTIONS)) {
  if (serviceId === 'house-decoration') continue; // same as house-decor
  const prod = siteData.products?.find(p => p.id === serviceId) || siteData.weddingServices?.find(s => s.id === serviceId) || {};
  const title = (prod.title || serviceId).replace(/'/g, "''");
  const price = prod.price || 9999;
  const image = (prod.image || 'assets/traditional-melam.jpg').replace(/'/g, "''");
  const desc = (prod.description || prod.longDesc || prod.desc || 'Premium traditional wedding service.').replace(/'/g, "''");
  const badge = (prod.badge || 'TRADITIONAL').replace(/'/g, "''");
  const jsonLiteral = JSON.stringify(options).replace(/'/g, "''");

  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `-- Service: ${serviceId} (${prod.title || serviceId})\n`;
  sql += `-- -----------------------------------------------------------------------------\n`;
  sql += `INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  '${serviceId}',
  '${title}',
  'wedding',
  'Wedding',
  ${price},
  '${badge}',
  '${image}',
  '${desc}',
  '${jsonLiteral}'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());\n\n`;
}

// Write SQL file
const sqlPath = path.resolve(__dirname, '..', 'supabase-wedding-services-sync.sql');
fs.writeFileSync(sqlPath, sql, 'utf-8');
console.log('Successfully generated supabase-wedding-services-sync.sql with UPSERT queries!');
console.log('Successfully generated supabase-wedding-services-sync.sql!');
