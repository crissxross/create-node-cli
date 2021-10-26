import { readFile } from 'fs/promises';
import welcome from 'cli-welcome';
import handleUnhandled from 'cli-handle-unhandled';
import updateNotifier from 'update-notifier';

const pkg = JSON.parse(
	await readFile(new URL('./../package.json', import.meta.url))
);

const init = ({ clear = true }) => {
	handleUnhandled();
	welcome({
		title: `cli-update`,
		tagLine: `by Christine Wilks`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#6cc24a',
		color: '#000000',
		bold: true,
		clear
	});
};
updateNotifier({ pkg }).notify();

// RUN AN EXAMPLE by uncommenting the updateNotifier code below
// You have to run this file two times the first time
// This is because it never reports updates on the first run
// If you want to test your own usage, ensure you set an older version
// updateNotifier({
// 	pkg: {
// 		name: 'create-node-cli',
// 		version: '0.1.2'
// 	},
// 	updateCheckInterval: 0
// }).notify();

export { init };
