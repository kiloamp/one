/* ================================================= */
/* STATE */
/* ================================================= */

let currentSession = null;


/* ================================================= */
/* DASHBOARD */
/* ================================================= */

function renderDashboard() {

  const holder =
    document.getElementById(
      "sessionCards"
    );


  holder.innerHTML =
    FFS.map(
      session => `

        <button
          class="sim-card"
          data-session="${session.number}"
        >

          <div>

            <div class="card-top">

              <div class="ffs-number">
                FFS ${session.number}
              </div>

              <div class="arrow">
                ↗
              </div>

            </div>


            <div class="card-title">
              ${escapeHtml(session.title)}
            </div>

          </div>


          <div class="card-bottom">

            <span>
              ${escapeHtml(session.detail)}
            </span>

            <span>
              ${session.items.length} items
            </span>

          </div>

        </button>

      `
    )
    .join("");


  holder
    .querySelectorAll(
      ".sim-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "click",
          () => {

            openSession(
              Number(
                card.dataset.session
              )
            );

          }
        );

      }
    );

}


function renderTaskMatrix() {

  const holder =
    document.getElementById(
      "taskMatrix"
    );


  const count =
    document.getElementById(
      "taskCount"
    );


  const tasks =
    getTrainingTasks();


  count.textContent =
    `${tasks.length} individual tasks`;


  holder.innerHTML = `

    <table class="task-table">

      <thead>

        <tr>
          <th>EASA basis</th>
          <th>Training task</th>
          <th>FSTD / tool</th>
          <th>FCS capability area</th>
          <th>Evidence to retain</th>
          <th>Training credit</th>
        </tr>

      </thead>

      <tbody>

        ${
          tasks
            .map(
              task => `

                <tr>
                  <td>
                    <strong>${escapeHtml(task.basis)}</strong>
                    ${escapeHtml(task.source)}
                  </td>
                  <td>
                    <strong>FFS ${task.session} · Item ${task.item}</strong>
                    ${escapeHtml(task.title)}
                  </td>
                  <td>
                    <span class="task-pill">${escapeHtml(task.tool)}</span>
                  </td>
                  <td>${escapeHtml(task.capability)}</td>
                  <td>${escapeHtml(task.evidence)}</td>
                  <td>${escapeHtml(task.credit)}</td>
                </tr>

              `
            )
            .join("")
        }

      </tbody>

    </table>

  `;

}


function getTrainingTasks() {

  return FFS.flatMap(
    session =>
      session.items.map(
        (
          item,
          index
        ) => {

          const [
            title,
            stage,
            marker
          ] =
            item;

          const category =
            classifyTask(
              title,
              normalizeStage(
                stage
              )
            );

          return {
            session:
              session.number,

            item:
              index + 1,

            title,

            basis:
              category.basis,

            source:
              category.source,

            tool:
              marker ===
              "reposition"
                ? `${category.tool} + reposition`
                : category.tool,

            capability:
              category.capability,

            evidence:
              category.evidence,

            credit:
              category.credit
          };

        }
      )
  );

}


