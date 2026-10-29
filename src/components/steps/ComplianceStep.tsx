import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Scale, 
  BookOpen, 
  BarChart3,
  Award
} from 'lucide-react';
import { CourseData, AuditCheckResult } from '../../types/syllabus';
import { BLOOM_LEVELS } from '../../data/accreditationStandards';

interface ComplianceStepProps {
  course: CourseData;
  auditResults: {
    overallScore: number;
    checks: AuditCheckResult[];
    hotsPercentage: number;
    averageCorrelation: number;
    unmappedPOs: string[];
  };
  onAutoFixIssue: (issueId: string) => void;
  onAutoFixAll: () => void;
  onNextStep: () => void;
}

export const ComplianceStep: React.FC<ComplianceStepProps> = ({
  course,
  auditResults,
  onAutoFixIssue,
  onAutoFixAll,
  onNextStep
}) => {
  const errors = auditResults.checks.filter(c => c.severity === 'error');
  const warnings = auditResults.checks.filter(c => c.severity === 'warning');
  const valid = auditResults.checks.filter(c => c.severity === 'valid');

  // Bloom level distribution counts
  const bloomDistribution = BLOOM_LEVELS.map(levelObj => {
    const count = course.outcomes.filter(co => co.bloomLevel === levelObj.level).length;
    return {
      level: levelObj.level,
      name: levelObj.name,
      isHOTS: levelObj.isHOTS,
      count
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
            Stage 04 · Accreditation Audit Engine
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Accreditation Rules & Compliance Verification
          </h1>
          <p className="text-xs text-[#334155] mt-1 leading-relaxed">
            Automated verification against {course.standard} outcome-based criteria, Bloom taxonomy standards, and credit allocation rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(errors.length > 0 || warnings.length > 0) && (
            <button
              onClick={onAutoFixAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#587f6b] hover:bg-[#406653] rounded transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Resolve Issues</span>
            </button>
          )}

          <button
            onClick={onNextStep}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
          >
            <span>Proceed to Review Workflow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Compliance Score Hero Card */}
      <div className="p-6 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Score Dial */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6C778D] mb-1">
              Compliance Index
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-mono font-bold ${
                auditResults.overallScore >= 90
                  ? 'text-[#198856]'
                  : auditResults.overallScore >= 70
                  ? 'text-[#D97706]'
                  : 'text-[#DC2626]'
              }`}>
                {auditResults.overallScore}
              </span>
              <span className="text-xs text-[#6C778D]">/ 100</span>
            </div>
            <div className="mt-2">
              {auditResults.overallScore >= 90 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#198856]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Accreditation Ready
                </span>
              ) : auditResults.overallScore >= 70 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97706]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Minor Revisions
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#DC2626]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Blockers Present
                </span>
              )}
            </div>
          </div>

          {/* Issue Tally Grid */}
          <div className="md:col-span-3 grid grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[#F0FDF4] border border-[#BBF7D0]">
              <div className="flex items-center gap-1.5 text-[#198856] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Validated Rules</span>
              </div>
              <div className="text-xl font-mono font-bold text-[#198856] mt-1">
                {valid.length}
              </div>
              <span className="text-[11px] text-[#334155]">Checks fully certified</span>
            </div>

            <div className="p-3 rounded bg-[#FFFBEB] border border-[#FDE68A]">
              <div className="flex items-center gap-1.5 text-[#D97706] text-xs font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Warnings</span>
              </div>
              <div className="text-xl font-mono font-bold text-[#D97706] mt-1">
                {warnings.length}
              </div>
              <span className="text-[11px] text-[#334155]">Non-blocking audit advisories</span>
            </div>

            <div className="p-3 rounded bg-[#FEF2F2] border border-[#FECACA]">
              <div className="flex items-center gap-1.5 text-[#DC2626] text-xs font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>Critical Blockers</span>
              </div>
              <div className="text-xl font-mono font-bold text-[#DC2626] mt-1">
                {errors.length}
              </div>
              <span className="text-[11px] text-[#334155]">Must resolve prior to signoff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bloom Taxonomy HOTS Breakdown Card */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#4378c1]" />
            <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
              Bloom's Revised Cognitive Level Distribution
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#215ca3] font-mono">
            HOTS Ratio: {auditResults.hotsPercentage}% (Target $\ge$ 70%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex">
            <div
              style={{ width: `${100 - auditResults.hotsPercentage}%` }}
              className="bg-[#D97706] h-full"
              title="LOTS: Remembering & Understanding"
            />
            <div
              style={{ width: `${auditResults.hotsPercentage}%` }}
              className="bg-[#198856] h-full"
              title="HOTS: Applying, Analyzing, Evaluating, Creating"
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#6C778D] font-mono">
            <span>LOTS (L1–L2): {100 - auditResults.hotsPercentage}%</span>
            <span>HOTS (L3–L6): {auditResults.hotsPercentage}%</span>
          </div>
        </div>

        {/* Level pills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
          {bloomDistribution.map((b) => (
            <div
              key={b.level}
              className={`p-2.5 rounded border text-center ${
                b.count > 0
                  ? b.isHOTS
                    ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                    : 'bg-[#FFFBEB] border-[#FDE68A]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60'
              }`}
            >
              <span className="font-mono text-xs font-bold text-[#0F172A] block">
                {b.level.split('-')[0]}
              </span>
              <span className="text-[10px] text-[#6C778D] block truncate">
                {b.name}
              </span>
              <span className="text-xs font-mono font-bold text-[#215ca3] mt-1 block">
                {b.count} CO{b.count === 1 ? '' : 's'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Audit Checks */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-3 shadow-2xs">
        <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide border-b border-[#E2E8F0] pb-2">
          Accreditation Audit Rule Checklist
        </h3>

        <div className="space-y-3">
          {auditResults.checks.map((check) => {
            const isError = check.severity === 'error';
            const isWarning = check.severity === 'warning';

            return (
              <div
                key={check.id}
                className={`p-4 rounded-[6px] border text-xs transition-colors flex items-start justify-between gap-4 ${
                  isError
                    ? 'bg-[#FEF2F2] border-[#FECACA]'
                    : isWarning
                    ? 'bg-[#FFFBEB] border-[#FDE68A]'
                    : 'bg-[#F0FDF4] border-[#BBF7D0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isError ? (
                    <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#198856] shrink-0 mt-0.5" />
                  )}

                  <div>
                    <div
                      className={`font-bold ${
                        isError ? 'text-[#DC2626]' : isWarning ? 'text-[#D97706]' : 'text-[#198856]'
                      }`}
                    >
                      {check.title}
                    </div>
                    <p className="text-[#334155] mt-1 leading-relaxed">
                      {check.message}
                    </p>
                    {check.details && (
                      <p className="text-[11px] text-[#6C778D] mt-1 font-mono">
                        {check.details}
                      </p>
                    )}
                  </div>
                </div>

                {check.canAutoFix && (
                  <button
                    onClick={() => onAutoFixIssue(check.id)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#215ca3] bg-white border border-[#CBD5E1] rounded hover:bg-[#F8FAFC] shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Align</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
