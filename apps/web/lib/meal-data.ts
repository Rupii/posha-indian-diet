export interface MealSlot {
  day: number
  slotType: string
  time: string
  dish: string
  sub: string
  calories: number
  protein: number
  carbs: number
  fat: number
  region: string
  state?: string
  tags: string[]
  /** 'egg' = egg-based non-veg (egg users see this; veg users don't) */
  dietaryGroup?: 'egg'
}

export interface RegionState {
  id: string
  name: string
}

export const REGION_STATES: Record<string, RegionState[]> = {
  north: [
    { id: 'punjab',           name: 'Punjab' },
    { id: 'delhi',            name: 'Delhi/NCR' },
    { id: 'uttar_pradesh',    name: 'Uttar Pradesh' },
    { id: 'rajasthan',        name: 'Rajasthan' },
    { id: 'himachal_pradesh', name: 'Himachal Pradesh' },
    { id: 'uttarakhand',      name: 'Uttarakhand' },
    { id: 'haryana',          name: 'Haryana' },
  ],
  south: [
    { id: 'tamil_nadu',      name: 'Tamil Nadu' },
    { id: 'karnataka',       name: 'Karnataka' },
    { id: 'kerala',          name: 'Kerala' },
    { id: 'andhra_pradesh',  name: 'Andhra Pradesh' },
    { id: 'telangana',       name: 'Telangana' },
  ],
  east: [
    { id: 'west_bengal', name: 'West Bengal' },
    { id: 'odisha',      name: 'Odisha' },
    { id: 'bihar',       name: 'Bihar' },
    { id: 'jharkhand',   name: 'Jharkhand' },
    { id: 'assam',       name: 'Assam' },
  ],
  west: [
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'gujarat',     name: 'Gujarat' },
    { id: 'goa',         name: 'Goa' },
  ],
}

