const COMPLETED_SESSIONS = new Set([
  1,
  2,
  3,
  4,
  5
]);

const ROLE_LABELS = {
  stakeholder: "ATO Stakeholder",
  tri: "ATO TRI",
  student: "Student"
};

const DEVICE_INVENTORY = [
  {
    type: "FFS",
    name: "A320 Full Flight Simulator",
    level: "Legacy FFS Level D / assigned FCS",
    motion: "Full motion, collimated visual",
    bestFor: "V1 cuts, landing, EFATO, smoke, abnormal ECAM",
    qualification: [
      ["Certificate", "EASA FSTD qualification certificate"],
      ["ESL", "A320 CEO, CFM56, LEBL/LEPA/EGLL visual scenes"],
      ["FCS evidence", "Assigned FCS: flight dynamics, controls, visual, motion, systems"],
      ["Limitations", "Legacy certificate to be mapped before 30 Apr 2029 where required"]
    ]
  },
  {
    type: "FTD",
    name: "A320 Fixed Training Device",
    level: "FTD Level 2 / capability-based candidate",
    motion: "Fixed-base, replicated cockpit",
    bestFor: "Normal procedures, FMS setup, ECAM flows",
    qualification: [
      ["Certificate", "FSTD qualification certificate"],
      ["ESL", "Flight deck, FMGS, ECAM and instructor station"],
      ["FCS evidence", "Systems, navigation, cockpit interface and IOS features"],
      ["Limitations", "No full motion cueing for high-fidelity landing credit"]
    ]
  },
  {
    type: "FNPT",
    name: "FNPT II MCC Trainer",
    level: "FNPT II MCC",
    motion: "Fixed-base generic multi-crew trainer",
    bestFor: "MCC, CRM, IFR procedures, task sharing",
    qualification: [
      ["Certificate", "FNPT II MCC qualification certificate"],
      ["ESL", "Generic jet configuration and MCC instructor tools"],
      ["FCS evidence", "Navigation, crew coordination, procedure training"],
      ["Limitations", "Not type-specific for A320 type-rating handling tasks"]
    ]
  },
  {
    type: "BITD",
    name: "Basic Instrument Trainer",
    level: "BITD legacy training device",
    motion: "Desktop instrument environment",
    bestFor: "Basic IFR scan and procedure rehearsal",
    qualification: [
      ["Certificate", "BITD qualification evidence where applicable"],
      ["ESL", "Instrument panel and navigation training setup"],
      ["FCS evidence", "Limited or legacy capability evidence"],
      ["Limitations", "Not suitable for type-rating credit without approved scope"]
    ]
  },
  {
    type: "CB-FSTD",
    name: "XR Procedure Trainer",
    level: "Capability-based FSTD concept",
    motion: "XR headset, hand controls, no platform motion",
    bestFor: "Flight deck familiarisation, flows, system recognition",
    qualification: [
      ["Certificate", "Future qualification under CS-FSTD Issue 1 if approved"],
      ["ESL", "XR interface, controls, aircraft systems scope"],
      ["FCS evidence", "Flight-deck interface technology and procedural fidelity"],
      ["Limitations", "Training credit depends on certificate, ESL and approved programme"]
    ]
  }
];

const AIRCRAFT_TYPES = [
  "A320",
  "A330",
  "A340",
  "B737",
  "B757",
  "B767",
  "B777"
];

const PROGRAMMES = [
  ...AIRCRAFT_TYPES.flatMap(
    type => [
      `${type} Type Rating`,
      `${type} Revalidation`,
      `${type} Renovation`
    ]
  ),
  "A330 CCQ",
  "MCC"
];

let currentRole = null;
let currentSession = null;
let currentSessionTab = "briefing";
let currentStakeholderTab = "inventory";

function init() {
  bindGlobalEvents();
  showView("loginView");
}

