import enquirerPkg from 'enquirer';
const { MultiSelect } = enquirerPkg;
import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import shouldCancel from 'cli-should-cancel';
import chalk from 'chalk';

const select = async ({ message, choices }) => {
	const [err, response] = await to(
		new MultiSelect({
			message,
			choices,
			hint: chalk.dim(`\nUse [space] to select & [enter] to submit`),
			validate(value) {
				return value.length === 0
					? `Please select at least one todo`
					: true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);

	handleError(`MULTISELECT: `, err);
	return response;
};

export { select };
