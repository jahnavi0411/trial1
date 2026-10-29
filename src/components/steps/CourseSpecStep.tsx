import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Calculator, 
  GraduationCap, 
  Layers,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import { CourseData, BloomLevel, CourseOutcome } from '../../types/syllabus';
import { BLOOM_LEVELS } from '../../data/accreditationStandards';

interface CourseSpecStepProps {
  course: CourseData;
  onUpdateCourse: (updater: (prev: CourseData) => CourseData) => void;
  onNextStep: () => void;
}

export const CourseSpecStep: React.FC<CourseSpecStepProps> = ({
  course,
  onUpdateCourse,
  onNextStep
}) => {
  const [newPrereq, setNewPrereq] = useState('');
  const [newObjective, setNewObjective] = useState('');

  // Handle Credit changes
  const handleCreditChange = (field: 'lectureHours' | 'tutorialHours' | 'practicalHours', val: number) => {
    onUpdateCourse(prev => {
      const nextCredits = {
        ...prev.credits,
        [field]: Math.max(0, val)
      };
      // Auto-compute credits L + T + P/2
      nextCredits.totalCredits = nextCredits.lectureHours + nextCredits.tutorialHours + Math.floor(nextCredits.practicalHours / 2);
      nextCredits.totalContactHours = (nextCredits.lectureHours + nextCredits.tutorialHours + nextCredits.practicalHours) * 15;
      return {
        ...prev,
        credits: nextCredits
      };
    });
  };

  // Add Prerequisite
  const handleAddPrereq = () => {
    if (!newPrereq.trim()) return;
    onUpdateCourse(prev => ({
      ...prev,
      prerequisites: [...prev.prerequisites, newPrereq.trim()]
    }));
    setNewPrereq('');
  };

  // Remove Prerequisite
  const handleRemovePrereq = (index: number) => {
    onUpdateCourse(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }));
  };

  // Add Objective
  const handleAddObjective = () => {
    if (!newObjective.trim()) return;
    onUpdateCourse(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObjective.trim()]
    }));
    setNewObjective('');
  };

  // Remove Objective
  const handleRemoveObjective = (index: number) => {
    onUpdateCourse(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  // Update Outcome
  const handleUpdateOutcome = (index: number, field: keyof CourseOutcome, value: any) => {
    onUpdateCourse(prev => {
      const nextOutcomes = [...prev.outcomes];
      nextOutcomes[index] = {
        ...nextOutcomes[index],
        [field]: value
      };
      return {
        ...prev,
        outcomes: nextOutcomes
      };
    });
  };

  // Add Outcome
  const handleAddOutcome = () => {
    onUpdateCourse(prev => {
      const nextId = `CO${prev.outcomes.length + 1}`;
      const newOutcome: CourseOutcome = {
        id: nextId,
        statement: 'Analyze and formulate engineering solutions adhering to rigorous mathematical principles.',
        bloomLevel: 'L4-Analyze',
        contactHours: 10
      };
      return {
        ...prev,
        outcomes: [...prev.outcomes, newOutcome]
      };
    });
  };

  // Remove Outcome
  const handleRemoveOutcome = (index: number) => {
    onUpdateCourse(prev => {
      if (prev.outcomes.length <= 1) return prev;
      const targetCO = prev.outcomes[index];
      const nextOutcomes = prev.outcomes.filter((_, i) => i !== index);

      // Clean matrix keys for deleted outcome
      const nextMatrix = { ...prev.matrix };
      Object.keys(nextMatrix).forEach(key => {
        if (key.startsWith(`${targetCO.id}_`)) {
          delete nextMatrix[key];
        }
      });

      return {
        ...prev,
        outcomes: nextOutcomes,
        matrix: nextMatrix
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#4378c1] mb-1">
            Stage 02 · Pedagogical Specifications & Outcomes
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Course Specification & Bloom Taxonomy Mapping
          </h1>
          <p className="text-xs text-[#334155] mt-1 leading-relaxed">
            Define institutional course metadata, the L-T-P-C credit formula, and measurable Course Outcomes with cognitive levels.
          </p>
        </div>
        <button
          onClick={onNextStep}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
        >
          <span>Continue to Outcome Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Metadata & Identification Grid */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-4 shadow-2xs">
        <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide border-b border-[#E2E8F0] pb-2">
          1. Course Identification & Classification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-[#334155] block mb-1">
              Course Code (JetBrains Mono)
            </label>
            <input
              type="text"
              value={course.code}
              onChange={(e) => onUpdateCourse(p => ({ ...p, code: e.target.value.toUpperCase() }))}
              className="w-full text-xs font-mono font-medium bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4378c1]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-[#334155] block mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={course.title}
              onChange={(e) => onUpdateCourse(p => ({ ...p, title: e.target.value }))}
              className="w-full text-xs font-medium bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4378c1]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-[#334155] block mb-1">
              Department / Faculty
            </label>
            <input
              type="text"
              value={course.department}
              onChange={(e) => onUpdateCourse(p => ({ ...p, department: e.target.value }))}
              className="w-full text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#334155] block mb-1">
              Academic Regulation
            </label>
            <input
              type="text"
              value={course.regulation}
              onChange={(e) => onUpdateCourse(p => ({ ...p, regulation: e.target.value }))}
              className="w-full text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A]"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#334155] block mb-1">
              Course Category
            </label>
            <select
              value={course.courseCategory}
              onChange={(e) => onUpdateCourse(p => ({ ...p, courseCategory: e.target.value as any }))}
              className="w-full text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A]"
            >
              <option value="Professional Core">Professional Core</option>
              <option value="Professional Elective">Professional Elective</option>
              <option value="Basic Sciences">Basic Sciences</option>
              <option value="Engineering Science">Engineering Science</option>
              <option value="Open Elective">Open Elective</option>
            </select>
          </div>
        </div>
      </div>

      {/* Credit & Hours Allocation (L-T-P-C) */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#4378c1]" />
            <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
              2. Credit Structure & Contact Hours (L-T-P-C Scheme)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#6C778D]">
            Accreditation Rule: 1L = 1C, 1T = 1C, 2P = 1C
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
            <span className="text-[11px] font-semibold text-[#334155] block mb-1">
              Lecture (L)
            </span>
            <input
              type="number"
              min={0}
              max={6}
              value={course.credits.lectureHours}
              onChange={(e) => handleCreditChange('lectureHours', parseInt(e.target.value) || 0)}
              className="w-full text-sm font-mono font-bold bg-white border border-[#CBD5E1] rounded p-1.5 text-center text-[#0F172A]"
            />
            <span className="text-[10px] text-[#6C778D] block text-center mt-1">hrs / week</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
            <span className="text-[11px] font-semibold text-[#334155] block mb-1">
              Tutorial (T)
            </span>
            <input
              type="number"
              min={0}
              max={4}
              value={course.credits.tutorialHours}
              onChange={(e) => handleCreditChange('tutorialHours', parseInt(e.target.value) || 0)}
              className="w-full text-sm font-mono font-bold bg-white border border-[#CBD5E1] rounded p-1.5 text-center text-[#0F172A]"
            />
            <span className="text-[10px] text-[#6C778D] block text-center mt-1">hrs / week</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
            <span className="text-[11px] font-semibold text-[#334155] block mb-1">
              Practical / Lab (P)
            </span>
            <input
              type="number"
              min={0}
              max={6}
              value={course.credits.practicalHours}
              onChange={(e) => handleCreditChange('practicalHours', parseInt(e.target.value) || 0)}
              className="w-full text-sm font-mono font-bold bg-white border border-[#CBD5E1] rounded p-1.5 text-center text-[#0F172A]"
            />
            <span className="text-[10px] text-[#6C778D] block text-center mt-1">hrs / week</span>
          </div>

          <div className="p-3 bg-[#E8EEFF]/40 border border-[#CBD5E1] rounded">
            <span className="text-[11px] font-semibold text-[#215ca3] block mb-1">
              Total Credits (C)
            </span>
            <div className="text-base font-mono font-bold text-[#215ca3] text-center py-1.5">
              {course.credits.totalCredits}
            </div>
            <span className="text-[10px] text-[#215ca3] block text-center mt-1 font-medium">Credits</span>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-[#334155] block mb-1">
              Contact Hours
            </span>
            <div className="text-base font-mono font-bold text-[#0F172A] text-center py-1.5">
              {course.credits.totalContactHours}
            </div>
            <span className="text-[10px] text-[#6C778D] block text-center mt-1">hrs / semester</span>
          </div>
        </div>
      </div>

      {/* Prerequisites & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prerequisites */}
        <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-3 shadow-2xs">
          <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
            3. Formal Prerequisites
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPrereq}
              onChange={(e) => setNewPrereq(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPrereq())}
              placeholder="e.g. CS204 Operating Systems"
              className="flex-1 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A]"
            />
            <button
              onClick={handleAddPrereq}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#4378c1] hover:bg-[#36619e] rounded"
            >
              Add
            </button>
          </div>
          <div className="space-y-1.5 min-h-16">
            {course.prerequisites.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                <span className="font-mono text-[#334155]">{p}</span>
                <button
                  onClick={() => handleRemovePrereq(idx)}
                  className="text-[#DC2626] hover:text-[#ba1a1a] p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-3 shadow-2xs">
          <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
            4. Course Objectives (Pedagogical Goals)
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddObjective())}
              placeholder="State foundational goal..."
              className="flex-1 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1.5 text-[#0F172A]"
            />
            <button
              onClick={handleAddObjective}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#4378c1] hover:bg-[#36619e] rounded"
            >
              Add
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {course.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start justify-between p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs gap-2">
                <span className="text-[#334155] leading-snug">
                  <strong className="text-[#0F172A] mr-1">{idx + 1}.</strong> {obj}
                </span>
                <button
                  onClick={() => handleRemoveObjective(idx)}
                  className="text-[#DC2626] hover:text-[#ba1a1a] p-1 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Outcomes with Bloom's Revised Taxonomy */}
      <div className="p-5 rounded-[8px] bg-[#FFFFFF] border border-[#E2E8F0] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div>
            <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
              5. Measurable Course Outcomes (CO1–CO6)
            </h3>
            <p className="text-[11px] text-[#6C778D] mt-0.5">
              Formulated with action verbs anchored to Bloom's Revised Cognitive Levels (L1 to L6).
            </p>
          </div>
          <button
            onClick={handleAddOutcome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#4378c1] hover:bg-[#36619e] rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course Outcome</span>
          </button>
        </div>

        <div className="space-y-3">
          {course.outcomes.map((co, index) => {
            const bloomMeta = BLOOM_LEVELS.find(b => b.level === co.bloomLevel);
            const isHots = bloomMeta ? bloomMeta.isHOTS : false;

            return (
              <div
                key={co.id}
                className="p-4 rounded-[6px] border border-[#CBD5E1] bg-[#F8FAFC] space-y-2.5 transition-colors hover:border-[#4378c1]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-[#215ca3] text-white px-2 py-0.5 rounded">
                      {co.id}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isHots
                          ? 'bg-[#F0FDF4] text-[#198856] border border-[#BBF7D0]'
                          : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                      }`}
                    >
                      {isHots ? 'Higher-Order (HOTS)' : 'Lower-Order (LOTS)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Contact hours */}
                    <div className="flex items-center gap-1.5 text-xs text-[#334155]">
                      <Clock className="w-3.5 h-3.5 text-[#6C778D]" />
                      <span className="text-[11px]">Hours:</span>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={co.contactHours}
                        onChange={(e) => handleUpdateOutcome(index, 'contactHours', parseInt(e.target.value) || 0)}
                        className="w-12 text-center text-xs font-mono font-medium bg-white border border-[#CBD5E1] rounded py-0.5 text-[#0F172A]"
                      />
                    </div>

                    {/* Bloom Selector */}
                    <select
                      value={co.bloomLevel}
                      onChange={(e) => handleUpdateOutcome(index, 'bloomLevel', e.target.value as BloomLevel)}
                      className="text-xs font-medium bg-white border border-[#CBD5E1] rounded px-2.5 py-1 text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4378c1]"
                    >
                      {BLOOM_LEVELS.map(b => (
                        <option key={b.level} value={b.level}>
                          {b.level}: {b.name}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleRemoveOutcome(index)}
                      className="text-[#DC2626] hover:bg-[#FEF2F2] p-1 rounded"
                      title="Remove outcome"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Outcome Statement Textarea */}
                <textarea
                  value={co.statement}
                  onChange={(e) => handleUpdateOutcome(index, 'statement', e.target.value)}
                  rows={2}
                  className="w-full text-xs font-sans bg-white border border-[#CBD5E1] rounded p-2.5 text-[#0F172A] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#4378c1]"
                  placeholder="State the measurable competency (e.g. Analyze, Evaluate, Design, Synthesize...)"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
