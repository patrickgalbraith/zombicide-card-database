// Simple Nodejs script to generate equipment divs.

var fs = require('fs');
var path = require('path');

var out = '';
var set = 'blackplague';
var files = fs.readdirSync('../img/cards/'+set);

files.forEach(function(file) {
  out += '<div class="card equipment set-'+set+'">'+"\n"+
    '    <img width="320" height="440" src="img/cards/equipment/'+set+'/'+path.basename(file)+'" alt="'+path.basename(file, '.jpg')+'">'+"\n"+
    '</div>'+"\n";
});

fs.writeFile('output.txt', out);