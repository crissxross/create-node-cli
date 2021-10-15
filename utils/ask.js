import enquirerPkg from 'enquirer';
// because it's a CommonJS package
const { Input } = enquirerPkg;
import { to } from 'await-to-js';
import cliHandleError from 'cli-handle-error';

const ask = async ({ message, hint, initial }) => {
  const [err, response] = await to(
    new Input({
      message,
      hint,
      initial,
    }).run()
  );
  cliHandleError(`INPUT`, err);

  return response;
};

export { ask }
