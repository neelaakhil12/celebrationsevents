-- ==============================================================================
-- Affectioin Events: Sync Wedding Services Exact Options to Supabase
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wqnobkskmvilfhduvxsu/sql/new
-- ==============================================================================

-- 1. Ensure 'options' column exists on public.products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS options JSONB DEFAULT '[]'::jsonb;

-- 2. Upsert each wedding service with exact options matching wedding.html:

-- -----------------------------------------------------------------------------
-- Service: melam (Melam)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'melam',
  'Melam',
  'wedding',
  'Wedding',
  8499,
  'AUSPICIOUS',
  'assets/traditional-melam.jpg',
  'Master musicians providing soul-stirring auspicious melodies for your muhurat and Baraat processions. Traditional Nadaswaram, Thavil, Punjabi Dhol, and Shehnai troupes.',
  '[{"id":"melam_mangala","title":"Mangala Melam","subPrompt":"Select instruments type","subItems":["Nalugu (4 Members) - 2 Dolu","Nalugu (4 Members) - 2 Sannai"]},{"id":"melam_welcoming","title":"Welcoming Melam","subPrompt":"Select welcoming location","subItems":["Welcoming (House)","Welcoming (Function Hall)"]},{"id":"melam_marriage","title":"Marriage Melam","subPrompt":"Select troupe size","subItems":["Marriage (6 Members)","Marriage (9 Members)"]},{"id":"melam_kerala_drums","title":"Kerala Drums","subPrompt":"Select members strength","subItems":["Kerala Drums (5 Members)","Kerala Drums (10 Members)","Kerala Drums (15 Members)"]},{"id":"melam_band_set","title":"Band Set","subPrompt":"Select band strength","subItems":["Band Set (7 Members)","Band Set (12 Members)","Band Set (15 Members)"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: house-decor (House Decoration)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'house-decor',
  'House Decoration',
  'wedding',
  'Wedding',
  9999,
  'TRADITIONAL',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
  'Complete traditional home decoration for weddings including front gate pandals, vibrant LED string lights, fresh banana tree pillars, marigold entrance torans, and courtyard styling.',
  '[{"id":"hd_pendals","title":"Pendals In Front Of House","subPrompt":"Choose pendal type","subItems":["Tenkaya pandhiri","Normal pendals"]},{"id":"hd_lighting","title":"Lighting Decoration For Building","subPrompt":"3 or 5 Days with Max of 50 Serial Sets","subItems":["3 Days (Max 50 Serial Sets)","5 Days (Max 50 Serial Sets)"]},{"id":"hd_banana","title":"Banana Trees & Mango Leaves","subPrompt":"Main doorway auspicious pillars","subItems":["Banana Trees & Mango Leaves"]},{"id":"hd_marigold","title":"Marigold Flowers For Main Door And Inside the House","subPrompt":"Choose flower type","subItems":["Normal","Special"]},{"id":"hd_gaja","title":"Gaja Maala For Main Door","subPrompt":"Grand entrance garland","subItems":["Yes","No"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: nalugu-snanam (Nalugu & Mangala Snanam Decoration)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'nalugu-snanam',
  'Nalugu & Mangala Snanam Decoration',
  'wedding',
  'Wedding',
  7499,
  'RITUAL SPECIAL',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'Auspicious yellow and orange marigold setup designed for ritual purifications, Nalugu and Mangala Snanam. Features traditional brass urlis, wooden peeta, flower jewellery for the bride/groom, and vibrant backdrop frames.',
  '[{"id":"ns_concept","title":"Main Decoration Services","subPrompt":"Traditional rituals decor","subItems":["Nalugu Concept Decoration","Mangala Sanam Decoration","Flower Jewellery","Nalugu Maala (Petals)","Nalugu Maala (Normal)"]},{"id":"ns_food","title":"For Nalugu Event (Traditional Feast Menu)","subPrompt":"Select customary food items","subItems":["Sweet","Rice","Pappu","Sambar","Rasam","Curd","Pickle","Chips","Oil Fry"]},{"id":"ns_photo","title":"Photo & Videography","subPrompt":"Ceremony coverage","subItems":["Traditional Photo","Traditional Video","Candid Photo","Candid Video"]},{"id":"ns_melam","title":"Nalugu Mangala Melam (4 - members)","subPrompt":"Auspicious instrumental team","subItems":["2 Dolu","2 Sannai"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: function-hall-decor (Function Hall Flower Decoration)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'function-hall-decor',
  'Function Hall Flower Decoration',
  'wedding',
  'Wedding',
  24999,
  'GRAND STAGE',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'Grand banquet hall and convention center wedding styling. Includes majestic grand entrance arch, mandapam / stage backdrop with exotic flowers, couple sofa, aisle walkway runners, and chandeliers.',
  '[{"id":"fhd_entrance","title":"Entrance & Welcome","subPrompt":"Grand foyer styling","subItems":["Entrance Arch With 2 Flex Banners","Banana Trees & Mango Leaves","Pendals With Side Wall Entrance","Lighting Entrance","Trust Box Entrance (Normal)","Trust Box Entrance (Lighting)","Ring Passage Entrance","Foot roll Mats"]},{"id":"fhd_stage","title":"Stage & Reception","subPrompt":"Royal couple backdrop & rituals","subItems":["Reception Decoration","Reception Garlands (Petals) – 1 Pair","Lord Ganesh Setup","Muhurtham Decoration","Muhurtham Garlands – 1 Pair (Petals) & Jada With Venis (Petal)","Sangyam Garlands [ Normal ] – 2 Pairs","Basikalu 2","Design Coconut [ With Bride & Groom Names ]"]},{"id":"fhd_vehicle","title":"Vehicle & Flower Items","subPrompt":"Wedding cars and ritual florals","subItems":["Car Decoration – 2 Cars [ Stickers – 4 ]","15 Muralu puvulu","Adduthera"]},{"id":"fhd_requirements","title":"Additional Requirements","subPrompt":"Hall furniture and amenities","subItems":["Function Hall Chair Clothes","Vip Sofas","Stages","Coolers"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: catering (Catering)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'catering',
  'Catering',
  'wedding',
  'Wedding',
  49999,
  'MULTI-CUISINE',
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  'Hygienic, authentic traditional and multi-cuisine wedding catering. Includes welcome mocktails, live chaat counter, traditional banana leaf / buffet service, signature curries, biryani, artisanal breads, and decadent desserts.',
  '[{"id":"cat_infrastructure","title":"Catering Requirements","subPrompt":"Stalls & buffet setup","subItems":["LED Stalls","Normal Cloth Stalls","Round Tables With Cloth","Chair Clothes [Dining]","Brass Dishes","Steel Dishes"]},{"id":"cat_snacks","title":"Evening Snacks (4.30pm Onwards)","subPrompt":"Select up to 5 items & welcome drink","subItems":["Bajji","Bonda","Medhu Pakoda","Onion Pokoda","Corn Rolls","Corn Samosa","Onion Samosa","Veg. Cutlet","Veg. Springroll","Chutney","Tomato Sauce","Coffee & Tea","Pulpy Mango","Pulpy Orange","Cold Badam Milk","Hot Badam Milk","Fruit Juice"]},{"id":"cat_sweets","title":"Night Dinner Sweets (Select any two)","subPrompt":"Authentic pure ghee sweets","subItems":["Poli","Basundi","Jilebi","Badham Halwa","Jangri","Kaju Cake","Rasamalai","Kala Jamoon","Bandar Laddu","Badhusha","Kaju Roll","Badham Cake","Dry Jamoon","Carrot Halwa","Laddu","Pistha Roll","Rasagulla","Champakalli","Kalakhand","Mysore Pak","Malai Sandwich","Malaikaja","Cham Cham","Dry Fruit Halwa","Agra Killi","Kova Jangri","Ravva Laddu","Dry Fruit Laddu"]},{"id":"cat_hot_biryani","title":"Hot Items & Biriyani Rice","subPrompt":"Crisp snacks & fragrant biriyanis","subItems":["Masala Vada","Curd Vada","Corn Samosa","Alasanda Vada","Corn Vada","Veg Spring Roll","Keera Vada (Leaves)","Cabbage Vada","Kaju Pakodi","Vegetable Biriyani","Babycorn Biriyani","Kaju Capsicum Biriyani","Mushroom Biriyani","Panasa Biriyani","Paneer Biriyani"]},{"id":"cat_gravy_rice","title":"Special Gravy & Special Rice","subPrompt":"Rich curries & rice variations","subItems":["Nune Vankaya","Mushroom Curry","Vegetable Kurma","Kaju Capsicum Curry","Potato Green Peas Masala","Karivepaku Rice","Pulhora","Lemon Rice","Pudina Rice","Mango Rice","Tomato Rice","Ghee Rice","Gongura Rice","Kothimira Rice","Coconut Rice","Palak Rice"]},{"id":"cat_roti_fry","title":"Roti, Raita, Fry & Traditional Essentials","subPrompt":"Breads, accompaniments & curries","subItems":["Chapati","Pulka","Rumal","Onion Raita","Veg. Mixed Raita","Paneer Butter Masala","Alu Mutter","Palak Paneer","Chana Masala","Methi Chaman","Bendakaya Pakodi","Bendakaya Fry","Dondakayipakodi","Potato Curry","Rice","Sambar","Curd","Rasam (Pappu/Pepper)","Chips or Papad"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: sangyam-sweets (Sangyam Sweets)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'sangyam-sweets',
  'Sangyam Sweets',
  'wedding',
  'Wedding',
  4999,
  'PURE GHEE',
  'assets/sangyam-sweets.jpg',
  'Handcrafted authentic wedding sweets and savory snacks made with pure cow ghee. Packaged in customized wedding gift boxes, perfect for guest welcome and rituals.',
  '[{"id":"sw_sweets","title":"Sweets (Select Sweet 1 & Sweet 2)","subPrompt":"Select a sweet and quantity in Nos","subItems":["Kaju Katli","Motichoor Laddu","Mysore Pak","Gulab Jamun","Rasgulla","Dry Fruit Halwa","Peda","Badusha","Kala Jamun","Rasmalai","Basundi","Kaju Roll"]},{"id":"sw_hot","title":"Hot Items (Savory Snacks)","subPrompt":"Select hot items and quantity in Kgs","subItems":["Masala Vada","Corn Samosa","Veg Spring Roll","Kaju Pakodi","Alasanda Vada","Onion Pakoda","Murukku","Ribbon Pakoda","Chekkalu"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: photo-video (Photo & Videography)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'photo-video',
  'Photo & Videography',
  'wedding',
  'Wedding',
  29999,
  '4K CINEMATIC',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
  'Top-tier wedding cinematographers capturing every emotional ritual and candid smile. Includes high-res digital albums, 4K cinematic wedding teaser, drone footage, and traditional full-length coverage.',
  '[{"id":"pv_main","title":"Main Photo & Video Coverage","subPrompt":"Camera crew","subItems":["Traditional Photo","Traditional Video","One Videographer Coverage Entrance & Dining Hall","Candid Photographer for couples","Candid Videographer For Couples"]},{"id":"pv_tech","title":"Drone, Screen & Live Stream","subPrompt":"Display & streaming technology","subItems":["Drone","TV (Full / Half)","LED Wall (Full / Half)","Live Stream (Half Session)","Live Stream (Full Session)"]},{"id":"pv_shoots","title":"Pre & Post Wedding Shoots","subPrompt":"Cinematic shoots","subItems":["Pre Wedding Shoot (Normal)","Pre Wedding Shoot (Cinematic)","Post Wedding Shoot (Normal)","Post Wedding Shoot (Cinematic)"]},{"id":"pv_addons","title":"Additional Services & Deliverables","subPrompt":"Albums and digital gifts","subItems":["Whats App Invitation","Promo (Only For Candid Video)","Marriage Album (Sheets)","Pendrive","Photo Frame","Harddisk [1 TB]"]},{"id":"pv_vratham","title":"Sathyanarayana Vratham Coverage","subPrompt":"Vratham ceremony","subItems":["Yes","No"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: special-events (Special Events)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'special-events',
  'Special Events',
  'wedding',
  'Wedding',
  11999,
  'THEME DECOR',
  'assets/special-events-pyro.jpg',
  'Full-scale themed pre-wedding parties and grand receptions. Includes concept design, special lighting, cold fire entry pyrotechnics, dry ice smoke, and personalized themes.',
  '[{"id":"se_col1","title":"Event Options (Column 1)","subPrompt":"Props & entries with quantities","subItems":["Photo Booth","Crackers 120 Shots","Pallaki With Boys","Flower Shots – 25+","Design Pot","Fog – 4 times","Sky Lanterns","Welcoming Dance"]},{"id":"se_col2","title":"Event Options (Column 2)","subPrompt":"Entries, horses & fireworks with quantities","subItems":["Horse","Horse Cart","Cold Fire – 4 times","Harathi plates","Design Umbrella","Doli","Special Entry","Design Butta"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: musical-events (Musical Events)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'musical-events',
  'Musical Events',
  'wedding',
  'Wedding',
  19999,
  'LIVE BAND',
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
  'Enthralling live musical bands, acoustic singers, Sufi ensembles, and classical fusion orchestras to keep your wedding guests mesmerized throughout the evening.',
  '[{"id":"me_options","title":"Musical Entertainment Cards","subPrompt":"Select music genres & setup","subItems":["Orchestra (Full orchestra for a grand musical experience)","DJ (Professional DJ with latest music collection)","Light Music (Melodious light music for a pleasant atmosphere)","Live Instrumental Music (Live instrumental performance)"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: sangyam-bags (Sangyam Bags)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'sangyam-bags',
  'Sangyam Bags',
  'wedding',
  'Wedding',
  2999,
  'RETURN GIFTS',
  'assets/sangyam-bags.jpg',
  'Exquisitely designed wedding favor bags featuring silk brocade, jute-cotton, or golden foil prints with bride and groom names. Perfect for distributing sweets, clothes, and tamboolam.',
  '[{"id":"sb_combo","title":"Sangyam Bags (Combo)","subPrompt":"Complete sangyam bag combo with all items","subItems":["Printed Name Bags","Coconut","Aku, Vakka","Pasupu Kumkuma"]},{"id":"sb_quantities","title":"Combo Sets Quantity Selection","subPrompt":"Standard order batch","subItems":["50 Sets","100 Sets","150 Sets","200 Sets","250 Sets","500 Sets"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: bridal-makeup (Bridal Makeup)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'bridal-makeup',
  'Bridal Makeup',
  'wedding',
  'Wedding',
  14999,
  'CELEBRITY ARTISTS',
  'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
  'Certified celebrity bridal hair and makeup artists providing HD and Airbrush makeup that stays flawless for 16+ hours through tearful farewells and intense photo flashes.',
  '[{"id":"bm_makeup","title":"Bridal Makeup Packages","subPrompt":"Certified makeup artists","subItems":["HD Bridal Makeup & Hairstyling","Luxury Airbrush Bridal Makeup","Engagement & Reception Styling","Mother & Sister Makeup Add-ons"]},{"id":"bm_draping","title":"Hair Styling & Saree Draping","subPrompt":"Traditional finishing touches","subItems":["Bridal Hairstyling with Fresh Flower Venis","Traditional Saree Draping & Jewellery Setting"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: mehandi (Mehandi)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'mehandi',
  'Mehandi',
  'wedding',
  'Wedding',
  5999,
  'ORGANIC HENNA',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  'Master henna artists creating intricate Arabic, Marwari, floral, and portrait bridal mehendi with 100% organic, chemical-free henna paste for rich dark mahogany stains.',
  '[{"id":"mh_bridal","title":"Bridal Mehendi Designs","subPrompt":"Intricate bridal artistry","subItems":["Traditional Rajasthani / Marwari Full Hand & Feet","Arabic Floral Fusion Mehendi","Figure & Portrait Custom Bridal Mehendi"]},{"id":"mh_guests","title":"Guest Mehendi & Quality Cones","subPrompt":"Party counters for relatives","subItems":["Guest Mehendi Artists (Group Booking)","100% Organic Fresh Henna Cones"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

-- -----------------------------------------------------------------------------
-- Service: sangeet (Sangeet)
-- -----------------------------------------------------------------------------
INSERT INTO public.products (id, title, category, category_name, price, badge, image, description, options, updated_at)
VALUES (
  'sangeet',
  'Sangeet',
  'wedding',
  'Wedding',
  19999,
  'PARTY & DJ',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  'Electrifying Sangeet night choreography and entertainment. Includes dance choreographers for family rehearsals, energetic wedding DJ with concert sound, and dazzling dance-floor LED screens.',
  '[{"id":"sg_choreo","title":"Dance Choreography & Rehearsals","subPrompt":"Professional choreographers","subItems":["Couple Dance Choreography (3-5 Days)","Family & Friends Group Choreography","Grand Entry Flashmob Setup"]},{"id":"sg_stage","title":"Sangeet Stage, DJ & Lights","subPrompt":"High-energy party setup","subItems":["Intelligent Moving Beam Lights & Trussing","High-Resolution LED Stage Backdrop Wall","Professional Sangeet DJ & Emcee"]}]'::jsonb,
  timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET 
  options = EXCLUDED.options,
  title = EXCLUDED.title,
  badge = EXCLUDED.badge,
  updated_at = timezone('utc'::text, now());

