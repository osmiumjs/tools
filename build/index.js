const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

(async () => {
	try {
		if (fs.existsSync(path.join(__dirname, '../dist'))) {
			fs.remove(path.join(__dirname, '../dist'));
		}
		console.log('Removed /dist ...');
		if (fs.existsSync(path.join(__dirname, '../docs'))) {
			fs.remove(path.join(__dirname, '../docs'));
		}
		console.log('Removed /docs ...');
		await exec('npm run _build', {
			cwd: path.join(__dirname, '../')
		});
		console.log('Built source ...');
		await exec('npm run _build_docs', {
			cwd: path.join(__dirname, '../')
		});
		console.log('Built docs ...');
		await exec('npm run test', {
			cwd: path.join(__dirname, '../')
		});
		console.log('Tests ok');
		console.log('Done');
	} catch (e) {
		console.error(e);
	}
})();