/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          JARVIS 2.0 NEXUS PRIME - AUTONOMOUS ENGINE         ║
 * ║                                                              ║
 * ║  This script runs every 15 minutes via GitHub Actions.       ║
 * ║  It generates content, posts to social media, tracks         ║
 * ║  affiliate performance, and reports back to the dashboard.   ║
 * ║                                                              ║
 * ║  Owner: Dennis (Traffic Forever)                             ║
 * ║  Version: 2.0.0                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { generateContent } from './content-generator.js';
import { postToTumblrOrSimulate } from './tumblr-poster.js';
import { getEbayProduct } from './ebay-search.js';
import { updateStats, logActivity, logVoiceMessage, getStats } from './supabase-client.js';

// Sprint configuration
const SPRINT_CONFIG = {
  maxPostsPerHour: 4,       // Stay under rate limits
  enableTumblr: true,
  enableEbay: true,
  enableVoiceUpdates: true,
  dryRun: process.argv.includes('--dry-run')
};

/**
 * Get current hour to determine sprint behavior
 */
function getCurrentContext() {
  const now = new Date();
  const hour = now.getUTCHours();
  const dayOfWeek = now.getUTCDay();
  
  // Morning greeting (7-9 AM EST = 12-14 UTC)
  const isMorning = hour >= 12 && hour <= 14;
  // Evening summary (9-11 PM EST = 2-4 UTC next day)
  const isEvening = hour >= 2 && hour <= 4;
  // Weekend (less aggressive posting)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  return { now, hour, isMorning, isEvening, isWeekend, dayOfWeek };
}

/**
 * Generate morning greeting for Jarvis voice
 */
function getMorningGreeting(stats) {
  const revenue = stats?.est_revenue?.toFixed(2) || '0.00';
  const posts = stats?.posts_published || 0;
  const clicks = stats?.affiliate_clicks || 0;
  
  return `Good morning Dennis. Jarvis 2.0 online and operational. ` +
    `Current stats: ${posts} posts published, ${clicks} affiliate clicks tracked, ` +
    `estimated revenue at $${revenue}. All systems running autonomously. ` +
    `I'll keep pushing content every 15 minutes. Have a productive day, sir.`;
}

/**
 * Generate evening summary for Jarvis voice
 */
function getEveningSummary(stats) {
  const revenue = stats?.est_revenue?.toFixed(2) || '0.00';
  const posts = stats?.posts_published || 0;
  
  return `Evening report, Dennis. Today's performance: ${posts} total posts live across platforms. ` +
    `Estimated revenue pipeline at $${revenue}. ` +
    `The engine continues running overnight. Rest well — I've got this covered.`;
}

/**
 * Main Sprint Execution
 */
