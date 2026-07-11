# Jarvis 2.0 Nexus Prime — Autonomous Engine

This is the brain and hands of your autonomous affiliate marketing system. It runs every 15 minutes via GitHub Actions (free tier), generates bilingual content, posts to Tumblr, searches eBay, and updates your Supabase dashboard in real-time.

## What It Does Every 15 Minutes

1. Generates bilingual (EN/FR) "Problem-Solution" affiliate content
2. Posts to Tumblr with FTC disclaimers and affiliate links
3. Searches eBay for trending products
4. Updates your Supabase dashboard stats (clicks, revenue, posts)
5. Logs all activity for the dashboard Activity Log
6. Sends voice messages to Jarvis (morning greetings, evening summaries)
7. Rotates content: 60% affiliate / 25% Traffic Forever / 15% Shawn Mayo Real Estate

## Setup Instructions (One-Time)

### Step 1: Create a GitHub Account

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Use your email (trafficforever30@gmail.com)
4. Choose a username
5. Verify your email

### Step 2: Create a New Repository

1. Click the **"+"** button (top-right) → **"New repository"**
2. Name it: `jarvis-nexus-prime`
3. Set it to **Private**
4. Check **"Add a README file"**
5. Click **"Create repository"**

### Step 3: Upload the Engine Code

1. In your new repo, click **"Add file"** → **"Upload files"**
2. Drag and drop the ENTIRE `github-engine` folder contents:
   - `package.json`
   - `src/sprint.js`
   - `src/products.js`
   - `src/content-generator.js`
   - `src/tumblr-poster.js`
   - `src/ebay-search.js`
   - `src/supabase-client.js`
   - `.github/workflows/jarvis-sprint.yml`
3. Click **"Commit changes"**

### Step 4: Add Secrets (REQUIRED)

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** for each:

| Secret Name | Value |
|---|---|
| `SUPABASE_URL` | `https://dczsgopdfkmbczrvlpde.supabase.co` |
| `SUPABASE_KEY` | Your Supabase **service_role** key (I'll provide this) |
| `EBAY_APP_ID` | `DennisGa-TrafficF-PRD-f0abf6ded-711caf73` |
| `EBAY_CERT_ID` | `PRD-0abf6ded5d94-973a-48c2-9b46-c54b` |

**Optional (add when Tumblr is ready):**

| Secret Name | Value |
|---|---|
| `TUMBLR_CONSUMER_KEY` | Your Tumblr OAuth consumer key |
| `TUMBLR_CONSUMER_SECRET` | Your Tumblr OAuth consumer secret |
| `TUMBLR_TOKEN` | Your Tumblr OAuth token |
| `TUMBLR_TOKEN_SECRET` | Your Tumblr OAuth token secret |
| `TUMBLR_BLOG_NAME` | Your Tumblr blog name |

### Step 5: Enable GitHub Actions

1. Go to your repo → **Actions** tab
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. The workflow will automatically run every 15 minutes!

### Step 6: Test It

1. Go to **Actions** tab → Click **"Jarvis 2.0 Autonomous Sprint"**
2. Click **"Run workflow"** → **"Run workflow"** (green button)
3. Watch it execute! Check your Supabase dashboard for updates.

## How It Works

```
Every 15 minutes:
┌─────────────────────────────────────────────┐
│  GitHub Actions triggers sprint.js          │
│  ↓                                          │
│  Generate content (EN/FR bilingual)         │
│  ↓                                          │
│  Post to Tumblr (with affiliate links)      │
│  ↓                                          │
│  Search eBay for trending products          │
│  ↓                                          │
│  Update Supabase stats + activity log       │
│  ↓                                          │
│  Dashboard updates in real-time             │
│  ↓                                          │
│  Jarvis speaks updates via ElevenLabs       │
└─────────────────────────────────────────────┘
```

## Content Rotation

- **60%** — Affiliate products (Amazon + eBay + ClickBank)
- **25%** — Traffic Forever promotion
- **15%** — Shawn Mayo Real Estate (New Brunswick)

## Free Tier Limits

- **GitHub Actions**: 2,000 minutes/month (you'll use ~700 at 15-min intervals)
- **Supabase**: 500MB database, 2GB bandwidth (plenty for stats/logs)
- **Tumblr API**: No rate limit for posting (reasonable use)
- **eBay Browse API**: 5,000 calls/day (you'll use ~96)

## Affiliate IDs Used

- Amazon Tag 1: `josephdennisg-20`
- Amazon Tag 2: `trafficfore0f-20`
- ClickBank: `trsorce`
- eBay: `DennisGa-TrafficF-PRD-f0abf6ded-711caf73`

## Troubleshooting

**Workflow not running?**
- Check Actions tab → Make sure it's enabled
- Check if you have minutes remaining (Settings → Billing)

**Stats not updating on dashboard?**
- Verify SUPABASE_URL and SUPABASE_KEY secrets are correct
- Check the workflow run logs for errors

**Tumblr not posting?**
- The engine runs in simulation mode until Tumblr secrets are added
- Stats still update even in simulation mode
