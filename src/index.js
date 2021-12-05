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