function classifyTask(
  title,
  stage
) {

  if (
    /ECAM|Fault|Failure|FIRE|Smoke|HYD|ADR|IR|Generator|Pump|decompression|unreliable/i.test(
      title
    )
  ) {

    return {
      basis:
        "Part-FCL training programme",
      source:
        "ORA.ATO.135 suitability check; CS-FSTD capability evidence",
      tool:
        "FFS qualified for A320 abnormal/system simulation",
      capability:
        "Aircraft systems, failures, alerts, procedures, instructor station",
      evidence:
        "Approved syllabus item, FSTD certificate/ESL, defect status, instructor scenario notes",
      credit:
        "Type-rating synthetic training credit when programme approval and FSTD suitability align"
    };

  }


  if (
    /UPRT|stall|protections|Alternate Law|Mechanical Backup|Alpha Lock/i.test(
      title
    )
  ) {

    return {
      basis:
        "Part-FCL UPRT/type-rating task",
      source:
        "Reg. (EU) 2026/781 and CS-FSTD Issue 1 capability framework",
      tool:
        "FFS with flight model and control-law fidelity",
      capability:
        "Flight envelope, flight controls, cueing, aerodynamic model",
      evidence:
        "Task objective, fidelity need, FSTD qualification limits, instructor grading record",
      credit:
        "Credit limited to approved manoeuvres and simulator qualification envelope"
    };

  }


  if (
    /ILS|VOR|NPA|PBN|approach|circle|landing|go-around|sidestep/i.test(
      title
    )
  ) {

    return {
      basis:
        "Part-FCL type-rating manoeuvre",
      source:
        "ATO approved training programme; FSTD certificate and ESL",
      tool:
        "FFS or suitable FSTD with navigation/visual capability",
      capability:
        "Navigation, visual scene, flight guidance, weather, landing cues",
      evidence:
        "Approach type, required visual/weather setup, FSTD capability match, assessment result",
      credit:
        "Synthetic training credit per approved programme and device suitability"
    };

  }


  if (
    /take-off|takeoff|V1|EFATO|windshear|RTO|Reject/i.test(
      title
    )
  ) {

    return {
      basis:
        "Part-FCL take-off/abnormal task",
      source:
        "ATO syllabus, ORA.ATO.135, CS-FSTD qualification evidence",
      tool:
        "FFS with runway, motion/visual and failure insertion",
      capability:
        "Ground roll, engine failure, windshear cues, visual/motion, performance",
      evidence:
        "Performance data, event trigger, FSTD setup, crew role, pass/fail record",
      credit:
        "Creditable when the selected FSTD covers the required task effects"
    };

  }


  if (
    stage ===
    "Ground" ||
    stage ===
    "Taxi"
  ) {

    return {
      basis:
        "Part-ORA ATO procedure",
      source:
        "Training Manual/OM and approved simulator session plan",
      tool:
        "FFS cockpit procedures or classroom briefing as approved",
      capability:
        "Cockpit layout, controls, displays, ground/taxi environment, instructor control",
      evidence:
        "Lesson plan, setup data, instructor briefing, student completion record",
      credit:
        "Credit follows approved programme allocation"
    };

  }


  return {
    basis:
      "ATO approved syllabus",
    source:
      "Part-FCL/Part-ORA programme approval and FSTD suitability",
    tool:
      "Selected FSTD per certificate and ESL",
    capability:
      "Scenario, aircraft response, environment, instructor control",
    evidence:
      "Task objective, selected device, limitations, mitigations, assessment",
    credit:
      "Credit recorded against the approved training programme"
  };

}


/* ================================================= */
/* SESSION OPEN */
/* ================================================= */

function openSession(
  number
) {

  currentSession =
    FFS.find(
      item =>
        item.number ===
        number
    );


  if (!currentSession) {
    return;
  }


  document
    .getElementById(
      "sessionEyebrow"
    )
    .textContent =
      `FFS ${currentSession.number} · ${currentSession.detail}`;


  document
    .getElementById(
      "sessionTitle"
    )
    .textContent =
      currentSession.title;


  document
    .getElementById(
      "sessionRoute"
    )
    .textContent =
      currentSession.route;


  renderFlight(
    currentSession
  );


  showView(
    "sessionView"
  );


  setTimeout(
    () => {

      document
        .getElementById(
          "timelineScroll"
        )
        .scrollLeft =
          0;

    },
    20
  );

}


/* ================================================= */
/* BUILD SEGMENTS */
/* ================================================= */

function buildSegments(
  session
) {

  const segments = [];

  let current = [];


  session.items.forEach(
    (
      item,
      index
    ) => {

      const [
        title,
        stage,
        marker
      ] =
        item;


      const reposition =
        marker ===
        "reposition" ||
        /^reposition/i.test(
          title
        ) ||
        /^repeat items/i.test(
          title
        ) ||
        /^repeat applicable/i.test(
          title
        ) ||
        /repair aircraft/i.test(
          title
        );


      if (
        reposition &&
        current.length
      ) {

        segments.push({
          items:
            current,

          reposition:
            {
              title,
              index
            }
        });


        current = [];

        return;

      }


      current.push({
        title,
        stage:
          normalizeStage(
            stage
          ),
        index
      });

    }
  );


  if (
    current.length
  ) {

    segments.push({
      items:
        current,

      reposition:
        null
    });

  }


  return segments;

}


/* ================================================= */
/* RENDER FLIGHT */
/* ================================================= */

