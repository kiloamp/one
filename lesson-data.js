/* ================================================= */
/* STAGES */
/* ================================================= */

const STAGES = [
  "Ground",
  "Taxi",
  "Take Off",
  "Climb/Cruise",
  "Approach",
  "Landing",
  "Rollout"
];


/*
  Local Y coordinates inside each segment.
  Higher altitude = smaller Y.
*/

const STAGE_Y = {
  "Ground": 374,
  "Taxi": 348,
  "Take Off": 288,
  "Climb/Cruise": 115,
  "Approach": 205,
  "Landing": 298,
  "Rollout": 348
};


/* ================================================= */
/* FFS CONTENT */
/* ================================================= */

const FFS = [


/* ================================================= */
/* FFS 1 */
/* ================================================= */

{
  number: 1,

  title:
    "SOP Introduction, Basic ECAM & ILS",

  detail:
    "Conversion Detail 1",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "SOP introduction, basic ECAM handling and repeated ILS profiles.",

    "Crew sequence":
      "CM1 first, followed by reposition and CM2.",

    "Approach exercises":
      "Decelerated AP approach, stabilised manual-thrust approach and No Flight Director ILS.",

    "Training emphasis":
      "Normal SOP discipline, task sharing, holding procedures, go-around and normal landing."
  },

  setup: {
    "Aircraft state":
      "Cold aircraft",

    "Performance":
      "Take-off performance calculation required",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "METAR":
      "Instructor-selected training weather",

    "Departure":
      "LEBL",

    "Arrival":
      "LEPA"
  },

  items: [
    ["Aircraft setup from cold and performance calculation.","Ground"],
    ["Engine start and taxi out — CM1.","Taxi"],
    ["Normal take-off.","Take Off"],
    ["SID – Climb – Cruise – Descent – STAR – Hold.","Climb/Cruise"],
    ["In hold: Left Tank Fuel Pump Low Pressure — ECAM.","Climb/Cruise"],
    ["Radar vectors to ILS approach and go-around — decelerated approach with autopilot.","Approach"],
    ["Radar vectors to ILS approach and go-around — stabilised approach with manual thrust.","Approach"],
    ["Radar vectors to ILS approach with normal landing — No Flight Director.","Approach"],
    ["Vacate runway and taxi to stand.","Rollout"],
    ["Shutdown checks.","Ground"],
    ["Reposition/start-up and taxi out — CM2.","Taxi","reposition"],
    ["Take-off and climb FL100.","Take Off"],
    ["Descent – STAR – Holding Pattern.","Climb/Cruise"],
    ["Radar vectors to ILS and go-around — decelerated approach with autopilot.","Approach"],
    ["Radar vectors to ILS and go-around — stabilised approach with manual thrust.","Approach"],
    ["Radar vectors to ILS approach with normal landing — No Flight Director.","Approach"],
    ["Vacate runway and taxi to stand.","Rollout"],
    ["Full shutdown.","Ground"]
  ]
},


/* ================================================= */
/* FFS 2 */
/* ================================================= */