function bindGlobalEvents() {
  document
    .querySelectorAll(".login-card")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => loginAs(button.dataset.role)
        );
      }
    );

  document
    .getElementById("switchRoleButton")
    .addEventListener(
      "click",
      () => {
        currentRole = null;
        currentSession = null;
        document.getElementById("roleChip").textContent = "";
        closeDrawer();
        showView("loginView");
      }
    );

  document
    .getElementById("backToPortalButton")
    .addEventListener(
      "click",
      () => {
        closeDrawer();
        showView("portalView");
      }
    );

  document
    .getElementById("brand")
    .addEventListener(
      "click",
      () => {
        if (currentRole) {
          showView("portalView");
          return;
        }

        showView("loginView");
      }
    );

  document
    .querySelectorAll(".session-tab")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            currentSessionTab = button.dataset.sessionTab;
            renderSessionTab();
          }
        );
      }
    );

  document
    .querySelectorAll(".stakeholder-tab")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => showStakeholderTab(button.dataset.stakeholderTab)
        );
      }
    );

  document
    .querySelectorAll(".add-button")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => openCreateDrawer(button.dataset.create)
        );
      }
    );

  document
    .getElementById("drawerClose")
    .addEventListener(
      "click",
      closeDrawer
    );

  document.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }
  );
}

function loginAs(role) {
  currentRole = role;
  document.getElementById("roleChip").textContent = ROLE_LABELS[role];
  renderPortal();
  showView("portalView");
}

function renderPortal() {
  const stakeholder =
    currentRole === "stakeholder";

  document.getElementById("portalEyebrow").textContent =
    ROLE_LABELS[currentRole];

  document.getElementById("portalTitle").textContent =
    stakeholder
      ? "Training task oversight"
      : "A320 FFS schedule";

  document.getElementById("portalSummary").textContent =
    stakeholder
      ? "Review all individual FFS items and open the sample EASA FCS suitability matrix for each task."
      : "Review completed simulator sessions and explore upcoming lessons before they are marked as passed.";

  document.getElementById("scheduleArea").style.display =
    stakeholder
      ? "none"
      : "block";

  document.getElementById("stakeholderArea").style.display =
    stakeholder
      ? "block"
      : "none";

  if (stakeholder) {
    renderDeviceInventory();
    renderTaskMatrix();
    renderProgrammes();
    showStakeholderTab(currentStakeholderTab);
    return;
  }

  renderSchedule();
}

function showStakeholderTab(tab) {
  currentStakeholderTab = tab;

  document
    .querySelectorAll(".stakeholder-tab")
    .forEach(
      button => {
        button.classList.toggle(
          "active",
          button.dataset.stakeholderTab === tab
        );
      }
    );

  document.getElementById("inventoryPanel").classList.toggle(
    "active",
    tab === "inventory"
  );
  document.getElementById("tasksPanel").classList.toggle(
    "active",
    tab === "tasks"
  );
  document.getElementById("programmesPanel").classList.toggle(
    "active",
    tab === "programmes"
  );
}

function openCreateDrawer(type) {
  const labels = {
    device: "Device",
    task: "Training Task",
    programme: "Programme"
  };

  document.getElementById("drawerEyebrow").textContent =
    "Create new";
  document.getElementById("drawerTitle").textContent =
    labels[type] || "Record";
  document.getElementById("drawerBody").innerHTML = `
    <div class="readonly-comments">
      This demo button marks where an ATO user would create a new ${escapeHtml(labels[type] || "record")}.
    </div>
  `;

  openDrawer();
}

function renderSchedule() {
  const holder =
    document.getElementById("sessionCards");

  holder.innerHTML =
    FFS.map(
      session => {
        const completed =
          COMPLETED_SESSIONS.has(session.number);

        return `
          <button
            class="sim-card ${completed ? "complete" : "pending"}"
            type="button"
            data-session="${session.number}"
          >
            <div>
              <div class="card-top">
                <div class="ffs-number">FFS ${session.number}</div>
                <div class="status-badge ${completed ? "complete" : "pending"}">
                  ${completed ? "Complete" : "Not done"}
                </div>
              </div>
              <div class="card-title">${escapeHtml(session.title)}</div>
            </div>
            <div class="card-bottom">
              <span>${escapeHtml(session.detail)}</span>
              <span>${session.items.length} items</span>
            </div>
          </button>
        `;
      }
    )
    .join("");

  holder
    .querySelectorAll(".sim-card")
    .forEach(
      card => {
        card.addEventListener(
          "click",
          () => openSession(Number(card.dataset.session))
        );
      }
    );
}

function openSession(number) {
  currentSession =
    FFS.find(
      session =>
        session.number === number
    );

  if (!currentSession) {
    return;
  }

  currentSessionTab = "briefing";

  document.getElementById("sessionEyebrow").textContent =
    `FFS ${currentSession.number} · ${currentSession.detail}`;

  document.getElementById("sessionTitle").textContent =
    currentSession.title;

  document.getElementById("sessionRoute").textContent =
    currentSession.route;

  renderSessionTab();
  showView("sessionView");
}

