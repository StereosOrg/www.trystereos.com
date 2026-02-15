import {
  pgTable,
  pgEnum,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────────────────────────

export const partnerTierEnum = pgEnum("partner_tier", [
  "bronze",
  "silver",
  "gold",
  "platinum",
]);

export const partnerStatusEnum = pgEnum("partner_status", [
  "pending",
  "active",
  "inactive",
  "suspended",
]);

export const partnerTypeEnum = pgEnum("partner_type", [
  "affiliate",
  "reseller",
  "integration",
  "strategic",
]);

export const referralTypeEnum = pgEnum("referral_type", ["click", "signup"]);

// ── Tables ─────────────────────────────────────────────────────────────

export const partners = pgTable(
  "Partner",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    partner_code: text("partner_code").unique().notNull(),
    tier: partnerTierEnum("tier").default("bronze").notNull(),
    status: partnerStatusEnum("status").default("pending").notNull(),
    audience_size: integer("audience_size"),
    industry: text("industry"),
    type: partnerTypeEnum("type"),
    image_url: text("image_url"),
    user_id: text("user_id"), // FK to BetterAuth user table
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    partnerCodeIdx: index("Partner_partner_code_idx").on(t.partner_code),
  })
);

export const referrals = pgTable(
  "Referral",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    partner_id: text("partner_id")
      .notNull()
      .references(() => partners.id),
    referral_type: referralTypeEnum("referral_type").notNull(),
    referred_email: text("referred_email"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    partnerIdIdx: index("Referral_partner_id_idx").on(t.partner_id),
  })
);