{
  number: 2,

  title:
    "Flight Control Laws, UPRT, TCAS & NPA",

  detail:
    "Conversion Detail 2",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "Flight-control protections, Alternate Law, UPRT, TCAS and procedural VOR approaches.",

    "Crew sequence":
      "CM1 exercise block followed by CM2 repeat.",

    "UPRT":
      "Normal Law protections, Alternate Law stability and nose-high/nose-low recovery.",

    "Approach":
      "Procedural VOR approach with autopilot and crosswind landing."
  },

  setup: {
    "Aircraft state":
      "Cold aircraft",

    "Performance":
      "Normal performance calculation",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "METAR":
      "Crosswind training conditions",

    "Training altitude":
      "FL200"
  },

  items: [
    ["Aircraft set up from cold and performance calculation.","Ground"],
    ["Engine start and taxi out — CM1.","Taxi"],
    ["Normal take-off with crosswind technique.","Take Off"],
    ["Climb FL200.","Climb/Cruise"],
    ["UPRT — Normal Law: demonstrate pitch and roll protections.","Climb/Cruise"],
    ["UPRT — Normal Law: low-speed protections.","Climb/Cruise"],
    ["UPRT — Normal Law: high-speed protections.","Climb/Cruise"],
    ["UPRT — Alternate Law: low-speed stability.","Climb/Cruise"],
    ["UPRT — Alternate Law: high-speed stability.","Climb/Cruise"],
    ["Upset Recovery — Nose High actions / Nose Low actions.","Climb/Cruise"],
    ["Demonstrate speedbrake use and effect on VLS.","Climb/Cruise"],
    ["TCAS event.","Climb/Cruise"],
    ["Procedural VOR approach with autopilot.","Approach"],
    ["Go-around.","Approach"],
    ["Procedural VOR approach with autopilot.","Approach"],
    ["Crosswind landing.","Landing"],
    ["Reposition for normal crosswind take-off; demonstrate Alpha Lock Protection.","Take Off","reposition"],
    ["Repeat Items 5–16 for CM2.","Climb/Cruise","reposition"]
  ]
},


/* ================================================= */
/* FFS 3 */
/* ================================================= */

{
  number: 3,

  title:
    "Ground ECAM, EGPWS, Windshear & Circling",

  detail:
    "Conversion Detail 3",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "Ground ECAM failures, windshear, EGPWS, stalls, raw-data ILS and circling.",

    "Crew sequence":
      "CM1 sequence with repeated take-off resets followed by CM2 repeat.",

    "Ground failures":
      "Engine No Light Up / IGN and Hot Start.",

    "Airborne focus":
      "Windshear escape, EGPWS response, stall recovery and circle-to-land."
  },

  setup: {
    "Aircraft state":
      "Transit checks",

    "Performance":
      "Take-off data prepared for repeated departures",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "METAR":
      "Windshear and circling training scenario",

    "Initial crew":
      "CM1"
  },

  items: [
    ["Setup from transit checks.","Ground"],
    ["No. 2 Engine Start Fault — No Light Up / IGN.","Ground"],
    ["Clear malfunction.","Ground"],
    ["No. 1 Engine Start Fault — Hot Start.","Ground"],
    ["Clear malfunction.","Ground"],
    ["Taxi out.","Taxi"],
    ["Take-off with windshear before V1.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off with windshear on rotation.","Take Off"],
    ["Vectors into terrain — EGPWS.","Climb/Cruise"],
    ["Radar vectors to ILS; Wing Anti-Ice Fault while on vectors — ECAM.","Approach"],
    ["Windshear on approach and go-around.","Approach"],
    ["Stall exercises — take-off configuration, landing configuration, clean at low level, clean at high level.","Climb/Cruise"],
    ["Radar vectors for approach with circle-to-land.","Approach"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off — Flap 2.","Take Off"],
    ["Radar vectors to ILS Raw Data.","Approach"],
    ["Repeat Items 7–17 for CM2.","Take Off","reposition"],
    ["Taxi in and shutdown.","Taxi"]
  ]
},


/* ================================================= */
/* FFS 4 */
/* ================================================= */

