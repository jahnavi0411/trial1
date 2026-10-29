export type Role = 'Author' | 'Reviewer' | 'HOD';

export type LifecycleStatus = 'Draft' | 'In Review' | 'Approved';

export type AccreditationStandard = 'NBA' | 'ABET' | 'NAAC' | 'Washington Accord';

export type BloomLevel = 'L1-Remember' | 'L2-Understand' | 'L3-Apply' | 'L4-Analyze' | 'L5-Evaluate' | 'L6-Create';

export interface CourseOutcome {
  id: string; // CO1, CO2, etc.
  statement: string;
  bloomLevel: BloomLevel;
  contactHours: number;
}

export interface ProgramOutcome {
  id: string; // PO1 .. PO12
  code: string;
  title: string;
  description: string;
}

export interface ProgramSpecificOutcome {
  id: string; // PSO1 .. PSO3
  code: string;
  title: string;
  description: string;
}

export type CorrelationWeight = 0 | 1 | 2 | 3; // 0 = No correlation (-), 1 = Slight/Low, 2 = Moderate/Medium, 3 = Substantial/High

export interface MatrixCellData {
  coId: string;
  targetId: string; // e.g. PO1, PSO1
  weight: CorrelationWeight;
  justification?: string;
}

export interface AuditCheckResult {
  id: string;
  title: string;
  category: 'Bloom' | 'Credits' | 'Mapping' | 'Prerequisites' | 'Faculty';
  severity: 'valid' | 'warning' | 'error';
  message: string;
  details?: string;
  recommendation?: string;
  canAutoFix?: boolean;
}

export interface ReviewComment {
  id: string;
  author: string;
  role: Role;
  timestamp: string;
  section: string;
  text: string;
  resolved: boolean;
}

export interface WorkflowStageState {
  stageId: 'author' | 'reviewer' | 'hod';
  stageName: string;
  assignedRole: Role;
  assigneeName: string;
  status: 'pending' | 'in_progress' | 'signed' | 'rejected';
  signedAt?: string;
  signatureHash?: string;
  remarks?: string;
}

export interface CourseData {
  id: string;
  code: string;
  title: string;
  department: string;
  regulation: string;
  academicYear: string;
  standard: AccreditationStandard;
  status: LifecycleStatus;
  
  // Credits structure (L-T-P-C)
  credits: {
    lectureHours: number; // L
    tutorialHours: number; // T
    practicalHours: number; // P
    totalCredits: number; // C
    totalContactHours: number;
  };
  
  prerequisites: string[];
  courseCategory: 'Professional Core' | 'Professional Elective' | 'Basic Sciences' | 'Engineering Science' | 'Open Elective';
  description: string;
  objectives: string[];
  outcomes: CourseOutcome[];
  
  // Matrix mappings
  matrix: Record<string, CorrelationWeight>; // key format: `${coId}_${targetId}` -> weight
  matrixJustifications?: Record<string, string>;
  
  // Workflow & Signoffs
  workflow: WorkflowStageState[];
  comments: ReviewComment[];
  lastModified: string;
}
