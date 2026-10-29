/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CourseData, Role, ReviewComment } from './types/syllabus';
import { INITIAL_COURSES } from './data/defaultCourses';
import { runComplianceAudit } from './utils/complianceEngine';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InspectorDrawer } from './components/InspectorDrawer';
import { UploadStep } from './components/steps/UploadStep';
import { CourseSpecStep } from './components/steps/CourseSpecStep';
import { MatrixStep } from './components/steps/MatrixStep';
import { ComplianceStep } from './components/steps/ComplianceStep';
import { WorkflowStep } from './components/steps/WorkflowStep';
import { ExportStep } from './components/steps/ExportStep';

const STORAGE_KEY = 'academic_precision_courses_v1';

export default function App() {
  // Load courses from localStorage or default
  const [courses, setCourses] = useState<CourseData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored courses', e);
    }
    return INITIAL_COURSES;
  });

  const [currentCourseId, setCurrentCourseId] = useState<string>('cs304');
  const [activeRole, setActiveRole] = useState<Role>('Author');
  const [activeStep, setActiveStep] = useState<string>('matrix');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.error('Error saving courses', e);
    }
  }, [courses]);

  // Current active course
  const currentCourse = useMemo(() => {
    return courses.find(c => c.id === currentCourseId) || courses[0] || INITIAL_COURSES[0];
  }, [courses, currentCourseId]);

  // Run real-time compliance audit on active course
  const auditResults = useMemo(() => {
    return runComplianceAudit(currentCourse);
  }, [currentCourse]);

  const auditIssuesCount = useMemo(() => {
    return auditResults.checks.filter(c => c.severity !== 'valid').length;
  }, [auditResults]);

  const auditErrorCount = useMemo(() => {
    return auditResults.checks.filter(c => c.severity === 'error').length;
  }, [auditResults]);

  // Updater helper for current course
  const updateCurrentCourse = (updater: (prev: CourseData) => CourseData) => {
    setCourses(prevCourses => {
      return prevCourses.map(c => {
        if (c.id === currentCourse.id) {
          const updated = updater(c);
          return {
            ...updated,
            lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
          };
        }
        return c;
      });
    });
  };

  // Add Comment
  const handleAddComment = (commentData: Omit<ReviewComment, 'id' | 'timestamp' | 'resolved'>) => {
    const newComment: ReviewComment = {
      ...commentData,
      id: 'c_' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      resolved: false
    };

    updateCurrentCourse(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  // Toggle resolve comment
  const handleToggleResolveComment = (commentId: string) => {
    updateCurrentCourse(prev => ({
      ...prev,
      comments: prev.comments.map(c => c.id === commentId ? { ...c, resolved: !c.resolved } : c)
    }));
  };

  // Auto-Fix specific issue
  const handleAutoFixIssue = (issueId: string) => {
    if (issueId.startsWith('bloom-hots')) {
      // Upgrade lowest Bloom levels to L4 or L5
      updateCurrentCourse(prev => ({
        ...prev,
        outcomes: prev.outcomes.map((co, i) => {
          if (co.bloomLevel === 'L1-Remember' || co.bloomLevel === 'L2-Understand') {
            return {
              ...co,
              bloomLevel: i % 2 === 0 ? 'L4-Analyze' : 'L5-Evaluate',
              statement: co.statement.replace(/^Define|^Explain|^Identify|^Recall|^Review/i, 'Analyze and evaluate')
            };
          }
          return co;
        })
      }));
    } else if (issueId === 'credit-formula-error') {
      // Fix credit arithmetic
      updateCurrentCourse(prev => {
        const expected = prev.credits.lectureHours + prev.credits.tutorialHours + Math.floor(prev.credits.practicalHours / 2);
        return {
          ...prev,
          credits: {
            ...prev.credits,
            totalCredits: expected
          }
        };
      });
    } else if (issueId.startsWith('po-coverage')) {
      // Map unmapped POs to outcomes
      updateCurrentCourse(prev => {
        const nextMatrix = { ...prev.matrix };
        auditResults.unmappedPOs.forEach((poId, idx) => {
          const targetCo = prev.outcomes[idx % prev.outcomes.length];
          if (targetCo) {
            nextMatrix[`${targetCo.id}_${poId}`] = 2;
          }
        });
        return {
          ...prev,
          matrix: nextMatrix
        };
      });
    }
  };

  // Auto-Fix All Issues
  const handleAutoFixAll = () => {
    handleAutoFixIssue('bloom-hots');
    handleAutoFixIssue('credit-formula-error');
    handleAutoFixIssue('po-coverage');
  };

  // Load sample course
  const handleLoadSampleCourse = (sampleId: string) => {
    const existing = courses.find(c => c.id === sampleId);
    if (existing) {
      setCurrentCourseId(existing.id);
    } else {
      const template = INITIAL_COURSES.find(c => c.id === sampleId);
      if (template) {
        setCourses(prev => [...prev, template]);
        setCurrentCourseId(template.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* 56px Persistent Header */}
      <Header
        courses={courses}
        currentCourse={currentCourse}
        onSelectCourse={setCurrentCourseId}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        activeStep={activeStep}
        onSelectStep={setActiveStep}
        isInspectorOpen={isInspectorOpen}
        onToggleInspector={() => setIsInspectorOpen(prev => !prev)}
        auditIssuesCount={auditIssuesCount}
        onQuickRunAudit={() => setActiveStep('compliance')}
      />

      <div className="flex-1 flex pt-14">
        {/* 240px Fixed Left Sidebar (no-print) */}
        <div className="no-print">
          <Sidebar
            activeStep={activeStep}
            onSelectStep={setActiveStep}
            course={currentCourse}
            auditIssuesCount={auditIssuesCount}
            auditErrorCount={auditErrorCount}
          />
        </div>

        {/* Main Fluid Content Canvas */}
        <main
          className={`flex-1 transition-all p-4 md:p-8 ml-16 lg:ml-60 ${
            isInspectorOpen ? 'mr-0 xl:mr-80' : ''
          }`}
        >
          {/* Conditional step rendering */}
          {activeStep === 'upload' && (
            <UploadStep
              course={currentCourse}
              onUpdateCourse={updateCurrentCourse}
              onNextStep={() => setActiveStep('spec')}
              onLoadSampleCourse={handleLoadSampleCourse}
            />
          )}

          {activeStep === 'spec' && (
            <CourseSpecStep
              course={currentCourse}
              onUpdateCourse={updateCurrentCourse}
              onNextStep={() => setActiveStep('matrix')}
            />
          )}

          {activeStep === 'matrix' && (
            <MatrixStep
              course={currentCourse}
              onUpdateCourse={updateCurrentCourse}
              onNextStep={() => setActiveStep('compliance')}
            />
          )}

          {activeStep === 'compliance' && (
            <ComplianceStep
              course={currentCourse}
              auditResults={auditResults}
              onAutoFixIssue={handleAutoFixIssue}
              onAutoFixAll={handleAutoFixAll}
              onNextStep={() => setActiveStep('workflow')}
            />
          )}

          {activeStep === 'workflow' && (
            <WorkflowStep
              course={currentCourse}
              activeRole={activeRole}
              onUpdateCourse={updateCurrentCourse}
              onNextStep={() => setActiveStep('export')}
              auditErrorCount={auditErrorCount}
            />
          )}

          {activeStep === 'export' && (
            <ExportStep
              course={currentCourse}
              auditResults={auditResults}
            />
          )}
        </main>

        {/* 320px Collapsible Right Inspector Drawer (no-print) */}
        <div className="no-print">
          <InspectorDrawer
            isOpen={isInspectorOpen}
            onClose={() => setIsInspectorOpen(false)}
            auditResults={auditResults}
            course={currentCourse}
            activeRole={activeRole}
            onAddComment={handleAddComment}
            onToggleResolveComment={handleToggleResolveComment}
            onAutoFixIssue={handleAutoFixIssue}
          />
        </div>
      </div>
    </div>
  );
}