{
  number: 4,

  title:
    "RTO, EFATO & Single-Engine Operations",

  detail:
    "Conversion Detail 4",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "Rejected take-off, V1 failures, evacuation, EFATO and single-engine operations.",

    "Crew sequence":
      "Individual V1 exercises, complete EFATO profiles and CM2 repeat.",

    "Take-off exercises":
      "Engine failure, fire, tyre burst, pilot incapacitation and evacuation.",

    "Single-engine":
      "ILS, go-around, VOR/ME approach and landing."
  },

  setup: {
    "Aircraft state":
      "Holding point, ready for departure",

    "Performance":
      "Take-off performance complete",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "Initial configuration":
      "Departure configuration set",

    "Training reference":
      "V1 and EFATO"
  },

  items: [
    ["Set up aircraft at holding point, ready for departure.","Ground"],
    ["Rejected take-off at V1 − 10 kt due to engine failure.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off with engine fire at V1 − 10 kt.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off with tyre burst at 110 kt.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off with pilot incapacitation at 100 kt.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Take-off with inextinguishable fire at V1 − 10 kt; evacuation.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["Engine failure at take-off.","Take Off"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["EFATO profile to clean aircraft.","Climb/Cruise"],
    ["Engine relight.","Climb/Cruise"],
    ["Visual circuit and landing.","Landing"],
    ["Reposition to take-off position.","Ground","reposition"],
    ["EFATO profile to clean aircraft.","Climb/Cruise"],
    ["Radar vectors to single-engine ILS — AP Off.","Approach"],
    ["Single-engine go-around.","Approach"],
    ["Single-engine VOR/ME approach — AP On.","Approach"],
    ["Single-engine landing.","Landing"],
    ["Repeat applicable Items 1–22 for CM2.","Ground","reposition"]
  ]
},


/* ================================================= */
/* FFS 5 */
/* ================================================= */

{
  number: 5,

  title:
    "EFATO Consolidation, Failure Management & PBN",

  detail:
    "Conversion Detail 5",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "EFATO consolidation, PBN, single-engine approaches, evacuation, raw data and RA faults.",

    "Crew sequence":
      "CM1 exercise block followed by CM2 repeat.",

    "Approach work":
      "Single-engine ILS, NPA, PBN, circling and rejected landing.",

    "Raw data":
      "RMPs and Flight Directors OFF during departure."
  },

  setup: {
    "Aircraft state":
      "Holding point, ready for departure",

    "Performance":
      "Single-engine profile followed by overweight landing exercise",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "Weight adjustment":
      "Overweight landing training block",

    "Navigation":
      "ILS / NPA / PBN"
  },

  items: [
    ["Set up aircraft at holding point, ready for departure.","Ground"],
    ["EFATO flown until aircraft clean, then AP On.","Climb/Cruise"],
    ["Radar-vectored ILS approach — single engine.","Approach"],
    ["Single-engine go-around.","Approach"],
    ["Procedural Non-Precision and PBN approach.","Approach"],
    ["Single-engine go-around.","Approach"],
    ["Radar-vectored ILS to circling minima.","Approach"],
    ["Circle to land — single engine.","Landing"],
    ["Reposition to holding point; adjust weights for overweight landing exercises.","Ground","reposition"],
    ["Take-off with serious engine damage and inextinguishable fire before V1.","Take Off"],
    ["Reject take-off and aircraft evacuation.","Rollout"],
    ["Reposition to take-off position — normal weights.","Ground","reposition"],
    ["Take-off and complete Raw Data Departure — RMPs and FDs OFF.","Take Off"],
    ["Reinstate automatics.","Climb/Cruise"],
    ["Radar vectors for ILS and RA fault — ECAM.","Approach"],
    ["Complete ILS with rejected landing.","Landing"],
    ["Radar vectors for ILS and RA2 fault — ECAM.","Approach"],
    ["Complete ILS approach.","Approach"],
    ["Repeat Items 1–18 for CM2.","Ground","reposition"]
  ]
},


/* ================================================= */
/* FFS 6 */
/* ================================================= */

