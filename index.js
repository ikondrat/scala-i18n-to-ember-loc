#!/usr/bin/env node
var fs = require("fs"),
  sourceFile = process.argv[2],
  targetFile = process.argv[3];

module.exports = {
  normalize(str) {
    var normString = str.replace(/^#.+\n/gm, '')
      .replace(/^\n/gm, '')
      .replace(/\\\n\s+/gm, '')
      .replace(/\{(\d+)\}/gm, function() { return '%@' + (parseInt(arguments[1], 10) + 1); })
      .trim();

    return normString;
  },
  getContent(sourceFile) {
    return this.getJSONByContent(
      this.normalize(
        this.getFileContent(sourceFile)
      )
    );
  },
  getJSONByContent(content) {
    var res = {},
      lines = content.split(/\n/);

    lines.forEach((line) => {
      var parts = line.split("="),
      key = parts[0];

    res[key] = parts.slice(1).join("=");
  });
    return res;
  },
  getFileContent(source) {
    return fs.readFileSync(source, 'utf8');
  },
  run(sourceFile, targetFile) {
    fs.writeFile(
      targetFile,
      `/* generated by scala-i18n-to-ember-loc from ${sourceFile} */\n` +
      'Ember.STRINGS=' + JSON.stringify(this.getContent(sourceFile), null, 2) + ';',
      (err) => {
      if (err) throw err;
    console.log(`Migration done from ${sourceFile} to ${targetFile}`);
  }
  );
  }
};

if (sourceFile && targetFile) {
  module.exports.run(
    sourceFile,
    targetFile
  );
}

