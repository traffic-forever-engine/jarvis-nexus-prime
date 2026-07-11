import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const oauth = OAuth({
  consumer: { key: process.env.TUMBLR_CONSUMER_KEY, secret: process.env.TUMBLR_CONSUMER_SECRET },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) { return crypto.createHmac('sha1', key).update(baseString).digest('base64'); }
});

const url = 'https://api.tumblr.com/v2/blog/traffic-forever.tumblr.com/post';
const token = { key: process.env.TUMBLR_TOKEN, secret: process.env.TUMBLR_TOKEN_SECRET };
const amazonLink = 'https://www.amazon.com/dp/B08SK4DMHR?tag=trafficfore0f-20';

// Use TEXT post with HTML format - this renders <a href> as clickable links
const bodyParams = {
  type: 'text',
  title: 'BOHON LED Desk Lamp with USB Charging',
  body: `<p>🛒 <a href="${amazonLink}"><b>Shop top picks on Amazon →</b></a></p><p>been using this for 2 weeks and I'm never going back. BOHON LED Desk Lamp hits different 👆 Smart lamp with USB charging — clean desk, perfect light. bookmark this trust me</p><p>🛒 <a href="${amazonLink}"><b>Shop top picks on Amazon →</b></a></p><p>#tech #gadgets #technology #deals #shopping #musthave #ad #affiliate</p>`,
  tags: 'tech,gadgets,technology,deals,shopping,musthave,ad,affiliate',
  format: 'html'
};

const requestData = { url, method: 'POST', data: bodyParams };
const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

const response = await fetch(url, {
  method: 'POST',
  headers: { ...authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(bodyParams).toString()
});
const data = await response.json();
console.log('Status:', response.status);
console.log('Response:', JSON.stringify(data, null, 2));
