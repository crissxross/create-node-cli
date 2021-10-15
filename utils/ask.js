import enquirerPkg from 'enquirer';
// because it's a CommonJS package
const { Input } = enquirerPkg;
import { to } from 'await-to-js';
import cliHandleError from 'cli-handle-error';
import cliShouldCancel from 'cli-should-cancel';

const ask = async ({ message, hint, initial }) => {
  const [err, response] = await to(
    new Input({
      message,
      hint,
      initial,
      validate(value) {
        return !value ? `Please add a value.` : true;
      },
    })
      .on(`cancel`, () => cliShouldCancel())
      .run()
  );
  cliHandleError(`INPUT`, err);

  return response;
};

export { ask };
