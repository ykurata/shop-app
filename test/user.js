const chai = require('chai');
const should = chai.should();
const jwt_decode = require("jwt-decode");
const chaiHttp = require('chai-http');
const request = require('supertest')
const server = require('../app');

chai.use(chaiHttp);

describe("User", () => {
	let userId;
	let token;
	it('should register user', (done) => {
		const newUser = {
			username: 'testuser',
			email: 'testuser@email.com',
			password: 'password',
			password2: 'password'
		}
		request(server)
			.post('/user/register')
			.send(newUser)
			.end((err, res) => {
				if (err) throw err;
				token =  res.body.token;
				const decode = jwt_decode(token);
				userId = decode.id;
				res.should.have.status(200);
				res.body.should.have.property('token');
				done();
			});
	});

	it('should login user', (done) => {
		const user = {
			email: "testuser@email.com",
			password: 'password'
		}
		request(server)
			.post('/user/login')
			.send(user)
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.body.should.have.property('token');
				done();
			});
	});

	it('should GET a user by userId', (done) => {
		request(server)
			.get(`/user/get/${userId}`)
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('username');
				done();
			});
	});

	it('should DELETE a user', (done) => {
		request(server)
			.delete(`/user/delete/${userId}`) 
			.set({ Authorization: `Bearer ${token}` })
			.end((err, res) => {
				if (err) throw err;
				res.should.have.status(200);
				done();
			});
	});
})