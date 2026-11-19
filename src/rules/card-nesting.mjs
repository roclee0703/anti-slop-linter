/**
 * Rule: card-nesting
 * Flags excessive nesting of bordered/shadowed card containers.
 */
export function checkCardNesting(source) {
  const issues = [];
  const cardPattern = /border\s+rounded|rounded-(?:xl|2xl|lg)\s+shadow|bg-white.*shadow/i;

  const lines = source.split('\n');
  let openDepth = 0;
  let cardCountInStack = 0;

  lines.forEach((line, idx) => {
    const isTagOpen = /<div|<section|<article/i.test(line);
    const isTagClose = /<\/div>|<\/section>|<\/article>/i.test(line);
    const hasCardStyle = cardPattern.test(line);

    if (isTagOpen) {
      openDepth++;
      if (hasCardStyle) {
        cardCountInStack++;
        if (cardCountInStack >= 3) {
          issues.push({
            rule: 'card-nesting',
            severity: 'warning',
            line: idx + 1,
            message: `Deeply nested card container (depth ${cardCountInStack}). Avoid "cards-inside-cards" visual fatigue.`
          });
        }
      }
    }

    if (isTagClose) {
      if (cardCountInStack > 0) cardCountInStack--;
      if (openDepth > 0) openDepth--;
    }
  });

  return issues;
}
