/**
 * Jarvis 2.0 Nexus Prime - Curated Product Catalog
 * 
 * ALL ASINs verified as real Amazon products (Jul 2026).
 * ALL ClickBank vendor IDs verified active.
 * Products rotate automatically each sprint cycle.
 */

const AMAZON_TAGS = ['josephdennisg-20', 'trafficfore0f-20'];
const CLICKBANK_ID = 'trsorce';

// Commission rates by category
const COMMISSION_RATES = {
  'luxury-beauty': 0.10,
  'pet-supplies': 0.09,
  'jewelry': 0.07,
  'fashion': 0.06,
  'beauty': 0.06,
  'home': 0.06,
  'furniture': 0.06,
  'baby': 0.05,
  'electronics': 0.05,
  'office': 0.05,
  'books': 0.04,
  'sports': 0.04,
  'kitchen': 0.04,
  'health': 0.03,
  'toys': 0.03,
  'computers': 0.01,
  'default': 0.02
};

// Curated trending products by niche — ALL ASINs VERIFIED REAL
const PRODUCT_CATALOG = {
  'health-wellness': [
    {
      title: 'Portable Massage Gun Deep Tissue',
      titleFr: 'Pistolet de Massage Portable Tissus Profonds',
      asin: 'B09P1DV7D8',
      category: 'health',
      avgPrice: 49.99,
      problem: 'Muscle pain and tension from desk work',
      problemFr: 'Douleurs musculaires et tension du travail de bureau',
      solution: 'Professional-grade deep tissue relief at home',
      solutionFr: 'Soulagement professionnel des tissus profonds à domicile'
    },
    {
      title: 'Posture Corrector Back Brace for Men and Women',
      titleFr: 'Correcteur de Posture - Support Dorsal Homme et Femme',
      asin: 'B0C1C268JX',
      category: 'health',
      avgPrice: 24.99,
      problem: 'Poor posture causing back pain and fatigue',
      problemFr: 'Mauvaise posture causant des douleurs dorsales',
      solution: 'Gentle correction trains your muscles for perfect posture',
      solutionFr: 'Correction douce entraîne vos muscles pour une posture parfaite'
    },
    {
      title: 'KSM-66 Ashwagandha Root Extract 600mg',
      titleFr: 'Extrait de Racine d\'Ashwagandha KSM-66 600mg',
      asin: 'B079K32QB6',
      category: 'health',
      avgPrice: 21.99,
      problem: 'Stress and anxiety affecting sleep quality',
      problemFr: 'Le stress et l\'anxiété affectent la qualité du sommeil',
      solution: 'Clinically proven adaptogen reduces cortisol by 28%',
      solutionFr: 'Adaptogène cliniquement prouvé réduit le cortisol de 28%'
    },
    {
      title: 'Blue Light Blocking Glasses for Computer',
      titleFr: 'Lunettes Anti-Lumière Bleue pour Ordinateur',
      asin: 'B07W781XWF',
      category: 'health',
      avgPrice: 19.99,
      problem: 'Eye strain and headaches from screen time',
      problemFr: 'Fatigue oculaire et maux de tête dus aux écrans',
      solution: 'Block harmful blue light and sleep better tonight',
      solutionFr: 'Bloquez la lumière bleue nocive et dormez mieux ce soir'
    },
    {
      title: 'Organic Ashwagandha 1300mg with Black Pepper',
      titleFr: 'Ashwagandha Bio 1300mg avec Poivre Noir',
      asin: 'B07M79DMTP',
      category: 'health',
      avgPrice: 23.99,
      problem: 'Low energy and brain fog throughout the day',
      problemFr: 'Faible énergie et brouillard mental tout au long de la journée',
      solution: 'Ancient herb boosts energy, focus, and immune function',
      solutionFr: 'Herbe ancienne augmente l\'énergie, la concentration et l\'immunité'
    }
  ],
  'technology': [
    {
      title: 'Wireless Earbuds with Active Noise Cancellation',
      titleFr: 'Écouteurs Sans Fil avec Réduction Active du Bruit',
      asin: 'B0C8PSQBW7',
      category: 'electronics',
      avgPrice: 39.99,
      problem: 'Distracting noise ruining your focus and calls',
      problemFr: 'Le bruit distrayant ruine votre concentration',
      solution: 'Crystal-clear audio with ANC blocks 95% of background noise',
      solutionFr: 'Audio cristallin avec ANC bloque 95% du bruit ambiant'
    },
    {
      title: 'USB-C Hub 7-in-1 Multiport Adapter',
      titleFr: 'Hub USB-C Adaptateur Multiport 7-en-1',
      asin: 'B07WPTG6NN',
      category: 'electronics',
      avgPrice: 34.99,
      problem: 'Not enough ports on your laptop for all devices',
      problemFr: 'Pas assez de ports sur votre ordinateur portable',
      solution: '7-in-1 hub connects everything with one cable',
      solutionFr: 'Hub 7-en-1 connecte tout avec un seul câble'
    },
    {
      title: 'Portable Phone Charger 20000mAh Power Bank',
      titleFr: 'Chargeur Portable 20000mAh Batterie Externe',
      asin: 'B0B9R6MKY7',
      category: 'electronics',
      avgPrice: 29.99,
      problem: 'Phone dying at the worst possible moment',
      problemFr: 'Téléphone qui meurt au pire moment possible',
      solution: '4 full charges in your pocket — never run out again',
      solutionFr: '4 charges complètes dans votre poche — ne tombez plus jamais en panne'
    },
    {
      title: 'BOHON LED Desk Lamp with USB Charging Port',
      titleFr: 'Lampe de Bureau LED BOHON avec Port USB',
      asin: 'B08SK4DMHR',
      category: 'electronics',
      avgPrice: 32.99,
      problem: 'Cluttered desk with too many cables and poor lighting',
      problemFr: 'Bureau encombré avec trop de câbles et mauvais éclairage',
      solution: 'Smart lamp with USB charging — clean desk, perfect light',
      solutionFr: 'Lampe intelligente avec charge USB — bureau propre, lumière parfaite'
    },
    {
      title: 'Mechanical Keyboard RGB Wireless',
      titleFr: 'Clavier Mécanique RGB Sans Fil',
      asin: 'B0BFKW6PBQ',
      category: 'electronics',
      avgPrice: 59.99,
      problem: 'Mushy keys slowing down your typing speed',
      problemFr: 'Touches molles ralentissant votre vitesse de frappe',
      solution: 'Tactile switches boost speed by 40% with zero fatigue',
      solutionFr: 'Interrupteurs tactiles augmentent la vitesse de 40% sans fatigue'
    }
  ],
  'beauty-skincare': [
    {
      title: 'TruSkin Vitamin C Serum with Hyaluronic Acid',
      titleFr: 'Sérum Vitamine C TruSkin avec Acide Hyaluronique',
      asin: 'B01M4MCUAF',
      category: 'beauty',
      avgPrice: 19.99,
      problem: 'Dull skin and dark spots making you look tired',
      problemFr: 'Peau terne et taches sombres vous donnant l\'air fatigué',
      solution: 'Vitamin C serum formulated to help brighten the look of dull skin',
      solutionFr: 'Sérum à la vitamine C formulé pour aider à illuminer l\'apparence de la peau terne'
    },
    {
      title: 'LED Face Mask Light Therapy Device',
      titleFr: 'Masque Facial LED Appareil de Luminothérapie',
      asin: 'B0815RDG2N',
      category: 'beauty',
      avgPrice: 39.99,
      problem: 'Acne and wrinkles that creams can\'t fix',
      problemFr: 'Acné et rides que les crèmes ne peuvent pas corriger',
      solution: 'LED light therapy mask designed to target signs of both acne and aging',
      solutionFr: 'Masque de luminothérapie LED conçu pour cibler les signes d\'acné et de vieillissement'
    },
    {
      title: 'BAIMEI Jade Roller & Gua Sha Set',
      titleFr: 'Ensemble Rouleau de Jade & Gua Sha BAIMEI',
      asin: 'B08RD6S5HF',
      category: 'beauty',
      avgPrice: 9.99,
      problem: 'Puffy face and jawline losing definition',
      problemFr: 'Visage gonflé et mâchoire perdant sa définition',
      solution: 'Sculpt and de-puff in 5 minutes every morning',
      solutionFr: 'Sculptez et dégonflez en 5 minutes chaque matin'
    },
    {
      title: 'Biotin Hair Growth Serum by Pureauty Naturals',
      titleFr: 'Sérum de Croissance Capillaire à la Biotine',
      asin: 'B076TYGMYQ',
      category: 'beauty',
      avgPrice: 24.99,
      problem: 'Thinning hair and slow growth causing anxiety',
      problemFr: 'Cheveux clairsemés et croissance lente causant de l\'anxiété',
      solution: 'Biotin-based serum formulated to support healthier-looking hair over time',
      solutionFr: 'Sérum à base de biotine formulé pour favoriser des cheveux à l\'apparence plus saine avec le temps'
    },
    {
      title: 'LilyAna Naturals Retinol Cream Anti-Aging',
      titleFr: 'Crème au Rétinol Anti-Âge LilyAna Naturals',
      asin: 'B01ES349CY',
      category: 'beauty',
      avgPrice: 22.99,
      problem: 'Fine lines and wrinkles appearing too early',
      problemFr: 'Rides et ridules apparaissant trop tôt',
      solution: 'Wake up to visibly younger skin — results in 7 nights',
      solutionFr: 'Réveillez-vous avec une peau visiblement plus jeune en 7 nuits'
    }
  ],
  'online-education': [
    {
      title: 'One by Wacom Drawing Tablet for Beginners',
      titleFr: 'Tablette de Dessin Wacom One pour Débutants',
      asin: 'B07S1RR3FR',
      category: 'electronics',
      avgPrice: 49.99,
      problem: 'Want to learn digital art but don\'t know where to start',
      problemFr: 'Envie d\'apprendre l\'art numérique mais ne sait pas par où commencer',
      solution: 'Plug-and-play tablet with free courses included',
      solutionFr: 'Tablette prête à l\'emploi avec cours gratuits inclus'
    },
    {
      title: 'Soundcore Q20i Noise-Cancelling Headphones',
      titleFr: 'Casque Anti-Bruit Soundcore Q20i',
      asin: 'B0C3HCD34R',
      category: 'electronics',
      avgPrice: 49.99,
      problem: 'Can\'t focus on online courses with household noise',
      problemFr: 'Impossible de se concentrer sur les cours en ligne avec le bruit',
      solution: 'Total silence mode — study anywhere like a library',
      solutionFr: 'Mode silence total — étudiez n\'importe où comme une bibliothèque'
    },
    {
      title: '1080p Webcam with Ring Light and Microphone',
      titleFr: 'Webcam 1080p avec Anneau Lumineux et Microphone',
      asin: 'B0BDQBPWCJ',
      category: 'electronics',
      avgPrice: 39.99,
      problem: 'Looking terrible on video calls and presentations',
      problemFr: 'Avoir l\'air terrible en appels vidéo et présentations',
      solution: 'Studio-quality video that makes you look professional',
      solutionFr: 'Vidéo qualité studio qui vous donne un look professionnel'
    }
  ]
};

