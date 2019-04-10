var juice = require('./'),
    assert = require('assert'),
    fs = require('fs');

describe('gulp-juice', function () {
    it('should work in buffer mode', function (done) {
        var buf = fs.readFileSync('./test.html'),
            juice = require('./')({}).on('data', function (file) {
                var html = file.contents.toString();
                assert(html.indexOf('<style') === -1,
                    'after juicing should have no style tag');
            }).on('end', done);

        assert(buf.toString().indexOf('<style') > -1,
            'should originally have style tag');
        var wstream = fs.createWriteStream('test.html');
        wstream.write(buf);
        wstream.end();


        juice.end();
    });
});
