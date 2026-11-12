# Content (single source of truth)

Turn this into `content/site.ts` word for word. Do not rewrite, embellish or add to it.
To reuse an old image, copy it from `assets/images/...` to the `public/images/...` path shown.

## Identity
- Name: Thayaananthan Kanagaraj (goes by **Thayaa**)
- Role: AI Engineer
- Location: Tempe, Arizona
- Email: thayaananthankangaraj@gmail.com
- LinkedIn: https://www.linkedin.com/in/thayaa03/
- GitHub: https://github.com/Thayaa21
- CV: `/resume.pdf` (button hidden if the file is missing)
- Portrait (hero arch): `assets/images/towork.png` → `public/images/portrait.png`
- Second photo (about): `assets/images/profile2.jpg` → `public/images/profile.jpg`

## Nav
Logo text "Thayaa" + small violet dot. Links: Work, Experience, Skills, About, Contact. Right side: "Download CV" button (ghost) and "Get in touch" (primary, links to the email).

## Hero
- Announcement pill: "● Open to full-time AI/ML Engineer roles". Links to #contact.
- H1: **"I build AI systems that hold up outside the demo."**
- Subhead: "I'm Thayaa, an AI Engineer in Tempe, Arizona. I build LLM agents, RAG and agentic automation at qBotica, and I'm going deep on GPU programming and LLM inference."
- Buttons: "See my work" → #work (primary) · "Download CV" (ghost)
- Small line under the buttons: "M.S. Robotics & Autonomous Systems (AI), Arizona State University · GPA 3.8"
- **Agent console mock** (Reflex style). Header: "thayaa.agent" plus a green "● running" chip. Input row (typed in): "Turn this requirements doc into an automation workflow". Then "Thinking · planning 4 steps", then 4 steps that tick in one after another:
  1. "Parse request → JSON IR" ✓
  2. "Validate against schema" ✓
  3. "Map to platform components (local model)" ✓
  4. "Send to human review" (spinner that never resolves, as in the original)
  A small mono timer counts up. This is a visual metaphor for his qubi Autopilot work, so don't add numbers to it.

## Tech marquee (Danie style, logos + names, looping)
Python · PyTorch · Hugging Face · LangGraph · LangChain · FastAPI · FAISS · Ray · Docker · AWS · Google Cloud · C++ · Git
Caption above it, mono: "TOOLS I SHIP WITH"

## About (Portfon style)
- Giant faded background word: **"ENGINEER"**
- Arch portrait: `portrait.png` on a violet → transparent gradient arch
- Eyebrow: "About me"
- Text:
  "I'm an AI Engineer who builds LLM systems that hold up outside the demo. I finished my M.S. in Robotics & Autonomous Systems (AI) at Arizona State University, and I work as an AI Intern at qBotica in Tempe. There I build the backend for qubi Autopilot, which turns plain-language requests into executable automation workflows.

  Before that I built a distributed semantic search and RAG system on ASU's Sol supercomputer for a multi-year research study. Earlier, at RBG.AI, I fine-tuned a quantized 7B LLM with QLoRA on a single T4 GPU for a medical chatbot that went to production.

  Now I'm going deeper into the layer under the models: GPU programming, kernels and LLM inference performance. I like problems with real constraints, like limited memory, IP and compliance rules, latency budgets, and a client waiting on a deadline."
- Fact cards (Portfon stat cards; no count-up for text values):
  - "3.8" · "M.S. GPA, Arizona State University"
  - "7B" · "LLM fine-tuned with QLoRA on a single T4"
  - "Sol" · "ASU supercomputer I built distributed RAG on"
- Tag card: title "Real constraints, clean systems." Tags: LLM Agents · RAG · Fine-tuning · Evaluation · Python Backends · Inference

## What I build (Reflex "what we automate" grid, 6 cards, icon + title + one line)
1. **LLM agents & automation**: "Agents that turn plain language into reliable, validated actions."
2. **RAG & retrieval**: "Search over messy, real data, from FAISS on HPC to knowledge graphs."
3. **Fine-tuning & quantization**: "Adapting open models to a domain under tight GPU memory."
4. **Voice agents**: "Real-time phone agents with guardrails that hold over long calls."
5. **ML pipelines & evaluation**: "Data prep, training and evals that are reproducible."
6. **GPU & inference**: "CUDA, HIP and LLM inference performance." Badge: **"Learning now"**

