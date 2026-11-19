#!/usr/bin/env node
import process from 'node:process';
import { runCli } from '../src/cli.mjs';

runCli(process.argv).catch(err => {
  console.error('Linter runtime error:', err);
  process.exit(1);
});
