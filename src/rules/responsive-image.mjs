/**
 * Rule: responsive-image
 * Checks that <img> tags provide descriptive alt text for accessibility
 * and avoids common AI oversights in media markup.
 */
export function checkResponsiveImage(source) {
  const issues = [];
  const imgRegex = /<img\s+[^>]*>/gi;

  const lines = source.split('\n');
  lines.forEach((line, idx) => {
    let match;
    while ((match = imgRegex.exec(line)) !== null) {
      const tag = match[0];
      if (!/\balt\s*=\s*["'][^"']+["']/i.test(tag)) {
        issues.push({
          rule: 'responsive-image',
          severity: 'warning',
          line: idx + 1,
          message: 'Image element missing descriptive alt text for accessibility.',
          match: tag
        });
      }
    }
  });

  return issues;
}