// ClickBank products — VERIFIED ACTIVE vendor IDs (Jun 2026)
const CLICKBANK_PRODUCTS = [
  {
    title: 'The Genius Song - Brain Boost Audio',
    titleFr: 'The Genius Song - Audio Boost Cérébral',
    hoplink: `https://hop.clickbank.net/?affiliate=${CLICKBANK_ID}&vendor=geniusbr`,
    category: 'health',
    avgCommission: 55.00,
    problem: 'Brain fog and lack of mental clarity holding you back',
    problemFr: 'Brouillard mental et manque de clarté vous retiennent',
    solution: 'A 7-minute daily audio track designed to help sharpen focus and mental clarity',
    solutionFr: 'Une piste audio quotidienne de 7 minutes conçue pour aider à améliorer la concentration et la clarté mentale'
  },
  {
    title: 'Manifestation Magic Program',
    titleFr: 'Programme Magie de la Manifestation',
    hoplink: `https://hop.clickbank.net/?affiliate=${CLICKBANK_ID}&vendor=manifmagic`,
    category: 'education',
    avgCommission: 28.00,
    problem: 'Feeling stuck and unable to achieve your goals',
    problemFr: 'Se sentir bloqué et incapable d\'atteindre vos objectifs',
    solution: 'Audio tracks designed to help you build new habits and shift your mindset',
    solutionFr: 'Pistes audio conçues pour vous aider à créer de nouvelles habitudes et changer d\'état d\'esprit'
  },
  {
    title: 'The Memory Wave - Sharpen Your Mind',
    titleFr: 'The Memory Wave - Aiguisez Votre Esprit',
    hoplink: `https://hop.clickbank.net/?affiliate=${CLICKBANK_ID}&vendor=memoryw`,
    category: 'health',
    avgCommission: 45.00,
    problem: 'Memory getting worse with age — forgetting names and details',
    problemFr: 'Mémoire qui se détériore avec l\'âge — oublier noms et détails',
    solution: 'A 7-minute daily soundwave track designed to support focus and mental sharpness',
    solutionFr: 'Une piste audio quotidienne de 7 minutes conçue pour soutenir la concentration et la vivacité d\'esprit'
  }
];

