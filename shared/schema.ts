import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phoneNumber: varchar("phone_number"), // for founder identification
  isFounder: boolean("is_founder").default(false), // permanent free access
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  isSubscribed: boolean("is_subscribed").default(false),
  referralCode: varchar("referral_code"),
  referredBy: varchar("referred_by"),
  totalEarnings: integer("total_earnings").default(0),
  successfulReferrals: integer("successful_referrals").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Storage analysis data
export const storageAnalysis = pgTable("storage_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  totalStorage: integer("total_storage").notNull(), // in MB
  usedStorage: integer("used_storage").notNull(), // in MB
  photosSize: integer("photos_size").notNull(), // in MB
  downloadsSize: integer("downloads_size").notNull(), // in MB
  cacheSize: integer("cache_size").notNull(), // in MB
  musicSize: integer("music_size").notNull(), // in MB
  duplicatePhotos: integer("duplicate_photos").notNull(),
  oldDownloads: integer("old_downloads").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cleaning recommendations
export const cleaningRecommendations = pgTable("cleaning_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // 'duplicate_photos', 'old_downloads', 'cache_files', 'music_cache'
  title: text("title").notNull(),
  description: text("description").notNull(),
  sizeInMB: integer("size_in_mb").notNull(),
  fileCount: integer("file_count").notNull(),
  priority: integer("priority").notNull().default(1), // 1-5, higher is more important
  status: varchar("status").notNull().default('pending'), // 'pending', 'deleted', 'kept', 'skipped'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cleaning sessions to track progress
export const cleaningSessions = pgTable("cleaning_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  totalItems: integer("total_items").notNull(),
  processedItems: integer("processed_items").notNull().default(0),
  deletedItems: integer("deleted_items").notNull().default(0),
  keptItems: integer("kept_items").notNull().default(0),
  spaceSavedMB: integer("space_saved_mb").notNull().default(0),
  status: varchar("status").notNull().default('active'), // 'active', 'completed', 'paused'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Referral tracking table
export const referrals = pgTable("referrals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerId: varchar("referrer_id").notNull().references(() => users.id),
  referredUserId: varchar("referred_user_id").references(() => users.id),
  referralCode: varchar("referral_code").notNull(),
  status: varchar("status").notNull().default('pending'), // 'pending', 'completed', 'cancelled'
  rewardAmount: integer("reward_amount").default(1000), // $10.00 in cents
  paidOut: boolean("paid_out").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Revenue analytics table
export const revenueMetrics = pgTable("revenue_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  totalRevenue: integer("total_revenue").notNull(), // in cents
  newSubscribers: integer("new_subscribers").notNull(),
  churnedSubscribers: integer("churned_subscribers").notNull(),
  activeSubscribers: integer("active_subscribers").notNull(),
  conversionRate: varchar("conversion_rate"), // stored as percentage string
  arpu: integer("arpu"), // average revenue per user in cents
  createdAt: timestamp("created_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type RevenueMetric = typeof revenueMetrics.$inferSelect;

// Media organization tables
export const mediaFolders = pgTable("media_folders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // 'photos', 'videos', 'custom'
  path: varchar("path").notNull(),
  itemCount: integer("item_count").default(0),
  totalSize: bigint("total_size", { mode: "number" }).default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mediaItems = pgTable("media_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  folderId: varchar("folder_id").references(() => mediaFolders.id),
  originalPath: varchar("original_path").notNull(),
  fileName: varchar("file_name").notNull(),
  fileType: varchar("file_type").notNull(), // 'photo', 'video'
  mimeType: varchar("mime_type").notNull(),
  fileSize: bigint("file_size", { mode: "number" }).notNull(),
  resolution: varchar("resolution"), // e.g., "1920x1080"
  duration: integer("duration"), // for videos, in seconds
  dateTaken: timestamp("date_taken"),
  isProcessed: boolean("is_processed").default(false),
  isExported: boolean("is_exported").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exportSessions = pgTable("export_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  folderIds: varchar("folder_ids").array().notNull(),
  exportPath: varchar("export_path").notNull(),
  status: varchar("status").notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'
  totalItems: integer("total_items").default(0),
  processedItems: integer("processed_items").default(0),
  totalSize: bigint("total_size", { mode: "number" }).default(0),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export type MediaFolder = typeof mediaFolders.$inferSelect;
export type MediaItem = typeof mediaItems.$inferSelect;
export type ExportSession = typeof exportSessions.$inferSelect;
export type InsertMediaFolder = typeof mediaFolders.$inferInsert;
export type InsertMediaItem = typeof mediaItems.$inferInsert;
export type InsertExportSession = typeof exportSessions.$inferInsert;
export type StorageAnalysis = typeof storageAnalysis.$inferSelect;
export type InsertStorageAnalysis = typeof storageAnalysis.$inferInsert;
export type CleaningRecommendation = typeof cleaningRecommendations.$inferSelect;
export type InsertCleaningRecommendation = typeof cleaningRecommendations.$inferInsert;
export type CleaningSession = typeof cleaningSessions.$inferSelect;
export type InsertCleaningSession = typeof cleaningSessions.$inferInsert;

// Spam blocking tables
export const spamNumbers = pgTable("spam_numbers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phoneNumber: varchar("phone_number").notNull(),
  type: varchar("type").notNull(), // 'call', 'text', 'both'
  category: varchar("category").notNull(), // 'telemarketer', 'scam', 'robocall', 'unknown', 'custom'
  isBlocked: boolean("is_blocked").default(true),
  reportCount: integer("report_count").default(1),
  lastActivity: timestamp("last_activity").defaultNow(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const spamReports = pgTable("spam_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phoneNumber: varchar("phone_number").notNull(),
  reportType: varchar("report_type").notNull(), // 'spam_call', 'spam_text', 'scam', 'telemarketer'
  content: text("content"), // text message content or call description
  severity: varchar("severity").notNull().default('medium'), // 'low', 'medium', 'high', 'critical'
  isShared: boolean("is_shared").default(true), // share with community database
  createdAt: timestamp("created_at").defaultNow(),
});

export const blockedCalls = pgTable("blocked_calls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phoneNumber: varchar("phone_number").notNull(),
  callTime: timestamp("call_time").notNull(),
  duration: integer("duration").default(0), // seconds
  wasBlocked: boolean("was_blocked").default(true),
  blockReason: varchar("block_reason"), // 'spam_database', 'user_blocked', 'pattern_match'
  createdAt: timestamp("created_at").defaultNow(),
});

export const blockedTexts = pgTable("blocked_texts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phoneNumber: varchar("phone_number").notNull(),
  messageContent: text("message_content"),
  receivedTime: timestamp("received_time").notNull(),
  wasBlocked: boolean("was_blocked").default(true),
  blockReason: varchar("block_reason"), // 'spam_keywords', 'known_spammer', 'user_blocked'
  spamScore: integer("spam_score"), // 1-100, confidence level
  createdAt: timestamp("created_at").defaultNow(),
});

export type SpamNumber = typeof spamNumbers.$inferSelect;
export type SpamReport = typeof spamReports.$inferSelect;
export type BlockedCall = typeof blockedCalls.$inferSelect;
export type BlockedText = typeof blockedTexts.$inferSelect;
export type InsertSpamNumber = typeof spamNumbers.$inferInsert;
export type InsertSpamReport = typeof spamReports.$inferInsert;
export type InsertBlockedCall = typeof blockedCalls.$inferInsert;
export type InsertBlockedText = typeof blockedTexts.$inferInsert;

// Spy detection and caller identification tables
export const callerIdentification = pgTable("caller_identification", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  phoneNumber: varchar("phone_number").notNull(),
  callerName: varchar("caller_name"),
  callerType: varchar("caller_type"), // 'business', 'personal', 'scam', 'telemarketer', 'government', 'unknown'
  companyName: varchar("company_name"),
  location: varchar("location"), // City, State format
  country: varchar("country"),
  carrierName: varchar("carrier_name"),
  lineType: varchar("line_type"), // 'mobile', 'landline', 'voip', 'toll_free'
  trustScore: integer("trust_score"), // 1-100, higher is more trustworthy
  riskLevel: varchar("risk_level").default('low'), // 'low', 'medium', 'high', 'critical'
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ipTracking = pgTable("ip_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  ipAddress: varchar("ip_address").notNull(),
  hostname: varchar("hostname"),
  location: varchar("location"), // City, State, Country
  coordinates: varchar("coordinates"), // lat,lng format
  isp: varchar("isp"), // Internet Service Provider
  organization: varchar("organization"),
  connectionType: varchar("connection_type"), // 'residential', 'business', 'mobile', 'hosting'
  threatLevel: varchar("threat_level").default('none'), // 'none', 'low', 'medium', 'high', 'critical'
  isVpn: boolean("is_vpn").default(false),
  isProxy: boolean("is_proxy").default(false),
  isTor: boolean("is_tor").default(false),
  reputationScore: integer("reputation_score"), // 1-100, lower is more suspicious
  lastSeen: timestamp("last_seen").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const spyDetection = pgTable("spy_detection", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  detectionType: varchar("detection_type").notNull(), // 'suspicious_call', 'ip_anomaly', 'behavior_pattern', 'known_threat'
  sourceIdentifier: varchar("source_identifier").notNull(), // phone number or IP address
  threatLevel: varchar("threat_level").notNull(), // 'low', 'medium', 'high', 'critical'
  detectionReason: text("detection_reason").notNull(),
  additionalData: jsonb("additional_data"), // flexible storage for detection metadata
  isResolved: boolean("is_resolved").default(false),
  actionTaken: varchar("action_taken"), // 'blocked', 'monitored', 'reported', 'ignored'
  confidence: integer("confidence"), // 1-100, confidence level of detection
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const securityAlerts = pgTable("security_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  alertType: varchar("alert_type").notNull(), // 'spy_detected', 'suspicious_activity', 'data_breach', 'location_anomaly'
  severity: varchar("severity").notNull(), // 'info', 'warning', 'danger', 'critical'
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  sourceType: varchar("source_type"), // 'phone', 'ip', 'app', 'system'
  sourceValue: varchar("source_value"), // the specific phone/IP/etc
  isRead: boolean("is_read").default(false),
  isDismissed: boolean("is_dismissed").default(false),
  actionRequired: boolean("action_required").default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at"),
  dismissedAt: timestamp("dismissed_at"),
});

export type CallerIdentification = typeof callerIdentification.$inferSelect;
export type IpTracking = typeof ipTracking.$inferSelect;
export type SpyDetection = typeof spyDetection.$inferSelect;
export type SecurityAlert = typeof securityAlerts.$inferSelect;
export type InsertCallerIdentification = typeof callerIdentification.$inferInsert;
export type InsertIpTracking = typeof ipTracking.$inferInsert;
export type InsertSpyDetection = typeof spyDetection.$inferInsert;
export type InsertSecurityAlert = typeof securityAlerts.$inferInsert;

export const insertStorageAnalysisSchema = createInsertSchema(storageAnalysis).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCleaningRecommendationSchema = createInsertSchema(cleaningRecommendations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCleaningSessionSchema = createInsertSchema(cleaningSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
