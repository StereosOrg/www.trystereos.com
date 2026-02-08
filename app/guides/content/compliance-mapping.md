---
title: "Enterprise Compliance Mapping: Specification to Regulation Traceability"
description: "Transform compliance from audit burden to competitive advantage through systematic specification-to-regulation mapping and automated evidence generation"
published: "2025-12-26"
image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop"
topic: "spec-driven-development"
keywords:
  - compliance documentation
  - regulatory requirements
  - SOC 2 compliance
  - HIPAA compliance
  - PCI-DSS compliance
  - audit preparation
  - compliance automation
  - regulatory traceability
relatedConcepts:
  - writing-effective-specs
  - llm-assisted-coding
---

Compliance failures in regulated industries trigger existential consequences: business shutdowns, contract terminations, revenue loss, reputational damage. Organizations implementing systematic specification-to-regulation mapping report transformative outcomes: audit preparation reduced from weeks to days, first-time audit pass rates exceeding 95%, compliance costs reduced 40-60%.

This isn't compliance theater—it's compliance engineering.

## The Traditional Compliance Crisis

**Traditional Approach: Retrofit Compliance**

Phase 1: Build product → Phase 2: Realize compliance needed → Phase 3: Retrofit controls → Phase 4: Fail audit → Phase 5: Emergency remediation

**Outcomes**:
- Audit preparation: 3-4 weeks of senior engineering time
- First-time pass rate: 60-70%
- Retrofit costs: 3-5x proactive compliance
- Time to certification: 12-18 months

**Specification-Driven Approach: Compliance by Design**

Phase 1: Map requirements to specs → Phase 2: Build with controls integrated → Phase 3: Export evidence → Phase 4: Pass audit

**Outcomes**:
- Audit preparation: 2-3 days
- First-time pass rate: 95%+
- Compliance costs: -40% to -60%
- Time to certification: 6 months

> **Strategic Principle**: Compliance controls are functional requirements, not separate concerns. Architect them from inception, not retrofit post-development.

---

## Strategic Value: Compliance as Revenue Enabler

### Accelerated Certification Timelines

| Approach | Timeline | Result |
|----------|----------|--------|
| **Traditional** | Months 1-12: Build without compliance<br>Months 13-18: Retrofit & certify | 18 months to certification |
| **Specification-Driven** | Months 1-5: Build with compliance<br>Month 6: Certify | 6 months to certification |

**Value**: 12-month earlier enterprise revenue, competitive advantage in sales cycles.

### Dramatic Audit Cost Reduction

| Activity | Traditional Cost | Spec-Driven Cost | Savings |
|----------|-----------------|------------------|---------|
| Evidence gathering | $48,000 (4 weeks) | $2,400 (2 days) | 95% reduction |
| Remediation | $18,000 (avg 15 findings) | $1,200 (avg 2 findings) | 93% reduction |
| External audit | $35,000 | $35,000 | - |
| **Single framework** | **$111,000/year** | **$47,600/year** | **57% reduction** |
| **Three frameworks** | **$333,000/year** | **$95,000/year** | **71% reduction ($238K)** |

**ROI**: Payback period <3 months. 5-year value: $1.19M+ in reduced compliance costs.

### Competitive Differentiation

**Enterprise procurement requirements**:
- SOC 2 Type II report? → Instant response vs. "not yet certified"
- Security questionnaire (300 questions)? → Auto-generated vs. weeks of manual work
- Custom compliance evidence? → Export compliance package vs. scramble to compile

**Result**: Win deals competitors can't bid on. Premium pricing justified by demonstrable security posture.

---

## Enterprise Compliance Mapping Methodology

### Phase 1: Regulatory Landscape Analysis

Identify all applicable frameworks systematically:

**Framework Categories**:

| Category | Examples | Trigger |
|----------|----------|---------|
| **Industry-Specific** | PCI-DSS, HIPAA, FedRAMP, FINRA, SOX | Payment processing, healthcare, government, finance |
| **Geography-Specific** | GDPR, CCPA/CPRA, PIPEDA, LGPD | EU customers, California residents, Canadian operations |
| **Certification Standards** | SOC 2, ISO 27001, ISO 27017 | Enterprise customer requirements, competitive differentiation |
| **Contractual** | Customer-specific security requirements | Enterprise contracts, partner agreements |