{
  number: 6,

  title:
    "ADIRU, Decompression, Flap/Slat & Unreliable Airspeed",

  detail:
    "Conversion Detail 6",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "ADR/IR failures, decompression, flap/slat failures and unreliable airspeed.",

    "Crew sequence":
      "Systems training at FL80 and FL350 followed by repeated approach blocks.",

    "High-level exercises":
      "ADR faults, IR failure, emergency descent and explosive decompression.",

    "Approach exercises":
      "No Flaps / No Slats and Unreliable IAS."
  },

  setup: {
    "Aircraft state":
      "Cold aircraft",

    "Performance":
      "Normal departure data",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "Initial level":
      "FL80",

    "Decompression level":
      "FL350",

    "Approach reposition":
      "3500 ft"
  },

  items: [
    ["Aircraft set up from cold.","Ground"],
    ["Manual engine start due to IGN A fault on ENG 1.","Ground"],
    ["Taxi out.","Taxi"],
    ["Backtrack, 180° on runway and take-off to FL80.","Take Off"],
    ["ADR 2 Fault — ECAM.","Climb/Cruise"],
    ["ADR 2+3 Fault — ECAM.","Climb/Cruise"],
    ["ADR 1+2+3 Fault — ECAM.","Climb/Cruise"],
    ["Reinstate ADRs.","Climb/Cruise"],
    ["IR Failure — use of ATT Mode.","Climb/Cruise"],
    ["Reinstate IRs.","Climb/Cruise"],
    ["Reposition to FL350.","Climb/Cruise","reposition"],
    ["Demonstrate explosive decompression to FL200.","Climb/Cruise"],
    ["Reposition to FL350.","Climb/Cruise","reposition"],
    ["Perform explosive decompression to FL100.","Climb/Cruise"],
    ["Reposition to FL350.","Climb/Cruise","reposition"],
    ["Perform explosive decompression — CM2.","Climb/Cruise"],
    ["Clear malfunctions, then ENG 1 Fail — ECAM.","Climb/Cruise"],
    ["Radar-vectored NPA to land — AP On.","Approach"],
    ["Backtrack and 180°; take-off to 3500 ft — CM2.","Take Off","reposition"],
    ["Fail flaps and slats by WTB. Radar vectors and request speed reduction to 180 kt — ECAM.","Approach"],
    ["No Flaps / No Slats approach and landing — CM1.","Landing"],
    ["Reposition and take-off to 3500 ft.","Take Off","reposition"],
    ["Fail flap handle and vector for ILS — No Flaps / No Slats — to land, CM2.","Approach"],
    ["Reposition and take-off to 3500 ft.","Take Off","reposition"],
    ["Pitot Probe Fault Captain and F/O — Unreliable IAS.","Climb/Cruise"],
    ["UPRT — fly approach and landing with Unreliable IAS.","Landing"],
    ["Taxi to stand and secure aircraft.","Taxi"]
  ]
},


/* ================================================= */
/* FFS 7 */
/* ================================================= */

{
  number: 7,

  title:
    "Dual Hydraulic Failures & Mechanical Backup",

  detail:
    "Conversion Detail 7",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "Dual hydraulic failure combinations, Mechanical Backup, TCAS and sidestep.",

    "Crew sequence":
      "G+Y, G+B and Mechanical Backup blocks with CM2 repetition.",

    "Hydraulic failures":
      "Green + Yellow and Green + Blue system failures.",

    "Final exercise":
      "TCAS, ILS sidestep and APU fire during taxi."
  },

  setup: {
    "Aircraft state":
      "Cold aircraft",

    "Performance":
      "Normal take-off performance",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "Initial altitude":
      "FL80",

    "Mechanical Backup":
      "2000 ft exercise"
  },

  items: [
    ["Aircraft set up from cold.","Ground"],
    ["Engine start.","Ground"],
    ["Taxi out for departure and take-off.","Taxi"],
    ["During climb to FL80 — Thrust Lever Fault.","Climb/Cruise"],
    ["Clear fault.","Climb/Cruise"],
    ["Fail Green System HYD — No Fluid — ECAM.","Climb/Cruise"],
    ["Fail Yellow System HYD — No Fluid — ECAM.","Climb/Cruise"],
    ["Radar vectors for ILS approach in G+Y failure.","Approach"],
    ["Reposition and allow CM2 to fly ILS approach in G+Y failure.","Approach","reposition"],
    ["Clear malfunctions.","Ground"],
    ["Normal take-off and climb FL80.","Take Off"],
    ["Fail Green + Blue System HYD — No Fluid — ECAM.","Climb/Cruise"],
    ["Radar vectors for ILS approach in G+B failure.","Approach"],
    ["Repair aircraft.","Ground","reposition"],
    ["Take-off and climb to altitude 2000 ft.","Take Off"],
    ["UPRT — configure aircraft in Mechanical Backup and fly visual approach to land.","Landing"],
    ["Repair aircraft.","Ground","reposition"],
    ["For CM2, take-off and climb.","Take Off"],
    ["UPRT — configure aircraft in Mechanical Backup.","Climb/Cruise"],
    ["Repair aircraft.","Ground","reposition"],
    ["Take-off, climb and vectors downwind.","Take Off"],
    ["TCAS event.","Climb/Cruise"],
    ["Vectors for ILS approach and sidestep for landing.","Approach"],
    ["Repeat Items 21–23 for CM2.","Take Off","reposition"],
    ["While taxiing to stand — extinguishable APU FIRE.","Taxi"],
    ["Continue to gate and shutdown.","Ground"]
  ]
},


