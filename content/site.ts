import type {
  Capability,
  FactCard,
  LearningCard,
  NavLink,
  Project,
  SkillGroup,
  TimelineEntry,
} from "@/lib/types";

export const identity = {
  name: "Thayaananthan Kanagaraj",
  goesBy: "Thayaa",
  role: "AI Engineer",
  location: "Tempe, Arizona",
  email: "thayaananthankangaraj@gmail.com",
  linkedin: "https://www.linkedin.com/in/thayaa03/",
  github: "https://github.com/Thayaa21",
  cv: "/resume.pdf",
  portrait: "/images/portrait.png",
  profile: "/images/profile.jpg",
};

export const nav = {
  logo: "Thayaa",
  links: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  downloadCv: "Download CV",
  getInTouch: "Get in touch",
};

export const hero = {
  pill: "● Open to full-time AI/ML Engineer roles",
  pillHref: "#contact",
  h1Pre: "I build AI systems that hold up ",
  h1Gradient: "outside the demo.",
  subhead:
    "I'm Thayaa, an AI Engineer in Tempe, Arizona. I build LLM agents, RAG and agentic automation at qBotica, and I'm going deep on GPU programming and LLM inference.",
  primaryCta: { label: "See my work", href: "#work" },
  ghostCta: { label: "Download CV", href: identity.cv },
  smallLine:
    "M.S. Robotics & Autonomous Systems (AI), Arizona State University · GPA 3.8",
  console: {
    title: "thayaa.agent",
    status: "● running",
    input: "Turn this requirements doc into an automation workflow",
    thinking: "Thinking · planning 4 steps",
    steps: [
      { label: "Parse request → JSON IR", resolves: true },
      { label: "Validate against schema", resolves: true },
      { label: "Map to platform components (local model)", resolves: true },
      { label: "Send to human review", resolves: false },
    ],
  },
};

export const marquee = {
  caption: "TOOLS I SHIP WITH",
  items: [
    "Python",
    "PyTorch",
    "Hugging Face",
    "LangGraph",
    "LangChain",
    "FastAPI",
    "FAISS",
    "Ray",
    "Docker",
    "AWS",
    "Google Cloud",
    "C++",
    "Git",
  ],
};

export const about = {
  bgWord: "ENGINEER",
  eyebrow: "About me",
  paragraphs: [
    "I'm an AI Engineer who builds LLM systems that hold up outside the demo. I finished my M.S. in Robotics & Autonomous Systems (AI) at Arizona State University, and I work as an AI Intern at qBotica in Tempe. There I build the backend for qubi Autopilot, which turns plain-language requests into executable automation workflows.",
    "Before that I built a distributed semantic search and RAG system on ASU's Sol supercomputer for a multi-year research study. Earlier, at RBG.AI, I fine-tuned a quantized 7B LLM with QLoRA on a single T4 GPU for a medical chatbot that went to production.",
    "Now I'm going deeper into the layer under the models: GPU programming, kernels and LLM inference performance. I like problems with real constraints, like limited memory, IP and compliance rules, latency budgets, and a client waiting on a deadline.",
  ],
  factCards: [
    { value: "3.8", label: "M.S. GPA, Arizona State University" },
    { value: "7B", label: "LLM fine-tuned with QLoRA on a single T4" },
    { value: "Sol", label: "ASU supercomputer I built distributed RAG on" },
  ] as FactCard[],
  tagCard: {
    title: "Real constraints, clean systems.",
    tags: [
      "LLM Agents",
      "RAG",
      "Fine-tuning",
      "Evaluation",
      "Python Backends",
      "Inference",
    ],
  },
};

