const fs = require("fs/promises");

//reescreve fakeData com uma nova array

function writeFile(array) {
  if (array) {
    array = JSON.stringify(array);

    try {
      fs.writeFile(
        "./FakeData.js",
        `const fakeData = ${array};\n\nmodule.exports = fakeData;`,
        "utf-8"
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  writeFile,
};
