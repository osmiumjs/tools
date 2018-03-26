module.exports = (tools) => {
	Object.assign(tools, {
		Mkdirp: require('mkdirp'),
		crypto: require('crypto'),
		fs    : require('mz').fs
	});

	Object.assign(tools.fs, {
		FILE: 2,
		DIR : 3,
		ALL : 999
	});

	tools.fs.notExists = async (what) => !await tools.fs.exists(what);
	tools.fs.existsSync = function (path) { //overload deprecated existsSync
		try { tools.fs.accessSync(path, tools.fs.F_OK); } catch (e) { return false; }
		return true;
	};

	tools.fs.getFile = async (path, toString = false, params = {}) => {
		if (!path) return false;
		let cont = await tools.fs.notExists(path) ? false : await tools.fs.readFile(path, params);
		return toString ? cont.toString() : cont;
	};

	tools.fs.isDirectoryExistsSync = (target) =>
		tools.fs.existsSync(target) ? tools.fs.statSync(target).isDirectory() : false;

	tools.fs.isDirectoryExists = async (target) =>
		await tools.fs.exists(target) ? (await tools.fs.stat(target)).isDirectory() : false;

	tools.fs.readJson = async (path) => await tools.fs.exists(path) ? (require(path) || {}) : {};
	tools.fs.mkdirp = (path) => new Promise((resolve) => tools.Mkdirp(path, {}, (err) => resolve(!err)));

	tools.fs.list = async (where, type, ext) => {
		const out = {};
		if (await tools.fs.notExists(where)) return false;
		await tools.iterate(await tools.fs.readdir(where), async (el) => {
			let elInfo = await tools.fs.stat(`${where}/${el}`);
			if (type === tools.fs.FILE) {
				if (ext) if (el.split('.').pop() !== ext) return;
				if (elInfo.isFile()) out[el] = type;
			}
			if (type === tools.fs.DIR) {if (elInfo.isDirectory()) out[el] = type; }
			if (type === tools.fs.ALL) {if (elInfo.isDirectory() || elInfo.isFile()) out[el] = type; }
		});
		if (Object.keys(out).length === 0) return false;
		return out;
	};
	tools.isHash = (what, type = 'sha256') =>
		(new RegExp(`[0-9a-f]{${tools.hash('', type).length}}`, 'i')).test(what);

	tools.exit = (msg, code = 0) => {
		if (msg) console.log(`   ${msg}`);
		process.exit(code);
	};

	tools.error = (code, text) => tools.exit(`[!] application error #${code}:\n\t\t${text}`, code);

	tools.requireTree = async (path, exclude, filterNo = false, allowed = false, allowNoListed = false) => {
		let excludeObj = tools.arrayToObject(exclude);
		return await tools.iterateKeys(await tools.fs.list(path, tools.fs.FILE, 'js'), async (name, _, opt) => {
			let oName = name.slice(0, -3);
			if (filterNo) oName = oName.split('.').slice(1).join('.');
			if (excludeObj[oName]) return;
			if (allowed) {
				if (allowNoListed) {
					if (allowNoListed[oName] && !allowed[oName]) return;
				} else {
					if (!allowed[oName]) return;
				}
			}
			opt.key(oName);
			return require(`${path}/${name}`);
		}, {});
	};

	tools.hash = (what, mode = 'sha256', encoding = 'utf8', digest = 'hex') =>
		tools.crypto.createHash(mode).update(what, encoding).digest(digest);

	tools.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	tools.objectFilter = (what, filter = [], ret = {}) => {
		tools.iterate(what, (row, idx) => { if (filter.find(idx) + 1) ret[idx] = row; });
		return ret;
	};

	tools.require = async (path) => await tools.fs.exists(path) ? require(path) : false;

	tools.streamToBuffer = (stream, buffers = []) => new Promise((resolve) => {
		stream.on('end', () => resolve(Buffer.concat(buffers)));
		stream.on('data', (buffer) => buffers.push(buffer));
	});
};