**Applicability Matrix Example**:

| Framework | Applies? | Trigger | Certification? | Renewal |
|-----------|----------|---------|---------------|---------|
| PCI-DSS L1 | ✅ | >6M transactions/year | Annual audit | Annual |
| SOC 2 Type II | ✅ | Enterprise customers | Annual audit | Annual |
| HIPAA | ✅ | Process PHI | Attestation only | Ongoing |
| GDPR | ✅ | EU customer data | Compliance required | Ongoing |
| ISO 27001 | ⚠️ Optional | Competitive edge | 3-year certification | 3-year cycle |

### Phase 2: Control Mapping & Traceability Matrix

Transform high-level regulations into specific, verifiable technical controls:

**Traceability Matrix Structure**:

| Control ID | Regulation | Requirement Summary | Specification | Implementation | Verification | Status |
|------------|-----------|---------------------|---------------|----------------|--------------|--------|
| CTRL-001 | PCI-DSS 3.4 | Encrypt cardholder data | `specs/payment.md#SEC-008` | `CardEncryption.ts` | `pci-3.4.test.ts` | ✅ |
| CTRL-002 | SOC 2 CC6.1 | Access controls | `specs/access.md` | `AccessControl.ts` | `rbac.test.ts` | ✅ |
| CTRL-003 | PCI-DSS 10.2.1 | Audit logging | `specs/audit.md#FR-024` | `AuditLogger.ts` | `audit.test.ts` | ✅ |
| CTRL-004 | HIPAA 164.308 | Workforce authorization | `specs/workforce.md` | `Authorization.ts` | `hipaa.test.ts` | ✅ |
| CTRL-005 | GDPR Art. 25 | Privacy by design | `specs/privacy.md` | Multiple services | `gdpr-art25.test.ts` | ✅ |

**Benefits**:
1. **Audit Preparation**: Export matrix as evidence package
2. **Gap Analysis**: Identify missing implementations instantly
3. **Impact Analysis**: When regulations change, find affected systems immediately
4. **Evidence Generation**: Automated collection of test results and artifacts

### Phase 3: Embed Compliance in Specifications

**Before: Separate Compliance Documentation**
```markdown
Feature: Payment processing
- Accept credit cards
- Process payments
- Return confirmation

(Compliance team scrambles to document controls post-implementation)
```

**After: Integrated Compliance Specifications**
```markdown
## Feature: Payment Card Data Storage

**Regulatory Requirements:**
- PCI-DSS 3.4: Render PAN unreadable (tokenization + encryption)
- SOC 2 CC6.1: Access controls (RBAC, principle of least privilege)
- GDPR Art. 32: Security of processing (AES-256-GCM encryption)

**Data Model (CTRL-001: PCI-DSS 3.4)**
```typescript
interface StoredCardData {
  encryptedToken: string    // Never raw PAN
  lastFour: string          // Display only (allowed per PCI-DSS)
  // PROHIBITED: cardNumber, cvv (never store)
}
```

**Access Control (CTRL-002: SOC 2 CC6.1)**
- ADMIN: Full access
- FINANCE: Read for refunds/chargebacks
- SUPPORT: Last 4 digits only
- DEVELOPER: No production access
```

**Result**: Compliance requirements become architectural constraints before implementation begins.

---

## Framework-Specific Mapping Patterns

### PCI-DSS: Payment Card Data Protection

**High-Level Requirement**: Protect stored cardholder data (Requirement 3)

**Technical Control Mapping**:

| PCI-DSS Requirement | Technical Control | Verification Method |
|---------------------|-------------------|---------------------|
| **3.4**: Render PAN unreadable | Tokenization + AES-256-GCM encryption | Database scan: No plaintext PAN |
| **3.5**: Key management procedures | AWS KMS with quarterly rotation | Key rotation logs |
| **3.6**: Key management documentation | Documented rotation procedures | Runbook review |
| **10.2**: Audit all access to cardholder data | Structured logging with user identity | Audit log completeness test |

