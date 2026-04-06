# India Eats — Implementation Plan
> **Rename candidates** — pick a name before creating the GitHub repo (see App Name Candidates section)

**Product:** Nutrition & diet platform tailored for Indian users
**Segments:** General users, Pre-delivery (pregnant) women, Post-delivery women
**Goal:** Become the go-to Indian nutrition app that actually understands Indian food culture, portions, and life stages

---


## Phase 0: Foundation (Week 1–2)

### 0.1 Project Setup
- [ ] Initialize git repo, configure CI/CD (GitHub Actions)
- [ ] Choose stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- [ ] Database: PostgreSQL (Supabase) — auth, user profiles, meal data
- [ ] ORM: Prisma
- [ ] Auth: Supabase Auth (email + Google OAuth)
- [ ] Deploy target: Vercel

### 0.2 Design System
- [ ] Define color palette (warm saffron/turmeric tones, clean whites)
- [ ] Typography: Inter (UI) + a regional-friendly font for Hindi support
- [ ] Component library: shadcn/ui base + custom Indian-context components
- [ ] Mobile-first layout (80%+ Indian users on mobile)

### 0.3 Data Foundation
- [ ] Indian food nutrition database (IFCT 2017 as base — Indian Food Composition Tables)
- [ ] Portion size schema: dual-unit — store in grams internally, display in user's chosen unit
  - Katori mode: katori, vati, ladle, piece, tbsp, tsp
  - Metric mode: grams, ml
  - User sets preference in onboarding, can toggle anytime per log entry
- [ ] Regional cuisine taxonomy: North, South, East, West, Street Food, Festival
- [ ] Spice database with health properties (turmeric, cumin, fenugreek, ajwain, etc.)
- [ ] Portion visual reference library: photos of actual katori/bowl sizes with gram equivalents

---

## Phase 1: Core Platform (Week 3–6)

### 1.1 User Onboarding
- [ ] Segment selector: General / Pregnant / Post-delivery
- [ ] State/region picker → sets default cuisine style
- [ ] Age, weight, height input (metric + Indian-context reference)
- [ ] Dietary preference: Veg / Egg / Non-veg / Jain / Satvik
- [ ] Fasting preferences: None / Ekadashi / Navratri / Ramzan / Custom
- [ ] Language preference: English / Hindi (v1), expand to Tamil, Telugu, Bengali (v2)
- [ ] Ayurvedic Prakriti quiz (10 questions → Vata/Pitta/Kapha) → influences recommendations

### 1.2 Core Meal Plan Engine
- [ ] Daily meal plan generator (Breakfast / Morning snack / Lunch / Evening chai + snack / Dinner)
- [ ] Indian meal timing model: breakfast 8–9am, lunch 1–2pm, chai 4–5pm, dinner 8–10pm
- [ ] Nutritional targets: calories, protein, carbs, fat, fiber, iron, calcium, folate
- [ ] Macro display in user's chosen unit (katori mode OR gram mode — user decides, toggleable per entry)
- [ ] Fasting mode: swap regular meals with fasting-approved alternatives (sabudana, singhara, sama rice)
- [ ] Festival mode: region-aware festival recipe injection with nutritional analysis

**Meal Swap Engine** (core UX feature)
- [ ] Every suggested meal shows a "Don't want this?" button
- [ ] Swap options offered in two tabs:
  - **Similar nutrition** — same calorie range (±10%), same dominant macro (e.g. high-protein, iron-rich), different dish
  - **Same meal type** — same category (e.g. dal-based, rice dish, flatbread) but different recipe
- [ ] Swaps respect all user constraints: dietary pref, region, fasting mode, ingredient dislikes
- [ ] "Already ate this today/this week" auto-excludes recently logged dishes from swap pool
- [ ] Swap history remembered — won't re-suggest rejected meals for 7 days
- [ ] One-tap swap: show 3 alternatives max (not a long scroll — pick fast and move on)

### 1.3 Recipe Database (MVP: 200 recipes)
- [ ] 50 everyday recipes (dal, sabzi, roti, rice dishes)
- [ ] 30 breakfast recipes (idli, poha, paratha, upma, dosa variants)
- [ ] 20 snack recipes (chivda, roasted makhana, sprouts chaat)
- [ ] 30 regional specials (chole, sambar, fish curry, mustard greens)
- [ ] 20 festival recipes (with healthier swaps noted)
- [ ] 30 pregnancy/postpartum recipes (methi ladoo, gondh ladoo, sattu, moringa dal)
- [ ] 20 smoothies/drinks (aam panna, sattu sharbat, haldi doodh)

