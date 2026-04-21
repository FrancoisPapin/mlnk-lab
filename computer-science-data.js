// MLKN.lab — Computer Science Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  AI: { label:"Artificial Intelligence", color:"#D63031", light:"#FEF2F2" },
  THEORY: { label:"Theory & Algorithms", color:"#00897B", light:"#E8F5F3" },
  SYSTEMS: { label:"Systems & Networks", color:"#0277BD", light:"#E3F2FD" },
  DATA: { label:"Data & Databases", color:"#2E7D52", light:"#E8F5EC" },
  HCI: { label:"HCI & Graphics", color:"#C47D00", light:"#FEF9E7" },
  SECURITY: { label:"Security & Privacy", color:"#8E44AD", light:"#F5EEF8" },
  EMERGING: { label:"Emerging Fields", color:"#C98000", light:"#FEFCE8" },
  SE: { label:"Software Engineering", color:"#1B7840", light:"#EAFAF1" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/computer-science.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Computer Science",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