**Implementation Pattern**:
```typescript
// Data model prevents PCI violations at compile time
interface CardData {
  encryptedToken: string    // ✅ Compliant: encrypted
  lastFour: string          // ✅ Compliant: truncated
  // ❌ PROHIBITED: Never define:
  // cardNumber: string     // PCI-DSS 3.4 violation
  // cvv: string            // Never store CVV post-auth
}
```

### SOC 2: Trust Services Criteria

**CC6.1: Logical and Physical Access Controls**

**Modern Approach: Policy-as-Code with Cedar**

AWS Cedar provides a declarative policy language that makes RBAC compliance verifiable and auditable:

```cedar
// SOC 2 CC6.1: Payment data access control policies
// These policies are version-controlled, testable, and generate audit evidence

// ADMIN role: Full access
permit(
  principal in Role::"ADMIN",
  action in [Action::"read", Action::"write", Action::"delete"],
  resource in PaymentData
);

// FINANCE role: Read/write for refunds and chargebacks
permit(
  principal in Role::"FINANCE",
  action in [Action::"read", Action::"write"],
  resource in PaymentData
) when {
  context.purpose in ["refund", "chargeback"]
};

// SUPPORT role: Limited read access (last 4 digits only)
permit(
  principal in Role::"SUPPORT",
  action == Action::"read",
  resource in PaymentData::MaskedView
);

// DEVELOPER role: Explicitly denied production access (separation of duties)
forbid(
  principal in Role::"DEVELOPER",
  action in [Action::"read", Action::"write", Action::"delete"],
  resource in PaymentData::Production
);
```

**Benefits of Cedar for Compliance**:
- **Declarative**: Policies express intent, not implementation
- **Verifiable**: Automated analysis proves policies satisfy requirements
- **Auditable**: Version-controlled policies serve as compliance evidence
- **Testable**: Policy tests verify SOC 2 controls before deployment

### HIPAA: Protected Health Information

**Privacy Rule: Minimum Necessary Standard (164.502(b))**

**Cedar Policies for Minimum Necessary Access**:

```cedar
// HIPAA 164.502(b): Minimum necessary PHI access
// Policies enforce job-function-based access restrictions

// DOCTOR: Full patient record access (clinical necessity)
permit(
  principal in Role::"DOCTOR",
  action == Action::"read",
  resource in PatientRecord
) when {
  resource.assignedProvider == principal ||
  context.reason == "clinical_consultation"
};

// NURSE: Limited to treatment-relevant data only
permit(
  principal in Role::"NURSE",
  action == Action::"read",
  resource in PatientRecord
) when {
  resource.currentTreatmentTeam.contains(principal)
}
unless {
  resource.dataType in ["billing_info", "insurance_details"]
};

// BILLING: Only insurance and financial data (minimum necessary)
permit(
  principal in Role::"BILLING",
  action == Action::"read",
  resource in PatientRecord
) when {
  resource.dataType in ["insurance", "charges", "patient_id"]
}
unless {
  resource.dataType in ["medications", "diagnoses", "treatment_notes"]
};

// SUPPORT: No PHI access (not necessary for job function)
forbid(
  principal in Role::"SUPPORT",
  action in [Action::"read", Action::"write"],
  resource in PatientRecord::PHI
);
```

**Policy Verification for HIPAA**:
```typescript
// Automated tests verify minimum necessary compliance
test('HIPAA 164.502(b): Minimum necessary enforced', () => {
  const nurseAccess = evaluateCedarPolicy({
    principal: { type: "Role", id: "NURSE" },
    action: "read",
    resource: { type: "PatientRecord", dataType: "billing_info" }
  })

  expect(nurseAccess.decision).toBe("DENY")  // Billing info not necessary for nursing
})
```

### GDPR: Data Protection by Design

**Article 25: Data Protection by Design and Default**

**Specification Pattern**:
```markdown
## Privacy by Design (GDPR Art. 25)

**Requirement**: Implement appropriate technical measures to ensure data protection

**Design Principles**:
1. **Data Minimization**: Collect only required fields
2. **Purpose Limitation**: Process data only for stated purposes
3. **Storage Limitation**: Delete data when no longer needed
4. **Security**: Encrypt personal data at rest and in transit

**Implementation Verification**:
- Privacy Impact Assessment (PIA) completed
- Data retention policies automated
- Encryption verified via compliance tests
```