/* ================================================= */
/* FFS 8 */
/* ================================================= */

{
  number: 8,

  title:
    "Emergency Electrical Configuration, Smoke & EFATO Revision",

  detail:
    "Conversion Detail 8",

  route:
    "LEBL → LEPA",

  briefing: {
    "Session focus":
      "Emergency Electrical Configuration, smoke, evacuation and EFATO revision.",

    "Crew sequence":
      "Electrical and smoke exercises followed by CM1 and CM2 EFATO revision.",

    "Electrical":
      "Dual Generator Failure and comparison with Dual Engine Failure.",

    "Smoke":
      "Avionics Smoke with continuous smoke through landing and evacuation."
  },

  setup: {
    "Aircraft state":
      "Transit checks",

    "Performance":
      "Take-off performance prepared for repeated departure resets",

    "ZFW":
      "Training value",

    "ZFWCG":
      "Training value",

    "FOB":
      "Training value",

    "Initial level":
      "FL60",

    "Smoke level":
      "FL100"
  },

  items: [
    ["Aircraft set up from transit checks.","Ground"],
    ["Engine starts — No. 1 engine hung start.","Ground"],
    ["Taxi out for departure and take-off; climb FL60.","Take Off"],
    ["Dual Generator Failure — ECAM.","Climb/Cruise"],
    ["Radar vectors for ILS in ELEC EMER CONF.","Approach"],
    ["Repair aircraft and reposition for take-off.","Ground","reposition"],
    ["Take-off and climb to FL100.","Take Off"],
    ["Avionics Smoke — ECAM.","Climb/Cruise"],
    ["Vectors to ILS and landing with continuous smoke.","Landing"],
    ["On landing — aircraft evacuation.","Rollout"],
    ["Reposition for take-off.","Ground","reposition"],
    ["Take-off and climb FL60. Demonstrate Dual Engine Failure and similarity to Dual Generator Failure.","Climb/Cruise"],
    ["Reposition for take-off.","Ground","reposition"],
    ["Complete EFATO — CM1.","Climb/Cruise"],
    ["Single-engine ILS and go-around — AP Off.","Approach"],
    ["Radar vectors to single-engine NPA and go-around.","Approach"],
    ["Radar vectors to single-engine ILS and circling.","Approach"],
    ["Reposition for take-off.","Ground","reposition"],
    ["Complete EFATO — CM2.","Climb/Cruise"],
    ["Single-engine ILS and go-around — AP Off.","Approach"],
    ["Radar vectors to single-engine NPA and go-around.","Approach"],
    ["Radar vectors to single-engine ILS and circling.","Approach"],
    ["Taxi in and park.","Taxi"],
    ["Tailpipe fire on shutdown — QRH.","Ground"],
    ["Secure aircraft; aircraft evacuation.","Ground"]
  ]
}

];
