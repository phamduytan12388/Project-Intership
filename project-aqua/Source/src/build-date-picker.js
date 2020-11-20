const fs = require('fs');

fs.copyFileSync(
  './build/ng-zorro-antd-date-picker.js',
  './node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd-date-picker.js',
  fs.constants.COPYFILE_FICLONE
);

