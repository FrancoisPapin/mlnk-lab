// ═══════════════════════════════════════════════
// MLKN.lab — Interdisciplinary Knowledge Network
// Enhanced renderer with 3 layers
// Author: François Papin | April 2026 | MIT License
// https://www.linkedin.com/in/francoispapin/
// https://francoispapin.github.io/
// ═══════════════════════════════════════════════
'use strict';

// ── EPISTEMIC ROLES (academic taxonomy standard) ──────────────
const EPISTEMIC_ROLES = {
  FOUNDATIONAL:  { label: 'Foundational', color: '#8B5CF6', icon: '◈' },
  THEORETICAL:   { label: 'Theoretical',  color: '#2563EB', icon: '◉' },
  METHODOLOGICAL:{ label: 'Methodological',color:'#059669', icon: '◎' },
  EMPIRICAL:     { label: 'Empirical',    color: '#D97706', icon: '◌' },
  APPLIED:       { label: 'Applied',      color: '#DC2626', icon: '◍' },
  NORMATIVE:     { label: 'Normative',    color: '#7C3AED', icon: '◐' },
};

// ── LEVELS OF ANALYSIS (scientific standards) ─────────────────
const ANALYSIS_LEVELS = {
  MOLECULAR:  { label: 'Molecular / Neural', color: '#EF4444', tier: 1 },
  INDIVIDUAL: { label: 'Individual',         color: '#F59E0B', tier: 2 },
  SOCIAL:     { label: 'Social / Cultural',  color: '#10B981', tier: 3 },
  SYSTEM:     { label: 'System / Global',    color: '#3B82F6', tier: 4 },
};

// ── Override initMap for the interdisciplinary page ───────────
document.addEventListener('DOMContentLoaded', () => {
  if (!window.MAP_DATA) return;
  const data = window.MAP_DATA;

  // Update header
  document.querySelector('.map-header-title').innerHTML =
    `Interdisciplinary Knowledge Network <span>— 11 Disciplines</span>`;
  document.title = 'Interdisciplinary Knowledge Network | MLKN.lab';
  document.getElementById('map-stats').textContent =
    `${data.nodes.length} concepts · ${data.intraLinks.length + data.interLinks.length} connections · ${data.interLinks.length} bridges`;

  const allColors = Object.values(data.disciplines).map(d => d.color);
  document.getElementById('accent-bar').style.background =
    `linear-gradient(180deg,${allColors.join(',')})`;

  if (window.MLKN) {
    window.MLKN.renderTopNav();
    window.MLKN.renderMapFooter('map-footer');
  }

  renderInterdisciplinaryMap(data);
});

