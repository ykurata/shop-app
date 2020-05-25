const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const request = require('supertest')
const server = require('../app');

chai.use(chaiHttp);

describe('Item', () => {
  let token;
  let userId; 
  let itemId;
  before((done) => {
    request(server)
      .post('/user/login')
      .send({
        email: 'yasuko@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        if (err) throw err;
        token =  res.body.token;
        const decode = jwt_decode(token);
        userId = decode.id;
        done();
      });
  });

  it('should GET all items', (done) => {
    request(server)
        .get('/item/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
  });

  it('should POST an item', (done) => {
    const item = {
      userId: 1,
      name: "test item",
      category: "book",
      description: "test description",
      price: "10.00"
    }
    request(server)
      .post('/item')
      .set({ Authorization: `Bearer ${token}` })
      .send(item)
      .end((err, res) => {
        itemId = res.body.id;
        console.log(itemId)
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('category');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
        done();
      });
  });

  it('should PUT an item', (done) => {
    const item = {
      userId: 1,
      name: "test item updated",
      category: "book",
      description: "test description",
      price: "10.00"
    }
    request(server)
      .put(`/item/update/${itemId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(item)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should GET an item by item Id', (done) => {
    request(server)
      .get(`/item/get/${itemId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should GET items by userId', (done) => {
    request(server)
      .get('/item/items/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should DELETE an item', (done) => {
    request(server)
      .delete(`/item/delete/${itemId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

