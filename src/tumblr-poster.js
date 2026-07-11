/**
 * Jarvis 2.0 Nexus Prime - Tumblr Poster
 * 
 * Posts content to Tumblr using their v2 API.
 * Uses the `oauth-1.0a` npm package for proper OAuth 1.0a signing.
 * 
 * Required env vars:
 * - TUMBLR_CONSUMER_KEY
 * - TUMBLR_CONSUMER_SECRET
 * - TUMBLR_TOKEN
 * - TUMBLR_TOKEN_SECRET
 * - TUMBLR_BLOG_NAME (e.g., "traffic-forever" or "traffic-forever.tumblr.com")
 */

import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const TUMBLR_API_BASE = 'https://api.tumblr.com/v2';

/**
 * Create OAuth 1.0a instance
 */
function createOAuth() {
  const consumerKey = process.env.TUMBLR_CONSUMER_KEY;
  const consumerSecret = process.env.TUMBLR_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Tumblr OAuth consumer credentials not configured');
  }

  return OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    }
  });
}

/**
 * Post text content to Tumblr
 */
async function postToTumblr(content) {
  const token = process.env.TUMBLR_TOKEN;
  const tokenSecret = process.env.TUMBLR_TOKEN_SECRET;
  const blogName = process.env.TUMBLR_BLOG_NAME || 'traffic-forever';

  if (!token || !tokenSecret) {
    throw new Error('Tumblr OAuth token credentials not configured');
  }

  const url = `${TUMBLR_API_BASE}/blog/${blogName}/post`;

  // Determine language — alternate between EN and FR
  const useFrench = Math.random() < 0.4; // 40% French posts
  const postBody = useFrench ? content.postFr : content.postEn;
  const title = useFrench ? content.titleFr : content.titleEn;

  const bodyParams = {
    type: 'text',
    title: title,
    body: postBody,
    tags: content.type === 'affiliate'
      ? 'affiliate,deals,recommended,shopping,review'
      : content.type === 'real-estate'
        ? 'realestate,newbrunswick,canada,property,homes'
        : 'onlinebusiness,marketing,income,entrepreneur',
    format: 'markdown'
  };

  try {
    const oauth = createOAuth();

    const requestData = {
      url: url,
      method: 'POST',
      data: bodyParams
    };

    const tokenData = {
      key: token,
      secret: tokenSecret
    };

    // Generate the Authorization header
    const authHeader = oauth.toHeader(oauth.authorize(requestData, tokenData));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(bodyParams).toString()
    });

    const data = await response.json();

    if (response.ok && (data.meta?.status === 201 || data.meta?.status === 200)) {
      console.log(`✅ Tumblr post published: ${title} (${useFrench ? 'FR' : 'EN'})`);
      return {
        success: true,
        postId: data.response?.id,
        language: useFrench ? 'FR' : 'EN',
        platform: 'tumblr'
      };
    } else {
      console.error(`❌ Tumblr API error: ${JSON.stringify(data)}`);
      return { success: false, error: data.meta?.msg || 'Unknown error', platform: 'tumblr' };
    }
  } catch (error) {
    console.error(`❌ Tumblr post failed: ${error.message}`);
    return { success: false, error: error.message, platform: 'tumblr' };
  }
}

/**
 * LIVE MODE: Post to Tumblr if credentials exist.
 */
async function postToTumblrOrSimulate(content) {
  const hasCredentials = process.env.TUMBLR_CONSUMER_KEY &&
    process.env.TUMBLR_TOKEN;

  if (hasCredentials) {
    return await postToTumblr(content);
  }

  // No Tumblr creds — log but don't post
  console.log(`📝 [NO CREDS] Content generated: "${content.titleEn}" — Tumblr posting skipped (add API keys to activate)`);
  return {
    success: false,
    error: 'No Tumblr credentials configured',
    platform: 'tumblr'
  };
}

export { postToTumblr, postToTumblrOrSimulate };
