import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  ArrowRight, 
  Stamp, 
  RotateCcw,
  AlertTriangle,
  Award,
  KeyRound
} from 'lucide-react';
import { CourseData, Role } from '../../types/syllabus';

interface WorkflowStepProps {
  course: CourseData;
  activeRole: Role;
  onUpdateCourse: (updater: (prev: CourseData) => CourseData) => void;
  onNextStep: () => void;
  auditErrorCount: number;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({
  course,
  activeRole,
  onUpdateCourse,
  onNextStep,
  auditErrorCount
}) => {
  const [signingRemarks, setSigningRemarks] = useState('');

  // Sign stage handler
  const handleSignStage = (stageId: 'author' | 'reviewer' | 'hod') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const fakeHash = 'SIG-SHA256:' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

    onUpdateCourse(prev => {
      const nextWorkflow = prev.workflow.map(stage => {
        if (stage.stageId === stageId) {
          return {
            ...stage,
            status: 'signed' as const,
            signedAt: timestamp,
            signatureHash: fakeHash,
            remarks: signingRemarks || stage.remarks || 'Formally endorsed and verified for compliance.'
          };
        }
        // Advance next stage to in_progress if pending
        if (stageId === 'author' && stage.stageId === 'reviewer' && stage.status === 'pending') {
          return { ...stage, status: 'in_progress' as const };
        }
        if (stageId === 'reviewer' && stage.stageId === 'hod' && stage.status === 'pending') {
          return { ...stage, status: 'in_progress' as const };
        }
        return stage;
      });

      // If HOD signs, transition course status to Approved!
      let nextStatus = prev.status;
      if (stageId === 'hod') {
        nextStatus = 'Approved';
      } else if (stageId === 'author') {
        nextStatus = 'In Review';
      }

      return {
        ...prev,
        status: nextStatus,
        workflow: nextWorkflow
      };
    });

    setSigningRemarks('');
  };