---

## Automated Compliance Verification

### Compliance as Code with Policy Engines

**Traditional Approach**: Manual audit evidence gathering

**Modern Approach**: Policy-as-Code with Real-Time Synchronization

Organizations using Cedar policies need real-time policy distribution and data synchronization. **OPAL (Open Policy Administration Layer)** provides the infrastructure layer:

**OPAL Architecture for Compliance**:

```yaml
# OPAL keeps Cedar policies and authorization data synchronized
opal-server:
  policy-source: git://github.com/company/compliance-policies
  data-sources:
    - type: postgresql
      query: "SELECT role, permissions FROM user_roles"
      update-interval: 30s
    - type: kafka
      topic: "user-role-changes"
      real-time: true

opal-client:
  policy-store: cedar
  policy-updater:
    enabled: true
    webhook-url: /compliance/policy-updated
```

**Real-Time Compliance with OPAL**:

| Scenario | Traditional | OPAL + Cedar |
|----------|------------|--------------|
| **Employee termination** | Access revoked manually (hours/days) | Policy updated in <5 seconds via Kafka event |
| **Role change** | Manual permission updates | Automatic policy sync from HR system |
| **Regulatory change** | Manual policy updates across services | Git commit triggers policy distribution |
| **Audit evidence** | Manually compile policy snapshots | Automated policy version history |

**Compliance Verification Pipeline**:

```yaml
# CI/CD pipeline with policy verification
compliance-verification:
  cedar-policy-tests:
    - name: Verify SOC 2 CC6.1 access controls
      run: |
        cedar verify \
          --policies policies/soc2-access-control.cedar \
          --schema schema/payment-data.cedarschema

    - name: Verify HIPAA minimum necessary
      run: |
        cedar verify \
          --policies policies/hipaa-minimum-necessary.cedar \
          --schema schema/patient-records.cedarschema

  opal-deployment:
    - name: Deploy policies to production
      run: |
        opal-cli publish \
          --policy-bundle policies/ \
          --environment production

    - name: Verify policy propagation
      run: |
        opal-cli verify-sync --timeout 30s

**Benefits**:
- **Real-Time Policy Updates**: Changes propagate in seconds, not hours
- **Continuous Compliance**: Authorization data synced continuously
- **Audit Trail**: Every policy change tracked in Git
- **Evidence Generation**: Automated compliance reports from policy history

### Compliance Test Examples

Tests verify regulatory requirements, not just functionality. Each test maps directly to a compliance control, providing automated validation and audit evidence.

**Pattern**: Test name references control ID, assertion validates requirement, failure triggers compliance alert.

---

## Evidence Generation & Audit Preparation

### Automated Evidence Package Generation

**Traditional**: Weeks of manual evidence compilation

**Engineering Approach**: Automated evidence export

Compliance reports generate automatically from specification-to-implementation traceability matrix. Each control links to specification section, implementation files, test results, and runtime evidence.

**Evidence Package Contents**:

| Control | Specification | Implementation | Verification | Evidence |
|---------|--------------|----------------|--------------|----------|
| PCI-DSS 3.4 | `specs/payment.md#encryption` | `CardEncryption.ts` | `pci-3.4.test.ts` | Test results + DB scan |
| SOC 2 CC6.1 | `specs/access.md` | `AccessControl.ts` | `rbac.test.ts` | IAM policies + logs |
| HIPAA 164.308 | `specs/workforce.md` | `Authorization.ts` | `hipaa.test.ts` | Access logs + policies |

### Continuous Compliance Monitoring

**Pattern**: Monitor compliance 24/7 with Policy-as-Code

Modern compliance monitoring uses OPAL to ensure policies and authorization data remain synchronized in real-time, with Cedar policies enforcing regulatory requirements:

**Policy-Driven Compliance Monitoring**:

