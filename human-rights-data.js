// MLKN.lab — Human Rights Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  FOUND: { label:"Philosophical Foundations", color:"#B7770D", light:"#FEF9EE" },
  INTL: { label:"International HR Law", color:"#0277BD", light:"#E3F2FD" },
  CIVIL: { label:"Civil & Political Rights", color:"#C0392B", light:"#FDF0EF" },
  ECON: { label:"Economic, Social & Cultural", color:"#1A8A4A", light:"#EAFAF1" },
  GROUP: { label:"Group & Collective Rights", color:"#7D3C98", light:"#F5EEF8" },
  VIOLAT: { label:"Violations & Accountability", color:"#922B21", light:"#FDEDEC" },
  MECH: { label:"Mechanisms & Institutions", color:"#1A4A7A", light:"#EBF2FA" },
  MOVEMENT: { label:"Movements & Advocacy", color:"#C05718", light:"#FDF3EE" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/human-rights.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Human Rights",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
