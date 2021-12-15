const gpg = require("gpg")
const privateKey = KEY_HERE

const fileEncrypted = path.join(__dirname, "/file.txt.gpg")
const fileDecrypted = path.join(__dirname, "/file.txt")

gpg.importKey(privateKey, [], (success, err) => {
  // args needed in order to skip the password entry - can only
  // be used with callStreaming
  const args = [
    "--pinentry-mode",
    "loopback",
    "--passphrase",
    process.env.PGP_PASS,
  ]
  gpg.callStreaming(fileEncrypted, fileDecrypted, args, (err, success) => {
    // success/err
  })
})

const gpg = require("gpg")
const privateKey = KEY_HERE

const fileEncrypted = path.join(__dirname, "/file.txt.gpg")
const fileDecrypted = path.join(__dirname, "/file.txt")

gpg.importKey(privateKey, [], (success, err) => {
  gpg.decryptToFile(
    {
      source: fileEncrypted,
      dest: fileDecrypted,
    },
    (err, success) => {
      // success/err
    }
  )
})