function renderFlight(
  session
) {

  const flightArea =
    document.getElementById(
      "flightArea"
    );


  const timeline =
    document.getElementById(
      "timeline"
    );


  const segments =
    buildSegments(
      session
    );


  const preflightWidth =
    360;


  const repositionGap =
    105;


  const segmentWidths =
    segments.map(
      getSegmentWidth
    );


  const totalWidth =
    preflightWidth +
    segmentWidths.reduce(
      (
        total,
        width
      ) =>
        total +
        width,
      0
    ) +
    (
      Math.max(
        0,
        segments.length - 1
      ) *
      repositionGap
    ) +
    150;


  timeline.style.width =
    `${totalWidth + 140}px`;


  flightArea.style.width =
    `${totalWidth}px`;


  let html = `

    <div class="preflight-zone">

      <div class="preflight-label">
        Pre-sim
      </div>

    </div>


    ${renderPreSimBlock(session)}


    <div
      class="origin-label"
    >

      <div class="airport-code">
        LEBL
      </div>

      <div class="airport-city">
        Barcelona
      </div>

    </div>

  `;


  let segmentLeft =
    preflightWidth;


  segments.forEach(
    (
      segment,
      segmentIndex
    ) => {

      html +=
        renderSegment(
          session,
          segment,
          segmentLeft,
          segmentWidths[
            segmentIndex
          ],
          segmentIndex
        );


      segmentLeft +=
        segmentWidths[
          segmentIndex
        ];


      if (
        segment.reposition &&
        segmentIndex <
        segments.length - 1
      ) {

        const dividerX =
          segmentLeft +
          repositionGap / 2;


        html += `

          <div
            class="reposition-divider"
            style="
              left:${dividerX}px
            "
          >

            <div class="reposition-pill">
              Reposition
            </div>

          </div>

        `;


        segmentLeft +=
          repositionGap;

      }

    }
  );


  html += `

    <div
      class="destination-label"
    >

      <div class="airport-code">
        LEPA
      </div>

      <div class="airport-city">
        Palma
      </div>

    </div>

  `;


  flightArea.innerHTML =
    html;


  bindFlightEvents(
    session
  );


  bindPreSimTabs();

}


/* ================================================= */
/* PRE-SIM BLOCK */
/* ================================================= */

function renderPreSimBlock(
  session
) {

  return `

    <section
      class="setup-block"
      aria-label="Pre-sim briefing and aircraft setup"
    >

      <div
        class="pre-sim-tabs"
        role="tablist"
        aria-label="Pre-sim data"
      >

        <button
          class="pre-sim-tab active"
          type="button"
          data-pre-sim-tab="briefing"
          aria-selected="true"
        >
          Briefing
        </button>

        <button
          class="pre-sim-tab"
          type="button"
          data-pre-sim-tab="setup"
          aria-selected="false"
        >
          Setup
        </button>

      </div>


      <div
        class="pre-sim-panel active"
        data-pre-sim-panel="briefing"
      >

        ${renderMiniRows(session.briefing)}

      </div>


      <div
        class="pre-sim-panel"
        data-pre-sim-panel="setup"
      >

        ${renderMiniRows(getSetupRows(session))}

      </div>

    </section>

  `;

}


function renderMiniRows(
  object
) {

  return `

    <div class="setup-mini-list">

      ${
        Object.entries(
          object
        )
          .map(
            ([key, value]) => `

              <div class="setup-mini-row">

                <div class="setup-mini-key">
                  ${escapeHtml(key)}
                </div>

                <div class="setup-mini-value">
                  ${escapeHtml(value)}
                </div>

              </div>

            `
          )
          .join("")
      }

    </div>

  `;

}


function getSetupRows(
  session
) {

  return {
    "Aircraft":
      "A320-214",

    "State":
      session.setup[
        "Aircraft state"
      ] ||
      "Training setup",

    "ZFW":
      session.setup.ZFW ||
      "Training value",

    "ZFWCG":
      session.setup.ZFWCG ||
      "Training value",

    "FOB":
      session.setup.FOB ||
      "Training value",

    "METAR":
      session.setup.METAR ||
      "Instructor selected",

    "Departure":
      session.setup.Departure ||
      "LEBL",

    "Arrival":
      session.setup.Arrival ||
      "LEPA"
  };

}


