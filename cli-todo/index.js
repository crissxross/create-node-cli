#!/usr/bin/env node

/**
 * cli-todo
 * CLI to manage todos anywhere
 *
 * @author Christine Wilks <https://crissxross.net>
 */

import fs from 'fs';
import makeDir from 'make-dir';
import { join, dirname } from 'path';
import chalk from 'chalk';
import alert from 'cli-alerts';
import { chain } from 'lodash-es';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Database
// const dbTodos = join(process.cwd(), `.todo/todos.json`);
const dbTodos = join(__dirname, `.todo/todos.json`);

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';
import { log } from './utils/log.js';
import { ask } from './utils/ask.js';
import { select } from './utils/select.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const green = chalk.green;
const red = chalk.red;
const yellow = chalk.yellow;
const dim = chalk.dim;

init({ clear });
input.includes(`help`) && cli.showHelp(0); // exitcode 0 = cli exited without error

if (!fs.existsSync(dbTodos)) {
	await makeDir(`.todo`);
	process.chdir(`.todo`);
	// fs.writeFileSync(`todos.json`, `{}`);
}
// console.log('dbTodos:', dbTodos);

const adapter = new JSONFile(dbTodos);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// Set default data
db.data = db.data || { todos: [] };

// Write db.data content to db.json
await db.write();

// COMMAND: todo view or todo ls
if (input.includes(`view`) || input.includes(`ls`)) {
	// Query items using plain JS
	const allTodos = db.data.todos;
	// console.log('allTodos:', allTodos);
	allTodos.map((todo, i) => console.log(`${dim(`${++i}.`)} ${todo.title}`));
	console.log(`\n${yellow.inverse(` TOTAL `)} ${allTodos.length}`);
}

// COMMAND: todo add
if (input.includes(`add`)) {
	const whatTodo = await ask({ message: `Add a todo` });
	console.log(`whatTodo: `, whatTodo);
	db.data.todos.push({ title: whatTodo });
	await db.write();
	alert({
		type: `success`,
		name: `ADDED`,
		msg: `successfully`
	});
}

// COMMAND: todo del
if (input.includes(`del`)) {
	const allTodos = db.data.todos;
	const toDels = await select({
		choices: allTodos,
		message: `Complete todos:`
	});
	// FIXME This removes the selected todo but writes a weird result to db
	db.chain = chain(db.data);
	// now using db.chain to utilize lodash API
	toDels.map(todoTitle =>
		db.chain.get(`todos`).remove({ title: todoTitle }).value()
	);
	// this writes WAY TOO MUCH back to db
	await db.write();
	alert({
		type: `success`,
		name: `COMPLETED`,
		msg: `${toDels.length} todos`
	});
}

debug && log(flags);

// NOTES....................

// Re. COMMAND: todo del (see above)

// I tried to use filter to remove todos but what I wrote below does NOT work:

// toDels.map(todoTitle =>
// 	allTodos.filter(todoTitle => ({ title: todoTitle }))
// );
