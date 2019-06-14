const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();

chai.use(chaiHttp);
const baseUrl = 'http://localhost:8080/api';

describe('Attemp to add an item to cart: ', () => {
	it('It should return error missing params when only sending userId ', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/add')
			.send({ userId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('error');
				expect(response.error).to.equal('Missing Params');
				done();
			});
	});
});

describe('Add a brick to user cart: ', () => {
	it('It should add a brick to user cart', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/add')
			.send({ userId: 1, brickId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('status');
				expect(response.status).to.equal('success');
				done();
			});
	});

	it('The brick just added should have 1 in field ownerId', done => {
		chai.request(baseUrl).get('/brick/1').end(function(err, res) {
			const response = res.body.data;
			expect(res).to.have.status(200);
			expect(response).to.have.property('ownerId');
			expect(response.ownerId).to.equal(1);
			done();
		});
	});
});

describe('Attemp to add a brick not available to a another user: ', () => {
	it('It should return error when trying to add to cart a brick unavailable', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/add')
			.send({ userId: 2, brickId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('error');
				expect(response.error).to.equal('Brick already has an owner');
				done();
			});
	});
});

describe('Remove a brick from user cart: ', () => {
	it('It should remove a brick from user cart', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/remove')
			.send({ userId: 1, brickId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('status');
				expect(response.status).to.equal('success');
				done();
			});
	});

	it('The brick just added should have 1 in field ownerId', done => {
		chai.request(baseUrl).get('/brick/1').end(function(err, res) {
			const response = res.body.data;
			expect(res).to.have.status(200);
			expect(response).to.have.property('ownerId');
			expect(response.ownerId).to.equal(null);
			done();
		});
	});
});

describe('Add two bricks to user cart: ', () => {
	it('It should add a brick to user cart', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/add')
			.send({ userId: 1, brickId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('status');
				expect(response.status).to.equal('success');
				done();
			});
	});

	it('It should add a brick to user cart', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/add')
			.send({ userId: 1, brickId: 2 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('status');
				expect(response.status).to.equal('success');
				done();
			});
	});

	it('Bricks of user 1 must be 2', done => {
		chai.request(baseUrl).get('/bricks/{"ownerId":1}').end((err, res) => {
			const bricks = res.body.data;
			expect(res).to.have.status(200);
			expect(bricks).to.have.lengthOf(2);
			done();
		});
	});
});

describe('Clear user cart: ', () => {
	it('It should clear user cart', done => {
		chai
			.request(baseUrl)
			.put('/shoppingCart/clear')
			.send({ userId: 1 })
			.end(function(err, res) {
				const response = res.body;
				response.should.have.property('status');
				expect(response.status).to.equal('success');
				done();
			});
	});

	it('Bricks of user 1 must be 0', done => {
		chai.request(baseUrl).get('/bricks/{"ownerId":1}').end((err, res) => {
			const bricks = res.body.data;
			expect(res).to.have.status(200);
			expect(bricks).to.have.lengthOf(0);
			done();
		});
	});
});
