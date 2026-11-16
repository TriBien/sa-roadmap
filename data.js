/* Learning plan data, derived from SA-plan.md.
   Each week's items are grouped: Study, Practice, Deliver, Defense. */

var PLAN = {
  title: "SA Learning Roadmap",
  phases: [
    { id: 1, name: "Solution Architect", range: "Weeks 1–9", meta: "≈75% of time · focus on one solution" },
    { id: 2, name: "Enterprise Solution Architect", range: "Weeks 10–12", meta: "≈25% of time · focus on the portfolio" }
  ],
  weeks: [
    {
      code: "w01", phase: 1, priority: "P1",
      title: "Problem framing, quality attributes, trade-offs",
      target: "Turn any vague request into measurable requirements and a visible trade-off space before choosing technology.",
      read: "Fundamentals of Software Architecture (Richards, Ford); Software Architecture in Practice (Bass) — quality-attribute chapters.",
      items: [
        { group: "Study", text: "Functional vs quality-attribute requirements; constraints vs assumptions." },
        { group: "Study", text: "ISO 25010, quality-attribute scenarios (source, stimulus, response, measure), utility trees, lightweight ATAM." },
        { group: "Study", text: "Discovery questions: volumes, peak vs average, growth, data lifetime, compliance, failure tolerance, team skills, budget." },
        { group: "Practice", text: "Take a vague request (\"make onboarding faster\") and write the 15 questions you'd ask the sponsor." },
        { group: "Practice", text: "Convert the answers into quality-attribute scenarios." },
        { group: "Deliver", text: "NFR specification for the anchor system: every requirement has a number, a test method and a priority." },
        { group: "Deliver", text: "Utility tree." }
      ]
    },
    {
      code: "w02", phase: 1, priority: "P2",
      title: "ADRs, C4 and executive summaries",
      target: "Make decisions auditable and designs understandable to three audiences (CTO, CISO, delivery team).",
      read: "Software Architecture: The Hard Parts (trade-off chapters); The Software Architect Elevator (selected chapters).",
      items: [
        { group: "Study", text: "ADR format: context, options, decision, consequences, status, reversibility (one-way vs two-way door)." },
        { group: "Study", text: "C4 model (context, container, component), sequence and deployment views; arc42 as a skeleton." },
        { group: "Study", text: "Executive summary structure: problem, decision, cost, risk, ask." },
        { group: "Practice", text: "Draw C4 as code (Structurizr, PlantUML or Mermaid) in the repo." },
        { group: "Practice", text: "Re-decide one past decision blind, then compare with what you chose." },
        { group: "Deliver", text: "5 ADRs (include one decision you originally got wrong)." },
        { group: "Deliver", text: "C4 set: context, container, one component." },
        { group: "Deliver", text: "One-page executive summary of the anchor system." }
      ]
    },
    {
      code: "w03", phase: 1, priority: "P3",
      title: "Data, distributed systems, integration (compressed)",
      target: "Design correct state handling and integration under failure.",
      read: "Designing Data-Intensive Applications — consistency, transactions, replication chapters.",
      items: [
        { group: "Study", text: "Consistency models, transactional boundaries, sagas, outbox/inbox, idempotency, ordering, \"exactly-once\" myths." },
        { group: "Study", text: "CQRS and event sourcing: when they help, when they are overkill." },
        { group: "Study", text: "Sync vs async, API-led vs event-driven, orchestration vs choreography, contract evolution, anti-corruption layers, retries and dead letters." },
        { group: "Practice", text: "Spike an outbox plus idempotent consumer (queue/Kafka + PostgreSQL), then break it deliberately." },
        { group: "Deliver", text: "Design document for a payment or ledger-style flow." },
        { group: "Deliver", text: "Failure-mode table: failure, detection, impact, mitigation, residual risk." },
        { group: "Deliver", text: "Integration strategy including a section \"where we deliberately do not use events\"." }
      ]
    },
    {
      code: "w04", phase: 1, priority: "P4",
      title: "Security and compliance design",
      target: "Build security in at design time and map controls to requirements.",
      read: "",
      items: [
        { group: "Study", text: "STRIDE threat modeling, trust boundaries, IAM and zero trust, secrets and key management, encryption, data classification and residency, audit trails." },
        { group: "Study", text: "Compliance frames: PCI-DSS, ISO 27001, SOC 2, GDPR or local equivalents — know what each demands, not every clause." },
        { group: "Practice", text: "Run a real threat-modeling session on the Week 3 design." },
        { group: "Deliver", text: "Threat model: data-flow diagram, threats, mitigations." },
        { group: "Deliver", text: "Control-mapping table: requirement → design element → evidence." }
      ]
    },
    {
      code: "w05", phase: 1, priority: "P5",
      title: "Cloud, resilience, cost",
      target: "Produce a deployment design with defensible cost and recovery numbers.",
      read: "AWS Well-Architected (security, reliability, cost); Google Cloud Architecture Framework as checklists, not gospel.",
      items: [
        { group: "Study", text: "Failure domains, multi-AZ vs multi-region, DR tiers (backup, pilot light, warm, active-active) against RTO/RPO." },
        { group: "Study", text: "FinOps: unit economics, commitment discounts, egress and cross-AZ traps, cost per transaction." },
        { group: "Practice", text: "Price the design at 1x, 5x and 10x load with a cloud calculator and find what breaks first." },
        { group: "Deliver", text: "Deployment architecture." },
        { group: "Deliver", text: "Annual cost estimate with assumptions." },
        { group: "Deliver", text: "DR design justified against stated RTO/RPO." }
      ]
    },
    {
      code: "w06", phase: 1, priority: "P6",
      title: "Delivery realism",
      target: "Turn a design into a plan a real team can execute.",
      read: "",
      items: [
        { group: "Study", text: "Strangler fig, phased migration, risk-first sequencing, spikes and proofs of concept with exit criteria." },
        { group: "Study", text: "Estimation under uncertainty (ranges, reference classes), dependency mapping, team-skill fit." },
        { group: "Practice", text: "List the top 5 assumptions in your design and design a cheap experiment for each." },
        { group: "Deliver", text: "Phased roadmap with exit criteria per phase." },
        { group: "Deliver", text: "Risk register." },
        { group: "Deliver", text: "Explicit \"not building\" list." }
      ]
    },
    {
      code: "w07", phase: 1, priority: "P7",
      title: "Operability",
      target: "Design for running, not just launching.",
      read: "",
      items: [
        { group: "Study", text: "SLIs, SLOs, error budgets; observability (metrics, logs, traces); alerting philosophy; canary and blue-green; capacity planning; runbooks." },
        { group: "Practice", text: "Add tracing and a basic SLO dashboard to the Week 3 spike." },
        { group: "Deliver", text: "Operability section for the anchor design: SLO definitions, alert policy, rollout and rollback strategy, on-call impact." }
      ]
    },
    {
      code: "w08", phase: 1, priority: "P8",
      title: "Domain depth and emerging patterns",
      target: "Add one domain and one emerging pattern with architectural consequences.",
      read: "",
      items: [
        { group: "Study", text: "Domain: regulation, data realities, typical failure patterns (payments, fraud/AML, e-invoicing, retail ERP)." },
        { group: "Study", text: "Emerging pattern: LLM-in-the-loop systems with guardrails, evaluation, cost control, data privacy and fallback paths." },
        { group: "Practice", text: "Sketch where an LLM component would sit in the design and what happens when it is wrong or unavailable." },
        { group: "Deliver", text: "3-page domain brief." },
        { group: "Deliver", text: "One-page AI-component pattern with risks and controls." }
      ]
    },
    {
      code: "w09", phase: 1, priority: "Capstone",
      title: "SA capstone and gate review",
      target: "Assemble one coherent solution and prove you can defend it.",
      read: "",
      items: [
        { group: "Deliver", text: "Business context, constraints, NFRs." },
        { group: "Deliver", text: "C4 views." },
        { group: "Deliver", text: "5+ ADRs." },
        { group: "Deliver", text: "Data and integration design with failure modes." },
        { group: "Deliver", text: "Security model and control map." },
        { group: "Deliver", text: "Deployment, DR, annual cost model." },
        { group: "Deliver", text: "Operability design." },
        { group: "Deliver", text: "Roadmap, risk register, \"not building\" list." },
        { group: "Deliver", text: "One-page executive summary." },
        { group: "Defense", text: "Present 15 minutes, then 20 minutes of hostile questions (\"Why not buy?\", \"What if the vendor fails?\", \"What's the run cost?\", \"What breaks first at 10x?\", \"Why not simpler?\")." },
        { group: "Defense", text: "Use Claude as a review board and record yourself." }
      ]
    },
    {
      code: "w10", phase: 2, priority: "E1",
      title: "Strategy, capabilities, portfolio economics",
      target: "Read a business strategy, map capabilities and justify investments in executive terms.",
      read: "Enterprise Architecture as Strategy (skim); Wardley Maps (free online).",
      items: [
        { group: "Study", text: "Business capability modeling (L1-L3), value streams, strategy-to-capability linkage." },
        { group: "Study", text: "Application portfolio assessment (TIME: tolerate, invest, migrate, eliminate)." },
        { group: "Study", text: "TCO (build, run, change, people, licenses, risk), cost of delay, build vs buy vs partner, vendor lock-in and exit cost, Wardley mapping for core vs commodity." },
        { group: "Practice", text: "Build a 5-year TCO spreadsheet for two options and run a sensitivity test: which assumption flips the decision?" },
        { group: "Deliver", text: "Capability map plus current-state landscape of the anchor enterprise with portfolio dispositions." },
        { group: "Deliver", text: "Build/buy/partner analysis with exit plan." }
      ]
    },
    {
      code: "w11", phase: 2, priority: "E2",
      title: "Target state, roadmap, governance",
      target: "Define where the enterprise should be and how decisions stay consistent.",
      read: "",
      items: [
        { group: "Study", text: "8-10 architecture principles (rationale and implications), target-state landscape, two reference architectures (integration, identity)." },
        { group: "Study", text: "Transition roadmap: dependency-driven sequencing, funding envelope, benefits tracking." },
        { group: "Study", text: "Governance: guardrails vs gates (gates only for irreversible or high-risk decisions), review triggers and SLAs, exception process, technology radar." },
        { group: "Practice", text: "Write the review process on one page and test it against three hypothetical team proposals." },
        { group: "Deliver", text: "Architecture principles." },
        { group: "Deliver", text: "Target state." },
        { group: "Deliver", text: "3-year phased roadmap." },
        { group: "Deliver", text: "Governance model with technology radar." }
      ]
    },
    {
      code: "w12", phase: 2, priority: "E3",
      title: "Influence, frameworks, enterprise capstone",
      target: "Make recommendations stick across teams you don't control and produce a defendable enterprise summary.",
      read: "Team Topologies; TOGAF 10 introductory documents.",
      items: [
        { group: "Study", text: "Conway's law, Team Topologies, stakeholder mapping, negotiation." },
        { group: "Study", text: "TOGAF 10 (ADM, repository, governance) and ArchiMate viewpoints as vocabulary, not religion." },
        { group: "Practice", text: "Model current and target states in ArchiMate (Archi is free)." },
        { group: "Practice", text: "Run a hostile panel: CFO (\"What does this save, and when?\"), CISO (\"What new risk?\"), engineering director (\"Why should my team follow this?\")." },
        { group: "Deliver", text: "Enterprise mini-capstone: strategy and drivers, capability map, portfolio economics, roadmap, governance, risk register, stakeholder plan." },
        { group: "Deliver", text: "CFO-ready one-page summary." },
        { group: "Deliver", text: "Gap list for the next quarter." }
      ]
    }
  ],
  extras: [
    {
      id: "gate", title: "Gate to Phase 2", note: "All must be true before starting Phase 2. If a gate item fails, repeat weak weeks.",
      items: [
        "You can state any design's annual cost, top three risks and failure modes without notes.",
        "You have 10+ ADRs, several that survived adversarial questioning.",
        "You can present to non-engineers.",
        "Ideally you have influenced one real decision (review, vendor evaluation, workshop)."
      ]
    },
    {
      id: "day90", title: "Day-90 success criteria", note: "",
      items: [
        "You can frame any request as measurable NFRs and constraints before proposing technology.",
        "You have 10+ ADRs and one SA capstone you can defend under hostile questioning.",
        "You can state a design's annual cost, top three risks and failure modes without notes.",
        "You have a first enterprise artifact set (capability map, portfolio economics, roadmap, governance) and a clear gap list."
      ]
    }
  ],
  info: [
    {
      title: "Operating rules",
      items: [
        "One artifact per week. Reading without output doesn't count.",
        "One portfolio repo, one folder per week (w01-nfr, w02-adr-c4, ...), plus a decision-log folder.",
        "Use ONE anchor scenario (payments/fraud, e-invoicing, retail ERP) for all artifacts so they build on each other.",
        "Weekly rhythm: Mon-Thu 2 h study and draft; Sat 3 h build the artifact; Sun 2 h hostile review (use Claude as reviewer) plus 5-line retrospective.",
        "Keep one hands-on thread: one spike or one real incident postmortem read per week.",
        "Every recommendation states: decision, rationale, cost of being wrong, reversibility."
      ]
    },
    {
      title: "Weekly self-check",
      items: [
        "Did I produce this week's artifact?",
        "Does every recommendation state what I rejected and why?",
        "Can I give cost, top risk and reversibility of each decision in four sentences?",
        "Which assumption, if wrong, hurts most, and how would I test it cheaply?"
      ]
    },
    {
      title: "Critical caveats",
      items: [
        "Don't optimize for diagrams. Every artifact must show what you rejected and why.",
        "Frameworks are vocabulary, not competence; that's why they rank last.",
        "Stay hands-on in one thread so judgment stays calibrated.",
        "Real exposure beats study: join one architecture review, vendor evaluation or cost review at work during these 12 weeks.",
        "Avoid tool collecting. Explaining when no broker or pattern is needed matters more than knowing ten of them."
      ]
    }
  ]
};
