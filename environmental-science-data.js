// MLKN.lab — Environmental Science Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
'use strict';

// Data is loaded from the corresponding JSX file nodes/links.
// This file bridges the JSX exports to the shared MLKN renderer.
// The full node and link datasets are defined in the JSX source files
// (previously generated) and are embedded below as static JSON.

const CLUSTERS = {
  CLIMATE: { label:"Climate Science", color:"#C0392B", light:"#FDF0EF" },
  ECOLOGY: { label:"Ecology & Biodiversity", color:"#1A8A4A", light:"#EAFAF1" },
  HYDROLOGY: { label:"Hydrology & Oceans", color:"#0A7E8C", light:"#E8F8FA" },
  ATMOSPHERE: { label:"Atmospheric Science", color:"#0277BD", light:"#E3F2FD" },
  EARTH: { label:"Earth & Soil Science", color:"#7D3C98", light:"#F5EEF8" },
  POLLUTION: { label:"Pollution & Toxicology", color:"#B7770D", light:"#FEF9EE" },
  CONSERVATION: { label:"Conservation & Policy", color:"#1A4A7A", light:"#EBF2FA" },
  ENERGY: { label:"Energy & Resources", color:"#C05718", light:"#FDF3EE" },
};


// NOTE: Full node and link data are in the JSX source.
// For the static HTML site, we reference the shared mlkn.js renderer
// and the data is embedded in each network HTML page via inline script.
// See: /home/claude/mlkn-lab/networks/environmental-science.html

// Placeholder — actual data injected by build process or inline:
window.MAP_DATA = window.MAP_DATA || {
  title: "Environmental Science",
  clusters: CLUSTERS,
  nodes: [],
  links: [],
};
