# 3-Month Plan: Senior Software Engineer → Solution Architect (first) → Enterprise Solution Architect (later)

**Duration:** 12 weeks | **Budget:** ~10 hours/week (~120 hours)
**Split:** Solution Architect ≈ 75% (weeks 1-9), Enterprise elements ≈ 25% (weeks 10-12)
**Assumption:** strong hands-on depth in backend, integration, data and cloud. Technical topics are compressed; time goes to framing, trade-offs, communication, economics and governance.

---

## First principles

- A **Solution Architect** turns an ambiguous business problem into a buildable, costed, defensible design for ONE solution.
- An **Enterprise Architect** optimizes the PORTFOLIO: which systems should exist, how they fit, where to invest.
- Enterprise judgment generalizes solution judgment, so SA comes first. Skipping this order produces "PowerPoint architecture."
- Priority is ranked by three tests: **leverage** (cost of getting it wrong), **scarcity** (what strong engineers usually lack), **transferability** (applies to every project).

## Operating rules

1. One artifact per week. Reading without output doesn't count.
2. One portfolio repo, one folder per week (w01-nfr, w02-adr-c4, ...), plus a decision-log folder.
3. Use ONE anchor scenario (a domain you know: payments/fraud, e-invoicing, retail ERP) for all artifacts so they build on each other.
4. Weekly rhythm: Mon-Thu 2 h study and draft; Sat 3 h build the artifact; Sun 2 h hostile review (use Claude as reviewer) plus 5-line retrospective.
5. Keep one hands-on thread: one spike or one real incident postmortem read per week.
6. Every recommendation states: decision, rationale, cost of being wrong, reversibility.

## Priority table (highest first)

| Rank | Capability | Why it ranks here | Week |
|---|---|---|---|
| P1 | Requirements, quality attributes, trade-offs | Wrong problem framing is the costliest failure | 1 |
| P2 | Communication: ADRs, C4, executive summaries | A design nobody understands or trusts isn't built | 2 |
| P3 | Data, distributed systems, integration | Where most design risk and rework concentrate | 3 |
| P4 | Security and compliance design | Cheap early, brutal to retrofit | 4 |
| P5 | Cloud, resilience, cost | Sponsors ask about cost and failure modes | 5 |
| P6 | Delivery realism: estimation, risk, migration | Separates a design from an executable plan | 6 |
| P7 | Operability: SLOs, observability, CI/CD | Designs fail in production, not on diagrams | 7 |
| P8 | Domain depth, emerging patterns (AI) | Multiplier, useful on a solid base | 8 |
| — | SA capstone and gate review | Integration and proof | 9 |
| E1 | Strategy, capabilities, portfolio economics | Executives fund or kill on this | 10 |
| E2 | Target state, roadmap, governance | Core enterprise deliverables | 11 |
| E3 | Org influence, frameworks, enterprise capstone | Makes decisions stick; vocabulary last | 12 |

---

# PHASE 1: SOLUTION ARCHITECT (Weeks 1-9)

## Week 1 (P1): Problem framing, quality attributes, trade-offs
- **Target:** turn any vague request into measurable requirements and a visible trade-off space before choosing technology.
- **Details:**
  - Functional vs quality-attribute requirements; constraints vs assumptions.
  - ISO 25010, quality-attribute scenarios (source, stimulus, response, measure), utility trees, lightweight ATAM.
  - Discovery questions: volumes, peak vs average, growth, data lifetime, compliance, failure tolerance, team skills, budget.
- **Read:** Fundamentals of Software Architecture (Richards, Ford); Software Architecture in Practice (Bass), quality-attribute chapters.
- **Practice/implementation:** take a vague request ("make onboarding faster") and write the 15 questions you'd ask the sponsor. Convert answers into scenarios.
- **Delivery:** NFR specification for the anchor system: every requirement has a number, a test method and a priority, plus a utility tree.

## Week 2 (P2): ADRs, C4 and executive summaries
- **Target:** make decisions auditable and designs understandable to three audiences (CTO, CISO, delivery team).
- **Details:**
  - ADR format: context, options, decision, consequences, status, reversibility (one-way vs two-way door).
  - C4 model (context, container, component), sequence and deployment views, arc42 as a skeleton.
  - Executive summary structure: problem, decision, cost, risk, ask.
- **Read:** Software Architecture: The Hard Parts (trade-off chapters); The Software Architect Elevator (selected chapters).
- **Practice/implementation:** draw C4 as code (Structurizr, PlantUML or Mermaid) in the repo. Re-decide one past decision blind, then compare with what you chose.
- **Delivery:** 5 ADRs (include one decision you originally got wrong), a C4 set (context, container, one component) and a one-page executive summary of the anchor system.

