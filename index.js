var qt5 = require('./qt5.js');
var qt6 = require('./qt6.js');
const shell = require('shelljs')

function cmpVersions (a, b) {
    // Source https://stackoverflow.com/a/16187766/2127939
    var i, diff;
    var regExStrip0 = /(\.0+)+$/;
    var segmentsA = a.replace(regExStrip0, '').split('.');
    var segmentsB = b.replace(regExStrip0, '').split('.');
    var l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff) {
            return diff;
        }
    }
    return segmentsA.length - segmentsB.length;
}

function checkoutQtBase(qtVersion) {
    shell.cd(process.env['RUNNER_WORKSPACE']);
    shell.exec('git clone git://code.qt.io/qt/qtbase.git');
    shell.cd("qtbase");
    shell.exec('git checkout ' + qtVersion);
}

function main() {

    const qtVersion = process.env['INPUT_QT-VERSION'];

    checkoutQtBase(qtVersion);

    if(cmpVersions(qtVersion, "5.0.0") >= 0 && cmpVersions(qtVersion, "6.0.0") < 0 ) {
        qt5.install();
    } else if ( cmpVersions(qtVersion, "6.0.0") >= 0) {
        qt6.install();
    } else {
        console.error("Not supported Qt version")
    }
}

main();