/**
 * Jarvis 2.0 Nexus Prime - Content Generator
 * 
 * Generates bilingual (EN/FR) Problem-Solution style copy
 * using viral copywriting formulas.
 * 
 * Posts use HTML format with clickable <a href> links
 * so users can click through to affiliate products directly.
 */

import {
  getRandomProduct,
  getRandomClickBank,
  getEstimatedCommission,
  getContentType,
  REAL_ESTATE,
  TRAFFIC_FOREVER
} from './products.js';

// Viral hooks (from Genie AI analysis)
const HOOKS_EN = [
  "Stop wasting money on {category} that doesn't work.",
  "I tried 12 {category} products. Only THIS one actually works.",
  "Why 10,000+ people switched to this {title} (and never looked back)",
  "The {category} secret that brands don't want you to know",
  "I was skeptical too. Then I tried {title}...",
  "Your {problem} ends TODAY. Here's how.",
  "This {title} changed my entire routine. Not exaggerating.",
  "WARNING: You'll never go back after trying {title}",
  "The #1 {category} product everyone's talking about in 2025",
  "Tired of {problem}? This $30 solution actually works."
];

const HOOKS_FR = [
  "Arrêtez de gaspiller de l'argent en {category} qui ne fonctionne pas.",
  "J'ai essayé 12 produits. Seul CELUI-CI fonctionne vraiment.",
  "Pourquoi 10 000+ personnes sont passées à {title}",
  "Le secret {category} que les marques ne veulent pas que vous sachiez",
  "J'étais sceptique aussi. Puis j'ai essayé {title}...",
  "Votre {problem} se termine AUJOURD'HUI. Voici comment.",
  "Ce {title} a changé toute ma routine. Sans exagérer.",
  "ATTENTION: Vous ne reviendrez jamais en arrière après avoir essayé {title}",
  "Le produit {category} #1 dont tout le monde parle en 2025",
  "Fatigué de {problem}? Cette solution à 30$ fonctionne vraiment."
];

// FTC Disclaimer
const DISCLAIMER_EN = '<small>⚠️ This post contains affiliate links. We may earn a commission at no extra cost to you.</small>';
const DISCLAIMER_FR = '<small>⚠️ Ce post contient des liens affiliés. Nous pouvons gagner une commission sans frais supplémentaires pour vous.</small>';

// Hashtags by niche
const HASHTAGS = {
  'health-wellness': '#health #wellness #selfcare #healthylifestyle #fitness #wellbeing',
  'technology': '#tech #gadgets #technology #innovation #smart #productivity',
  'beauty-skincare': '#beauty #skincare #glowup #skincareroutine #beautytips #antiaging',
  'online-education': '#learning #education #onlinelearning #skills #growth #edtech'
};

/**
 * Fill template with product data
 */
function fillTemplate(template, product) {
  return template
    .replace(/{title}/g, product.title || '')
    .replace(/{titleFr}/g, product.titleFr || '')
    .replace(/{category}/g, product.niche || product.category || '')
    .replace(/{problem}/g, product.problem || '')
    .replace(/{problemFr}/g, product.problemFr || '')
    .replace(/{solution}/g, product.solution || '')
    .replace(/{solutionFr}/g, product.solutionFr || '');
}

/**
 * Generate affiliate product post (bilingual) — HTML format with clickable links
 */
function generateAffiliatePost() {
  // Decide: Amazon or ClickBank
  const isClickBank = Math.random() < 0.25; // 25% ClickBank, 75% Amazon

  if (isClickBank) {
    const product = getRandomClickBank();
    const hookEn = HOOKS_EN[Math.floor(Math.random() * HOOKS_EN.length)];
    const hookFr = HOOKS_FR[Math.floor(Math.random() * HOOKS_FR.length)];

    const postEn = `<h2>${fillTemplate(hookEn, product)}</h2>

<p>❌ <strong>PROBLEM:</strong> ${product.problem}</p>
<p>✅ <strong>SOLUTION:</strong> ${product.solution}</p>

<p>⭐ <strong>${product.title}</strong></p>
<p>👉 <a href="${product.hoplink}"><strong>Click Here to Get It Now →</strong></a></p>

${DISCLAIMER_EN}

<p>#affiliatemarketing #deals #recommended</p>`;

    const postFr = `<h2>${fillTemplate(hookFr, {...product, title: product.titleFr, problem: product.problemFr})}</h2>

<p>❌ <strong>PROBLÈME:</strong> ${product.problemFr}</p>
<p>✅ <strong>SOLUTION:</strong> ${product.solutionFr}</p>

<p>⭐ <strong>${product.titleFr}</strong></p>
<p>👉 <a href="${product.hoplink}"><strong>Cliquez Ici pour l'Obtenir →</strong></a></p>

${DISCLAIMER_FR}

<p>#marketing #offres #recommandé</p>`;

    return {
      type: 'clickbank',
      titleEn: product.title,
      titleFr: product.titleFr,
      postEn,
      postFr,
      link: product.hoplink,
      estimatedCommission: product.avgCommission
    };
  }

  // Amazon product
  const product = getRandomProduct();
  const hookEn = HOOKS_EN[Math.floor(Math.random() * HOOKS_EN.length)];
  const hookFr = HOOKS_FR[Math.floor(Math.random() * HOOKS_FR.length)];
  const hashtags = HASHTAGS[product.niche] || '#deals #recommended';

  const postEn = `<h2>${fillTemplate(hookEn, product)}</h2>

<p>❌ <strong>PROBLEM:</strong> ${product.problem}</p>
<p>✅ <strong>SOLUTION:</strong> ${product.solution}</p>

<p>⭐ <strong>${product.title}</strong></p>
<p>💰 <a href="${product.amazonUrl}"><strong>Check Today's Price on Amazon →</strong></a></p>

${DISCLAIMER_EN}

<p>${hashtags} #affiliatemarketing #amazonfinds</p>`;

  const postFr = `<h2>${fillTemplate(hookFr, {...product, title: product.titleFr, problem: product.problemFr})}</h2>

<p>❌ <strong>PROBLÈME:</strong> ${product.problemFr}</p>
<p>✅ <strong>SOLUTION:</strong> ${product.solutionFr}</p>

<p>⭐ <strong>${product.titleFr}</strong></p>
<p>💰 <a href="${product.amazonUrlCa}"><strong>Vérifiez le Prix sur Amazon →</strong></a></p>

${DISCLAIMER_FR}

<p>${hashtags} #marketing #trouvaillesamazon</p>`;

  return {
    type: 'amazon',
    titleEn: product.title,
    titleFr: product.titleFr,
    postEn,
    postFr,
    link: product.amazonUrl,
    estimatedCommission: getEstimatedCommission(product),
    niche: product.niche
  };
}

