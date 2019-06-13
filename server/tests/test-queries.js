const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();

chai.use(chaiHttp);
const baseUri = 'http://localhost:8080/api';

describe('Get all users', () => {
	it('Should return all users in database', done => {
		chai.request(baseUri).get('/users').end((err, res) => {
			expect(res).to.have.status(200);
			done();
		});
	});
});

describe('Get all properties', () => {
	it('Should return all properties in database', done => {
		chai.request(baseUri).get('/properties').end((err, res) => {
			expect(res).to.have.status(200);
			done();
		});
	});
});

describe('Get all bricks', () => {
	it('Should return all bricks in database', done => {
		chai.request(baseUri).get('/bricks').end((err, res) => {
			expect(res).to.have.status(200);
			done();
		});
	});
});

describe('Get all bricks available', () => {
	it('Should return all bricks available', done => {
		chai.request(baseUri).get('/bricks/{"available":true}').end((err, res) => {
			const brick = res.body.data[0];
			expect(res).to.have.status(200);
			brick.should.have.property('ownerId').equal(null);
			done();
		});
	});
});

describe('Get all bricks of property 1', () => {
	it('Should return all bricks of property 1', done => {
		chai.request(baseUri).get('/bricks/{"propertyId":1}').end((err, res) => {
			const brick = res.body.data[0];
			expect(res).to.have.status(200);
			brick.should.have.property('propertyId').equal(1);
			done();
		});
	});
});

describe('Get all bricks in shopping cart', () => {
	it('Should return all bricks in Shopping Cart', done => {
		chai
			.request(baseUri)
			.get('/bricks/{"inShoppingCart":true}')
			.end((err, res) => {
				const data = res.body.data;
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(data).to.be.empty;
				done();
			});
	});
});

describe('Get Brick by Id', () => {
	it('Should return the brick that belongs to id', done => {
		chai.request(baseUri).get('/brick/3').end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body.data).to.have.property('id');
			expect(res.body.data.id).to.equal(3);
			done();
		});
	});
});