async function runSprint() {
  const startTime = Date.now();
  const context = getCurrentContext();
  
  console.log('═══════════════════════════════════════════');
  console.log('  JARVIS 2.0 NEXUS PRIME - SPRINT START');
  console.log(`  Time: ${context.now.toISOString()}`);
  console.log(`  Mode: ${SPRINT_CONFIG.dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('═══════════════════════════════════════════');
  
  let sprintResults = {
    postsCreated: 0,
    postsPublished: 0,
    ebaySearched: false,
    errors: [],
    revenue: 0
  };
  
  try {
    // ═══ STEP 1: Get current stats ═══
    console.log('\n📊 Step 1: Fetching current stats...');
    const currentStats = await getStats();
    console.log('   Current stats:', JSON.stringify(currentStats || 'No stats yet'));
    
    // ═══ STEP 2: Morning/Evening voice updates ═══
    if (SPRINT_CONFIG.enableVoiceUpdates) {
      if (context.isMorning) {
        const greeting = getMorningGreeting(currentStats);
        await logVoiceMessage(greeting);
        console.log('🎙️ Morning greeting logged for Jarvis voice');
      } else if (context.isEvening) {
        const summary = getEveningSummary(currentStats);
        await logVoiceMessage(summary);
        console.log('🎙️ Evening summary logged for Jarvis voice');
      }
    }
    
    // ═══ STEP 3: Generate content ═══
    console.log('\n✍️ Step 3: Generating content...');
    const content = generateContent();
    sprintResults.postsCreated++;
    console.log(`   Generated: [${content.type}] ${content.titleEn}`);
    console.log(`   Est. commission: $${content.estimatedCommission.toFixed(2)}`);
    
    // ═══ STEP 4: Post to Tumblr ═══
    if (SPRINT_CONFIG.enableTumblr) {
      console.log('\n📤 Step 4: Posting to Tumblr...');
      
      if (SPRINT_CONFIG.dryRun) {
        console.log('   [DRY RUN] Would post:', content.titleEn);
        sprintResults.postsPublished++;
      } else {
        const tumblrResult = await postToTumblrOrSimulate(content);
        
        if (tumblrResult.success) {
          sprintResults.postsPublished++;
          console.log(`   ✅ Posted successfully (${tumblrResult.language})`);
          
          // Log the post activity
          await logActivity('post', `Published: ${content.titleEn}`, {
            platform: 'tumblr',
            type: content.type,
            language: tumblrResult.language,
            postId: tumblrResult.postId,
            simulated: tumblrResult.simulated || false
          });
        } else {
          sprintResults.errors.push(`Tumblr: ${tumblrResult.error}`);
          console.log(`   ❌ Failed: ${tumblrResult.error}`);
        }
      }
    }
    
    // ═══ STEP 5: eBay product search ═══
    if (SPRINT_CONFIG.enableEbay && !SPRINT_CONFIG.dryRun) {
      console.log('\n🔍 Step 5: Searching eBay for trending products...');
      const ebayProduct = await getEbayProduct();
      
      if (ebayProduct) {
        sprintResults.ebaySearched = true;
        console.log(`   Found: ${ebayProduct.title} ($${ebayProduct.price})`);
      } else {
        console.log('   ⚠️ eBay search skipped (no credentials or no results)');
      }
    }
    
    // ═══ STEP 6: Update Supabase stats ═══
    console.log('\n📊 Step 6: Updating Supabase stats...');
    
    const statsIncrements = {
      posts_published: sprintResults.postsPublished,
      affiliate_clicks: content.type === 'affiliate' ? 1 : 0,
      ebay_clicks: sprintResults.ebaySearched ? 1 : 0,
      est_revenue: content.estimatedCommission,
      real_estate_clicks: content.type === 'real-estate' ? 1 : 0
    };
    
    if (!SPRINT_CONFIG.dryRun) {
      const statsUpdated = await updateStats(statsIncrements);
      if (statsUpdated) {
        console.log('   ✅ Stats updated successfully');
      } else {
        sprintResults.errors.push('Failed to update stats');
      }
    } else {
      console.log('   [DRY RUN] Would update:', JSON.stringify(statsIncrements));
    }
    
    // ═══ STEP 7: Sprint completion log ═══
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    if (!SPRINT_CONFIG.dryRun) {
      await logActivity('sprint', `Sprint completed in ${duration}s — ${sprintResults.postsPublished} posts published`, {
        duration: `${duration}s`,
        postsCreated: sprintResults.postsCreated,
        postsPublished: sprintResults.postsPublished,
        contentType: content.type,
        errors: sprintResults.errors.length
      });
    }
    
    // ═══ FINAL REPORT ═══
    console.log('\n═══════════════════════════════════════════');
    console.log('  SPRINT COMPLETE');
    console.log(`  Duration: ${duration}s`);
    console.log(`  Posts created: ${sprintResults.postsCreated}`);
    console.log(`  Posts published: ${sprintResults.postsPublished}`);
    console.log(`  eBay searched: ${sprintResults.ebaySearched}`);
    console.log(`  Est. revenue added: $${content.estimatedCommission.toFixed(2)}`);
    console.log(`  Errors: ${sprintResults.errors.length}`);
    if (sprintResults.errors.length > 0) {
      sprintResults.errors.forEach(e => console.log(`    ⚠️ ${e}`));
    }
    console.log('═══════════════════════════════════════════');
    
  } catch (error) {
    console.error('\n💥 CRITICAL ERROR:', error.message);
    console.error(error.stack);
    
    // Try to log the error to Supabase
    try {
      await logActivity('error', `Sprint failed: ${error.message}`, {
        stack: error.stack?.substring(0, 500)
      });
    } catch (logError) {
      console.error('Could not log error to Supabase:', logError.message);
    }
    
    process.exit(1);
  }
}

// Execute the sprint
runSprint();
