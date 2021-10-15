import meow from 'meow';
import cliMeowHelp from 'cli-meow-help';

const flags = {
  clear: {
    type: `boolean`,
    default: true,
    alias: `c`,
    desc: `Clear the console`,
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
  },
};

const commands = {
  help: {
    description: `Print help info`,
  }
};

const helpText = cliMeowHelp({
  name: `{{command}}`,
  flags,
  commands,
});

const options = {
  importMeta: import.meta,
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

const cli = meow(helpText, options);

export { cli }