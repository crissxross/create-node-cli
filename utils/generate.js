import { fileURLToPath } from 'url';
import path from 'path';
import cliAlerts from 'cli-alerts';
import copyTemplateDir from 'copy-template-dir';
import chalk from 'chalk';
import { questions } from './questions.js';

// __filename and __dirname are from CommonJS, so create equivalents in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(`import.meta.url:`, import.meta.url);
const green = chalk.green;
const dim = chalk.dim;

const generate = async () => {
  const vars = await questions();
  const outDir = vars.name;
  const inDirPath = path.join(__dirname, '../template');
  const outDirPath = path.join(process.cwd(), outDir);

  copyTemplateDir(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;

    console.log(dim(`\nCreating files in ${green(`./${outDir}`)} directory:\n`));

    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath);
      console.log(`${green.dim(`CREATED`)} ${fileName}`)
    });

    cliAlerts({
      type: `success`,
      name: `ALL DONE`,
      msg: `\n${createdFiles.length} files created in ${dim(`./${outDir}`)} directory`
    });

  });
}

export { generate }