| What to Monitor | Framework | OPAL + Cedar Implementation |
|----------------|-----------|----------------------------|
| **Unauthorized access attempts** | SOC 2 CC6.1 | Cedar policy denials logged and aggregated |
| **Policy drift detection** | All frameworks | OPAL detects policy-data inconsistencies |
| **Role escalation** | SOC 2, HIPAA | Real-time alerts when role permissions change |
| **Access beyond minimum necessary** | HIPAA 164.502(b) | Cedar policy violations trigger compliance alerts |
| **Policy update propagation** | All frameworks | OPAL monitors policy sync latency across services |

**Real-Time Compliance with OPAL Monitoring**:

```typescript
// OPAL client monitors policy enforcement and data sync
class OPALComplianceMonitor {
  async monitorPolicyEnforcement() {
    // Subscribe to Cedar policy decision events
    opalClient.on('policy-decision', (event) => {
      if (event.decision === 'DENY') {
        // Log unauthorized access attempt
        this.auditLog.record({
          framework: this.identifyFramework(event.policy),
          violation: 'unauthorized_access_attempt',
          principal: event.principal,
          resource: event.resource,
          timestamp: new Date()
        })

        // Alert if pattern indicates attack
        if (this.isAnomalous(event.principal)) {
          this.alert({
            severity: 'high',
            message: 'Potential compliance violation detected',
            principal: event.principal,
            attempts: this.getRecentAttempts(event.principal)
          })
        }
      }
    })
  }

  async monitorPolicySynchronization() {
    // Verify OPAL keeps policies synchronized across all services
    const syncStatus = await opalClient.getSyncStatus()

    for (const service of syncStatus.services) {
      if (service.policyVersion !== syncStatus.latestVersion) {
        this.alert({
          severity: 'critical',
          message: 'Policy drift detected - service out of sync',
          service: service.name,
          currentVersion: service.policyVersion,
          expectedVersion: syncStatus.latestVersion,
          complianceRisk: 'Service may be enforcing outdated policies'
        })
      }
    }
  }

  async monitorDataFreshness() {
    // OPAL tracks authorization data freshness
    const dataStatus = await opalClient.getDataStatus()

    if (dataStatus.userRoles.lastUpdate > 60000) {  // >60s stale
      this.alert({
        severity: 'high',
        message: 'Authorization data stale',
        framework: 'SOC 2 CC6.1',
        risk: 'Role changes not reflected in access control'
      })
    }
  }
}
```

**Compliance Drift Detection**:

```typescript
// Detect when policies diverge from compliance requirements
async function detectComplianceDrift() {
  // Compare deployed Cedar policies against compliance baseline
  const deployedPolicies = await opalClient.getPolicies()
  const baselinePolicies = await loadBaselineFromGit('compliance/policies')

  const diffs = comparePolices(deployedPolicies, baselinePolicies)

  if (diffs.length > 0) {
    return {
      status: 'DRIFT_DETECTED',
      severity: 'critical',
      message: 'Deployed policies differ from compliance baseline',
      frameworks: ['SOC 2', 'HIPAA', 'PCI-DSS'],
      differences: diffs,
      remediation: 'Redeploy baseline policies via OPAL'
    }
  }
}
```

---

## Measuring Compliance Effectiveness

### Key Metrics

| Metric | Target | Strategic Value |
|--------|--------|-----------------|
| **Audit Prep Time** | <2 days | Engineering time freed for product work |
| **First-Time Pass Rate** | >95% | Demonstrates control effectiveness |
| **Evidence Generation** | <1 hour | Rapid auditor response |
| **Control Coverage** | 100% | Complete regulatory compliance |
| **Time to Remediation** | <7 days | Responsive compliance program |
| **Violation Rate** | 0 | Proactive vs. reactive compliance |

### ROI Analysis

**Investment**: Specification-driven compliance engineering

| Cost Component | One-Time | Annual |
|----------------|----------|--------|
| Specification embedding | $3,000 | - |
| Automated verification setup | $6,000 | - |
| Audit preparation | - | $2,400 |
| Remediation (minimal findings) | - | $1,200 |
| External audits (3 frameworks) | - | $105,000 |
| **Total** | **$9,000** | **$108,600** |

**Traditional Approach Annual Cost**: $333,000

**Annual Savings**: $238,000 (71% reduction)
**Payback Period**: <3 months
**5-Year Value**: $1.19M+

