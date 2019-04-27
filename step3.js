const fs = require('fs');
const axios = require('axios');

let thirdArg = process.argv[2];

if (!thirdArg) {
  console.log('Nothing is here to read or write');
  process.exit(1);
}

if (thirdArg === '--out') {
  let outputFilePath = process.argv[3];
  let inputFilePath = process.argv[4];

  if (!outputFilePath) {
    console.log('there is no data provided to write to file with');
    process.exit(1);
  }

  if (!inputFilePath) {
    console.log('there is no file to write to');
    process.exit(1);
  }

  handleWriteFile(inputFilePath, outputFilePath);
} else {
  let path = thirdArg;
  if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }
}

async function handleWriteFile(inputFilePath, outputFilePath) {
  let data;

  if (inputFilePath.slice(0, 4) === 'http') {
    data = (await axios.get(inputFilePath)).data;
  } else {
    data = fs.readFileSync(inputFilePath, 'utf8');
  }

  fs.writeFile(outputFilePath, data, err => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log(
      `successfully wrote from ${inputFilePath} to ${outputFilePath}`
    );
  });
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
