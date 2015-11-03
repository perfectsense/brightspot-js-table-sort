var config = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var server;
var serverPath;
var serverFileName = 'brightspot-fe-dev-server';
var serverPathSrc = path.resolve(__dirname, '../src/main/node/') + '/' + serverFileName;
var serverPathNode = path.resolve(__dirname, '../node_modules/brightspot-base/src/main/node/') + '/' + serverFileName;

if (fs.existsSync(serverPathSrc + '.js')) {
	serverPath = serverPathSrc;
} else if (fs.existsSync(serverPathNode + '.js')) {
	serverPath = serverPathNode;
} else {
	console.log('Unable to find %s.js, exiting', serverFileName);
	process.exit(1);
}

config.projectDir = path.resolve(__dirname, '..');

/** this stuff is extra over a standard Brightspot Base styleguide server */
config.targetName = 'brightspot-table-sort';
config.srcRelPath = 'src';
config.wwwroot = 'demo';
config.wwwCustomPaths = [
	{ '/assets/scripts': config.projectDir + '/' + config.srcRelPath }
];

server = require(serverPath);
server.listen(config);