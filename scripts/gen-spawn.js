// Simple Nodejs script to generate spawn divs.

var fs = require('fs');

var out = '';

for(var i = 1; i <= 144; i++) {
    out += '<div class="card spawn set-1">'+"\n"+
    '    <img src="img/cards/spawn/'+i+'.jpg" alt="">'+"\n"+
    '</div>'+"\n";
}

fs.writeFile('output.txt', out);