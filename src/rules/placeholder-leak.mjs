/**
 * Rule: placeholder-leak
 * Detects lingering placeholder text and hallucinated template filler.
 */
export function checkPlaceholderLeak(source) {
  const issues = [];
  const patterns = [
    { regex: /\blorem\s+ipsum\b/i, label: 'Lorem Ipsum text' },
    { regex: /\[(?:insert|replace|your)\s+[\w\s]+\]/i, label: 'Bracketed prompt placeholder' },
    { regex: /\{\s*\/\*\s*TODO:?\s*.*?\*\/\s*\}/i, label: 'Unimplemented JSX TODO placeholder' },
    { regex: /\b(john\s+doe|jane\s+doe|example\.com)\b/i, label: 'Generic mock placeholder identifier' },
    { regex: /https?:\/\/via\.placeholder\.com/i, label: 'Deprecated mock placeholder image URL' }
  ];

  const lines = source.split('\n');
  lines.forEach((line, idx) => {
    for (const pat of patterns) {
      const match = pat.regex.exec(line);
      if (match) {
        issues.push({
          rule: 'placeholder-leak',
          severity: 'error',
          line: idx + 1,
          message: `Residual placeholder found: ${pat.label} ("${match[0]}"). Replace with realistic domain copy.`,
          match: match[0]
        });
      }
    }
  });

  return issues;
}