## Selected work (Portfon numbered cards 01–04: text left, visual right, alternating on desktop)
Each card has a number, title, short description, tech chips and an "Explore" pill linking to the repo (or "Case study" with no link).

**01 · qubi Autopilot (qBotica)**. Label "Case study · Work". No link.
"Backend for an agentic automation platform that turns plain-language requests and requirement docs into executable workflows. I replaced an unreliable Computer Use agent with a deterministic pipeline (natural language → JSON IR → schema validation → human review), and designed an IP-safe split where an external LLM drafts a generic plan and a local model maps it to proprietary components."
Chips: Python · FastAPI · LLMs · Local models · MCP · JSON Schema
Visual: `ProjectVisual` in "pipeline" mode, a small animated flow of 4 nodes: Request → IR → Validate → Review.

**02 · Distributed RAG on a supercomputer (ASU)**. Label "Case study · Research". No link.
"Semantic search and RAG over a professor's multi-year, 7-site study on human generosity. Ray parallelises embedding, FAISS handles retrieval, and it all runs on ASU's Sol supercomputer. The research team still uses it."
Chips: Python · Ray · FAISS · RAG · HPC (Sol)
Visual: `ProjectVisual` "cluster" mode (grid of nodes lighting up).

**03 · ATLAS-X: fraud detection with graph features**. Label "Team project". Explore → https://github.com/Thayaa21/atlas-x
"XGBoost with graph features from a Neo4j card–device–email network, trained on 590k real IEEE-CIS transactions (0.957 AUC, ~17 ms inference). Kafka streaming, FastAPI, Prometheus/Grafana monitoring and LLM-generated explanations."
Chips: XGBoost · Neo4j · Kafka · FastAPI · Grafana
Visual: `ProjectVisual` "graph" mode.

**04 · EchoShield: on-device voice isolation**. Explore → https://github.com/Thayaa21/EchoShield
"Real-time audio system for voice isolation and smart ambient-mode triggers, using WebRTC VAD, Resemblyzer speaker verification and Vosk wake-word detection. Tuned frame size from 30 to 60 ms to fix CPU overload."
Chips: Python · WebRTC VAD · Resemblyzer · Vosk
Image: `assets/images/projects/echosheid.png` → `public/images/projects/echoshield.png`

## More projects (Reflex glass card grid, 3 columns desktop / 1 mobile)
Each card: title, one line, chips, GitHub link icon.
- **Citation-Aware Research Assistant**: "Local Llama 3.1 8B with FAISS retrieval that parses tables and flowcharts in PDFs, maps citations and answers with sources." Chips: Llama 3.1 · FAISS · Streamlit. https://github.com/Thayaa21/Citation_aware. Image: `projects/researchanalysis.png`
- **CRM Agent: CX Intelligence**: "LangGraph agents (Monitor → Investigator → Action → Supervisor) that watch tickets, reviews and NPS, find anomalies and propose actions. Three MCP servers." Chips: LangGraph · MCP · ChromaDB · React. https://github.com/Thayaa21/crm_agent
- **Life Copilot**: "Daily assistant that reads your calendar, weather and commute, then builds a morning brief and leave-by reminders." Chips: LLM agents · Google Calendar API. https://github.com/Thayaa21/life_copilot. Image: `projects/lifecopilot.png`
- **Explainable AI Demos**: "Notebook collection of XAI techniques for model interpretability." Chips: SHAP · LIME · Jupyter. https://github.com/Thayaa21/Explainable-AI-demos. Image: `projects/explainableai.png`
- **AR E-Brochure: Vedic Heritage**: "Interactive AR brochure that combines cultural storytelling with web AR." Chips: WebAR · HTML/JS. https://github.com/Thayaa21/ar-e-brochure-vedicheritage. Image: `projects/vedicheritage.png`

