#!/usr/bin/env node

/**
 * cli-survey
 * A survey inside a CLI
 *
 * @author Christine Wilks <https://crissxross.net>
 */
import enquirerPkg from 'enquirer';
const { Survey } = enquirerPkg;

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const prompt = new Survey({
	name: 'experience',
	message: 'Please rate your experience',
	scale: [
		{ name: '1', message: 'Strongly Disagree' },
		{ name: '2', message: 'Disagree' },
		{ name: '3', message: 'Neutral' },
		{ name: '4', message: 'Agree' },
		{ name: '5', message: 'Strongly Agree' }
	],
	margin: [0, 0, 2, 1],
	choices: [
		{
			name: 'interface',
			message: 'The website has a friendly interface.'
		},
		{
			name: 'navigation',
			message: 'The website is easy to navigate.'
		},
		{
			name: 'images',
			message: 'The website usually has good images.'
		},
		{
			name: 'upload',
			message: 'The website makes it easy to upload images.'
		},
		{
			name: 'colors',
			message: 'The website has a pleasing color palette.'
		}
	]
});

prompt
	.run()
	.then(value => console.log('ANSWERS:', value))
	.catch(console.error);

debug && log(flags);
