/* ============================================================
   MLKN.lab — Shared Navigation & Map Utilities
   Author: François Papin | April 2026 | MIT License
   ============================================================ */
'use strict';

// ── Security: strict CSP-compatible patterns only ──────────────
const META = Object.freeze({
  author: 'François Papin',
  date: 'April 2026',
  license: 'MIT License',
  linkedin: 'https://www.linkedin.com/in/francoispapin/',
  github: 'https://francoispapin.github.io/',
  site: 'https://francoispapin.github.io/mlkn-lab/',
});

// ── Top Navigation Renderer ───────────────────────────────────
function renderTopNav(currentTitle) {
  const nav = document.getElementById('topnav');
  if (!nav) return;

  const isHome = !currentTitle || currentTitle === 'home';

  nav.innerHTML = `
    <div class="topnav-inner">
      <a href="../index.html" class="topnav-logo" aria-label="MLKN.lab Home">
        <div class="topnav-logo-mark" aria-hidden="true">ML</div>
        <span class="topnav-logo-text">MLKN.lab</span>
      </a>
      <nav class="topnav-links" role="navigation" aria-label="Site navigation">
        ${isHome ? '' : `
        <a href="../index.html" class="topnav-link" aria-label="Go to homepage">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.5L1 7h2v7.5h4V10h2v4.5h4V7h2z"/></svg>
          <span>Home</span>
        </a>`}
        <a href="../networks/interdisciplinary.html" class="topnav-link">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="3" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="13" cy="12" r="1.5"/><line x1="8" y1="3" x2="3" y2="12" stroke="currentColor" stroke-width="1"/><line x1="8" y1="3" x2="13" y2="12" stroke="currentColor" stroke-width="1"/><line x1="3" y1="12" x2="13" y2="12" stroke="currentColor" stroke-width="1"/></svg>
          <span>Interdisciplinary</span>
        </a>
        <a href="${META.linkedin}" class="topnav-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="${META.github}" class="topnav-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub Pages profile (opens in new tab)">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          <span>GitHub</span>
        </a>
      </nav>
    </div>
  `;
}

// ── Footer Watermark Renderer ─────────────────────────────────
function renderMapFooter(containerId) {
  const el = document.getElementById(containerId || 'map-footer');
  if (!el) return;
  el.innerHTML = `
    © ${META.author} · ${META.date} ·
    <a href="${META.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a> ·
    <a href="${META.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
    <br>${META.license} · MLKN.lab
  `;
}