/* ================================================= */
/* RENDER ONE FLIGHT SEGMENT */
/* ================================================= */

function renderSegment(
  session,
  segment,
  left,
  width,
  segmentIndex
) {

  const stageWidths =
    getStageWidths(
      segment
    );


  const stageStarts = {};

  let currentStageLeft =
    0;


  STAGES.forEach(
    (
      stage,
      index
    ) => {

      stageStarts[stage] =
        currentStageLeft;

      currentStageLeft +=
        stageWidths[index];

    }
  );


  const stageCounts = {};
  const stageTotals = {};


  STAGES.forEach(
    stage => {

      stageCounts[stage] =
        0;

      stageTotals[stage] =
        segment
          .items
          .filter(
            item =>
              item.stage ===
              stage
          )
          .length;

    }
  );


  const points =
    segment.items.map(
      item => {

        const occurrence =
          stageCounts[
            item.stage
          ]++;


        const totalInStage =
          stageTotals[
            item.stage
          ];


        const stagePadding =
          Math.min(
            54,
            stageWidths[
              STAGES.indexOf(
                item.stage
              )
            ] * .16
          );


        const usableStageWidth =
          stageWidths[
            STAGES.indexOf(
              item.stage
            )
          ] -
          stagePadding * 2;


        const x =
          left +
          stageStarts[
            item.stage
          ] +
          stagePadding +
          (
            usableStageWidth *
            (
              occurrence + 1
            )
          ) /
          (
            totalInStage + 1
          );


        const laneOffsets =
          getStageLaneOffsets(
            item.stage
          );


        const y =
          STAGE_Y[
            item.stage
          ] +
          laneOffsets[
            occurrence %
            laneOffsets.length
          ];


        return {
          ...item,
          x,
          y
        };

      }
    );


  let html = `

    <div
      class="segment"
      style="
        left:${left}px;
        width:${width}px
      "
    >

      <div
        class="segment-stage-row"
        style="
          grid-template-columns:${stageWidths.map(width => `${width}px`).join(" ")}
        "
      >

        ${
          STAGES.map(
            stage => `

              <div class="segment-stage">
                ${stage}
              </div>

            `
          )
          .join("")
        }

      </div>


      <svg
        class="flight-svg"
        viewBox="0 0 ${width} 480"
        preserveAspectRatio="none"
      >

        ${
          renderPath(
            points,
            left
          )
        }

      </svg>

    </div>

  `;


  points.forEach(
    point => {

      html += `

        <button
          class="event ${getResultClass(session, point.index)}"
          data-type="event"
          data-index="${point.index}"
          style="
            left:${point.x}px;
            top:${point.y}px
          "
        >

          <div class="event-dot"></div>

          <div class="event-title">
            ${escapeHtml(
              shortenTitle(
                point.title
              )
            )}
          </div>

          <div class="event-sub">
            ${escapeHtml(point.stage)}
          </div>

        </button>

      `;

    }
  );


  return html;

}


function getSegmentWidth(
  segment
) {

  return getStageWidths(
    segment
  )
    .reduce(
      (
        total,
        width
      ) =>
        total +
        width,
      0
    );

}


function getStageWidths(
  segment
) {

  return STAGES.map(
    stage => {

      const count =
        segment
          .items
          .filter(
            item =>
              item.stage ===
              stage
          )
          .length;

      if (
        count ===
        0
      ) {
        return 160;
      }


      return 240 +
        count *
        170;

    }
  );

}


function getStageLaneOffsets(
  stage
) {

  const lanes = {
    "Ground": [
      0,
      -36,
      -72,
      -108,
      36,
      72,
      108,
      -140,
      140
    ],

    "Taxi": [
      0,
      -36,
      36,
      -72,
      72,
      -108,
      108
    ],

    "Take Off": [
      0,
      -40,
      40,
      -80,
      80,
      120,
      -120
    ],

    "Climb/Cruise": [
      0,
      42,
      84,
      126,
      168,
      210,
      252,
      294,
      336
    ],

    "Approach": [
      0,
      -42,
      42,
      -84,
      84,
      -126,
      126,
      168,
      210
    ],

    "Landing": [
      0,
      -42,
      42,
      -84,
      84,
      -126,
      126
    ],

    "Rollout": [
      0,
      -42,
      42,
      -84,
      84,
      -126,
      126
    ]
  };


  return (
    lanes[stage] ||
    [
      0
    ]
  );

}


