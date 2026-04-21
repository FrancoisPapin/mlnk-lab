// MLKN.lab — Philosophy Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  ONTOL: { label:"Ontology & Being", color:"#B7770D", light:"#FEF9EE" },
  KNOW: { label:"Epistemology", color:"#0277BD", light:"#E3F2FD" },
  ETHVAL: { label:"Ethics & Value Theory", color:"#1A8A4A", light:"#EAFAF1" },
  LANGLOG: { label:"Language & Logic", color:"#C0392B", light:"#FDF0EF" },
  MINDCON: { label:"Mind & Consciousness", color:"#7D3C98", light:"#F5EEF8" },
  SCITEC: { label:"Philosophy of Science", color:"#0A7E8C", light:"#E8F8FA" },
  SOCIALPOL: { label:"Social & Political Philosophy", color:"#C05718", light:"#FDF3EE" },
  HISTPHIL: { label:"History of Philosophy", color:"#1A4A7A", light:"#EBF2FA" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/philosophy.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Philosophy",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
