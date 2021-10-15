import cliAlerts from 'cli-alerts';

const log = (info) => {
  cliAlerts({
    type: `warning`,
    name: `DEBUG LOG`,
    msg: ``,
  });

  console.log(info);
  console.log(); // for empty line
}

export { log }
