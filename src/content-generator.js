/**
 * Jarvis 2.0 Nexus Prime - Content Generator
 * 
 * Generates Base44-style posts with clickable affiliate links.
 * All posts use HTML <a href> tags so links are clickable on Tumblr.
 */

import {
  getRandomProduct,
  getRandomClickBank,
  getEstimatedCommission,
  getContentType,
  REAL_ESTATE,
  TRAFFIC_FOREVER
} from './products.js';

// Short punchy hooks (Base44 style — casual, conversational)
const HOOKS_EN = [
  "tired of cheap stuff breaking? same. this {title} is the one 👆",
  "okay but why didn't anyone tell me about this sooner?? {title} is a game changer",
  "been using this for 2 weeks and I'm never going back. {title} hits different",
  "if you're still dealing with {problem}... stop. just get this.",
  "this is the one everyone's been talking about. {title} — trust me on this",
  "finally found something that actually works for {problem}. bookmark this.",
  "POV: you finally solved {problem} with one purchase",
  "the reviews don't lie. 50,000+ people can't be wrong about {title}",
  "I was today years old when I found out about {title}. life changed.",
  "stop scrolling. if you need help with {problem}, THIS is it."
];

const HOOKS_FR = [
  "fatigué des trucs pas chers qui cassent? pareil. ce {title} c'est le bon 👆",
  "pourquoi personne m'a parlé de ça avant?? {title} change tout",
  "je l'utilise depuis 2 semaines et je reviens jamais en arrière. {title} c'est autre chose",
  "si tu gères encore {problem}... arrête. prends juste ça.",
  "c'est celui dont tout le monde parle. {title} — fais-moi confiance",
  "j'ai enfin trouvé quelque chose qui marche pour {problem}. sauvegarde ça.",
  "POV: tu as enfin résolu {problem} avec un seul achat",
  "les avis ne mentent pas. 50 000+ personnes ne peuvent pas se tromper sur {title}",
  "j'ai découvert {title} aujourd'hui. ma vie a changé.",
  "arrête de scroller. si t'as besoin d'aide avec {problem}, C'EST ça."
];

const HASHTAGS = {
  'health-wellness': '#health #wellness #selfcare #fitness #wellbeing #natural #musthave #deals #shopping #ad #affiliate',
  'technology': '#tech #gadgets #technology #smart #productivity #techlife #bestbuys #deals #shopping #musthave #wishlist #ad #affiliate',
  'beauty-skincare': '#beauty #skincare #glowup #skincareroutine #beautytips #antiaging #naturalbeauty #deals #shopping #musthave #ad #affiliate',
  'online-education': '#learning #education #skills #growth #productivity #deals #shopping #musthave #ad #affiliate'
};

const TAGS_CSV = {
  'health-wellness': 'health,wellness,selfcare,fitness,wellbeing,natural,musthave,deals,shopping,ad,affiliate',
  'technology': 'tech,gadgets,technology,smart,productivity,techlife,bestbuys,deals,shopping,musthave,wishlist,ad,affiliate',
  'beauty-skincare': 'beauty,skincare,glowup,skincareroutine,beautytips,antiaging,naturalbeauty,deals,shopping,musthave,ad,affiliate',
  'online-education': 'learning,education,skills,growth,productivity,deals,shopping,musthave,ad,affiliate'
};

function fillTemplate(template, product) {
  return template
    .replace(/{title}/g, product.title || '')
    .replace(/{titleFr}/g, product.titleFr || '')
    .replace(/{category}/g, product.niche || product.category || '')
    .replace(/{problem}/g, (product.problem || '').toLowerCase())
    .replace(/{problemFr}/g, (product.problemFr || '').toLowerCase());
}

/**
 * Generate affiliate product post — HTML with clickable links
 */
