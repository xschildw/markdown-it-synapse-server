# markdown-it-synapse-server

Node.js based web service to process Synapse markdown to html.

## Installation

node.js:

```bash
$ npm install
```

## Run

```
npm start
```

## How to use


```
$ npm start
> markdown-it-synapse-server@1.0.0 start /Users/jayhodgson/markdown-it-synapse-server
> node ./bin/www
```

####POST json to /markdown2html
```
$ curl -d '{"markdown":"## a heading"}' -H "Content-Type: application/json" http://localhost:3000/markdown2html
{"result":"<h2 toc=\"true\" style=\"word-wrap: break-word; margin-top: 10px; font-weight: 200; color: #000000; font-size: 32px; line-height: 40px; margin-bottom: 10px;\">a heading</h2>\n"}
```

######Set output format to "html", "plain", or leave as default (Synapse styled html)
```
$ curl -d '{"markdown":"## a heading", "output":"html"}' -H "Content-Type: application/json" http://localhost:3000/markdown2html
{"result":"<h2 toc=\"true\">a heading</h2>\n"}

$ curl -d '{"markdown":"## a heading", "output":"plain"}' -H "Content-Type: application/json" http://localhost:3000/markdown2html
{"result":"A HEADING"}
```

