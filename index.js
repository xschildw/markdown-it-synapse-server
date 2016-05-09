'use strict';
var juice = require('juice');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.argv[2] || 8080;
// accept json
app.use(bodyParser.json());
// set up a health check service
var healthCheckFunction = function(request, response) {
  response.statusCode = 200;
  response.end(JSON.stringify( { msg: 'OK' }));  
};
app.get('/healthcheck', healthCheckFunction);
app.head('/healthcheck', healthCheckFunction);
// set a default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
app.use(errorHandler);
// set up the markdown processor service
app.post('/markdown2html', function (request, response) {
  if (!request.body.markdown) {
    response.status(500).send(JSON.stringify({error: '"markdown" undefined'}));
    return;
  }
  response.setHeader('X-Powered-By', 'Sage Bionetworks Synapse');
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  var md = require('markdown-it')();
  var synapsePlugin = require('markdown-it-synapse');
  md.use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-center-text'))
    .use(require('markdown-it-synapse-heading'))
    .use(require('markdown-it-synapse-table'))
    .use(require('markdown-it-strikethrough-alt'))
    .use(require('markdown-it-container'))
    .use(require('markdown-it-emphasis-alt'))
    .use(synapsePlugin)
    .use(require('markdown-it-synapse-math'));
  var resultHtml = md.render(synapsePlugin.preprocessMarkdown(request.body.markdown));
  // pull in portal css, inline css (for use in email)
  var requestResource = require('request');
  requestResource.get('https://www.synapse.org/Portal.css', function (error, resourceResponse, resourceBody) {
      if (!error && resourceResponse.statusCode == 200) {
        var css = resourceBody;
        var inlinedStyledHtml = juice.inlineContent(resultHtml, css);
        response.end(JSON.stringify({ html: inlinedStyledHtml }));        
      }
  });
});
app.listen(parseInt(port, 10),  function () {
  console.log('Synapse markdown-it web server running on port ' + port);
});
