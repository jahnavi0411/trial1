import { CourseData, AuditCheckResult } from '../types/syllabus';
import { PROGRAM_OUTCOMES, PROGRAM_SPECIFIC_OUTCOMES, BLOOM_LEVELS } from '../data/accreditationStandards';

export function runComplianceAudit(course: CourseData): {
  overallScore: number;
  checks: AuditCheckResult[];
  hotsPercentage: number;
  averageCorrelation: number;
  unmappedPOs: string[];
} {
  const checks: AuditCheckResult[] = [];

  // 1. Bloom's Taxonomy Check
  const totalOutcomes = course.outcomes.length;
  const hotsCount = course.outcomes.filter(co => {
    const meta = BLOOM_LEVELS.find(b => b.level === co.bloomLevel);
    return meta ? meta.isHOTS : false;
  }).length;

  const hotsPercentage = totalOutcomes > 0 ? Math.round((hotsCount / totalOutcomes) * 100) : 0;

  if (hotsPercentage >= 70) {
    checks.push({
      id: 'bloom-hots-good',
      title: "Bloom's Higher-Order Thinking Skills (HOTS) Distribution",
      category: 'Bloom',
      severity: 'valid',
      message: `${hotsPercentage}% of Course Outcomes assess HOTS (L3–L6), fully compliant with ${course.standard} outcome-based criteria.`,
      details: `${hotsCount} of ${totalOutcomes} COs target Application, Analysis, Evaluation, or Creation.`
    });
  } else if (hotsPercentage >= 50) {
    checks.push({
      id: 'bloom-hots-warn',
      title: "Bloom's Higher-Order Thinking Skills (HOTS) Balance",
      category: 'Bloom',
      severity: 'warning',
      message: `HOTS proportion is ${hotsPercentage}% (recommended $\\ge$ 70% for autonomous engineering programs).`,
      details: 'Consider upgrading L1/L2 outcomes into L4 (Analyze) or L5 (Evaluate).',
      recommendation: 'Elevate lower-level verbs to design or analytical tasks.',
      canAutoFix: true
    });
  } else {
    checks.push({
      id: 'bloom-hots-error',
      title: "Deficient Higher-Order Cognitive Outcomes",
      category: 'Bloom',
      severity: 'error',
      message: `Only ${hotsPercentage}% of outcomes are HOTS. Does not meet ${course.standard} accreditation criteria.`,
      details: 'Engineering graduates require rigorous analytical and design synthesis competence.',
      canAutoFix: true
    });
  }

  // 2. Credit Calculation Integrity
  const { lectureHours, tutorialHours, practicalHours, totalCredits } = course.credits;
  const expectedCredits = lectureHours + tutorialHours + Math.floor(practicalHours / 2);

  if (totalCredits === expectedCredits) {
    checks.push({
      id: 'credit-formula-valid',
      title: 'Credit-to-Contact Hour Formulation Integrity',
      category: 'Credits',
      severity: 'valid',
      message: `Total credits (${totalCredits} C) precisely matches L-T-P schema (${lectureHours}L + ${tutorialHours}T + ${practicalHours}P).`,
      details: `Weekly contact hours: ${lectureHours + tutorialHours + practicalHours} hrs/week. Semester: ~${(lectureHours + tutorialHours + practicalHours) * 15} contact hours.`
    });
  } else {
    checks.push({
      id: 'credit-formula-error',
      title: 'Credit Allocation Arithmetic Mismatch',
      category: 'Credits',
      severity: 'error',
      message: `Recorded credits (${totalCredits}) does not match standard formula ${lectureHours} + ${tutorialHours} + (${practicalHours}/2) = ${expectedCredits}.`,
      details: 'Accreditation auditors flag credit-contact hour discrepancies immediately.',
      canAutoFix: true
    });
  }

  // 3. Matrix Mapping & PO/PSO Coverage
  const unmappedPOs: string[] = [];
  let totalMappedWeight = 0;
  let cellCount = 0;

  PROGRAM_OUTCOMES.forEach(po => {
    let colTotal = 0;
    course.outcomes.forEach(co => {
      const weight = course.matrix[`${co.id}_${po.id}`] || 0;
      colTotal += weight;
      totalMappedWeight += weight;
      cellCount++;
    });

    if (colTotal === 0) {
      unmappedPOs.push(po.id);
    }
  });

  // Also check PSOs
  const unmappedPSOs: string[] = [];
  PROGRAM_SPECIFIC_OUTCOMES.forEach(pso => {
    let colTotal = 0;
    course.outcomes.forEach(co => {
      const weight = course.matrix[`${co.id}_${pso.id}`] || 0;
      colTotal += weight;
      totalMappedWeight += weight;
      cellCount++;
    });
    if (colTotal === 0) {
      unmappedPSOs.push(pso.id);
    }
  });

  const averageCorrelation = cellCount > 0 ? Number((totalMappedWeight / cellCount).toFixed(2)) : 0;

  if (unmappedPOs.length === 0) {
    checks.push({
      id: 'po-coverage-valid',
      title: 'Comprehensive Program Outcome (PO) Alignment',
      category: 'Mapping',
      severity: 'valid',
      message: `All 12 Program Outcomes (PO1–PO12) are addressed with substantiated correlation weights.`,
      details: `Average correlation density: ${averageCorrelation} across all matrix coordinates.`
    });
  } else if (unmappedPOs.length <= 3) {
    checks.push({
      id: 'po-coverage-warn',
      title: 'Unmapped Program Outcome Gaps',
      category: 'Mapping',
      severity: 'warning',
      message: `${unmappedPOs.length} Program Outcome(s) have zero correlation: ${unmappedPOs.join(', ')}.`,
      details: 'Audit committees scrutinize gaps in general engineering attributes (e.g. Ethics, Society, or Modern Tools).',
      recommendation: `Evaluate if secondary assignments or lab components link to ${unmappedPOs.join(', ')}.`,
      canAutoFix: true
    });
  } else {
    checks.push({
      id: 'po-coverage-error',
      title: 'Excessive Program Outcome Coverage Deficit',
      category: 'Mapping',
      severity: 'error',
      message: `${unmappedPOs.length} Program Outcomes remain entirely unmapped (${unmappedPOs.join(', ')}).`,
      details: 'Syllabus fails broad graduate attribute certification threshold.',
      canAutoFix: true
    });
  }

  // Check Orphan Course Outcomes (CO with zero mapping to any PO)
  course.outcomes.forEach(co => {
    let rowSum = 0;
    PROGRAM_OUTCOMES.forEach(po => {
      rowSum += course.matrix[`${co.id}_${po.id}`] || 0;
    });
    if (rowSum === 0) {
      checks.push({
        id: `orphan-${co.id}`,
        title: `Unanchored Course Outcome (${co.id})`,
        category: 'Mapping',
        severity: 'error',
        message: `${co.id} has no correlation links to any Program Outcome.`,
        details: 'Every defined Course Outcome must map to at least one Program Outcome.'
      });
    }
  });

  // 4. Prerequisites Verification
  if (course.prerequisites && course.prerequisites.length > 0) {
    checks.push({
      id: 'prereq-valid',
      title: 'Prerequisite Chain Articulation',
      category: 'Prerequisites',
      severity: 'valid',
      message: `${course.prerequisites.length} prerequisite course(s) articulated: ${course.prerequisites.join('; ')}.`,
      details: 'Provides necessary foundational assurance for advanced syllabus modules.'
    });
  } else {
    checks.push({
      id: 'prereq-warn',
      title: 'No Explicit Prerequisites Articulated',
      category: 'Prerequisites',
      severity: 'warning',
      message: 'Course has no defined prerequisites in the catalogue.',
      details: 'Unless this is a 1st-year induction subject, prerequisite knowledge must be recorded.'
    });
  }

  // 5. Objective-to-Outcome Ratio
  if (course.objectives.length >= 3 && course.outcomes.length >= 4) {
    checks.push({
      id: 'obj-co-ratio-valid',
      title: 'Objective & Outcome Granularity Adequacy',
      category: 'Bloom',
      severity: 'valid',
      message: `${course.objectives.length} Objectives & ${course.outcomes.length} Outcomes provide optimal measurement granularity.`,
      details: 'Complies with standard accreditation recommendation of 4–6 measurable Course Outcomes.'
    });
  }

  // Compute Overall Score (0 to 100)
  const errorCount = checks.filter(c => c.severity === 'error').length;
  const warnCount = checks.filter(c => c.severity === 'warning').length;
  const validCount = checks.filter(c => c.severity === 'valid').length;

  let score = 100 - (errorCount * 25) - (warnCount * 10);
  if (score < 10) score = 10;
  if (score > 100) score = 100;

  return {
    overallScore: score,
    checks,
    hotsPercentage,
    averageCorrelation,
    unmappedPOs
  };
}
