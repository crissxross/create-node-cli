import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: {
		description: `Print help info`
	}
};

const helpText = meowHelp({
	name: `cli-sbx`,
	flags,
	commands
});

const options = {
	importMeta: import.meta,
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

const cli = meow(helpText, options);

export { cli };