export const capabilities = {
  h2: "What I build",
  cards: [
    {
      title: "LLM agents & automation",
      description:
        "Agents that turn plain language into reliable, validated actions.",
      icon: "bot",
    },
    {
      title: "RAG & retrieval",
      description:
        "Search over messy, real data, from FAISS on HPC to knowledge graphs.",
      icon: "search",
    },
    {
      title: "Fine-tuning & quantization",
      description:
        "Adapting open models to a domain under tight GPU memory.",
      icon: "sliders",
    },
    {
      title: "Voice agents",
      description:
        "Real-time phone agents with guardrails that hold over long calls.",
      icon: "phone",
    },
    {
      title: "ML pipelines & evaluation",
      description: "Data prep, training and evals that are reproducible.",
      icon: "workflow",
    },
    {
      title: "GPU & inference",
      description: "CUDA, HIP and LLM inference performance.",
      icon: "cpu",
      badge: "Learning now",
    },
  ] as Capability[],
};

export const work = {
  eyebrow: "Selected work",
  h2: "Work that shipped, and why it holds up.",
  projects: [
    {
      slug: "qubi-autopilot",
      number: "01",
      title: "qubi Autopilot (qBotica)",
      label: "Case study · Work",
      description:
        "Backend for an agentic automation platform that turns plain-language requests and requirement docs into executable workflows. I replaced an unreliable Computer Use agent with a deterministic pipeline (natural language → JSON IR → schema validation → human review), and designed an IP-safe split where an external LLM drafts a generic plan and a local model maps it to proprietary components.",
      chips: ["Python", "FastAPI", "LLMs", "Local models", "MCP", "JSON Schema"],
      visual: "pipeline",
      featured: true,
      visible: true,
    },
    {
      slug: "distributed-rag",
      number: "02",
      title: "Distributed RAG on a supercomputer (ASU)",
      label: "Case study · Research",
      description:
        "Semantic search and RAG over a professor's multi-year, 7-site study on human generosity. Ray parallelises embedding, FAISS handles retrieval, and it all runs on ASU's Sol supercomputer. The research team still uses it.",
      chips: ["Python", "Ray", "FAISS", "RAG", "HPC (Sol)"],
      visual: "cluster",
      featured: true,
      visible: true,
    },
    {
      slug: "atlas-x",
      number: "03",
      title: "ATLAS-X: fraud detection with graph features",
      label: "Team project",
      description:
        "XGBoost with graph features from a Neo4j card–device–email network, trained on 590k real IEEE-CIS transactions (0.957 AUC, ~17 ms inference). Kafka streaming, FastAPI, Prometheus/Grafana monitoring and LLM-generated explanations.",
      chips: ["XGBoost", "Neo4j", "Kafka", "FastAPI", "Grafana"],
      href: "https://github.com/Thayaa21/atlas-x",
      visual: "graph",
      featured: true,
      visible: true,
    },
    {
      slug: "echoshield",
      number: "04",
      title: "EchoShield: on-device voice isolation",
      description:
        "Real-time audio system for voice isolation and smart ambient-mode triggers, using WebRTC VAD, Resemblyzer speaker verification and Vosk wake-word detection. Tuned frame size from 30 to 60 ms to fix CPU overload.",
      chips: ["Python", "WebRTC VAD", "Resemblyzer", "Vosk"],
      href: "https://github.com/Thayaa21/EchoShield",
      image: "/images/projects/echoshield.png",
      featured: true,
      visible: true,
    },
  ] as Project[],
};

