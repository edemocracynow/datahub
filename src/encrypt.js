const amqp = require('amqplib/callback_api');
const rabbit = process.env.RABBIT_HOST || "localhost:5672";
const user = process.env.RABBIT_USER || "bureaudevote";
const pass = process.env.RABBIT_PASSWORD || "bureaudevote";
const queue = "messages";
const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp

(async () => {

	function send(msg) {
		amqp.connect(`amqp://${user}:${pass}@${rabbit}`, function(error, connection) {
			if (error) {
				throw error;
			}
			connection.createChannel(function(error1, channel) {
				if (error1) {
					throw error1;
				}
				channel.assertQueue(queue, {
					durable: false
				});

				var options = {
					persistent: true,
					noAck: false,
					timestamp: Date.now(),
					contentEncoding: "utf-8",
					contentType: "application/json"
				};
				channel.sendToQueue(queue, Buffer.from(JSON.stringify({ message_content: msg, consultation_id: 1 })), options);
				console.log("Sent '%s'", msg);
			});
			setTimeout(function() {
				connection.close();
				process.exit(0)
			}, 500);
		});
	}

	// put keys in backtick (``) to avoid errors caused by spaces or tabs
	const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.10\r\nComment: https://openpgpjs.org\r\n\r\nxjMEYbTXZxYJKwYBBAHaRw8BAQdAhAwL+0YR9+YNcD+mfCD6Hi759a5pryyk\r\ngb1Yphgz22XNL01haXJpZSBkZSBWYWxsYXVyaXMgPG1haXJpZXZhbGxhdXJp\r\nc0Bxd2FudC5jb20+wo8EEBYKACAFAmG012cGCwkHCAMCBBUICgIEFgIBAAIZ\r\nAQIbAwIeAQAhCRCyx0HBN5TKRxYhBBKOONmFqzvDpV8/a7LHQcE3lMpHN2kB\r\nAMR1sYSQUJp0+bhZRBPpQ46DeDSYS2cjHBMb+rBZxRw/AP9EiTNFZCUF+A8m\r\nzmhovrGB4q7nZVtsjkDHMhjjvVlSBc44BGG012cSCisGAQQBl1UBBQEBB0BK\r\n5SHFGvG2I88HOffcmx2J2z2BXj29WSPlxn0lPjXQLwMBCAfCeAQYFggACQUC\r\nYbTXZwIbDAAhCRCyx0HBN5TKRxYhBBKOONmFqzvDpV8/a7LHQcE3lMpHueAB\r\nAKAklKp4zJnwq7ItJfuFDGaP68FoHF7TLuGky4208AjhAQCq0kQ9LgVMR9Fr\r\nAYuZ09EoebMPjkf2ZSFATsDJqeGxDw==\r\n=t1un\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n`;
	const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.10\r\nComment: https://openpgpjs.org\r\n\r\nxYYEYbTXZxYJKwYBBAHaRw8BAQdAhAwL+0YR9+YNcD+mfCD6Hi759a5pryyk\r\ngb1Yphgz22X+CQMI57IDJsBJl63gohvZ41RlCreh+P88YPQHTAUnJ+Q/BeEV\r\nS2vJ3yd/wShsauqo098IBtYTZAfB5vnSUaiB2/Tk5CYUEA9JSmvL5VoFYoXL\r\nWM0vTWFpcmllIGRlIFZhbGxhdXJpcyA8bWFpcmlldmFsbGF1cmlzQHF3YW50\r\nLmNvbT7CjwQQFgoAIAUCYbTXZwYLCQcIAwIEFQgKAgQWAgEAAhkBAhsDAh4B\r\nACEJELLHQcE3lMpHFiEEEo442YWrO8OlXz9rssdBwTeUykc3aQEAxHWxhJBQ\r\nmnT5uFlEE+lDjoN4NJhLZyMcExv6sFnFHD8A/0SJM0VkJQX4DybOaGi+sYHi\r\nrudlW2yOQMcyGOO9WVIFx4sEYbTXZxIKKwYBBAGXVQEFAQEHQErlIcUa8bYj\r\nzwc599ybHYnbPYFePb1ZI+XGfSU+NdAvAwEIB/4JAwgj62+jC1jm/OBouK84\r\n3tg8QBAj02UmpKWuv+69ExpOZsPnNocbtMeVp5L/Dzqr2M8aamTfH2cvVtD+\r\nCbKSZCSyeIW+EoW1DBFSS9epsHAMwngEGBYIAAkFAmG012cCGwwAIQkQssdB\r\nwTeUykcWIQQSjjjZhas7w6VfP2uyx0HBN5TKR7ngAQCgJJSqeMyZ8KuyLSX7\r\nhQxmj+vBaBxe0y7hpMuNtPAI4QEAqtJEPS4FTEfRawGLmdPRKHmzD45H9mUh\r\nQE7AyanhsQ8=\r\n=SLYb\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n`;
	// encrypted private key
	const passphrase = `pass`; // what the private key is encrypted with

	const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
	await privateKey.decrypt(passphrase);

	const { data: encrypted } = await openpgp.encrypt({
		message: openpgp.message.fromText('Hello, World!'),                 // input as Message object
		publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
		privateKeys: [privateKey]                                           // for signing (optional)
	});
	console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
	const { data: decrypted } = await openpgp.decrypt({
		message: await openpgp.message.readArmored(encrypted),              // parse armored message
		publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
		privateKeys: [privateKey]                                           // for decryption
	});
	console.log(decrypted); // 'Hello, World!'

	const { data: cleartext } = await openpgp.sign({
		message: openpgp.cleartext.fromText('Hello, World!'), // CleartextMessage or Message object
		privateKeys: [privateKey]                             // for signing
	});
	console.log(cleartext); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'

	send(cleartext)

	const verified = await openpgp.verify({
		message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
		publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
	});
	const { valid } = verified.signatures[0];
	if (valid) {
		console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
	} else {
		throw new Error('signature could not be verified');
	}

})();