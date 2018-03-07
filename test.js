var tradOrSimp = require('./TradOrSimp');

var trad = '這是一個傳統角色';
var simp = '这是一个传统角色';
var detect = '这是一个传统角色這是一';

//check traditional
console.log('Traditional Check: ' + trad);
console.log(tradOrSimp.isTraditional(trad));
console.log('==================================================');

console.log('Traditional Check False: ' + simp);
console.log(tradOrSimp.isTraditional(simp));
console.log('==================================================\n\n');


//check simplified
console.log('Simplified Check: ' + simp);
console.log(tradOrSimp.isSimplified(simp));
console.log('==================================================');

console.log('Simplified Check False: ' + trad);
console.log(tradOrSimp.isSimplified(trad));
console.log('==================================================\n\n');


//detect
console.log('Detect: ' + detect);
console.log(tradOrSimp.detect(detect));
console.log('==================================================');