/* ================================================= */
/* PATH */
/* ================================================= */

function renderPath(
  points,
  segmentLeft
) {

  if (
    points.length <
    2
  ) {
    return "";
  }


  const local =
    points.map(
      point => ({
        x:
          point.x -
          segmentLeft,

        y:
          point.y -
          54
      })
    );


  const path =
    createSmoothPath(
      local
    );


  return `

    <path
      class="flight-path-shadow"
      d="${path}"
    ></path>

    <path
      class="flight-path"
      d="${path}"
    ></path>

  `;

}


function createSmoothPath(
  points
) {

  let d =
    `M ${points[0].x} ${points[0].y}`;


  for (
    let i = 1;
    i < points.length;
    i++
  ) {

    const a =
      points[
        i - 1
      ];


    const b =
      points[i];


    const dx =
      b.x -
      a.x;


    const c1 =
      a.x +
      dx * .42;


    const c2 =
      a.x +
      dx * .58;


    d +=
      ` C ${c1} ${a.y}, ${c2} ${b.y}, ${b.x} ${b.y}`;

  }


  return d;

}


/* ================================================= */
/* CLICK EVENTS */
/* ================================================= */

function bindFlightEvents(
  session
) {

  document
    .querySelectorAll(
      ".event"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const type =
              button.dataset.type;


            if (
              type ===
              "briefing"
            ) {

              openBriefing(
                session
              );

              return;

            }


            if (
              type ===
              "setup"
            ) {

              openSetup(
                session
              );

              return;

            }


            if (
              type ===
              "event"
            ) {

              openEvent(
                session,
                Number(
                  button.dataset.index
                )
              );

            }

          }
        );

      }
    );

}


function bindPreSimTabs() {

  document
    .querySelectorAll(
      ".pre-sim-tab"
    )
    .forEach(
      button => {

        button
          .addEventListener(
            "click",
            () => {

              const tab =
                button.dataset.preSimTab;


              document
                .querySelectorAll(
                  ".pre-sim-tab"
                )
                .forEach(
                  item => {

                    const active =
                      item.dataset.preSimTab ===
                      tab;

                    item
                      .classList
                      .toggle(
                        "active",
                        active
                      );

                    item
                      .setAttribute(
                        "aria-selected",
                        active
                          ? "true"
                          : "false"
                      );

                  }
                );


              document
                .querySelectorAll(
                  ".pre-sim-panel"
                )
                .forEach(
                  panel => {

                    panel
                      .classList
                      .toggle(
                        "active",
                        panel.dataset.preSimPanel ===
                        tab
                      );

                  }
                );

            }
          );

      }
    );

}


/* ================================================= */
/* BRIEFING */
/* ================================================= */

function openBriefing(
  session
) {

  document
    .getElementById(
      "drawerEyebrow"
    )
    .textContent =
      `FFS ${session.number} · Pre-sim`;


  document
    .getElementById(
      "drawerTitle"
    )
    .textContent =
      "Briefing";


  document
    .getElementById(
      "drawerBody"
    )
    .innerHTML = `

      <div class="field">

        <div class="field-label">
          Briefing items
        </div>

        ${renderDetailRows(
          session.briefing
        )}

      </div>

    `;


  openDrawer();

}


/* ================================================= */
/* AIRCRAFT SETUP */
/* ================================================= */

function openSetup(
  session
) {

  document
    .getElementById(
      "drawerEyebrow"
    )
    .textContent =
      `FFS ${session.number} · Pre-sim`;


  document
    .getElementById(
      "drawerTitle"
    )
    .textContent =
      "Aircraft Setup";


  document
    .getElementById(
      "drawerBody"
    )
    .innerHTML = `

      <div class="field">

        <div class="field-label">
          Aircraft data
        </div>

        ${renderDetailRows({
          "Aircraft":
            "A320",

          "ZFW":
            session.setup.ZFW ||
            "Training value",

          "ZFWCG":
            session.setup.ZFWCG ||
            "Training value",

          "FOB":
            session.setup.FOB ||
            "Training value"
        })}

      </div>


      <div class="field">

        <div class="field-label">
          Session setup
        </div>

        ${
          renderDetailRows(
            Object.fromEntries(
              Object.entries(
                session.setup
              )
              .filter(
                ([key]) =>
                  ![
                    "ZFW",
                    "ZFWCG",
                    "FOB"
                  ]
                  .includes(
                    key
                  )
              )
            )
          )
        }

      </div>

    `;


  openDrawer();

}


