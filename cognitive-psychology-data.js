// MLKN.lab — Cognitive Psychology Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  PERCEPT: { label:"Perception & Attention", color:"#C0392B", light:"#FDF0EF" },
  MEMORY: { label:"Memory Systems", color:"#1A6BAA", light:"#EBF4FB" },
  LANGUAGE: { label:"Language & Cognition", color:"#B7770D", light:"#FEF9EE" },
  EXEC: { label:"Executive Function", color:"#1A8A4A", light:"#EAFAF1" },
  EMOTION: { label:"Emotion & Motivation", color:"#7D3C98", light:"#F5EEF8" },
  SOCIAL: { label:"Social Cognition", color:"#0A7E8C", light:"#E8F8FA" },
  JUDGMENT: { label:"Judgment & Decision", color:"#C05718", light:"#FDF3EE" },
  METHODS: { label:"Research Methods", color:"#1A4A7A", light:"#EBF2FA" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/cognitive-psychology.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Cognitive Psychology",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