// ── Generic D3 Force Graph Renderer ──────────────────────────
function createGephiMap({ svgId, nodes, links, clusters, onNodeClick, onNodeHover }) {
  const svg = d3.select(`#${svgId}`);
  const container = svg.node().parentElement;

  let width = container.clientWidth;
  let height = container.clientHeight;

  svg.attr('width', width).attr('height', height)
     .attr('role', 'img')
     .attr('aria-label', 'Interactive knowledge network graph');

  svg.selectAll('*').remove();

  const defs = svg.append('defs');

  // Radial center glow
  const cg = defs.append('radialGradient').attr('id', `cg_${svgId}`)
    .attr('cx', '50%').attr('cy', '50%').attr('r', '55%');
  cg.append('stop').attr('offset', '0%').attr('stop-color', '#FFFFFF88');
  cg.append('stop').attr('offset', '100%').attr('stop-color', 'transparent');

  // Per-cluster glow filters
  Object.entries(clusters).forEach(([k, { color }]) => {
    const f = defs.append('filter').attr('id', `glow_${svgId}_${k}`)
      .attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%');
    f.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'b');
    const m = f.append('feMerge');
    m.append('feMergeNode').attr('in', 'b');
    m.append('feMergeNode').attr('in', 'SourceGraphic');
  });

  svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#FAFAF8');
  svg.append('rect').attr('width', width).attr('height', height)
    .attr('fill', `url(#cg_${svgId})`).attr('pointer-events', 'none');

  const g = svg.append('g');

  // Zoom
  const zoom = d3.zoom().scaleExtent([0.15, 4])
    .on('zoom', (e) => g.attr('transform', e.transform));
  svg.call(zoom);

  // Clone data
  const simNodes = nodes.map(d => ({ ...d }));
  const simLinks = links.map(d => ({ ...d }));

  // Cluster centers
  const cx = width / 2, cy = height / 2;
  const rx = Math.min(width, height) * 0.31;
  const ry = Math.min(width, height) * 0.26;
  const clusterKeys = Object.keys(clusters);
  const cc = {};
  clusterKeys.forEach((k, i) => {
    const a = (i / clusterKeys.length) * 2 * Math.PI - Math.PI / 2;
    cc[k] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  // Simulation
  const sim = d3.forceSimulation(simNodes)
    .force('link', d3.forceLink(simLinks).id(d => d.id)
      .distance(d => {
        const same = d.source.cluster === d.target.cluster;
        return same ? 65 + (5 - d.weight) * 8 : 125 + (5 - d.weight) * 16;
      })
      .strength(d => d.weight * 0.07))
    .force('charge', d3.forceManyBody().strength(-320))
    .force('center', d3.forceCenter(cx, cy).strength(0.02))
    .force('collide', d3.forceCollide().radius(d => d.size + 10))
    .force('cluster', () => {
      simNodes.forEach(n => {
        const c = cc[n.cluster];
        if (c) {
          n.vx = (n.vx || 0) + (c.x - n.x) * 0.013;
          n.vy = (n.vy || 0) + (c.y - n.y) * 0.013;
        }
      });
    });

  // Links
  const linkSel = g.append('g').selectAll('line').data(simLinks).enter().append('line')
    .attr('class', 'lk')
    .attr('stroke', d => {
      const sc = nodes.find(n => n.id === (typeof d.source === 'object' ? d.source.id : d.source))?.cluster;
      return (clusters[sc]?.color || '#333') + '22';
    })
    .attr('stroke-width', d => Math.max(0.6, d.weight * 0.55))
    .attr('stroke-linecap', 'round');

  // Node groups
  const nodeSel = g.append('g').selectAll('g').data(simNodes).enter().append('g')
    .attr('class', 'nd')
    .attr('role', 'button')
    .attr('tabindex', '0')
    .attr('aria-label', d => `Node: ${d.label || d.id}`)
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
    );

  nodeSel.append('circle').attr('class', 'sh').attr('r', d => d.size + 5)
    .attr('fill', d => clusters[d.cluster].color + '10');
  nodeSel.append('circle').attr('class', 'ri').attr('r', d => d.size + 2)
    .attr('fill', 'none').attr('stroke', d => clusters[d.cluster].color + '44').attr('stroke-width', 1);
  nodeSel.append('circle').attr('class', 'mn').attr('r', d => d.size)
    .attr('fill', d => clusters[d.cluster].light).attr('stroke', d => clusters[d.cluster].color)
    .attr('stroke-width', 2).attr('filter', d => `url(#glow_${svgId}_${d.cluster})`);
  nodeSel.append('circle').attr('class', 'ac').attr('r', d => Math.max(2.5, d.size * 0.32))
    .attr('fill', d => clusters[d.cluster].color).attr('opacity', 0.85);
  nodeSel.append('text')
    .text(d => d.label || d.id).attr('text-anchor', 'middle').attr('dy', d => d.size + 14)
    .attr('font-family', "'Outfit', sans-serif").attr('font-size', d => Math.max(8, Math.min(11, d.size * 0.42)))
    .attr('font-weight', '500').attr('fill', d => clusters[d.cluster].color).attr('pointer-events', 'none');

  // Events
  nodeSel
    .on('mouseover', function(e, d) {
      onNodeHover && onNodeHover(d, true);
      linkSel
        .attr('stroke', l => {
          const s = typeof l.source === 'object' ? l.source.id : l.source;
          const t = typeof l.target === 'object' ? l.target.id : l.target;
          return (s === d.id || t === d.id) ? clusters[d.cluster].color + 'dd' : '#00000010';
        })
        .attr('stroke-width', l => {
          const s = typeof l.source === 'object' ? l.source.id : l.source;
          const t = typeof l.target === 'object' ? l.target.id : l.target;
          return (s === d.id || t === d.id) ? Math.max(1.2, l.weight * 1.4) : Math.max(0.4, l.weight * 0.4);
        });
      d3.select(this).select('.mn').attr('fill', clusters[d.cluster].color + '22').attr('stroke-width', 3);
      d3.select(this).select('.ri').attr('stroke', clusters[d.cluster].color + 'aa').attr('r', d.size + 6);
      d3.select(this).select('.sh').attr('fill', clusters[d.cluster].color + '22').attr('r', d.size + 10);
    })
    .on('mouseout', function(e, d) {
      onNodeHover && onNodeHover(d, false);
      linkSel
        .attr('stroke', l => {
          const sc = nodes.find(n => n.id === (typeof l.source === 'object' ? l.source.id : l.source))?.cluster;
          return (clusters[sc]?.color || '#333') + '22';
        })
        .attr('stroke-width', l => Math.max(0.6, l.weight * 0.55));
      d3.select(this).select('.mn').attr('fill', clusters[d.cluster].light).attr('stroke-width', 2);
      d3.select(this).select('.ri').attr('stroke', clusters[d.cluster].color + '44').attr('r', d.size + 2);
      d3.select(this).select('.sh').attr('fill', clusters[d.cluster].color + '10').attr('r', d.size + 5);
    })
    .on('click', (e, d) => { onNodeClick && onNodeClick(d); })
    .on('keydown', (e, d) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNodeClick && onNodeClick(d); } });

  svg.on('click', () => onNodeClick && onNodeClick(null));

  sim.on('tick', () => {
    linkSel.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
           .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  // Resize observer
  const ro = new ResizeObserver(() => {
    width = container.clientWidth;
    height = container.clientHeight;
    svg.attr('width', width).attr('height', height);
    sim.force('center', d3.forceCenter(width / 2, height / 2));
    sim.alpha(0.3).restart();
  });
  ro.observe(container);

  return {
    sim,
    filterByCluster(cluster) {
      svg.selectAll('.nd').style('opacity', d => !cluster || d.cluster === cluster ? 1 : 0.06);
      svg.selectAll('.lk').style('opacity', d => {
        const sc = (typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source))?.cluster;
        const tc = (typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target))?.cluster;
        return !cluster || sc === cluster || tc === cluster ? 1 : 0.03;
      });
    },
    filterBySearch(term) {
      svg.selectAll('.nd').style('opacity', d =>
        !term || (d.label || d.id).toLowerCase().includes(term.toLowerCase()) ? 1 : 0.06
      );
    },
    destroy() { sim.stop(); ro.disconnect(); }
  };
}

