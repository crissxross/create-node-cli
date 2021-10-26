#!/usr/bin/env node

/**
 * cli-progress
 * CLI with progress estimation
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import createLogger from 'progress-estimator';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// All configuration keys are optional, but it's recommended to specify a storage location.
// Learn more about configuration options below.
const logger = createLogger({
	storagePath: join(__dirname, '.progress-estimator')
});

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

await logger(sleep(1000), `Doing something else...`, {
	estimate: 10000,
	id: 'task-1'
});

debug && log(flags);