// ── South Indian Meals ────────────────────────────────────────────────────────
export const SOUTH_INDIAN_MEALS: MealSlot[] = [
  // Day 1
  { day:0, slotType:'Breakfast',     time:'8–9 am',  dish:'Ven Pongal',             sub:'Rice, mung dal, ghee, black pepper',         calories:340, protein:10, carbs:52, fat:10, region:'south', state:'tamil_nadu',     tags:['Iron-rich','Gut-friendly','Comfort food'] },
  { day:0, slotType:'Morning Snack', time:'11 am',   dish:'Roasted Banana Chips',   sub:'Raw banana, coconut oil, sea salt',          calories:185, protein:2,  carbs:28, fat:8,  region:'south', state:'kerala',          tags:['Potassium-rich','Crispy','Traditional'] },
  { day:0, slotType:'Lunch',         time:'1–2 pm',  dish:'Lemon Rice + Sambar',    sub:'Rice, turmeric, lemon, dal, vegetables',     calories:520, protein:16, carbs:78, fat:12, region:'south', state:'tamil_nadu',     tags:['Probiotic','Fiber-rich','Complete meal'] },
  { day:0, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Filter Coffee + Murukku',sub:'Coffee, milk, rice flour savory',            calories:220, protein:6,  carbs:32, fat:8,  region:'south', state:'tamil_nadu',     tags:['Energizing','Aromatic','Iron-rich'] },
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Masala Dosa',            sub:'Rice-lentil crepe, potato masala, coconut',  calories:480, protein:14, carbs:68, fat:14, region:'south', state:'karnataka',      tags:['Fermented','Probiotic','Satisfying'] },
  // Day 2
  { day:1, slotType:'Breakfast',     time:'8–9 am',  dish:'Idli + Coconut Chutney', sub:'Rice-lentil cakes, coconut, ginger',         calories:285, protein:11, carbs:44, fat:8,  region:'south', state:'tamil_nadu',     tags:['Fermented','Gut-friendly','Easy digest'] },
  { day:1, slotType:'Morning Snack', time:'11 am',   dish:'Coconut Sundal',         sub:'Boiled peanuts, coconut, mustard, curry leaf',calories:165, protein:7, carbs:18, fat:7,  region:'south', state:'tamil_nadu',     tags:['Protein-rich','Calcium-rich','Traditional'] },
  { day:1, slotType:'Lunch',         time:'1–2 pm',  dish:'Tamarind Rice + Rasam',  sub:'Rice, tamarind, turmeric, dal-based broth',  calories:510, protein:14, carbs:76, fat:11, region:'south', state:'tamil_nadu',     tags:['Tangy','Digestive','Comforting'] },
  { day:1, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Roasted Makhana + Milk', sub:'Makhana, jaggery, cardamom, warm milk',      calories:180, protein:6,  carbs:28, fat:4,  region:'south',                         tags:['Calcium-rich','Calming','Iron-rich'] },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Kerala Fish Curry + Rice',sub:'Pomfret, coconut milk, turmeric, mustard',  calories:540, protein:28, carbs:60, fat:16, region:'south', state:'kerala',          tags:['Omega-3','DHA-rich','Anti-inflammatory'] },
  // Day 3
  { day:2, slotType:'Breakfast',     time:'8–9 am',  dish:'Pesarattu + Chutney',    sub:'Moong lentil crepe, ginger, green chili',    calories:310, protein:13, carbs:45, fat:9,  region:'south', state:'andhra_pradesh', tags:['High-protein','Lentil-rich','Savory'] },
  { day:2, slotType:'Morning Snack', time:'11 am',   dish:'Chakli + Jaggery',       sub:'Rice-lentil spiral, sesame, cumin',          calories:200, protein:4,  carbs:32, fat:6,  region:'south', state:'andhra_pradesh', tags:['Crunchy','Traditional','Energy boost'] },
  { day:2, slotType:'Lunch',         time:'1–2 pm',  dish:'Bisibelebath + Papadam', sub:'Rice, dal, vegetables, spices in one pot',   calories:430, protein:14, carbs:72, fat:9,  region:'south', state:'karnataka',      tags:['Complete meal','Vegetarian','Balanced'] },
  { day:2, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Banana + Jaggery + Milk',sub:'Ripe banana, jaggery powder, warm milk',     calories:195, protein:5,  carbs:38, fat:3,  region:'south',                         tags:['Easy digest','Iron-rich','Quick energy'] },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Curd Rice + Avial',      sub:'Rice, yogurt, ginger, vegetable medley',     calories:420, protein:12, carbs:58, fat:12, region:'south', state:'tamil_nadu',     tags:['Cooling','Probiotic','Vegetarian'] },
  // Day 4
  { day:3, slotType:'Breakfast',     time:'8–9 am',  dish:'Puttu + Coconut Milk',   sub:'Rice flour, jaggery, grated coconut',        calories:320, protein:8,  carbs:54, fat:8,  region:'south', state:'kerala',          tags:['Natural sweetness','Steamed','Light'] },
  { day:3, slotType:'Morning Snack', time:'11 am',   dish:'Appam + Jaggery Syrup',  sub:'Rice-coconut batter, fermented',             calories:240, protein:5,  carbs:42, fat:5,  region:'south', state:'kerala',          tags:['Fermented','Soft','Light'] },
  { day:3, slotType:'Lunch',         time:'1–2 pm',  dish:'Andhra Fish Curry + Rice',sub:'Red snapper, turmeric, mustard, tamarind',  calories:530, protein:30, carbs:62, fat:14, region:'south', state:'andhra_pradesh', tags:['Spicy','Omega-3','High-protein'] },
  { day:3, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Dates + Walnut + Doodh', sub:'A small fistful, warm milk',                 calories:200, protein:6,  carbs:28, fat:8,  region:'south',                         tags:['Iron-rich','Energy-dense','Mineral-rich'] },
  { day:3, slotType:'Dinner',        time:'8–9 pm',  dish:'Rava Idli + Sambar',     sub:'Semolina idli, lentil-vegetable broth',      calories:360, protein:11, carbs:56, fat:8,  region:'south', state:'tamil_nadu',     tags:['Light','Fermented','Quick'] },
  // Day 5
  { day:4, slotType:'Breakfast',     time:'8–9 am',  dish:'Set Dosa + Sambar',      sub:'Thin crispy rice crepe, dal-spice broth',    calories:380, protein:12, carbs:62, fat:9,  region:'south', state:'karnataka',      tags:['Crispy','Light','Traditional'] },
  { day:4, slotType:'Morning Snack', time:'11 am',   dish:'Sundal + Coconut',       sub:'Boiled chickpeas, grated coconut, mustard',  calories:180, protein:8,  carbs:22, fat:6,  region:'south', state:'tamil_nadu',     tags:['Protein-rich','Fiber-rich','Snack'] },
  { day:4, slotType:'Lunch',         time:'1–2 pm',  dish:'Kootu + Rice',           sub:'Lentil-vegetable stew with coconut paste',   calories:450, protein:14, carbs:68, fat:11, region:'south', state:'tamil_nadu',     tags:['Creamy','Vegetarian','Comforting'] },
  { day:4, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Fried Green Banana',     sub:'Green banana chips, coconut oil, salt',      calories:190, protein:2,  carbs:30, fat:7,  region:'south', state:'kerala',          tags:['Resistant starch','Traditional','Filling'] },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Uttapam + Chutney',      sub:'Thick rice pancake, fermented, tomato-onion',calories:410, protein:11, carbs:64, fat:10, region:'south', state:'tamil_nadu',     tags:['Fermented','Fluffy','Quick meal'] },
  // Day 6
  { day:5, slotType:'Breakfast',     time:'8–9 am',  dish:'Vegetable Upma',         sub:'Semolina, carrot, peas, ginger, cumin',      calories:300, protein:8,  carbs:48, fat:8,  region:'south',                         tags:['Savory','Quick','Comfort'] },
  { day:5, slotType:'Morning Snack', time:'11 am',   dish:'Peanut Chikki',          sub:'Jaggery brittle, roasted peanuts',           calories:200, protein:6,  carbs:26, fat:9,  region:'south',                         tags:['Crunchy','Iron-rich','Energy'] },
  { day:5, slotType:'Lunch',         time:'1–2 pm',  dish:'Gongura Shrimp + Rice',  sub:'Sorrel leaf curry, shrimp, spices',          calories:490, protein:28, carbs:58, fat:13, region:'south', state:'andhra_pradesh', tags:['Tangy','Omega-3','Traditional'] },
  { day:5, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Mango Pulp + Milk',      sub:'Seasonal mango, jaggery, warm milk',         calories:210, protein:4,  carbs:42, fat:3,  region:'south',                         tags:['Seasonal','Natural sweetness','Refreshing'] },
  { day:5, slotType:'Dinner',        time:'8–9 pm',  dish:'Appam + Fish Stew',      sub:'Bowl pancake, fish, coconut milk, spices',   calories:520, protein:26, carbs:56, fat:16, region:'south', state:'kerala',          tags:['Soft','Coconut milk','Traditional'] },
  // Day 7
  { day:6, slotType:'Breakfast',     time:'8–9 am',  dish:'Kali + Sambar',          sub:'Rice flour porridge, lentil-vegetable broth',calories:340, protein:9,  carbs:54, fat:7,  region:'south', state:'tamil_nadu',     tags:['Traditional','Silky','Comfort'] },
  { day:6, slotType:'Morning Snack', time:'11 am',   dish:'Dates + Almonds + Milk', sub:'Dates, almonds, warm milk, cardamom',        calories:200, protein:6,  carbs:28, fat:8,  region:'south',                         tags:['Iron-rich','Energy-dense','Mineral-rich'] },
  { day:6, slotType:'Lunch',         time:'1–2 pm',  dish:'Kozhukattai + Sambar',   sub:'Steamed rice cake, vegetable filling',       calories:380, protein:9,  carbs:62, fat:9,  region:'south', state:'tamil_nadu',     tags:['Steamed','Light','Vegetarian'] },
  { day:6, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Ribbon Pakora + Chai',   sub:'Yam fritters, rice flour, cardamom tea',     calories:220, protein:4,  carbs:34, fat:8,  region:'south', state:'karnataka',      tags:['Crispy','Root vegetable','Seasonal'] },
  { day:6, slotType:'Dinner',        time:'8–9 pm',  dish:'Coconut Rice + Stir-fry',sub:'Rice, grated coconut, mustard, curry leaf',  calories:420, protein:10, carbs:66, fat:12, region:'south', state:'tamil_nadu',     tags:['Fragrant','Coconut','Light'] },
  // Egg dishes (shown for egg dietary; redistributed for non_veg on all-veg days)
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Muttai Masala + Rice',   sub:'Egg curry, tomato, onion, South Indian spices', calories:480, protein:22, carbs:58, fat:16, region:'south', state:'tamil_nadu',  tags:['High-protein','Egg-based','Spicy'], dietaryGroup:'egg' },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Nadan Mutta Curry + Rice',sub:'Kerala egg curry, coconut milk, turmeric',   calories:490, protein:20, carbs:60, fat:16, region:'south', state:'kerala',         tags:['Coconut milk','Egg-based','Traditional'], dietaryGroup:'egg' },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Andhra Egg Masala + Rice',sub:'Egg, tamarind, chili, gongura tempering',    calories:500, protein:22, carbs:62, fat:16, region:'south', state:'andhra_pradesh', tags:['Spicy','Egg-based','Tangy'], dietaryGroup:'egg' },
  { day:6, slotType:'Dinner',        time:'8–9 pm',  dish:'Egg Dosa + Sambar',      sub:'Crispy dosa, egg filling, coconut chutney',  calories:460, protein:20, carbs:56, fat:15, region:'south', state:'karnataka',      tags:['Crispy','Egg-based','Quick'], dietaryGroup:'egg' },
]

// ── North Indian Meals ────────────────────────────────────────────────────────
export const NORTH_INDIAN_MEALS: MealSlot[] = [
  // Day 1
  { day:0, slotType:'Breakfast',     time:'8–9 am',  dish:'Aloo Paratha + Curd',    sub:'Wheat flatbread, potato, cumin, yogurt',     calories:380, protein:11, carbs:56, fat:11, region:'north', state:'punjab',          tags:['Filling','Comfort','Traditional'] },
  { day:0, slotType:'Morning Snack', time:'11 am',   dish:'Dry Fruit Mix + Chai',   sub:'Almonds, walnuts, raisins, cardamom chai',   calories:220, protein:7,  carbs:22, fat:11, region:'north',                         tags:['Brain-boosting','Warming','Iron-rich'] },
  { day:0, slotType:'Lunch',         time:'1–2 pm',  dish:'Dal Makhani + Basmati',  sub:'Creamy lentil curry, butter, basmati rice',  calories:540, protein:18, carbs:72, fat:16, region:'north',                         tags:['Creamy','Rich','Protein-packed'] },
  { day:0, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Samosa + Tamarind Chutney',sub:'Pastry, potato, peas, tamarind sauce',     calories:240, protein:5,  carbs:36, fat:8,  region:'north',                         tags:['Crispy','Tangy','Savory'] },
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Dal Tadka + 2 Phulka',   sub:'Tempered lentil curry, wheat flatbread',     calories:380, protein:15, carbs:58, fat:8,  region:'north',                         tags:['Light','Digestive','Iron-rich'] },
  // Day 2
  { day:1, slotType:'Breakfast',     time:'8–9 am',  dish:'Poha + Jaggery',         sub:'Flattened rice, potato, peas, turmeric',     calories:310, protein:7,  carbs:52, fat:7,  region:'north',                         tags:['Quick','Light','Traditional'] },
  { day:1, slotType:'Morning Snack', time:'11 am',   dish:'Seasonal Fruit',         sub:'Apple or orange, jaggery powder',            calories:140, protein:2,  carbs:34, fat:0,  region:'north',                         tags:['Fresh','Natural','Vitamin C'] },
  { day:1, slotType:'Lunch',         time:'1–2 pm',  dish:'Rajma Chawal + Salad',   sub:'Kidney beans, rice, onion tomato salad',     calories:540, protein:18, carbs:78, fat:9,  region:'north',                         tags:['Protein-rich','Complete meal','Comfort'] },
  { day:1, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Pakora + Chai',          sub:'Vegetable fritters, chickpea flour, tea',    calories:210, protein:6,  carbs:28, fat:8,  region:'north',                         tags:['Crispy','Warming','Traditional'] },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Paneer Butter Masala + Rice',sub:'Cottage cheese, tomato gravy, butter',   calories:520, protein:20, carbs:58, fat:22, region:'north',                         tags:['Creamy','Protein-rich','Indulgent'] },
  // Day 3
  { day:2, slotType:'Breakfast',     time:'8–9 am',  dish:'Gobi Paratha + Pickle',  sub:'Cauliflower-filled flatbread, spiced',       calories:360, protein:10, carbs:52, fat:11, region:'north', state:'punjab',          tags:['Savory','Vegetables','Filling'] },
  { day:2, slotType:'Morning Snack', time:'11 am',   dish:'Moong Sprouts + Jaggery',sub:'Lightly cooked sprouts, jaggery',            calories:120, protein:8,  carbs:18, fat:1,  region:'north',                         tags:['High-protein','Iron-rich','Live food'] },
  { day:2, slotType:'Lunch',         time:'1–2 pm',  dish:'Chole Chawal + Onion',   sub:'Chickpea curry, rice, pickled onion',        calories:520, protein:16, carbs:76, fat:10, region:'north',                         tags:['Vegetarian','Fiber-rich','Complete'] },
  { day:2, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Jalebi + Warm Milk',     sub:'Fried sweet spiral, warm milk',              calories:260, protein:5,  carbs:48, fat:5,  region:'north',                         tags:['Sweet','Traditional','Indulgent'] },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Sarson da Saag + Makki Roti',sub:'Mustard greens, cornmeal flatbread',     calories:420, protein:14, carbs:54, fat:14, region:'north', state:'punjab',          tags:['Iron-rich','Seasonal','Warming'] },
  // Day 4
  { day:3, slotType:'Breakfast',     time:'8–9 am',  dish:'Mooli Paratha + Pickle', sub:'Radish-filled flatbread, cumin',             calories:340, protein:9,  carbs:50, fat:10, region:'north',                         tags:['Digestive','Vegetables','Light'] },
  { day:3, slotType:'Morning Snack', time:'11 am',   dish:'Peanut Chikki + Chai',   sub:'Brittle peanut candy, black cardamom tea',   calories:200, protein:6,  carbs:24, fat:10, region:'north', state:'rajasthan',       tags:['Crunchy','Warming','Traditional'] },
  { day:3, slotType:'Lunch',         time:'1–2 pm',  dish:'Mutton Keema + Rice',    sub:'Ground meat, tomato, ginger, garlic',        calories:560, protein:32, carbs:56, fat:18, region:'north',                         tags:['High-protein','Iron-rich','Warming'] },
  { day:3, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Chaat Mix + Jaggery',    sub:'Roasted chickpea flour, peanut, jaggery',    calories:180, protein:6,  carbs:26, fat:5,  region:'north',                         tags:['Crunchy','Iron-rich','Quick energy'] },
  { day:3, slotType:'Dinner',        time:'8–9 pm',  dish:'Chicken Curry + 2 Roti', sub:'Tomato-based chicken, wheat flatbread',      calories:480, protein:26, carbs:56, fat:14, region:'north',                         tags:['High-protein','Flavorful','Satisfying'] },
  // Day 5
  { day:4, slotType:'Breakfast',     time:'8–9 am',  dish:'Dalia + Jaggery',        sub:'Broken wheat porridge, milk, ghee',          calories:320, protein:10, carbs:48, fat:8,  region:'north',                         tags:['Warming','Soothing','Fiber-rich'] },
  { day:4, slotType:'Morning Snack', time:'11 am',   dish:'Roasted Chickpea + Chai',sub:'Spiced roasted chickpeas, warm tea',         calories:160, protein:8,  carbs:20, fat:4,  region:'north',                         tags:['Protein-rich','Crunchy','Iron-rich'] },
  { day:4, slotType:'Lunch',         time:'1–2 pm',  dish:'Kadhi Chawal + Pickle',  sub:'Yogurt-gram flour curry, rice',              calories:500, protein:15, carbs:72, fat:12, region:'north',                         tags:['Tangy','Probiotic','Comfort'] },
  { day:4, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Til Laddu + Warm Milk',  sub:'Sesame-jaggery ball, warm milk',             calories:240, protein:6,  carbs:32, fat:10, region:'north', state:'rajasthan',       tags:['Sweet','Calcium-rich','Traditional'] },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Palak Paneer + Basmati', sub:'Spinach curry, cottage cheese, cream',       calories:480, protein:18, carbs:56, fat:18, region:'north',                         tags:['Iron-rich','Calcium-rich','Green leafy'] },
  // Day 6
  { day:5, slotType:'Breakfast',     time:'8–9 am',  dish:'Poori Bhaji + Jaggery',  sub:'Fried flatbread, potato curry',              calories:420, protein:9,  carbs:62, fat:12, region:'north',                         tags:['Indulgent','Filling','Traditional'] },
  { day:5, slotType:'Morning Snack', time:'11 am',   dish:'Sesame Seeds + Jaggery', sub:'Roasted sesame, jaggery, ghee',              calories:210, protein:6,  carbs:24, fat:10, region:'north',                         tags:['Calcium-rich','Iron-rich','Warming'] },
  { day:5, slotType:'Lunch',         time:'1–2 pm',  dish:'Egg Curry + Rice',       sub:'Hard-boiled eggs, tomato gravy',             calories:520, protein:22, carbs:62, fat:16, region:'north',                         tags:['High-protein','Choline-rich','Quick'] },
  { day:5, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Besan Laddu + Chai',     sub:'Gram flour balls, jaggery, ghee, cardamom',  calories:220, protein:6,  carbs:30, fat:8,  region:'north',                         tags:['Sweet','Iron-rich','Traditional'] },
  { day:5, slotType:'Dinner',        time:'8–9 pm',  dish:'Khichdi + Ghee',         sub:'Rice, lentil, vegetables, clarified butter', calories:420, protein:13, carbs:58, fat:12, region:'north',                         tags:['Light','Easy digest','Comfort'] },
  // Day 7
  { day:6, slotType:'Breakfast',     time:'8–9 am',  dish:'Chole Bhature',          sub:'Chickpea curry, fried bread, spiced',        calories:480, protein:15, carbs:68, fat:13, region:'north', state:'punjab',          tags:['Indulgent','Protein-packed','Festive'] },
  { day:6, slotType:'Morning Snack', time:'11 am',   dish:'Til Patti + Warm Milk',  sub:'Sesame brittle, warm milk',                  calories:200, protein:5,  carbs:28, fat:8,  region:'north',                         tags:['Calcium-rich','Crunchy','Traditional'] },
  { day:6, slotType:'Lunch',         time:'1–2 pm',  dish:'Nihari + Naan',          sub:'Slow-cooked meat stew, leavened bread',      calories:580, protein:28, carbs:66, fat:18, region:'north',                         tags:['Slow-cooked','Rich','Warming'] },
  { day:6, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Gajar Halwa + Warm Milk',sub:'Carrot pudding, ghee, jaggery, milk',        calories:280, protein:6,  carbs:42, fat:9,  region:'north',                         tags:['Sweet','Vitamin A','Seasonal'] },
  { day:6, slotType:'Dinner',        time:'8–9 pm',  dish:'Dal + Phulka + Raita',   sub:'Red lentil curry, wheat roti, yogurt',       calories:420, protein:16, carbs:60, fat:9,  region:'north',                         tags:['Light','Probiotic','Balanced'] },
  // Egg dishes (shown for egg dietary; redistributed for non_veg on all-veg days)
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Anda Masala + Roti',     sub:'Egg curry, tomato, onion, garam masala',    calories:480, protein:22, carbs:54, fat:18, region:'north',                         tags:['High-protein','Egg-based','Quick'], dietaryGroup:'egg' },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Egg Bhurji + Paratha',   sub:'Scrambled eggs, onion, chili, cumin',        calories:460, protein:24, carbs:52, fat:18, region:'north',                         tags:['Quick','Egg-based','High-protein'], dietaryGroup:'egg' },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Dhaba Egg Curry + Rice', sub:'Dhaba-style egg curry, tomato base',         calories:500, protein:22, carbs:60, fat:18, region:'north',                         tags:['Dhaba style','Egg-based','Rich'], dietaryGroup:'egg' },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Egg Keema + Roti',       sub:'Minced egg, onion, ginger, coriander',       calories:490, protein:24, carbs:54, fat:20, region:'north',                         tags:['High-protein','Egg-based','Filling'], dietaryGroup:'egg' },
]

// ── East Indian Meals ─────────────────────────────────────────────────────────
export const EAST_INDIAN_MEALS: MealSlot[] = [
  // Day 1
  { day:0, slotType:'Breakfast',     time:'8–9 am',  dish:'Luchi + Aloor Dom',      sub:'Puffed bread, potato curry, mustard',        calories:420, protein:10, carbs:62, fat:12, region:'east', state:'west_bengal',     tags:['Festive','Indulgent','Traditional'] },
  { day:0, slotType:'Morning Snack', time:'11 am',   dish:'Moa',                    sub:'Flattened rice, jaggery, sesame, peanut',    calories:200, protein:5,  carbs:32, fat:6,  region:'east', state:'odisha',          tags:['Crunchy','Energy-dense','Traditional'] },
  { day:0, slotType:'Lunch',         time:'1–2 pm',  dish:'Macher Jhol + Rice',     sub:'Fish stew, potato, turmeric, light broth',   calories:510, protein:28, carbs:64, fat:12, region:'east', state:'west_bengal',     tags:['Omega-3','Light','Comforting'] },
  { day:0, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Naru',                   sub:'Rice flour, jaggery, sesame, cardamom',      calories:180, protein:3,  carbs:34, fat:4,  region:'east', state:'odisha',          tags:['Sweet','Traditional','Natural sweetness'] },
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Khichuri + Aloo Bhaja',  sub:'Rice-lentil comfort, potato chips, turmeric',calories:420, protein:13, carbs:62, fat:11, region:'east', state:'west_bengal',     tags:['Light','Easy digest','Comfort'] },
  // Day 2
  { day:1, slotType:'Breakfast',     time:'8–9 am',  dish:'Rice Dalia + Jaggery',   sub:'Rice porridge, milk, ghee, cardamom',        calories:300, protein:7,  carbs:50, fat:7,  region:'east',                         tags:['Warming','Easy digest','Soothing'] },
  { day:1, slotType:'Morning Snack', time:'11 am',   dish:'Sandesh',                sub:'Cottage cheese sweet, condensed milk',       calories:140, protein:4,  carbs:22, fat:3,  region:'east', state:'west_bengal',     tags:['Creamy','Traditional','Calcium-rich'] },
  { day:1, slotType:'Lunch',         time:'1–2 pm',  dish:'Vegetable Dal + Rice',   sub:'Lentil curry, spinach, carrot, mild spices', calories:480, protein:14, carbs:72, fat:10, region:'east',                         tags:['Vegetarian','Complete meal','Balanced'] },
  { day:1, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Mishti Doi',             sub:'Sweet yogurt, condensed milk, caramel',      calories:160, protein:5,  carbs:26, fat:3,  region:'east', state:'west_bengal',     tags:['Probiotic','Creamy','Traditional'] },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Fish Fry + Rice',        sub:'Mustard-marinated fish, fried, turmeric',    calories:520, protein:30, carbs:56, fat:16, region:'east', state:'west_bengal',     tags:['Crispy','Omega-3','Flavorful'] },
  // Day 3
  { day:2, slotType:'Breakfast',     time:'8–9 am',  dish:'Panta Bhat + Aloo Sabzi',sub:'Fermented rice, potato curry, mustard oil',  calories:380, protein:8,  carbs:58, fat:10, region:'east', state:'west_bengal',     tags:['Fermented','Probiotic','Seasonal'] },
  { day:2, slotType:'Morning Snack', time:'11 am',   dish:'Sattu Drink',            sub:'Roasted chickpea powder, jaggery, water',    calories:140, protein:6,  carbs:22, fat:1,  region:'east', state:'bihar',           tags:['High-protein','Cooling','Traditional'] },
  { day:2, slotType:'Lunch',         time:'1–2 pm',  dish:'Shukto + Rice',          sub:'Mixed vegetable curry, ginger, lime',        calories:420, protein:10, carbs:68, fat:8,  region:'east', state:'west_bengal',     tags:['Vegetarian','Bitter vegetables','Detox'] },
  { day:2, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Pitha + Jaggery',        sub:'Rice cake, jaggery filling, coconut',        calories:240, protein:4,  carbs:42, fat:6,  region:'east', state:'odisha',          tags:['Steamed','Traditional','Seasonal'] },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Panchphoron Fish + Rice', sub:'Five-spice fish, coconut milk, turmeric',   calories:530, protein:28, carbs:62, fat:14, region:'east', state:'odisha',          tags:['Aromatic','Omega-3','Traditional'] },
  // Day 4
  { day:3, slotType:'Breakfast',     time:'8–9 am',  dish:'Poha + Groundnuts',      sub:'Flattened rice, semolina, vegetables',       calories:310, protein:8,  carbs:52, fat:7,  region:'east',                         tags:['Quick','Light','Satisfying'] },
  { day:3, slotType:'Morning Snack', time:'11 am',   dish:'Murmura + Jaggery',      sub:'Puffed rice, jaggery, peanut, sesame',       calories:160, protein:4,  carbs:28, fat:4,  region:'east',                         tags:['Crunchy','Light','Airy'] },
  { day:3, slotType:'Lunch',         time:'1–2 pm',  dish:'Mustard Fish Curry + Rice',sub:'Fish, mustard paste, turmeric, coriander', calories:520, protein:30, carbs:60, fat:14, region:'east', state:'west_bengal',     tags:['Tangy','Omega-3','Traditional'] },
  { day:3, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Jaggery + Sesame + Milk',sub:'Jaggery, roasted sesame, warm milk',         calories:210, protein:5,  carbs:30, fat:8,  region:'east',                         tags:['Warming','Calcium-rich','Iron-rich'] },
  { day:3, slotType:'Dinner',        time:'8–9 pm',  dish:'Dal + Rice + Sabzi',     sub:'Lentil curry, spinach or fenugreek, ghee',   calories:420, protein:14, carbs:64, fat:9,  region:'east',                         tags:['Iron-rich','Folate-rich','Light'] },
  // Day 5
  { day:4, slotType:'Breakfast',     time:'8–9 am',  dish:'Luchi + Chhana Sabzi',   sub:'Puffed bread, cottage cheese curry',         calories:400, protein:11, carbs:58, fat:13, region:'east', state:'west_bengal',     tags:['Festive','Protein-rich','Indulgent'] },
  { day:4, slotType:'Morning Snack', time:'11 am',   dish:'Chhena Poda Crumble',    sub:'Baked cottage cheese, jaggery, cardamom',    calories:180, protein:6,  carbs:26, fat:5,  region:'east', state:'odisha',          tags:['Calcium-rich','Baked','Traditional'] },
  { day:4, slotType:'Lunch',         time:'1–2 pm',  dish:'Chholar Dal + Rice',     sub:'Roasted gram lentil, rice, lime pickle',     calories:490, protein:16, carbs:74, fat:9,  region:'east', state:'west_bengal',     tags:['Unique lentil','Complete meal','Tangy'] },
  { day:4, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Rasgulla',               sub:'Cottage cheese ball, sugar syrup',           calories:150, protein:3,  carbs:28, fat:2,  region:'east', state:'odisha',          tags:['Sweet','Soft','Traditional'] },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Jhinga Malai + Rice',    sub:'Shrimp, coconut cream, ginger, turmeric',    calories:510, protein:26, carbs:58, fat:16, region:'east', state:'west_bengal',     tags:['Creamy','Omega-3','Protein-rich'] },
  // Day 6
  { day:5, slotType:'Breakfast',     time:'8–9 am',  dish:'Chira + Jaggery + Banana',sub:'Flattened rice, jaggery, banana',           calories:320, protein:5,  carbs:58, fat:5,  region:'east', state:'odisha',          tags:['Quick','Light','Easy digest'] },
  { day:5, slotType:'Morning Snack', time:'11 am',   dish:'Sandesh (Flavoured)',     sub:'Cottage cheese sweet, rose water',          calories:150, protein:4,  carbs:24, fat:2,  region:'east', state:'west_bengal',     tags:['Sweet','Soft','Iconic'] },
  { day:5, slotType:'Lunch',         time:'1–2 pm',  dish:'Sarson Fish + Rice',     sub:'Fish with mustard leaves, turmeric',         calories:520, protein:30, carbs:60, fat:14, region:'east', state:'west_bengal',     tags:['Aromatic','Omega-3','Iron-rich'] },
  { day:5, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Til Laddu + Warm Milk',  sub:'Sesame balls, jaggery, warm milk',           calories:220, protein:6,  carbs:30, fat:9,  region:'east',                         tags:['Calcium-rich','Traditional','Warming'] },
  { day:5, slotType:'Dinner',        time:'8–9 pm',  dish:'Lobia Dal + Rice',       sub:'Black-eyed bean curry, turmeric, ghee',      calories:450, protein:14, carbs:68, fat:10, region:'east',                         tags:['Fiber-rich','Plant-based','Complete'] },
  // Day 7
  { day:6, slotType:'Breakfast',     time:'8–9 am',  dish:'Rice Flakes + Jaggery',  sub:'Rice flakes, jaggery, milk, cardamom',       calories:300, protein:6,  carbs:54, fat:5,  region:'east',                         tags:['Light','Easy digest','Comforting'] },
  { day:6, slotType:'Morning Snack', time:'11 am',   dish:'Rosogolla',              sub:'Cottage cheese, sugar syrup, rose water',    calories:160, protein:3,  carbs:30, fat:2,  region:'east', state:'west_bengal',     tags:['Sweet','Creamy','Iconic'] },
  { day:6, slotType:'Lunch',         time:'1–2 pm',  dish:'Chingri Malai + Rice',   sub:'Shrimp, coconut milk, green chili, ginger',  calories:540, protein:28, carbs:62, fat:16, region:'east', state:'west_bengal',     tags:['Creamy','Omega-3','Special occasion'] },
  { day:6, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Kheer',                  sub:'Rice, milk, jaggery, cardamom, nutmeg',      calories:240, protein:6,  carbs:40, fat:6,  region:'east',                         tags:['Creamy','Comforting','Traditional'] },
  { day:6, slotType:'Dinner',        time:'8–9 pm',  dish:'Bhetki Fish Curry + Rice',sub:'Bhetki fish, tomato gravy, curry leaves',   calories:530, protein:32, carbs:58, fat:14, region:'east', state:'west_bengal',     tags:['Premium fish','Omega-3','Festive'] },
  // Egg dishes (Bengali/Odia egg preparations for egg dietary users)
  { day:0, slotType:'Lunch',         time:'1–2 pm',  dish:'Dimer Dalna + Rice',     sub:'Bengali egg curry, potato, tomato, spices', calories:490, protein:22, carbs:62, fat:16, region:'east', state:'west_bengal',     tags:['Egg-based','High-protein','Comfort'], dietaryGroup:'egg' },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Dimer Jhol + Rice',      sub:'Light egg curry, turmeric, coriander',       calories:470, protein:20, carbs:60, fat:15, region:'east', state:'west_bengal',     tags:['Egg-based','Light','Traditional'], dietaryGroup:'egg' },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Omelette Roll + Rice',   sub:'Egg roll, onion, green chili, coriander',    calories:430, protein:18, carbs:52, fat:16, region:'east',                         tags:['Egg-based','Street style','Quick'], dietaryGroup:'egg' },
  { day:3, slotType:'Lunch',         time:'1–2 pm',  dish:'Anda Kosha + Rice',      sub:'Thick egg gravy, garam masala, ginger',      calories:510, protein:22, carbs:64, fat:18, region:'east', state:'west_bengal',     tags:['Egg-based','Rich','Hearty'], dietaryGroup:'egg' },
  { day:4, slotType:'Lunch',         time:'1–2 pm',  dish:'Dimer Curry + Roti',     sub:'Egg curry, potatoes, green chili, cumin',    calories:480, protein:22, carbs:56, fat:18, region:'east', state:'odisha',          tags:['Egg-based','Homestyle','Protein-rich'], dietaryGroup:'egg' },
  { day:5, slotType:'Lunch',         time:'1–2 pm',  dish:'Egg Bhapa + Rice',       sub:'Steamed egg, mustard paste, coconut milk',   calories:450, protein:20, carbs:58, fat:16, region:'east', state:'west_bengal',     tags:['Egg-based','Steamed','Aromatic'], dietaryGroup:'egg' },
  { day:6, slotType:'Lunch',         time:'1–2 pm',  dish:'Dimer Bhurji + Paratha', sub:'Bengali egg scramble, onion, turmeric',      calories:460, protein:22, carbs:54, fat:18, region:'east', state:'west_bengal',     tags:['Egg-based','Quick','Traditional'], dietaryGroup:'egg' },
]

// ── West Indian Meals ─────────────────────────────────────────────────────────
export const WEST_INDIAN_MEALS: MealSlot[] = [
  // Day 1
  { day:0, slotType:'Breakfast',     time:'8–9 am',  dish:'Poha + Sev',             sub:'Flattened rice, peanuts, mustard seeds',     calories:285, protein:7,  carbs:48, fat:6,  region:'west', state:'maharashtra',     tags:['Quick breakfast','Light','Iron-fortified'] },
  { day:0, slotType:'Morning Snack', time:'11 am',   dish:'Dhokla + Chutney',       sub:'Steamed gram flour cake, green chutney',     calories:180, protein:7,  carbs:36, fat:2,  region:'west', state:'gujarat',         tags:['Fermented','High-protein','Light'] },
  { day:0, slotType:'Lunch',         time:'1–2 pm',  dish:'Kolhapuri Mutton + Rice', sub:'Spicy goat curry, red rice, coconut',       calories:580, protein:35, carbs:58, fat:16, region:'west', state:'maharashtra',     tags:['High-protein','Iron-rich','Regional classic'] },
  { day:0, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Batata Vada + Chai',     sub:'Spiced potato fritter, cardamom tea',        calories:215, protein:4,  carbs:36, fat:7,  region:'west', state:'maharashtra',     tags:['Snack classic','Indulgent','Street food'] },
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Sol Kadhi + Rice Thali', sub:'Coconut-turmeric, fish thali, roti',         calories:520, protein:28, carbs:62, fat:12, region:'west', state:'goa',             tags:['Coastal specialty','Omega-3','Digestive'] },
  // Day 2
  { day:1, slotType:'Breakfast',     time:'8–9 am',  dish:'Sabudana Khichdi',       sub:'Sago, peanuts, potatoes, cumin',             calories:310, protein:6,  carbs:55, fat:7,  region:'west', state:'maharashtra',     tags:['Fasting friendly','Light','Carbs'] },
  { day:1, slotType:'Morning Snack', time:'11 am',   dish:'Khaman + Tamarind',      sub:'Gram flour sponge, tangy chutney',           calories:170, protein:6,  carbs:34, fat:2,  region:'west', state:'gujarat',         tags:['Protein-rich','Tangy','Light'] },
  { day:1, slotType:'Lunch',         time:'1–2 pm',  dish:'Undhiyu + Rice',         sub:'Mixed vegetables, turmeric, cumin',          calories:420, protein:10, carbs:68, fat:10, region:'west', state:'gujarat',         tags:['Vegetable-rich','Seasonal festive','Winter special'] },
  { day:1, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Pav Bhaji',              sub:'Spiced vegetable mash, butter bread',        calories:420, protein:11, carbs:58, fat:13, region:'west', state:'maharashtra',     tags:['Street favorite','Indulgent','Savory'] },
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Pitla + Bhakri',         sub:'Gram flour pudding, jowar flatbread',        calories:485, protein:14, carbs:72, fat:9,  region:'west', state:'maharashtra',     tags:['Traditional','Millet','High-fiber'] },
  // Day 3
  { day:2, slotType:'Breakfast',     time:'8–9 am',  dish:'Kande Pohe',             sub:'Flattened rice, onions, turmeric, peanuts',  calories:295, protein:8,  carbs:50, fat:6,  region:'west', state:'maharashtra',     tags:['Quick','Aromatic','Iron-rich'] },
  { day:2, slotType:'Morning Snack', time:'11 am',   dish:'Muthia + Yogurt',        sub:'Steamed gram dumpling, tangy yogurt',        calories:160, protein:7,  carbs:29, fat:2,  region:'west', state:'gujarat',         tags:['Protein-packed','Light','Cooling'] },
  { day:2, slotType:'Lunch',         time:'1–2 pm',  dish:'Goan Fish Curry + Rice', sub:'Coconut-turmeric, pomfret, red rice',        calories:540, protein:32, carbs:56, fat:14, region:'west', state:'goa',             tags:['Omega-3','Coastal','DHA-rich'] },
  { day:2, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Thalipeeth + Curd',      sub:'Multigrain flatbread, spiced chickpea',      calories:320, protein:10, carbs:48, fat:8,  region:'west', state:'maharashtra',     tags:['Whole-grain','Protein boost','Satisfying'] },
  { day:2, slotType:'Dinner',        time:'8–9 pm',  dish:'Dal Dhokli',             sub:'Lentil soup with gram flour dough',          calories:420, protein:14, carbs:65, fat:8,  region:'west', state:'gujarat',         tags:['Complete protein','Warming','Seasonal'] },
  // Day 4
  { day:3, slotType:'Breakfast',     time:'8–9 am',  dish:'Thepla + Pickle',        sub:'Fenugreek flatbread, mango pickle',          calories:280, protein:8,  carbs:46, fat:6,  region:'west', state:'gujarat',         tags:['Portable','Aromatic','High-fiber'] },
  { day:3, slotType:'Morning Snack', time:'11 am',   dish:'Methi Thepla + Lassi',   sub:'Fenugreek bread, sweet yogurt drink',        calories:175, protein:6,  carbs:33, fat:3,  region:'west', state:'gujarat',         tags:['Probiotic','Calcium-rich','Digestion'] },
  { day:3, slotType:'Lunch',         time:'1–2 pm',  dish:'Chicken Xacuti + Rice',  sub:'Spiced coconut chicken, roasted spices',     calories:560, protein:36, carbs:54, fat:15, region:'west', state:'goa',             tags:['High-protein','Aromatic','Goan spice'] },
  { day:3, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Khandvi + Pickle',       sub:'Gram flour rolls, mustard-curry leaf',       calories:155, protein:6,  carbs:24, fat:3,  region:'west', state:'gujarat',         tags:['Protein-rich','Tangy','Light'] },
  { day:3, slotType:'Dinner',        time:'8–9 pm',  dish:'Handvo + Chutneys',      sub:'Savory vegetable cake, tamarind-mint',       calories:410, protein:12, carbs:62, fat:10, region:'west', state:'gujarat',         tags:['Complete meal','Vegetable-rich','Balanced'] },
  // Day 5
  { day:4, slotType:'Breakfast',     time:'8–9 am',  dish:'Misal Pav',              sub:'Spiced sprouts curry, bread roll',           calories:380, protein:13, carbs:54, fat:10, region:'west', state:'maharashtra',     tags:['High-protein','Iron-rich','Street classic'] },
  { day:4, slotType:'Morning Snack', time:'11 am',   dish:'Fafda + Jalebi',         sub:'Gram flour crisp, sweet spiral',             calories:340, protein:8,  carbs:58, fat:8,  region:'west', state:'gujarat',         tags:['Festive','Sweet-savory','Indulgent'] },
  { day:4, slotType:'Lunch',         time:'1–2 pm',  dish:'Prawn Balchao + Rice',   sub:'Goan spiced prawns, tangy paste',            calories:480, protein:34, carbs:52, fat:11, region:'west', state:'goa',             tags:['Seafood specialty','High-protein','Tangy'] },
  { day:4, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Vada Pav',               sub:'Spiced potato dumpling, bread roll',         calories:390, protein:9,  carbs:58, fat:11, region:'west', state:'maharashtra',     tags:['Street food favorite','Savory','Comfort'] },
  { day:4, slotType:'Dinner',        time:'8–9 pm',  dish:'Shrikhand + Puri',       sub:'Strained yogurt, saffron-cardamom',          calories:520, protein:12, carbs:66, fat:18, region:'west', state:'maharashtra',     tags:['Yogurt-based','Festive','Sweet-savory'] },
  // Day 6
  { day:5, slotType:'Breakfast',     time:'8–9 am',  dish:'Puran Poli',             sub:'Sweet lentil-filled flatbread, cardamom',    calories:380, protein:9,  carbs:66, fat:8,  region:'west', state:'maharashtra',     tags:['Festive','Sweet','Traditional'] },
  { day:5, slotType:'Morning Snack', time:'11 am',   dish:'Sev Usal + Bajra Roti',  sub:'Gram flour noodle curry, millet bread',      calories:290, protein:8,  carbs:48, fat:7,  region:'west', state:'maharashtra',     tags:['Millet','High-fiber','Warming'] },
  { day:5, slotType:'Lunch',         time:'1–2 pm',  dish:'Cafreal Chicken + Rice', sub:'Goan herb-marinated chicken, spiced',        calories:550, protein:38, carbs:54, fat:12, region:'west', state:'goa',             tags:['High-protein','Herbal spices','Coastal'] },
  { day:5, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Kachori + Lassi',        sub:'Spiced pastry, sweetened yogurt',            calories:295, protein:8,  carbs:44, fat:8,  region:'west', state:'maharashtra',     tags:['Indulgent snack','Crispy','Savory-sweet'] },
  { day:5, slotType:'Dinner',        time:'8–9 pm',  dish:'Bharleli Vangi + Roti',  sub:'Stuffed baby brinjal, peanut-coconut',       calories:390, protein:10, carbs:54, fat:14, region:'west', state:'maharashtra',     tags:['Vegetarian','Aromatic','Satisfying'] },
  // Day 7
  { day:6, slotType:'Breakfast',     time:'8–9 am',  dish:'Ukdiche Modak',          sub:'Steamed rice-lentil dumpling, coconut',      calories:240, protein:4,  carbs:52, fat:3,  region:'west', state:'maharashtra',     tags:['Festive sweet','Light','Fasting-friendly'] },
  { day:6, slotType:'Morning Snack', time:'11 am',   dish:'Patra + Tamarind Chutney',sub:'Colocasia roll, besan, turmeric, tangy',    calories:185, protein:5,  carbs:32, fat:4,  region:'west', state:'gujarat',         tags:['Unique snack','Tangy','Light'] },
  { day:6, slotType:'Lunch',         time:'1–2 pm',  dish:'Goan Prawn Curry + Rice', sub:'Coconut prawn curry, red chili, turmeric',  calories:510, protein:30, carbs:58, fat:14, region:'west', state:'goa',             tags:['Omega-3','Creamy coconut','Protein-rich'] },
  { day:6, slotType:'Chai Snack',    time:'4–5 pm',  dish:'Modak + Warm Milk',      sub:'Rice-jaggery sweet, warm milk',              calories:250, protein:5,  carbs:48, fat:4,  region:'west', state:'maharashtra',     tags:['Sweet treat','Traditional','Festive'] },
  { day:6, slotType:'Dinner',        time:'8–9 pm',  dish:'Zunka + Bhakri',         sub:'Dry besan curry, jowar/bajra flatbread',     calories:430, protein:13, carbs:60, fat:12, region:'west', state:'maharashtra',     tags:['Traditional','Millet','Protein boost'] },
  // Egg dishes for egg dietary users + non_veg redistribution on day 1 (all-veg)
  { day:1, slotType:'Dinner',        time:'8–9 pm',  dish:'Egg Bhurji + Pav',       sub:'Scrambled eggs, onion, chili, Mumbai style', calories:440, protein:22, carbs:50, fat:18, region:'west', state:'maharashtra',     tags:['Egg-based','Street food','High-protein'], dietaryGroup:'egg' },
  { day:0, slotType:'Dinner',        time:'8–9 pm',  dish:'Anda Gassi + Rice',      sub:'Coastal egg curry, coconut, tamarind',       calories:490, protein:22, carbs:60, fat:17, region:'west', state:'goa',             tags:['Egg-based','Coastal style','Protein-rich'], dietaryGroup:'egg' },
  { day:3, slotType:'Dinner',        time:'8–9 pm',  dish:'Egg Keema Pav',          sub:'Egg mince, onion, Kolhapuri spices, bread',  calories:470, protein:24, carbs:52, fat:18, region:'west', state:'maharashtra',     tags:['Egg-based','Spicy','Filling'], dietaryGroup:'egg' },
  { day:5, slotType:'Dinner',        time:'8–9 pm',  dish:'Omelette + Bhakri',      sub:'Egg omelette, jowar flatbread, coriander',   calories:420, protein:20, carbs:48, fat:16, region:'west', state:'maharashtra',     tags:['Egg-based','Millet','Quick'], dietaryGroup:'egg' },
]

const NON_VEG_KEYWORDS = [
  'fish', 'mutton', 'chicken', 'prawn', 'shrimp', 'egg', 'macher',
  'jhinga', 'chingri', 'bhetki', 'xacuti', 'cafreal', 'balchao',
  'keema', 'nihari', 'kolhapuri mutton', 'surmai', 'seafood',
]

export function isNonVeg(meal: MealSlot): boolean {
  const text = (meal.dish + ' ' + meal.sub + ' ' + meal.tags.join(' ')).toLowerCase()
  return NON_VEG_KEYWORDS.some(k => text.includes(k))
}

export function getMealsForProfile(
  region: string,
  state?: string | null,
  dietary?: string | null,
): MealSlot[] {
  const pool: Record<string, MealSlot[]> = {
    south: SOUTH_INDIAN_MEALS,
    north: NORTH_INDIAN_MEALS,
    east:  EAST_INDIAN_MEALS,
    west:  WEST_INDIAN_MEALS,
  }
  let base = [...(pool[region] ?? NORTH_INDIAN_MEALS)]

  // Filter by dietary preference
  if (dietary === 'veg' || dietary === 'jain' || dietary === 'satvik') {
    // Remove all non-veg (fish, meat, eggs)
    base = base.filter(m => !isNonVeg(m) && !m.dietaryGroup)
  } else if (dietary === 'egg') {
    // Keep veg meals + egg-tagged meals; remove fish/meat
    base = base.filter(m => !m.dietaryGroup ? !isNonVeg(m) : m.dietaryGroup === 'egg')
  } else if (dietary === 'non_veg') {
    // Remove egg-tagged meals (non_veg users prefer fish/meat over egg dishes)
    // then ensure every day has at least 1 non-veg meal at dinner
    base = base.filter(m => !m.dietaryGroup)
    const nonVegPool = base.filter(m => isNonVeg(m))
    if (nonVegPool.length > 0) {
      let nvIdx = 0
      const result: MealSlot[] = []
      for (let d = 0; d <= 6; d++) {
        const daySlots = base.filter(m => m.day === d)
        if (daySlots.some(m => isNonVeg(m))) {
          result.push(...daySlots)
        } else {
          // Replace dinner slot with next non-veg meal from pool (rotating)
          const donor = nonVegPool[nvIdx % nonVegPool.length]
          nvIdx++
          result.push(
            ...daySlots.filter(m => m.slotType !== 'Dinner'),
            { ...donor, day: d, slotType: 'Dinner', time: '8–9 pm' },
          )
        }
      }
      base = result
    }
  } else {
    // No dietary filter — remove egg-specific dishes (they'd create duplicate slots)
    base = base.filter(m => !m.dietaryGroup)
  }

  // State-preference: bubble state-matching meals to front of each day slot
  if (state) {
    const stateId = state.toLowerCase()
    const withState = base.filter(m => m.state === stateId)
    const without   = base.filter(m => m.state !== stateId)
    base = [...withState, ...without]
  }

  return base
}
