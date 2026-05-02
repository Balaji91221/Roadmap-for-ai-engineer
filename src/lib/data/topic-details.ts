import { Subtopic } from '@/lib/types'

interface TopicDetail {
  intro: string
  subtopics: Subtopic[]
}

export const TOPIC_DETAILS: Record<string, TopicDetail> = {
  'NLP Fundamentals': {
    intro: 'Natural Language Processing is the bridge between human language and machine understanding. Every AI product relies on NLP at its core. This topic gives you the vocabulary and mental models for everything that follows.',
    subtopics: [
      { name: 'Tokenization (Beginner)', detail: 'Before any model can process text, it must be broken into tokens. BPE (GPT), WordPiece (BERT), and SentencePiece (T5) each handle vocabulary differently. Tokenization determines model efficiency and API costs.' },
      { name: 'Word Embeddings (Beginner)', detail: 'Representing words as dense vectors capturing semantic meaning. Word2Vec and GloVe create static embeddings; ELMo and BERT create contextual embeddings where the same word gets different vectors based on surrounding context.' },
      { name: 'Named Entity Recognition (Intermediate)', detail: 'Identifying entities in text: people, organizations, locations, dates. Production challenges include nested entities, ambiguous entities, and domain-specific terminology.' },
      { name: 'Text Classification (Intermediate)', detail: 'Assigning categories to text. The most deployed NLP task in production. Always start with TF-IDF + Logistic Regression before reaching for transformers.' },
      { name: 'Sequence Modeling (Advanced)', detail: 'Transforming one sequence into another: translation, summarization, QA. Understanding seq2seq prepares you for how GPT and T5 work.' },
    ],
  },
  'Reasoning & Problem Solving': {
    intro: 'AI reasoning is about how machines draw conclusions and solve problems. Understanding reasoning types, capabilities, and limitations is essential for building reliable AI systems.',
    subtopics: [
      { name: 'Types of Reasoning (Beginner)', detail: 'Deductive (general to specific, guaranteed correct), Inductive (specific to general, probabilistic), and Abductive (best explanation). LLMs are strongest at induction and weakest at formal deduction.' },
      { name: 'Chain-of-Thought (Beginner)', detail: 'Asking LLMs to show reasoning steps before answering. Improves accuracy on math problems from ~55% to ~95%. You get a verifiable reasoning trace for debugging.' },
      { name: 'Neuro-Symbolic AI (Intermediate)', detail: 'Combining neural networks for language understanding with symbolic systems for verified reasoning. Critical for applications where usually right is not good enough.' },
      { name: 'Common-Sense Reasoning (Advanced)', detail: 'The hardest unsolved problem in AI. LLMs fail in surprising ways with physical and social reasoning. Never trust LLMs for physical intuition without guardrails.' },
      { name: 'Evaluating Reasoning (Advanced)', detail: 'Benchmarks like GSM8K, ARC, GPQA test reasoning but have limitations. Build custom test suites for production evaluation.' },
    ],
  },
  'Supervised Learning': {
    intro: 'You have labeled data and train a model to predict labels for new data. This is the workhorse of production ML, powering everything from spam filters to disease diagnosis.',
    subtopics: [
      { name: 'Classification vs Regression (Beginner)', detail: 'Classification predicts categories, regression predicts continuous values. They use different loss functions, metrics, and configurations. Choosing the right problem type is the first decision.' },
      { name: 'Loss Functions & Optimization (Beginner)', detail: 'Loss functions measure prediction error. Gradient descent iteratively improves the model. Adam optimizer is the default choice. Understanding loss helps debug training.' },
      { name: 'Algorithm Selection (Intermediate)', detail: 'Logistic Regression (baseline), Random Forests (robust), XGBoost (highest accuracy on tabular data). Start simple, add complexity only when needed.' },
      { name: 'Feature Engineering (Intermediate)', detail: 'Often more impactful than model selection. Domain knowledge is your superpower for creating informative features.' },
      { name: 'Evaluation & Cross-Validation (Advanced)', detail: 'Precision, recall, F1, AUC-ROC measure different aspects of quality. Cross-validation estimates real-world performance. Your test set must represent production data.' },
    ],
  },
  'Unsupervised Learning': {
    intro: 'Discovers hidden patterns in unlabeled data. Powers customer segmentation, anomaly detection, dimensionality reduction, and topic discovery.',
    subtopics: [
      { name: 'K-Means Clustering (Beginner)', detail: 'Simplest clustering: assign points to nearest center, recalculate centers, repeat. Must specify K upfront. Elbow method and silhouette score help choose K.' },
      { name: 'DBSCAN & Hierarchical (Intermediate)', detail: 'DBSCAN finds clusters of arbitrary shape and identifies outliers. Hierarchical clustering builds a tree of nested clusters. Choose based on data characteristics.' },
      { name: 'Dimensionality Reduction (Intermediate)', detail: 'PCA for feature reduction in pipelines, UMAP for visualization. t-SNE creates beautiful visualizations but distorts global distances.' },
      { name: 'Anomaly Detection (Advanced)', detail: 'Finding unusual patterns. Isolation Forest, LOF, and autoencoders each detect different types of anomalies. Evaluation is hard when anomalies are rare.' },
    ],
  },
  'Reinforcement Learning + RLHF': {
    intro: 'An agent learns by interacting with an environment. RLHF is the technique that transformed raw language models into helpful assistants like ChatGPT and Claude.',
    subtopics: [
      { name: 'RL Fundamentals (Beginner)', detail: 'Agent, Environment, State, Action, Reward. The explore-exploit dilemma is central. The goal is learning a policy that maximizes cumulative reward.' },
      { name: 'Q-Learning & Policy Gradient (Intermediate)', detail: 'Q-Learning learns action values, Policy Gradient directly optimizes the policy. Actor-Critic combines both. PPO is the dominant algorithm.' },
      { name: 'PPO (Intermediate)', detail: 'Proximal Policy Optimization limits how much the policy changes per update, preventing training crashes. Almost always used in RLHF.' },
      { name: 'RLHF Pipeline (Advanced)', detail: 'Three steps: SFT on demonstrations, train reward model from human preferences, optimize with PPO against the reward model.' },
      { name: 'DPO & Alternatives (Advanced)', detail: 'Direct Preference Optimization eliminates the separate reward model. Simpler, more stable, increasingly popular. Also: RLAIF, Constitutional AI, KTO.' },
    ],
  },
  'CNNs (Convolutional Neural Networks)': {
    intro: 'The architecture that made deep learning practical for vision. Applies learnable filters to automatically extract image features.',
    subtopics: [
      { name: 'Convolution Operations (Beginner)', detail: 'Filters slide across images computing dot products to detect patterns. Early layers detect edges, deep layers detect objects.' },
      { name: 'Pooling & Architecture (Intermediate)', detail: 'Max pooling provides translation invariance. Key architectures: ResNet (skip connections), EfficientNet (optimal scaling).' },
      { name: 'Transfer Learning with CNNs (Intermediate)', detail: 'Freeze pretrained layers as feature extractors, fine-tune top layers for your task. Makes CNNs practical with limited data.' },
      { name: 'Object Detection (Advanced)', detail: 'YOLO detects and localizes multiple objects in real-time. Semantic and instance segmentation assign classes to every pixel.' },
    ],
  },
  'RNN & LSTM': {
    intro: 'Process sequential data with hidden states carrying information across time steps. Introduced concepts that directly influenced transformer design.',
    subtopics: [
      { name: 'Recurrent Architecture (Beginner)', detail: 'At each step, takes current input AND previous hidden state. Same weights shared across all steps. Maintains a running summary of the sequence.' },
      { name: 'Vanishing Gradient (Intermediate)', detail: 'Gradients multiply through time steps and vanish or explode. The model cannot learn long-range dependencies. This motivated LSTMs and eventually transformers.' },
      { name: 'LSTM Gates (Intermediate)', detail: 'Forget gate, Input gate, Output gate. The network learns when to remember, forget, and output. Cell state carries information across many steps.' },
      { name: 'Modern Usage (Advanced)', detail: 'In 2026, still used for streaming applications, time-series forecasting, and edge devices where transformers are too large.' },
    ],
  },
  'Attention Mechanisms': {
    intro: 'The single most important concept in modern AI. Allows models to directly relate any position in a sequence to any other position, regardless of distance.',
    subtopics: [
      { name: 'Scaled Dot-Product (Beginner)', detail: 'Query, Key, Value matrices. Score = softmax(QK^T / sqrt(d_k)) * V. The scaling prevents gradient issues. This is the mathematical heart of transformers.' },
      { name: 'Multi-Head Attention (Intermediate)', detail: 'Multiple parallel attention operations, each learning different relationship types. Outputs are concatenated and projected.' },
      { name: 'Self vs Cross Attention (Intermediate)', detail: 'Self-attention: sequence attends to itself. Cross-attention: one sequence attends to another. Key for understanding different transformer architectures.' },
      { name: 'Efficient Attention (Advanced)', detail: 'Flash Attention reorders computations for 2-4x speedup. Sparse and linear attention reduce O(n^2) complexity for long sequences.' },
    ],
  },
  'Transformers Architecture': {
    intro: 'The architecture behind every major AI breakthrough since 2017. GPT, BERT, Claude, Gemini — all transformers. Non-negotiable knowledge for AI engineering.',
    subtopics: [
      { name: 'Architecture Overview (Beginner)', detail: 'Encoder (understanding), Decoder (generation), or both. BERT is encoder-only, GPT is decoder-only, T5 is encoder-decoder. Decoder-only dominates in 2026.' },
      { name: 'Positional Encoding (Intermediate)', detail: 'Since attention has no order notion, position must be added explicitly. RoPE (Rotary Position Embedding) is dominant — enables better generalization to longer sequences.' },
      { name: 'Layer Norm & Residuals (Intermediate)', detail: 'Layer norm stabilizes training, residual connections enable very deep networks. Pre-norm is now standard.' },
      { name: 'Scaling Laws (Advanced)', detail: 'Model performance is predictable from size + data + compute. This guides decisions about model size vs training data tradeoffs.' },
      { name: 'Emergent Abilities (Advanced)', detail: 'Capabilities that appear only at certain scales: in-context learning, chain-of-thought, instruction following. Cannot be predicted from smaller models.' },
    ],
  },
  'Transfer Learning': {
    intro: 'Start with a pretrained model, adapt to your task with much less data and compute. The practical bridge between foundation models and real-world applications.',
    subtopics: [
      { name: 'Feature Extraction vs Fine-tuning (Beginner)', detail: 'Feature extraction: freeze model, train new head. Fine-tuning: unfreeze layers, train with small learning rate. Start with extraction, try fine-tuning if needed.' },
      { name: 'Knowledge Distillation (Intermediate)', detail: 'Compress large teacher into smaller student. DistilBERT: 60% smaller, 60% faster, 97% of BERT quality. Essential for edge deployment.' },
      { name: 'Domain Adaptation (Intermediate)', detail: 'When target domain differs from pretraining. Continued pretraining on domain data and progressive unfreezing help bridge the gap.' },
      { name: 'When Transfer Fails (Advanced)', detail: 'Negative transfer: source domain hurts target. Signs: worse than training from scratch. Solution: different base model or more domain data.' },
    ],
  },
  'LLM Landscape': {
    intro: 'Understanding the model ecosystem — capabilities, tradeoffs, pricing — is essential for making informed decisions. The wrong choice means 10x higher costs or unacceptable quality.',
    subtopics: [
      { name: 'Major Model Families (Beginner)', detail: 'GPT (reasoning, ecosystem), Claude (long context, safety), Gemini (multimodal, Google integration), LLaMA/Mistral (open-source, self-hostable), DeepSeek (cost-effective coding).' },
      { name: 'Open vs Closed Source (Intermediate)', detail: 'Closed: better performance, easier use, vendor lock-in. Open: full control, fine-tunable, infrastructure needed. Many systems use both.' },
      { name: 'Benchmarks & Limits (Intermediate)', detail: 'MMLU, HumanEval, GPQA, Arena ELO are useful but flawed. Always evaluate on YOUR specific use case.' },
      { name: 'Context & Pricing (Advanced)', detail: 'Context ranges from 8K to 1M+ tokens. Pricing varies 100x. Smart model routing is essential for cost management.' },
    ],
  },
  'Pretraining & Fine-tuning': {
    intro: 'Pretraining: massive, expensive learning on internet-scale data. Fine-tuning: targeted adaptation for specific tasks. Understanding both explains why LLMs work and what you can customize.',
    subtopics: [
      { name: 'Pretraining Objectives (Beginner)', detail: 'Next-token prediction (GPT), masked language modeling (BERT), sequence-to-sequence (T5). The objective shapes what the model learns.' },
      { name: 'Training Infrastructure (Intermediate)', detail: 'Distributed training across thousands of GPUs. Data parallelism, tensor parallelism, mixed precision. Understanding constraints of model development.' },
      { name: 'Instruction Tuning (Intermediate)', detail: 'Fine-tuning on instruction-response pairs transforms text completion into helpful assistant. Quality of instruction data directly determines usefulness.' },
      { name: 'Data Curation (Advanced)', detail: 'Pretraining data quality matters more than model size. Deduplication, filtering, domain balancing, and decontamination are critical competitive advantages.' },
    ],
  },
  'Prompt Engineering': {
    intro: 'The art and science of communicating with LLMs. The highest-ROI skill in AI — no training, no GPUs, immediate results. A well-crafted prompt is the difference between useless output and production-quality results.',
    subtopics: [
      { name: 'System vs User Prompts (Beginner)', detail: 'System prompts set persistent behavior and constraints. User prompts are queries. Well-designed system prompts eliminate entire failure categories.' },
      { name: 'Few-Shot & Chain-of-Thought (Beginner)', detail: 'Few-shot: example input-output pairs. CoT: step-by-step reasoning. Combined, they dramatically improve complex task accuracy.' },
      { name: 'Output Formatting (Intermediate)', detail: 'JSON mode, XML tags, explicit schemas. Critical when downstream code needs to parse outputs. Always validate programmatically.' },
      { name: 'Prompt Chaining (Intermediate)', detail: 'Break complex tasks into sequential prompts. Each step is simpler and more reliable than asking for everything at once.' },
      { name: 'Temperature & Sampling (Advanced)', detail: 'Temperature controls randomness. Top-p limits probability mass. Settings depend on task: 0 for factual, 0.7 for balanced, 1.0 for creative.' },
    ],
  },
  'RAG (Retrieval-Augmented Generation)': {
    intro: 'The most important pattern in production AI. Retrieves relevant documents and includes them in prompts. Solves hallucination, freshness, and customization problems.',
    subtopics: [
      { name: 'Document Chunking (Beginner)', detail: 'Split documents into processable pieces. Chunk size is the most impactful RAG hyperparameter. Too small loses context, too large dilutes relevance.' },
      { name: 'Embedding & Vector Search (Beginner)', detail: 'Convert chunks to dense vectors. Vector DBs (Pinecone, Qdrant, pgvector) find similar vectors in milliseconds across millions of documents.' },
      { name: 'Reranking & Hybrid Search (Intermediate)', detail: 'Two-stage retrieval: vector search for candidates, cross-encoder reranker for precision. Hybrid search combines semantic and keyword matching.' },
      { name: 'Citation & Grounding (Intermediate)', detail: 'Production RAG must cite sources and refuse when evidence is insufficient. Prevents hallucination beyond retrieved context.' },
      { name: 'Evaluation (RAGAS) (Advanced)', detail: 'Multiple metrics: context relevance, faithfulness, answer relevance, groundedness. Without evaluation, changes may improve one dimension while destroying another.' },
    ],
  },
  'Summarisation': {
    intro: 'Extracting key information and presenting it concisely. The challenge is accuracy and faithfulness, not generation itself.',
    subtopics: [
      { name: 'Extractive vs Abstractive (Beginner)', detail: 'Extractive selects sentences verbatim. Abstractive generates new text. LLMs enable abstractive but introduce hallucination risk.' },
      { name: 'Long Document Strategies (Intermediate)', detail: 'Map-reduce, refine, and stuff approaches for documents exceeding context windows. Map-reduce is most common for very long documents.' },
      { name: 'Factual Consistency (Advanced)', detail: 'The biggest risk: model adds details not in the source. Detection via NLI checking, entity verification, and self-consistency comparisons.' },
    ],
  },
  'Code Generation': {
    intro: 'AI-assisted code generation is transforming development. AI excels at boilerplate and patterns; humans are essential for architecture and edge cases.',
    subtopics: [
      { name: 'Completion vs Generation (Beginner)', detail: 'Completion predicts next lines. Generation creates from descriptions. Transformation refactors or translates. Each has different reliability.' },
      { name: 'Spec-Driven Development (Intermediate)', detail: 'Write specs before generating code. Define inputs, outputs, constraints, edge cases. Results are dramatically better than vague prompts.' },
      { name: 'Evaluating AI Code (Advanced)', detail: 'Run in sandboxes, test edge cases, review for security vulnerabilities. Verify code solves the stated problem, not a similar but different one.' },
    ],
  },
  'Personalisation': {
    intro: 'Adapting model behavior based on individual user preferences, history, and context.',
    subtopics: [
      { name: 'User Preference Modeling (Beginner)', detail: 'Extract preferences from behavior. Collaborative and content-based filtering. Modern systems combine both with neural models.' },
      { name: 'Dynamic Prompt Adaptation (Intermediate)', detail: 'Adjust prompts based on user profile. Expert gets technical responses, beginner gets simplified. Requires maintaining profiles and injecting context.' },
      { name: 'Privacy & Data Minimization (Advanced)', detail: 'Collect only what is needed. GDPR/CCPA compliance is a core design constraint. Federated learning enables personalization without centralizing data.' },
    ],
  },
  'Hallucination Mitigation': {
    intro: 'The number one reliability problem in production AI. Understanding types, causes, and mitigation strategies is essential for trustworthy AI.',
    subtopics: [
      { name: 'Types of Hallucination (Beginner)', detail: 'Factual (wrong facts), faithfulness (not matching sources), instruction (ignoring constraints). Each requires different detection and prevention.' },
      { name: 'Detection Methods (Intermediate)', detail: 'NLI checking, self-consistency, citation verification, entity checking. Automated detection catches 60-80% of hallucinations.' },
      { name: 'Prevention Strategies (Intermediate)', detail: 'RAG grounding, constrained generation, temperature=0, explicit uncertainty instructions. Defense in depth with multiple layers.' },
      { name: 'Guardrails & Quality Gates (Advanced)', detail: 'Automated output checking: format validation, content filtering, consistency verification, confidence thresholds, and fallback responses.' },
    ],
  },
  'Tool Use & Function Calling': {
    intro: 'What transforms LLMs from text generators into agents that interact with the real world. Foundation of agentic AI.',
    subtopics: [
      { name: 'Tool Schema Design (Beginner)', detail: 'Clear names, descriptions, and parameter schemas. Description quality directly determines tool selection accuracy.' },
      { name: 'Execution Patterns (Intermediate)', detail: 'Sequential, parallel, and conditional tool execution. Understanding differences between Anthropic and OpenAI APIs.' },
      { name: 'Error Handling (Intermediate)', detail: 'Retry with backoff, fallback tools, graceful degradation. Never expose raw errors to users.' },
      { name: 'Security (Advanced)', detail: 'Prompt injection can trigger unwanted tool calls. Input validation, sandboxing, and human approval for destructive operations are essential.' },
    ],
  },
  'Fine-tuning Fundamentals (Full FT vs Parameter-Efficient)': {
    intro: 'When prompting is not enough. The decision between full fine-tuning and PEFT methods depends on data, budget, and requirements.',
    subtopics: [
      { name: 'When to Fine-tune (Beginner)', detail: 'Fine-tune for consistent format, domain knowledge, or custom behavior. Do NOT fine-tune when prompting or RAG solves the problem.' },
      { name: 'Full Fine-tuning (Intermediate)', detail: 'Updates all parameters. Expensive but most powerful. Use with large datasets and maximum quality requirements.' },
      { name: 'PEFT Overview (Intermediate)', detail: 'LoRA, adapters, prompt tuning. 90%+ of full fine-tuning quality at 1% cost. LoRA is dominant.' },
      { name: 'Catastrophic Forgetting (Advanced)', detail: 'Fine-tuning can destroy pretrained knowledge. Mitigations: lower learning rate, mixed data, PEFT methods, general benchmark evaluation.' },
    ],
  },
  'LoRA, QLoRA & PEFT Techniques': {
    intro: 'The breakthrough that democratized fine-tuning. Fine-tune 70B models on a single GPU.',
    subtopics: [
      { name: 'LoRA Mechanics (Beginner)', detail: 'Decompose weight updates into two small matrices. 128x fewer trainable parameters. Original weights stay frozen.' },
      { name: 'QLoRA (Intermediate)', detail: 'Quantize base model to 4-bit, apply LoRA in full precision. Reduces memory from 40GB to 6GB for 7B models.' },
      { name: 'Rank & Target Selection (Intermediate)', detail: 'Rank r=8 to r=32 for most tasks. Target attention projections first, then MLPs. Experiment to find optimal configuration.' },
      { name: 'Adapter Merging (Advanced)', detail: 'Merge adapters back into base weights for zero inference overhead. Swap adapters dynamically for multi-task serving.' },
    ],
  },
  'Dataset Curation & Preprocessing for Fine-tuning': {
    intro: 'Data quality matters more than quantity, model size, or hyperparameters. 1,000 curated examples can match 52,000 low-quality ones.',
    subtopics: [
      { name: 'Instruction Formats (Beginner)', detail: 'Alpaca, ShareGPT, chat templates. Wrong format silently degrades performance. Match the base model\'s expected format exactly.' },
      { name: 'Quality Filtering (Intermediate)', detail: 'Remove duplicates, filter low-quality examples, validate formatting. Quality always beats quantity in fine-tuning.' },
      { name: 'Synthetic Data (Intermediate)', detail: 'Use stronger models to generate training data. Self-Instruct and Evol-Instruct techniques. Bounded by the teacher model\'s quality.' },
      { name: 'Decontamination (Advanced)', detail: 'If training data contains benchmark tests, evaluations are meaningless. Always check against known benchmarks before fine-tuning.' },
    ],
  },
  'Evaluation & Benchmarking Fine-tuned Models': {
    intro: 'Training loss going down does not mean the model got better for your use case. Rigorous evaluation separates production from hobby projects.',
    subtopics: [
      { name: 'Task-Specific Evaluation (Beginner)', detail: 'Held-out test set of 50-200 examples representing real queries. Measure metrics that matter for YOUR business.' },
      { name: 'LLM-as-Judge (Intermediate)', detail: 'Stronger model evaluates outputs against rubrics. Faster than human eval but requires calibration against your own assessment.' },
      { name: 'Regression Testing (Intermediate)', detail: 'Fine-tuning can improve your task while degrading general capabilities. Test on general benchmarks to catch capability loss.' },
      { name: 'A/B Testing (Advanced)', detail: 'Deploy to small user percentage and measure real business metrics. Catches issues offline evaluation misses.' },
    ],
  },
  'TTS & ASR (Speech AI)': {
    intro: 'ASR converts speech to text, TTS converts text to speech. Together they enable voice AI.',
    subtopics: [
      { name: 'ASR with Whisper (Beginner)', detail: 'Multilingual, noise-robust, open-source. Whisper-large for quality, Whisper-tiny for speed.' },
      { name: 'Modern TTS (Intermediate)', detail: 'ElevenLabs leads quality. Bark is open-source. Key: latency for real-time, voice consistency, cost per character.' },
      { name: 'Real-time Pipelines (Advanced)', detail: 'Sub-500ms end-to-end latency requires streaming ASR, streaming LLM, and streaming TTS. Each component must stream, not batch.' },
    ],
  },
  'Image Generation': {
    intro: 'Diffusion models create images from text by iteratively removing noise guided by text prompts.',
    subtopics: [
      { name: 'Diffusion Process (Beginner)', detail: 'Add noise gradually, then learn to reverse the process. Stable Diffusion operates in compressed latent space for efficiency.' },
      { name: 'ControlNet (Intermediate)', detail: 'Adds precise spatial control: edge maps, depth maps, pose maps. Turns generation from random creativity to controllable design.' },
      { name: 'Production (Advanced)', detail: 'Content moderation, prompt engineering for images, batch pipelines, and cost management for visual AI applications.' },
    ],
  },
  'Audio/Music Generation': {
    intro: 'Creating music and audio from text descriptions using neural tokenization and language modeling.',
    subtopics: [
      { name: 'Audio Tokenization (Beginner)', detail: 'EnCodec compresses audio into discrete tokens, enabling language-model-style generation for sound.' },
      { name: 'Music Models (Intermediate)', detail: 'MusicGen generates from text prompts. Key challenges: temporal coherence, genre control, copyright avoidance.' },
    ],
  },
  'Video Generation': {
    intro: 'Creating coherent moving images from text. The frontier of generative AI.',
    subtopics: [
      { name: 'Temporal Consistency (Beginner)', detail: 'Maintaining visual coherence across frames. Current models achieve impressive short clips but struggle with long-form content.' },
      { name: 'Architecture (Intermediate)', detail: 'Sora treats videos as spacetime patches. All approaches face the quality vs length vs compute tradeoff.' },
    ],
  },
  'Multimodal AI': {
    intro: 'Processing text, images, audio, and video in unified systems. The future of AI products.',
    subtopics: [
      { name: 'Vision-Language Models (Beginner)', detail: 'GPT-4V, Claude Vision, Gemini understand images alongside text. Visual and textual information aligned in the same embedding space.' },
      { name: 'Multimodal RAG (Intermediate)', detail: 'RAG for mixed documents: OCR, chart-to-data, visual embeddings, combined text-image retrieval. Critical for enterprise document AI.' },
      { name: 'Cross-Modal Understanding (Advanced)', detail: 'True understanding of relationships between modalities. Detecting contradictions between visual and textual information is an active research area.' },
    ],
  },
  'AI Agent Frameworks': {
    intro: 'Scaffolding for building AI systems that reason, plan, and act autonomously.',
    subtopics: [
      { name: 'Framework Landscape (Beginner)', detail: 'LangGraph (flexible graphs), CrewAI (role-based teams), AutoGen (conversations). Choice depends on complexity and team familiarity.' },
      { name: 'Agent Loop (Intermediate)', detail: 'Perceive, Reason, Act, Observe, Repeat. Every framework implements this differently.' },
      { name: 'When NOT to Use Agents (Advanced)', detail: 'Agents add complexity and cost. If a single prompt or chain works, do not use an agent.' },
    ],
  },
  'Goal Decomposition': {
    intro: 'Breaking complex tasks into manageable subtasks for reliable execution.',
    subtopics: [
      { name: 'Strategies (Beginner)', detail: 'Top-down (recursive breakdown), bottom-up (compose available actions), hybrid.' },
      { name: 'Dependency Graphs (Intermediate)', detail: 'DAGs enable parallel execution of independent subtasks while respecting ordering.' },
      { name: 'Dynamic Replanning (Advanced)', detail: 'Detect when plans fail, diagnose issues, generate alternatives, and continue.' },
    ],
  },
  'Planning (ReAct / CoT / ToT)': {
    intro: 'How agents decide what to do and in what order.',
    subtopics: [
      { name: 'ReAct (Beginner)', detail: 'Thought then Action then Observation, repeat. Most practical for real-world tasks.' },
      { name: 'Chain-of-Thought (Intermediate)', detail: 'Step-by-step reasoning. Foundation for all planning. Can combine with ReAct.' },
      { name: 'Tree-of-Thought (Advanced)', detail: 'Parallel exploration of reasoning paths. More powerful but 3-5x more expensive.' },
    ],
  },
  'Tool Orchestration': {
    intro: 'Coordinating multiple tools for complex tasks.',
    subtopics: [
      { name: 'Dynamic Selection (Beginner)', detail: 'Agent chooses tools based on clear descriptions. Description quality determines selection accuracy.' },
      { name: 'Parallel Execution (Intermediate)', detail: 'Independent tools run simultaneously for lower latency. Dependency analysis identifies safe parallelism.' },
      { name: 'Error Recovery (Advanced)', detail: 'Retry, fallback, graceful degradation. Production orchestration handles all failure modes.' },
    ],
  },
  'Context Management': {
    intro: 'Fitting the right information into finite context windows.',
    subtopics: [
      { name: 'Window Strategies (Beginner)', detail: 'Sliding window, summarization, selective injection. Each trades information preservation against token budget.' },
      { name: 'Lost in the Middle (Intermediate)', detail: 'Models attend less to middle content. Place critical information at start or end.' },
      { name: 'Budget Management (Advanced)', detail: 'Allocate tokens across system prompt, context, history. Smart budgeting reduces costs 50%.' },
    ],
  },
  'Memory Systems': {
    intro: 'Enabling agents to learn from past interactions and maintain coherent behavior over time.',
    subtopics: [
      { name: 'Memory Types (Beginner)', detail: 'Short-term buffer, long-term vector store, episodic events, semantic facts. Each serves different purposes.' },
      { name: 'Retrieval (Intermediate)', detail: 'Combine recency, relevance, and importance scoring. The Generative Agents approach.' },
      { name: 'Shared Memory (Advanced)', detail: 'Multi-agent shared knowledge stores with access control and consistency guarantees.' },
    ],
  },
  'State Persistence': {
    intro: 'Surviving crashes and restarts without losing progress.',
    subtopics: [
      { name: 'Checkpointing (Beginner)', detail: 'Save complete agent state after each significant action. Redis, SQLite, or PostgreSQL backends.' },
      { name: 'State Versioning (Intermediate)', detail: 'Schema versioning and migration scripts for agent code upgrades.' },
      { name: 'Distributed State (Advanced)', detail: 'Redis Cluster for hot state, PostgreSQL for durable state, S3 for large artifacts.' },
    ],
  },
  'Human-in-the-Loop': {
    intro: 'Maintaining human control over agent decisions for high-risk actions.',
    subtopics: [
      { name: 'Approval Gates (Beginner)', detail: 'Pause at critical decisions. Risk levels determine auto-approve vs require-approval.' },
      { name: 'Confidence Escalation (Intermediate)', detail: 'Escalate to humans when agent confidence is low rather than guessing.' },
      { name: 'Timeout Handling (Advanced)', detail: 'What happens when humans do not respond. Strategy must match risk level.' },
    ],
  },
  'Self-reflection & Error Recovery': {
    intro: 'Agents evaluating their own outputs and improving through iteration.',
    subtopics: [
      { name: 'Reflexion (Beginner)', detail: 'Generate, evaluate, critique, regenerate. Improves success rates by 20-30%.' },
      { name: 'Error Classification (Intermediate)', detail: 'Different errors need different recovery: retry, reprompt, replan, or escalate.' },
      { name: 'Graceful Degradation (Advanced)', detail: 'Return partial results with clear explanation of what failed.' },
    ],
  },
  'Task Scheduling': {
    intro: 'Managing multiple concurrent tasks with priorities and dependencies.',
    subtopics: [
      { name: 'Priority Queues (Beginner)', detail: 'Urgent tasks first, background tasks fill idle time.' },
      { name: 'Dependency Resolution (Intermediate)', detail: 'Topological sorting for valid execution order. Independent tasks run in parallel.' },
      { name: 'Resource-Constrained (Advanced)', detail: 'Balance throughput against API rate limits, GPU memory, and concurrent connections.' },
    ],
  },
  'Agent Coordination': {
    intro: 'Multiple agents working together without duplication or conflicts.',
    subtopics: [
      { name: 'Supervisor Pattern (Beginner)', detail: 'Supervisor routes tasks to specialists, aggregates results, handles conflicts.' },
      { name: 'Message Passing (Intermediate)', detail: 'Structured messages for task assignments, progress updates, and results.' },
      { name: 'Conflict Resolution (Advanced)', detail: 'When agents produce conflicting conclusions: supervisor decides, debate, vote, or escalate.' },
    ],
  },
  'Multi-Agent Collaboration': {
    intro: 'Teams of specialized agents collaborating on complex tasks.',
    subtopics: [
      { name: 'Role Design (Beginner)', detail: 'Clear, non-overlapping roles: Researcher, Analyst, Writer, Critic.' },
      { name: 'Debate & Consensus (Intermediate)', detail: 'Agents challenge each other\'s conclusions. Multi-agent debate reduces hallucinations.' },
      { name: 'Testing (Advanced)', detail: 'Unit test agents individually, integration test interactions, end-to-end test full workflows.' },
    ],
  },
  'Autonomous Execution & Validation': {
    intro: 'End-to-end task completion without human intervention.',
    subtopics: [
      { name: 'Quality Gates (Beginner)', detail: 'Format validation, test execution, consistency verification. Multiple layers provide defense in depth.' },
      { name: 'Sandboxing (Intermediate)', detail: 'Isolated execution environments with resource limits. E2B provides secure agent sandboxes.' },
      { name: 'Safety Boundaries (Advanced)', detail: 'Maximum time, cost, action whitelists, and kill switches. Enforced at infrastructure level, not just prompts.' },
    ],
  },
  'Agent Protocols (MCP / A2A)': {
    intro: 'Standards for model-tool connectivity (MCP) and agent-agent communication (A2A).',
    subtopics: [
      { name: 'MCP Architecture (Beginner)', detail: 'Client-server protocol: models connect to tool servers exposing Tools, Resources, and Prompts.' },
      { name: 'A2A Protocol (Intermediate)', detail: 'Agent discovery, task delegation, message exchange, and artifact management between agents.' },
      { name: 'Protocol Interplay (Advanced)', detail: 'MCP for vertical (model-tool), A2A for horizontal (agent-agent). Both needed for production agent systems.' },
    ],
  },
  'Delegation & Handoff': {
    intro: 'Seamless task transfer between agents preserving full context.',
    subtopics: [
      { name: 'Handoff Payloads (Beginner)', detail: 'Include: original request, accumulated context, work completed, reason for handoff, constraints.' },
      { name: 'Capability Matching (Intermediate)', detail: 'Registry of agent capabilities, skills, and availability for intelligent task routing.' },
      { name: 'Escalation Chains (Advanced)', detail: 'Specialist to generalist to supervisor to human. Each level adds latency but increases capability.' },
    ],
  },
  'Intent Preservation': {
    intro: 'Ensuring agents do not drift from original user goals over multi-step workflows.',
    subtopics: [
      { name: 'Drift Detection (Beginner)', detail: 'Compare current activity against original request using embedding similarity at each checkpoint.' },
      { name: 'Alignment Verification (Intermediate)', detail: 'Explicitly verify each step contributes to the original goal.' },
      { name: 'Corrective Re-alignment (Advanced)', detail: 'Pause, summarize progress, re-read original request, generate corrective plan, resume.' },
    ],
  },
  'Feedback Loops & Evaluation': {
    intro: 'Continuous quality monitoring during and after agent execution.',
    subtopics: [
      { name: 'Online Monitoring (Beginner)', detail: 'Track success rate, steps to completion, error rate, user satisfaction in real-time.' },
      { name: 'User Feedback (Intermediate)', detail: 'Collect explicit and implicit signals. Feed back into prompt optimization and strategy selection.' },
      { name: 'A/B Testing Agents (Advanced)', detail: 'Run multiple strategies simultaneously. Statistical testing prevents premature conclusions.' },
    ],
  },
  'Observability & Tracing': {
    intro: 'Understanding exactly what happened when an agent fails.',
    subtopics: [
      { name: 'Trace Structure (Beginner)', detail: 'Track every LLM call, tool execution, and decision with full context.' },
      { name: 'Tooling (Intermediate)', detail: 'LangFuse, LangSmith, Arize Phoenix, OpenTelemetry for agent-specific observability.' },
      { name: 'Alerting (Advanced)', detail: 'Anomaly-based alerts on success rate, latency, and cost. PagerDuty integration for on-call.' },
    ],
  },
  'Cost & Resource Management': {
    intro: 'Managing LLM API costs through intelligent routing, caching, and budgets.',
    subtopics: [
      { name: 'Model Routing (Beginner)', detail: 'Simple queries to cheap models, complex to expensive. Reduces costs 60-80%.' },
      { name: 'Caching (Intermediate)', detail: 'Exact match and semantic caching eliminate redundant API calls. 30-50% hit rates achievable.' },
      { name: 'Budget Controls (Advanced)', detail: 'Per-task, per-user limits. Degrade gracefully when budgets exhausted.' },
    ],
  },
  'Rollback Mechanisms': {
    intro: 'Undoing agent actions with side effects when something goes wrong.',
    subtopics: [
      { name: 'State Snapshots (Beginner)', detail: 'Save state before destructive actions. Restore on failure.' },
      { name: 'Compensating Transactions (Intermediate)', detail: 'Define reverse actions for each forward action.' },
      { name: 'Transaction Logs (Advanced)', detail: 'Full audit trail of every action for automated rollback and compliance.' },
    ],
  },
  'Failure Recovery & Replanning': {
    intro: 'Detecting, classifying, and recovering from agent failures.',
    subtopics: [
      { name: 'Classification (Beginner)', detail: 'Transient (retry), permanent (alternative), logic (replan), capability (escalate).' },
      { name: 'Strategies (Intermediate)', detail: 'Retry with backoff, tool substitution, replanning, graceful escalation.' },
      { name: 'Circuit Breakers (Advanced)', detail: 'After N failures, mark tool unavailable and use alternatives. Periodically test recovery.' },
    ],
  },
  'Memory Governance': {
    intro: 'Privacy compliance and data management for agent memory.',
    subtopics: [
      { name: 'PII Detection (Beginner)', detail: 'Auto-scan for PII before storage. Redact or encrypt. Use regex and NER models.' },
      { name: 'Retention Policies (Intermediate)', detail: 'Define how long different memory types are kept. Automated cleanup enforcement.' },
      { name: 'Right to be Forgotten (Advanced)', detail: 'GDPR-compliant deletion across all stores. Build this capability from day one.' },
    ],
  },
  'Governance, Safety & Guardrails': {
    intro: 'Behavioral boundaries for increasingly autonomous agents.',
    subtopics: [
      { name: 'Input Validation (Beginner)', detail: 'Screen for prompt injection, malicious content, and policy violations.' },
      { name: 'Output Filtering (Intermediate)', detail: 'Check outputs for harmful content, PII, and format compliance.' },
      { name: 'Action Sandboxing (Intermediate)', detail: 'Explicit whitelists of allowed actions. Everything else denied.' },
      { name: 'Red Teaming (Advanced)', detail: 'Systematic adversarial testing. Continuous process, not one-time event.' },
    ],
  },
  'Risk Management': {
    intro: 'Quantifying and managing risk for autonomous agent actions.',
    subtopics: [
      { name: 'Risk Scoring (Beginner)', detail: 'Score based on reversibility, blast radius, and confidence. Gate actions by risk level.' },
      { name: 'Impact Assessment (Intermediate)', detail: 'Agent articulates potential consequences before high-risk actions.' },
      { name: 'Audit Trails (Advanced)', detail: 'Every decision logged with full context for compliance and incident investigation.' },
    ],
  },
  'Self-improving Agents': {
    intro: 'Agents that learn from execution traces without model retraining.',
    subtopics: [
      { name: 'Prompt Optimization (Beginner)', detail: 'DSPy automates prompt optimization based on task performance metrics.' },
      { name: 'Strategy Evolution (Intermediate)', detail: 'Learn which tools, detail levels, and approaches work best. Update configurable parameters.' },
      { name: 'Safety Constraints (Advanced)', detail: 'Self-improvement bounded: cannot modify safety constraints or expand permissions.' },
    ],
  },
  'Long-term Autonomy': {
    intro: 'Agents running for hours or days with stability and oversight.',
    subtopics: [
      { name: 'Progress Reporting (Beginner)', detail: 'Regular status updates. Users should never wonder what the agent is doing.' },
      { name: 'Resource Management (Intermediate)', detail: 'Monitor and limit API spend, tool calls, elapsed time. Checkpoints prevent data loss.' },
      { name: 'Safe Shutdown (Advanced)', detail: 'Graceful shutdown: save state, complete or rollback in-progress actions, notify stakeholders.' },
    ],
  },
  'Dynamic Tooling': {
    intro: 'Agents discovering and using new tools at runtime.',
    subtopics: [
      { name: 'Runtime Discovery (Beginner)', detail: 'MCP enables dynamic tool discovery. Agents adapt to new tools without code changes.' },
      { name: 'Capability Matching (Intermediate)', detail: 'Semantic matching between task requirements and tool descriptions.' },
      { name: 'Version Compatibility (Advanced)', detail: 'Handle tool version changes gracefully. Check versions, adapt to schema changes.' },
    ],
  },
  'Agent Marketplaces & Contracts': {
    intro: 'Agents advertising capabilities and hiring other agents.',
    subtopics: [
      { name: 'Capability Advertising (Beginner)', detail: 'Agent Cards describe: capabilities, inputs, outputs, quality guarantees, pricing.' },
      { name: 'Service Contracts (Intermediate)', detail: 'Formal agreements: quality level, latency, cost, failure handling, privacy terms.' },
      { name: 'Trust & Reputation (Advanced)', detail: 'Track performance over time. High-reputation agents get more tasks and higher prices.' },
    ],
  },
  'LLM Inference & Serving (vLLM, ONNX, TensorRT)': {
    intro: 'Serving models at scale with acceptable latency and cost.',
    subtopics: [
      { name: 'vLLM & PagedAttention (Beginner)', detail: 'PagedAttention eliminates memory waste. Increases throughput 2-4x. Continuous batching maximizes GPU utilization.' },
      { name: 'Quantization (Intermediate)', detail: 'INT8/INT4 reduces memory 2-4x with minimal quality loss. GPTQ and AWQ are standard methods.' },
      { name: 'Batching Strategies (Advanced)', detail: 'Continuous batching dynamically adds requests. Combined with PagedAttention, 10-20x throughput improvement.' },
    ],
  },
  'Vector DB Deep Dive (HNSW, IVF, Hybrid Search)': {
    intro: 'The backbone of RAG and semantic search.',
    subtopics: [
      { name: 'HNSW (Beginner)', detail: 'Multi-layer graph for fast nearest neighbor search. Parameters M and ef control recall vs speed. Default choice for most use cases.' },
      { name: 'IVF Index (Intermediate)', detail: 'Partitions vectors into clusters. Faster for very large datasets (100M+). Requires index training.' },
      { name: 'Hybrid Search (Advanced)', detail: 'Combine dense semantic vectors with sparse keyword vectors. Reciprocal Rank Fusion merges results.' },
    ],
  },
  'LLM Evaluation Pipelines (Offline, Human, A/B)': {
    intro: 'Continuous evaluation preventing silent quality degradation.',
    subtopics: [
      { name: 'Offline Eval (Beginner)', detail: 'Automated test suites in CI/CD. Every PR must pass eval before merging.' },
      { name: 'LLM-as-Judge (Intermediate)', detail: 'Stronger model evaluates outputs. Track scores over time for drift detection.' },
      { name: 'Production A/B (Advanced)', detail: 'Deploy variants to user segments. Statistical testing ensures decisions are not based on noise.' },
    ],
  },
  'Data Engineering for AI (ETL, Dataset Versioning)': {
    intro: 'Clean, versioned, reproducible data pipelines for AI.',
    subtopics: [
      { name: 'ETL for ML (Beginner)', detail: 'Extract, Transform, Load with ML-specific concerns: missing data, temporal leakage, distribution preservation.' },
      { name: 'Dataset Versioning (Intermediate)', detail: 'DVC tracks data alongside code. Every experiment reproducible. Combined with MLflow for full audit trails.' },
      { name: 'Data Quality (Advanced)', detail: 'Automated checks for schema drift, distribution drift, anomalies. Great Expectations provides declarative rules.' },
    ],
  },
  'AI System Design for LLM Products': {
    intro: 'End-to-end system design balancing latency, cost, quality, and reliability.',
    subtopics: [
      { name: 'Architecture Patterns (Beginner)', detail: 'API gateway, model router, LLM inference, output validation, cache, monitoring. Each layer has design decisions.' },
      { name: 'Caching Strategies (Intermediate)', detail: 'Exact match, semantic, and result caching. Well-implemented semantic cache reduces costs 30-50%.' },
      { name: 'Latency Budgets (Advanced)', detail: 'Allocate time across components. Streaming responses hide LLM latency for better perceived performance.' },
    ],
  },
  'Deployment & DevOps for AI Workloads': {
    intro: 'GPU management, model versioning, and specialized scaling.',
    subtopics: [
      { name: 'Deployment Strategies (Beginner)', detail: 'Blue-green (instant rollback), canary (gradual traffic shift), shadow (compare without serving).' },
      { name: 'GPU Management (Intermediate)', detail: 'Model sharding, quantization, batching optimization. Right-sizing and auto-scaling for cost management.' },
      { name: 'Managed vs Self-Hosted (Advanced)', detail: 'SageMaker/Vertex for lower volume. Self-hosted K8s for scale. Break-even around 100K daily requests.' },
    ],
  },
  'Security in AI Systems (Prompt Injection, Data Leakage)': {
    intro: 'Unique attack surfaces beyond traditional application security.',
    subtopics: [
      { name: 'Prompt Injection (Beginner)', detail: 'Direct and indirect injection. Defense: input sanitization, instruction hierarchy, output validation.' },
      { name: 'Data Leakage (Intermediate)', detail: 'Models can be tricked into revealing training data or system prompts. Never put secrets in prompts.' },
      { name: 'OWASP LLM Top 10 (Advanced)', detail: 'Ten major vulnerability categories for LLM applications. Essential for security-conscious AI engineering.' },
    ],
  },
  'Cost Optimization for LLM Systems': {
    intro: 'Systematic optimization reducing LLM spending 60-90%.',
    subtopics: [
      { name: 'Optimization Stack (Beginner)', detail: 'Prompt optimization, semantic caching, model routing, batch processing, self-hosting. Each layer compounds.' },
      { name: 'Model Routing (Intermediate)', detail: 'Classifier routes queries to appropriate model tier. Negligible cost for massive savings.' },
      { name: 'Cost Attribution (Advanced)', detail: 'Track per-feature, per-user, per-model costs. 20% of features drive 80% of costs.' },
    ],
  },
  'Agent Packaging & Containerization': {
    intro: 'Shipping agents to production with Docker.',
    subtopics: [
      { name: 'Docker for AI (Beginner)', detail: 'Multi-stage builds reduce image size 80%. Pin dependency versions exactly.' },
      { name: 'GPU Support (Intermediate)', detail: 'NVIDIA Container Toolkit for GPU passthrough. CUDA version compatibility is critical.' },
      { name: 'Secret Management (Advanced)', detail: 'Never bake secrets into images. Use runtime injection via Vault or cloud secret managers.' },
    ],
  },
  'Agent API Design & Gateway Patterns': {
    intro: 'APIs supporting streaming, long-running tasks, and real-time updates.',
    subtopics: [
      { name: 'Protocol Selection (Beginner)', detail: 'REST for sync, SSE for streaming LLM output, WebSocket for interactive sessions.' },
      { name: 'API Gateway (Intermediate)', detail: 'Auth, rate limiting, routing, load balancing, logging. Kong or Traefik.' },
      { name: 'Versioning (Advanced)', detail: 'Agent version = code + prompts + model + tools. Maintain backward compatibility.' },
    ],
  },
  'Agent State Management in Production': {
    intro: 'Distributed state that is consistent, recoverable, and performant.',
    subtopics: [
      { name: 'Storage Backends (Beginner)', detail: 'Redis for hot state, PostgreSQL for durable state, S3 for large artifacts.' },
      { name: 'Consistency (Intermediate)', detail: 'CAP theorem tradeoffs. Prefer availability for reads, consistency for writes.' },
      { name: 'State Debugging (Advanced)', detail: 'Inspect state at any point in time. View history, diff checkpoints, manually edit for testing.' },
    ],
  },
  'Agent Scaling — Horizontal, Vertical & Serverless': {
    intro: 'Scaling to thousands of concurrent users.',
    subtopics: [
      { name: 'Horizontal (Beginner)', detail: 'Multiple instances behind load balancer. Requires stateless design. K8s HPA automates scaling.' },
      { name: 'GPU Scaling (Intermediate)', detail: 'Vertical scaling, GPU sharing, multi-GPU inference. Spot instances for batch workloads.' },
      { name: 'Serverless (Advanced)', detail: 'Lambda for bursty API-based agents. Zero idle cost but cold starts and no GPU access.' },
    ],
  },
  'Agent Monitoring, Logging & Alerting': {
    intro: 'Infrastructure health AND AI-specific quality metrics.',
    subtopics: [
      { name: 'AI Metrics (Beginner)', detail: 'Success rate, steps to completion, error rate, cost per conversation, quality scores.' },
      { name: 'Structured Logging (Intermediate)', detail: 'JSON format with consistent fields. Enable searching, aggregation, and debugging dashboards.' },
      { name: 'SLO-Based Alerting (Advanced)', detail: 'Alert when error budget consumed too quickly, not on every threshold violation.' },
    ],
  },
  'Agent Versioning, Rollouts & Canary Deployments': {
    intro: 'Safely deploying new agent versions.',
    subtopics: [
      { name: 'Version Management (Beginner)', detail: 'Code + prompt + model + tools versioned together. Semantic versioning.' },
      { name: 'Canary (Intermediate)', detail: '5% traffic to new version, compare metrics, auto-promote or auto-rollback.' },
      { name: 'Feature Flags (Advanced)', detail: 'Enable/disable capabilities without deploying code. Separate deployment from release.' },
    ],
  },
  'Multi-Agent System Deployment Architectures': {
    intro: 'Service mesh, discovery, and inter-agent security.',
    subtopics: [
      { name: 'Service Mesh (Beginner)', detail: 'Istio handles mTLS, load balancing, circuit breaking between agents.' },
      { name: 'Agent Registry (Intermediate)', detail: 'Dynamic discovery of available agents with capabilities and health status.' },
      { name: 'Deployment Topologies (Advanced)', detail: 'Centralized vs distributed vs hybrid. Depends on latency, data locality, and fault tolerance.' },
    ],
  },
  'Agent Reliability Engineering (SLOs, Chaos Testing)': {
    intro: 'SRE principles for AI agents.',
    subtopics: [
      { name: 'Agent SLOs (Beginner)', detail: 'Measurable reliability targets. Error budgets balance reliability with feature velocity.' },
      { name: 'Chaos Testing (Intermediate)', detail: 'Kill pods, inject latency, corrupt responses. Verify detection, handling, and recovery.' },
      { name: 'Incident Response (Advanced)', detail: 'Detect, triage, mitigate, resolve, review. Runbooks for known failure scenarios.' },
    ],
  },
  'Linux Fundamentals & Shell Scripting': {
    intro: 'Every server runs Linux. Shell scripting automates operations.',
    subtopics: [
      { name: 'File System & Permissions (Beginner)', detail: 'Everything is a file. Permissions: owner, group, others. chmod, chown.' },
      { name: 'Process Management (Intermediate)', detail: 'ps, top, kill. systemd manages services. journalctl reads logs. cron schedules tasks.' },
      { name: 'Bash Scripting (Intermediate)', detail: 'Variables, conditionals, loops, pipes, redirects. set -euo pipefail for safety.' },
      { name: 'Networking (Advanced)', detail: 'curl, netstat, iptables, dig. Understanding TCP/IP essential for debugging connectivity.' },
    ],
  },
  'Git Advanced (Branching Strategies, Monorepos, Hooks)': {
    intro: 'Team-scale version control practices.',
    subtopics: [
      { name: 'Branching (Beginner)', detail: 'Git Flow for release cycles, Trunk-Based for CI/CD. Most modern teams prefer trunk-based.' },
      { name: 'Pre-commit Hooks (Intermediate)', detail: 'Automated linting, formatting, type checking, secret scanning before every commit.' },
      { name: 'Monorepo (Advanced)', detail: 'Nx/Turborepo for shared code, incremental builds, unified CI/CD across projects.' },
    ],
  },
  'Docker Deep Dive (Multi-stage, Compose, Layer Caching)': {
    intro: 'The standard for packaging applications.',
    subtopics: [
      { name: 'Multi-Stage Builds (Beginner)', detail: 'Separate build and runtime stages. Reduces image size 80%.' },
      { name: 'Layer Caching (Intermediate)', detail: 'Order instructions by change frequency. Copy package files before source code.' },
      { name: 'Compose (Intermediate)', detail: 'Multi-service apps in YAML: app + db + Redis + worker.' },
      { name: 'Security (Advanced)', detail: 'Non-root user, vulnerability scanning, minimal base images, no secrets in images.' },
    ],
  },
  'Kubernetes (Pods, Deployments, Services, Ingress)': {
    intro: 'The operating system for cloud-native applications.',
    subtopics: [
      { name: 'Core Objects (Beginner)', detail: 'Pod, Deployment, Service, Ingress. These four cover 80% of K8s usage.' },
      { name: 'Configuration (Intermediate)', detail: 'ConfigMaps, Secrets, Volumes. Environment-specific configuration management.' },
      { name: 'Scaling & Resources (Intermediate)', detail: 'Resource requests/limits, HPA auto-scaling. Getting these right prevents waste and outages.' },
      { name: 'Health Checks (Advanced)', detail: 'Liveness, readiness, startup probes. Essential for ML models with slow startup.' },
    ],
  },
  'Helm, Kustomize & K8s Package Management': {
    intro: 'Managing K8s configs across environments.',
    subtopics: [
      { name: 'Helm Charts (Beginner)', detail: 'Package manager for K8s. Configurable values files per environment.' },
      { name: 'Kustomize (Intermediate)', detail: 'Overlay-based patching without templates. Simpler for environment overrides.' },
      { name: 'Multi-Environment (Advanced)', detail: 'Base chart + per-environment values. Secrets managed separately with External Secrets.' },
    ],
  },
  'CI/CD Pipelines (GitHub Actions, GitLab CI, ArgoCD)': {
    intro: 'Automating code to production.',
    subtopics: [
      { name: 'Pipeline Design (Beginner)', detail: 'CI: lint, test, scan on every PR. CD: build, push, deploy on merge. Total under 15 minutes.' },
      { name: 'GitHub Actions (Intermediate)', detail: 'Matrix builds, reusable workflows, caching, environment protection rules.' },
      { name: 'GitOps (Advanced)', detail: 'ArgoCD syncs K8s cluster to git state. Git history is deployment history. Rollback = git revert.' },
    ],
  },
  'Infrastructure as Code (Terraform, Pulumi)': {
    intro: 'Version-controlled infrastructure.',
    subtopics: [
      { name: 'Terraform Basics (Beginner)', detail: 'Declarative infrastructure in HCL. Plan, then apply. More reliable than console clicking.' },
      { name: 'State Management (Intermediate)', detail: 'Remote backends with locking. State is source of truth about infrastructure.' },
      { name: 'Modules (Advanced)', detail: 'Reusable, versioned infrastructure components. Share proven configs across teams.' },
    ],
  },
  'Cloud Platforms (AWS / GCP / Azure Core Services)': {
    intro: 'Core 20% of services covering 80% of use cases.',
    subtopics: [
      { name: 'Compute (Beginner)', detail: 'EC2/GCE for VMs, Lambda for serverless, ECS/Cloud Run for containers.' },
      { name: 'Storage & Databases (Intermediate)', detail: 'S3 for objects, RDS for relational, DynamoDB for NoSQL, ElastiCache for Redis.' },
      { name: 'Networking & IAM (Advanced)', detail: 'VPC with public/private subnets. Security groups. IAM least privilege.' },
    ],
  },
  'Networking & Security (VPC, IAM, TLS, Secrets Mgmt)': {
    intro: 'Protecting AI systems from unauthorized access.',
    subtopics: [
      { name: 'Network Architecture (Beginner)', detail: 'Public subnets for load balancers only. Private subnets for everything else.' },
      { name: 'IAM (Intermediate)', detail: 'Least privilege. Roles not keys. MFA for humans. Regular permission audits.' },
      { name: 'TLS & Secrets (Intermediate)', detail: 'Encrypt all traffic. Use Vault or cloud secret managers. Never store secrets in code.' },
      { name: 'WAF (Advanced)', detail: 'Filter malicious requests. Add rules for prompt injection patterns in AI APIs.' },
    ],
  },
  'Monitoring & Observability (Prometheus, Grafana, OTel)': {
    intro: 'Understanding system internals from the outside.',
    subtopics: [
      { name: 'Metrics (Beginner)', detail: 'Prometheus scrapes metrics. PromQL queries. Grafana visualizes. Deploy before first production release.' },
      { name: 'Distributed Tracing (Intermediate)', detail: 'OpenTelemetry tracks requests through distributed systems. Jaeger or Tempo for visualization.' },
      { name: 'SLO-Based Alerting (Advanced)', detail: 'Alert on error budget burn rate, not individual threshold violations. Reduces alert fatigue.' },
    ],
  },
  'Serverless & Edge Computing (Lambda, CloudFront, Vercel)': {
    intro: 'Code without servers.',
    subtopics: [
      { name: 'Lambda (Beginner)', detail: 'Write function, deploy. AWS handles scaling. Cold starts are main limitation.' },
      { name: 'Edge Functions (Intermediate)', detail: 'Run code at CDN edge locations for sub-50ms global latency.' },
      { name: 'Event-Driven (Advanced)', detail: 'S3 triggers Lambda triggers DynamoDB triggers notification. Highly scalable, harder to debug.' },
    ],
  },
  'Site Reliability Engineering (SLOs, Incident Response, Runbooks)': {
    intro: 'The discipline that keeps production reliable.',
    subtopics: [
      { name: 'SLO Framework (Beginner)', detail: 'SLI (measurement), SLO (target), Error Budget (allowed failure). Turns reliability into quantitative engineering.' },
      { name: 'Incident Response (Intermediate)', detail: 'Detect, triage, mitigate, communicate, resolve, review. Practice with game days.' },
      { name: 'Postmortems & Runbooks (Intermediate)', detail: 'Blameless analysis with action items. Step-by-step procedures for known incidents.' },
      { name: 'Toil Reduction (Advanced)', detail: 'Automate repetitive manual work. Goal: max 50% toil, 50% engineering improvement.' },
    ],
  },
}
