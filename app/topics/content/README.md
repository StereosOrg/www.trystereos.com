# Topic Hubs for Programmatic SEO

This directory contains topic hubs for programmatic SEO. Each hub has one pillar page and 5-30 tightly related subpages with aggressive concept-based interlinking.

## Structure

```
app/topics/content/
├── spec-driven-development/    # Hub directory
│   ├── pillar.md               # Main pillar page
│   ├── writing-effective-specs.md
│   ├── llm-assisted-coding.md
│   ├── compliance-mapping.md
│   └── ...                     # 5-30 subpages
├── compliance/
│   ├── pillar.md
│   └── ...
├── security/
│   ├── pillar.md
│   └── ...
└── infrastructure/
    ├── pillar.md
    └── ...
```

## Creating a New Topic Hub

### 1. Create Hub Directory

```bash
mkdir app/topics/content/your-topic-name
```

### 2. Create Pillar Page

Create `pillar.md` with this frontmatter:

```markdown
---
title: "Your Topic Title"
heroTitle: "Complete Guide to Your Topic"
heroSubtitle: "Brief description of what readers will learn"
description: "One-sentence description"
metaDescription: "SEO meta description (150-160 chars)"
image: "/images/block/placeholder-dark-1.svg"
published: "2025-12-26"
keywords:
  - keyword 1
  - keyword 2
  - keyword 3

overview: |
  Main overview content in markdown.

  Can include multiple paragraphs, lists, etc.

keyBenefits: |
  Benefits content...

howItWorks: |
  How it works content...

bestPractices: |
  Best practices content...
---
```

### 3. Create Subpages

Create `your-subpage-name.md` files:

```markdown
---
title: "Subpage Title"
description: "One-sentence description"
published: "2025-12-26"
keywords:
  - keyword 1
  - keyword 2
relatedConcepts:
  - other-subpage-slug
  - another-subpage-slug
---

# Subpage Title

Your content here in markdown.

## Section Headers

Content...

## Code Examples

\`\`\`typescript
// Code examples work great
\`\`\`

## Next Steps

Link to related pages for aggressive interlinking.
```

## Aggressive Interlinking

The `relatedConcepts` field creates **bidirectional links**:

```markdown
# In writing-effective-specs.md
relatedConcepts:
  - llm-assisted-coding
  - compliance-mapping
```

This creates:
- Links FROM "writing-effective-specs" TO "llm-assisted-coding"
- Links FROM "llm-assisted-coding" BACK TO "writing-effective-specs" (automatic)

### Interlinking Best Practices

✅ **Link by Concept**: Connect pages that share concepts, not just keywords

**Example**: "Writing Effective Specs" relates to "LLM-Assisted Coding" because good specs enable better LLM output (conceptual connection)

❌ **Don't Link by Keyword**: Don't just link pages because they mention the same words

✅ **3-7 Related Concepts**: Each subpage should link to 3-7 others

❌ **Don't Link Everything**: Don't make every page link to every other page

✅ **Create Clusters**: Group related subpages
- Cluster 1: Spec writing → LLM coding → Code review
- Cluster 2: Compliance → Security → Audit trails

## URLs

Topic hubs create these URL patterns:

- Pillar page: `/topics/spec-driven-development`
- Subpage: `/topics/spec-driven-development/writing-effective-specs`

## SEO Benefits

### Pillar Page

- High-authority page ranking for broad topic
- Links to all related subpages
- Comprehensive content for topic overview

### Subpages

- Target long-tail keywords
- Deep dive into specific concepts
- Strong internal linking boosts authority

### Interlinking

- Distributes link equity across related pages
- Increases time on site (users explore related concepts)
- Signals to search engines that content is comprehensive

## Content Guidelines

### Pillar Page Length

- 2000-3000 words
- Comprehensive topic overview
- Links to all subpages

### Subpage Length

- 1000-2000 words
- Deep dive into specific concept
- Link to 3-7 related subpages

### Writing Style

- Clear, actionable content
- Code examples where relevant
- Avoid marketing fluff
- Focus on teaching concepts

## Example Topics

Current hubs:
- **Spec-Driven Development**: Formal specs, LLM coding, compliance
- **Compliance**: SOC 2, HIPAA, PCI-DSS engineering
- **Security**: Threat modeling, secure coding, testing
- **Infrastructure**: IaC, Terraform, Kubernetes, DevOps

Future hub ideas:
- **API Design**: REST, GraphQL, versioning, documentation
- **Database Architecture**: Schema design, migrations, performance
- **Testing Strategies**: Unit, integration, E2E, compliance testing
- **DevOps Practices**: CI/CD, deployment strategies, monitoring

## Development

### Local Development

```bash
npm run dev
```

Visit:
- http://localhost:3000/topics/spec-driven-development (pillar)
- http://localhost:3000/topics/spec-driven-development/writing-effective-specs (subpage)

### Build

```bash
npm run build
```

Sitemap automatically includes all topic hubs and subpages.

### Adding New Content

1. Create new `.md` file in hub directory
2. Add frontmatter with `title`, `description`, `relatedConcepts`
3. Write content
4. Link from related pages (add to their `relatedConcepts`)
5. Rebuild site

No code changes needed! The system automatically:
- Generates pages
- Creates navigation
- Builds interlinking
- Updates sitemap
