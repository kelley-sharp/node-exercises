const fs = require('fs');
const axios = require('axios');

let toRead = process.argv[2];

if (!toRead) {
  console.log('Nothing is here to read');
  process.exit(1);
}

if (toRead.slice(0, 4) === 'http') {
  webCat(toRead);
} else {
  cat(toRead);
}

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err.message);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(`response from ${url}: ${response.data}`);
  } catch (err) {
    console.error(`error getting response from ${url}: ${err.message}`);
  }
}
