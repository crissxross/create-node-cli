import { readFile } from 'fs/promises';
import cliWelcome from 'cli-welcome';
import cliHandleUnhandled from 'cli-handle-unhandled';

const pkg = JSON.parse(
  await readFile(
    new URL('./../package.json', import.meta.url)
  )
);

const init = ({ clear = true }) => {
  cliHandleUnhandled();
  cliWelcome({
    title: `{{name}}`,
		tagLine: `by {{authorName}}`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#6cc24a',
		color: '#000000',
		bold: true,
		clear,
  })
}

export { init }
