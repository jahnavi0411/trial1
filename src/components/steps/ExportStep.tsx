import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileCheck2, 
  Building2, 
  Stamp, 
  ShieldCheck, 
  BookOpen,
  Code
} from 'lucide-react';
import { CourseData, AuditCheckResult } from '../../types/syllabus';
import { PROGRAM_OUTCOMES, PROGRAM_SPECIFIC_OUTCOMES, BLOOM_LEVELS } from '../../data/accreditationStandards';

interface ExportStepProps {
  course: CourseData;
  auditResults: {
    overallScore: number;
    checks: AuditCheckResult[];
    hotsPercentage: number;
    averageCorrelation: number;
    unmappedPOs: string[];
  };
}

export const ExportStep: React.FC<ExportStepProps> = ({
  course,
  auditResults
}) => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [viewMode, setViewMode] = useState<'sheet' | 'json'>('sheet');

  const allTargets = [
    ...PROGRAM_OUTCOMES.map(p => ({ id: p.id, code: p.code, title: p.title, isPSO: false })),
    ...PROGRAM_SPECIFIC_OUTCOMES.map(p => ({ id: p.id, code: p.code, title: p.title, isPSO: true }))
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    const exportPayload = {
      courseMetadata: {
        code: course.code,
        title: course.title,
        department: course.department,
        regulation: course.regulation,
        academicYear: course.academicYear,
        standard: course.standard,
        status: course.status
      },
      credits: course.credits,
      prerequisites: course.prerequisites,
      objectives: course.objectives,
      outcomes: course.outcomes,
      outcomeMatrix: course.matrix,
      matrixJustifications: course.matrixJustifications,
      complianceAudit: {
        overallScore: auditResults.overallScore,
        hotsPercentage: auditResults.hotsPercentage,
        averageCorrelation: auditResults.averageCorrelation,
        unmappedPOs: auditResults.unmappedPOs
      },
      signoffs: course.workflow,
      exportedAt: new Date().toISOString()
    };

    navigator.clipboard.writeText(JSON.stringify(exportPayload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    const exportPayload = {
      course,
      auditResults,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.code}_Accredited_Syllabus_Dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
            Stage 06 · Official Accredited Dossier
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Accreditation Report & Print-Ready Syllabus Sheet
          </h1>
          <p className="text-xs text-[#334155] mt-1 leading-relaxed">
            Standardized institutional syllabus format ready for submission to NBA / ABET peer evaluation teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex p-0.5 bg-[#F1F5F9] rounded border border-[#CBD5E1] text-xs">
            <button
              onClick={() => setViewMode('sheet')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'sheet'
                  ? 'bg-white text-[#0F172A] font-semibold shadow-2xs'
                  : 'text-[#6C778D] hover:text-[#0F172A]'
              }`}
            >
              Document Sheet
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'json'
                  ? 'bg-white text-[#0F172A] font-semibold shadow-2xs'
                  : 'text-[#6C778D] hover:text-[#0F172A]'
              }`}
            >
              JSON Schema
            </button>
          </div>

          <button
            onClick={handleCopyJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#334155] bg-white border border-[#CBD5E1] rounded hover:bg-[#F8FAFC]"
            title="Copy full JSON"
          >
            {copiedJson ? <Check className="w-3.5 h-3.5 text-[#198856]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#334155] bg-white border border-[#CBD5E1] rounded hover:bg-[#F8FAFC]"
            title="Download JSON File"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* JSON RAW VIEW */}
      {viewMode === 'json' && (
        <div className="p-4 bg-[#FFFFFF] border border-[#CBD5E1] rounded-[8px] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#6C778D]">
            <span>Canonical OBE Syllabus Schema (JSON-LD compatible)</span>
            <span>{course.code}.json</span>
          </div>
          <pre className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded font-mono text-xs text-[#0F172A] overflow-x-auto max-h-[600px] leading-relaxed">
            {JSON.stringify({
              code: course.code,
              title: course.title,
              standard: course.standard,
              credits: course.credits,
              prerequisites: course.prerequisites,
              objectives: course.objectives,
              outcomes: course.outcomes,
              matrix: course.matrix,
              complianceScore: auditResults.overallScore,
              workflow: course.workflow
            }, null, 2)}
          </pre>
        </div>
      )}

      {/* PRINT-READY SYLLABUS SHEET VIEW */}
      {viewMode === 'sheet' && (
        <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-[8px] p-8 md:p-12 shadow-sm space-y-8 text-[#0F172A]">
          {/* Institutional Header */}
          <div className="border-b-2 border-[#0F172A] pb-6 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#4378c1]" />
                <span className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">
                  Autonomous Institute of Technology & Engineering
                </span>
              </div>
              <p className="text-xs text-[#334155] font-medium">
                Department of {course.department} · Board of Studies
              </p>
              <div className="text-[11px] text-[#6C778D] font-mono">
                Academic Regulation: {course.regulation} · Academic Year: {course.academicYear}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold border border-[#0F172A] rounded uppercase">
                {course.standard} OBE Compliant
              </span>
              <div className="text-[10px] text-[#6C778D] font-mono mt-1">
                Status: {course.status}
              </div>
            </div>
          </div>

          {/* Course Title Banner */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono font-bold text-xs text-[#215ca3] bg-[#E8EEFF] px-2 py-0.5 rounded">
                {course.code}
              </span>
              <h2 className="text-lg font-bold text-[#0F172A] mt-1">
                {course.title}
              </h2>
              <span className="text-xs text-[#334155]">
                Category: <strong>{course.courseCategory}</strong>
              </span>
            </div>

            {/* Credit Table (L-T-P-C) */}
            <div className="border border-[#CBD5E1] rounded overflow-hidden text-xs text-center">
              <div className="grid grid-cols-4 bg-[#F1F5F9] font-mono font-bold border-b border-[#CBD5E1] py-1 px-3">
                <span>L</span>
                <span>T</span>
                <span>P</span>
                <span className="text-[#215ca3]">C</span>
              </div>
              <div className="grid grid-cols-4 font-mono font-bold py-1 px-3 bg-white">
                <span>{course.credits.lectureHours}</span>
                <span>{course.credits.tutorialHours}</span>
                <span>{course.credits.practicalHours}</span>
                <span className="text-[#215ca3]">{course.credits.totalCredits}</span>
              </div>
            </div>
          </div>

          {/* Prerequisites & Overview */}
          <div className="space-y-3 text-xs">
            <div>
              <h3 className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px] border-b border-[#E2E8F0] pb-1 mb-1.5">
                Prerequisite Courses:
              </h3>
              <p className="font-mono text-[#334155]">
                {course.prerequisites.length > 0 ? course.prerequisites.join('; ') : 'Nil'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px] border-b border-[#E2E8F0] pb-1 mb-1.5">
                Course Description:
              </h3>
              <p className="text-[#334155] leading-relaxed">
                {course.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px] border-b border-[#E2E8F0] pb-1 mb-1.5">
                Course Objectives:
              </h3>
              <ul className="list-decimal pl-5 space-y-1 text-[#334155] leading-relaxed">
                {course.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Outcomes Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px] border-b border-[#E2E8F0] pb-1">
              Course Outcomes (CO) & Cognitive Taxonomies
            </h3>
            <table className="w-full border-collapse border border-[#CBD5E1] text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#CBD5E1] text-left">
                  <th className="p-2 border-r border-[#CBD5E1] w-14 font-mono">CO #</th>
                  <th className="p-2 border-r border-[#CBD5E1]">Measurable Statement</th>
                  <th className="p-2 border-r border-[#CBD5E1] w-28 text-center font-mono">Bloom Level</th>
                  <th className="p-2 w-20 text-center font-mono">Hours</th>
                </tr>
              </thead>
              <tbody>
                {course.outcomes.map((co) => (
                  <tr key={co.id} className="border-b border-[#E2E8F0]">
                    <td className="p-2 border-r border-[#CBD5E1] font-mono font-bold text-[#215ca3]">
                      {co.id}
                    </td>
                    <td className="p-2 border-r border-[#CBD5E1] text-[#334155] leading-snug">
                      {co.statement}
                    </td>
                    <td className="p-2 border-r border-[#CBD5E1] text-center font-mono text-[11px] font-semibold text-[#0F172A]">
                      {co.bloomLevel}
                    </td>
                    <td className="p-2 text-center font-mono text-[#0F172A]">
                      {co.contactHours} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formal CO-PO-PSO Matrix */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#0F172A] uppercase tracking-wide text-[11px] border-b border-[#E2E8F0] pb-1">
              Course Outcome — Program Outcome Articulation Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#CBD5E1] text-xs text-center font-mono">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#CBD5E1]">
                    <th className="p-1.5 border-r border-[#CBD5E1] text-left w-16">CO</th>
                    {allTargets.map(t => (
                      <th
                        key={t.id}
                        className={`p-1.5 border-r border-[#CBD5E1] text-[11px] ${
                          t.id === 'PO12' ? 'border-r-2 border-[#CBD5E1]' : ''
                        }`}
                      >
                        {t.code}
                      </th>
                    ))}
                    <th className="p-1.5 font-bold">Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {course.outcomes.map(co => {
                    let rowSum = 0;
                    allTargets.forEach(t => {
                      rowSum += course.matrix[`${co.id}_${t.id}`] || 0;
                    });
                    const rowAvg = (rowSum / allTargets.length).toFixed(1);

                    return (
                      <tr key={co.id} className="border-b border-[#E2E8F0]">
                        <td className="p-1.5 border-r border-[#CBD5E1] text-left font-bold text-[#215ca3]">
                          {co.id}
                        </td>
                        {allTargets.map(t => {
                          const w = course.matrix[`${co.id}_${t.id}`] || 0;
                          return (
                            <td
                              key={t.id}
                              className={`p-1.5 border-r border-[#CBD5E1] ${
                                w === 3 ? 'font-bold text-[#215ca3]' : w === 0 ? 'text-[#6C778D]' : 'text-[#334155]'
                              } ${t.id === 'PO12' ? 'border-r-2 border-[#CBD5E1]' : ''}`}
                            >
                              {w === 0 ? '-' : w}
                            </td>
                          );
                        })}
                        <td className="p-1.5 font-bold text-[#0F172A]">{rowAvg}</td>
                      </tr>
                    );
                  })}

                  {/* Summary Average */}
                  <tr className="bg-[#F1F5F9] font-bold border-t-2 border-[#CBD5E1]">
                    <td className="p-1.5 border-r border-[#CBD5E1] text-left">Mean</td>
                    {allTargets.map(t => {
                      let colSum = 0;
                      course.outcomes.forEach(co => {
                        colSum += course.matrix[`${co.id}_${t.id}`] || 0;
                      });
                      const colAvg = course.outcomes.length > 0 ? (colSum / course.outcomes.length).toFixed(1) : '-';
                      return (
                        <td
                          key={t.id}
                          className={`p-1.5 border-r border-[#CBD5E1] ${
                            t.id === 'PO12' ? 'border-r-2 border-[#CBD5E1]' : ''
                          }`}
                        >
                          {colAvg}
                        </td>
                      );
                    })}
                    <td className="p-1.5 text-[#215ca3]">{auditResults.averageCorrelation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[10px] text-[#6C778D] font-mono mt-1">
              Correlation Levels: 1 - Slight (Low), 2 - Moderate (Medium), 3 - Substantial (High), - No correlation
            </div>
          </div>

          {/* Institutional Sign-off & Seal Block */}
          <div className="pt-6 border-t-2 border-[#0F172A] space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">
              Board of Studies Endorsement & Dean Certification
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {course.workflow.map((stage) => (
                <div key={stage.stageId} className="border border-[#CBD5E1] rounded p-4 text-xs space-y-2 bg-[#F8FAFC]">
                  <div className="font-semibold text-[#0F172A] border-b border-[#E2E8F0] pb-1">
                    {stage.stageName}
                  </div>
                  <div className="text-[11px] text-[#334155]">
                    {stage.assigneeName}
                  </div>
                  {stage.status === 'signed' ? (
                    <div className="pt-2 text-[10px] space-y-1">
                      <div className="text-[#198856] font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Certified & Sealed
                      </div>
                      <div className="font-mono text-[#6C778D] truncate">
                        {stage.signatureHash}
                      </div>
                      <div className="text-[#6C778D] font-mono">
                        Date: {stage.signedAt}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 text-[#6C778D] text-[11px] italic">
                      [Signature Pending]
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stamp Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-[10px] text-[#6C778D] font-mono">
              <span>Verified under OBE ISO 9001:2024 Audit Guidelines</span>
              <span>Document Verification ID: DOC-{course.code}-{course.standard}-2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
