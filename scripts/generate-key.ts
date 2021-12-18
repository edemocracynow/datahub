// generate-key.js
const openpgp = require("openpgp");
const fs = require('fs');
const axios = require('axios').default;

const n = "Mario Rossi"
const e = "mario.rossi@qwant.com"
const passphrase = "pass"

generate(n, e);

async function share(key: string) {
	const buff = Buffer.from(n, 'utf-8');
	const base64 = buff.toString('base64');
	console.log(base64)
	const res = await axios.post('http://localhost:4444/user', {
		"token": base64,
		"pub_key": key
	});

	res.data.json;
}

async function generate(n: string, e: string) {
	const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
		userIds: [{ name: n, email: e }],
		curve: "ed25519",
		passphrase: passphrase
	});
	console.log(privateKeyArmored);
	console.log(publicKeyArmored);

	var prefix = n.split(' ').join('_');
	if (!fs.existsSync(`./keys/citizens/${prefix}`)) {
		fs.mkdirSync(`./keys/citizens/${prefix}`, {
			recursive: true
		});
	}
	fs.writeFile(`./keys/citizens/${prefix}/privateKey`, privateKeyArmored, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
	fs.writeFile(`./keys/citizens/${prefix}/pubKey`, publicKeyArmored, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
	
	fs.writeFile(`./keys/citizens/${prefix}/passphrase`, passphrase, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
	
	

	share(publicKeyArmored)
}

