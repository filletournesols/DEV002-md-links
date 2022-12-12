const { mdLinks } = require("./mdLinks.js")
const route = process.argv[2];
const argumentos = process.argv

try {
    mdLinks(route, argumentos).then(console.log).finally(console.log) /* .catch() */
} catch (error) {
    console.log({error})
}

/* 
./mdtests/part1.md
./mdtests
node index.js ./mdtests
node index.js ./mdtests --validate
node index.js ./mdtests --stats
node index.js ./mdtests --validate --stats
*/