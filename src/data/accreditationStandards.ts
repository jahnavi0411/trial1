import { ProgramOutcome, ProgramSpecificOutcome, BloomLevel } from '../types/syllabus';

export const PROGRAM_OUTCOMES: ProgramOutcome[] = [
  {
    id: 'PO1',
    code: 'PO1',
    title: 'Engineering Knowledge',
    description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.'
  },
  {
    id: 'PO2',
    code: 'PO2',
    title: 'Problem Analysis',
    description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.'
  },
  {
    id: 'PO3',
    code: 'PO3',
    title: 'Design/Development of Solutions',
    description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, cultural, societal, and environmental considerations.'
  },
  {
    id: 'PO4',
    code: 'PO4',
    title: 'Conduct Investigations of Complex Problems',
    description: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.'
  },
  {
    id: 'PO5',
    code: 'PO5',
    title: 'Modern Tool Usage',
    description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.'
  },
  {
    id: 'PO6',
    code: 'PO6',
    title: 'The Engineer and Society',
    description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.'
  },
  {
    id: 'PO7',
    code: 'PO7',
    title: 'Environment and Sustainability',
    description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.'
  },
  {
    id: 'PO8',
    code: 'PO8',
    title: 'Ethics',
    description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.'
  },
  {
    id: 'PO9',
    code: 'PO9',
    title: 'Individual and Team Work',
    description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.'
  },
  {
    id: 'PO10',
    code: 'PO10',
    title: 'Communication',
    description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.'
  },
  {
    id: 'PO11',
    code: 'PO11',
    title: 'Project Management and Finance',
    description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.'
  },
  {
    id: 'PO12',
    code: 'PO12',
    title: 'Life-long Learning',
    description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.'
  }
];

export const PROGRAM_SPECIFIC_OUTCOMES: ProgramSpecificOutcome[] = [
  {
    id: 'PSO1',
    code: 'PSO1',
    title: 'System Architecture & Infrastructure',
    description: 'Architect, develop, deploy, and benchmark resilient distributed systems, enterprise platforms, and cloud infrastructure using modern virtualization and orchestration frameworks.'
  },
  {
    id: 'PSO2',
    code: 'PSO2',
    title: 'Algorithmic Optimization & Data Science',
    description: 'Formulate and optimize rigorous computational algorithms, data pipelines, and machine learning models for high-throughput and data-intensive domain challenges.'
  },
  {
    id: 'PSO3',
    code: 'PSO3',
    title: 'Security, Compliance & Assurance',
    description: 'Evaluate system security postures, cryptographic invariants, and regulatory compliance standards across production networks and distributed ledgers.'
  }
];

export const BLOOM_LEVELS: { level: BloomLevel; name: string; verbs: string[]; isHOTS: boolean }[] = [
  {
    level: 'L1-Remember',
    name: 'Remembering',
    verbs: ['Define', 'Identify', 'List', 'Name', 'Recall', 'Recognize', 'State'],
    isHOTS: false
  },
  {
    level: 'L2-Understand',
    name: 'Understanding',
    verbs: ['Classify', 'Describe', 'Discuss', 'Explain', 'Identify', 'Locate', 'Recognize', 'Report', 'Review'],
    isHOTS: false
  },
  {
    level: 'L3-Apply',
    name: 'Applying',
    verbs: ['Apply', 'Choose', 'Demonstrate', 'Dramatize', 'Employ', 'Illustrate', 'Interpret', 'Operate', 'Schedule', 'Sketch', 'Solve', 'Use'],
    isHOTS: true
  },
  {
    level: 'L4-Analyze',
    name: 'Analyzing',
    verbs: ['Analyze', 'Appraise', 'Calculate', 'Categorize', 'Compare', 'Contrast', 'Criticize', 'Diagram', 'Differentiate', 'Discriminate', 'Distinguish', 'Examine', 'Experiment', 'Question', 'Test'],
    isHOTS: true
  },
  {
    level: 'L5-Evaluate',
    name: 'Evaluating',
    verbs: ['Appraise', 'Argue', 'Defend', 'Judge', 'Select', 'Support', 'Value', 'Evaluate', 'Verify'],
    isHOTS: true
  },
  {
    level: 'L6-Create',
    name: 'Creating',
    verbs: ['Assemble', 'Construct', 'Create', 'Design', 'Develop', 'Formulate', 'Write', 'Architect', 'Synthesize'],
    isHOTS: true
  }
];
