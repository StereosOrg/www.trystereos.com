import {
  pgTable,
  pgEnum,
  text,
  integer,
  decimal,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────────────────────────

export const partnerTierEnum = pgEnum("partner_tier", [
  "bronze",
  "silver",
  "gold",
]);

export const partnerStatusEnum = pgEnum("partner_status", [
  "pending",
  "active",
  "inactive",
]);

export const referralStatusEnum = pgEnum("referral_status", [
  "pending",
  "converted",
  "churned",
]);

export const partnerTypeEnum = pgEnum("partner_type", [
  "Individual",
  "Organization",
  "Government Agency",
]);

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
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    partnerCodeIdx: index("Partner_partner_code_idx").on(t.partner_code),
  })
);

export const partnerTierConfig = pgTable(
  "PartnerTierConfig",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tier: partnerTierEnum("tier").notNull(),
    min_conversions: integer("min_conversions").default(0).notNull(),
    commission_flat_usd: decimal("commission_flat_usd", {
      precision: 10,
      scale: 2,
    })
      .default("0")
      .notNull(),
    benefits: jsonb("benefits"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    tierIdx: uniqueIndex("PartnerTierConfig_tier_idx").on(t.tier),
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
      .references(() => partners.id, { onDelete: "cascade" }),
    customer_id: text("customer_id").notNull(),
    referred_at: timestamp("referred_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    status: referralStatusEnum("status").default("pending").notNull(),
    converted_at: timestamp("converted_at", { withTimezone: true }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    partnerIdx: index("Referral_partner_id_idx").on(t.partner_id),
    customerIdx: uniqueIndex("Referral_customer_id_idx").on(t.customer_id),
  })
);
