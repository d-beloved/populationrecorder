import chai from 'chai';
import env from 'dotenv';
import chaiHttp from 'chai-http';
import server from '../src';


env.config();

chai.should();

chai.use(chaiHttp);

describe('Tests for location controller', () => {
  describe('Test for create location', () => {
    it('should return an error if the name field is omitted', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          malePopulation: '10',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.name.should.equal('Please enter a valid location name');
          status.should.equal('error');
          done();
        });
    });

    it('should return an error if the male Population field is omitted', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.malePopulation.should.equal('Please enter the number of male population in this locality');
          status.should.equal('error');
          done();
        });
    });

    it('should return an error if the female Population field is omitted', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          malePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.femalePopulation.should.equal('Please enter the number of female population in this locality');
          status.should.equal('error');
          done();
        });
    });

    it('should return an error if the locality field is omitted', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          malePopulation: '20',
          femalePopulation: '200'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.locality.should.equal('Please enter the locality this location is in');
          status.should.equal('error');
          done();
        });
    });

    it('should return an error if the male population or female population field is not a number', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          malePopulation: '20er',
          femalePopulation: '200',
          locality: 'Tribune'
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          error.should.equal('Please enter a valid number for the male and female population in this location');
          done();
        });
    });

    it('should successfully create a location', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          malePopulation: '20',
          femalePopulation: '10',
          locality: 'Lagos'
        })
        .end((err, res) => {
          const { message, status } = res.body;
          res.should.have.status(201);
          message.should.equal('Location created successfully');
          status.should.equal('success');
          done();
        });
    });

    it('should return response 409 when location exists', (done) => {
      chai.request(server).post('/api/location').set('Accept', 'application/json')
        .send({
          name: 'Maryland',
          malePopulation: '20',
          femalePopulation: '10',
          locality: 'Lagos'
        })
        .end((err, res) => {
          const { message } = res.body;
          res.should.have.status(409);
          message.should.equal('You have previously created this location, would you like to update it?');
          done();
        });
    });
  });

  describe('Test for get locations', () => {
    it('should get all location successfully', (done) => {
      chai.request(server).get('/api/location')
        .end((err, res) => {
          const { message, status, locations } = res.body;
          res.should.have.status(200);
          message.should.equal('See the locations I found');
          status.should.equal('success');
          locations.should.be.an('array');
          done();
        });
    });
  });
});
