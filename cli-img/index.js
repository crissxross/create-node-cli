#!/usr/bin/env node

/**
 * cli-img
 * CLI to resize and optimze images
 *
 * @author Christine Wilks <https://crissxross.net>
 */
import ora from 'ora';
import chalk from 'chalk';
import alert from 'cli-alerts';
import resizeOptimizeImages from 'resize-optimize-images';
import { globby } from 'globby';

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug, source, width, quality } = flags;
const spinner = ora({ text: `` });

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

if (source) {
	const images = await globby(source);

	const options = {
		images,
		width: width ? width : 1920,
		quality: quality ? quality : 90
	};
	spinner.start(
		`${chalk.yellow(`RUNNING`)} resize & optimize task on ${
			images.length
		} images`
	);
	await resizeOptimizeImages(options);
	spinner.succeed(
		`${chalk.green(`${images.length} IMAGES`)} resized & optimized`
	);
} else {
	alert({
		type: `error`,
		msg: `You forgot to specify --source flag`
	});
}

debug && log(flags);
