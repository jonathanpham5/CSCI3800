var githubOAuth = require('github-oauth')({
  githubClient: process.env['d49ef8455f359730cb49'],
  githubSecret: process.env['c28a0224db9515e7bd91f7662760c6cf912be791'],
  baseURL: 'http://localhost:3001',
  loginURI: '/login',
  callbackURI: '/callback',
  scope: 'user' // optional, default scope is set to user
})

require('http').createServer(function(req, res) {
  if (req.url.match(/login/)) return githubOAuth.login(req, res)
  if (req.url.match(/callback/)) return githubOAuth.callback(req, res)
}).listen(3001)

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token)
  serverResponse.end(JSON.stringify(token))
})
