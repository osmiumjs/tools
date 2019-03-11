const term = require('terminal-kit').terminal;
const fs = require('fs-extra');
var spawn = require('child_process').spawn;
const path = require('path');

function getPath(src) {
	return path.join(__dirname, src);
}

function printOk() {
	term.left(100).right(30).green(' [OK]\n');
}

function run(what, args, showStdout = false) {
	return new Promise((resolve, reject) => {
		if (what.toLowerCase().trim() === 'npm' && /^win/.test(process.platform)) what = 'npm.cmd';

		let buf = '';
		const sp = spawn(what, args.split(' '));
		sp.stdout.on('data', (data) => {
			buf += data;
			if (!showStdout) return;
			term(`\n${data.toString()}`);
		});

		sp.stderr.on('data', function (data) {
			const msg = data.toString().trim();
			if (!msg) return;
			reject(`\n${buf}`);
		});

		sp.on('error', reject);
		sp.on('exit', resolve);
	});
}

const pckg = require('../package.json');

async function clean() {
	term('Remove dist:');
	if (await fs.exists(getPath('../dist'))) {
		await fs.remove(getPath('../dist'));
	}
	printOk();

	term('Remove docs:');
	if (await fs.exists(getPath('../docs'))) {
		await fs.remove(getPath('../docs'));
	}
	printOk();
}

(async () => {
	term.bold(`${pckg.name} build script, v.: ${pckg.version}\n\n`);
	try {
		await clean();

		term('Compile sources:');
		await run('npm', 'run _compile');
		printOk();

		term('Build docs:');
		await run('npm', 'run _make_docs');
		printOk();

		term('Run test:');
		await run('npm', 'run test');
		printOk();
		term.bold('\nDone\n');

	} catch (err) {
		term.red(`${err}\n`);
	}
})();
