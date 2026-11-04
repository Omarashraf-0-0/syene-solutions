export type SkillCategory = 'all' | 'ai' | 'fullstack' | 'cloud' | 'spatial';

export interface TechnicalSkill {
  id: string;
  name: string;
  shortLabel: string;
  category: 'ai' | 'fullstack' | 'cloud' | 'spatial';
  proficiency: number; // 0 to 100
  experience: string;
  productionDeployments: number;
  architectureTier: 'Core Studio Standard' | 'Advanced Production' | 'High-Specialization';
  summary: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategoryMeta {
  id: SkillCategory;
  label: string;
  code: string;
  description: string;
  summaryStat: string;
}

export const SKILL_CATEGORIES: SkillCategoryMeta[] = [
  {
    id: 'all',
    label: 'Holistic Radar',
    code: '00 // ALL',
    description: 'Cross-functional engineering stack across applied AI models, distributed backend systems, cloud MLOps, and 3D spatial frontends.',
    summaryStat: '16 Production Capabilities',
  },
  {
    id: 'ai',
    label: 'Applied AI & LLMs',
    code: '01 // AI',
    description: 'Autonomous agents, contextual RAG vector retrieval, SLM fine-tuning, multimodal inference, and prompt defense.',
    summaryStat: '93.4% Avg Proficiency',
  },
  {
    id: 'fullstack',
    label: 'Software & Systems',
    code: '02 // SYS',
    description: 'Type-safe distributed architectures, microservices, high-throughput message brokers, and transactional SQL databases.',
    summaryStat: '94.2% Avg Proficiency',
  },
  {
    id: 'cloud',
    label: 'Cloud & MLOps',
    code: '03 // OPS',
    description: 'High-availability containerized deployments, GPU inference orchestration, Terraform IaC, and automated CI/CD pipelines.',
    summaryStat: '90.5% Avg Proficiency',
  },
  {
    id: 'spatial',
    label: '3D Spatial & UI',
    code: '04 // 3D',
    description: 'WebGL, Three.js shaders, reactive GPU compute, physics engines, and fluid micro-interactions with zero-pill discipline.',
    summaryStat: '94.0% Avg Proficiency',
  },
];

export const TECHNICAL_SKILLS: TechnicalSkill[] = [
  // 1. Applied AI & LLMs
  {
    id: 'agentic-ai',
    name: 'Autonomous Agents & LLM Orchestration',
    shortLabel: 'Agentic AI',
    category: 'ai',
    proficiency: 96,
    experience: '4+ Years',
    productionDeployments: 28,
    architectureTier: 'Advanced Production',
    summary: 'Multi-agent coordination swarms, dynamic tool calling, deterministic state machines, and human-in-the-loop validation.',
    tags: ['LangChain', 'LlamaIndex', 'Function Calling', 'State Graphs', 'Evals'],
    metrics: [
      { label: 'Evaluation Win Rate', value: '98.4%' },
      { label: 'Avg Latency Overhead', value: '<42ms' },
      { label: 'Tool Dispatch Precision', value: '99.2%' },
    ],
  },
  {
    id: 'rag-vector',
    name: 'Contextual RAG & Vector Embeddings',
    shortLabel: 'Hybrid RAG',
    category: 'ai',
    proficiency: 94,
    experience: '4+ Years',
    productionDeployments: 34,
    architectureTier: 'Core Studio Standard',
    summary: 'Dense vector search with BM25 hybrid ranking, cross-encoder rerankers, semantic chunking, and metadata filtering.',
    tags: ['pgvector', 'ChromaDB', 'Cohere Rerank', 'Hybrid Search', 'Voyage AI'],
    metrics: [
      { label: 'Retrieval Recall @ 5', value: '96.8%' },
      { label: 'Vector Index P99', value: '18ms' },
      { label: 'Chunk Coherence', value: '99.1%' },
    ],
  },
  {
    id: 'slm-finetuning',
    name: 'SLM Fine-Tuning & Quantization',
    shortLabel: 'Model Tuning',
    category: 'ai',
    proficiency: 89,
    experience: '3+ Years',
    productionDeployments: 19,
    architectureTier: 'High-Specialization',
    summary: 'Parameter-efficient fine-tuning (QLoRA, LoRA), GGUF/AWQ 4-bit quantizations, and domain-specific dataset curation.',
    tags: ['QLoRA', 'vLLM', 'Unsloth', 'AWQ', 'Hugging Face'],
    metrics: [
      { label: 'VRAM Footprint Reduction', value: '-64%' },
      { label: 'Inference Speedup', value: '3.4x' },
      { label: 'Domain Task F1', value: '92.6%' },
    ],
  },
  {
    id: 'vision-multimodal',
    name: 'Computer Vision & Multimodal Pipelines',
    shortLabel: 'Vision AI',
    category: 'ai',
    proficiency: 88,
    experience: '3+ Years',
    productionDeployments: 15,
    architectureTier: 'Advanced Production',
    summary: 'Document parsing, visual QA, OCR extraction pipelines, object localization, and real-time video frame triage.',
    tags: ['CLIP', 'YOLOv10', 'PaddleOCR', 'OpenCV', 'Gemini Vision'],
    metrics: [
      { label: 'Document Accuracy', value: '99.4%' },
      { label: 'Frame Triage FPS', value: '60 FPS' },
      { label: 'Extraction P95', value: '120ms' },
    ],
  },

  // 2. Full-Stack & Systems Architecture
  {
    id: 'typescript-react',
    name: 'TypeScript & Modern React Ecosystem',
    shortLabel: 'TypeScript / React',
    category: 'fullstack',
    proficiency: 98,
    experience: '7+ Years',
    productionDeployments: 62,
    architectureTier: 'Core Studio Standard',
    summary: 'Strict compile-time type safety, React 19 architecture, Vite build pipelines, SSR/hydration optimizations, and design system authoring.',
    tags: ['TypeScript', 'React 19', 'Next.js', 'Vite', 'Tailwind CSS'],
    metrics: [
      { label: 'Production Strict Type Coverage', value: '100%' },
      { label: 'Lighthouse Performance Score', value: '99/100' },
      { label: 'Zero-Runtime Overhead', value: 'Verified' },
    ],
  },
  {
    id: 'microservices-api',
    name: 'High-Throughput APIs & Microservices',
    shortLabel: 'API Microservices',
    category: 'fullstack',
    proficiency: 95,
    experience: '6+ Years',
    productionDeployments: 48,
    architectureTier: 'Core Studio Standard',
    summary: 'Distributed REST, GraphQL, and gRPC endpoints engineered for sub-20ms latencies with idempotent mutations and distributed rate-limiting.',
    tags: ['Go', 'Node.js / tsx', 'FastAPI', 'gRPC', 'GraphQL'],
    metrics: [
      { label: 'Throughput Capacity', value: '25k req/s' },
      { label: 'P99 Latency SLA', value: '<24ms' },
      { label: 'Availability Record', value: '99.99%' },
    ],
  },
  {
    id: 'distributed-db',
    name: 'Relational & Distributed Databases',
    shortLabel: 'PostgreSQL / SQL',
    category: 'fullstack',
    proficiency: 94,
    experience: '6+ Years',
    productionDeployments: 52,
    architectureTier: 'Core Studio Standard',
    summary: 'Complex relational schemas, partitioned tables, Redis caching tiers, ClickHouse analytical telemetry, and Drizzle/Prisma ORMs.',
    tags: ['PostgreSQL', 'Redis', 'ClickHouse', 'Drizzle ORM', 'Connection Pooling'],
    metrics: [
      { label: 'Query Optimization P95', value: '<8ms' },
      { label: 'Zero-Loss Replication', value: 'Multi-AZ' },
      { label: 'Cache Hit Ratio', value: '94.2%' },
    ],
  },
  {
    id: 'realtime-events',
    name: 'Real-Time WebSockets & Message Queues',
    shortLabel: 'Real-Time Queues',
    category: 'fullstack',
    proficiency: 91,
    experience: '5+ Years',
    productionDeployments: 31,
    architectureTier: 'Advanced Production',
    summary: 'Bidirectional state synchronization, reliable job queues, BullMQ distributed workers, Server-Sent Events, and pub/sub channels.',
    tags: ['WebSockets', 'BullMQ', 'Kafka', 'SSE', 'Redis Pub/Sub'],
    metrics: [
      { label: 'Concurrent Sockets', value: '50,000+' },
      { label: 'Message Transit Delay', value: '<12ms' },
      { label: 'Queue Recovery SLA', value: '100%' },
    ],
  },

  // 3. Cloud Infrastructure & MLOps
  {
    id: 'containers-kubernetes',
    name: 'Containerization & Cloud Orchestration',
    shortLabel: 'Containers / K8s',
    category: 'cloud',
    proficiency: 93,
    experience: '5+ Years',
    productionDeployments: 41,
    architectureTier: 'Core Studio Standard',
    summary: 'Production Docker multi-stage images, Kubernetes cluster topologies, health probes, automated horizontal pod autoscaling, and ingress routing.',
    tags: ['Docker', 'Kubernetes', 'Helm', 'Fly.io', 'Cloud Run'],
    metrics: [
      { label: 'Cold-Start Container Launch', value: '<1.2s' },
      { label: 'Base Image Footprint', value: '<48MB' },
      { label: 'Auto-Scaling Dynamic Range', value: '1 to 50+' },
    ],
  },
  {
    id: 'gpu-mlops',
    name: 'GPU Inference & Model Serving MLOps',
    shortLabel: 'GPU Serving / MLOps',
    category: 'cloud',
    proficiency: 89,
    experience: '3+ Years',
    productionDeployments: 22,
    architectureTier: 'High-Specialization',
    summary: 'Deploying optimized model endpoints with vLLM, TensorRT-LLM, Triton Server, dynamic batching, and CUDA memory management.',
    tags: ['vLLM', 'Triton Server', 'TensorRT', 'CUDA', 'RunPod / GCP'],
    metrics: [
      { label: 'Tokens Per Second (TPS)', value: '142 tps' },
      { label: 'First Token Latency (TTFT)', value: '<180ms' },
      { label: 'GPU Memory Utilization', value: '94.8%' },
    ],
  },
  {
    id: 'cicd-iac',
    name: 'Infrastructure as Code & CI/CD Pipelines',
    shortLabel: 'Terraform & CI/CD',
    category: 'cloud',
    proficiency: 92,
    experience: '6+ Years',
    productionDeployments: 55,
    architectureTier: 'Core Studio Standard',
    summary: 'Declarative Terraform / OpenTofu cloud stacks, automated GitHub Actions workflows, security SAST scanning, and blue-green deployments.',
    tags: ['Terraform', 'GitHub Actions', 'Trivy', 'Playwright', 'Vitest'],
    metrics: [
      { label: 'Deployment Pipeline Speed', value: '<2m 45s' },
      { label: 'Automated Test Pass Gate', value: '100%' },
      { label: 'Rollback Recovery Time', value: '<30s' },
    ],
  },
  {
    id: 'observability-telemetry',
    name: 'Production Observability & Tracing',
    shortLabel: 'Telemetry & Logs',
    category: 'cloud',
    proficiency: 88,
    experience: '4+ Years',
    productionDeployments: 36,
    architectureTier: 'Advanced Production',
    summary: 'Distributed OpenTelemetry spans, Prometheus metrics, structured JSON logging, Langfuse LLM traces, and automated alert routing.',
    tags: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Langfuse', 'Sentry'],
    metrics: [
      { label: 'Trace Ingestion Rate', value: '100% loss-free' },
      { label: 'Alert Detection MTTA', value: '<45s' },
      { label: 'Span Instrumentation', value: 'Full Stack' },
    ],
  },

  // 4. 3D Spatial & Creative Engineering
  {
    id: 'threejs-webgl',
    name: 'WebGL & Three.js 3D Shader Programming',
    shortLabel: 'WebGL & Three.js',
    category: 'spatial',
    proficiency: 94,
    experience: '5+ Years',
    productionDeployments: 26,
    architectureTier: 'Advanced Production',
    summary: 'Custom GLSL fragment/vertex shaders, physically based rendering (PBR), ambient transmission glass materials, and spatial parallax math.',
    tags: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Post-processing', 'Parallax'],
    metrics: [
      { label: 'Frame Rate Consistency', value: 'Locked 60 FPS' },
      { label: 'Draw Calls Optimization', value: '<14 calls' },
      { label: 'GPU Memory Ceiling', value: '<42MB' },
    ],
  },
  {
    id: 'motion-physics',
    name: 'Physics Simulations & Responsive Motion',
    shortLabel: 'Physics & Motion',
    category: 'spatial',
    proficiency: 93,
    experience: '5+ Years',
    productionDeployments: 38,
    architectureTier: 'Core Studio Standard',
    summary: 'Particle physics algorithms, velocity spring physics, collision bounds, dynamic damping, and hardware-accelerated transforms.',
    tags: ['Rapier Physics', 'Spring Math', 'Framer Motion', 'Canvas 2D/3D', 'Web Workers'],
    metrics: [
      { label: 'Input Latency Response', value: '<8ms' },
      { label: 'Physics Step Delta', value: '16.6ms' },
      { label: 'Jank Detection Rate', value: '0.0%' },
    ],
  },
  {
    id: 'design-systems',
    name: 'Design Systems & High-Fidelity UI',
    shortLabel: 'UI Architecture',
    category: 'spatial',
    proficiency: 97,
    experience: '7+ Years',
    productionDeployments: 70,
    architectureTier: 'Core Studio Standard',
    summary: 'Architectural component libraries, zero-pill discipline, WCAG 2.1 AA accessibility, dynamic theme engines, and responsive typography.',
    tags: ['Tailwind CSS', 'Figma Tokens', 'Radix Primitives', 'WCAG AA', 'Micro-interactions'],
    metrics: [
      { label: 'Accessibility Audit', value: '100% WCAG AA' },
      { label: 'Fluid Breakpoint Coverage', value: '320px–3840px' },
      { label: 'Component Reusability', value: '92%' },
    ],
  },
  {
    id: 'perf-engineering',
    name: 'Client-Side Runtime & Memory Optimization',
    shortLabel: 'Runtime Perf',
    category: 'spatial',
    proficiency: 92,
    experience: '6+ Years',
    productionDeployments: 45,
    architectureTier: 'Core Studio Standard',
    summary: 'Memory leak profiling, garbage collection smoothing, Web Workers thread offloading, and asset bundle tree-shaking.',
    tags: ['Chrome DevTools Profiling', 'Web Workers', 'OffscreenCanvas', 'Wasm', 'Tree Shaking'],
    metrics: [
      { label: 'Core Web Vitals Pass', value: '100%' },
      { label: 'Memory Drift Delta', value: '<0.5MB/hr' },
      { label: 'Interaction to Next Paint (INP)', value: '<35ms' },
    ],
  },
];
