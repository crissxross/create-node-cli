#!/usr/bin/env node

/**
 * cli-pre-configurable
 * CLI that can be pre-configure with an rc or config file
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import { readFile } from 'fs/promises';
import cosmiconfigPkg from 'cosmiconfig';
const { cosmiconfig } = cosmiconfigPkg;

// ALTERNATIVE WAY OF IMPORTING COMMONJS MODULES IN ESM
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const { cosmiconfig } = require('cosmiconfig');

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const pkg = JSON.parse(
	await readFile(new URL('./package.json', import.meta.url))
);

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const explorer = cosmiconfig(pkg.name);
const data = await explorer.search();
console.log(`package name:`, pkg.name);
console.log('data:', data);
console.log('name: ', data.config.name);

debug && log(flags);

// NOTES

// or you can put confic in package.json (at bottom) like this:

// "cli-pre-configurable": {
//     "name": "Christine",
//     "twitter": "https://twitter.com/crissxross/"
//   }
