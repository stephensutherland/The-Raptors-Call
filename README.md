# The-Raptors-Scream: Off-Grid Acoustic and Telemetry Security Mesh (V1.0)

## 🌐 The Mission
Delivering an open-source, ultra-low-cost hardware and software system designed to mitigate isolation-targeted violence and human tracking. The system integrates high-decibel acoustic deterrents with decentralized, algorithm-free telemetry relays running over long-range radio (LoRa) mesh networks.

## 🎓 University & Developer Collaboration Opportunity
This repository contains the foundational firmware blueprints and JavaScript dashboard components for an off-grid personal safety ecosystem. We are actively seeking mechanical engineering, computer science, and RF network teams to adapt this project for capstone development, hardware optimization, and field-testing validation.

## 📋 Project Status
* **Current Version**: V1.0.0-Alpha
* **System Architects**: GoSovereignty Engineering Network
* **Status**: Open-source hardware and software. We are seeking developer teams to convert the baseline node firmware into multi-hop Meshtastic network-compliant modules.

## 🛠️ Repository Structure
* `/docs/` - Protocol specifications, JSON data models, and physical environmental safety checklists.
* `/firmware/` - Microcontroller source code (C++) utilizing RadioLib for raw RF injection.
* `/hardware/` - Schematic drawings, component Bill of Materials (BOM), and 3D printing parameters for shockproof TPU casing layouts.
* `/web-dashboard/` - React/JavaScript admin panels managing localized TDOA/RSSI trilateration calculations.
* `/assets/` - Conceptual diagrams and visual hardware documentation.

## 📜 Licenses
To ensure maximum community accessibility while protecting localized manufacturing and redistribution micro-economies, this project utilizes a tiered open-source framework:
* **Hardware Design**: CERN Open Hardware Licence v2 - Weakly Reciprocal ([CERN-OHL-W-2.0](LICENSE.hardware))
* **Software/Firmware**: GNU General Public License v3.0 ([GPL-3.0](LICENSE.software))
* **Documentation/Manuals**: Creative Commons Zero v1.0 Universal ([CC0 1.0](LICENSE.docs))

## 🤝 How to Contribute
If you are an embedded systems engineer, a front-end developer skilled in spatial mapping, or an RF field tester, please open an Issue or pull request. For coordination inquiries regarding localized resource distribution blueprints, review the documentation directory.

## ⚠️ Notice
This is an active engineering and defense optimization project. Review all data validation and local privacy protocols in `/docs/` thoroughly prior to field deployment. Provided as-is to advance global humanitarian safety initiatives.

A modern personal alarm with network connectivity 

## UI/UX pass (web-dashboard) — August 2026
* Onboarding, home, and admin screens re-themed around the Raptor mark and a
  navy/cyan/amber palette (see `web-dashboard/tailwind.config.js` → `theme.extend.colors.raptor`).
* The location/home map now renders via `react-leaflet` instead of a hand-placed
  grid of tile `<img>` elements — this is what actually guarantees tiles line up correctly.
* `web-dashboard/src/lib/storage.js` added: a localStorage-backed adapter with the
  same shape as Claude Artifacts' `window.storage`, since that global does not exist
  once this app runs as a standalone site. `AdminVettingForm.jsx` now uses it.
  **This is still browser-local storage, not a real shared backend** — needs a real
  server + auth before any real member data goes in it.
* `web-dashboard/src/components/MommaRaptorApp.jsx` and `TrilaterationProcessor.jsx`
  are currently unused (not imported by anything) and contain syntax errors /
  placeholder URLs / a math bug in the trilateration formula. Left as-is pending a
  decision on whether to finish, fix, or remove them.
