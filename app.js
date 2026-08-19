const COMPLETED_SESSIONS = new Set([1, 2, 3, 4, 5]);

const ROLE_LABELS = {
  stakeholder: "ATO Manager",
  tri: "ATO TRI TRE",
  student: "Students",
  manufacturer: "Simulator Manufacturers"
};

const DEVICE_INVENTORY = [
  {
    type: "FFS",
    name: "A320 Full Flight Simulator",
    level: "Legacy FFS Level D / assigned FCS",
    motion: "Full motion, collimated visual",
    aircraft: "A320 CEO",
    readiness: "Qualified",
    bestFor: "V1 cuts, landing, EFATO, smoke, abnormal ECAM",
    sessions: [1, 2, 3, 4, 5, 6, 7],
    qualification: [
      ["Certificate", "EASA FSTD qualification certificate"],
      ["ESL", "A320 CEO, CFM56, LEBL/LEPA/EGLL visual scenes"],
      ["FCS evidence", "Flight dynamics, controls, visual, motion and systems"],
      ["Limitations", "Legacy certificate mapped to capability evidence where required"]
    ]
  },
  {
    type: "FTD",
    name: "A320 Fixed Training Device",
    level: "FTD Level 2 / capability-based candidate",
    motion: "Fixed-base, replicated cockpit",
    aircraft: "A320 CEO",
    readiness: "Approved for procedures",
    bestFor: "Normal procedures, FMS setup, ECAM flows",
    sessions: [1, 2, 3, 5],
    qualification: [
      ["Certificate", "FSTD qualification certificate"],
      ["ESL", "Flight deck, FMGS, ECAM and instructor station"],
      ["FCS evidence", "Systems, navigation, cockpit interface and IOS features"],
      ["Limitations", "No full motion cueing for landing credit"]
    ]
  },
  {
    type: "FNPT",
    name: "FNPT II MCC Trainer",
    level: "FNPT II MCC",
    motion: "Fixed-base generic multi-crew trainer",
    aircraft: "Generic multi-engine jet",
    readiness: "MCC qualified",
    bestFor: "MCC, CRM, IFR procedures, task sharing",
    sessions: [1, 2],
    qualification: [
      ["Certificate", "FNPT II MCC qualification certificate"],
      ["ESL", "Generic jet configuration and MCC instructor tools"],
      ["FCS evidence", "Navigation, crew coordination and procedure training"],
      ["Limitations", "Not type-specific for A320 type-rating handling tasks"]
    ]
  },
  {
    type: "BITD",
    name: "Basic Instrument Trainer",
    level: "BITD legacy training device",
    motion: "Desktop instrument environment",
    aircraft: "Generic SEP/MEP",
    readiness: "Limited scope",
    bestFor: "Basic IFR scan and procedure rehearsal",
    sessions: [1],
    qualification: [
      ["Certificate", "BITD qualification evidence where applicable"],
      ["ESL", "Instrument panel and navigation training setup"],
      ["FCS evidence", "Limited or legacy capability evidence"],
      ["Limitations", "No type-rating credit without approved scope"]
    ]
  },
  {
    type: "CB-FSTD",
    name: "XR Procedure Trainer",
    level: "Capability-based FSTD concept",
    motion: "XR headset, hand controls, no motion platform",
    aircraft: "A320/A330 familiarisation",
    readiness: "Candidate package",
    bestFor: "Flight deck familiarisation, flows, system recognition",
    sessions: [1, 3, 6],
    qualification: [
      ["Certificate", "Future qualification under CS-FSTD Issue 1 if approved"],
      ["ESL", "XR interface, controls and aircraft systems scope"],
      ["FCS evidence", "Flight-deck interface technology and procedural fidelity"],
      ["Limitations", "Credit depends on certificate, ESL and approved programme"]
    ]
  }
];

const AIRCRAFT_TYPES = ["A320", "A330", "A340", "B737", "B757", "B767", "B777"];

const PROGRAMMES = [
  ...AIRCRAFT_TYPES.flatMap(type => [
    `${type} Type Rating`,
    `${type} Revalidation`,
    `${type} Renovation`
  ]),
  "A330 CCQ",
  "MCC"
];