// ── Detail Panel Manager ──────────────────────────────────────
function createDetailPanel({ panelId, nodes, clusters, links }) {
  const panel = document.getElementById(panelId);
  if (!panel) return { show: () => {}, hide: () => {} };

  function getConnected(id) {
    const s = new Set();
    links.forEach(l => {
      const a = typeof l.source === 'object' ? l.source.id : l.source;
      const b = typeof l.target === 'object' ? l.target.id : l.target;
      if (a === id) s.add(b);
      if (b === id) s.add(a);
    });
    return s;
  }

  function show(node) {
    if (!node) { hide(); return; }
    const cl = clusters[node.cluster];
    const connected = getConnected(node.id);
    const tags = [...connected].map(id => {
      const nd = nodes.find(x => x.id === id);
      if (!nd) return '';
      const nc = clusters[nd.cluster];
      return `<span class="detail-tag" style="background:${nc.color}12;color:${nc.color};border-color:${nc.color}44">${id}</span>`;
    }).join('');

    panel.innerHTML = `
      <div class="detail-cluster-badge">
        <div class="detail-cluster-dot" style="background:${cl.color}"></div>
        <span class="detail-cluster-label" style="color:${cl.color}">${cl.label}</span>
      </div>
      <div class="detail-title">${node.label || node.id}</div>
      <div class="detail-related-label">Related Concepts (${connected.size})</div>
      <div class="detail-tags">${tags}</div>
    `;
    panel.style.borderLeftColor = cl.color;
    panel.style.borderColor = cl.color + '44';
    panel.style.display = 'block';
    panel.removeAttribute('hidden');
  }

  function hide() {
    panel.style.display = 'none';
    panel.setAttribute('hidden', '');
  }

  hide();
  return { show, hide };
}

// ── Legend Builder ────────────────────────────────────────────
function buildLegend({ legendId, clusters, onFilter }) {
  const legend = document.getElementById(legendId);
  if (!legend) return;

  let active = null;

  const title = document.createElement('div');
  title.className = 'legend-title';
  title.textContent = 'Domains';
  legend.appendChild(title);

  Object.entries(clusters).forEach(([k, { label, color }]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-pressed', 'false');
    item.setAttribute('aria-label', `Filter by ${label}`);
    item.innerHTML = `<div class="legend-dot" style="background:${color};box-shadow:0 0 0 2px ${color}30"></div>
      <span class="legend-label" style="color:#1A1E2E99">${label}</span>`;

    const toggle = () => {
      const isActive = active === k;
      active = isActive ? null : k;

      // reset all
      legend.querySelectorAll('.legend-item').forEach(el => {
        el.classList.remove('active');
        el.style.background = 'transparent';
        el.style.borderColor = 'transparent';
        el.setAttribute('aria-pressed', 'false');
        el.querySelector('.legend-label').style.color = '#1A1E2E99';
      });
      clearBtn.style.display = 'none';

      if (!isActive) {
        item.classList.add('active');
        item.style.background = color + '14';
        item.style.borderColor = color + '55';
        item.setAttribute('aria-pressed', 'true');
        item.querySelector('.legend-label').style.color = color;
        clearBtn.style.display = 'block';
      }

      onFilter(active);
    };

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    legend.appendChild(item);
  });

  const clearBtn = document.createElement('div');
  clearBtn.className = 'legend-clear';
  clearBtn.textContent = '[ show all ]';
  clearBtn.setAttribute('role', 'button');
  clearBtn.setAttribute('tabindex', '0');
  clearBtn.style.display = 'none';
  clearBtn.addEventListener('click', () => {
    active = null;
    legend.querySelectorAll('.legend-item').forEach(el => {
      el.classList.remove('active');
      el.style.background = 'transparent';
      el.style.borderColor = 'transparent';
      el.querySelector('.legend-label').style.color = '#1A1E2E99';
    });
    clearBtn.style.display = 'none';
    onFilter(null);
  });
  clearBtn.addEventListener('keydown', e => { if (e.key === 'Enter') clearBtn.click(); });
  legend.appendChild(clearBtn);
}

// Export for modules or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderTopNav, renderMapFooter, createGephiMap, createDetailPanel, buildLegend, META };
} else {
  window.MLKN = { renderTopNav, renderMapFooter, createGephiMap, createDetailPanel, buildLegend, META };
}
