## Hosted Trust Center + CAIQ + Downloadable Security Packet

Implementation Plan (v1.0)

## 1. Objectives

### Primary Goals

- Reduce security questionnaire friction
- Accelerate Series B+ procurement cycles
- Establish enterprise trust posture
- Support “SOC 2 in progress” positioning
- Align security messaging with AI governance brand

### Non-Goals (For Now)

- Full SOC 2 automation
- FedRAMP alignment
- Live OSCAL ingestion pipelines
- Complex GRC tooling integration

## 2. Scope

This initiative includes:

1. Public Hosted Trust Center page
2. Downloadable Security Overview PDF
3. Completed CSA CAIQ (public or gated)
4. Control mapping matrix (SOC 2 aligned)
5. Subprocessor transparency page
6. Basic machine-readable control export (optional, static)
7. Internal compliance documentation repository

## 3. Architecture

Since our stack includes:

- Vercel (frontend hosting)
- Cloudflare (Workers, AI Gateway, Zero Trust, DLP)
- Stripe (billing)
- Neon (database)
- Google Workspace

The trust center will be:

- Static content deployed via Vercel
- Protected downloadable assets stored via Vercel or Cloudflare
- Optional gated access for CAIQ PDF
- No dynamic compliance engine required

## 4. Public Trust Center Structure

URL Structure

```
/trust
/trust/security
/trust/compliance
/trust/subprocessors
/trust/data-handling
/trust/downloads
```

## 5. Content Breakdown

### 5.1 /trust (Overview Page)

Include:

- Security philosophy
- High-level architecture diagram
- “SOC 2 Type I – Targeted QX 2026” (if applicable)
- Infrastructure provider statement
- Encryption overview
- Data minimization statement w/ mention of ZDR-by-default configs
- Contact james@trystereos.com email

Keep this page human-readable.

### 5.2 /trust/security

Document:

- Access control policy (summary)
- MFA enforcement
- RBAC implementation
- Secret management approach
- Logging & monitoring
- Incident response summary
- Change management process

Avoid internal-sensitive details. Focus on control existence.

### 5.3 /trust/data-handling

Define clearly:

- What data is processed
- What data is NOT stored
- Prompt retention policy
- Metadata logging policy
- Encryption in transit
- Encryption at rest
- Regional data handling

This page is critical for AI products.

### 5.4 /trust/compliance

Include:

- SOC 2 alignment statement
- CSA CAIQ completion status
- Control mapping summary
- ISO 27001 alignment statement (if applicable)
- Vendor SOC 2 reliance model explanation

Be transparent:

“This is not a certification page; this describes our alignment.”

### 5.5 /trust/subprocessors

Create a table:

Vendor
Vercel	UI hosting	Application traffic	US/EU
Cloudflare	Edge + AI routing	Request metadata	Global
Neon	Database	Application data	Region-specific
Stripe	Billing	Payment data	US

Update this page regularly.

## 6. CSA CAIQ Implementation

### Step 1: Complete CAIQ Internally

- Use CSA CAIQ v4
- Answer honestly
- Reference control IDs
- Map to internal policies

Email gated download. Send with Resend. 

## 7. Downloadable Security Packet (PDF)

Create a 10–15 page PDF titled:

“Security & Compliance Overview”

Include:

1. Company Overview
2. Product Architecture
3. Data Flow Diagram
4. Security Controls Summary
5. Access Management
6. Encryption Practices
7. Vendor Management
8. Incident Response
9. Compliance Alignment
10. Roadmap (SOC 2 timeline)

Design this just like the rest of the page in terms of colors and theme, but layout much inspired by https://trust.clickhouse.com/. 

## 9. Internal Documentation Required (Before Publishing)

Create internal docs for:

- Access control policy
- Incident response plan
- Vendor risk policy
- Change management
- Secure development lifecycle
- Data retention policy

Even if simplified. These form our SOC 2 foundation later.

## 10. Messaging Strategy

Do NOT say "We are SOC 2 compliant”. Instead say “We are aligned to SOC 2 security principles and preparing for formal audit.”

