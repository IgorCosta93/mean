require('./instantHello');
//recebendo função pelo module.exports e chamando a funcçao pelo nome de variavel atribuida
var goodbye = require('./talk/goodbye');
goodbye();
//Quando queremos referenciar um arquivo o ideal é nao colacar sua extensao tipo .js
//porque ai podemos referenciar um arquivo que nem sera feito aq em seguida referenciando somente a pasta
//quando referenciamos somente a pasta ele ira procurar primeiro por um arquivo chamado com o mesmo nome
// da pasta .js se n encontrar ira procurar pelo index.js oq facilita o serviço
var talk = require('./talk');
//Chamar uma funcçao especifica
talk.intro();
talk.hello("Igor");

var question = require('./talk/question');
var answer = question.ask("What's is the meanin of life?");
console.log(answer);
