// MLKN.lab — Interdisciplinary Knowledge Network Data
// Author: François Papin | April 2026 | MIT License
'use strict';

window.MAP_DATA = (function() {

const DISCIPLINES = {
  PHIL:   { label:"Philosophy",            color:"#B7770D", light:"#FEF9EE" },
  COGSCI: { label:"Cognitive Science",     color:"#7D3C98", light:"#F5EEF8" },
  EDUC:   { label:"Education Science",     color:"#1A6BAA", light:"#EBF4FB" },
  HR:     { label:"Human Rights",          color:"#C0392B", light:"#FDF0EF" },
  ENV:    { label:"Environmental Sci.",    color:"#1A8A4A", light:"#EAFAF1" },
  CS:     { label:"Computer Science",      color:"#0A7E8C", light:"#E8F8FA" },
  NEURO:  { label:"Neuroscience",          color:"#C05718", light:"#FDF3EE" },
  COGPSY: { label:"Cognitive Psychology",  color:"#1A4A7A", light:"#EBF2FA" },
  LANG:   { label:"Language Science",      color:"#2E7D52", light:"#EAFAF1" },
  ANTH:   { label:"Anthropology",          color:"#8E44AD", light:"#F5EEF8" },
  SYS:    { label:"Systems Science",       color:"#D97706", light:"#FEF9EE" },
};

// Epistemic role categories (E = epistemic role, A = analysis level)
// E: FOUNDATIONAL, THEORETICAL, METHODOLOGICAL, EMPIRICAL, APPLIED, NORMATIVE
// A: MOLECULAR, INDIVIDUAL, SOCIAL, SYSTEM

const NODES = [
  // PHILOSOPHY
  {id:"Ontology",              disc:"PHIL",   size:26, epistemicRole:"FOUNDATIONAL", analysisLevel:"SYSTEM"},
  {id:"Epistemology",          disc:"PHIL",   size:26, epistemicRole:"FOUNDATIONAL", analysisLevel:"INDIVIDUAL"},
  {id:"Ethics",                disc:"PHIL",   size:28, epistemicRole:"NORMATIVE",    analysisLevel:"SOCIAL"},
  {id:"Logic",                 disc:"PHIL",   size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"INDIVIDUAL"},
  {id:"Philosophy of Mind",    disc:"PHIL",   size:26, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Philosophy of Science", disc:"PHIL",   size:24, epistemicRole:"FOUNDATIONAL", analysisLevel:"SYSTEM"},
  {id:"Political Philosophy",  disc:"PHIL",   size:24, epistemicRole:"NORMATIVE",    analysisLevel:"SOCIAL"},
  {id:"Phenomenology",         disc:"PHIL",   size:22, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Critical Theory",       disc:"PHIL",   size:22, epistemicRole:"NORMATIVE",    analysisLevel:"SOCIAL"},
  {id:"Hermeneutics",          disc:"PHIL",   size:20, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},

  // COGNITIVE SCIENCE
  {id:"Consciousness",         disc:"COGSCI", size:28, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Memory",                disc:"COGSCI", size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Perception",            disc:"COGSCI", size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Attention",             disc:"COGSCI", size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Metacognition",         disc:"COGSCI", size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Language Processing",   disc:"COGSCI", size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Theory of Mind",        disc:"COGSCI", size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"SOCIAL"},
  {id:"Embodied Cognition",    disc:"COGSCI", size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Predictive Coding",     disc:"COGSCI", size:22, epistemicRole:"THEORETICAL",  analysisLevel:"MOLECULAR"},
  {id:"Neural Plasticity",     disc:"COGSCI", size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},

  // EDUCATION SCIENCE
  {id:"Constructivism",        disc:"EDUC",   size:28, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Pedagogy",              disc:"EDUC",   size:26, epistemicRole:"APPLIED",       analysisLevel:"SOCIAL"},
  {id:"Curriculum Design",     disc:"EDUC",   size:24, epistemicRole:"APPLIED",       analysisLevel:"SOCIAL"},
  {id:"Formative Assessment",  disc:"EDUC",   size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"INDIVIDUAL"},
  {id:"Self-Regulated Learning",disc:"EDUC",  size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Educational Equity",    disc:"EDUC",   size:24, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"AI in Education",       disc:"EDUC",   size:24, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Critical Pedagogy",     disc:"EDUC",   size:22, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"Social-Emotional Learn.",disc:"EDUC",  size:22, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},
  {id:"Scaffolding",           disc:"EDUC",   size:22, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},

  // HUMAN RIGHTS
  {id:"Human Dignity",         disc:"HR",     size:30, epistemicRole:"FOUNDATIONAL", analysisLevel:"INDIVIDUAL"},
  {id:"Justice",               disc:"HR",     size:28, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"Rights & Freedoms",     disc:"HR",     size:26, epistemicRole:"NORMATIVE",     analysisLevel:"INDIVIDUAL"},
  {id:"International HR Law",  disc:"HR",     size:24, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Transitional Justice",  disc:"HR",     size:24, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Environmental Rights",  disc:"HR",     size:22, epistemicRole:"NORMATIVE",     analysisLevel:"SYSTEM"},
  {id:"Digital Rights",        disc:"HR",     size:22, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"Indigenous Rights",     disc:"HR",     size:22, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"Right to Education",    disc:"HR",     size:22, epistemicRole:"NORMATIVE",     analysisLevel:"INDIVIDUAL"},
  {id:"Accountability",        disc:"HR",     size:22, epistemicRole:"APPLIED",       analysisLevel:"SOCIAL"},

  // ENVIRONMENTAL SCIENCE
  {id:"Climate Change",        disc:"ENV",    size:28, epistemicRole:"EMPIRICAL",     analysisLevel:"SYSTEM"},
  {id:"Biodiversity",          disc:"ENV",    size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"SYSTEM"},
  {id:"Ecosystem Dynamics",    disc:"ENV",    size:24, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Sustainability",        disc:"ENV",    size:26, epistemicRole:"NORMATIVE",     analysisLevel:"SYSTEM"},
  {id:"Carbon Cycle",          disc:"ENV",    size:22, epistemicRole:"EMPIRICAL",     analysisLevel:"SYSTEM"},
  {id:"Environmental Policy",  disc:"ENV",    size:22, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Water Resources",       disc:"ENV",    size:22, epistemicRole:"EMPIRICAL",     analysisLevel:"SYSTEM"},
  {id:"Conservation Biology",  disc:"ENV",    size:22, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Renewable Energy",      disc:"ENV",    size:22, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},

  // COMPUTER SCIENCE
  {id:"Machine Learning",      disc:"CS",     size:28, epistemicRole:"METHODOLOGICAL",analysisLevel:"SYSTEM"},
  {id:"NLP",                   disc:"CS",     size:26, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},
  {id:"Algorithms",            disc:"CS",     size:24, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Cybersecurity",         disc:"CS",     size:24, epistemicRole:"APPLIED",       analysisLevel:"SOCIAL"},
  {id:"Human-Computer Interaction",disc:"CS", size:24, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},
  {id:"Data Science",          disc:"CS",     size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"SYSTEM"},
  {id:"Formal Methods",        disc:"CS",     size:20, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Robotics",              disc:"CS",     size:22, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},

  // NEUROSCIENCE
  {id:"Synaptic Plasticity",   disc:"NEURO",  size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},
  {id:"Prefrontal Cortex",     disc:"NEURO",  size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},
  {id:"Reward Circuits",       disc:"NEURO",  size:22, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},
  {id:"Neuroimaging",          disc:"NEURO",  size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"INDIVIDUAL"},
  {id:"Connectomics",          disc:"NEURO",  size:22, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},
  {id:"Clinical Neuroscience", disc:"NEURO",  size:24, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},
  {id:"Neural Coding",         disc:"NEURO",  size:22, epistemicRole:"THEORETICAL",  analysisLevel:"MOLECULAR"},
  {id:"Brain Oscillations",    disc:"NEURO",  size:20, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},

  // COGNITIVE PSYCHOLOGY
  {id:"Working Memory",        disc:"COGPSY", size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Executive Control",     disc:"COGPSY", size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Dual-Process Theory",   disc:"COGPSY", size:26, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Heuristics & Biases",   disc:"COGPSY", size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Emotion Regulation",    disc:"COGPSY", size:22, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Attribution Theory",    disc:"COGPSY", size:22, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},
  {id:"Cognitive Load",        disc:"COGPSY", size:22, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},

  // LANGUAGE SCIENCE
  {id:"Syntax",                disc:"LANG",   size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Semantics",             disc:"LANG",   size:24, epistemicRole:"THEORETICAL",  analysisLevel:"INDIVIDUAL"},
  {id:"Language Acquisition",  disc:"LANG",   size:26, epistemicRole:"EMPIRICAL",     analysisLevel:"INDIVIDUAL"},
  {id:"Sociolinguistics",      disc:"LANG",   size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"SOCIAL"},
  {id:"Computational Ling.",   disc:"LANG",   size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"SYSTEM"},
  {id:"Discourse Analysis",    disc:"LANG",   size:22, epistemicRole:"METHODOLOGICAL",analysisLevel:"SOCIAL"},
  {id:"Language & Culture",    disc:"LANG",   size:22, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},

  // ANTHROPOLOGY
  {id:"Ethnography",           disc:"ANTH",   size:28, epistemicRole:"METHODOLOGICAL",analysisLevel:"SOCIAL"},
  {id:"Cultural Relativism",   disc:"ANTH",   size:24, epistemicRole:"NORMATIVE",     analysisLevel:"SOCIAL"},
  {id:"Political Ecology",     disc:"ANTH",   size:24, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},
  {id:"Human Evolution",       disc:"ANTH",   size:24, epistemicRole:"EMPIRICAL",     analysisLevel:"MOLECULAR"},
  {id:"Social Structure",      disc:"ANTH",   size:22, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},
  {id:"Ritual & Symbolism",    disc:"ANTH",   size:22, epistemicRole:"THEORETICAL",  analysisLevel:"SOCIAL"},
  {id:"Medical Anthropology",  disc:"ANTH",   size:22, epistemicRole:"APPLIED",       analysisLevel:"INDIVIDUAL"},

  // SYSTEMS SCIENCE
  {id:"Complex Systems",       disc:"SYS",    size:28, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Feedback Loops",        disc:"SYS",    size:26, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Emergence",             disc:"SYS",    size:26, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Network Theory",        disc:"SYS",    size:24, epistemicRole:"METHODOLOGICAL",analysisLevel:"SYSTEM"},
  {id:"Systems Thinking",      disc:"SYS",    size:26, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
  {id:"Self-Organization",     disc:"SYS",    size:24, epistemicRole:"THEORETICAL",  analysisLevel:"SYSTEM"},
  {id:"Information Theory",    disc:"SYS",    size:24, epistemicRole:"FOUNDATIONAL", analysisLevel:"SYSTEM"},
  {id:"Resilience",            disc:"SYS",    size:22, epistemicRole:"APPLIED",       analysisLevel:"SYSTEM"},
];

const INTRA = [
  // PHIL
  {s:"Ontology",t:"Epistemology",w:4},{s:"Ethics",t:"Political Philosophy",w:4},{s:"Philosophy of Mind",t:"Phenomenology",w:5},{s:"Philosophy of Science",t:"Epistemology",w:4},{s:"Critical Theory",t:"Political Philosophy",w:4},{s:"Hermeneutics",t:"Phenomenology",w:4},{s:"Logic",t:"Philosophy of Science",w:3},{s:"Ethics",t:"Logic",w:2},
  // COGSCI
  {s:"Consciousness",t:"Perception",w:4},{s:"Memory",t:"Attention",w:5},{s:"Memory",t:"Metacognition",w:4},{s:"Theory of Mind",t:"Consciousness",w:4},{s:"Embodied Cognition",t:"Perception",w:4},{s:"Neural Plasticity",t:"Memory",w:5},{s:"Predictive Coding",t:"Perception",w:5},{s:"Language Processing",t:"Memory",w:3},
  // EDUC
  {s:"Constructivism",t:"Scaffolding",w:5},{s:"Constructivism",t:"Self-Regulated Learning",w:4},{s:"Pedagogy",t:"Curriculum Design",w:4},{s:"AI in Education",t:"Formative Assessment",w:4},{s:"Educational Equity",t:"Critical Pedagogy",w:5},{s:"Social-Emotional Learn.",t:"Pedagogy",w:3},
  // HR
  {s:"Human Dignity",t:"Justice",w:5},{s:"Human Dignity",t:"Rights & Freedoms",w:5},{s:"Justice",t:"International HR Law",w:4},{s:"Environmental Rights",t:"Justice",w:4},{s:"Digital Rights",t:"Rights & Freedoms",w:4},{s:"Indigenous Rights",t:"Environmental Rights",w:4},{s:"Right to Education",t:"Justice",w:3},{s:"Accountability",t:"Transitional Justice",w:4},
  // ENV
  {s:"Climate Change",t:"Carbon Cycle",w:5},{s:"Climate Change",t:"Biodiversity",w:4},{s:"Biodiversity",t:"Ecosystem Dynamics",w:5},{s:"Sustainability",t:"Environmental Policy",w:5},{s:"Sustainability",t:"Renewable Energy",w:4},{s:"Conservation Biology",t:"Biodiversity",w:5},
  // CS
  {s:"Machine Learning",t:"NLP",w:5},{s:"Machine Learning",t:"Data Science",w:5},{s:"Machine Learning",t:"Robotics",w:4},{s:"Algorithms",t:"Formal Methods",w:4},{s:"Cybersecurity",t:"Data Science",w:3},{s:"Human-Computer Interaction",t:"NLP",w:3},
  // NEURO
  {s:"Synaptic Plasticity",t:"Neural Plasticity",w:5},{s:"Prefrontal Cortex",t:"Reward Circuits",w:4},{s:"Neural Coding",t:"Brain Oscillations",w:4},{s:"Neuroimaging",t:"Clinical Neuroscience",w:4},{s:"Connectomics",t:"Neural Coding",w:4},
  // COGPSY
  {s:"Working Memory",t:"Executive Control",w:5},{s:"Dual-Process Theory",t:"Heuristics & Biases",w:5},{s:"Emotion Regulation",t:"Executive Control",w:4},{s:"Attribution Theory",t:"Heuristics & Biases",w:3},{s:"Cognitive Load",t:"Working Memory",w:4},
  // LANG
  {s:"Syntax",t:"Semantics",w:4},{s:"Language Acquisition",t:"Sociolinguistics",w:3},{s:"Computational Ling.",t:"Semantics",w:4},{s:"Discourse Analysis",t:"Language & Culture",w:4},{s:"Language & Culture",t:"Sociolinguistics",w:4},
  // ANTH
  {s:"Ethnography",t:"Social Structure",w:4},{s:"Cultural Relativism",t:"Ethnography",w:4},{s:"Political Ecology",t:"Social Structure",w:4},{s:"Medical Anthropology",t:"Ethnography",w:4},{s:"Ritual & Symbolism",t:"Social Structure",w:4},
  // SYS
  {s:"Complex Systems",t:"Emergence",w:5},{s:"Feedback Loops",t:"Systems Thinking",w:5},{s:"Network Theory",t:"Complex Systems",w:4},{s:"Information Theory",t:"Complex Systems",w:4},{s:"Resilience",t:"Systems Thinking",w:4},{s:"Self-Organization",t:"Complex Systems",w:5},
];

const INTER = [
  // ── MAJOR BRIDGES (weight ≥ 4) ────────────────────────────
  // PHIL ↔ COGSCI
  {s:"Philosophy of Mind",t:"Consciousness",w:5,pair:["PHIL","COGSCI"]},
  {s:"Phenomenology",t:"Embodied Cognition",w:5,pair:["PHIL","COGSCI"]},
  {s:"Epistemology",t:"Metacognition",w:4,pair:["PHIL","COGSCI"]},
  {s:"Logic",t:"Language Processing",w:4,pair:["PHIL","COGSCI"]},
  // PHIL ↔ EDUC
  {s:"Epistemology",t:"Constructivism",w:5,pair:["PHIL","EDUC"]},
  {s:"Critical Theory",t:"Critical Pedagogy",w:5,pair:["PHIL","EDUC"]},
  {s:"Ethics",t:"Educational Equity",w:4,pair:["PHIL","EDUC"]},
  // PHIL ↔ HR
  {s:"Ethics",t:"Human Dignity",w:5,pair:["PHIL","HR"]},
  {s:"Political Philosophy",t:"Justice",w:5,pair:["PHIL","HR"]},
  {s:"Critical Theory",t:"Rights & Freedoms",w:4,pair:["PHIL","HR"]},
  // PHIL ↔ ENV
  {s:"Ethics",t:"Sustainability",w:4,pair:["PHIL","ENV"]},
  {s:"Political Philosophy",t:"Environmental Policy",w:4,pair:["PHIL","ENV"]},
  // PHIL ↔ CS
  {s:"Logic",t:"Formal Methods",w:5,pair:["PHIL","CS"]},
  {s:"Philosophy of Mind",t:"Machine Learning",w:4,pair:["PHIL","CS"]},
  {s:"Philosophy of Science",t:"Data Science",w:4,pair:["PHIL","CS"]},
  // PHIL ↔ SYS
  {s:"Epistemology",t:"Systems Thinking",w:4,pair:["PHIL","SYS"]},
  {s:"Ontology",t:"Complex Systems",w:4,pair:["PHIL","SYS"]},
  // COGSCI ↔ EDUC
  {s:"Metacognition",t:"Self-Regulated Learning",w:5,pair:["COGSCI","EDUC"]},
  {s:"Memory",t:"Constructivism",w:5,pair:["COGSCI","EDUC"]},
  {s:"Neural Plasticity",t:"Scaffolding",w:4,pair:["COGSCI","EDUC"]},
  {s:"Theory of Mind",t:"Social-Emotional Learn.",w:5,pair:["COGSCI","EDUC"]},
  {s:"Attention",t:"Formative Assessment",w:4,pair:["COGSCI","EDUC"]},
  // COGSCI ↔ HR
  {s:"Theory of Mind",t:"Human Dignity",w:4,pair:["COGSCI","HR"]},
  // COGSCI ↔ CS
  {s:"Machine Learning",t:"Neural Plasticity",w:5,pair:["CS","COGSCI"]},
  {s:"NLP",t:"Language Processing",w:5,pair:["CS","COGSCI"]},
  {s:"Predictive Coding",t:"Algorithms",w:4,pair:["COGSCI","CS"]},
  {s:"Embodied Cognition",t:"Robotics",w:4,pair:["COGSCI","CS"]},
  // COGSCI ↔ NEURO
  {s:"Consciousness",t:"Brain Oscillations",w:5,pair:["COGSCI","NEURO"]},
  {s:"Memory",t:"Synaptic Plasticity",w:5,pair:["COGSCI","NEURO"]},
  {s:"Attention",t:"Prefrontal Cortex",w:4,pair:["COGSCI","NEURO"]},
  {s:"Neural Plasticity",t:"Synaptic Plasticity",w:5,pair:["COGSCI","NEURO"]},
  // COGSCI ↔ COGPSY
  {s:"Metacognition",t:"Dual-Process Theory",w:5,pair:["COGSCI","COGPSY"]},
  {s:"Memory",t:"Working Memory",w:5,pair:["COGSCI","COGPSY"]},
  {s:"Attention",t:"Cognitive Load",w:4,pair:["COGSCI","COGPSY"]},
  // COGSCI ↔ LANG
  {s:"Language Processing",t:"Syntax",w:5,pair:["COGSCI","LANG"]},
  {s:"Language Processing",t:"Semantics",w:4,pair:["COGSCI","LANG"]},
  // EDUC ↔ HR
  {s:"Educational Equity",t:"Justice",w:5,pair:["EDUC","HR"]},
  {s:"Right to Education",t:"Scaffolding",w:4,pair:["HR","EDUC"]},
  {s:"Critical Pedagogy",t:"Human Dignity",w:4,pair:["EDUC","HR"]},
  // EDUC ↔ CS
  {s:"AI in Education",t:"Machine Learning",w:5,pair:["EDUC","CS"]},
  {s:"Formative Assessment",t:"Data Science",w:4,pair:["EDUC","CS"]},
  // EDUC ↔ ENV
  {s:"Curriculum Design",t:"Sustainability",w:4,pair:["EDUC","ENV"]},
  {s:"Educational Equity",t:"Climate Change",w:4,pair:["EDUC","ENV"]},
  // HR ↔ ENV
  {s:"Environmental Rights",t:"Sustainability",w:5,pair:["HR","ENV"]},
  {s:"Justice",t:"Environmental Policy",w:4,pair:["HR","ENV"]},
  {s:"Indigenous Rights",t:"Biodiversity",w:4,pair:["HR","ENV"]},
  {s:"Justice",t:"Climate Change",w:4,pair:["HR","ENV"]},
  // HR ↔ CS
  {s:"Digital Rights",t:"Cybersecurity",w:5,pair:["HR","CS"]},
  {s:"Accountability",t:"Data Science",w:4,pair:["HR","CS"]},
  {s:"Human Dignity",t:"Human-Computer Interaction",w:4,pair:["HR","CS"]},
  // ENV ↔ CS
  {s:"Climate Change",t:"Machine Learning",w:5,pair:["ENV","CS"]},
  {s:"Biodiversity",t:"Data Science",w:4,pair:["ENV","CS"]},
  {s:"Renewable Energy",t:"Machine Learning",w:4,pair:["ENV","CS"]},
  // NEURO ↔ COGPSY
  {s:"Prefrontal Cortex",t:"Executive Control",w:5,pair:["NEURO","COGPSY"]},
  {s:"Synaptic Plasticity",t:"Working Memory",w:4,pair:["NEURO","COGPSY"]},
  {s:"Reward Circuits",t:"Emotion Regulation",w:4,pair:["NEURO","COGPSY"]},
  // NEURO ↔ LANG
  {s:"Neural Coding",t:"Language Processing",w:4,pair:["NEURO","LANG"]},
  {s:"Neuroimaging",t:"Computational Ling.",w:4,pair:["NEURO","LANG"]},
  // NEURO ↔ CS
  {s:"Machine Learning",t:"Neural Coding",w:4,pair:["CS","NEURO"]},
  {s:"Connectomics",t:"Network Theory",w:4,pair:["NEURO","SYS"]},
  // LANG ↔ ANTH
  {s:"Language & Culture",t:"Social Structure",w:5,pair:["LANG","ANTH"]},
  {s:"Sociolinguistics",t:"Ethnography",w:4,pair:["LANG","ANTH"]},
  {s:"Discourse Analysis",t:"Ritual & Symbolism",w:4,pair:["LANG","ANTH"]},
  // LANG ↔ CS
  {s:"Computational Ling.",t:"NLP",w:5,pair:["LANG","CS"]},
  {s:"Computational Ling.",t:"Machine Learning",w:4,pair:["LANG","CS"]},
  // ANTH ↔ HR
  {s:"Cultural Relativism",t:"Rights & Freedoms",w:4,pair:["ANTH","HR"]},
  {s:"Political Ecology",t:"Environmental Rights",w:4,pair:["ANTH","HR"]},
  {s:"Social Structure",t:"Justice",w:4,pair:["ANTH","HR"]},
  // ANTH ↔ ENV
  {s:"Political Ecology",t:"Ecosystem Dynamics",w:5,pair:["ANTH","ENV"]},
  {s:"Human Evolution",t:"Biodiversity",w:4,pair:["ANTH","ENV"]},
  // SYS ↔ CS
  {s:"Network Theory",t:"Algorithms",w:4,pair:["SYS","CS"]},
  {s:"Complex Systems",t:"Machine Learning",w:4,pair:["SYS","CS"]},
  {s:"Information Theory",t:"Data Science",w:5,pair:["SYS","CS"]},
  // SYS ↔ ENV
  {s:"Complex Systems",t:"Ecosystem Dynamics",w:5,pair:["SYS","ENV"]},
  {s:"Resilience",t:"Environmental Policy",w:4,pair:["SYS","ENV"]},
  {s:"Self-Organization",t:"Biodiversity",w:4,pair:["SYS","ENV"]},
  // SYS ↔ COGSCI
  {s:"Complex Systems",t:"Neural Plasticity",w:4,pair:["SYS","COGSCI"]},
  {s:"Information Theory",t:"Predictive Coding",w:4,pair:["SYS","COGSCI"]},
  {s:"Emergence",t:"Consciousness",w:4,pair:["SYS","COGSCI"]},
  // SYS ↔ EDUC
  {s:"Systems Thinking",t:"Curriculum Design",w:4,pair:["SYS","EDUC"]},
  {s:"Feedback Loops",t:"Formative Assessment",w:4,pair:["SYS","EDUC"]},

  // ── MINOR BRIDGES (weight 2-3) ────────────────────────────
  {s:"Ethics",t:"Decision Making",w:3,pair:["PHIL","COGPSY"]},
  {s:"Political Philosophy",t:"Social Structure",w:3,pair:["PHIL","ANTH"]},
  {s:"Hermeneutics",t:"Discourse Analysis",w:3,pair:["PHIL","LANG"]},
  {s:"Ontology",t:"Complex Systems",w:3,pair:["PHIL","SYS"]},
  {s:"Philosophy of Science",t:"Resilience",w:3,pair:["PHIL","SYS"]},
  {s:"Theory of Mind",t:"Attribution Theory",w:3,pair:["COGSCI","COGPSY"]},
  {s:"Embodied Cognition",t:"Medical Anthropology",w:3,pair:["COGSCI","ANTH"]},
  {s:"Perception",t:"Ritual & Symbolism",w:2,pair:["COGSCI","ANTH"]},
  {s:"Language Processing",t:"Language Acquisition",w:4,pair:["COGSCI","LANG"]},
  {s:"Memory",t:"Ethnography",w:2,pair:["COGSCI","ANTH"]},
  {s:"Social-Emotional Learn.",t:"Medical Anthropology",w:3,pair:["EDUC","ANTH"]},
  {s:"Pedagogy",t:"Language & Culture",w:3,pair:["EDUC","LANG"]},
  {s:"Educational Equity",t:"Cultural Relativism",w:3,pair:["EDUC","ANTH"]},
  {s:"Social-Emotional Learn.",t:"Theory of Mind",w:3,pair:["EDUC","COGSCI"]},
  {s:"Human Dignity",t:"Medical Anthropology",w:3,pair:["HR","ANTH"]},
  {s:"Justice",t:"Political Ecology",w:3,pair:["HR","ANTH"]},
  {s:"Accountability",t:"Ethnography",w:3,pair:["HR","ANTH"]},
  {s:"Cybersecurity",t:"Network Theory",w:3,pair:["CS","SYS"]},
  {s:"Robotics",t:"Self-Organization",w:3,pair:["CS","SYS"]},
  {s:"Data Science",t:"Emergence",w:3,pair:["CS","SYS"]},
  {s:"Brain Oscillations",t:"Information Theory",w:3,pair:["NEURO","SYS"]},
  {s:"Clinical Neuroscience",t:"Medical Anthropology",w:3,pair:["NEURO","ANTH"]},
  {s:"Heuristics & Biases",t:"Sociolinguistics",w:2,pair:["COGPSY","LANG"]},
  {s:"Attribution Theory",t:"Social Structure",w:3,pair:["COGPSY","ANTH"]},
  {s:"Emotion Regulation",t:"Medical Anthropology",w:2,pair:["COGPSY","ANTH"]},
  {s:"Language Acquisition",t:"Social Structure",w:3,pair:["LANG","ANTH"]},
  {s:"Resilience",t:"Sustainability",w:4,pair:["SYS","ENV"]},
];

// Convert {s,t,w} to {source,target,weight}
function conv(arr){return arr.map(l=>({source:l.s||l.source,target:l.t||l.target,weight:l.w||l.weight,pair:l.pair,inter:!!l.pair}));}

return {
  disciplines: DISCIPLINES,
  nodes: NODES,
  intraLinks: conv(INTRA),
  interLinks: conv(INTER),
};

})();