export const moreProjects = {
  h2: "More projects",
  projects: [
    {
      slug: "citation-aware",
      title: "Citation-Aware Research Assistant",
      description:
        "Local Llama 3.1 8B with FAISS retrieval that parses tables and flowcharts in PDFs, maps citations and answers with sources.",
      chips: ["Llama 3.1", "FAISS", "Streamlit"],
      href: "https://github.com/Thayaa21/Citation_aware",
      image: "/images/projects/researchanalysis.png",
      visible: true,
    },
    {
      slug: "crm-agent",
      title: "CRM Agent: CX Intelligence",
      description:
        "LangGraph agents (Monitor → Investigator → Action → Supervisor) that watch tickets, reviews and NPS, find anomalies and propose actions. Three MCP servers.",
      chips: ["LangGraph", "MCP", "ChromaDB", "React"],
      href: "https://github.com/Thayaa21/crm_agent",
      visible: true,
    },
    {
      slug: "life-copilot",
      title: "Life Copilot",
      description:
        "Daily assistant that reads your calendar, weather and commute, then builds a morning brief and leave-by reminders.",
      chips: ["LLM agents", "Google Calendar API"],
      href: "https://github.com/Thayaa21/life_copilot",
      image: "/images/projects/lifecopilot.png",
      visible: true,
    },
    {
      slug: "explainable-ai",
      title: "Explainable AI Demos",
      description:
        "Notebook collection of XAI techniques for model interpretability.",
      chips: ["SHAP", "LIME", "Jupyter"],
      href: "https://github.com/Thayaa21/Explainable-AI-demos",
      image: "/images/projects/explainableai.png",
      visible: true,
    },
    {
      slug: "ar-e-brochure",
      title: "AR E-Brochure: Vedic Heritage",
      description:
        "Interactive AR brochure that combines cultural storytelling with web AR.",
      chips: ["WebAR", "HTML/JS"],
      href: "https://github.com/Thayaa21/ar-e-brochure-vedicheritage",
      image: "/images/projects/vedicheritage.png",
      visible: true,
    },
    // Hidden until Thayaa confirms (visible: false). Built but not rendered.
    {
      slug: "cross-document-graph-rag",
      title: "Cross-Document Graph RAG",
      description:
        "Knowledge-graph RAG that links the same person across documents and answers with line-level citations; LangChain or UiPath extraction.",
      chips: ["Graph RAG", "LangChain", "UiPath"],
      href: "https://github.com/Thayaa21/QB1",
      visible: false,
    },
    {
      slug: "voice-agent-hospital",
      title: "Voice Agent: Hospital Appointments",
      description:
        "Phone agent that verifies callers and answers from a Graph RAG backend.",
      chips: ["Voice", "Graph RAG"],
      href: "https://github.com/Thayaa21/Voice_Agent",
      visible: false,
    },
    {
      slug: "remote-dev-assistant",
      title: "Remote Dev Assistant",
      description:
        "Call a number, and your laptop wakes up and takes code changes, tests and commits from Slack.",
      chips: ["Slack", "Automation"],
      href: "https://github.com/Thayaa21/Computer_use",
      visible: false,
    },
    {
      slug: "market-signals",
      title: "Market Signals",
      description:
        "LangGraph agent that explains market anomalies with charts and cited news.",
      chips: ["LangGraph", "Charts"],
      href: "https://github.com/Thayaa21/Market_signals",
      visible: false,
    },
  ] as Project[],
};

export const experience = {
  label: "+ EXPERIENCE",
  entries: [
    {
      org: "qBotica",
      title: "AI Intern",
      dates: "Jun 2026 – Present",
      location: "Tempe, AZ",
      bullets: [
        "Building the backend for qubi Autopilot, which turns plain-language requests into executable automation workflows through a deterministic, validated pipeline with human review.",
        "Designed an IP-safe split between an external LLM and a local model; led a 3-person team on a client voice agent with rules-as-code guardrails; built Python backend services for a healthcare data-migration client.",
      ],
    },
    {
      org: "Arizona State University",
      title: "Graduate Researcher",
      dates: "Sep 2025 – May 2026",
      location: "Tempe, AZ",
      bullets: [
        "Built a distributed semantic search and RAG system over a multi-year, 7-site research study using Ray and FAISS on the Sol supercomputer; still in use by the research team.",
      ],
    },
    {
      org: "Arizona State University",
      title: "Text Editor & QA Engineer",
      dates: "Dec 2024 – May 2026",
      location: "Tempe, AZ",
      bullets: [
        "Edited content and performed QA testing, finding bugs and giving feedback.",
      ],
    },
    {
      org: "RBG.AI",
      title: "AI Intern",
      dates: "Nov 2023 – Jun 2024",
      location: "Coimbatore, India",
      bullets: [
        "Fine-tuned a quantized 7B LLM with QLoRA on a single AWS T4 GPU for a medical client's chatbot, deployed to production; built NLP pipelines with Hugging Face and PyTorch.",
      ],
    },
    {
      org: "Gramophone Media Lab",
      title: "AR Intern",
      dates: "Aug 2022 – Oct 2022",
      location: "Coimbatore, India",
      bullets: [
        "Built an AR e-brochure showcasing Vedic heritage with web AR.",
      ],
    },
  ] as TimelineEntry[],
};