  // Reject / Request Revision
  const handleRequestRevision = (stageId: 'reviewer' | 'hod') => {
    onUpdateCourse(prev => ({
      ...prev,
      status: 'Draft',
      workflow: prev.workflow.map(s => {
        if (s.stageId === stageId) {
          return {
            ...s,
            status: 'rejected' as const,
            remarks: signingRemarks || 'Returned for syllabus modifications.'
          };
        }
        if (s.stageId === 'author') {
          return { ...s, status: 'in_progress' as const };
        }
        return s;
      })
    }));
    setSigningRemarks('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
            Stage 05 · Institutional Governance & Sign-Off
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Accreditation Certification Workflow & Multi-Role Trail
          </h1>
          <p className="text-xs text-[#334155] mt-1 leading-relaxed">
            Multi-tier peer approval and cryptographic digital seal by Course Coordinator, Board of Studies, and Head of Department.
          </p>
        </div>

        <button
          onClick={onNextStep}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
        >
          <span>View Accredited Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Audit Blocker Alert if errors exist */}
      {auditErrorCount > 0 && (
        <div className="p-4 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#DC2626]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Accreditation Blocker:</strong> {auditErrorCount} critical error(s) must be resolved in Compliance Checks before final HOD certification.
            </span>
          </div>
        </div>
      )}

      {/* 3-Tier Workflow Stages Cards */}
      <div className="space-y-4">
        {course.workflow.map((stage, idx) => {
          const isSigned = stage.status === 'signed';
          const isInProgress = stage.status === 'in_progress';
          const isRejected = stage.status === 'rejected';
          const isPending = stage.status === 'pending';

          const canActAsCurrentRole = activeRole === stage.assignedRole;

          return (
            <div
              key={stage.stageId}
              className={`p-5 rounded-[8px] bg-[#FFFFFF] border transition-all ${
                isSigned
                  ? 'border-[#BBF7D0] shadow-2xs'
                  : isInProgress
                  ? 'border-[#4378c1] ring-1 ring-[#4378c1] shadow-2xs'
                  : isRejected
                  ? 'border-[#FECACA]'
                  : 'border-[#E2E8F0] opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSigned
                        ? 'bg-[#F0FDF4] text-[#198856] border border-[#BBF7D0]'
                        : isInProgress
                        ? 'bg-[#E8EEFF] text-[#215ca3] border border-[#CBD5E1]'
                        : isRejected
                        ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                        : 'bg-[#F8FAFC] text-[#6C778D] border border-[#E2E8F0]'
                    }`}
                  >
                    {isSigned ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isRejected ? (
                      <RotateCcw className="w-4 h-4" />
                    ) : (
                      <span className="font-mono text-xs font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0F172A]">
                        {stage.stageName}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSigned
                            ? 'bg-[#F0FDF4] text-[#198856]'
                            : isInProgress
                            ? 'bg-[#FFFBEB] text-[#D97706]'
                            : isRejected
                            ? 'bg-[#FEF2F2] text-[#DC2626]'
                            : 'bg-[#F1F5F9] text-[#6C778D]'
                        }`}
                      >
                        {isSigned ? 'Certified' : isInProgress ? 'Pending Action' : isRejected ? 'Returned' : 'Awaiting Stage'}
                      </span>
                    </div>

                    <div className="text-xs text-[#334155] mt-1">
                      Assigned: <strong className="text-[#0F172A]">{stage.assigneeName}</strong>
                    </div>

                    {stage.remarks && (
                      <div className="mt-2 p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] leading-relaxed">
                        <strong className="text-[#0F172A]">Audit Remarks:</strong> {stage.remarks}
                      </div>
                    )}

                    {/* Signed Cryptographic Token */}
                    {isSigned && (
                      <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 text-[11px] text-[#6C778D]">
                        <span className="flex items-center gap-1 font-mono text-[#198856]">
                          <KeyRound className="w-3.5 h-3.5" />
                          {stage.signatureHash}
                        </span>
                        <span>Certified on: {stage.signedAt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Controls for this stage */}
                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  {isInProgress && canActAsCurrentRole && (
                    <div className="space-y-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={signingRemarks}
                        onChange={(e) => setSigningRemarks(e.target.value)}
                        placeholder="Add sign-off audit remark..."
                        className="w-full sm:w-64 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-2.5 py-1 text-[#0F172A]"
                      />
                      <div className="flex items-center gap-2">
                        {stage.stageId !== 'author' && (
                          <button
                            onClick={() => handleRequestRevision(stage.stageId as any)}
                            className="px-3 py-1.5 text-xs font-medium text-[#DC2626] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] rounded"
                          >
                            Return for Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleSignStage(stage.stageId)}
                          disabled={stage.stageId === 'hod' && auditErrorCount > 0}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] disabled:opacity-50 rounded shadow-xs"
                        >
                          {stage.stageId === 'hod' ? 'Certify & Affix Digital Seal' : 'Endorse & Submit'}
                        </button>
                      </div>
                    </div>
                  )}

                  {isInProgress && !canActAsCurrentRole && (
                    <span className="text-[11px] text-[#6C778D] italic">
                      Switch active role to <strong>{stage.assignedRole}</strong> in top bar to execute this approval.
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Certification Seal Banner if Approved */}
      {course.status === 'Approved' && (
        <div className="p-6 rounded-[8px] bg-gradient-to-r from-[#F0FDF4] via-[#FFFFFF] to-[#F0FDF4] border-2 border-[#BBF7D0] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#198856] text-white flex items-center justify-center shadow-md">
              <Stamp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#198856]">
                Institutional Accreditation Certified
              </div>
              <h2 className="text-base font-bold text-[#0F172A] mt-0.5">
                {course.code} Curriculum & Outcome Matrices Certified
              </h2>
              <p className="text-xs text-[#334155] mt-1">
                Approved by Board of Studies and Departmental Dean. Valid for Autonomous Regulation {course.regulation}.
              </p>
            </div>
          </div>

          <button
            onClick={onNextStep}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#198856] hover:bg-[#157347] rounded shadow-xs"
          >
            Generate Print Dossier
          </button>
        </div>
      )}
    </div>
  );
};
