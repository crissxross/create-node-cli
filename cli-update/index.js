#!/usr/bin/env node

/**
 * cli-update
 * CLI that's aware when it gets updated
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

debug && log(flags);
