var replace = require("replace");
let shell = require('shelljs');

let output = shell.exec("cat ./docker-compose/docker-compose.yml | grep :/var/www/html:z", {silent: true}).stdout;
console.log(output);

let volumeInfo = output.split(":");
console.log(volumeInfo[0]);
let localFolder = volumeInfo[0].split(" ");
console.log(localFolder[4]);

replace({
  regex: localFolder[4],
  replacement: "ndsvdsgafd",
  paths: ['./docker-compose/docker-compose.yml'],
  recursive: true,
  silent: true,
});
