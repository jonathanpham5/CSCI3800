/**
 * Created by Jonathan Pham based off Hw2Server.js created by Shawn
 */

var express = require('express');
var app = express();

app.get('/gets', function(req, res){

    //var json = JSON.stringify(req.headers);

    res.set('Content-Type', 'text/html');
    var s = "<html><body><table>";
    for (var name in req.headers) s += '<tr><td>' + name + '</td><td>' + req.headers[name] + '</td></tr>';
	s+= '<tr><td>' + 'id: ' + '</td><td>' + req.query.id + '</td></tr>';
    s+="</table></body></html>";
    res.send(s);
})

app.post('/posts', function(req, res) {
	console.log('POST Request');
	res.writeHead(201, {'Content-Type': 'text/html'});
	res.end('POST Request Received.');
})

app.put('/puts', function(req, res) {
	console.log('PUT Request');
	if (req.query.contenttype)
		res.writeHead(201, {'Content-Type': req.query.contenttype});
	res.status(201);
	res.end('Put Request Received');
})

app.delete('/deletes', function(req, res) {
	res.status(200).json({ Status: 'Successful', Request: 'DELETE'});
	res.end('DELETE request Received');
})
app.use('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
	res.status(404);
    err.message = "YOU HAVE BEEN REJECTED! HTTP Request not supported";
    next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next();
    }

    res.send(err.message || '** no unicorns here **');
});

app.listen(3001);
console.log("server running on http://localhost:3001/");