function renderSessionTab() {
  document
    .querySelectorAll(".session-tab")
    .forEach(
      button => {
        button.classList.toggle(
          "active",
          button.dataset.sessionTab === currentSessionTab
        );
      }
    );

  const holder =
    document.getElementById("sessionContent");

  if (currentSessionTab === "briefing") {
    holder.innerHTML = renderInfoGrid(currentSession.briefing);
    return;
  }

  if (currentSessionTab === "setup") {
    holder.innerHTML = renderInfoGrid(getSetupRows(currentSession));
    return;
  }

  if (currentSessionTab === "items") {
    holder.innerHTML = renderSessionItems(currentSession);
    return;
  }

  holder.innerHTML = renderDebrief(currentSession);
}

function renderInfoGrid(object) {
  return `
    <div class="info-grid">
      ${
        Object.entries(object)
          .map(
            ([key, value]) => `
              <article class="info-block">
                <span>${escapeHtml(key)}</span>
                <strong>${escapeHtml(value)}</strong>
              </article>
            `
          )
          .join("")
      }
    </div>
  `;
}

function renderSessionItems(session) {
  const completed =
    COMPLETED_SESSIONS.has(session.number);

  return `
    <div class="session-table-wrap">
      <table class="session-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Phase</th>
            <th>Task</th>
            <th>Status</th>
            <th>Lesson note</th>
          </tr>
        </thead>
        <tbody>
          ${
            session.items
              .map(
                (
                  item,
                  index
                ) => {
                  const title =
                    item[0];
                  const phase =
                    normalizeStage(item[1]);
                  const reposition =
                    item[2] === "reposition";

                  return `
                    <tr class="${completed ? "row-complete" : "row-pending"}">
                      <td>${index + 1}</td>
                      <td><span class="phase-pill">${escapeHtml(phase)}</span></td>
                      <td>
                        <strong>${escapeHtml(title)}</strong>
                        ${reposition ? "<small>Reposition / reset item</small>" : ""}
                      </td>
                      <td>
                        <span class="status-badge ${completed ? "complete" : "pending"}">
                          ${completed ? "Passed" : "Planned"}
                        </span>
                      </td>
                      <td>${escapeHtml(getShortLessonNote(title))}</td>
                    </tr>
                  `;
                }
              )
              .join("")
          }
        </tbody>
      </table>
    </div>
  `;
}

function renderDebrief(session) {
  const completed =
    COMPLETED_SESSIONS.has(session.number);

  return `
    <div class="debrief-grid">
      <article class="debrief-card">
        <span>Overall result</span>
        <strong class="${completed ? "result-pass" : "result-pending"}">
          ${completed ? "Pass" : "Pending"}
        </strong>
        <p>
          ${
            completed
              ? "Session objectives met. Crew sequencing, SOP discipline and instructor intervention level were acceptable for this stage of training."
              : "Session available for preview. No pass/fail record is assigned until the simulator detail is flown and instructor grading is complete."
          }
        </p>
      </article>
      <article class="debrief-card">
        <span>Instructor comments</span>
        <strong>${completed ? "Recorded" : "Draft"}</strong>
        <p>${escapeHtml(getOverallComment(session))}</p>
      </article>
      <article class="debrief-card">
        <span>Credit status</span>
        <strong>${completed ? "Logged" : "Not logged"}</strong>
        <p>
          ${
            completed
              ? "Synthetic training credit recorded against the approved A320 type-rating programme."
              : "Training credit remains unavailable until the event is completed and reviewed."
          }
        </p>
      </article>
    </div>
  `;
}

function renderDeviceInventory() {
  const holder =
    document.getElementById("deviceInventory");

  holder.innerHTML =
    DEVICE_INVENTORY.map(
      device => `
        <button class="device-card" type="button" data-device="${escapeHtml(device.name)}">
          <div class="device-type">${escapeHtml(device.type)}</div>
          <svg class="icon device-icon"><use href="#icon-monitor"></use></svg>
          <strong>${escapeHtml(device.name)}</strong>
          <span>${escapeHtml(device.level)}</span>
          <small>${escapeHtml(device.bestFor)}</small>
        </button>
      `
    )
    .join("");

  holder
    .querySelectorAll(".device-card")
    .forEach(
      card => {
        card.addEventListener(
          "click",
          () => openDeviceQualification(
            DEVICE_INVENTORY.find(device => device.name === card.dataset.device)
          )
        );
      }
    );
}

