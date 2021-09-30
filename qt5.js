const execSync = require("child_process").execSync;
const fs = require('fs');
const os = require('os');
const path = require('path');
const process = require('process');
const spawnSync = require('child_process').spawnSync;
const shell = require('shelljs')
const core = require('@actions/core')

var config = {};
var installModules = [];



function configureMySQL() {
    const pathMySQL = process.env['INPUT_MYSQL-PATH'];
    const installMySQL = process.env['INPUT_MYSQL-INSTALL'].toLowerCase();
    if(installMySQL !== "true") {
      return;
    }
    if ( process.platform == "win32" ) {
        if( pathMySQL && fs.lstatSync(pathMySQL).isDirectory()){
            config["MYSQL_INCDIR"] = path.join(pathMySQL, "include");
            config["MYSQL_LIBDIR"] = path.join(pathMySQL, "lib");
        }
    }
    installModules.push("sub-mysql");
    installModules.push("sub-mysql-install_subtargets");    
}

function configurePostgresql() {
    const pathPostgresql = process.env['INPUT_POSTGRESQL-PATH'];
    const installPostgresql = process.env['INPUT_POSTGRESQL-INSTALL'].toLowerCase();
    if(installPostgresql !== "true") {
      return;
    }
    if ( process.platform == "win32" ) {
        if(pathPostgresql && fs.lstatSync(pathPostgresql).isDirectory()){
            config["PSQL_INCDIR"] = path.join(pathPostgresql, "include");
            config["PSQL_LIBDIR"] = path.join(pathPostgresql, "lib");
        }
    }
    installModules.push("sub-psql");
    installModules.push("sub-psql-install_subtargets");
}

function configure() {
    configureMySQL();
    configurePostgresql();
}

function getMakeCommand() {
    if (process.platform == 'darwin') {
        return "make";
    } else if (process.platform == 'win32') {
        return "nmake";
    } else if (process.platform == 'linux') {
        return "sudo make";
    } else {
        core.error(process.platform + " is not supported");
        return "";
    }
}

function installQt() {
    commandLine = "qmake -makefile --"
    for ( var key in config ) {
        commandLine += " " + key + "=\"" + config[key]+"\"";
    }

    core.error("Config line:", commandLine);
    const workspace = process.env['RUNNER_WORKSPACE'];
    sqlPath = path.join(workspace, "/qtbase/src/plugins/sqldrivers");
    core.addPath(path.join(sqlPath, "/plugins/sqldrivers"));
    shell.cd(sqlPath);
    shell.exec(commandLine);
    makeCommand = getMakeCommand();
    for (const target of installModules) {
        command = makeCommand + " " + target;
        core.error("install line:", command);
        shell.exec(command);
    }
}

module.exports = {
    install: function() {
        configure();
        installQt();
    }
}
