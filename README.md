# markdown-it-synapse-server

Node.js based web service to process Synapse markdown to html.

## Installation

node.js:

```bash
$ npm install
```

## Run

```
node index.js 
```

## How to use


```
$ node index.js <optional_port_param>
Synapse markdown-it web server running on port 8080
```

####POST to /markdown2html
```
$ curl --data "## a heading" http://localhost:8080/markdown2html
{"html":"<h2 toc=\"true\">a heading</h2>\n"}
```