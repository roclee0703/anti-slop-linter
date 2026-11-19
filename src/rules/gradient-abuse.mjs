/**
 * Rule: gradient-abuse
 * Detects generic LLM gradient patterns (e.g., from-purple-500 to-indigo-600)
 * that signify uncalibrated AI aesthetic templates.
 */
export function checkGradientAbuse(source) {
  const issues = [];
  const genericGradientRegex = /from-(purple|indigo|violet|fuchsia)-(?:400|500|600)\s+(?:via-\w+-\d+\s+)?to-(indigo|purple|pink|fuchsia)-(?:500|600|700)/gi;

  const lines = source.split('\n');
  lines.forEach((line, idx) => {
    let match;
    while ((match = genericGradientRegex.exec(line)) !== null) {
      issues.push({
        rule: 'gradient-abuse',
        severity: 'warning',
        line: idx + 1,
        message: `Generic AI gradient detected: "${match[0]}". Consider using brand tokens or solid surfaces.`,
        match: match[0]
      });
    }
  });

  return issues;
}
