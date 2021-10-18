#!/usr/bin/env node

/**
 * wifi-pswd
 * Get a saved WiFi password
 *
 * @author Christine Wilks <https://crissxross.net>
 */
import wifiPassword from 'wifi-password';
import alert from 'cli-alerts';

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

const password = await wifiPassword();
// OR input the name of another known wifi network
// const password = await wifiPassword(input[0]);

alert({
	type: `info`,
	name: `WiFi Password`,
	msg: password
});

debug && log(flags);