function openDeviceQualification(device) {
  if (!device) {
    return;
  }

  document.getElementById("drawerEyebrow").textContent =
    `${device.type} qualification`;
  document.getElementById("drawerTitle").textContent =
    device.name;
  document.getElementById("drawerBody").innerHTML = `
    <div class="matrix-summary">
      <div>
        <span>Level</span>
        <strong>${escapeHtml(device.level)}</strong>
      </div>
      <div>
        <span>Device feel</span>
        <strong>${escapeHtml(device.motion)}</strong>
      </div>
    </div>
    ${renderInfoGrid(Object.fromEntries(device.qualification))}
  `;

  openDrawer();
}

function renderProgrammes() {
  const holder =
    document.getElementById("programmeList");

  holder.innerHTML =
    PROGRAMMES.map(
      programme => `
        <button class="programme-card" type="button" data-programme="${escapeHtml(programme)}">
          <svg class="icon"><use href="#icon-clipboard"></use></svg>
          <strong>${escapeHtml(programme)}</strong>
          <span>${getProgrammeMeta(programme)}</span>
        </button>
      `
    )
    .join("");

  holder
    .querySelectorAll(".programme-card")
    .forEach(
      card => {
        card.addEventListener(
          "click",
          () => renderProgrammePreview(card.dataset.programme)
        );
      }
    );

  renderProgrammePreview("A320 Type Rating");
}

function renderProgrammePreview(programme) {
  const holder =
    document.getElementById("programmePreview");

  holder.innerHTML = `
    <div class="programme-preview-head">
      <div>
        <span>Selected programme</span>
        <strong>${escapeHtml(programme)}</strong>
      </div>
      <button class="add-button" type="button" data-create="programme">
        ${icon("plus")}
        Session
      </button>
    </div>
    <div class="cards compact-cards">
      ${
        FFS.map(
          session => {
            const completed =
              programme === "A320 Type Rating" &&
              COMPLETED_SESSIONS.has(session.number);

            return `
              <button
                class="sim-card ${completed ? "complete" : "pending"}"
                type="button"
                data-session="${session.number}"
              >
                <div>
                  <div class="card-top">
                    <div class="ffs-number">FFS ${session.number}</div>
                    <div class="status-badge ${completed ? "complete" : "pending"}">
                      ${completed ? "Complete" : "Planned"}
                    </div>
                  </div>
                  <div class="card-title">${escapeHtml(session.title)}</div>
                </div>
                <div class="card-bottom">
                  <span>${escapeHtml(session.detail)}</span>
                  <span>${session.items.length} items</span>
                </div>
              </button>
            `;
          }
        )
        .join("")
      }
    </div>
  `;

  holder
    .querySelectorAll(".sim-card")
    .forEach(
      card => {
        card.addEventListener(
          "click",
          () => openSession(Number(card.dataset.session))
        );
      }
    );

  holder
    .querySelector(".add-button")
    .addEventListener(
      "click",
      () => openCreateDrawer("programme")
    );
}

function getProgrammeMeta(programme) {
  if (programme === "MCC") {
    return "Multi-crew cooperation";
  }

  if (programme.includes("CCQ")) {
    return "Cross-crew qualification";
  }

  if (programme.includes("Revalidation")) {
    return "Proficiency check programme";
  }

  if (programme.includes("Renovation")) {
    return "Lapsed rating recovery";
  }

  return "Type rating programme";
}

