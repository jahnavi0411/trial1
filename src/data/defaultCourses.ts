import { CourseData } from '../types/syllabus';

export const INITIAL_COURSES: CourseData[] = [
  {
    id: 'cs304',
    code: 'CS304',
    title: 'Distributed Systems & Cloud Infrastructure',
    department: 'Computer Science and Engineering',
    regulation: 'R-2024 (Autonomous)',
    academicYear: '2026-2027',
    standard: 'NBA',
    status: 'In Review',
    credits: {
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 2,
      totalCredits: 4,
      totalContactHours: 60
    },
    prerequisites: ['CS201 Data Structures & Algorithms', 'CS204 Operating Systems'],
    courseCategory: 'Professional Core',
    description: 'Comprehensive study of fundamental principles, architectural abstractions, and design trade-offs in modern distributed computing. Covers synchronous and asynchronous network models, logical clocks, state machine replication, consensus algorithms (Raft, Paxos), distributed key-value storage, eventual consistency vs linearizability, microservices patterns, serverless runtimes, container orchestration with Kubernetes, and high-availability cloud deployment architectures.',
    objectives: [
      'Understand core foundational abstractions of concurrent and distributed message-passing environments.',
      'Analyze consensus protocols, fault tolerance invariants, and replication models under partial failure conditions.',
      'Design, implement, and benchmark scalable containerized microservices and cloud deployment topologies.',
      'Evaluate consistency-latency trade-offs (CAP theorem, PACELC theorem) across enterprise distributed databases.'
    ],
    outcomes: [
      {
        id: 'CO1',
        statement: 'Analyze foundational distributed execution models, logical clocks (Lamport & Vector), and distributed snapshot algorithms under asynchronous networks.',
        bloomLevel: 'L4-Analyze',
        contactHours: 12
      },
      {
        id: 'CO2',
        statement: 'Evaluate consensus protocols (Paxos, Raft) and quorum-based state machine replication invariants under network partitions and Byzantine faults.',
        bloomLevel: 'L5-Evaluate',
        contactHours: 12
      },
      {
        id: 'CO3',
        statement: 'Design distributed data stores utilizing consistent hashing, conflict-free replicated data types (CRDTs), and tunable eventual consistency semantics.',
        bloomLevel: 'L6-Create',
        contactHours: 12
      },
      {
        id: 'CO4',
        statement: 'Apply container orchestration, gRPC service mesh, and distributed tracing tools to diagnose latency bottlenecks in microservice fleets.',
        bloomLevel: 'L3-Apply',
        contactHours: 8
      },
      {
        id: 'CO5',
        statement: 'Formulate fault injection and chaos engineering experiments to verify cluster recovery and disaster failover in multi-region cloud tiers.',
        bloomLevel: 'L6-Create',
        contactHours: 8
      },
      {
        id: 'CO6',
        statement: 'Assess ethical, data sovereignty, and energy efficiency implications in hyper-scale cloud data center architectures.',
        bloomLevel: 'L5-Evaluate',
        contactHours: 8
      }
    ],
    matrix: {
      // CO1
      'CO1_PO1': 3,
      'CO1_PO2': 3,
      'CO1_PO3': 2,
      'CO1_PO4': 2,
      'CO1_PO5': 1,
      'CO1_PO6': 0,
      'CO1_PO7': 0,
      'CO1_PO8': 0,
      'CO1_PO9': 1,
      'CO1_PO10': 0,
      'CO1_PO11': 0,
      'CO1_PO12': 2,
      'CO1_PSO1': 3,
      'CO1_PSO2': 2,
      'CO1_PSO3': 1,

      // CO2
      'CO2_PO1': 3,
      'CO2_PO2': 3,
      'CO2_PO3': 3,
      'CO2_PO4': 3,
      'CO2_PO5': 2,
      'CO2_PO6': 0,
      'CO2_PO7': 0,
      'CO2_PO8': 1,
      'CO2_PO9': 1,
      'CO2_PO10': 1,
      'CO2_PO11': 1,
      'CO2_PO12': 2,
      'CO2_PSO1': 3,
      'CO2_PSO2': 3,
      'CO2_PSO3': 2,

      // CO3
      'CO3_PO1': 3,
      'CO3_PO2': 3,
      'CO3_PO3': 3,
      'CO3_PO4': 2,
      'CO3_PO5': 3,
      'CO3_PO6': 0,
      'CO3_PO7': 0,
      'CO3_PO8': 0,
      'CO3_PO9': 2,
      'CO3_PO10': 1,
      'CO3_PO11': 2,
      'CO3_PO12': 3,
      'CO3_PSO1': 3,
      'CO3_PSO2': 3,
      'CO3_PSO3': 2,

      // CO4
      'CO4_PO1': 2,
      'CO4_PO2': 2,
      'CO4_PO3': 3,
      'CO4_PO4': 2,
      'CO4_PO5': 3,
      'CO4_PO6': 1,
      'CO4_PO7': 1,
      'CO4_PO8': 0,
      'CO4_PO9': 2,
      'CO4_PO10': 2,
      'CO4_PO11': 2,
      'CO4_PO12': 2,
      'CO4_PSO1': 3,
      'CO4_PSO2': 2,
      'CO4_PSO3': 1,

      // CO5
      'CO5_PO1': 2,
      'CO5_PO2': 3,
      'CO5_PO3': 3,
      'CO5_PO4': 3,
      'CO5_PO5': 3,
      'CO5_PO6': 1,
      'CO5_PO7': 1,
      'CO5_PO8': 1,
      'CO5_PO9': 2,
      'CO5_PO10': 2,
      'CO5_PO11': 2,
      'CO5_PO12': 2,
      'CO5_PSO1': 3,
      'CO5_PSO2': 2,
      'CO5_PSO3': 3,

      // CO6
      'CO6_PO1': 1,
      'CO6_PO2': 2,
      'CO6_PO3': 1,
      'CO6_PO4': 1,
      'CO6_PO5': 1,
      'CO6_PO6': 3,
      'CO6_PO7': 3,
      'CO6_PO8': 3,
      'CO6_PO9': 2,
      'CO6_PO10': 2,
      'CO6_PO11': 1,
      'CO6_PO12': 2,
      'CO6_PSO1': 2,
      'CO6_PSO2': 1,
      'CO6_PSO3': 3,
    },
    matrixJustifications: {
      'CO1_PO1': 'Students synthesize discrete math, partial ordering theory, and OS concurrency fundamentals.',
      'CO2_PO3': 'Formulates replicated state machine solutions that meet strict safety, liveness, and fault-tolerance specs.',
      'CO3_PSO1': 'Directly targets resilient system architecture using industrial data-store primitives and consistent hashing.',
      'CO4_PO5': 'Employs cutting-edge telemetry, Prometheus, Jaeger, Kubernetes, and eBPF instrumentation.',
      'CO6_PO7': 'Calculates carbon footprint and PUE (Power Usage Effectiveness) metrics of hyperscale cloud facilities.'
    },
    workflow: [
      {
        stageId: 'author',
        stageName: 'Course Coordinator Draft & Submission',
        assignedRole: 'Author',
        assigneeName: 'Prof. Arthur Vance, Ph.D. (Lead Curriculum Designer)',
        status: 'signed',
        signedAt: '2026-10-14 09:42 UTC',
        signatureHash: 'SIG-SHA256:7f4a9b2c01d4e83f556b1a92ce',
        remarks: 'Aligned with NBA Tier-1 OBE model. Bloom taxonomy distributions revised to ensure 80% HOTS (L3-L6).'
      },
      {
        stageId: 'reviewer',
        stageName: 'Board of Studies (BOS) Peer Audit',
        assignedRole: 'Reviewer',
        assigneeName: 'Dr. Maya Chen (BOS External Academic Auditor)',
        status: 'in_progress',
        remarks: 'Outcome matrix verified. Recommendation: Verify PO7 sustainability evidence in Module 5.'
      },
      {
        stageId: 'hod',
        stageName: 'Head of Department / Dean Certification',
        assignedRole: 'HOD',
        assigneeName: 'Prof. Eleanor Davies, FIE (Head of Department & Academic Dean)',
        status: 'pending'
      }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Dr. Maya Chen',
        role: 'Reviewer',
        timestamp: '2026-10-18 14:15 UTC',
        section: 'CO-PO Matrix (CO6 to PO7)',
        text: 'The correlation between CO6 and PO7 (Environment and Sustainability) is weighted at 3. Ensure the lab assignments include quantifiable PUE power-metering calculations.',
        resolved: true
      },
      {
        id: 'c2',
        author: 'Prof. Arthur Vance',
        role: 'Author',
        timestamp: '2026-10-19 10:30 UTC',
        section: 'CO-PO Matrix (CO6 to PO7)',
        text: 'Updated Module 5 syllabus notes to explicitly mandate server idle wattage profiling and cloud carbon footprint telemetry experiments in Lab 9.',
        resolved: true
      },
      {
        id: 'c3',
        author: 'Dr. Maya Chen',
        role: 'Reviewer',
        timestamp: '2026-10-22 16:45 UTC',
        section: 'Course Specification',
        text: 'Please confirm that CS204 Operating Systems is formally marked as an enforced prerequisite in the ERP registration catalogue.',
        resolved: false
      }
    ],
    lastModified: '2026-10-25 11:20 UTC'
  },
  {
    id: 'ai402',
    code: 'AI402',
    title: 'Natural Language Processing & Large Language Models',
    department: 'Artificial Intelligence & Data Science',
    regulation: 'R-2024 (Autonomous)',
    academicYear: '2026-2027',
    standard: 'ABET',
    status: 'Draft',
    credits: {
      lectureHours: 3,
      tutorialHours: 0,
      practicalHours: 2,
      totalCredits: 4,
      totalContactHours: 60
    },
    prerequisites: ['AI301 Machine Learning Fundamentals', 'MA202 Probability & Linear Algebra'],
    courseCategory: 'Professional Core',
    description: 'Advanced investigation of statistical language modeling, attention mechanisms, Transformer architectures, self-supervised pre-training, parameter-efficient fine-tuning (LoRA, QLoRA), reinforcement learning from human feedback (RLHF), hallucination mitigation, retrieval-augmented generation (RAG), and ethical alignment in frontier foundation models.',
    objectives: [
      'Master the mathematical formulation of self-attention, positional embeddings, and multi-head Transformer layers.',
      'Implement and evaluate tokenizers, byte-pair encodings, and autoregressive decoding strategies.',
      'Fine-tune open-weights generative models using quantized low-rank adaptations on GPU clusters.',
      'Analyze safety guardrails, prompt injection vulnerabilities, and algorithmic bias in generative text systems.'
    ],
    outcomes: [
      {
        id: 'CO1',
        statement: 'Formulate vector semantics, contextual embeddings, and attention matrices using linear algebraic primitives.',
        bloomLevel: 'L4-Analyze',
        contactHours: 12
      },
      {
        id: 'CO2',
        statement: 'Design decoder-only autoregressive language model architectures with KV-cache and RoPE embeddings.',
        bloomLevel: 'L6-Create',
        contactHours: 14
      },
      {
        id: 'CO3',
        statement: 'Evaluate quantization techniques (FP8, INT4 AWQ) and parameter-efficient adapters under strict GPU VRAM limits.',
        bloomLevel: 'L5-Evaluate',
        contactHours: 10
      },
      {
        id: 'CO4',
        statement: 'Implement RAG pipelines utilizing dense vector indexing, reranking, and semantic guardrail enforcement.',
        bloomLevel: 'L3-Apply',
        contactHours: 12
      },
      {
        id: 'CO5',
        statement: 'Audit LLM outputs for toxicity, hallucinations, stereotyping bias, and copyright risks using empirical red-teaming benchmarks.',
        bloomLevel: 'L5-Evaluate',
        contactHours: 12
      }
    ],
    matrix: {
      'CO1_PO1': 3, 'CO1_PO2': 3, 'CO1_PO3': 2, 'CO1_PO4': 3, 'CO1_PO5': 2, 'CO1_PO6': 0, 'CO1_PO7': 0, 'CO1_PO8': 0, 'CO1_PO9': 1, 'CO1_PO10': 0, 'CO1_PO11': 0, 'CO1_PO12': 2, 'CO1_PSO1': 2, 'CO1_PSO2': 3, 'CO1_PSO3': 1,
      'CO2_PO1': 3, 'CO2_PO2': 3, 'CO2_PO3': 3, 'CO2_PO4': 3, 'CO2_PO5': 3, 'CO2_PO6': 0, 'CO2_PO7': 0, 'CO2_PO8': 1, 'CO2_PO9': 2, 'CO2_PO10': 1, 'CO2_PO11': 1, 'CO2_PO12': 3, 'CO2_PSO1': 2, 'CO2_PSO2': 3, 'CO2_PSO3': 2,
      'CO3_PO1': 3, 'CO3_PO2': 3, 'CO3_PO3': 3, 'CO3_PO4': 3, 'CO3_PO5': 3, 'CO3_PO6': 1, 'CO3_PO7': 2, 'CO3_PO8': 0, 'CO3_PO9': 1, 'CO3_PO10': 1, 'CO3_PO11': 1, 'CO3_PO12': 2, 'CO3_PSO1': 3, 'CO3_PSO2': 3, 'CO3_PSO3': 1,
      'CO4_PO1': 2, 'CO4_PO2': 3, 'CO4_PO3': 3, 'CO4_PO4': 2, 'CO4_PO5': 3, 'CO4_PO6': 1, 'CO4_PO7': 0, 'CO4_PO8': 1, 'CO4_PO9': 2, 'CO4_PO10': 2, 'CO4_PO11': 2, 'CO4_PO12': 3, 'CO4_PSO1': 3, 'CO4_PSO2': 3, 'CO4_PSO3': 2,
      'CO5_PO1': 1, 'CO5_PO2': 2, 'CO5_PO3': 2, 'CO5_PO4': 3, 'CO5_PO5': 2, 'CO5_PO6': 3, 'CO5_PO7': 1, 'CO5_PO8': 3, 'CO5_PO9': 2, 'CO5_PO10': 3, 'CO5_PO11': 1, 'CO5_PO12': 3, 'CO5_PSO1': 2, 'CO5_PSO2': 2, 'CO5_PSO3': 3,
    },
    workflow: [
      {
        stageId: 'author',
        stageName: 'Course Coordinator Draft & Submission',
        assignedRole: 'Author',
        assigneeName: 'Dr. Sanjay Ramesh, Ph.D. (Associate Professor)',
        status: 'in_progress',
        remarks: 'Initial outcomes drafted. Evaluating prerequisite chain alignment.'
      },
      {
        stageId: 'reviewer',
        stageName: 'Board of Studies (BOS) Peer Audit',
        assignedRole: 'Reviewer',
        assigneeName: 'Prof. Karen Lindqvist (BOS Evaluator)',
        status: 'pending'
      },
      {
        stageId: 'hod',
        stageName: 'Head of Department / Dean Certification',
        assignedRole: 'HOD',
        assigneeName: 'Prof. Eleanor Davies, FIE (Head of Department & Academic Dean)',
        status: 'pending'
      }
    ],
    comments: [],
    lastModified: '2026-10-28 08:15 UTC'
  }
];