---

## Common Anti-Patterns & Remediation

### Anti-Pattern 1: Compliance Theater

**Symptoms**:
- Documentation exists but doesn't reflect actual implementation
- Controls documented but not enforced
- Evidence manually fabricated before audits

**Consequences**: Audit failures, regulatory violations, potential business shutdown

**Remediation**:
- Implement spec → code → test → evidence traceability
- Make compliance tests fail builds when violated
- Automate evidence generation (no manual fabrication possible)

### Anti-Pattern 2: Point-in-Time Compliance

**Symptoms**:
- Compliance only verified before audits
- No continuous monitoring
- Violations undetected for months

**Consequences**: Compliance drift, higher remediation costs, regulatory risk

**Remediation**:
- Continuous compliance monitoring
- Automated daily/weekly verification
- Real-time alerting on violations
- Compliance dashboards showing current posture

### Anti-Pattern 3: Siloed Compliance Teams

**Symptoms**:
- Compliance separate from engineering
- Reviews happen after implementation
- Adversarial relationship

**Consequences**: Retrofit compliance, architectural changes, development delays

**Remediation**:
- Embed compliance in specifications (engineering reviews requirements upfront)
- Joint engineering/compliance design sessions
- Compliance champions within engineering teams

---

## Strategic Outcomes

Organizations mastering specification-to-regulation mapping with modern policy-as-code achieve:

### Development Velocity
**50% faster time-to-certification** through automated policy verification and deployment. Cedar policies enable LLM-assisted generation of compliant authorization logic.

### Cost Reduction
**40-60% lower compliance costs** through automation and proactive design. OPAL eliminates manual policy distribution overhead across microservices.

### Competitive Advantage
**Instant security questionnaire responses** win deals competitors can't bid on. Git-tracked Cedar policies provide auditor-ready evidence of compliance controls.

### Risk Mitigation
**Real-time policy synchronization** via OPAL prevents violations before auditors discover them. Authorization decisions logged for forensic analysis.

### Scalable Compliance
**Policy-as-code architecture** supports multiple frameworks efficiently. Single Cedar policy set enforces SOC 2, HIPAA, PCI-DSS simultaneously.

### Operational Excellence

**Policy-as-Code Benefits**:

| Metric | Traditional RBAC | Cedar + OPAL | Improvement |
|--------|-----------------|--------------|-------------|
| **Policy update propagation** | Hours to days (manual) | <5 seconds (automated) | 99.9% faster |
| **Access revocation (termination)** | 2-8 hours | <5 seconds | Real-time |
| **Compliance evidence generation** | Weeks (manual) | Minutes (automated) | 99% reduction |
| **Policy testing coverage** | ~20% (manual) | >95% (automated) | 5x improvement |
| **Audit preparation** | 3-4 weeks | 2-3 days | 90% reduction |

---

## The Paradigm Shift

**Traditional Compliance**: Build product → Discover compliance needed → Retrofit controls → Hope auditors approve

**Compliance Engineering**: Map regulations to specs → Build with controls → Export evidence → Pass audit

The specification becomes compliance documentation.
Implementation satisfies specifications.
Tests verify compliance.
Evidence generates automatically.
Audits become verification exercises, not discovery processes.

This isn't compliance overhead—it's engineered regulatory adherence that enables business velocity.

---

## Reference Implementation

**Automated Compliance Report Generation**:

```typescript
async function generateComplianceReport(framework: 'PCI-DSS' | 'SOC2' | 'HIPAA') {
  const report = {
    framework,
    generatedAt: new Date(),
    controls: []
  }

  for (const control of frameworkControls[framework]) {
    report.controls.push({
      id: control.id,
      requirement: control.description,
      specification: findSpecSection(control.id),
      implementation: findImplementationFiles(control.id),
      tests: findTestResults(control.id),
      evidence: await collectEvidence(control.id)
    })
  }

  return generateAuditReadyPDF(report)
}
```

**OPAL Compliance Monitoring**:

