import React from 'react';
import { CourseData, Role, LifecycleStatus } from '../types/syllabus';
import { 
  FileCheck2, 
  ShieldCheck, 
  SlidersHorizontal, 
  Download, 
  Layers,
  ChevronDown,
  Building2
} from 'lucide-react';

interface HeaderProps {
  courses: CourseData[];
  currentCourse: CourseData;
  onSelectCourse: (courseId: string) => void;
  activeRole: Role;
  onSelectRole: (role: Role) => void;
  activeStep: string;
  onSelectStep: (step: string) => void;
  isInspectorOpen: boolean;
  onToggleInspector: () => void;
  auditIssuesCount: number;
  onQuickRunAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  courses,
  currentCourse,
  onSelectCourse,
  activeRole,
  onSelectRole,
  activeStep,
  onSelectStep,
  isInspectorOpen,
  onToggleInspector,
  auditIssuesCount,
  onQuickRunAudit
}) => {
  // Pill badge styling per design spec
  const getStatusBadge = (status: LifecycleStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#F0FDF4] border border-[#BBF7D0] text-[#198856]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#198856]" />
            Approved
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            In Review
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#F1F5F9] border border-[#E2E8F0] text-[#6C778D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C778D]" />
            Draft
          </span>
        );
    }
  };

  return (
    <header className="h-14 w-full bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 flex items-center justify-between fixed top-0 left-0 z-30 select-none">
      {/* Zone 1: Brand & Institution */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#4378c1] flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#0F172A] tracking-tight leading-tight">
              Academic Document Precision
            </div>
            <div className="text-[10px] text-[#6C778D] font-mono leading-tight">
              OBE Compliance & Outcome Certification
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#E2E8F0] mx-1 hidden sm:block" />

        {/* Course Switcher Selector */}
        <div className="relative flex items-center">
          <select
            value={currentCourse.id}
            onChange={(e) => onSelectCourse(e.target.value)}
            className="text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded px-2.5 py-1 pr-7 focus:outline-none focus:ring-1 focus:ring-[#4378c1] cursor-pointer appearance-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.title.length > 28 ? c.title.substring(0, 28) + '...' : c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#6C778D] absolute right-2 pointer-events-none" />
        </div>

        {/* Course Status Pill */}
        <div className="hidden md:block">
          {getStatusBadge(currentCourse.status)}
        </div>
      </div>

      {/* Zone 2: Role Switcher Chips (Dynamic Role Switcher Pill exceptions per spec) */}
      <div className="hidden lg:flex items-center gap-1.5 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full text-xs">
        {(['Author', 'Reviewer', 'HOD'] as Role[]).map((role) => {
          const isActive = activeRole === role;
          return (
            <button
              key={role}
              onClick={() => onSelectRole(role)}
              className={`px-3 py-1 rounded-full font-medium transition-all text-xs whitespace-nowrap ${
                isActive
                  ? 'bg-[#4378c1] text-white shadow-xs'
                  : 'text-[#334155] hover:text-[#0F172A] hover:bg-[#FFFFFF]'
              }`}
            >
              {role === 'Author' && 'Author (Faculty)'}
              {role === 'Reviewer' && 'Reviewer (BOS)'}
              {role === 'HOD' && 'HOD / Dean'}
            </button>
          );
        })}
      </div>

      {/* Zone 3: Quick Action Buttons & Inspector Drawer Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Quick run audit button */}
        <button
          onClick={onQuickRunAudit}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#334155] bg-[#FFFFFF] border border-[#CBD5E1] rounded hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
          title="Verify syllabus against NBA/ABET compliance rules"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#587f6b]" />
          <span>Audit Engine</span>
        </button>

        {/* Export / Dossier Link */}
        <button
          onClick={() => onSelectStep('export')}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            activeStep === 'export'
              ? 'bg-[#36619e] text-white'
              : 'text-[#334155] bg-[#FFFFFF] border border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Dossier</span>
        </button>

        {/* Inspector / Audit Drawer Toggle */}
        <button
          onClick={onToggleInspector}
          className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors ${
            isInspectorOpen
              ? 'bg-[#F1F5F9] text-[#4378c1] border border-[#CBD5E1]'
              : 'text-[#334155] bg-[#FFFFFF] border border-[#CBD5E1] hover:bg-[#F8FAFC]'
          }`}
          aria-label="Toggle audit inspector drawer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#4378c1]" />
          <span className="hidden md:inline">Inspector</span>
          {auditIssuesCount > 0 && (
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#D97706] text-white text-[10px] font-mono font-bold leading-none">
              {auditIssuesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
