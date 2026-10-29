import React, { useState } from 'react';
import { 
  CourseData, 
  CorrelationWeight, 
  ProgramOutcome, 
  ProgramSpecificOutcome 
} from '../../types/syllabus';
import { 
  PROGRAM_OUTCOMES, 
  PROGRAM_SPECIFIC_OUTCOMES 
} from '../../data/accreditationStandards';
import { 
  ArrowRight, 
  Info, 
  Check, 
  Sparkles, 
  HelpCircle, 
  RotateCcw,
  Sliders,
  Table,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface MatrixStepProps {
  course: CourseData;
  onUpdateCourse: (updater: (prev: CourseData) => CourseData) => void;
  onNextStep: () => void;
  onSelectPOInGuide?: (poId: string) => void;
}

export const MatrixStep: React.FC<MatrixStepProps> = ({
  course,
  onUpdateCourse,
  onNextStep,
  onSelectPOInGuide
}) => {
  const [activeCellKey, setActiveCellKey] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [justificationEditorKey, setJustificationEditorKey] = useState<string | null>(null);
  const [justificationText, setJustificationText] = useState('');

  // Combined targets: PO1 to PO12 + PSO1 to PSO3
  const allTargets: { id: string; code: string; title: string; isPSO: boolean }[] = [
    ...PROGRAM_OUTCOMES.map(p => ({ id: p.id, code: p.code, title: p.title, isPSO: false })),
    ...PROGRAM_SPECIFIC_OUTCOMES.map(p => ({ id: p.id, code: p.code, title: p.title, isPSO: true }))
  ];

  // Cycle weight on click: 0 -> 1 -> 2 -> 3 -> 0
  const handleCellClick = (coId: string, targetId: string) => {
    const key = `${coId}_${targetId}`;
    setActiveCellKey(key);

    const currentWeight = course.matrix[key] || 0;
    const nextWeight = ((currentWeight + 1) % 4) as CorrelationWeight;

    onUpdateCourse(prev => ({
      ...prev,
      matrix: {
        ...prev.matrix,
        [key]: nextWeight
      }
    }));
  };

  // Set explicit weight
  const handleSetExplicitWeight = (coId: string, targetId: string, weight: CorrelationWeight) => {
    const key = `${coId}_${targetId}`;
    setActiveCellKey(key);
    onUpdateCourse(prev => ({
      ...prev,
      matrix: {
        ...prev.matrix,
        [key]: weight
      }
    }));
  };

  // Open justification editor
  const handleOpenJustification = (key: string) => {
    setJustificationEditorKey(key);
    setJustificationText(course.matrixJustifications?.[key] || '');
  };

  const handleSaveJustification = () => {
    if (!justificationEditorKey) return;
    onUpdateCourse(prev => ({
      ...prev,
      matrixJustifications: {
        ...prev.matrixJustifications,
        [justificationEditorKey]: justificationText
      }
    }));
    setJustificationEditorKey(null);
  };

  // Auto-balance correlations (sets high correlations for foundational outcomes)
  const handleAutoAlignSuggestions = () => {
    const nextMatrix = { ...course.matrix };
    course.outcomes.forEach((co, idx) => {
      // Engineering Knowledge PO1 & Problem Analysis PO2
      nextMatrix[`${co.id}_PO1`] = 3;
      nextMatrix[`${co.id}_PO2`] = 3;
      // Design PO3 for middle & upper COs
      if (idx >= 1) nextMatrix[`${co.id}_PO3`] = 3;
      // Modern tools PO5
      if (idx === 2 || idx === 3) nextMatrix[`${co.id}_PO5`] = 3;
      // Ethics PO8 and Lifelong learning PO12
      nextMatrix[`${co.id}_PO12`] = 2;
      // PSO1 and PSO2
      nextMatrix[`${co.id}_PSO1`] = 3;
      nextMatrix[`${co.id}_PSO2`] = 2;
    });

    onUpdateCourse(prev => ({
      ...prev,
      matrix: nextMatrix
    }));
  };

  // Column Averages (PO1 to PO12, PSO1 to PSO3)
  const columnStats = allTargets.map(t => {
    let sum = 0;
    let nonZeroCount = 0;
    course.outcomes.forEach(co => {
      const w = course.matrix[`${co.id}_${t.id}`] || 0;
      sum += w;
      if (w > 0) nonZeroCount++;
    });
    const avg = course.outcomes.length > 0 ? (sum / course.outcomes.length).toFixed(2) : '0.00';
    return {
      id: t.id,
      sum,
      nonZeroCount,
      avg: Number(avg)
    };
  });

  // Active cell info for context helper
  const activeCoId = activeCellKey ? activeCellKey.split('_')[0] : null;
  const activeTargetId = activeCellKey ? activeCellKey.split('_')[1] : null;
  const activeCO = course.outcomes.find(c => c.id === activeCoId);
  const activeTarget = allTargets.find(t => t.id === activeTargetId);
  const activeWeight = activeCellKey ? (course.matrix[activeCellKey] || 0) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
            Stage 03 · Outcome Alignment Matrix
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            CO-PO-PSO Articulation & Correlation Matrix
          </h1>
          <p className="text-xs text-[#334155] mt-1 leading-relaxed">
            Directly map each Course Outcome to NBA/Washington Accord Graduate Attributes (PO1–PO12) and Program Specific Outcomes (PSO1–PSO3).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoAlignSuggestions}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#215ca3] bg-[#E8EEFF] hover:bg-[#dfe8ff] rounded border border-[#CBD5E1] transition-colors"
            title="Auto-fill recommended correlations based on Bloom HOTS levels"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Recommended Weights</span>
          </button>

          <button
            onClick={onNextStep}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
          >
            <span>Proceed to Compliance Checks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Matrix Legend & Interactive Guide */}
      <div className="p-3 bg-[#FFFFFF] border border-[#E2E8F0] rounded-[6px] flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#0F172A] uppercase text-[11px] tracking-wide">
            Correlation Key:
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#6C778D] font-mono">
              <strong>-</strong> (0: None)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155] font-mono">
              <strong>1</strong> (Low / Slight)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8EEFF] border border-[#CBD5E1] text-[#215ca3] font-mono font-bold">
              <strong>2</strong> (Moderate)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#215ca3] text-white font-mono font-bold">
              <strong>3</strong> (Substantial / High)
            </span>
          </div>
        </div>

        <div className="text-[11px] text-[#6C778D]">
          💡 Click any cell to cycle weights (0 → 1 → 2 → 3 → 0). Active cells display the deep green inset ring.
        </div>
      </div>

      {/* MATRIX CANVAS CONTAINER (Wide table with sticky column headers and sticky row headers) */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto max-h-[640px]">
          <table className="w-full border-collapse text-xs select-none">
            <thead>
              {/* Top grouping row: PO1-PO12 vs PSO1-PSO3 */}
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="sticky left-0 z-20 bg-[#F8FAFC] border-r border-[#E2E8F0] px-4 py-2 text-left font-semibold text-[#0F172A] w-64 min-w-[240px]">
                  Course Outcomes (CO)
                </th>
                <th className="sticky left-64 z-20 bg-[#F8FAFC] border-r border-[#E2E8F0] px-2 py-2 text-center font-mono text-[11px] text-[#6C778D] w-20">
                  Bloom
                </th>
                <th
                  colSpan={12}
                  className="border-r-2 border-[#CBD5E1] px-2 py-1.5 text-center font-bold text-[11px] text-[#0F172A] tracking-wider uppercase bg-[#F1F5F9]"
                >
                  Program Outcomes (Graduate Attributes: PO1 – PO12)
                </th>
                <th
                  colSpan={3}
                  className="px-2 py-1.5 text-center font-bold text-[11px] text-[#215ca3] tracking-wider uppercase bg-[#E8EEFF]/60 border-r border-[#E2E8F0]"
                >
                  Program Specific Outcomes (PSO1 – PSO3)
                </th>
                <th className="px-3 py-1.5 text-center font-bold text-[11px] text-[#0F172A] uppercase bg-[#F1F5F9]">
                  Avg
                </th>
              </tr>

              {/* Column codes PO1..PO12 and PSO1..PSO3 */}
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="sticky left-0 z-20 bg-[#F8FAFC] border-r border-[#E2E8F0] px-4 py-2 text-[11px] uppercase tracking-wider text-[#6C778D] text-left">
                  Outcome Statement
                </th>
                <th className="sticky left-64 z-20 bg-[#F8FAFC] border-r border-[#E2E8F0] px-2 py-2 text-[10px] uppercase tracking-wider text-[#6C778D] text-center">
                  Level
                </th>
                {allTargets.map((target, idx) => {
                  const isHoveredCol = hoveredCol === target.id;
                  const isPsoDivider = target.id === 'PO12';

                  return (
                    <th
                      key={target.id}
                      onMouseEnter={() => setHoveredCol(target.id)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`w-12 min-w-[48px] max-w-[48px] h-10 px-1 py-2 text-center font-mono font-bold text-xs cursor-pointer transition-colors border-b border-[#E2E8F0] ${
                        target.isPSO ? 'bg-[#E8EEFF]/40 text-[#215ca3]' : 'text-[#0F172A]'
                      } ${isHoveredCol ? 'bg-[#CBD5E1]/40' : ''} ${
                        isPsoDivider ? 'border-r-2 border-[#CBD5E1]' : 'border-r border-[#E2E8F0]'
                      }`}
                      title={`${target.code}: ${target.title}`}
                    >
                      {target.code}
                    </th>
                  );
                })}
                <th className="w-14 px-2 py-2 text-center font-mono font-bold text-xs text-[#0F172A]">
                  CO-Avg
                </th>
              </tr>
            </thead>

            <tbody>
              {course.outcomes.map((co) => {
                const isHoveredThisRow = hoveredRow === co.id;

                // Compute row average
                let rowSum = 0;
                let rowNonZero = 0;
                allTargets.forEach(t => {
                  const w = course.matrix[`${co.id}_${t.id}`] || 0;
                  rowSum += w;
                  if (w > 0) rowNonZero++;
                });
                const rowAvg = (rowSum / allTargets.length).toFixed(2);

                return (
                  <tr
                    key={co.id}
                    onMouseEnter={() => setHoveredRow(co.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-[#E2E8F0] transition-colors ${
                      isHoveredThisRow ? 'bg-[#F8FAFC]' : 'bg-[#FFFFFF]'
                    }`}
                  >
                    {/* Sticky CO Identification & Statement */}
                    <td
                      className={`sticky left-0 z-10 border-r border-[#E2E8F0] px-4 py-2.5 transition-colors ${
                        isHoveredThisRow ? 'bg-[#F1F5F9]' : 'bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-bold text-xs bg-[#215ca3] text-white px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                          {co.id}
                        </span>
                        <p className="text-[11px] text-[#334155] leading-snug line-clamp-2" title={co.statement}>
                          {co.statement}
                        </p>
                      </div>
                    </td>

                    {/* Sticky Bloom Level */}
                    <td
                      className={`sticky left-64 z-10 border-r border-[#E2E8F0] px-2 py-2 text-center font-mono text-[11px] font-semibold text-[#4378c1] transition-colors ${
                        isHoveredThisRow ? 'bg-[#F1F5F9]' : 'bg-[#FFFFFF]'
                      }`}
                    >
                      {co.bloomLevel.split('-')[0]}
                    </td>

                    {/* Matrix Cells: Exactly 48x48px fixed per design spec */}
                    {allTargets.map((target) => {
                      const cellKey = `${co.id}_${target.id}`;
                      const weight = course.matrix[cellKey] || 0;
                      const isActiveCell = activeCellKey === cellKey;
                      const isHoveredCol = hoveredCol === target.id;
                      const isPsoDivider = target.id === 'PO12';
                      const hasJustification = Boolean(course.matrixJustifications?.[cellKey]);

                      // Cell background styling based on weight
                      let cellContent = '-';
                      let cellClass = 'text-[#6C778D] font-normal';
                      if (weight === 1) {
                        cellContent = '1';
                        cellClass = 'bg-[#F1F5F9] text-[#334155] font-semibold';
                      } else if (weight === 2) {
                        cellContent = '2';
                        cellClass = 'bg-[#E8EEFF] text-[#215ca3] font-bold';
                      } else if (weight === 3) {
                        cellContent = '3';
                        cellClass = 'bg-[#215ca3] text-white font-bold';
                      }

                      return (
                        <td
                          key={cellKey}
                          onClick={() => handleCellClick(co.id, target.id)}
                          onMouseEnter={() => {
                            setHoveredRow(co.id);
                            setHoveredCol(target.id);
                          }}
                          className={`w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] p-0 text-center font-mono text-xs cursor-pointer transition-all border-b border-[#E2E8F0] ${
                            isPsoDivider ? 'border-r-2 border-[#CBD5E1]' : 'border-r border-[#E2E8F0]'
                          } ${
                            isHoveredThisRow || isHoveredCol ? 'bg-[#F1F5F9]/80' : ''
                          } ${
                            isActiveCell ? 'matrix-cell-active ring-inset' : ''
                          }`}
                        >
                          <div
                            className={`w-full h-full flex flex-col items-center justify-center relative transition-transform ${cellClass}`}
                            title={`${co.id} → ${target.code}: Weight ${weight} (${
                              weight === 3 ? 'Substantial' : weight === 2 ? 'Moderate' : weight === 1 ? 'Slight' : 'None'
                            })`}
                          >
                            <span className="tabular-nums text-xs leading-none">
                              {cellContent}
                            </span>
                            {hasJustification && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#198856] absolute bottom-1 right-1" title="Rationale documented" />
                            )}
                          </div>
                        </td>
                      );
                    })}

                    {/* Row Average */}
                    <td className="w-14 px-2 py-2 text-center font-mono font-semibold text-xs tabular-nums text-[#0F172A] bg-[#F8FAFC]">
                      {rowAvg}
                    </td>
                  </tr>
                );
              })}

              {/* Bottom Sticky Summary Row: Column Correlation Averages */}
              <tr className="bg-[#F1F5F9] font-semibold border-t-2 border-[#CBD5E1]">
                <td className="sticky left-0 z-10 bg-[#F1F5F9] border-r border-[#E2E8F0] px-4 py-2.5 text-xs font-bold text-[#0F172A]">
                  PO / PSO Average Correlation Index
                </td>
                <td className="sticky left-64 z-10 bg-[#F1F5F9] border-r border-[#E2E8F0] px-2 py-2 text-center text-[10px] text-[#6C778D] font-mono">
                  Mean
                </td>

                {columnStats.map((col, idx) => {
                  const target = allTargets[idx];
                  const isPsoDivider = target.id === 'PO12';
                  const isDeficient = col.avg === 0;

                  return (
                    <td
                      key={col.id}
                      className={`w-12 min-w-[48px] max-w-[48px] h-10 px-1 py-1.5 text-center font-mono text-[11px] tabular-nums ${
                        isDeficient
                          ? 'bg-[#FEF2F2] text-[#DC2626] font-bold'
                          : col.avg >= 2.0
                          ? 'text-[#215ca3] font-bold'
                          : 'text-[#334155]'
                      } ${
                        isPsoDivider ? 'border-r-2 border-[#CBD5E1]' : 'border-r border-[#E2E8F0]'
                      }`}
                      title={`${target.code} Average: ${col.avg}`}
                    >
                      {col.avg.toFixed(1)}
                    </td>
                  );
                })}

                <td className="w-14 px-2 py-2 text-center font-mono font-bold text-xs text-[#215ca3] tabular-nums">
                  {columnStats.length > 0
                    ? (columnStats.reduce((acc, c) => acc + c.avg, 0) / columnStats.length).toFixed(2)
                    : '0.00'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Cell Inspector & Fast Control Strip */}
      {activeCO && activeTarget && (
        <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#CBD5E1] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs bg-[#215ca3] text-white px-2 py-0.5 rounded">
                Active Coordinate: {activeCO.id} ↔ {activeTarget.code}
              </span>
              <span className="text-xs font-semibold text-[#0F172A]">
                {activeTarget.title}
              </span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed line-clamp-1">
              <strong>CO Statement:</strong> {activeCO.statement}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-[#334155]">Set Weight:</span>
            {[0, 1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => handleSetExplicitWeight(activeCO.id, activeTarget.id, w as CorrelationWeight)}
                className={`w-8 h-8 rounded text-xs font-mono font-bold transition-all ${
                  activeWeight === w
                    ? 'bg-[#587f6b] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]'
                }`}
              >
                {w === 0 ? '-' : w}
              </button>
            ))}

            <button
              onClick={() => handleOpenJustification(activeCellKey!)}
              className="ml-2 px-2.5 py-1.5 text-xs font-medium text-[#4378c1] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded"
            >
              Document Justification
            </button>
          </div>
        </div>
      )}

      {/* Justification Modal / Dialog */}
      {justificationEditorKey && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-[8px] border border-[#CBD5E1] shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <h3 className="text-sm font-bold text-[#0F172A]">
                Accreditation Justification Rationale ({justificationEditorKey})
              </h3>
              <button
                onClick={() => setJustificationEditorKey(null)}
                className="text-[#6C778D] hover:text-[#0F172A]"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#334155]">
              Document how the instructional activities, laboratory assignments, or assessment rubrics substantiate this correlation weight for accreditation auditors.
            </p>
            <textarea
              value={justificationText}
              onChange={(e) => setJustificationText(e.target.value)}
              rows={4}
              placeholder="e.g. In Module 3 and Lab Assignment 4, students directly implement state machine consensus, satisfying PO3 (Design of Complex Solutions)..."
              className="w-full text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded p-2.5 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4378c1]"
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setJustificationEditorKey(null)}
                className="px-3 py-1.5 text-xs text-[#334155] hover:bg-[#F8FAFC] rounded border border-[#CBD5E1]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJustification}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded"
              >
                Save Justification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
