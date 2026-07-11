/**
 * Jarvis 2.0 Nexus Prime - eBay Browse API Integration
 * 
 * Searches eBay for trending products using the Browse API.
 * Uses Application OAuth (client_credentials) — no user auth needed.
 * 
 * Required secrets:
 * - EBAY_APP_ID (Client ID)
 * - EBAY_CERT_ID (Client Secret)
 */

const EBAY_AUTH_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const EBAY_BROWSE_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';

// Search keywords by niche
const EBAY_SEARCH_TERMS = {
  'health-wellness': [
    'massage gun portable',
    'posture corrector',
    'smart water bottle',
    'resistance bands set',
    'yoga mat premium'
  ],
  'technology': [
    'wireless earbuds ANC',
    'USB-C hub adapter',
    'portable charger 20000mAh',
    'mechanical keyboard wireless',
    'smart LED desk lamp'
  ],
  'beauty-skincare': [
    'vitamin C serum',
    'LED face mask therapy',
    'jade roller electric',
    'hair growth serum',
    'retinol cream anti-aging'
  ],
  'online-education': [
    'drawing tablet beginner',
    'webcam 1080p ring light',
    'noise cancelling headphones study',
    'document scanner portable',
    'standing desk converter'
  ]
};

/**
 * Get eBay OAuth token using client credentials
 */
async function getEbayToken() {
  const appId = process.env.EBAY_APP_ID;
  const certId = process.env.EBAY_CERT_ID;
  
  if (!appId || !certId) {
    console.log('⚠️ eBay credentials not configured — skipping eBay search');
    return null;
  }
  
  const credentials = Buffer.from(`${appId}:${certId}`).toString('base64');
  
  try {
    const response = await fetch(EBAY_AUTH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
    });
    
    const data = await response.json();
    
    if (data.access_token) {
      return data.access_token;
    }
    
    console.error('❌ eBay auth failed:', data);
    return null;
  } catch (error) {
    console.error('❌ eBay auth error:', error.message);
    return null;
  }
}

/**
 * Search eBay for trending items in a niche
 */
async function searchEbay(token, niche) {
  const terms = EBAY_SEARCH_TERMS[niche] || EBAY_SEARCH_TERMS['technology'];
  const searchTerm = terms[Math.floor(Math.random() * terms.length)];
  
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      limit: '5',
      sort: 'price',
      filter: 'price:[10..100],priceCurrency:USD,conditions:{NEW}'
    });
    
    const response = await fetch(`${EBAY_BROWSE_URL}?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=5339100488'
      }
    });
    
    const data = await response.json();
    
    if (data.itemSummaries && data.itemSummaries.length > 0) {
      const item = data.itemSummaries[0];
      return {
        success: true,
        title: item.title,
        price: item.price?.value || '0',
        currency: item.price?.currency || 'USD',
        url: item.itemAffiliateWebUrl || item.itemWebUrl,
        image: item.image?.imageUrl,
        condition: item.condition
      };
    }
    
    return { success: false, error: 'No items found' };
  } catch (error) {
    console.error(`❌ eBay search error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Get a trending eBay product with affiliate link
 */
async function getEbayProduct() {
  const token = await getEbayToken();
  
  if (!token) {
    return null;
  }
  
  const niches = Object.keys(EBAY_SEARCH_TERMS);
  const niche = niches[Math.floor(Math.random() * niches.length)];
  
  return await searchEbay(token, niche);
}

export { getEbayProduct, searchEbay, getEbayToken };
