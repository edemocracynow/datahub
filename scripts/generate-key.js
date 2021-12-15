// generate-key.js
const openpgp = require("openpgp");

generate();
async function generate() {
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ name: "person", email: "person@somebody.com" }],
    curve: "ed25519",
    passphrase: "pass",
  });
  console.log(privateKeyArmored);
  console.log(publicKeyArmored);
}