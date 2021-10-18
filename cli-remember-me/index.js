#!/usr/bin/env node

/**
 * cli-remember-me
 * CLI that can persist some data
 *
 * @author Christine Wilks <https://crissxross.net>
 */
import Conf from 'conf';
import enquirerPkg from 'enquirer';
const { Input } = enquirerPkg;

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const config = new Conf();

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

let name = config.get(`name`);

if (!name) {
	const askName = await new Input({
		message: `Please enter your name`
	}).run();

	config.set(`name`, askName);
	name = askName;
}

console.log(`name:`, name);

debug && log(flags);

// NOTES.......................

// CODE written initially to learn about Conf possibilities

// const name = config.get(`name`);
// console.log(`name: `, name);

// if (!name) {
// 	config.set(`name`, `Christine`);
// } else {
// 	console.log(`The name in config is ${name}`);
// }

// const before = config.get(`name`);
// console.log(`before: `, before);
// config.delete(`name`);
// const after = config.get(`name`);
// console.log(`after: `, after);
