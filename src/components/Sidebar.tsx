import React from 'react';
import { 
  UploadCloud, 
  FileText, 
  Grid3X3, 
  ShieldCheck, 
  GitPullRequest, 
  Printer,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';
import { CourseData } from '../types/syllabus';

export interface StepItem {
  id: string;
  number: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WORKFLOW_STEPS: StepItem[] = [
  {
    id: 'upload',
    number: '01',
    label: 'Upload & Import',
    sublabel: 'Accreditation framework & parse',
    icon: UploadCloud
  },
  {
    id: 'spec',
    number: '02',
    label: 'Course Specification',
    sublabel: 'L-T-P-C, Bloom COs & prereqs',
    icon: FileText
  },
  {
    id: 'matrix',
    number: '03',
    label: 'CO-PO-PSO Matrix',
    sublabel: 'Outcome correlation grid',
    icon: Grid3X3
  },
  {
    id: 'compliance',
    number: '04',
    label: 'Compliance Checks',
    sublabel: 'Automated accreditation audit',
    icon: ShieldCheck
  },
  {
    id: 'workflow',
    number: '05',
    label: 'Review & Workflow',
    sublabel: 'Sign-off trail & certification',
    icon: GitPullRequest
  },
  {
    id: 'export',
    number: '06',
    label: 'Export & Dossier',
    sublabel: 'Official accredited report',
    icon: Printer
  }
];

interface SidebarProps {
  activeStep: string;
  onSelectStep: (stepId: string) => void;
  course: CourseData;
  auditIssuesCount: number;
  auditErrorCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeStep,
  onSelectStep,
  course,
  auditIssuesCount,
  auditErrorCount
}) => {
  // Determine if a step is "completed"
  const isStepCompleted = (stepId: string) => {
    if (stepId === 'upload') return true;
    if (stepId === 'spec') return course.outcomes.length >= 4;
    if (stepId === 'matrix') {
      const keys = Object.keys(course.matrix);
      return keys.length >= 10;
    }
    if (stepId === 'compliance') return auditErrorCount === 0;
    if (stepId === 'workflow') return course.workflow.some(w => w.status === 'signed');
    if (stepId === 'export') return course.status === 'Approved';
    return false;
  };

  // Determine if a step has attention dot
  const hasStepAttention = (stepId: string) => {
    if (stepId === 'compliance' && auditIssuesCount > 0) return true;
    if (stepId === 'workflow' && course.workflow.some(w => w.status === 'in_progress')) return true;
    return false;
  };

  return (
    <aside className="w-16 lg:w-60 bg-[#FFFFFF] border-r border-[#E2E8F0] h-[calc(100vh-3.5rem)] fixed top-14 left-0 z-20 flex flex-col justify-between py-4 select-none transition-all">
      {/* Upper Stepper List */}
      <div className="px-2 space-y-1">
        {/* Section title for desktop */}
        <div className="hidden lg:block px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6C778D]">
          Curriculum Stepper
        </div>

        {WORKFLOW_STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = isStepCompleted(step.id);
          const hasAttention = hasStepAttention(step.id);
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`w-full text-left rounded-[4px] p-2 flex items-center gap-3 transition-colors relative group ${
                isActive
                  ? 'bg-[#F1F5F9] border-l-2 border-[#4378c1] text-[#4378c1]'
                  : isCompleted
                  ? 'bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9]'
                  : 'text-[#6C778D] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'text-[#215ca3] bg-[#E8EEFF]'
                    : isCompleted
                    ? 'text-[#198856] bg-[#F0FDF4]'
                    : 'text-[#6C778D] bg-[#F1F5F9]'
                }`}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle2 className="w-4 h-4 text-[#198856]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Text for desktop */}
              <div className="hidden lg:block min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isActive ? 'text-[#215ca3]' : 'text-[#0F172A]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#6C778D] ml-1">
                    {step.number}
                  </span>
                </div>
                <div className="text-[11px] text-[#6C778D] truncate">
                  {step.sublabel}
                </div>
              </div>

              {/* Attention dot */}
              {hasAttention && (
                <span
                  className="w-2 h-2 rounded-full bg-[#D97706] absolute right-2 top-1/2 -translate-y-1/2"
                  title="Requires attention / active review"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Information Card (Accreditation Badge & Regulation) */}
      <div className="px-2 pt-2 border-t border-[#E2E8F0]">
        <div className="hidden lg:block p-3 rounded-[6px] bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-[#4378c1]" />
            <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-wide">
              {course.standard} Standard
            </span>
          </div>
          <p className="text-[11px] text-[#6C778D] leading-relaxed">
            Regulation: <strong className="text-[#334155]">{course.regulation}</strong>
          </p>
          <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#6C778D]">
            <span>Course Code:</span>
            <span className="font-mono font-medium text-[#0F172A]">{course.code}</span>
          </div>
        </div>

        {/* Tablet icon fallback */}
        <div className="lg:hidden flex justify-center py-2 text-[#6C778D]">
          <BookOpen className="w-5 h-5 text-[#4378c1]" />
        </div>
      </div>
    </aside>
  );
};
