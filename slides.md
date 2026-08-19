<!-- .slide: id="intro" -->

# SimPortal 

## Centralized compliance & tracking platform for ATOs

**Main question:**  
Can we use different simulators for different type-rating tasks based on the fidelity actually required?

**Yes — under the new FCS / task-to-tool framework, where applicable.**

Applicable from **30 April 2028**.

<a class="cta" href="demo.html">Open Demo</a>

---

<!-- .slide: id="big-change" -->

# What Is Actually Changing?

### Traditional approach

**Training requirement → FFS / FTD / FNPT level**

Example:

> “This part of the course requires an FFS.”

### New capability-based approach

**Training task → required capability & fidelity → suitable FSTD**

This potentially allows an ATO to use:

- high-fidelity fixed-base devices
- touchscreen / alternative flight-deck interfaces
- traditional FFS / FTD devices

**where their qualified capabilities are sufficient for the task.**

Source:  
[EASA FSTD implementation](https://www.easa.europa.eu/en/domains/aircrew-and-medical/flight-simulation-training-devices-fstd)

---

<!-- .slide: id="fcs" -->

# What Is an FCS?

## FSTD Capability Signature

Think of the FCS as the simulator's **certified capability sheet**.

Instead of only:

> A320 FFS Level D

the FCS describes **what the device can actually reproduce and at what fidelity**.

Capability areas include, for example:

- flight deck / controls / displays
- aircraft systems
- flight and ground dynamics
- navigation / FMS
- visual environment
- motion cueing
- sound
- instructor functions
- flight-deck interface technology

Source:  
[CS-FSTD Issue 1](https://www.easa.europa.eu/en/document-library/certification-specifications/cs-fstd-issue-1)

---

<!-- .slide: id="inventory" -->

# Step 1 — Know What Our Sims Can Do

Our ATO should maintain an inventory of the devices we use.

| Device | Qualification evidence | Capability evidence |
|---|---|---|
| A320 FFS D #1 | Qualification certificate | Assigned FCS / FCS |
| A320 FFS D #2 | Qualification certificate | Assigned FCS / FCS |
| Fixed-base A320 device | Qualification certificate | FCS |
| Touchscreen cockpit trainer | Depends on qualification | FCS if qualified |
| Desktop / X-Plane | Not automatically an FSTD | No self-declared FCS |

### Important

**The ATO does not simply decide the device's FCS itself.**

Its usable capabilities must come from the applicable **FSTD qualification evidence**.

---

<!-- .slide: id="training-fcs" -->

# Step 2 — What Does the Training Task Need?

This is the **Training FCS** side.

For each type-rating task:

> **What capabilities and fidelity are actually required to achieve the training objective?**

Example:

| Task | Important capabilities |
|---|---|
| MCDU familiarisation | FMS / interface / systems |
| ECAM procedures | cockpit + systems |
| Normal procedures | systems + controls |
| Engine failure at V1 | dynamics + controls + visual + other required cues |
| Landing | flight dynamics + visual + required cues |

The answer must be based on the **training objectives and applicable regulatory / training requirements** — not simply on cost.

---

<!-- .slide: id="matching" -->

# Step 3 — Match Task to Tool

This is the core ATO matrix.

### Training task
↓
### Required Training FCS
↓
### Available simulator FCS
↓
### FCS meets or exceeds requirement?
↓
### Device may be allocated to that task

Example:

| Task | Required fidelity | SIM A | SIM B | FFS |
|---|---:|---:|---:|---:|
| MCDU setup | Low/medium | ✓ | ✓ | ✓ |
| ECAM procedure | Medium/high | ✕ | ✓ | ✓ |
| V1 engine failure | High | ✕ | ? | ✓ |
| Landing | High | ✕ | ? | ✓ |

---

<!-- .slide: id="optional" -->

# Is Task-to-Tool Mandatory?

## No.

EASA describes **task-to-tool as an optional methodology**.

An ATO may continue using the traditional approved FSTD approach.

But an ATO that wants the flexibility of capability-based device selection can use task-to-tool where permitted.

### Why use it?

Potentially:

**same training objective / credit**

with

**less reliance on the most expensive simulator for every task.**

Source:  
[EASA FSTD implementation](https://www.easa.europa.eu/en/domains/aircrew-and-medical/flight-simulation-training-devices-fstd)

---

<!-- .slide: id="abuse" -->

# Why Can't We Just Say “X-Plane Is Good Enough”?

Because there are **two separate controls**.

### 1 — Device capability

We cannot simply declare:

> “Our €2,000 desktop sim has high fidelity.”

The relevant capability must be supported by the device's **qualification / FCS evidence**.

### 2 — Training requirement

We also cannot arbitrarily lower the Training FCS just to save money.

We must justify why the selected fidelity is sufficient for the **approved training objective and regulatory credit**.

So:

> **ATO judgement ≠ unlimited discretion**

The competent authority can challenge both the training analysis and the device selected.

---

<!-- .slide: id="motion" -->

# What About Motion?

### Today

A fixed-base device cannot simply be treated as:

> **“FFS Level D without motion.”**

Traditional FFS Level D qualification includes motion requirements.

### Under FCS

Motion becomes one of the capabilities/fidelity elements considered for the training task.

This creates the possibility that:

> **a high-quality fixed-base FSTD could perform tasks for which the Training FCS does not require that level of motion capability.**

It does **not** mean motion becomes irrelevant.

---

<!-- .slide: id="type-rating" -->

# How Do We Know What an A320 Type Rating Requires?

We do **not** start with the simulator.

We start with:

1. Type-rating training objectives and syllabus
2. Part-FCL requirements
3. Applicable AMC / GM
4. OSD / type-specific requirements where applicable
5. Approved training programme
6. Task-to-tool / Training FCS methodology

Then determine the required capabilities for each training task.

### The key question becomes:

> “What does EASA require this student to learn or demonstrate?”

**before**

> “Which simulator can we use?”

---

<!-- .slide: id="inspector" -->

# What Would an Inspector Want to See?

The useful compliance document is not simply a simulator list.

It is the **traceability between training and simulator capability**.

For each relevant task:

**Training objective**

→ **required Training FCS**

→ **selected FSTD**

→ **FSTD FCS / assigned FCS**

→ **evidence that capability ≥ requirement**

→ **training credit**

This should connect back to the **approved training programme and ATO procedures**.

---

<!-- .slide: id="ato-file" -->

# Our ATO Compliance File

A practical implementation package could contain:

### FSTD Inventory
Every device + qualification + FCS / assigned FCS

### Type-Rating Task Matrix
Every task + training objective + required Training FCS

### Task-to-Tool Matrix
Which devices may perform which tasks

### Procedures
How instructors / scheduling select the correct device

### Compliance Monitoring
How we ensure the correct simulator was actually used

### Management of Change
What happens when a simulator, FCS or training programme changes

---

<!-- .slide: id="example" -->

# Example — A320 Training

Imagine we have:

**SIM 1** — touchscreen procedures trainer  
**SIM 2** — high-fidelity fixed-base A320 FSTD  
**SIM 3** — A320 FFS

The future goal is not:

> “Put every student in the cheapest sim.”

It is:

> **Use the least complex device that demonstrably satisfies the required Training FCS.**

So the course could potentially distribute different training tasks across SIM 1, SIM 2 and SIM 3.

That is the commercial and operational interest for the ATO.

---

<!-- .slide: id="timeline" -->

# Timeline

### 2026
New regulatory framework published

### 2027
Implementation guidance / preparation period

### 30 April 2028
New FCS framework becomes applicable

### What we can do now

- inventory our FSTDs
- identify future FCS / assigned FCS information
- break type-rating courses into individual training tasks
- identify where we currently use FFS unnecessarily
- prepare a task-to-tool matrix structure

Sources:  
[Regulation 2026/781](https://www.easa.europa.eu/en/document-library/regulations/commission-implementing-regulation-eu-2026781) ·
[EASA FSTD implementation](https://www.easa.europa.eu/en/domains/aircrew-and-medical/flight-simulation-training-devices-fstd)

---

<!-- .slide: id="regulation" -->

# Key Regulatory Material

**Regulation (EU) 2026/781**  
Regulatory framework

**ED Decision 2026/006/R**  
Part-FCL / Part-ARA / Part-ORA AMC & GM changes

**ED Decision 2026/008/R**  
Adopts CS-FSTD Issue 1

**CS-FSTD Issue 1**  
Capability / fidelity qualification framework

Sources:

[Regulation 2026/781](https://www.easa.europa.eu/en/document-library/regulations/commission-implementing-regulation-eu-2026781)

[ED Decision 2026/006/R](https://www.easa.europa.eu/en/document-library/agency-decisions/ed-decision-2026006r)

[ED Decision 2026/008/R](https://www.easa.europa.eu/en/document-library/agency-decisions/ed-decision-2026008r)

[CS-FSTD Issue 1](https://www.easa.europa.eu/en/document-library/certification-specifications/cs-fstd-issue-1)

---

<!-- .slide: id="takeaway" -->

# The Takeaway

## For our ATO:

**1. Know the certified capability of every simulator.**

**2. Know the capability required by every training task.**

**3. Match the two and document the reasoning.**

**4. Use the appropriate device — not automatically the highest-level device.**

### In one line:

> **Task → Training FCS → Device FCS → Credit**

That is the part of the new framework that matters most to us.

---

<!-- .slide: id="qa" -->

# Q&A

## Main questions

- What capabilities does each of our simulators have?
- Who assigns their FCS?
- What Training FCS does each type-rating task require?
- Which tasks genuinely require motion?
- Which tasks could move away from the FFS?
- What evidence will our competent authority expect?

<a class="cta" href="demo.html">Open Interactive Demo</a>