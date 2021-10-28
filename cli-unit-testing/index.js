#!/usr/bin/env node

/**
 * cli-unit-testing
 * CLI unit testing
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import slugify from '@sindresorhus/slugify';

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const text = input[0];
const flags = cli.flags;
const { clear, debug, minimal } = flags;

init({ clear, minimal });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

console.log(slugify(text, flags));

debug && log(flags);
