# EASA FSTD Briefing

A static GitHub Pages presentation and A320 type rating debrief prototype.

Opening the site loads a Reveal.js presentation about the new EASA FSTD/FCS
framework. The final slide links into the interactive demo.

## Structure

- `index.html` contains the Reveal.js presentation shell.
- `slides.md` contains the editable presentation content.
- `presentation.css` contains presentation-specific styling.
- `demo.html` contains the role-based interactive debrief demo.
- `styles.css` contains the demo visual system and responsive layout.
- `lesson-data.js` contains the structured FFS lesson data used by the UI.
- `lesson-plan.md` is the readable source lesson plan.
- `app.js` renders the role picker, schedule, session tabs, task table, FCS matrix, and debrief drawer.

## Demo Roles

- Student and ATO TRI show the FFS schedule and session detail tabs.
- ATO Stakeholder shows the Training Tasks table and sample EASA FCS matrix.
