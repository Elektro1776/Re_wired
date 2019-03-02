const chalk = require('chalk');

function Stream (){};

Stream.prototype.write = (rec) => {
    console.log('[%s] %s: %s',
        rec.time.toISOString(),
        bunyan.nameFromLevel[rec.level],
        rec.msg);
}

module.exports = Stream;
