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

  describe('Test for Update locations', () => {
    it('should return an error if a non integer id is inserted', (done) => {
      chai.request(server).put('/api/location/a').set('Accept', 'application/json')
        .send({
          malePopulation: '10',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.message.should.equal('please enter a valid location Id');
          status.should.equal('error');
          done();
        });
    });

    it('should return an error if a non integer population number is inserted', (done) => {
      chai.request(server).put('/api/location/1').set('Accept', 'application/json')
        .send({
          malePopulation: '10r',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.should.equal('Please enter a valid number for the male and female population in this location');
          status.should.equal('error');
          done();
        });
    });

    it('should return a 404 error if location is not found ', (done) => {
      chai.request(server).put('/api/location/5').set('Accept', 'application/json')
        .send({
          malePopulation: '10',
          femalePopulation: '20',
          locality: 'Abuja'
        })
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(404);
          error.message.should.equal('location not found');
          status.should.equal('error');
          done();
        });
    });

    it('should update successfully ', (done) => {
      chai.request(server).put('/api/location/1').set('Accept', 'application/json')
        .send({
          name: 'Amity, Mende Maryland',
          malePopulation: '10',
          femalePopulation: '20',
          locality: 'Lagos'
        })
        .end((err, res) => {
          const { message, status } = res.body;
          res.should.have.status(200);
          message.should.equal('Location information updated successfully');
          status.should.equal('success');
          done();
        });
    });
  });

  describe('Test for delete locations', () => {
    it('should return an error if a non integer id is inserted', (done) => {
      chai.request(server).delete('/api/location/a')
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(400);
          error.message.should.equal('please enter a valid Id');
          status.should.equal('error');
          done();
        });
    });

    it('should return 404 id location is not found ', (done) => {
      chai.request(server).delete('/api/location/4')
        .end((err, res) => {
          const { error, status } = res.body;
          res.should.have.status(404);
          error.message.should.equal('Location not found, please check that you are entering the correct id');
          status.should.equal('error');
          done();
        });
    });

    it('should delete a location successfully ', (done) => {
      chai.request(server).delete('/api/location/1')
        .end((err, res) => {
          const { message, status } = res.body;
          res.should.have.status(200);
          message.should.equal('Location successfully deleted');
          status.should.equal('success');
          done();
        });
    });
  });
});
