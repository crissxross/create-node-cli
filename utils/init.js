import { readFile } from 'fs/promises';
import welcome from 'cli-welcome';
import handleUnhandled from 'cli-handle-unhandled';

const pkg = JSON.parse(
	await readFile(new URL('./../package.json', import.meta.url))
);

const init = ({ clear = true }) => {
	handleUnhandled();
	welcome({
		title: `create-node-cli`,
		tagLine: `ESM version by crissxross based on CJS version by Awais.dev`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#6cc24a',
		color: '#000000',
		bold: true,
		clear
	});
};

export { init };
