import test from 'ava';
import execa from 'execa';

const minimal = [`-m`, `true`];

test(`main`, async t => {
	const { stdout } = await execa(`./index.js`, [
		`some text       `,
		...minimal
	]);
	t.is(stdout, `some-text`);
});

test(`flag: separator`, async t => {
	const { stdout } = await execa(`./index.js`, [
		`some text       `,
		`--separator`,
		`_`,
		...minimal
	]);
	t.is(stdout, `some_text`);
});
