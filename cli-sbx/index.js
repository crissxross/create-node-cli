#!/usr/bin/env node

/**
 * cli-sbx
 * CLI sandbox for testing packages
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import figlet from 'figlet';

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const printMsg = figlet.textSync(`crissxross.net`, {
	// font: 'Ghost',
	horizontalLayout: 'default',
	verticalLayout: 'default',
	width: 80,
	whitespaceBreak: true
});
console.log(printMsg);

debug && log(flags);