function renderTaskMatrix() {
  const tasks =
    getTrainingTasks();

  document.getElementById("taskCount").textContent =
    `${tasks.length} FFS items`;

  document.getElementById("taskMatrix").innerHTML = `
    <table class="task-table">
      <thead>
        <tr>
          <th>FFS</th>
          <th>Item</th>
          <th>Phase</th>
          <th>Training task</th>
          <th>Sim type</th>
          <th>Required Training FCS</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${
          tasks
            .map(
              task => `
                <tr class="task-row" data-task-id="${task.id}">
                  <td>FFS ${task.session}</td>
                  <td>${task.item}</td>
                  <td><span class="phase-pill">${escapeHtml(task.phase)}</span></td>
                  <td><strong>${escapeHtml(task.title)}</strong></td>
                  <td>${escapeHtml(task.simType)}</td>
                  <td>${escapeHtml(task.trainingFcs)}</td>
                  <td>
                    <span class="status-badge ${task.complete ? "complete" : "pending"}">
                      ${task.complete ? "Mapped" : "Draft"}
                    </span>
                  </td>
                </tr>
              `
            )
            .join("")
        }
      </tbody>
    </table>
  `;

  document
    .querySelectorAll(".task-row")
    .forEach(
      row => {
        row.addEventListener(
          "click",
          () => openFcsMatrix(tasks.find(task => task.id === row.dataset.taskId))
        );
      }
    );
}

function getTrainingTasks() {
  return FFS.flatMap(
    session =>
      session.items.map(
        (
          item,
          index
        ) => {
          const title =
            item[0];
          const phase =
            normalizeStage(item[1]);
          const profile =
            classifyTask(title, phase);

          return {
            id:
              `${session.number}-${index + 1}`,
            session:
              session.number,
            item:
              index + 1,
            title,
            phase,
            complete:
              COMPLETED_SESSIONS.has(session.number),
            ...profile
          };
        }
      )
  );
}

function openFcsMatrix(task) {
  if (!task) {
    return;
  }

  document.getElementById("drawerEyebrow").textContent =
    `FFS ${task.session} · Item ${task.item}`;

  document.getElementById("drawerTitle").textContent =
    task.title;

  document.getElementById("drawerBody").innerHTML = `
    <div class="matrix-summary">
      <div>
        <span>Sim type</span>
        <strong>${escapeHtml(task.simType)}</strong>
      </div>
      <div>
        <span>Required Training FCS</span>
        <strong>${escapeHtml(task.trainingFcs)}</strong>
      </div>
      <div>
        <span>Regulatory source</span>
        <strong>${escapeHtml(task.regulatorySource)}</strong>
      </div>
    </div>

    <div class="fcs-table-wrap">
      <table class="fcs-table">
        <thead>
          <tr>
            <th>FCS capability</th>
            <th>Training need</th>
            <th>Device evidence</th>
            <th>Suitability</th>
          </tr>
        </thead>
        <tbody>
          ${
            task.matrix
              .map(
                row => `
                  <tr>
                    <td>${escapeHtml(row.capability)}</td>
                    <td>${escapeHtml(row.need)}</td>
                    <td>${escapeHtml(row.evidence)}</td>
                    <td><span class="status-badge complete">${escapeHtml(row.status)}</span></td>
                  </tr>
                `
              )
              .join("")
          }
        </tbody>
      </table>
    </div>
  `;

  openDrawer();
}

