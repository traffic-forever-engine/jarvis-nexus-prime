/**
 * Jarvis 2.0 Nexus Prime - Tumblr Poster
 * 
 * Posts to Tumblr using text post type with HTML format.
 * Links render as clickable <a href> hyperlinks.
 * Uses oauth-1.0a npm package for signing.
 */

import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const TUMBLR_API_BASE = 'https://api.tumblr.com/v2';

function createOAuth() {
  return OAuth({
    consumer: {
      key: process.env.TUMBLR_CONSUMER_KEY,
      secret: process.env.TUMBLR_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto.createHmac('sha1', key).update(baseString).digest('base64');
    }
  });
}

/**
 * Post to Tumblr — always uses text type with HTML format
 */
async function postToTumblr(content) {
  const token = process.env.TUMBLR_TOKEN;
  const tokenSecret = process.env.TUMBLR_TOKEN_SECRET;
  const blogName = process.env.TUMBLR_BLOG_NAME || 'traffic-forever';

  if (!token || !tokenSecret) {
    throw new Error('Tumblr OAuth token credentials not configured');
  }

  const url = `${TUMBLR_API_BASE}/blog/${blogName}/post`;

  // Alternate EN/FR
  const useFrench = Math.random() < 0.4;
  const body = useFrench ? content.postFr : content.postEn;
  const title = useFrench ? content.titleFr : content.titleEn;
  const tags = content.tags || 'affiliate,deals,recommended,shopping';

  const bodyParams = {
    type: 'text',
    title: title,
    body: body,
    tags: tags,
    format: 'html'
  };

  try {
    const oauth = createOAuth();
    const requestData = { url, method: 'POST', data: bodyParams };
    const tokenData = { key: token, secret: tokenSecret };
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
      return { success: true, postId: data.response?.id, language: useFrench ? 'FR' : 'EN', platform: 'tumblr' };
    } else {
      console.error(`❌ Tumblr API error: ${JSON.stringify(data)}`);
      return { success: false, error: data.meta?.msg || 'Unknown error', platform: 'tumblr' };
    }
  } catch (error) {
    console.error(`❌ Tumblr post failed: ${error.message}`);
    return { success: false, error: error.message, platform: 'tumblr' };
  }
}

async function postToTumblrOrSimulate(content) {
  if (process.env.TUMBLR_CONSUMER_KEY && process.env.TUMBLR_TOKEN) {
    return await postToTumblr(content);
  }
  console.log(`📝 [NO CREDS] Skipped: "${content.titleEn}"`);
  return { success: false, error: 'No credentials', platform: 'tumblr' };
}

export { postToTumblr, postToTumblrOrSimulate };
