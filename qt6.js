const execSync = require("child_process").execSync;
const fs = require('fs');
const os = require('os');
const path = require('path');
const process = require('process');
const spawnSync = require('child_process').spawnSync;
const shell = require('shelljs')
const core = require('@actions/core')

var config = {};

function configureMySQL() {
    const pathMySQL = process.env['INPUT_MYSQL-PATH'];
    const installMySQL = process.env['INPUT_MYSQL-INSTALL'].toLowerCase();
    if(installMySQL !== "true") {
      return;
    }
    if ( process.platform == "win32" ) {
        if( pathMySQL && fs.lstatSync(pathMySQL).isDirectory()){
            config["-DMySQL_INCLUDE_DIR"] = path.join(pathMySQL, "include");
            config["-DMySQL_LIBRARY"] = path.join(pathMySQL, "lib/libmysql.lib");
        }
    }
}

function configurePostgresql() {
    const pathPostgresql = process.env['INPUT_POSTGRESQL-PATH'];
    const installPostgresql = process.env['INPUT_POSTGRESQL-INSTALL'].toLowerCase();
    if(installPostgresql !== "true") {
      return;
    }
    if ( process.platform == "win32" ) {
        if(pathPostgresql && fs.lstatSync(pathPostgresql).isDirectory()){
            config["-DCMAKE_INCLUDE_PATH"] = path.join(pathPostgresql, "include");
            config["-DCMAKE_LIBRARY_PATH"] = path.join(pathPostgresql, "lib");
        }
    }
}

function configure() {
    configureMySQL();
    configurePostgresql();
}

function installQt() {
    configureCommand = "cmake -G\"Ninja\" .. "
    for ( var key in config ) {
        configureCommand += " " + key + "=\"" + config[key]+"\"";
    }

    core.error("Config line: ${configureCommand}" );
    const workspace = process.env['RUNNER_WORKSPACE'];
    sqlPath = path.join(workspace, "/qtbase/src/plugins/sqldrivers/plugins");
    shell.mkdir(sqlPath)
    core.addPath(sqlPath);
    shell.cd(sqlPath);
    shell.exec(configureCommand);
    shell.exec("cmake --build .");
    shell.exec("cmake --install .");
}

module.exports = {
    install: function() {
        configure();
        installQt();
    }
}
