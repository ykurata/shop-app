const chai = require('chai');
const should = chai.should();
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const request = require('supertest')
const server = require('../app');

chai.use(chaiHttp);

describe("Message", () => {
  let token;
  let userId;
  let conId;
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

  it ('should GET all conversations', (done) => {
    request(server)
      .get('/message/get-conversations')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  }); 

  it ('should GET conversations by userId', (done) => {
    request(server)
      .get(`/message/get-conversations/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it ('should POST a new conversation', (done) => {
    const newCon = {
      itemId: 1,
      senderId: 2,
      receiverId: userId,
      read: false
    }
    request(server)
      .post('/message/create-conversation/1')
      .set({ Authorization: `Bearer ${token}` })
      .send(newCon)
      .end((err, res) => {
        if (err) throw err;
        conId = res.body.id;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('itemId');
        done();
      });
  });

  it ('should POST a new message', (done) => {
    const newMessage = {
      conversationId: conId,
      userId: userId,
      text: "this is a test message"
    }
    request(server)
      .post(`/message/${conId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(newMessage)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it ('should GET messages by conversationId', (done) => {
    request(server)
      .get(`/message/get-message/${conId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it ('should GET conversation by conversationId', (done) => {
    request(server)
      .get(`/message/get-conversation/${conId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it ('should DELETE a conversation', (done) => {
    request(server)
      .delete(`/message/delete-conversation/${conId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });
});