/* ================================================= */
/* SAVED EVENT */
/* ================================================= */

function openEvent(
  session,
  index
) {

  const item =
    session.items[
      index
    ];


  if (!item) {
    return;
  }


  const title =
    item[0];


  const stage =
    normalizeStage(
      item[1]
    );


  const attempts =
    getAttempts(
      session.number,
      index
    );


  document
    .getElementById(
      "drawerEyebrow"
    )
    .textContent =
      `${stage} · Item ${index + 1}`;


  document
    .getElementById(
      "drawerTitle"
    )
    .textContent =
      title;


  document
    .getElementById(
      "drawerBody"
    )
    .innerHTML = `

      <div class="field">

        <div class="field-label">
          Attempts
        </div>

        <div class="attempts">

          <table>

            <thead>

              <tr>

                <th>
                  Attempt
                </th>

                <th>
                  Result
                </th>

              </tr>

            </thead>


            <tbody>

              ${
                attempts
                .map(
                  (
                    attempt,
                    attemptIndex
                  ) => `

                    <tr>

                      <td>
                        Try ${attemptIndex + 1}
                      </td>

                      <td>

                        <span
                          class="
                            status
                            ${attempt.result}
                          "
                        >

                          ${
                            attempt.result ===
                            "pass"
                              ? "✓ Pass"
                              : "× Not passed"
                          }

                        </span>

                      </td>

                    </tr>

                  `
                )
                .join("")
              }

            </tbody>

          </table>

        </div>

      </div>


      <div class="field">

        <div class="field-label">
          Instructor comments
        </div>

        <div class="readonly-comments">
          ${escapeHtml(
            getComment(
              session,
              index
            )
          )}
        </div>

      </div>

    `;


  openDrawer();

}


/* ================================================= */
/* MOCK ATTEMPTS */
/* ================================================= */

function getAttempts(
  sessionNumber,
  index
) {

  const retrained =
    (
      sessionNumber +
      index
    ) % 7 ===
    0;


  if (
    retrained
  ) {

    return [
      {
        result:
          "fail"
      },

      {
        result:
          "pass"
      }
    ];

  }


  return [
    {
      result:
        "pass"
    }
  ];

}


function getResultClass(
  session,
  index
) {

  const attempts =
    getAttempts(
      session.number,
      index
    );


  return attempts[
    attempts.length - 1
  ].result;

}


/* ================================================= */
/* COMMENTS */
/* ================================================= */

function getComment(
  session,
  index
) {

  const title =
    session.items[
      index
    ][0];


  const attempts =
    getAttempts(
      session.number,
      index
    );


  if (
    attempts.length >
    1
  ) {

    return (
      "The first attempt did not reach the required standard. " +
      "Recognition and sequencing were slower than expected and the exercise required a repeat. " +
      "During the second attempt the crew identified the situation earlier, prioritised the aircraft correctly and maintained clearer task sharing. " +
      "The repeated exercise was completed to the expected standard with less instructor intervention."
    );

  }


  if (
    /ECAM|Fault|Failure|FIRE|Smoke|HYD|ADR|IR|Generator|Pump/i.test(
      title
    )
  ) {

    return (
      "The malfunction was identified correctly and the crew maintained an orderly response. " +
      "The aircraft state remained understood while the abnormal actions were completed and the operational consequences were reviewed before continuing. " +
      "PF and PM duties were clear and irreversible actions were confirmed appropriately. " +
      "The exercise met the expected standard."
    );

  }


  if (
    /ILS|VOR|NPA|PBN|approach|circle|landing/i.test(
      title
    )
  ) {

    return (
      "The approach was prepared in sufficient time and the crew maintained awareness of configuration, automation and landing implications. " +
      "The flight path remained controlled while the required changes were incorporated into the briefing. " +
      "Monitoring between PF and PM was effective and the exercise was completed to the expected standard."
    );

  }


  if (
    /take-off|takeoff|V1|EFATO|windshear/i.test(
      title
    )
  ) {

    return (
      "Aircraft control was prioritised correctly throughout the exercise. " +
      "Callouts and task sharing remained clear and the crew avoided rushing into secondary actions before the flight path was stabilised. " +
      "The required sequence was completed in a structured manner and the exercise met the expected standard."
    );

  }


  return (
    "The exercise was completed to the expected standard. " +
    "Crew coordination remained clear, the required sequence was followed and the aircraft state was monitored throughout. " +
    "No significant instructor intervention was required."
  );

}