export const education = {
  label: "+ EDUCATION",
  entries: [
    {
      org: "Arizona State University",
      title: "M.S. Robotics and Autonomous Systems (Artificial Intelligence)",
      dates: "2024 – 2026",
      location: "GPA 3.8",
      bullets: [],
      image: "/images/asu.jpg",
    },
    {
      org: "Sri Ramakrishna Engineering College",
      title: "B.Tech, Artificial Intelligence and Data Science",
      dates: "2020 – 2024",
      location: "Coimbatore, India",
      bullets: [],
      image: "/images/Srec.jpg",
    },
  ] as TimelineEntry[],
};

export const skills = {
  groups: [
    {
      name: "Languages",
      skills: [
        { name: "Python", icon: "python" },
        { name: "C++", icon: "cplusplus" },
        { name: "SQL", icon: "sql" },
        { name: "JavaScript/TypeScript", icon: "typescript" },
      ],
    },
    {
      name: "AI / ML",
      skills: [
        { name: "PyTorch", icon: "pytorch" },
        { name: "Hugging Face", icon: "huggingface" },
        { name: "scikit-learn", icon: "scikitlearn" },
        { name: "XGBoost", icon: "xgboost" },
        { name: "LangGraph", icon: "langgraph" },
        { name: "LangChain", icon: "langchain" },
        { name: "QLoRA/PEFT", icon: "qlora" },
        { name: "FAISS", icon: "faiss" },
        { name: "ChromaDB", icon: "chromadb" },
      ],
    },
    {
      name: "Systems & Data",
      skills: [
        { name: "FastAPI", icon: "fastapi" },
        { name: "Docker", icon: "docker" },
        { name: "Ray", icon: "ray" },
        { name: "Kafka", icon: "apachekafka" },
        { name: "Neo4j", icon: "neo4j" },
        { name: "Streamlit", icon: "streamlit" },
        { name: "GitHub Actions", icon: "githubactions" },
      ],
    },
    {
      name: "Cloud",
      skills: [
        { name: "AWS", icon: "amazonaws" },
        { name: "Google Cloud", icon: "googlecloud" },
      ],
    },
  ] as SkillGroup[],
};

export const nowLearning = {
  label: "+ NOW LEARNING",
  intro: "The layer under the models, where my work is heading.",
  cards: [
    { title: "CUDA", detail: "PMPP book + GPU MODE lectures" },
    { title: "AMD HIP / ROCm", detail: "" },
    { title: "Modern C++", detail: "" },
    { title: "LLM inference", detail: "KV cache, FlashAttention, batching" },
  ] as LearningCard[],
};

export const contact = {
  h2: "Let's build something that ships.",
  text: "Open to full-time AI/ML Engineer roles. The fastest way to reach me is email.",
  emailLabel: "Email me",
  linkedinLabel: "LinkedIn",
};

export const footer = {
  tagline: "AI Engineer · Tempe, AZ",
  columns: [
    {
      title: "Work",
      links: [
        { label: "Selected work", href: "#work" },
        { label: "More projects", href: "#more-projects" },
      ],
    },
    {
      title: "Experience",
      links: [
        { label: "Experience", href: "#experience" },
        { label: "Education", href: "#education" },
      ],
    },
    {
      title: "Skills",
      links: [
        { label: "Skills", href: "#skills" },
        { label: "Now learning", href: "#now-learning" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Email", href: `mailto:${identity.email}` },
        { label: "LinkedIn", href: identity.linkedin },
      ],
    },
  ],
  copyright: "© 2026 Thayaananthan Kanagaraj",
  statusPill: "● Currently building at qBotica",
  backToTop: "BACK TO TOP ↑",
};

export const visibleProjects = (projects: Project[]): Project[] =>
  projects.filter((p) => p.visible);
