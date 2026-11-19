import { checkGradientAbuse } from './rules/gradient-abuse.mjs';
import { checkPlaceholderLeak } from './rules/placeholder-leak.mjs';
import { checkCardNesting } from './rules/card-nesting.mjs';
import { checkContrast } from './rules/contrast-check.mjs';

export function lintFrontendCode(sourceCode, options = {}) {
  const allIssues = [
    ...checkGradientAbuse(sourceCode),
    ...checkPlaceholderLeak(sourceCode),
    ...checkCardNesting(sourceCode),
    ...checkContrast(sourceCode)
  ];

  return {
    clean: allIssues.filter(i => i.severity === 'error').length === 0,
    totalIssues: allIssues.length,
    errors: allIssues.filter(i => i.severity === 'error'),
    warnings: allIssues.filter(i => i.severity === 'warning'),
    issues: allIssues
  };
}