const MANUFACTURER_SCREENS = [
  {
    title: "Device overview",
    rows: [
      ["Model", "A320 FFS-X"],
      ["Software version", "v4.3.0"],
      ["Hardware config", "Six-axis motion, collimated visual, Airbus sidestick"],
      ["Aircraft type", "A320 CEO / CFM56"],
      ["Qualification status", "Authority review in progress"]
    ]
  },
  {
    title: "FCS capability matrix",
    rows: [
      ["Flight model", "Fidelity 3", "MQTG validation pack", "Complete"],
      ["Visual environment", "Fidelity 3", "Airport scene evidence", "Complete"],
      ["Motion cueing", "Fidelity 2", "Cue tuning report", "Amber gap"],
      ["Systems simulation", "Fidelity 3", "ECAM failure library", "Complete"]
    ]
  },
  {
    title: "Evidence & test tracker",
    rows: [
      ["Specs", "System specification baseline", "Pass", "Accepted"],
      ["Validation data", "Aircraft data package", "Pass", "No comment"],
      ["QTG/MQTG", "Engine transient and braking tests", "Amber", "Two repeats required"],
      ["Authority comments", "Visual rain effects", "Open", "Response due"]
    ]
  },
  {
    title: "Change control",
    rows: [
      ["Change", "Software v4.3 changed flight model"],
      ["Affected FCS", "Flight model, engine response, take-off ground roll"],
      ["Retest required", "QTG take-off, climb gradient, single-engine handling"],
      ["Release state", "Blocked until retest pack is signed"]
    ]
  }
];

let currentRole = null;
let currentSession = null;
let currentSessionTab = "briefing";
let currentStakeholderTab = "programmes";

function init() {
  bindGlobalEvents();
  showView("loginView");
}

