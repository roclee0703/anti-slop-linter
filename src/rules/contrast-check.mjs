/**
 * Rule: contrast-check
 * Flags dangerously low-contrast Tailwind text & background combinations.
 */
export function checkContrast(source) {
  const issues = [];
  const lowContrastCombos = [
    {
      regex: /text-(?:gray|slate|zinc|neutral)-(?:300|400)\s+[^"']*bg-(?:white|gray-50|gray-100|slate-50|slate-100)/i,
      message: 'Faint muted text on light background fails accessibility contrast (WCAG AA).'
    },
    {
      regex: /text-(?:gray|slate|zinc|neutral)-(?:500|600)\s+[^"']*bg-(?:black|gray-900|gray-950|slate-900)/i,
      message: 'Dark gray text on dark background has insufficient contrast.'
    }
  ];

  const lines = source.split('\n');
  lines.forEach((line, idx) => {
    for (const combo of lowContrastCombos) {
      if (combo.regex.test(line)) {
        issues.push({
          rule: 'contrast-check',
          severity: 'error',
          line: idx + 1,
          message: combo.message
        });
      }
    }
  });

  return issues;
}
