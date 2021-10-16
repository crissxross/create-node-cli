import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import enquirerPkg from 'enquirer';
const { Input } = enquirerPkg; // because it's a CommonJS package
import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import shouldCancel from 'cli-should-cancel';
import storePkg from 'data-store';
const { Store } = storePkg;

// __filename and __dirname are from CommonJS, so create equivalents in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ask = async ({ name, message, hint, initial }) => {
	let history = false;
	if (
		!initial &&
		name !== `name` &&
		name !== `command` &&
		name !== `description`
	) {
		history = {
			autosave: true,
			store: new Store({
				path: path.join(__dirname, `/../.history/${name}.json`)
			})
		};
	}
	const [err, response] = await to(
		new Input({
			name,
			message,
			hint,
			initial,
			history,
			validate(value, state) {
				if (state && state.name === `command`) return true;
				if (state && state.name === `name`) {
					if (fs.existsSync(value)) {
						return `Directory already exists: ./${value}`;
					} else {
						return true;
					}
				}
				return !value ? `Please add a value.` : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);

	return response;
};

export { ask };
