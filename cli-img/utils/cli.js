import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	source: {
		type: `string`,
		alias: 'i',
		desc: `Source file or directory of images`
	},
	width: {
		type: `number`,
		alias: `w`,
		desc: `Width of images in pixels`
	},
	quality: {
		type: `number`,
		alias: `q`,
		desc: `Quality of images`
	},
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
	help: {
		description: `Print help info`
	}
};

const helpText = meowHelp({
	name: `img`,
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
