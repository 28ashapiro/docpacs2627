require('dotenv').config();

console.log('This is the ' + process.env.NAME + ' program');
console.log('This program is hosted on Port: ' + process.env.PORT);
console.log('This program is being used by ' + process.env.USER);

console.log();

const hello = ["World", "Mr. Smith", "Node.JS"];
for (let run = 1; run <= hello.length; run++) { console.log("Hello " + hello[run-1]); }
console.log(1);
console.log("3^2 * 7 - 4 =");
console.log(3^2*7-4);