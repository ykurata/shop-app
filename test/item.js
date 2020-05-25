const chai = require('chai');
const should = chai.should();
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('Login', () => {
  let token;
  let userId; 
  before((done) => {
    chai.request(server)
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
    chai.request(server)
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
    chai.request(server)
      .post('/item')
      .set({ Authorization: `Bearer ${token}` })
      .send(item)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      });
  });
})

