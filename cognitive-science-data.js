// MLKN.lab — Cognitive Science Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  NEURO: { label:"Neuroscience", color:"#C0392B", light:"#FDF0EF" },
  PSYCH: { label:"Psychology", color:"#1A6BAA", light:"#EBF4FB" },
  LING: { label:"Linguistics", color:"#1A8A4A", light:"#EAFAF1" },
  COMPUT: { label:"Computation & AI", color:"#0A7E8C", light:"#E8F8FA" },
  PHIL: { label:"Philosophy of Mind", color:"#7D3C98", light:"#F5EEF8" },
  DEVEL: { label:"Developmental Cog Sci", color:"#B7770D", light:"#FEF9EE" },
  SOCIAL: { label:"Social Cognition", color:"#C05718", light:"#FDF3EE" },
  METHODS: { label:"Research Methods", color:"#1A4A7A", light:"#EBF2FA" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/cognitive-science.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Cognitive Science",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
