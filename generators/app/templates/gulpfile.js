'use strict';

require('fs')
  .readdirSync('./gulp')
  .filter(file => file.match(/^[a-z][\w\-]+\.js$/))
  .forEach(file => require(`./gulp/${file}`));