function renderInterdisciplinaryMap(data) {
  const svgEl = document.getElementById('map-svg');
  const container = svgEl.parentElement;

  let W = container.clientWidth, H = container.clientHeight;
  const svg = d3.select(svgEl).attr('width', W).attr('height', H);
  svg.selectAll('*').remove();

  const defs = svg.append('defs');

  // Radial glow
  const cg = defs.append('radialGradient').attr('id','cg').attr('cx','50%').attr('cy','50%').attr('r','55%');
  cg.append('stop').attr('offset','0%').attr('stop-color','#FFFFFF88');
  cg.append('stop').attr('offset','100%').attr('stop-color','transparent');

  // Per-discipline glow filters
  Object.entries(data.disciplines).forEach(([k,{color}]) => {
    const f = defs.append('filter').attr('id',`gd_${k}`)
      .attr('x','-60%').attr('y','-60%').attr('width','220%').attr('height','220%');
    f.append('feGaussianBlur').attr('stdDeviation','4').attr('result','b');
    const m = f.append('feMerge');
    m.append('feMergeNode').attr('in','b');
    m.append('feMergeNode').attr('in','SourceGraphic');
  });

  // Arrow markers for inter-discipline bridges
  defs.append('marker').attr('id','arrow-major').attr('markerWidth',6).attr('markerHeight',6)
    .attr('refX',5).attr('refY',3).attr('orient','auto')
    .append('path').attr('d','M0,0 L0,6 L6,3 z').attr('fill','#1A6BAA88');
  defs.append('marker').attr('id','arrow-minor').attr('markerWidth',4).attr('markerHeight',4)
    .attr('refX',4).attr('refY',2).attr('orient','auto')
    .append('path').attr('d','M0,0 L0,4 L4,2 z').attr('fill','#1A6BAA44');

  svg.append('rect').attr('width',W).attr('height',H).attr('fill','#FAFAF8');
  svg.append('rect').attr('width',W).attr('height',H).attr('fill','url(#cg)').attr('pointer-events','none');

  const g = svg.append('g');
  const zoom = d3.zoom().scaleExtent([0.1,5]).on('zoom',e=>g.attr('transform',e.transform));
  svg.call(zoom);

  const allLinks = [
    ...data.intraLinks.map(l=>({...l, inter:false})),
    ...data.interLinks.map(l=>({...l, inter:true})),
  ];

  const simNodes = data.nodes.map(d=>({...d}));
  const simLinks = allLinks.map(d=>({...d}));

  // Cluster discipline centers in a circle
  const cx = W/2, cy = H/2;
  const R = Math.min(W,H) * 0.32;
  const discKeys = Object.keys(data.disciplines);
  const dc = {};
  discKeys.forEach((k,i) => {
    const a = (i/discKeys.length)*2*Math.PI - Math.PI/2;
    dc[k] = { x: cx + R*Math.cos(a), y: cy + R*Math.sin(a) };
  });

  const sim = d3.forceSimulation(simNodes)
    .force('link', d3.forceLink(simLinks).id(d=>d.id)
      .distance(d => d.inter ? 200+(5-d.weight)*22 : 70+(5-d.weight)*8)
      .strength(d => d.inter ? d.weight*0.035 : d.weight*0.07))
    .force('charge', d3.forceManyBody().strength(-280))
    .force('center', d3.forceCenter(cx,cy).strength(0.01))
    .force('collide', d3.forceCollide().radius(d=>d.size+11))
    .force('disc', () => {
      simNodes.forEach(n => {
        const c = dc[n.disc];
        if (c) { n.vx=(n.vx||0)+(c.x-n.x)*0.015; n.vy=(n.vy||0)+(c.y-n.y)*0.015; }
      });
    });

  // ── Draw intra links ──────────────────────────────────────
  const intraG = g.append('g').attr('class','intra-links');
  const intraLinks = simLinks.filter(l=>!l.inter);
  const intraSel = intraG.selectAll('line').data(intraLinks).enter().append('line')
    .attr('class','intra-link')
    .attr('stroke', d => {
      const disc = simNodes.find(n=>n.id===(typeof d.source==='object'?d.source.id:d.source))?.disc;
      return (data.disciplines[disc]?.color||'#333')+'28';
    })
    .attr('stroke-width', d => Math.max(0.4, d.weight*0.45))
    .attr('stroke-linecap','round');

  // ── Draw inter links (bridges) ────────────────────────────
  const interG = g.append('g').attr('class','inter-links');
  const interLinks = simLinks.filter(l=>l.inter);

  function blendHex(c1,c2) {
    const h=c=>parseInt(c.slice(1),16);
    const r1=(h(c1)>>16)&255,g1=(h(c1)>>8)&255,b1=h(c1)&255;
    const r2=(h(c2)>>16)&255,g2=(h(c2)>>8)&255,b2=h(c2)&255;
    const r=Math.round((r1+r2)/2),gv=Math.round((g1+g2)/2),b=Math.round((b1+b2)/2);
    return `#${r.toString(16).padStart(2,'0')}${gv.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }

  const interSel = interG.selectAll('line').data(interLinks).enter().append('line')
    .attr('class', d => d.weight >= 4 ? 'inter-link major-bridge' : 'inter-link minor-bridge')
    .attr('stroke', d => {
      if (!d.pair||d.pair.length<2) return '#1A6BAA55';
      const blend = blendHex(data.disciplines[d.pair[0]]?.color||'#888', data.disciplines[d.pair[1]]?.color||'#888');
      return blend + (d.weight>=4?'bb':'66');
    })
    .attr('stroke-width', d => d.weight>=4 ? Math.max(1.2, d.weight*0.9) : Math.max(0.6, d.weight*0.5))
    .attr('stroke-linecap','round')
    .attr('stroke-dasharray', d => d.weight>=4 ? `${d.weight*2.5} 2` : `${d.weight*1.5} 3`);

  // ── Nodes ─────────────────────────────────────────────────
  const nodeG = g.append('g');
  const nodeSel = nodeG.selectAll('g').data(simNodes).enter().append('g')
    .attr('class','nd')
    .attr('role','button').attr('tabindex','0')
    .style('cursor','pointer')
    .call(d3.drag()
      .on('start',(e,d)=>{if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y;})
      .on('drag',(e,d)=>{d.fx=e.x;d.fy=e.y;})
      .on('end',(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;})
    );

  nodeSel.append('circle').attr('class','sh').attr('r',d=>d.size+5)
    .attr('fill',d=>data.disciplines[d.disc].color+'10');
  nodeSel.append('circle').attr('class','ri').attr('r',d=>d.size+2)
    .attr('fill','none').attr('stroke',d=>data.disciplines[d.disc].color+'44').attr('stroke-width',1);

  // Epistemic role ring (outer dotted border)
  nodeSel.append('circle').attr('class','epi-ring').attr('r',d=>d.size+6)
    .attr('fill','none')
    .attr('stroke', d => d.epistemicRole ? EPISTEMIC_ROLES[d.epistemicRole]?.color+'44' : 'transparent')
    .attr('stroke-width',1).attr('stroke-dasharray','3 2');

  nodeSel.append('circle').attr('class','mn').attr('r',d=>d.size)
    .attr('fill',d=>data.disciplines[d.disc].light)
    .attr('stroke',d=>data.disciplines[d.disc].color)
    .attr('stroke-width',2).attr('filter',d=>`url(#gd_${d.disc})`);
  nodeSel.append('circle').attr('class','ac').attr('r',d=>Math.max(2.5,d.size*0.32))
    .attr('fill',d=>data.disciplines[d.disc].color).attr('opacity',0.85);

  // Analysis level indicator (tiny square at top-right of node)
  nodeSel.each(function(d) {
    if (d.analysisLevel && ANALYSIS_LEVELS[d.analysisLevel]) {
      const lv = ANALYSIS_LEVELS[d.analysisLevel];
      d3.select(this).append('rect')
        .attr('width',5).attr('height',5)
        .attr('x',d.size*0.6).attr('y',-d.size*0.9)
        .attr('fill',lv.color).attr('rx',1).attr('opacity',0.85);
    }
  });

  nodeSel.append('text')
    .text(d=>d.id).attr('text-anchor','middle').attr('dy',d=>d.size+14)
    .attr('font-family',"'Outfit',sans-serif")
    .attr('font-size',d=>Math.max(7.5,Math.min(10.5,d.size*0.42)))
    .attr('font-weight','500').attr('fill',d=>data.disciplines[d.disc].color)
    .attr('pointer-events','none');

  // Sublabel (discipline)
  nodeSel.append('text')
    .text(d=>data.disciplines[d.disc]?.label.split(' ')[0]||'')
    .attr('text-anchor','middle').attr('dy',d=>d.size+24)
    .attr('font-family',"'Space Mono',monospace").attr('font-size',6.5)
    .attr('fill',d=>data.disciplines[d.disc].color+'66').attr('pointer-events','none');

  // ── State ─────────────────────────────────────────────────
  let selectedNode = null;
  let activeDisc = null;
  let activeLayer = null;
  let showBridgesOnly = false;

  const detailPanel = document.getElementById('detail-panel');
  const tooltip = document.getElementById('hover-tooltip');

  function showDetail(node) {
    if (!node) { detailPanel.style.display='none'; detailPanel.hidden=true; return; }
    const disc = data.disciplines[node.disc];
    const connected = new Set();
    allLinks.forEach(l => {
      const a=typeof l.source==='object'?l.source.id:l.source;
      const b=typeof l.target==='object'?l.target.id:l.target;
      if(a===node.id)connected.add(b); if(b===node.id)connected.add(a);
    });
    const bridgeCount = data.interLinks.filter(l=>l.source===node.id||l.target===node.id||
      (typeof l.source==='object'&&l.source.id===node.id)||(typeof l.target==='object'&&l.target.id===node.id)).length;

    const epiRole = node.epistemicRole ? EPISTEMIC_ROLES[node.epistemicRole] : null;
    const anlLevel = node.analysisLevel ? ANALYSIS_LEVELS[node.analysisLevel] : null;

    detailPanel.style.borderLeftColor = disc.color;
    detailPanel.style.borderColor = disc.color+'44';
    detailPanel.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:10px;height:10px;border-radius:50%;background:${disc.color}"></div>
        <span style="font-family:'Space Mono',monospace;font-size:9px;color:${disc.color};letter-spacing:.2em">${disc.label.toUpperCase()}</span>
      </div>
      <div style="font-size:18px;font-weight:700;color:#1A1E2E;margin-bottom:6px">${node.id}</div>
      <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
        ${epiRole?`<span style="font-family:'Space Mono',monospace;font-size:8px;padding:3px 8px;border-radius:10px;background:${epiRole.color}18;color:${epiRole.color};border:1px solid ${epiRole.color}33">${epiRole.icon} ${epiRole.label}</span>`:''}
        ${anlLevel?`<span style="font-family:'Space Mono',monospace;font-size:8px;padding:3px 8px;border-radius:10px;background:${anlLevel.color}18;color:${anlLevel.color};border:1px solid ${anlLevel.color}33">◎ ${anlLevel.label}</span>`:''}
        ${bridgeCount>0?`<span style="font-family:'Space Mono',monospace;font-size:8px;padding:3px 8px;border-radius:10px;background:#1A6BAA18;color:#1A6BAA;border:1px solid #1A6BAA33">⇄ ${bridgeCount} bridge${bridgeCount>1?'s':''}</span>`:''}
      </div>
      <div style="font-family:'Space Mono',monospace;font-size:9px;color:#1A1E2E44;margin-bottom:7px;letter-spacing:.12em">CONNECTIONS (${connected.size})</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;max-height:120px;overflow-y:auto">
        ${[...connected].map(id=>{
          const nd=data.nodes.find(x=>x.id===id); if(!nd)return'';
          const nc=data.disciplines[nd.disc];
          const isInter=data.interLinks.some(l=>
            (l.s===node.id&&l.t===id)||(l.t===node.id&&l.s===id)||
            (typeof l.source==='object'&&l.source.id===node.id&&l.target===id)||
            (typeof l.target==='object'&&l.target.id===node.id&&l.source===id)
          );
          return `<span style="font-family:'Outfit',sans-serif;font-weight:500;font-size:10px;padding:2px 7px;border-radius:4px;background:${nc.color}12;color:${nc.color};border:1.5px solid ${isInter?nc.color+'66':nc.color+'22'}">${id}</span>`;
        }).join('')}
      </div>
    `;
    detailPanel.style.display = 'block';
    detailPanel.hidden = false;
    detailPanel.removeAttribute('hidden');
  }

  // Hover
  nodeSel
    .on('mouseover', function(e,d) {
      const disc = data.disciplines[d.disc];
      tooltip.innerHTML = `${d.id}<span style="color:#1A1E2E44;margin-left:10px;font-size:9px;font-family:'Space Mono',monospace">${disc.label}</span>`;
      tooltip.style.color = disc.color;
      tooltip.style.borderColor = disc.color+'66';
      tooltip.style.display='block'; tooltip.hidden=false; tooltip.removeAttribute('hidden');

      // Highlight edges
      intraSel.attr('stroke',l=>{const s=typeof l.source==='object'?l.source.id:l.source,t=typeof l.target==='object'?l.target.id:l.target;return(s===d.id||t===d.id)?disc.color+'cc':disc.color+'10';}).attr('stroke-width',l=>{const s=typeof l.source==='object'?l.source.id:l.source,t=typeof l.target==='object'?l.target.id:l.target;return(s===d.id||t===d.id)?Math.max(1,l.weight*1.2):Math.max(0.3,l.weight*0.35);});
      interSel.attr('stroke',l=>{const s=typeof l.source==='object'?l.source.id:l.source,t=typeof l.target==='object'?l.target.id:l.target;if(s!==d.id&&t!==d.id)return'#33333322';if(!l.pair||l.pair.length<2)return disc.color+'cc';return blendHex(data.disciplines[l.pair[0]]?.color||'#888',data.disciplines[l.pair[1]]?.color||'#888')+'ee';}).attr('stroke-width',l=>{const s=typeof l.source==='object'?l.source.id:l.source,t=typeof l.target==='object'?l.target.id:l.target;return(s===d.id||t===d.id)?Math.max(1.5,l.weight*1.6):Math.max(0.3,l.weight*0.35);});
      d3.select(this).select('.mn').attr('fill',disc.color+'22').attr('stroke-width',3);
      d3.select(this).select('.ri').attr('stroke',disc.color+'aa').attr('r',d.size+6);
    })
    .on('mouseout', function(e,d) {
      tooltip.style.display='none'; tooltip.hidden=true;
      resetLinkStyles();
      d3.select(this).select('.mn').attr('fill',data.disciplines[d.disc].light).attr('stroke-width',2);
      d3.select(this).select('.ri').attr('stroke',data.disciplines[d.disc].color+'44').attr('r',d.size+2);
    })
    .on('click',(e,d)=>{selectedNode=d;showDetail(d);})
    .on('keydown',(e,d)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectedNode=d;showDetail(d);}});

  svg.on('click',()=>{selectedNode=null;showDetail(null);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){selectedNode=null;showDetail(null);}});

  function resetLinkStyles() {
    intraSel.attr('stroke',d=>{const disc=simNodes.find(n=>n.id===(typeof d.source==='object'?d.source.id:d.source))?.disc;return(data.disciplines[disc]?.color||'#333')+'28';}).attr('stroke-width',d=>Math.max(0.4,d.weight*0.45));
    interSel.attr('stroke',d=>{if(!d.pair||d.pair.length<2)return'#33333344';return blendHex(data.disciplines[d.pair[0]]?.color||'#888',data.disciplines[d.pair[1]]?.color||'#888')+(d.weight>=4?'bb':'66');}).attr('stroke-width',d=>d.weight>=4?Math.max(1.2,d.weight*0.9):Math.max(0.6,d.weight*0.5));
  }

  sim.on('tick',()=>{
    intraSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    interSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
    nodeSel.attr('transform',d=>`translate(${d.x},${d.y})`);
  });

  // ── Build 3-panel legend sidebar ─────────────────────────
  const legendPanel = document.getElementById('legend-panel');
  legendPanel.innerHTML = '';

  // Panel 1: Disciplines
  const d1 = document.createElement('div');
  d1.innerHTML = `<div class="legend-title">Disciplines</div>`;
  Object.entries(data.disciplines).forEach(([k,{label,color}])=>{
    const item = document.createElement('div');
    item.className='legend-item'; item.setAttribute('role','button'); item.setAttribute('tabindex','0');
    item.innerHTML=`<div class="legend-dot" style="background:${color};box-shadow:0 0 0 2px ${color}30"></div><span class="legend-label" style="color:#1A1E2E99">${label}</span>`;
    item.addEventListener('click',()=>{
      activeDisc = activeDisc===k?null:k;
      applyFilters();
      item.classList.toggle('active'); item.style.background=activeDisc===k?color+'14':'transparent'; item.style.borderColor=activeDisc===k?color+'55':'transparent';
    });
    d1.appendChild(item);
  });
  legendPanel.appendChild(d1);

  // Divider
  const div1 = document.createElement('div'); div1.style='border-top:1px solid #E0EAFF;margin:8px 0';
  legendPanel.appendChild(div1);

  // Panel 2: Epistemic roles
  const d2 = document.createElement('div');
  d2.innerHTML = `<div class="legend-title">Epistemic Roles</div>`;
  Object.entries(EPISTEMIC_ROLES).forEach(([k,{label,color,icon}])=>{
    const item=document.createElement('div'); item.className='legend-item'; item.setAttribute('role','button'); item.setAttribute('tabindex','0');
    item.innerHTML=`<span style="font-size:10px;color:${color};width:10px;text-align:center">${icon}</span><span class="legend-label" style="color:#1A1E2E99;font-size:11px">${label}</span>`;
    item.addEventListener('click',()=>{
      activeLayer=activeLayer===k?null:k;
      applyFilters();
    });
    d2.appendChild(item);
  });
  legendPanel.appendChild(d2);

  const div2 = document.createElement('div'); div2.style='border-top:1px solid #E0EAFF;margin:8px 0';
  legendPanel.appendChild(div2);

  // Panel 3: Analysis levels
  const d3el = document.createElement('div');
  d3el.innerHTML = `<div class="legend-title">Analysis Levels</div>`;
  Object.entries(ANALYSIS_LEVELS).forEach(([k,{label,color}])=>{
    const item=document.createElement('div'); item.className='legend-item'; item.setAttribute('role','button'); item.setAttribute('tabindex','0');
    item.innerHTML=`<div style="width:10px;height:10px;background:${color};border-radius:2px"></div><span class="legend-label" style="color:#1A1E2E99;font-size:11px">${label}</span>`;
    d3el.appendChild(item);
  });
  legendPanel.appendChild(d3el);

  // Bridges toggle
  const div3 = document.createElement('div'); div3.style='border-top:1px solid #E0EAFF;margin:8px 0';
  legendPanel.appendChild(div3);
  const bridgeBtn = document.createElement('button');
  bridgeBtn.className='legend-clear'; bridgeBtn.style.display='block'; bridgeBtn.style.width='100%';
  bridgeBtn.style.background='transparent'; bridgeBtn.style.border='none'; bridgeBtn.style.cursor='pointer';
  bridgeBtn.textContent='[ bridges only ]';
  bridgeBtn.addEventListener('click',()=>{
    showBridgesOnly = !showBridgesOnly;
    bridgeBtn.textContent = showBridgesOnly ? '[ show all links ]' : '[ bridges only ]';
    applyFilters();
  });
  legendPanel.appendChild(bridgeBtn);

  function applyFilters() {
    // Nodes
    nodeSel.style('opacity', d => {
      if (activeDisc && d.disc !== activeDisc) return 0.05;
      if (activeLayer && d.epistemicRole !== activeLayer) return 0.08;
      return 1;
    });
    // Intra
    intraSel.style('opacity', d => {
      if (showBridgesOnly) return 0.02;
      const sc=(typeof d.source==='object'?d.source:simNodes.find(n=>n.id===d.source))?.disc;
      const tc=(typeof d.target==='object'?d.target:simNodes.find(n=>n.id===d.target))?.disc;
      if(activeDisc&&sc!==activeDisc&&tc!==activeDisc)return 0.02;
      return 1;
    });
    // Inter
    interSel.style('opacity', d => {
      const sc=(typeof d.source==='object'?d.source:simNodes.find(n=>n.id===d.source))?.disc;
      const tc=(typeof d.target==='object'?d.target:simNodes.find(n=>n.id===d.target))?.disc;
      if(activeDisc&&sc!==activeDisc&&tc!==activeDisc)return 0.02;
      return 1;
    }).style('stroke-width', d => {
      const baseW = d.weight>=4?Math.max(1.2,d.weight*0.9):Math.max(0.6,d.weight*0.5);
      return showBridgesOnly ? baseW*1.4 : baseW;
    });
  }

  // Search
  const si = document.getElementById('search-input');
  if (si) {
    let t; si.addEventListener('input', ()=>{
      clearTimeout(t); t = setTimeout(()=>{
        const q = si.value.toLowerCase().trim();
        nodeSel.style('opacity', d => !q || d.id.toLowerCase().includes(q) ? 1 : 0.05);
      }, 150);
    });
  }

  // Resize
  const ro = new ResizeObserver(()=>{
    W=container.clientWidth; H=container.clientHeight;
    svg.attr('width',W).attr('height',H);
    sim.force('center',d3.forceCenter(W/2,H/2)); sim.alpha(0.3).restart();
  });
  ro.observe(container);
}
