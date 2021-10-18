import enquirerPkg from 'enquirer';
const { Input } = enquirerPkg;
import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import shouldCancel from 'cli-should-cancel';

const ask = async ({ message }) => {
	const [err, response] = await to(
		new Input({
			message,
			validate(value) {
				return !value ? `Please add a value` : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);

	handleError(`INPUT: `, err);
	return response;
};

export { ask };