function generateAffiliatePost() {
  const isClickBank = Math.random() < 0.25;

  if (isClickBank) {
    const product = getRandomClickBank();
    const hookEn = HOOKS_EN[Math.floor(Math.random() * HOOKS_EN.length)];
    const hookFr = HOOKS_FR[Math.floor(Math.random() * HOOKS_FR.length)];

    const postEn = `<p>🛒 <a href="${product.hoplink}"><b>Shop this deal →</b></a></p>
<p>${fillTemplate(hookEn, product)}</p>
<p>${product.solution}</p>
<p>🛒 <a href="${product.hoplink}"><b>Click here to get it now →</b></a></p>
<p>#health #wellness #selfimprovement #mindset #deals #ad #affiliate</p>`;

    const postFr = `<p>🛒 <a href="${product.hoplink}"><b>Achetez cette offre →</b></a></p>
<p>${fillTemplate(hookFr, {...product, title: product.titleFr, problem: product.problemFr})}</p>
<p>${product.solutionFr}</p>
<p>🛒 <a href="${product.hoplink}"><b>Cliquez ici pour l'obtenir →</b></a></p>
<p>#santé #bienêtre #développementpersonnel #offres #ad #affiliate</p>`;

    return {
      type: 'clickbank',
      titleEn: product.title,
      titleFr: product.titleFr,
      postEn,
      postFr,
      link: product.hoplink,
      tags: 'health,wellness,selfimprovement,mindset,deals,ad,affiliate',
      estimatedCommission: product.avgCommission
    };
  }

  // Amazon product
  const product = getRandomProduct();
  const hookEn = HOOKS_EN[Math.floor(Math.random() * HOOKS_EN.length)];
  const hookFr = HOOKS_FR[Math.floor(Math.random() * HOOKS_FR.length)];
  const hashtags = HASHTAGS[product.niche] || '#deals #shopping #musthave #ad #affiliate';
  const tags = TAGS_CSV[product.niche] || 'deals,shopping,musthave,ad,affiliate';

  const postEn = `<p>🛒 <a href="${product.amazonUrl}"><b>Shop top picks on Amazon →</b></a></p>
<p>${fillTemplate(hookEn, product)}</p>
<p>${product.solution}</p>
<p>🛒 <a href="${product.amazonUrl}"><b>Shop top picks on Amazon →</b></a></p>
<p>${hashtags}</p>`;

  const postFr = `<p>🛒 <a href="${product.amazonUrlCa}"><b>Magasinez sur Amazon →</b></a></p>
<p>${fillTemplate(hookFr, {...product, title: product.titleFr, problem: product.problemFr})}</p>
<p>${product.solutionFr}</p>
<p>🛒 <a href="${product.amazonUrlCa}"><b>Magasinez sur Amazon →</b></a></p>
<p>${hashtags}</p>`;

  return {
    type: 'amazon',
    titleEn: product.title,
    titleFr: product.titleFr,
    postEn,
    postFr,
    link: product.amazonUrl,
    tags: tags,
    estimatedCommission: getEstimatedCommission(product),
    niche: product.niche
  };
}

function generateTrafficForeverPost() {
  const postEn = `<p>🚀 <a href="${TRAFFIC_FOREVER.url}"><b>Visit Traffic Forever →</b></a></p>
<p>Want automated income streams? Traffic Forever gives you free tools, strategies, and AI-powered systems to grow online. 100% free to start.</p>
<p>🚀 <a href="${TRAFFIC_FOREVER.url}"><b>Get Free Marketing Tools →</b></a></p>
<p>#onlinebusiness #passiveincome #digitalmarketing #entrepreneur #sidehustle #makemoneyonline</p>`;

  const postFr = `<p>🚀 <a href="${TRAFFIC_FOREVER.url}"><b>Visitez Traffic Forever →</b></a></p>
<p>Vous voulez des revenus automatisés? Traffic Forever vous donne les outils gratuits et systèmes IA pour grandir en ligne. 100% gratuit.</p>
<p>🚀 <a href="${TRAFFIC_FOREVER.url}"><b>Outils Marketing Gratuits →</b></a></p>
<p>#businessenligne #revenuspassifs #marketingdigital #entrepreneur</p>`;

  return {
    type: 'traffic-forever',
    titleEn: 'Traffic Forever - Automated Online Income',
    titleFr: 'Traffic Forever - Revenu en Ligne Automatisé',
    postEn,
    postFr,
    link: TRAFFIC_FOREVER.url,
    tags: 'onlinebusiness,passiveincome,digitalmarketing,entrepreneur,sidehustle,makemoneyonline',
    estimatedCommission: 0
  };
}

function generateRealEstatePost() {
  const postEn = `<p>🏠 <a href="${REAL_ESTATE.website}"><b>Contact Shawn Mayo →</b></a></p>
<p>Looking to buy or sell in New Brunswick? Property values are rising fast. Shawn Mayo has the local expertise you need. Free consultation — no obligation.</p>
<p>🏠 <a href="${REAL_ESTATE.website}"><b>Free Home Evaluation →</b></a></p>
<p>#realestate #newbrunswick #canada #homebuying #property #realtor</p>`;

  const postFr = `<p>🏠 <a href="${REAL_ESTATE.website}"><b>Contactez Shawn Mayo →</b></a></p>
<p>Vous cherchez à acheter ou vendre au Nouveau-Brunswick? Les valeurs immobilières augmentent rapidement. Consultation gratuite — sans obligation.</p>
<p>🏠 <a href="${REAL_ESTATE.website}"><b>Évaluation Gratuite →</b></a></p>
<p>#immobilier #nouveaubrunswick #canada #propriété</p>`;

  return {
    type: 'real-estate',
    titleEn: 'Shawn Mayo Real Estate - New Brunswick',
    titleFr: 'Shawn Mayo Immobilier - Nouveau-Brunswick',
    postEn,
    postFr,
    link: REAL_ESTATE.website,
    tags: 'realestate,newbrunswick,canada,homebuying,property,realtor',
    estimatedCommission: 0
  };
}

function generateContent() {
  const contentType = getContentType();
  switch (contentType) {
    case 'affiliate': return generateAffiliatePost();
    case 'traffic-forever': return generateTrafficForeverPost();
    case 'real-estate': return generateRealEstatePost();
    default: return generateAffiliatePost();
  }
}

export { generateContent, generateAffiliatePost, generateTrafficForeverPost, generateRealEstatePost };
