'use strict';

/** integration level tests (after spinning up server) **/
var supertest = require('supertest');
var assert = require('assert');
var server = supertest.agent('http://localhost:8080');

describe('integration tests', function() {

  it('test to resolve basic markdown to html', function(done) {
    server
    .post('/markdown2html')
    .set('Accept', 'application/json')
    .send({ markdown:'## heading 2' })
    .expect('Content-type',/json/)
    .expect(200) // HTTP response
    .end(function(err,res){
      // HTTP status = 200
      assert.equal(res.status, 200);
      
      // Error key should be false.
      assert.equal(res.error, false);
      assert.equal(res.body.html, '<h2 toc="true" style="word-wrap: break-word; font-weight: 200; color: #000000; font-size: 32px; line-height: 40px; margin-bottom: 10px; margin-top: 10px;">heading 2</h2>\n');
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
      assert.equal(404, res.status);
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
      assert.equal(404, res.status);
      done();
    });
  });

});
