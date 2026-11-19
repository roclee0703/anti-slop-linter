import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { lintFrontendCode } from '../src/linter.mjs';

describe('Anti-Slop Frontend Linter', () => {
  it('flags multiple issues on sloppy LLM component', () => {
    const sloppy = fs.readFileSync('tests/fixtures/sloppy-component.jsx', 'utf-8');
    const report = lintFrontendCode(sloppy);

    assert.strictEqual(report.clean, false);
    assert.ok(report.totalIssues >= 4);

    const rulesTriggered = report.issues.map(i => i.rule);
    assert.ok(rulesTriggered.includes('gradient-abuse'));
    assert.ok(rulesTriggered.includes('placeholder-leak'));
    assert.ok(rulesTriggered.includes('card-nesting'));
    assert.ok(rulesTriggered.includes('contrast-check'));
  });

  it('passes completely on clean human-quality component', () => {
    const clean = fs.readFileSync('tests/fixtures/clean-component.jsx', 'utf-8');
    const report = lintFrontendCode(clean);

    assert.strictEqual(report.clean, true);
    assert.strictEqual(report.totalIssues, 0);
  });
});
