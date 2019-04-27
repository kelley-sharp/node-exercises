const fs = require('fs');
const axios = require('axios');

let file = process.argv[2];

if (!file) {
  console.log('file not there');
  process.exit(1);
}

cat(file);

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err.message);
      process.exit(1);
    }
    console.log(data);
  });
}
