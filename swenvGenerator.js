require('dotenv').config()
const fs = require('fs')

fs.writeFileSync('./public/swenv.js',
`
const process = {
  env: {
    VUE_APP_FIREBASE_CONFIG: '${process.env.VUE_APP_FIREBASE_CONFIG}',
  }
}
`)
