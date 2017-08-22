
//quando trabalhamos com o child_process
//criamos um novo processo assim não atrapalhando o fluxo principal
//e por consequencia evitando travamentos em outros usuarios

var child_process = require('child_process');

console.log(1);

var newProcess = child_process.spawn('node', ['_fibonacci'],{
    stdio : 'inherit'
});

console.log(2);
