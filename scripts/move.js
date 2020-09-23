const fs = require('fs')

console.log('Renaming ./build to ./docs...')
fs.rename('./build', './docs').then(() => {
    console.log('Done!')
})