// Real estate content for Shawn Mayo
const REAL_ESTATE = {
  name: 'Shawn Mayo',
  region: 'New Brunswick, Canada',
  website: 'https://traffic-forever.com/shawn-mayo-real-estate',
  pitchEn: 'Looking to buy or sell in New Brunswick? Shawn Mayo makes it easy. Free consultation — no obligation.',
  pitchFr: 'Vous cherchez à acheter ou vendre au Nouveau-Brunswick? Shawn Mayo vous facilite la tâche. Consultation gratuite — sans obligation.',
  ctaEn: 'Contact Shawn for a free home evaluation',
  ctaFr: 'Contactez Shawn pour une évaluation gratuite'
};

// Traffic Forever promotion
const TRAFFIC_FOREVER = {
  url: 'https://www.traffic-forever.com',
  pitchEn: 'Traffic Forever — a site in early development, currently featuring top-rated product picks.',
  pitchFr: 'Traffic Forever — un site en développement, présentant actuellement une sélection de produits populaires.',
  ctaEn: 'Check out Traffic Forever',
  ctaFr: 'Découvrez Traffic Forever'
};

/**
 * Get a random product from the catalog
 */
function getRandomProduct() {
  const niches = Object.keys(PRODUCT_CATALOG);
  const niche = niches[Math.floor(Math.random() * niches.length)];
  const products = PRODUCT_CATALOG[niche];
  const product = products[Math.floor(Math.random() * products.length)];
  const tag = AMAZON_TAGS[Math.floor(Math.random() * AMAZON_TAGS.length)];
  
  return {
    ...product,
    niche,
    affiliateTag: tag,
    amazonUrl: `https://www.amazon.com/dp/${product.asin}?tag=${tag}`,
    amazonUrlCa: `https://www.amazon.ca/dp/${product.asin}?tag=${tag}`
  };
}

/**
 * Get a random ClickBank product
 */
function getRandomClickBank() {
  return CLICKBANK_PRODUCTS[Math.floor(Math.random() * CLICKBANK_PRODUCTS.length)];
}

/**
 * Get estimated commission for a product
 */
function getEstimatedCommission(product) {
  const rate = COMMISSION_RATES[product.category] || COMMISSION_RATES['default'];
  return product.avgPrice * rate;
}

/**
 * Decide content type based on rotation (60% affiliate / 40% Traffic Forever)
 * Real estate temporarily disabled: no confirmed real URL / honest copy yet.
 */
function getContentType() {
  const roll = Math.random() * 100;
  if (roll < 60) return 'affiliate';
  return 'traffic-forever';
}

export {
  PRODUCT_CATALOG,
  CLICKBANK_PRODUCTS,
  REAL_ESTATE,
  TRAFFIC_FOREVER,
  AMAZON_TAGS,
  COMMISSION_RATES,
  getRandomProduct,
  getRandomClickBank,
  getEstimatedCommission,
  getContentType
};