/* ================================================= */
/* HELPERS */
/* ================================================= */

function normalizeStage(
  stage
) {

  if (
    stage ===
    "Takeoff"
  ) {
    return "Take Off";
  }


  if (
    stage ===
    "Climb / Cruise"
  ) {
    return "Climb/Cruise";
  }


  return stage;

}


function shortenTitle(
  title
) {

  return title

    .replace(
      /^Radar vectors to /i,
      ""
    )

    .replace(
      /^Radar-vectored /i,
      ""
    )

    .replace(
      /^Vectors to /i,
      ""
    )

    .replace(
      /^During climb to /i,
      ""
    );

}


function renderDetailRows(
  object
) {

  return `

    <div class="detail-list">

      ${
        Object.entries(
          object
        )
        .map(
          ([key, value]) => `

            <div class="detail-row">

              <div class="detail-key">
                ${escapeHtml(key)}
              </div>

              <div class="detail-value">
                ${escapeHtml(value)}
              </div>

            </div>

          `
        )
        .join("")
      }

    </div>

  `;

}


function escapeHtml(
  value
) {

  return String(
    value
  )
  .replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character])
  );

}


/* ================================================= */
/* DRAWER */
/* ================================================= */

function openDrawer() {

  document
    .getElementById(
      "drawer"
    )
    .classList
    .add(
      "open"
    );

}


function closeDrawer() {

  document
    .getElementById(
      "drawer"
    )
    .classList
    .remove(
      "open"
    );

}


/* ================================================= */
/* VIEWS */
/* ================================================= */

function showView(
  id
) {

  document
    .querySelectorAll(
      ".view"
    )
    .forEach(
      view => {

        view
          .classList
          .remove(
            "active"
          );

      }
    );


  document
    .getElementById(
      id
    )
    .classList
    .add(
      "active"
    );


  document
    .getElementById(
      "dashboardButton"
    )
    .style.display =
      id ===
      "dashboardView"
        ? "none"
        : "inline-flex";


  closeDrawer();


  window.scrollTo(
    0,
    0
  );

}


function showDashboardTab(
  tab
) {

  document
    .querySelectorAll(
      ".dashboard-tab"
    )
    .forEach(
      button => {

        const active =
          button.dataset.dashboardTab ===
          tab;

        button
          .classList
          .toggle(
            "active",
            active
          );

        button
          .setAttribute(
            "aria-selected",
            active
              ? "true"
              : "false"
          );

      }
    );


  document
    .getElementById(
      "schedulePanel"
    )
    .classList
    .toggle(
      "active",
      tab ===
      "schedule"
    );


  document
    .getElementById(
      "tasksPanel"
    )
    .classList
    .toggle(
      "active",
      tab ===
      "tasks"
    );

}


/* ================================================= */
/* GLOBAL EVENTS */
/* ================================================= */

document
  .getElementById(
    "brand"
  )
  .addEventListener(
    "click",
    () => {

      showView(
        "dashboardView"
      );

    }
  );


document
  .getElementById(
    "dashboardButton"
  )
  .addEventListener(
    "click",
    () => {

      showView(
        "dashboardView"
      );

    }
  );


document
  .getElementById(
    "drawerClose"
  )
  .addEventListener(
    "click",
    closeDrawer
  );


document
  .querySelectorAll(
    ".dashboard-tab"
  )
  .forEach(
    button => {

      button
        .addEventListener(
          "click",
          () => {

            showDashboardTab(
              button.dataset.dashboardTab
            );

          }
        );

    }
  );


document
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeDrawer();

      }

    }
  );


/* ================================================= */
/* INIT */
/* ================================================= */

renderDashboard();
renderTaskMatrix();
