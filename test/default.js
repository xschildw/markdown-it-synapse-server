'use strict';

/** integration level tests (after spinning up server) **/
var supertest = require('supertest');
var assert = require('assert');
var server = supertest.agent('http://localhost:3000');

describe('integration tests', function() {

  it('test to resolve basic markdown to html', function(done) {
    server
    .post('/markdown2html')
    .set('Accept', 'application/json')
    .send({ markdown:'## heading 2', output:'html' })
    .expect('Content-type',/json/)
    .expect(200) // HTTP response
    .end(function(err,res){
      if (err) return done(err);
      assert.equal(res.body.result, '<h2 toc="true">heading 2</h2>\n');
      done();
    });
  });
  it('test to resolve relative links', function(done) {
    server
    .post('/markdown2html')
    .set('Accept', 'application/json')
    .send({ markdown:'link to [jay](#!Profile:jay)', output:'html', baseURL:'https://test.synapse.org/' })
    .expect('Content-type',/json/)
    .expect(200) // HTTP response
    .end(function(err,res){
      if (err) return done(err);

      assert.equal(res.body.result, '<p>link to <a href="https://test.synapse.org/#!Profile:jay" target="_blank" ref="noopener noreferrer">jay</a></p>\n');
      done();
    });
  });
  it('test to resolve basic markdown to plain text', function(done) {
    server
    .post('/markdown2html')
    .set('Accept', 'application/json')
    .send({ markdown:'## heading 2', output:'plain' })
    .expect('Content-type',/json/)
    .expect(200) // HTTP response
    .end(function(err,res){
      if (err) return done(err);
      else {
        assert.equal(res.body.result, 'HEADING 2');
        done();
      }
    });
  });

  it('test GET failure', function(done) {
    server
    .get('/markdown2html')
    .expect('Content-type',/json/)
    .expect(404) // HTTP response
    .end(function(err,res){
      done();
    });
  });

  it('test POST to the wrong path failure', function(done) {
    server
    .get('/anotherPath')
    .expect('Content-type',/json/)
    .expect(404) // HTTP response
    .end(function(err,res){
      done();
    });
  });

});