function bindGlobalEvents() {
  document.querySelectorAll(".login-card").forEach(button => {
    button.addEventListener("click", () => loginAs(button.dataset.role));
  });

  document.getElementById("switchRoleButton").addEventListener("click", () => {
    currentRole = null;
    currentSession = null;
    closeModal();
    showView("loginView");
  });

  document.getElementById("backToPortalButton").addEventListener("click", () => {
    closeModal();
    showView("portalView");
  });

  document.getElementById("brand").addEventListener("click", () => {
    showView(currentRole ? "portalView" : "loginView");
  });

  document.querySelectorAll(".session-tab").forEach(button => {
    button.addEventListener("click", () => {
      currentSessionTab = button.dataset.sessionTab;
      renderSessionTab();
    });
  });

  document.querySelectorAll(".stakeholder-tab").forEach(button => {
    button.addEventListener("click", () => showStakeholderTab(button.dataset.stakeholderTab));
  });

  document.querySelectorAll(".add-button").forEach(button => {
    button.addEventListener("click", () => openCreateModal(button.dataset.create));
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", event => {
    if (event.target.id === "modalBackdrop") {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function loginAs(role) {
  currentRole = role;
  renderPortal();
  showView("portalView");
}

function renderPortal() {
  const isStakeholder = currentRole === "stakeholder";
  const isManufacturer = currentRole === "manufacturer";

  document.getElementById("portalEyebrow").textContent = ROLE_LABELS[currentRole];
  document.getElementById("portalTitle").textContent = isStakeholder
    ? "Dashboard"
    : isManufacturer
      ? "Qualification workspace"
      : "A320 FFS schedule";
  document.getElementById("portalSummary").textContent = isStakeholder
    ? "Review simulator availability, training task requirements and programme schedules."
    : isManufacturer
      ? "SimPortal gives simulator manufacturers one workspace to build, maintain and defend their qualification package."
      : "Review completed simulator sessions and explore upcoming lessons before they are marked as passed.";

  document.getElementById("scheduleArea").style.display =
    !isStakeholder && !isManufacturer ? "block" : "none";
  document.getElementById("stakeholderArea").style.display = isStakeholder ? "block" : "none";
  document.getElementById("manufacturerArea").style.display = isManufacturer ? "block" : "none";

  if (isStakeholder) {
    renderDeviceInventory();
    renderTaskMatrix();
    renderProgrammes();
    showStakeholderTab(currentStakeholderTab);
    return;
  }

  if (isManufacturer) {
    renderManufacturerWorkspace();
    return;
  }

  renderSchedule();
}

function renderSchedule() {
  const holder = document.getElementById("sessionCards");
  holder.innerHTML = FFS.map(session => {
    const state = getSessionState(session.number);
    return `
      <button class="sim-card ${state.className}" type="button" data-session="${session.number}">
        <div>
          <div class="card-top">
            <div class="ffs-number">FFS ${session.number}</div>
            <div class="status-badge ${state.className}">${state.label}</div>
          </div>
          <div class="card-title">${escapeHtml(session.title)}</div>
        </div>
        <div class="card-bottom">
          <span>${escapeHtml(session.detail)}</span>
          <span>${session.items.length} items</span>
        </div>
      </button>
    `;
  }).join("");

  holder.querySelectorAll(".sim-card").forEach(card => {
    card.addEventListener("click", () => openSession(Number(card.dataset.session)));
  });
}

function getSessionState(number) {
  if (currentRole === "tri" && number === 6) {
    return { className: "in-progress", label: "In Progress" };
  }

  if (COMPLETED_SESSIONS.has(number)) {
    return { className: "complete", label: "Complete" };
  }

  return { className: "pending", label: "Not done" };
}

function openSession(number) {
  currentSession = FFS.find(session => session.number === number);
  if (!currentSession) {
    return;
  }

  currentSessionTab = currentRole === "tri" ? "items" : "briefing";
  document.getElementById("sessionEyebrow").textContent =
    `FFS ${currentSession.number} / ${currentSession.detail}`;
  document.getElementById("sessionTitle").textContent = currentSession.title;
  document.getElementById("sessionRoute").textContent = currentSession.route;
  renderSessionTabs();
  renderSessionTab();
  showView("sessionView");
}

function renderSessionTabs() {
  const tabs = document.querySelector(".session-tabs");
  tabs.classList.toggle("tri-tabs", currentRole === "tri");

  document.querySelectorAll(".session-tab").forEach(button => {
    const isTriHidden =
      currentRole === "tri" && !["items", "debrief"].includes(button.dataset.sessionTab);
    button.hidden = isTriHidden;
    button.classList.toggle("active", button.dataset.sessionTab === currentSessionTab);
  });
}

function renderSessionTab() {
  renderSessionTabs();
  const holder = document.getElementById("sessionContent");

  if (currentSessionTab === "briefing") {
    holder.innerHTML = renderOpsBriefing(currentSession);
    return;
  }

  if (currentSessionTab === "setup") {
    holder.innerHTML = renderSetupPage(currentSession);
    return;
  }

  if (currentSessionTab === "items") {
    holder.innerHTML =
      currentRole === "tri"
        ? renderInstructorSessionItems(currentSession)
        : renderSessionItems(currentSession);
    bindSessionRows();
    return;
  }

  holder.innerHTML = renderDebrief(currentSession);
}

function renderOpsBriefing(session) {
  const readings = getReadings(session);
  return `
    <article class="a4-page ops-brief">
      <div class="page-kicker">OPS Briefing / ${escapeHtml(session.route)}</div>
      <h2>FFS ${session.number}: ${escapeHtml(session.title)}</h2>
      <p class="lead">${escapeHtml(session.briefing["Session focus"] || "Simulator training session.")}</p>
      <div class="briefing-flow">
        ${Object.entries(session.briefing).map(([title, text]) => `
          <section>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(text)}</p>
          </section>
        `).join("")}
      </div>
      <section class="reading-section">
        <h3>Related reading</h3>
        <ul>
          ${readings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    </article>
  `;
}

function renderSetupPage(session) {
  const rows = getSetupRows(session);
  return `
    <div class="setup-sheet">
      <div class="setup-strip">
        ${rows.map(row => `
          <article class="setup-pill">
            <span>${escapeHtml(row.label)}</span>
            <strong>${escapeHtml(row.value)}</strong>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderSessionItems(session) {
  const completed = COMPLETED_SESSIONS.has(session.number);
  return `
    <div class="session-table-wrap compact-table-wrap">
      <table class="session-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Task</th>
            <th>Lesson note</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${session.items.map((item, index) => {
            const title = item[0];
            const reposition = item[2] === "reposition";
            return `
              <tr class="session-row ${completed ? "row-complete" : "row-pending"}" data-session-task="${index}">
                <td>${index + 1}</td>
                <td>
                  <strong>${escapeHtml(title)}</strong>
                  ${reposition ? "<small>Reposition / reset item</small>" : ""}
                </td>
                <td>${escapeHtml(getShortLessonNote(title))}</td>
                <td>
                  <span class="status-badge ${completed ? "complete" : "pending"}">
                    ${completed ? "Passed" : "Planned"}
                  </span>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderInstructorSessionItems(session) {
  return `
    <div class="session-table-wrap instructor-wrap">
      <table class="session-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Task</th>
            <th>Instructor notes</th>
            <th>Task result</th>
            <th>Tries</th>
            <th>Recommended reading</th>
          </tr>
        </thead>
        <tbody>
          ${session.items.map((item, index) => {
            const state = getInstructorTaskState(session, index);
            const title = item[0];
            const pending = state.status === "Pending";
            return `
              <tr class="session-row ${state.className}" data-session-task="${index}">
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(title)}</strong></td>
                <td>
                  ${pending
                    ? `<textarea class="note-box" placeholder="Add instructor annotation">${escapeHtml(getInstructorNote(title))}</textarea>`
                    : escapeHtml(getInstructorNote(title))}
                </td>
                <td>
                  ${pending
                    ? `<select class="result-select"><option>Pending</option><option>Pass</option><option>Fail</option></select>`
                    : `<span class="status-badge ${state.className}">${escapeHtml(state.status)}</span>`}
                </td>
                <td>
                  ${pending
                    ? `<input class="tries-input" type="number" min="1" max="5" value="1" aria-label="Number of tries">`
                    : state.tries}
                </td>
                <td>${escapeHtml(getReadings(session)[index % getReadings(session).length])}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getInstructorTaskState(session, index) {
  if (currentRole === "tri" && session.number === 6) {
    if (index < Math.ceil(session.items.length / 2)) {
      return [3, 5].includes(index)
        ? { status: "Failed", className: "failed", tries: 2 }
        : { status: "Done", className: "complete", tries: 1 };
    }

    return { status: "Pending", className: "pending", tries: 1 };
  }

  return COMPLETED_SESSIONS.has(session.number)
    ? { status: "Done", className: "complete", tries: 1 }
    : { status: "Pending", className: "pending", tries: 1 };
}

function renderDebrief(session) {
  const completed = COMPLETED_SESSIONS.has(session.number);
  const isTriActive = currentRole === "tri" && session.number === 6;
  const result = completed ? "Pass" : isTriActive ? "In Progress" : "Pending";

  return `
    <article class="a4-page debrief-report">
      <div class="page-kicker">Instructor report / FFS ${session.number}</div>
      <h2>Debrief Report</h2>
      <section>
        <h3>Overall result</h3>
        <p><strong class="${completed ? "result-pass" : "result-pending"}">${result}</strong></p>
      </section>
      <section>
        <h3>Comments</h3>
        <p>${escapeHtml(getOverallComment(session))}</p>
      </section>
      <section class="reading-section">
        <h3>Recommended reading</h3>
        <ul>
          ${getReadings(session).slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section>
        <h3>Reference video</h3>
        <p><a href="https://www.youtube.com/results?search_query=A320+simulator+abnormal+procedures" target="_blank" rel="noreferrer">A320 simulator abnormal procedures review</a></p>
      </section>
    </article>
  `;
}

function bindSessionRows() {
  document.querySelectorAll(".session-row").forEach(row => {
    row.addEventListener("click", event => {
      if (event.target.matches("textarea, select, input")) {
        return;
      }
      openSessionTaskModal(Number(row.dataset.sessionTask));
    });
  });
}

function openSessionTaskModal(index) {
  const item = currentSession.items[index];
  const title = item[0];
  openModal(
    `FFS ${currentSession.number} / Item ${index + 1}`,
    title,
    `
      <div class="modal-section">
        <h4>Instructor Notes</h4>
        <p>${escapeHtml(getInstructorNote(title))}</p>
      </div>
      <div class="modal-section">
        <h4>Lesson note</h4>
        <p>${escapeHtml(getShortLessonNote(title))}</p>
      </div>
      <div class="pill-row">
        ${getReadings(currentSession).slice(0, 3).map(reading => `<span class="plain-pill">${escapeHtml(reading)}</span>`).join("")}
      </div>
    `
  );
}

function showStakeholderTab(tab) {
  currentStakeholderTab = tab;
  document.querySelectorAll(".stakeholder-tab").forEach(button => {
    button.classList.toggle("active", button.dataset.stakeholderTab === tab);
  });
  document.getElementById("inventoryPanel").classList.toggle("active", tab === "inventory");
  document.getElementById("tasksPanel").classList.toggle("active", tab === "tasks");
  document.getElementById("programmesPanel").classList.toggle("active", tab === "programmes");
}

function renderDeviceInventory() {
  const holder = document.getElementById("deviceInventory");
  holder.innerHTML = DEVICE_INVENTORY.map(device => `
    <button class="device-card" type="button" data-device="${escapeHtml(device.name)}">
      <div class="device-type">${escapeHtml(device.type)}</div>
      <svg class="icon device-icon"><use href="#icon-monitor"></use></svg>
      <strong>${escapeHtml(device.name)}</strong>
      <span>${escapeHtml(device.level)}</span>
      <small>${escapeHtml(device.bestFor)}</small>
    </button>
  `).join("");

  holder.querySelectorAll(".device-card").forEach(card => {
    card.addEventListener("click", () => {
      openDeviceModal(DEVICE_INVENTORY.find(device => device.name === card.dataset.device));
    });
  });
}

function openDeviceModal(device) {
  if (!device) {
    return;
  }

  openModal(
    `${device.type} qualification`,
    device.name,
    `
      <div class="matrix-summary three">
        <div><span>Aircraft</span><strong>${escapeHtml(device.aircraft)}</strong></div>
        <div><span>Readiness</span><strong>${escapeHtml(device.readiness)}</strong></div>
        <div><span>Device feel</span><strong>${escapeHtml(device.motion)}</strong></div>
      </div>
      ${renderInfoGrid(Object.fromEntries(device.qualification))}
      <div class="modal-section">
        <h4>Assigned sessions</h4>
        <div class="pill-row">
          ${device.sessions.map(number => `<span class="plain-pill">FFS ${number}</span>`).join("")}
        </div>
      </div>
    `
  );
}

function renderTaskMatrix() {
  const tasks = getTrainingTasks();
  document.getElementById("taskCount").textContent = `${tasks.length} FFS items`;
  document.getElementById("taskMatrix").innerHTML = `
    <table class="task-table">
      <thead>
        <tr>
          <th>FFS</th>
          <th>Item</th>
          <th>Training task</th>
          <th>Sim type</th>
          <th>Required Training FCS</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${tasks.map(task => `
          <tr class="task-row" data-task-id="${task.id}">
            <td>FFS ${task.session}</td>
            <td>${task.item}</td>
            <td><strong>${escapeHtml(task.title)}</strong></td>
            <td>${escapeHtml(task.simType)}</td>
            <td>${escapeHtml(task.trainingFcs)}</td>
            <td><span class="status-badge ${task.complete ? "complete" : "pending"}">${task.complete ? "Mapped" : "Draft"}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".task-row").forEach(row => {
    row.addEventListener("click", () => openFcsMatrix(tasks.find(task => task.id === row.dataset.taskId)));
  });
}

function getTrainingTasks() {
  return FFS.flatMap(session => session.items.map((item, index) => {
    const title = item[0];
    const phase = normalizeStage(item[1]);
    const profile = classifyTask(title, phase);
    return {
      id: `${session.number}-${index + 1}`,
      session: session.number,
      item: index + 1,
      title,
      phase,
      complete: COMPLETED_SESSIONS.has(session.number),
      ...profile
    };
  }));
}

function openFcsMatrix(task) {
  if (!task) {
    return;
  }

  openModal(
    `FFS ${task.session} / Item ${task.item}`,
    task.title,
    `
      <div class="matrix-summary three">
        <div><span>Sim type</span><strong>${escapeHtml(task.simType)}</strong></div>
        <div><span>Required Training FCS</span><strong>${escapeHtml(task.trainingFcs)}</strong></div>
        <div><span>Reference</span><strong>${escapeHtml(task.regulatorySource)}</strong></div>
      </div>
      <div class="modal-section">
        <h4>Used in programs</h4>
        <div class="pill-row">
          ${getUsedInProgrammes(task).map(programme => `<span class="plain-pill">${escapeHtml(programme)}</span>`).join("")}
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
            ${task.matrix.map(row => `
              <tr>
                <td>${escapeHtml(row.capability)}</td>
                <td>${escapeHtml(row.need)}</td>
                <td>${escapeHtml(row.evidence)}</td>
                <td><span class="status-badge complete">${escapeHtml(row.status)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `
  );
}

function renderProgrammes() {
  const holder = document.getElementById("programmeList");
  const preview = document.getElementById("programmePreview");
  preview.innerHTML = "";
  holder.innerHTML = PROGRAMMES.map(programme => `
    <button class="programme-card" type="button" data-programme="${escapeHtml(programme)}">
      <svg class="icon"><use href="#icon-clipboard"></use></svg>
      <strong>${escapeHtml(programme)}</strong>
      <span>${escapeHtml(getProgrammeMeta(programme))}</span>
    </button>
  `).join("");

  holder.querySelectorAll(".programme-card").forEach(card => {
    card.addEventListener("click", () => openProgrammeModal(card.dataset.programme));
  });
}

function openProgrammeModal(programme) {
  const session = FFS[0];
  openModal(
    "Programme",
    programme,
    `
      <div class="programme-modal-head">
        <div><span>Device plan</span><strong>${programme.includes("MCC") ? "FNPT II MCC + FFS familiarisation" : "A320 FFS / FTD blended path"}</strong></div>
        <div><span>Events</span><strong>${FFS.length} FFS sessions</strong></div>
      </div>
      <div class="cards compact-cards modal-schedule">
        ${FFS.map(item => {
          const state = COMPLETED_SESSIONS.has(item.number)
            ? { className: "complete", label: "Complete" }
            : { className: "pending", label: "Planned" };
          return `
            <button class="sim-card ${state.className}" type="button" data-session="${item.number}">
              <div>
                <div class="card-top">
                  <div class="ffs-number">FFS ${item.number}</div>
                  <div class="status-badge ${state.className}">${state.label}</div>
                </div>
                <div class="card-title">${escapeHtml(item.title)}</div>
              </div>
            </button>
          `;
        }).join("")}
      </div>
      <div class="programme-details">
        <details open>
          <summary>Briefing</summary>
          ${renderOpsBriefing(session)}
        </details>
        <details>
          <summary>Setup</summary>
          ${renderSetupPage(session)}
        </details>
        <details>
          <summary>Session</summary>
          ${renderSessionItems(session)}
        </details>
      </div>
    `
  );

  document.querySelectorAll(".modal-schedule .sim-card").forEach(card => {
    card.addEventListener("click", () => {
      closeModal();
      openSession(Number(card.dataset.session));
    });
  });
}

function renderManufacturerWorkspace() {
  const holder = document.getElementById("manufacturerGrid");
  holder.innerHTML = `
    <div class="manufacturer-matrix">
      ${Array.from({ length: 24 }, (_, index) => `
        <span class="${index % 7 === 0 ? "gap" : "check"}">
          <svg class="icon"><use href="#icon-${index % 7 === 0 ? "alert" : "check"}"></use></svg>
        </span>
      `).join("")}
    </div>
    ${MANUFACTURER_SCREENS.map(screen => `
      <article class="manufacturer-card">
        <h3>${escapeHtml(screen.title)}</h3>
        <table>
          <tbody>
            ${screen.rows.map(row => `
              <tr>
                <th>${escapeHtml(row[0])}</th>
                <td>${row.slice(1).map(value => escapeHtml(value)).join(" / ")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </article>
    `).join("")}
  `;
}

function openCreateModal(type) {
  const labels = {
    device: "Device",
    task: "Training Task",
    programme: "Programme"
  };
  const label = labels[type] || "Record";
  openModal(
    "Create new",
    label,
    `<div class="readonly-comments">This demo button marks where a user would create a new ${escapeHtml(label.toLowerCase())}.</div>`
  );
}

function classifyTask(title, phase) {
  if (/ECAM|Fault|Failure|FIRE|Smoke|HYD|ADR|IR|Generator|Pump|decompression|unreliable/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Systems / malfunctions",
      "Reg. (EU) 2026/781; ED Decision 2026/006/R AMC/GM; CS-FSTD Issue 1",
      [
        ["Aircraft systems", "Failure logic and cockpit effects", "FCS SYS-3", "Suitable"],
        ["Instructor controls", "Trigger, freeze, reposition and reset", "IOS feature declaration", "Suitable"],
        ["Flight deck fidelity", "ECAM, controls and displays", "Qualification certificate", "Suitable"]
      ]
    );
  }

  if (/UPRT|stall|protections|Alternate Law|Mechanical Backup|Alpha Lock/i.test(title)) {
    return createFcsProfile(
      "FFS Level D",
      "Flight model / control laws",
      "Part-FCL UPRT/type-rating task; CS-FSTD Issue 1",
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
      "ATO approved programme; FSTD certificate and ESL",
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
      "Part-FCL type-rating item; ORA.ATO.135 suitability",
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
      "Training Manual/OM; ORA.ATO.135",
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
    trainingFcs: fcsFamily,
    regulatorySource,
    matrix: matrix.map(row => ({
      capability: row[0],
      need: row[1],
      evidence: row[2],
      status: row[3]
    }))
  };
}

function getSetupRows(session) {
  return [
    ["Aircraft", "A320-214 / CFM56"],
    ["Departure", session.setup.Departure || "LEBL"],
    ["Arrival", session.setup.Arrival || "LEPA"],
    ["Aircraft state", session.setup["Aircraft state"] || "Training setup"],
    ["Performance", session.setup.Performance || "Instructor selected"],
    ["ZFW", session.setup.ZFW || "62.1 t"],
    ["ZFWCG", session.setup.ZFWCG || "29.0%"],
    ["FOB", session.setup.FOB || "7.4 t"],
    ["METAR", session.setup.METAR || "LEBL 120620Z 09008KT 9999 FEW025 23/16 Q1018 NOSIG"]
  ].map(([label, value]) => ({ label, value }));
}

function getReadings(session) {
  const base = [
    "FCOM-NPO-012 Normal operations / cockpit preparation",
    "FCOM-PRO-034 Take-off and initial climb",
    "FCOM-ABN-071 ECAM management and failure handling",
    "FCOM-NAV-045 Managed guidance and approach preparation",
    "FCOM-PER-018 Landing performance assessment",
    "FCOM-FCTM-022 Raw data and manual flight"
  ];
  return base.map((item, index) => `${item}.${String((session.number + index) % 9 + 1).padStart(2, "0")}`);
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

function getInstructorNote(title) {
  if (/V1|EFATO|engine|fire/i.test(title)) {
    return "Watch reject/continue decision timing and keep PM callouts crisp.";
  }

  if (/approach|ILS|VOR|PBN|landing/i.test(title)) {
    return "Monitor FMA changes, energy trend and stabilisation gates.";
  }

  if (/ECAM|Fault|Failure/i.test(title)) {
    return "Let the crew verbalise status before actioning ECAM items.";
  }

  return "Use this item to check SOP rhythm and workload split.";
}

function getOverallComment(session) {
  if (currentRole === "tri" && session.number === 6) {
    return "Live assessment in progress. Initial handling is acceptable, with further notes required on abnormal sequencing and approach stabilisation.";
  }

  if (!COMPLETED_SESSIONS.has(session.number)) {
    return "Preview only. Instructor comments will be recorded after the simulator event.";
  }

  return "Session objectives met. Crew task sharing, SOP discipline and aircraft energy management were acceptable for this stage of training.";
}

function getProgrammeMeta(programme) {
  if (programme === "MCC") {
    return "Multi-crew cooperation";
  }

  if (programme.includes("CCQ")) {
    return "Cross-crew qualification";
  }

  if (programme.includes("Revalidation")) {
    return "Proficiency check";
  }

  if (programme.includes("Renovation")) {
    return "Lapsed rating recovery";
  }

  return "Type rating programme";
}

function getUsedInProgrammes(task) {
  const options = ["A320 Type Rating", "B737 Type Rating", "A330 CCQ", "A320 Revalidation", "MCC"];
  return options.filter((_, index) => (task.item + task.session + index) % 2 === 0).slice(0, 3);
}

function renderInfoGrid(object) {
  return `
    <div class="info-grid">
      ${Object.entries(object).map(([key, value]) => `
        <article class="info-block">
          <span>${escapeHtml(key)}</span>
          <strong>${escapeHtml(value)}</strong>
        </article>
      `).join("")}
    </div>
  `;
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
  document.querySelectorAll(".view").forEach(view => {
    view.classList.toggle("active", view.id === id);
  });
  closeModal();
  window.scrollTo(0, 0);
}

function openModal(eyebrow, title, body) {
  document.getElementById("modalEyebrow").textContent = eyebrow;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
}

function escapeHtml(value) {
  return String(value)
    .replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character]));
}

init();
