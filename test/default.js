'use strict';

/** integration level tests (after spinning up server) **/
var supertest = require('supertest');
var assert = require('assert');
var server = supertest.agent('http://localhost:8080');

describe('integration tests', function() {

  it('test to resolve basic markdown to html', function(done) {
    server
    .post('/markdown2html')
    .send('## heading 2')
    .expect('Content-type',/json/)
    .expect(200) // HTTP response
    .end(function(err,res){
      // HTTP status = 200
      assert.equal(res.status, 200);
      
      // Error key should be false.
      assert.equal(false, res.error);
      assert.equal('<h2 toc="true">heading 2</h2>\n', res.body.html);
      done();
    });
  });

  it('test GET failure', function(done) {
    server
    .get('/markdown2html')
    .expect('Content-type',/json/)
    .expect(404) // HTTP response
    .end(function(err,res){
      // HTTP status = 404
      assert.equal(res.status, 404);
      done();
    });
  });

  it('test POST to the wrong path failure', function(done) {
    server
    .get('/anotherPath')
    .expect('Content-type',/json/)
    .expect(404) // HTTP response
    .end(function(err,res){
      // HTTP status = 404
      assert.equal(res.status, 404);
      done();
    });
  });

});