## Week 3 (P3): Data, distributed systems, integration (compressed)
- **Target:** design correct state handling and integration under failure.
- **Details:**
  - Consistency models, transactional boundaries, sagas, outbox/inbox, idempotency, ordering, "exactly-once" myths.
  - CQRS and event sourcing: when they help, when they are overkill.
  - Sync vs async, API-led vs event-driven, orchestration vs choreography, contract evolution, anti-corruption layers, retries and dead letters.
- **Read:** Designing Data-Intensive Applications (consistency, transactions, replication chapters).
- **Practice/implementation:** spike an outbox plus idempotent consumer (queue/Kafka + PostgreSQL), then break it deliberately.
- **Delivery:** design document for a payment or ledger-style flow with a failure-mode table (failure, detection, impact, mitigation, residual risk) and an integration strategy including a section "where we deliberately do not use events."

## Week 4 (P4): Security and compliance design
- **Target:** build security in at design time and map controls to requirements.
- **Details:**
  - STRIDE threat modeling, trust boundaries, IAM and zero trust, secrets and key management, encryption, data classification and residency, audit trails.
  - Compliance frames: PCI-DSS, ISO 27001, SOC 2, GDPR or local equivalents. Know what each demands, not every clause.
- **Practice/implementation:** run a real threat-modeling session on the Week 3 design.
- **Delivery:** threat model (data-flow diagram, threats, mitigations) and a control-mapping table: requirement → design element → evidence.

## Week 5 (P5): Cloud, resilience, cost
- **Target:** produce a deployment design with defensible cost and recovery numbers.
- **Details:**
  - Failure domains, multi-AZ vs multi-region, DR tiers (backup, pilot light, warm, active-active) against RTO/RPO.
  - FinOps: unit economics, commitment discounts, egress and cross-AZ traps, cost per transaction.
  - Use AWS Well-Architected and Google Cloud Architecture Framework as checklists, not gospel.
- **Practice/implementation:** price the design at 1x, 5x and 10x load with a cloud calculator and find what breaks first.
- **Delivery:** deployment architecture, annual cost estimate with assumptions, DR design justified against stated RTO/RPO.

## Week 6 (P6): Delivery realism
- **Target:** turn a design into a plan a real team can execute.
- **Details:**
  - Strangler fig, phased migration, risk-first sequencing, spikes and proofs of concept with exit criteria.
  - Estimation under uncertainty (ranges, reference classes), dependency mapping, team-skill fit.
- **Practice/implementation:** list the top 5 assumptions in your design and design a cheap experiment for each.
- **Delivery:** phased roadmap with exit criteria per phase, risk register and an explicit "not building" list.

## Week 7 (P7): Operability
- **Target:** design for running, not just launching.
- **Details:**
  - SLIs, SLOs, error budgets; observability (metrics, logs, traces); alerting philosophy; canary and blue-green; capacity planning; runbooks.
- **Practice/implementation:** add tracing and a basic SLO dashboard to the Week 3 spike.
- **Delivery:** operability section for the anchor design: SLO definitions, alert policy, rollout and rollback strategy, on-call impact.

## Week 8 (P8): Domain depth and emerging patterns
- **Target:** add one domain and one emerging pattern with architectural consequences.
- **Details:**
  - Domain: regulation, data realities, typical failure patterns (payments, fraud/AML, e-invoicing, retail ERP).
  - Emerging pattern: LLM-in-the-loop systems with guardrails, evaluation, cost control, data privacy and fallback paths.
- **Practice/implementation:** sketch where an LLM component would sit in the design and what happens when it is wrong or unavailable.
- **Delivery:** 3-page domain brief and a one-page AI-component pattern with risks and controls.

## Week 9: SA capstone and gate review
- **Target:** assemble one coherent solution and prove you can defend it.
- **Delivery (all required):**
  1. Business context, constraints, NFRs
  2. C4 views
  3. 5+ ADRs
  4. Data and integration design with failure modes
  5. Security model and control map
  6. Deployment, DR, annual cost model
  7. Operability design
  8. Roadmap, risk register, "not building" list
  9. One-page executive summary
- **Defense:** present 15 minutes, then 20 minutes of hostile questions: "Why not buy?", "What if the vendor fails?", "What's the run cost?", "What breaks first at 10x?", "Why not simpler?" Use Claude as review board and record yourself.
- **GATE to Phase 2 (all must be true):**
  - You can state any design's annual cost, top three risks and failure modes without notes.
  - You have 10+ ADRs, several that survived adversarial questioning.
  - You can present to non-engineers.
  - Ideally you have influenced one real decision (review, vendor evaluation, workshop).
  - If a gate item fails, repeat weak weeks before starting Phase 2.

