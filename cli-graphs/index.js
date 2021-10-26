#!/usr/bin/env node

/**
 * cli-graphs
 * CLI with graphs and charts
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import blessed from 'blessed';
import contrib from 'blessed-contrib';
const screen = blessed.screen();

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const line = contrib.line({ label: `Line Graph` });
const data = {
	x: [`ONE`, `TWO`, `THREE`, `FOUR`],
	y: [1, 8, 4, 9]
};

screen.append(line);
line.setData([data]);

screen.key(['q', 'escape'], () => {
	return process.exit(0);
});

screen.render();

debug && log(flags);
