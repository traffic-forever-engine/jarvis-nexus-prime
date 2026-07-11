/**
 * Jarvis 2.0 Nexus Prime - Supabase Client
 * 
 * Handles all database operations.
 * 
 * ACTUAL SCHEMA:
 * - stats table: id (uuid), category (text), value (numeric), updated_at (timestamp)
 *   Categories: affiliate_clicks, pins_published, est_revenue, ebay_clicks, 
 *              posts_published, real_estate_clicks, real_estate_emails
 * - activity_log table: id (uuid), message (text), type (text), created_at (timestamp)
 * - leads table: id (uuid), name, email, phone, source, status, created_at
 * 
 * Required secrets:
 * - SUPABASE_URL
 * - SUPABASE_KEY (service_role key)
 */

import { createClient } from '@supabase/supabase-js';

let supabase = null;

/**
 * Initialize Supabase client
 */
function getClient() {
  if (supabase) return supabase;
  
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_KEY must be set');
  }
  
  supabase = createClient(url, key);
  return supabase;
}

/**
 * Get current stats (all categories)
 */
async function getStats() {
  const client = getClient();
  const { data, error } = await client
    .from('stats')
    .select('*');
  
  if (error) {
    console.error('❌ Failed to get stats:', error.message);
    return null;
  }
  
  // Convert array of {category, value} rows to a flat object
  const stats = {};
  if (data) {
    data.forEach(row => {
      stats[row.category] = Number(row.value) || 0;
      stats[`${row.category}_id`] = row.id;
    });
  }
  
  return stats;
}

/**
 * Update or create a stat category
 */
async function upsertStat(category, value) {
  const client = getClient();
  
  // Try to find existing row
  const { data: existing } = await client
    .from('stats')
    .select('id, value')
    .eq('category', category)
    .limit(1)
    .single();
  
  if (existing) {
    // Update existing
    const { error } = await client
      .from('stats')
      .update({ value: value, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    
    if (error) {
      console.error(`❌ Failed to update stat ${category}:`, error.message);
      return false;
    }
  } else {
    // Insert new
    const { error } = await client
      .from('stats')
      .insert({ category, value, updated_at: new Date().toISOString() });
    
    if (error) {
      console.error(`❌ Failed to insert stat ${category}:`, error.message);
      return false;
    }
  }
  
  return true;
}

/**
 * Update stats with increments
 */
async function updateStats(increments) {
  const current = await getStats();
  
  const updates = {
    affiliate_clicks: (current?.affiliate_clicks || 0) + (increments.affiliate_clicks || 0),
    ebay_clicks: (current?.ebay_clicks || 0) + (increments.ebay_clicks || 0),
    pins_published: (current?.pins_published || 0) + (increments.pins_published || 0),
    posts_published: (current?.posts_published || 0) + (increments.posts_published || 0),
    est_revenue: parseFloat(((current?.est_revenue || 0) + (increments.est_revenue || 0)).toFixed(2)),
    real_estate_clicks: (current?.real_estate_clicks || 0) + (increments.real_estate_clicks || 0),
    real_estate_emails: (current?.real_estate_emails || 0) + (increments.real_estate_emails || 0)
  };
  
  let allSuccess = true;
  for (const [category, value] of Object.entries(updates)) {
    if (value > 0 || current?.[category] !== undefined) {
      const success = await upsertStat(category, value);
      if (!success) allSuccess = false;
    }
  }
  
  // Also update a "last_sprint" category
  await upsertStat('last_sprint', Date.now());
  
  if (allSuccess) {
    console.log('📊 Stats updated:', JSON.stringify(updates));
  }
  
  return allSuccess;
}

/**
 * Log an activity entry
 * Types: 'post', 'voice', 'error', 'sprint', 'milestone'
 */
async function logActivity(type, message, metadata = {}) {
  const client = getClient();
  
  const entry = {
    type,
    message,
    created_at: new Date().toISOString()
  };
  
  const { error } = await client
    .from('activity_log')
    .insert(entry);
  
  if (error) {
    console.error('❌ Failed to log activity:', error.message);
    return false;
  }
  
  console.log(`📝 Activity logged: [${type}] ${message}`);
  return true;
}

/**
 * Log a voice message for Jarvis to speak on dashboard
 */
async function logVoiceMessage(message) {
  return await logActivity('voice', message);
}

/**
 * Insert a real estate lead
 */
async function insertLead(leadData) {
  const client = getClient();
  
  const { error } = await client
    .from('leads')
    .insert({
      name: leadData.name || 'Anonymous',
      email: leadData.email || '',
      phone: leadData.phone || '',
      source: leadData.source || 'organic',
      status: 'new',
      created_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('❌ Failed to insert lead:', error.message);
    return false;
  }
  
  return true;
}

export {
  getClient,
  getStats,
  updateStats,
  logActivity,
  logVoiceMessage,
  insertLead
};