function classifyTask(title, phase) {
  if (/ECAM|Fault|Failure|FIRE|Smoke|HYD|ADR|IR|Generator|Pump|decompression|unreliable/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Systems / malfunctions",
      "Reg. (EU) 2026/781, ORA.ATO.135, CS-FSTD Issue 1",
      [
        ["Aircraft systems", "Failure logic and cockpit effects", "FCS SYS-3, ESL item 2.4", "Suitable"],
        ["Instructor controls", "Trigger, freeze, reposition and reset", "IOS feature declaration", "Suitable"],
        ["Flight deck fidelity", "ECAM, controls and displays", "Qualification certificate", "Suitable"]
      ]
    );
  }

  if (/UPRT|stall|protections|Alternate Law|Mechanical Backup|Alpha Lock/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Flight model / control laws",
      "Part-FCL UPRT/type-rating task, CS-FSTD Issue 1",
      [
        ["Flight controls", "Normal/alternate law response", "FCS FCM-3", "Suitable"],
        ["Flight envelope", "High/low speed and upset cues", "FCS AERO-3", "Suitable"],
        ["Motion and visual cues", "Recognition and recovery support", "ESL cueing entry", "Suitable"]
      ]
    );
  }

  if (/ILS|VOR|NPA|PBN|approach|circle|landing|go-around|sidestep/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Navigation / visual operations",
      "ATO approved programme, FSTD certificate and ESL",
      [
        ["Navigation", "ILS, VOR, NPA or PBN source", "FCS NAV-3", "Suitable"],
        ["Visual system", "Runway, terrain and approach cues", "FCS VIS-3", "Suitable"],
        ["Weather model", "Cloud, wind and visibility setup", "IOS weather capability", "Suitable"]
      ]
    );
  }

  if (/take-off|takeoff|V1|EFATO|windshear|RTO|Reject/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Take-off / runway event",
      "Part-FCL type-rating item, ORA.ATO.135 suitability",
      [
        ["Ground handling", "Acceleration, reject and runway response", "FCS GND-3", "Suitable"],
        ["Engine model", "V1 failure and asymmetric thrust", "FCS ENG-3", "Suitable"],
        ["Environmental cues", "Windshear and visibility effects", "FCS ENV-2", "Suitable"]
      ]
    );
  }

  if (phase === "Ground" || phase === "Taxi") {
    return createFcsProfile(
      "FFS / FTD as approved",
      "Ground operations",
      "Training Manual/OM, ORA.ATO.135",
      [
        ["Flight deck layout", "Switches, displays and flows", "Device configuration statement", "Suitable"],
        ["Ground environment", "Taxi and stand procedures", "ESL airport/scene entry", "Suitable"],
        ["Instructor monitoring", "Pause and assessment record", "IOS observation tools", "Suitable"]
      ]
    );
  }

  return createFcsProfile(
    "Qualified FSTD",
    "General type-rating task",
    "Part-FCL/Part-ORA programme approval",
    [
      ["Aircraft response", "Representative task effects", "FSTD certificate", "Suitable"],
      ["Scenario control", "Instructor setup and monitoring", "IOS declaration", "Suitable"],
      ["Records", "Assessment and credit traceability", "ATO training record", "Suitable"]
    ]
  );
}

function createFcsProfile(simType, fcsFamily, regulatorySource, matrix) {
  return {
    simType,
    fcsFamily,
    trainingFcs:
      fcsFamily,
    regulatorySource,
    matrix:
      matrix.map(
        row => ({
          capability: row[0],
          need: row[1],
          evidence: row[2],
          status: row[3]
        })
      )
  };
}

function getSetupRows(session) {
  return {
    "Aircraft":
      "A320-214",
    "State":
      session.setup["Aircraft state"] || "Training setup",
    "Performance":
      session.setup.Performance || "Instructor selected",
    "ZFW":
      session.setup.ZFW,
    "ZFWCG":
      session.setup.ZFWCG,
    "FOB":
      session.setup.FOB,
    "METAR":
      session.setup.METAR,
    "Departure":
      session.setup.Departure || "LEBL",
    "Arrival":
      session.setup.Arrival || "LEPA"
  };
}

function getShortLessonNote(title) {
  if (/ECAM|Fault|Failure|FIRE|Smoke|HYD|ADR|IR|Generator|Pump/i.test(title)) {
    return "Abnormal recognition, ECAM discipline and task sharing.";
  }

  if (/ILS|VOR|NPA|PBN|approach|circle|landing/i.test(title)) {
    return "Approach preparation, energy management and monitoring.";
  }

  if (/take-off|takeoff|V1|EFATO|windshear|RTO|Reject/i.test(title)) {
    return "Aircraft control, callouts and reject/continue decision.";
  }

  return "SOP flow, crew coordination and aircraft state awareness.";
}

function getOverallComment(session) {
  if (!COMPLETED_SESSIONS.has(session.number)) {
    return "Preview only. Instructor comments will be recorded after the simulator event.";
  }

  return "The crew met the session objectives with clear task sharing and stable aircraft management. Further focus should remain on FMA monitoring, abnormal sequencing and concise operational communication.";
}

function normalizeStage(stage) {
  if (stage === "Takeoff") {
    return "Take Off";
  }

  if (stage === "Climb / Cruise") {
    return "Climb/Cruise";
  }

  return stage;
}

function showView(id) {
  document
    .querySelectorAll(".view")
    .forEach(
      view => {
        view.classList.toggle(
          "active",
          view.id === id
        );
      }
    );

  window.scrollTo(0, 0);
}

function openDrawer() {
  document
    .getElementById("drawer")
    .classList
    .add("open");
}

function closeDrawer() {
  document
    .getElementById("drawer")
    .classList
    .remove("open");
}

function icon(name) {
  return `<svg class="icon"><use href="#icon-${escapeHtml(name)}"></use></svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
      }[character])
    );
}

init();
