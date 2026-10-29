import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  BookMarked, 
  MessageSquare, 
  Send,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { CourseData, AuditCheckResult, ReviewComment, Role } from '../types/syllabus';
import { PROGRAM_OUTCOMES, PROGRAM_SPECIFIC_OUTCOMES } from '../data/accreditationStandards';

interface InspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  auditResults: {
    overallScore: number;
    checks: AuditCheckResult[];
    hotsPercentage: number;
    averageCorrelation: number;
    unmappedPOs: string[];
  };
  course: CourseData;
  activeRole: Role;
  onAddComment: (comment: Omit<ReviewComment, 'id' | 'timestamp' | 'resolved'>) => void;
  onToggleResolveComment: (commentId: string) => void;
  onAutoFixIssue: (issueId: string) => void;
}

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  isOpen,
  onClose,
  auditResults,
  course,
  activeRole,
  onAddComment,
  onToggleResolveComment,
  onAutoFixIssue
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'guide' | 'comments'>('audit');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentSection, setNewCommentSection] = useState('CO-PO Matrix');
  const [selectedPO, setSelectedPO] = useState<string>('PO1');

  if (!isOpen) return null;

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    let authorName = 'Prof. Arthur Vance (Author)';
    if (activeRole === 'Reviewer') authorName = 'Dr. Maya Chen (Reviewer)';
    if (activeRole === 'HOD') authorName = 'Prof. Eleanor Davies (HOD)';

    onAddComment({
      author: authorName,
      role: activeRole,
      section: newCommentSection,
      text: newCommentText.trim()
    });
    setNewCommentText('');
  };

  const currentPoDetails = PROGRAM_OUTCOMES.find(p => p.id === selectedPO) || 
    PROGRAM_SPECIFIC_OUTCOMES.find(p => p.id === selectedPO);

  return (
    <aside className="w-80 md:w-88 bg-[#FFFFFF] border-l border-[#E2E8F0] h-[calc(100vh-3.5rem)] fixed top-14 right-0 z-20 flex flex-col shadow-xs transition-all">
      {/* Drawer Header */}
      <div className="h-12 border-b border-[#E2E8F0] px-4 flex items-center justify-between bg-[#F8FAFC]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
            Inspector & Audit Engine
          </span>
          <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#E8EEFF] text-[#215ca3]">
            Score {auditResults.overallScore}/100
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-[#6C778D] hover:text-[#0F172A] hover:bg-[#E2E8F0]"
          aria-label="Close inspector panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] bg-[#FFFFFF] text-xs font-medium">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-[#4378c1] text-[#4378c1] font-semibold'
              : 'border-transparent text-[#6C778D] hover:text-[#0F172A]'
          }`}
        >
          Audit Checks ({auditResults.checks.filter(c => c.severity !== 'valid').length})
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors ${
            activeTab === 'guide'
              ? 'border-[#4378c1] text-[#4378c1] font-semibold'
              : 'border-transparent text-[#6C778D] hover:text-[#0F172A]'
          }`}
        >
          PO / PSO Guide
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-2 text-center border-b-2 transition-colors ${
            activeTab === 'comments'
              ? 'border-[#4378c1] text-[#4378c1] font-semibold'
              : 'border-transparent text-[#6C778D] hover:text-[#0F172A]'
          }`}
        >
          Notes ({course.comments.length})
        </button>
      </div>

      {/* Tab Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: AUDIT CHECKS */}
        {activeTab === 'audit' && (
          <div className="space-y-3">
            {/* Summary KPI Strip */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
              <div>
                <span className="text-[11px] text-[#6C778D]">HOTS Outcomes:</span>
                <div className="font-mono font-semibold text-[#0F172A]">
                  {auditResults.hotsPercentage}% (Target $\ge$70%)
                </div>
              </div>
              <div>
                <span className="text-[11px] text-[#6C778D]">Avg Correlation:</span>
                <div className="font-mono font-semibold text-[#0F172A]">
                  {auditResults.averageCorrelation} / 3.0
                </div>
              </div>
            </div>

            {/* Checklist items */}
            {auditResults.checks.map((check) => {
              const isError = check.severity === 'error';
              const isWarning = check.severity === 'warning';
              const isValid = check.severity === 'valid';

              return (
                <div
                  key={check.id}
                  className={`p-3 rounded border text-xs transition-colors ${
                    isError
                      ? 'bg-[#FEF2F2] border-[#FECACA]'
                      : isWarning
                      ? 'bg-[#FFFBEB] border-[#FDE68A]'
                      : 'bg-[#F0FDF4] border-[#BBF7D0]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isError ? (
                      <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#198856] shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-semibold ${
                          isError
                            ? 'text-[#DC2626]'
                            : isWarning
                            ? 'text-[#D97706]'
                            : 'text-[#198856]'
                        }`}
                      >
                        {check.title}
                      </div>
                      <p className="text-[#334155] mt-1 leading-relaxed">
                        {check.message}
                      </p>
                      {check.details && (
                        <p className="text-[11px] text-[#6C778D] mt-1 italic">
                          {check.details}
                        </p>
                      )}

                      {/* Auto-fix button if available */}
                      {check.canAutoFix && (
                        <div className="mt-2 pt-2 border-t border-black/5 flex justify-end">
                          <button
                            onClick={() => onAutoFixIssue(check.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] rounded text-[11px] font-medium text-[#215ca3] shadow-2xs"
                          >
                            <Sparkles className="w-3 h-3 text-[#4378c1]" />
                            Auto-Align
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: PO / PSO REFERENCE GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-3">
            <div className="text-xs text-[#6C778D] leading-relaxed">
              Official Washington Accord / NBA Graduate Attribute descriptors for engineering curricula.
            </div>

            {/* Quick Picker */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#334155] block mb-1">
                Select Attribute Code:
              </label>
              <select
                value={selectedPO}
                onChange={(e) => setSelectedPO(e.target.value)}
                className="w-full text-xs font-mono bg-[#F8FAFC] border border-[#CBD5E1] rounded p-1.5 text-[#0F172A]"
              >
                <optgroup label="Program Outcomes (PO1–PO12)">
                  {PROGRAM_OUTCOMES.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.code}: {p.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Program Specific Outcomes (PSO1–PSO3)">
                  {PROGRAM_SPECIFIC_OUTCOMES.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.code}: {p.title}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Selected PO Details Card */}
            {currentPoDetails && (
              <div className="p-3.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#215ca3] text-sm">
                    {currentPoDetails.code}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-[#6C778D] bg-white px-2 py-0.5 border border-[#E2E8F0] rounded">
                    Graduate Attribute
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#0F172A]">
                  {currentPoDetails.title}
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {currentPoDetails.description}
                </p>
              </div>
            )}

            <div className="p-3 bg-[#E8EEFF]/40 rounded border border-[#DFE8FF] text-[11px] text-[#215ca3] space-y-1">
              <div className="font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Correlation Weight Guidance:
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-[#334155]">
                <li><strong>Weight 3 (Substantial):</strong> Outcome explicitly targets and directly assesses the attribute in major assessments.</li>
                <li><strong>Weight 2 (Moderate):</strong> Outcome directly applies this attribute in assignments or laboratory work.</li>
                <li><strong>Weight 1 (Slight):</strong> Minor implicit contribution or background awareness.</li>
                <li><strong>Weight 0 (-):</strong> No perceptible contribution.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEW COMMENTS & THREADS */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            {/* New Comment Input */}
            <form onSubmit={handlePostComment} className="p-3 rounded bg-[#F8FAFC] border border-[#CBD5E1] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0F172A]">
                  Add Review Note as <span className="text-[#4378c1]">{activeRole}</span>
                </span>
              </div>
              <select
                value={newCommentSection}
                onChange={(e) => setNewCommentSection(e.target.value)}
                className="w-full text-[11px] bg-white border border-[#CBD5E1] rounded px-2 py-1 text-[#334155]"
              >
                <option value="Course Specification">Section: Course Specification</option>
                <option value="Credits & Prerequisites">Section: Credits & Prerequisites</option>
                <option value="CO-PO Matrix">Section: CO-PO Matrix</option>
                <option value="Bloom Taxonomy Distribution">Section: Bloom Taxonomy Distribution</option>
                <option value="Accreditation Compliance">Section: Accreditation Compliance</option>
              </select>
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Type audit observation, revision recommendation, or evidence query..."
                rows={3}
                className="w-full text-xs bg-white border border-[#CBD5E1] rounded p-2 focus:ring-1 focus:ring-[#4378c1] focus:outline-none text-[#0F172A]"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Submit Comment</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-2.5">
              {course.comments.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#6C778D]">
                  No comments logged. Add feedback above.
                </div>
              ) : (
                course.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded border text-xs space-y-1.5 transition-colors ${
                      comment.resolved
                        ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                        : 'bg-white border-[#CBD5E1] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[#0F172A]">
                        {comment.author}
                      </div>
                      <span className="text-[10px] font-mono text-[#6C778D]">
                        {comment.timestamp}
                      </span>
                    </div>
                    <div className="text-[10px] font-medium text-[#4378c1] uppercase tracking-wide">
                      {comment.section}
                    </div>
                    <p className="text-[#334155] leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span
                        className={`text-[10px] font-semibold ${
                          comment.resolved ? 'text-[#198856]' : 'text-[#D97706]'
                        }`}
                      >
                        {comment.resolved ? '✓ Resolved' : '● Action Required'}
                      </span>
                      <button
                        onClick={() => onToggleResolveComment(comment.id)}
                        className="text-[11px] text-[#4378c1] hover:underline cursor-pointer"
                      >
                        {comment.resolved ? 'Mark Unresolved' : 'Mark Resolved'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
