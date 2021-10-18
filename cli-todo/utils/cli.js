import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	clear: {
		type: `boolean`,
		default: true,
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
	view: { desc: `View or list all todos` },
	ls: { desc: `View or list all todos` },
	add: { desc: `Add a new todo` },
	del: { desc: `Remove (del) selected todos` },
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `todo`,
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
