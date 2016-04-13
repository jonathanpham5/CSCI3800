var express = require('express');
var app = express();
var url = require('url');

app.get('/validate', function(req, res) {
	var queryJson = JSON.parse(JSON.stringify(url.parse(req.url, true).query));

	if(queryJson.token != null) {
		gitHubToken(queryJson.token, res);
	} else {
		res.writeHead(401, {'Content-type' : 'test/plain'});
		res.write('no Github access token given');
		res.end();
	}
});

app.get('/', function(req, res) {
	res.write('OAUTH STUFF BY JONATHAN');
	res.end();
});

function gitHubToken(token, response) {
	var gitHubApi = require('github');

	var github = new gitHubApi({
		version: "3.0.0"
	});

	github.authenticate({
		type: "oauth";
		token: token
	});

	github.user.get({ user: 'jonathanpham5'}, function(err, res) {
		var gitHubObject = JSON.parse(JSON.stringify(res));

		response.write('username: ' + gitHubObject.login.toString() + '\n');
		response.write('user repos_url: ' + gitHubObject.repos_url.toString() + '\n');
		response.end();
	});
}

app.listen(9000);