Each recipe includes:
- Ingredients in dual units (grams + katori/piece/tbsp) — displayed in user's preference
- Nutritional breakdown per serving
- Regional variants (Punjabi vs South Indian style)
- Prep time, difficulty
- Budget tier (everyday / moderate / premium)
- Health tags (iron-rich, calcium-rich, high-protein, low-GI, etc.)
- "Similar recipes" links — used by Meal Swap Engine
- Short recipe video (15–30 sec reel, v2)

### 1.4 Food Logger
- [ ] Search Indian foods by name (supports Hindi/regional transliteration)
- [ ] Barcode scanner for packaged Indian foods (Parle-G, MTR, ITC, etc.)
- [ ] Quick-add frequently eaten meals
- [ ] Voice logging in Hindi — "ek katori dal aur do roti khaaya" → parsed and logged
- [ ] Photo logging — point camera at thali, AI identifies components + estimates portions (v2)
- [ ] Restaurant mode: common chain dishes (Haldiram's, MTR, McDonald's India, Domino's India)
- [ ] Dhaba mode: estimate calories from generic dhaba-style dishes
- [ ] Street food mode: pani puri, vada pav, bhel puri, samosa — with portion size visuals
- [ ] Swiggy/Zomato order detection: paste order link → auto-log nutrition (v2)
- [ ] Per-entry unit toggle: log in grams OR katori — whichever is easier in that moment

---

## Phase 2: Segment-Specific Features (Week 7–10)

### 2.1 General Users

**Thali Builder**
- [ ] Interactive plate — drag ingredients onto a thali
- [ ] Real-time macro display as items are added (in user's unit preference)
- [ ] Balance score (protein/carb/vegetable ratio)
- [ ] Save as custom meal template
- [ ] "Make it healthier" button — suggests ingredient swaps on existing thali

**Seasonal Ingredient Calendar**
- [ ] Month-by-month seasonal produce by Indian region
- [ ] "In season now" badge on recipes
- [ ] Seasonal meal plan suggestions

**Cook Time Mode**
- [ ] "I have 15 minutes" / "30 minutes" / "No rush" filter
- [ ] Batch cooking planner: cook once, suggests what covers 2–3 days
- [ ] One-pot meal mode for busy weeknights
- [ ] Tiffin box planner: balanced lunch box with variety across the week

**Oil & Spice Advisor**
- [ ] Oil comparison tool (mustard, coconut, groundnut, ghee, sunflower) by smoke point, region, dish type
- [ ] Daily spice intake tracker with health benefits
- [ ] "Healthier swap" suggestions (less oil, different cooking method)

**Water & Hydration Tracker**
- [ ] Daily water goal (adjusted for climate zone + season)
- [ ] Reminders tied to Indian routines: post-waking, pre-meal, post-exercise
- [ ] Count hydrating foods (lassi, nimbu pani, cucumber, watermelon)

**Millet Tracker**
- [ ] Weekly millet intake goal (India's Millet Mission push)
- [ ] Millet variety explorer: jowar, bajra, ragi, foxtail, barnyard
- [ ] "Replace your rice/wheat today" prompt with millet equivalent recipe

**Budget Mode**
- [ ] Toggle: Budget / Moderate / Premium
- [ ] Price estimates per meal (INR) — city-adjusted (Mumbai vs tier-2 city)
- [ ] Grocery list generator with BigBasket/Blinkit deep links

**Family & Household Mode**
- [ ] Up to 4 profiles per household (partner, elders, kids)
- [ ] Each member has their own goals, dietary prefs, restrictions
- [ ] "What to cook tonight" — single meal that satisfies all profiles (with variants noted)
- [ ] Household grocery list — aggregated across all profiles
- [ ] Elder nutrition profile: specific for 60+ (bone health, diabetes, heart health, low-sodium)

**Gamification**
- [ ] Daily nutrition streak
- [ ] "Eat the rainbow" daily challenge — log all 5 colour groups
- [ ] Millet badge (7 days of millet in a week)
- [ ] Regional recipe explorer badge (try 5 dishes from a different region)
- [ ] Weekly challenge: "No refined sugar", "Traditional breakfast", "Millet week"

**Offline Mode**
- [ ] Core logging + meal plans work offline (India's patchy connectivity)
- [ ] Sync when back online
- [ ] Cached recipe library available without internet

### 2.2 Pre-Delivery (Pregnant Women)

**Trimester Dashboard**
- [ ] Week-by-week pregnancy tracker
- [ ] Nutritional needs by trimester (T1: folate/B12, T2: iron/protein, T3: calcium/omega-3)
- [ ] Visual: what baby needs this week → what food provides it
- [ ] Weight gain curve (Indian BMI-adjusted reference, not Western)

**Foods to Avoid — Indian Context**
- [ ] Comprehensive avoid list with Indian foods specifically called out:
  - Raw papaya, unripe pineapple
  - Unpasteurized paneer/chhena
  - Excess vitamin A (liver, cod liver oil)
  - High-mercury fish (king mackerel, shark)
  - Raw sprouts in chaat
  - Excess fenugreek (methi) in first trimester
- [ ] Myth vs fact section: "My mother-in-law said..." — papaya myth, ghee for delivery, etc.

**Nausea-Friendly Indian Snacks**
- [ ] Filter: Easy on stomach / No strong smells / Cold options
- [ ] Recommendations: plain poha, jeera water, saunf, nimbu pani, dry toast with ghee
- [ ] Morning sickness log → pattern detection → personalized suggestions

**Gestational Diabetes Meal Planner**
- [ ] GI (Glycemic Index) database for Indian staples
- [ ] Rice alternatives: brown rice, millets (jowar, bajra, ragi), cauliflower rice
- [ ] Safe sweet options: dates (limited), fresh fruit, raita
- [ ] Blood sugar log with food correlation

**Supplement Tracker**
- [ ] Track doctor-prescribed supplements (folic acid, iron, calcium, D3)
- [ ] Food sources for each supplement highlighted in meal plans
- [ ] Iron absorption tips: avoid tea/coffee with meals, pair with vitamin C

### 2.3 Post-Delivery Women

**40-Day Confinement Diet**
- [ ] Region-specific confinement meal plans:
  - North Indian: Ajwain paratha, dry fruits halwa, panjiri, methi ladoo
  - South Indian: Drumstick soup, ragi porridge, pepper rasam, til rice
  - Bengali: Posto (poppy seeds), shukto, light fish curry
  - Gujarati: Gondh ladoo, bajra rotla, lehsun chutney
- [ ] C-section vs normal delivery — different reintroduction timelines
- [ ] Day-by-day food progression (day 1–5 liquid/soft, day 6–15 semi-solid, day 16+ normal)

**Lactation Booster Recipes**
- [ ] Dedicated recipe category: methi ladoo, gondh ladoo, sattu, moringa dal, drumstick leaves dal, fenugreek tea
- [ ] Galactagogue ingredient tracker (foods that boost milk supply)
- [ ] Hydration tracker — 3L/day minimum for breastfeeding

**Breastfeeding Nutrition Calculator**
- [ ] Extra calorie needs: +500 kcal/day baseline
- [ ] Nutrition transferred to baby through milk → highlight calcium, DHA, Vit D
- [ ] Foods that may cause baby discomfort (gas, allergy) — log and track correlation
- [ ] Gradual reintroduction of spices tracker

**Postpartum Recovery Tracker**
- [ ] Iron recovery timeline after delivery blood loss
- [ ] Bone density — calcium + Vit D food tracker
- [ ] Energy level journal (sleep hours + meal quality → energy correlation)
- [ ] One-hand snack recommendations for feeding sessions (makhana, dry fruits, banana, energy balls)

**Mental Wellbeing**
- [ ] Mood + energy + sleep log
- [ ] Foods linked to serotonin/dopamine: dark chocolate, banana, nuts, curd
- [ ] PPD awareness: flag persistent low mood → suggest consulting doctor
- [ ] Partner cooking guide: 5 simple nutritious recipes for the partner to make

---

## Phase 3: Intelligence & Personalization (Week 11–14)

### 3.1 Personalization Engine
- [ ] User taste profile (learned from ratings + food logs + swaps)
- [ ] Swap pattern learning — if user swaps dal repeatedly, deprioritize it going forward
- [ ] Regional preference weighting
- [ ] "People like you" filtering — same region, life stage, dietary restrictions
- [ ] Negative preferences (disliked ingredients, intolerances) respected across all suggestions
- [ ] Condition-based profiles: PCOS, thyroid, hypertension, Type 2 diabetes → adjusted meal logic

### 3.2 Smart Recommendations
- [ ] Weekly meal plan auto-generation based on profile
- [ ] "What's missing this week" — highlight nutrient gaps
- [ ] Seasonal freshness score — penalize out-of-season ingredients
- [ ] Recipe substitution engine: missing ingredient → nearest equivalent with nutritional note
- [ ] Sleep + digestion journal: heavy dinner last night → lighter breakfast suggestion
- [ ] Mood-food correlation: low energy days → flag what was eaten, suggest improvements
- [ ] Medication-food interactions: thyroid + soya conflict, BP meds + banana, warfarin + green veg

### 3.3 Myth-Busting Content Engine
- [ ] Database of common Indian food myths with evidence-based rebuttals
- [ ] Shareable myth-bust cards (WhatsApp-optimized 1080×1080 format)
- [ ] "Doctor said vs research says" fact-check feature
- [ ] "Ask a Dietitian" integration — connect to verified Indian nutritionists (v2)

### 3.4 Condition-Specific Tracks
- [ ] **PCOS track** — low-GI, anti-inflammatory, hormone-balancing Indian foods; avoid refined carbs
- [ ] **Diabetes track** — GI-indexed meal plans, millet-forward, portion control for rice/roti
- [ ] **Hypertension track** — low-sodium Indian cooking tips, DASH-aligned Indian meals
- [ ] **Thyroid track** — iodine-rich foods, avoid raw goitrogens (cabbage, cauliflower raw), soya warnings
- [ ] **Post-surgery / recovery track** — soft diet progression, protein-rich healing foods

---

## Phase 4: Community & Integrations (Week 15–18)

### 4.1 Community Features
- [ ] Recipe sharing with regional tags
- [ ] "Tried this recipe" reviews — sorted by region and life stage
- [ ] Q&A forum — moderated, with dietitian answers highlighted
- [ ] Weekly challenges: "Millet week", "No refined sugar week", "Traditional breakfast week"

### 4.2 Integrations
- [ ] **Grocery**: BigBasket API + Blinkit deep links from ingredient lists
- [ ] **WhatsApp**: Daily meal reminder + recipe card via WhatsApp Business API; beautiful shareable meal cards
- [ ] **Wearables**: Google Fit / Apple Health sync for calorie balance
- [ ] **Notifications**: Smart reminders tied to Indian meal timing
- [ ] **Swiggy/Zomato**: When user orders food, show nutritional info for dishes in cart
- [ ] **Doctor sharing**: Export 7/30-day meal log as PDF — sharable with gynecologist or dietitian before appointment

### 4.3 Dietitian Network
- [ ] Verified Indian dietitian directory (filter by specialty: pregnancy, diabetes, weight loss)
- [ ] Book 30-min consultation
- [ ] Share meal logs with dietitian before appointment

---

## Phase 5: Scale & Monetization (Week 19–24)

### 5.1 Monetization
- **Free tier**: Basic meal logging, 50 recipes, general advice
- **Premium (₹299/month)**: Full recipe library, personalized plans, smart recommendations, myth-busting library
- **Pregnancy/Postpartum Bundle (₹499/month)**: All premium + week-by-week tracking, 40-day confinement planner, supplement tracker
- **Family Plan (₹699/month)**: Up to 4 profiles, household grocery list, elder nutrition mode

### 5.2 Localization (v2)
- [ ] Hindi UI
- [ ] Tamil UI
- [ ] Telugu UI
- [ ] Bengali UI
- [ ] Regional recipe sets fully localized

### 5.3 Content Partnership
- [ ] Partner with FSSAI for verified nutritional data
- [ ] Empanel 20+ regional dietitians as content contributors
- [ ] Collaborate with AIIMS/regional medical colleges for pregnancy nutrition guidelines

---

## Technical Architecture

```
india-eats/
├── apps/
│   ├── web/                  # Next.js 14 App Router
│   │   ├── app/
│   │   │   ├── (auth)/       # Login, signup, onboarding
│   │   │   ├── dashboard/    # Main user dashboard
│   │   │   ├── meal-plans/   # Plan generation + display
│   │   │   ├── recipes/      # Recipe browser + detail
│   │   │   ├── log/          # Food logger
│   │   │   ├── pregnancy/    # Pre-delivery segment
│   │   │   ├── postpartum/   # Post-delivery segment
│   │   │   └── community/    # Forum + sharing
│   │   └── components/
│   │       ├── thali/        # Thali builder
│   │       ├── charts/       # Nutrition charts
│   │       └── recipes/      # Recipe cards
│   └── mobile/               # React Native (v2)
├── packages/
│   ├── db/                   # Prisma schema + migrations
│   ├── nutrition-engine/     # Macro calculation, plan generation
│   ├── recipe-search/        # Search + filtering logic
│   └── ui/                   # Shared component library
└── data/
    ├── ifct/                 # Indian Food Composition Tables
    ├── recipes/              # Seed recipe data (JSON)
    └── myths/                # Myth-busting content
```

### Key Schema Tables
- `users` — profile, segment, region, dietary prefs, prakriti, `unit_preference` (katori/grams), condition_tracks
- `recipes` — full recipe with nutrition in grams + katori equivalents, tags, regional variants, swap_tags
- `ingredients` — IFCT nutrition data + gram weights + katori conversions
- `meal_plans` — generated plans linked to user
- `meal_swaps` — swap pool per meal slot: `similar_nutrition[]`, `same_type[]`; `rejected_until` timestamp
- `food_logs` — daily intake entries with `unit_used` field
- `pregnancy_profiles` — due date, trimester, supplement tracker
- `postpartum_profiles` — delivery date, feeding mode, confinement day
- `myth_database` — claim + evidence + sources
- `user_conditions` — PCOS, diabetes, thyroid, hypertension flags
- `swap_history` — which meals rejected, when, by whom — feeds personalization engine

---

## Milestones & Success Metrics

| Milestone | Target | Metric |
|-----------|--------|--------|
| MVP launch | Week 8 | 500 beta users |
| Pregnancy feature | Week 12 | 200 pregnant users enrolled |
| Premium launch | Week 18 | 5% conversion (₹299/mo) |
| Community | Week 20 | 1,000 recipe shares |
| Month 6 | — | 10,000 MAU, ₹5L MRR |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Nutrition data accuracy | Use IFCT 2017 + tie-up with licensed dietitians |
| Medical liability (pregnancy advice) | "Consult your doctor" disclaimers on all clinical content, no diagnosis |
| Regional diversity overwhelming | Start with 4 regions in MVP, expand based on user data |
| Low mobile retention | WhatsApp-first reminders + daily streak gamification |
| Competition (HealthifyMe, GoQii) | Hyper-focus on the Indian cultural layer they skip |

---

## App Name Candidates

| Name | Meaning | Vibe | Repo slug |
|------|---------|------|-----------|
| **Aahar** | Sanskrit/Hindi for food & nourishment | Clean, universal, understood across all Indian languages | `aahar` |
| **Poshan** | Hindi for nutrition/nourishment | Directly on-brand, government nutrition programs use this word | `poshan` |
| **Sehat** | Hindi/Urdu for health | Warm, conversational, understood North + South | `sehat` |
| **Thali** | The iconic Indian balanced meal | Instantly visual, globally recognizable Indian symbol | `thali-health` |
| **Rasayana** | Ayurvedic term for rejuvenating food | Premium/wellness feel, strong Ayurveda connection | `rasayana` |
| **Swasth** | Sanskrit for healthy/wholesome | Strong, short, used in health contexts | `swasth` |

**Recommendation:** `aahar` — 5 letters, understood by every Indian regardless of language, directly means food+nourishment. Clean GitHub repo, clean domain (`aahar.in`, `aaharapp.com`). `poshan` is a close second if you want "nutrition" front and center.

---

## Immediate Next Steps (This Week)

1. Initialize git repo + Next.js project
2. Set up Supabase (auth + database)
3. Seed IFCT nutrition data into Postgres
4. Build onboarding flow (segment selector + region picker)
5. Build recipe card component with Indian portion display
6. Deploy skeleton to Vercel with domain
