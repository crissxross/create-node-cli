import fs from 'fs';
import enquirerPkg from 'enquirer';
const { Input } = enquirerPkg; // because it's a CommonJS package
import { to } from 'await-to-js';
import cliHandleError from 'cli-handle-error';
import cliShouldCancel from 'cli-should-cancel';

const ask = async ({ name, message, hint, initial }) => {
	const [err, response] = await to(
		new Input({
			name,
			message,
			hint,
			initial,
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
			.on(`cancel`, () => cliShouldCancel())
			.run()
	);
	cliHandleError(`INPUT`, err);

	return response;
};

export { ask };
