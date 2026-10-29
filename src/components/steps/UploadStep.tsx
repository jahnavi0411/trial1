import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { CourseData, AccreditationStandard } from '../../types/syllabus';
import { INITIAL_COURSES } from '../../data/defaultCourses';

interface UploadStepProps {
  course: CourseData;
  onUpdateCourse: (updater: (prev: CourseData) => CourseData) => void;
  onNextStep: () => void;
  onLoadSampleCourse: (sampleId: string) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({
  course,
  onUpdateCourse,
  onNextStep,
  onLoadSampleCourse
}) => {
  const [pasteContent, setPasteContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedFeedback, setParsedFeedback] = useState<string | null>(null);

  const standards: { id: AccreditationStandard; name: string; org: string; desc: string }[] = [
    {
      id: 'NBA',
      name: 'NBA Tier-1 / OBE Model',
      org: 'National Board of Accreditation (Signatory of Washington Accord)',
      desc: 'Enforces strictly 12 standard Program Outcomes (PO1-PO12), 2-3 PSOs, and Bloom taxonomy mapping for engineering accreditation.'
    },
    {
      id: 'ABET',
      name: 'ABET EAC Criteria 3',
      org: 'Accreditation Board for Engineering and Technology (USA / Global)',
      desc: 'Student Outcomes (1)-(7) mapping with emphasis on continuous attainment tracking and design synthesis.'
    },
    {
      id: 'Washington Accord',
      name: 'Washington Accord Global Model',
      org: 'International Engineering Alliance (IEA)',
      desc: 'International mutual recognition standard with 12 complex engineering problem-solving graduate attributes.'
    },
    {
      id: 'NAAC',
      name: 'NAAC Autonomous Criteria II',
      org: 'National Assessment and Accreditation Council',
      desc: 'Curriculum design, cognitive level taxonomy, learner-centric pedagogical distribution.'
    }
  ];

  const handleStandardChange = (std: AccreditationStandard) => {
    onUpdateCourse(prev => ({
      ...prev,
      standard: std
    }));
  };

  const handleSimulateDocumentParse = () => {
    if (!pasteContent.trim()) {
      setParsedFeedback('Please paste raw course text or syllabus markdown before parsing.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setParsedFeedback('Syllabus extracted successfully. 4 Course Objectives and 5 Measurable Outcomes identified with Bloom levels.');
      onUpdateCourse(prev => ({
        ...prev,
        description: pasteContent.length > 500 ? pasteContent.substring(0, 500) + '...' : pasteContent
      }));
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Editorial Header */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
          Stage 01 · Ingestion & Regulatory Framework
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
          Upload Syllabus & Select Accreditation Standard
        </h1>
        <p className="text-xs text-[#334155] mt-1 leading-relaxed">
          Configure the evaluation framework for syllabus verification, automated Bloom taxonomy grading, and outcome matrix validation.
        </p>
      </div>

      {/* Standard Selector Cards */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide block">
          Accreditation Framework & Audit Benchmark:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {standards.map((std) => {
            const isSelected = course.standard === std.id;
            return (
              <div
                key={std.id}
                onClick={() => handleStandardChange(std.id)}
                className={`p-4 rounded-[6px] border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#4378c1] shadow-xs ring-1 ring-[#4378c1]'
                    : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] block">
                      {std.name}
                    </span>
                    <span className="text-[11px] font-medium text-[#4378c1] block mt-0.5">
                      {std.org}
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-[#4378c1] bg-[#4378c1] text-white'
                        : 'border-[#CBD5E1] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
                <p className="text-[11px] text-[#6C778D] mt-2 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Raw Document Input / Ingestion Section */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-[#4378c1]" />
            <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
              Document Ingestion / Raw Course Text
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6C778D]">Or load reference template:</span>
            <button
              onClick={() => onLoadSampleCourse('cs304')}
              className="px-2 py-1 text-[11px] font-medium bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] rounded border border-[#CBD5E1]"
            >
              CS304 Distributed
            </button>
            <button
              onClick={() => onLoadSampleCourse('ai402')}
              className="px-2 py-1 text-[11px] font-medium bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] rounded border border-[#CBD5E1]"
            >
              AI402 NLP & LLMs
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-[#334155] block mb-1">
            Paste Syllabus Content, Course Objectives, or Curriculum Draft:
          </label>
          <textarea
            value={pasteContent}
            onChange={(e) => setPasteContent(e.target.value)}
            rows={5}
            placeholder="Paste syllabus text here (e.g. Course Code, Units 1-5, Course Objectives, Course Outcomes CO1-CO6, prerequisites, recommended textbooks...)"
            className="w-full text-xs font-mono bg-[#F8FAFC] border border-[#CBD5E1] rounded p-3 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4378c1] leading-relaxed"
          />
        </div>

        {parsedFeedback && (
          <div className="p-2.5 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#198856] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{parsedFeedback}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
          <button
            onClick={handleSimulateDocumentParse}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Parsing Document...' : 'Parse & Extract Specification'}</span>
          </button>

          <button
            onClick={onNextStep}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#215ca3] hover:bg-[#36619e] rounded transition-colors"
          >
            <span>Proceed to Course Specification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
