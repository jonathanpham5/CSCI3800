/**
 * Created by Jonathan Pham 
 * ID: 102282101
 */

var express = require('express');
var request = require('request');
var app = express();
var usergrid = require('usergrid');

var client = new usergrid.client({
    orgName: 'phamjon',
	appName: 'sandbox'
});

app.get('/gets/:title', function(req, res) {
    var options = {
        method: 'GET',
        endpoint: 'movies/' + req.params.title
    }
    client.request(options, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })    
});

app.get('/gets', function(req, res) {	
    var options = {
        method: 'GET',
        endpoint: 'movies'
    }
    client.request(options, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.post('/posts/:title/:year/:name1/:name2/:name3', function(req, res) {
    var options = {
        method: 'POST',
        endpoint: 'movies',
        body: {
            name: req.params.title,
            title: req.params.title,
            year: req.params.year,
            "Actors": [
                { name1: req.params.name1 },
                { name2: req.params.name2 },
                { name3: req.params.name3 },
            ]
        }
    };
    
    client.request(options, function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.send('POST SUCCESSFUL\n');
            res.send(data);
        }
    })
});

app.delete('/deletes/:title', function(req, res) {
    var options = {
        method:'DELETE',
        endpoint:'movies/' + req.params.title
    };
    client.request(options, function (err, data) {
        if (err) {
            res.send(err);// Error - DELETE failed
        } else {
            res.send(data);
        }
    });
});

app.listen(3000);