```typescript
class OPALComplianceMonitor {
  async monitorPolicyEnforcement() {
    // Subscribe to Cedar policy decision events
    opalClient.on('policy-decision', (event) => {
      if (event.decision === 'DENY') {
        // Log unauthorized access attempt
        this.auditLog.record({
          framework: this.identifyFramework(event.policy),
          violation: 'unauthorized_access_attempt',
          principal: event.principal,
          resource: event.resource,
          timestamp: new Date()
        })

        // Alert if pattern indicates attack
        if (this.isAnomalous(event.principal)) {
          this.alert({
            severity: 'high',
            message: 'Potential compliance violation detected',
            principal: event.principal,
            attempts: this.getRecentAttempts(event.principal)
          })
        }
      }
    })
  }

  async monitorPolicySynchronization() {
    // Verify OPAL keeps policies synchronized across all services
    const syncStatus = await opalClient.getSyncStatus()

    for (const service of syncStatus.services) {
      if (service.policyVersion !== syncStatus.latestVersion) {
        this.alert({
          severity: 'critical',
          message: 'Policy drift detected - service out of sync',
          service: service.name,
          currentVersion: service.policyVersion,
          expectedVersion: syncStatus.latestVersion,
          complianceRisk: 'Service may be enforcing outdated policies'
        })
      }
    }
  }

  async monitorDataFreshness() {
    // OPAL tracks authorization data freshness
    const dataStatus = await opalClient.getDataStatus()

    if (dataStatus.userRoles.lastUpdate > 60000) {  // >60s stale
      this.alert({
        severity: 'high',
        message: 'Authorization data stale',
        framework: 'SOC 2 CC6.1',
        risk: 'Role changes not reflected in access control'
      })
    }
  }
}
```

**Compliance Drift Detection**:

```typescript
async function detectComplianceDrift() {
  // Compare deployed Cedar policies against compliance baseline
  const deployedPolicies = await opalClient.getPolicies()
  const baselinePolicies = await loadBaselineFromGit('compliance/policies')

  const diffs = comparePolices(deployedPolicies, baselinePolicies)

  if (diffs.length > 0) {
    return {
      status: 'DRIFT_DETECTED',
      severity: 'critical',
      message: 'Deployed policies differ from compliance baseline',
      frameworks: ['SOC 2', 'HIPAA', 'PCI-DSS'],
      differences: diffs,
      remediation: 'Redeploy baseline policies via OPAL'
    }
  }
}
```

**Compliance Test Suite**:

```typescript
// PCI-DSS 3.4: No plaintext card numbers
test('should never store plaintext PAN', async () => {
  const testCard = { number: '4111111111111111' }
  await payments.createCard(testCard)

  const stored = await db.query('SELECT * FROM cards')

  expect(stored[0].number).not.toContain('4111')
  expect(stored[0].number).toMatch(/^tok_/)  // Must be tokenized
})

// PCI-DSS 10.2: Audit all access
test('should log all card access attempts', async () => {
  await payments.getCard('card_123')

  const logs = await auditLog.getRecent()
  expect(logs).toContainEqual(
    expect.objectContaining({
      action: 'card.accessed',
      userId: expect.any(String),
      timestamp: expect.any(Date)
    })
  )
})

// SOC 2 CC6.1: Access control enforcement
test('should deny unauthorized access', async () => {
  const supportUser = { role: 'SUPPORT' }

  // Support should NOT access full card data
  await expect(
    accessControl.checkAccess(supportUser, 'read', 'full_card_data')
  ).rejects.toThrow('Insufficient permissions')
})
```

---

## Continue Learning

**Core Compliance Engineering**:
- [Write effective specifications with embedded compliance](writing-effective-specs)
- [Implement LLM-assisted development with compliance awareness](llm-assisted-coding)
- [Explore compliance engineering topics](/topics/compliance)

**Policy-as-Code Resources**:
- AWS Cedar: [cedarpolicy.com](https://www.cedarpolicy.com) - Open-source authorization policy language
- OPAL: [opal.ac](https://www.opal.ac) - Open Policy Administration Layer for real-time policy sync
- Cedar Playground: [cedar-policy.com/playground](https://www.cedarpolicy.com/en/playground) - Interactive policy testing
- OPAL Documentation: [docs.opal.ac](https://docs.opal.ac) - Policy distribution architecture
