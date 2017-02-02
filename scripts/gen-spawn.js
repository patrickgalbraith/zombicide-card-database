// Simple Nodejs script to generate spawn divs.

var fs = require('fs');

var out = '';

for(var i = 145; i <= 246; i++) {
    out += '<div class="card spawn set-1">'+"\n"+
    '    <img width="320" height="440" src="img/loading-card.png" data-original="img/cards/spawn/'+i+'.jpg" alt="">'+"\n"+
    '</div>'+"\n";
}

fs.writeFile('output.txt', out);