---

# PHASE 2: ENTERPRISE SOLUTION ARCHITECT (Weeks 10-12)

Unit of optimization shifts from one solution to the portfolio. This is an introduction and first artifacts; depth comes in the following quarter.

## Week 10 (E1): Strategy, capabilities, portfolio economics
- **Target:** read a business strategy, map capabilities and justify investments in executive terms.
- **Details:**
  - Business capability modeling (L1-L3), value streams, strategy-to-capability linkage.
  - Application portfolio assessment (TIME: tolerate, invest, migrate, eliminate).
  - TCO (build, run, change, people, licenses, risk), cost of delay, build vs buy vs partner, vendor lock-in and exit cost, Wardley mapping for core vs commodity.
- **Read:** Enterprise Architecture as Strategy (skim); Wardley Maps (free online).
- **Practice/implementation:** build a 5-year TCO spreadsheet for two options and run a sensitivity test: which assumption flips the decision?
- **Delivery:** capability map plus current-state landscape of the anchor enterprise with portfolio dispositions, and a build/buy/partner analysis with exit plan.

## Week 11 (E2): Target state, roadmap, governance
- **Target:** define where the enterprise should be and how decisions stay consistent.
- **Details:**
  - 8-10 architecture principles (rationale and implications), target-state landscape, two reference architectures (integration, identity).
  - Transition roadmap: dependency-driven sequencing, funding envelope, benefits tracking.
  - Governance: guardrails vs gates (gates only for irreversible or high-risk decisions), review triggers and SLAs, exception process, technology radar.
- **Practice/implementation:** write the review process on one page and test it against three hypothetical team proposals.
- **Delivery:** principles, target state, 3-year phased roadmap and governance model with technology radar.

## Week 12 (E3): Influence, frameworks, enterprise capstone
- **Target:** make recommendations stick across teams you don't control and produce a defendable enterprise summary.
- **Details:**
  - Conway's law, Team Topologies, stakeholder mapping, negotiation.
  - TOGAF 10 (ADM, repository, governance) and ArchiMate viewpoints as vocabulary, not religion.
- **Read:** Team Topologies; TOGAF 10 introductory documents.
- **Practice/implementation:** model current and target states in ArchiMate (Archi is free). Run a hostile panel: CFO ("What does this save, and when?"), CISO ("What new risk?"), engineering director ("Why should my team follow this?").
- **Delivery:** enterprise mini-capstone: strategy and drivers, capability map, portfolio economics, roadmap, governance, risk register, stakeholder plan and a **CFO-ready one-page summary**. Plus a gap list for the next quarter.

---

## Reading list (in order of use)

| When | Resource |
|---|---|
| Weeks 1-2 | Fundamentals of Software Architecture; The Software Architect Elevator; Software Architecture: The Hard Parts |
| Weeks 3-5 | Designing Data-Intensive Applications; AWS Well-Architected (security, reliability, cost) |
| Weeks 10-12 | Enterprise Architecture as Strategy; Wardley Maps; Team Topologies; TOGAF 10 intro docs |

## Certification (optional, low priority)

- Cloud architect professional (AWS/GCP) only if a target employer filters on it.
- CPSA-F is a cheap vocabulary check if you skip the paid course; CPSA-A mainly for European markets.
- TOGAF Foundation as an inexpensive HR filter after week 12.
- None replace the capstones as evidence of judgment.

## Critical caveats

- Don't optimize for diagrams. Every artifact must show what you rejected and why.
- Frameworks are vocabulary, not competence; that's why they rank last.
- Stay hands-on in one thread so judgment stays calibrated.
- Real exposure beats study: join one architecture review, vendor evaluation or cost review at work during these 12 weeks.
- Avoid tool collecting. Explaining when no broker or pattern is needed matters more than knowing ten of them.

## Weekly self-check

- Did I produce this week's artifact?
- Does every recommendation state what I rejected and why?
- Can I give cost, top risk and reversibility of each decision in four sentences?
- Which assumption, if wrong, hurts most, and how would I test it cheaply?

## Day-90 success criteria

- You can frame any request as measurable NFRs and constraints before proposing technology.
- You have 10+ ADRs and one SA capstone you can defend under hostile questioning.
- You can state a design's annual cost, top three risks and failure modes without notes.
- You have a first enterprise artifact set (capability map, portfolio economics, roadmap, governance) and a clear gap list.
- Realistic outcome: credible for a solution architect role, with enterprise vocabulary. Not yet a seasoned enterprise architect; that takes years of living with decisions.
