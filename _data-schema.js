// MLKN.lab — Shared data file loader for all 11 discipline networks
// Each discipline defines its MAP_DATA following the same schema.
// Author: François Papin | April 2026 | MIT License

// This file is included by each network page as: <script src="[discipline]-data.js">
// Each file sets window.MAP_DATA = { title, clusters, nodes, links }

// ─────────────────────────────────────────────────
// TEMPLATE (copy and customise per discipline):
// window.MAP_DATA = {
//   title: "Discipline Name",
//   clusters: { KEY: { label, color, light }, ... },
//   nodes: [{ id, cluster, size, label? }, ...],
//   links: [{ source, target, weight }, ...],
// };
// ─────────────────────────────────────────────────
