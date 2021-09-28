const execSync = require("child_process").execSync;
const fs = require('fs');
const os = require('os');
const path = require('path');
const process = require('process');
const spawnSync = require('child_process').spawnSync;
const shell = require('shelljs')

var config = {};
var installModules = [];

function checkoutQtBase(qtVersion) {
    shell.cd(process.env['RUNNER_WORKSPACE']);
    shell.exec('git clone git://code.qt.io/qt/qtbase.git');
    shell.cd("qtbase");
    shell.exec('git checkout ' + qtVersion);
}

function configureMySQL(pathMySQL) {
    config["MYSQL_INCDIR"] = path.join(pathMySQL, "include");
    config["MYSQL_LIBDIR"] = path.join(pathMySQL, "lib");
    installModules.push("sub-mysql");
    installModules.push("sub-mysql-install_subtargets");
    console.error(JSON.stringify(installModules));
}

function configure() {
    const pathMySQL = process.env['INPUT_mysql-path'];
    if(pathMySQL && fs.lstatSync(pathMySQL).isDirectory()){
        configureMySQL(pathMySQL);
    }
}

function install() {
    commandLine = "qmake -makefile --"
    for ( var key in config ) {
        commandLine += " " + key + "=" + config[key];
    }

    console.error("Config line:", commandLine);
    const workspace = process.env['RUNNER_WORKSPACE'];
    sqlPath = path.join(workspace, "/qtbase/src/plugins/sqldrivers");
    shell.cd(sqlPath);
    shell.exec(commandLine);
    for (const target of installModules) {
        command = "nmake " + target;
        console.error("install line:", command);
        shell.exec(command);
    }
}

function main() {
    const qtVersion = process.env['INPUT_qt-version'];

    checkoutQtBase(qtVersion);
    configure();
    install();
}

main();