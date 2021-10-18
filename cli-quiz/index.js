#!/usr/bin/env node

/**
 * cli-quiz
 * CLI for taking a technical quiz
 *
 * @author Christine Wilks <https://crissxross.net>
 */
import enquirerPkg from 'enquirer';
const { Quiz } = enquirerPkg;

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const prompt = new Quiz({
	message: 'How do you hide a div in CSS?',
	choices: [`dispay: table`, `dispay: none`, `dispay: hide`, `dispay: flex`],
	correctChoice: 1
});

prompt
	.run()
	.then(answer => {
		if (answer.correct) {
			console.log('Correct!');
		} else {
			console.log(`Wrong! Correct answer is ${answer.correctAnswer}`);
		}
	})
	.catch(console.error);

debug && log(flags);