Hidden until Thayaa confirms (`visible: false`). Build the cards, but don't render them:
- **Cross-Document Graph RAG**: "Knowledge-graph RAG that links the same person across documents and answers with line-level citations; LangChain or UiPath extraction." https://github.com/Thayaa21/QB1
- **Voice Agent: Hospital Appointments**: "Phone agent that verifies callers and answers from a Graph RAG backend." https://github.com/Thayaa21/Voice_Agent
- **Remote Dev Assistant**: "Call a number, and your laptop wakes up and takes code changes, tests and commits from Slack." https://github.com/Thayaa21/Computer_use
- **Market Signals**: "LangGraph agent that explains market anomalies with charts and cited news." https://github.com/Thayaa21/Market_signals

## Experience (Danie timeline: mono label column "+ EXPERIENCE" on the left, entries in a card on the right)
1. **qBotica**, AI Intern · Jun 2026 – Present · Tempe, AZ
   - Building the backend for qubi Autopilot, which turns plain-language requests into executable automation workflows through a deterministic, validated pipeline with human review.
   - Designed an IP-safe split between an external LLM and a local model; led a 3-person team on a client voice agent with rules-as-code guardrails; built Python backend services for a healthcare data-migration client.
2. **Arizona State University**, Graduate Researcher · Sep 2025 – May 2026 · Tempe, AZ
   - Built a distributed semantic search and RAG system over a multi-year, 7-site research study using Ray and FAISS on the Sol supercomputer; still in use by the research team.
3. **Arizona State University**, Text Editor & QA Engineer · Dec 2024 – May 2026 · Tempe, AZ
   - Edited content and performed QA testing, finding bugs and giving feedback.
4. **RBG.AI**, AI Intern · Nov 2023 – Jun 2024 · Coimbatore, India
   - Fine-tuned a quantized 7B LLM with QLoRA on a single AWS T4 GPU for a medical client's chatbot, deployed to production; built NLP pipelines with Hugging Face and PyTorch.
5. **Gramophone Media Lab**, AR Intern · Aug 2022 – Oct 2022 · Coimbatore, India
   - Built an AR e-brochure showcasing Vedic heritage with web AR.

## Education (same timeline component, label "+ EDUCATION")
- **Arizona State University**: M.S. Robotics and Autonomous Systems (Artificial Intelligence) · 2024 – 2026 · GPA 3.8. Logo/photo: `assets/images/asu.jpg`
- **Sri Ramakrishna Engineering College**: B.Tech, Artificial Intelligence and Data Science · 2020 – 2024 · Coimbatore, India. Photo: `assets/images/Srec.jpg`

## Skills (Danie icon grid, grouped, 4 groups)
- **Languages**: Python, C++, SQL, JavaScript/TypeScript
- **AI / ML**: PyTorch, Hugging Face, scikit-learn, XGBoost, LangGraph, LangChain, QLoRA/PEFT, FAISS, ChromaDB
- **Systems & Data**: FastAPI, Docker, Ray, Kafka, Neo4j, Streamlit, GitHub Actions
- **Cloud**: AWS, Google Cloud

## Now learning (small Reflex-style section, label "+ NOW LEARNING")
Intro: "The layer under the models, where my work is heading."
Cards: **CUDA** (PMPP book + GPU MODE lectures) · **AMD HIP / ROCm** · **Modern C++** · **LLM inference** (KV cache, FlashAttention, batching)

## Contact CTA (Reflex closing CTA with glow)
- H2: "Let's build something that ships."
- Text: "Open to full-time AI/ML Engineer roles. The fastest way to reach me is email."
- Buttons: "Email me" (mailto) · "LinkedIn"

## Footer (Danie style)
Left: "Thayaa" + "AI Engineer · Tempe, AZ". Middle: link columns (Work, Experience, Skills, Contact). Right: GitHub, LinkedIn, email icons.
Bottom row: "© 2026 Thayaananthan Kanagaraj" · status pill "● Currently building at qBotica" (green dot) · "BACK TO TOP ↑".