/**
 * Generate Traffic Forever promotion post
 */
function generateTrafficForeverPost() {
  const postEn = `<h2>🚀 Traffic Forever — Automated Online Income</h2>

<p>${TRAFFIC_FOREVER.pitchEn}</p>

<p>Want to build automated income streams? Traffic Forever gives you the tools, strategies, and AI-powered systems to grow your online presence — 100% free to start.</p>

<p>👉 <a href="${TRAFFIC_FOREVER.url}"><strong>Visit Traffic Forever for Free Marketing Tools →</strong></a></p>

<p>#onlinebusiness #passiveincome #digitalmarketing #entrepreneur #sidehustle #makemoneyonline</p>`;

  const postFr = `<h2>🚀 Traffic Forever — Revenu en Ligne Automatisé</h2>

<p>${TRAFFIC_FOREVER.pitchFr}</p>

<p>Vous voulez construire des sources de revenus automatisées? Traffic Forever vous donne les outils, stratégies et systèmes propulsés par l'IA pour développer votre présence en ligne — 100% gratuit pour commencer.</p>

<p>👉 <a href="${TRAFFIC_FOREVER.url}"><strong>Visitez Traffic Forever pour des Outils Gratuits →</strong></a></p>

<p>#businessenligne #revenuspassifs #marketingdigital #entrepreneur</p>`;

  return {
    type: 'traffic-forever',
    titleEn: 'Traffic Forever - Automated Online Income',
    titleFr: 'Traffic Forever - Revenu en Ligne Automatisé',
    postEn,
    postFr,
    link: TRAFFIC_FOREVER.url,
    estimatedCommission: 0
  };
}

/**
 * Generate Real Estate post for Shawn Mayo
 */
function generateRealEstatePost() {
  const postEn = `<h2>🏠 Buy or Sell in New Brunswick — Shawn Mayo Real Estate</h2>

<p>${REAL_ESTATE.pitchEn}</p>

<p>New Brunswick is one of Canada's most affordable provinces — and property values are rising fast. Whether you're a first-time buyer or looking to sell at top dollar, Shawn Mayo has the local expertise you need.</p>

<p>👉 <a href="${REAL_ESTATE.website}"><strong>Contact Shawn for a Free Home Evaluation →</strong></a></p>

<p>#realestate #newbrunswick #canada #homebuying #property #realtor</p>`;

  const postFr = `<h2>🏠 Achetez ou Vendez au Nouveau-Brunswick — Shawn Mayo Immobilier</h2>

<p>${REAL_ESTATE.pitchFr}</p>

<p>Le Nouveau-Brunswick est l'une des provinces les plus abordables du Canada — et les valeurs immobilières augmentent rapidement. Que vous soyez un premier acheteur ou que vous cherchiez à vendre au meilleur prix, Shawn Mayo a l'expertise locale dont vous avez besoin.</p>

<p>👉 <a href="${REAL_ESTATE.website}"><strong>Contactez Shawn pour une Évaluation Gratuite →</strong></a></p>

<p>#immobilier #nouveaubrunswick #canada #achatmaison #propriété</p>`;

  return {
    type: 'real-estate',
    titleEn: 'Shawn Mayo Real Estate - New Brunswick',
    titleFr: 'Shawn Mayo Immobilier - Nouveau-Brunswick',
    postEn,
    postFr,
    link: REAL_ESTATE.website,
    estimatedCommission: 0
  };
}

/**
 * Main content generation function
 * Returns a complete post based on rotation rules
 */
function generateContent() {
  const contentType = getContentType();

  switch (contentType) {
    case 'affiliate':
      return generateAffiliatePost();
    case 'traffic-forever':
      return generateTrafficForeverPost();
    case 'real-estate':
      return generateRealEstatePost();
    default:
      return generateAffiliatePost();
  }
}

export {
  generateContent,
  generateAffiliatePost,
  generateTrafficForeverPost,
  generateRealEstatePost,
  DISCLAIMER_EN,
  DISCLAIMER_FR
};
