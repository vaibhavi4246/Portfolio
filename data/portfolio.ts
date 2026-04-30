import type {
  Project,
  ExperienceEntry,
  EducationEntry,
  Achievement,
} from "@/types";

export const personalInfo = {
  name: "Vaibhavi Jain",
  email: "vjain_be23@thapar.edu",
  emailAlt: "vaibhavijain1234@gmail.com",
  phone: "+91 9457069553",
  role: "AI/ML Developer & App Engineer",
  tagline: "Building intelligent systems, one commit at a time.",
  institution: "Thapar Institute of Engineering and Technology",
  batch: "2023–2027",
  cgpa: "8.58",
  socials: {
    linkedin: "https://www.linkedin.com/in/vaibhavi-jain-8a674429b/",
    github: "https://github.com/vaibhavi4246",
    leetcode: "https://leetcode.com/vaibhavijain",
    instagram: "https://instagram.com/vaibhavi4246",
  },
};

export const education: EducationEntry[] = [
  {
    institution: "Thapar Institute of Engineering and Technology",
    degree: "B.Tech, Computer Engineering",
    period: "Aug 2023 – Jun 2027",
    location: "Patiala, Punjab",
    score: "8.58",
    scoreLabel: "CGPA",
  },
  {
    institution: "St. Patrick's Junior College",
    degree: "Higher Secondary (Science Stream)",
    period: "Mar 2021 – May 2023",
    location: "Agra, Uttar Pradesh",
    score: "95.25%",
    scoreLabel: "ISC 12th",
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "humble-coders",
    company: "Humble Coders",
    role: "App Developer Intern",
    period: "Jul 2025 – Sep 2025",
    location: "Patiala, Punjab",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM"],
    points: [
      "Contributed to production-grade Android applications, delivering scalable features for real-world clients.",
      "Developed UI components and screens using Kotlin and Jetpack Compose.",
      "Integrated Firebase Authentication for secure login and session management.",
      "Applied MVVM architecture and connected custom API workflows for modularity.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "scholarflow",
    name: "ScholarFlow",
    date: "Oct 2025",
    description:
      "Agentic research summarization platform using parallel multi-agent NLP pipelines (LED Transformers + SciBERT). Processes research papers in 10–30s with 70–80% compression ratio and ~95% entity extraction accuracy.",
    tech: ["Python", "Flask", "React", "LED Transformers", "SciBERT", "Supabase", "PyTorch"],
    github: "https://github.com/vaibhavi4246/ScholarFlow",
    live: "",
    featured: true,
  },
  {
    id: "ai-mcp-travel",
    name: "AI MCP Travel Planner",
    date: "Feb 2026",
    description:
      "100% free AI-powered travel planning platform using Groq Llama 3.3 70B. Generates personalized multi-day itineraries with real-time weather, Airbnb data via MCP servers, interactive budget viz, live maps, and PDF/calendar exports.",
    tech: ["Python", "Streamlit", "Groq API", "SQLite", "Plotly", "Folium", "ReportLab"],
    github: "https://github.com/vaibhavi4246/AI-MCP-TRAVEL-PLANNER",
    live: "",
    featured: true,
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis — DistilBERT",
    date: "Jan 2026",
    description:
      "Real-time sentiment classifier (Positive/Negative/Neutral) fine-tuned on 4.7M tweets. Achieves 91.4% accuracy with <50ms inference using DistilBERT + CUDA mixed precision. Deployed via Streamlit.",
    tech: ["PyTorch", "Transformers", "DistilBERT", "Streamlit", "Pandas", "Scikit-learn"],
    github: "https://github.com/vaibhavi4246/Sentiment-Analysis",
    live: "",
    featured: true,
  },
  {
    id: "hand-tracking",
    name: "Hand Tracking Bridge",
    date: "Mar 2026",
    description:
      "Real-time dual-hand detection system connecting MediaPipe with TouchDesigner via OSC protocol. Tracks 21 landmarks per hand at 30 FPS with Exponential Moving Average smoothing (α=0.7) for gesture-based creative interfaces.",
    tech: ["Python", "MediaPipe", "OpenCV", "OSC Protocol", "NumPy"],
    github: "https://github.com/vaibhavi4246/hand-tracking-bridge",
    live: "",
    featured: true,
  },
  {
    id: "topsis",
    name: "TOPSIS — PyPI Package",
    date: "Jan 2026",
    description:
      "Full implementation of TOPSIS multi-criteria decision analysis: CLI program, published Python package on PyPI, and Flask web service with email results delivery. Handles normalization, weighted matrices, and ideal-solution ranking.",
    tech: ["Python", "Flask", "Pandas", "NumPy", "PyPI", "Gmail SMTP"],
    github: "https://github.com/vaibhavi4246/Topsis-Assignment",
    live: "",
    featured: false,
  },
];

export const achievements: Achievement[] = [
  {
    title: "Winner — Agentic AI Hackathon",
    date: "Apr 2026",
    description:
      "Won the Agentic AI Hackathon by building an innovative AI-agent using n8n automations.",
  },
  {
    title: "200+ LeetCode Problems Solved",
    date: "Ongoing",
    description:
      "Solved 200+ DSA problems covering dynamic programming, graphs, and greedy algorithms.",
  },
  {
    title: "Pull Shark & Quickdraw — GitHub Badges",
    date: "2024–2026",
    description:
      "Earned GitHub achievement badges for consistent contributions and fast pull request merges.",
  },
];

export const skills = {
  Languages: ["Python", "C++", "Java", "Kotlin", "SQL", "C", "Dart", "JavaScript"],
  "Frameworks & Libraries": [
    "Streamlit", "Jetpack Compose", "Firebase", "Flask", "React.js", "Node.js",
  ],
  "AI / ML": [
    "PyTorch", "TensorFlow", "Scikit-learn", "NLP / Transformers", "RAG Pipelines",
    "OpenCV", "NumPy / Pandas", "MediaPipe",
  ],
  "Databases & Tools": [
    "Git / GitHub", "MySQL", "Supabase", "MongoDB", "Docker", "AWS", "Linux", "Figma",
  ],
};

export const skillLevels: Record<string, { name: string; level: number }[]> = {
  Languages: [
    { name: "Python", level: 88 },
    { name: "C++", level: 75 },
    { name: "Java", level: 72 },
    { name: "Kotlin", level: 80 },
    { name: "SQL", level: 82 },
    { name: "C", level: 70 },
    { name: "Dart", level: 60 },
    { name: "JavaScript", level: 68 },
  ],
  "AI / ML": [
    { name: "PyTorch", level: 82 },
    { name: "TensorFlow", level: 78 },
    { name: "Scikit-learn", level: 85 },
    { name: "NLP / Transformers", level: 80 },
    { name: "RAG Pipelines", level: 85 },
    { name: "OpenCV", level: 78 },
    { name: "NumPy / Pandas", level: 88 },
    { name: "MediaPipe", level: 72 },
  ],
  "Frameworks & Libraries": [
    { name: "Streamlit", level: 88 },
    { name: "Jetpack Compose", level: 82 },
    { name: "Firebase", level: 80 },
    { name: "Flask", level: 78 },
    { name: "React.js", level: 75 },
    { name: "Node.js", level: 65 },
  ],
  "Databases & Tools": [
    { name: "Git / GitHub", level: 90 },
    { name: "MySQL", level: 82 },
    { name: "Supabase", level: 75 },
    { name: "MongoDB", level: 72 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 62 },
    { name: "Linux", level: 70 },
    { name: "Figma", level: 68 },
  ],
};

export const roles = [
  {
    title: "Technical & Marketing Coordinator",
    org: "Microsoft Learn Student Chapter",
    period: "Apr 2024 – Present",
    location: "Patiala, Punjab",
    points: [
      "Led initiatives across marketing and technical domains, increasing community engagement.",
      "Coordinated planning and execution of flagship technical events.",
    ],
  },
  {
    title: "Year Representative",
    org: "Mudra, Izhaar Cultural Event",
    period: "Apr 2024",
    location: "Patiala, Punjab",
    points: [
      "Led the First-Year Cultural Dance Team for choreography, rehearsals, and performance.",
      "Served as student ambassador for the first-year cohort at major university events.",
    ],
  },
];

export const currentFocus = [
  { icon: "🤖", text: "Building Android apps with Kotlin & Jetpack Compose" },
  { icon: "🧠", text: "Advanced GenAI techniques & LLM fine-tuning" },
  { icon: "👁️", text: "Computer vision & real-time ML applications" },
  { icon: "🚀", text: "Full-stack AI-powered platforms" },
];
