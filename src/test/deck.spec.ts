// During the test the env variable is set to test
import { getCardDecks } from '../helper/helperFunctions';

process.env.NODE_ENV = 'test';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '27017';
process.env.DB_NAME='blackjack_db';

import app from '../server';
import chai from 'chai';
import Deck from '../models/Deck';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);

const expect = chai.expect;

describe('Decks', () => {
    let deckId = '';

    // beforeEach((done) => { // Before each test we empty the database
    //     // Deck.remove({}, (err) => {
    //     //     done();
    //     // });
    // });

    it('it should not insert a Deck without shuffled object', (done) => {
        const deck = {
            type: 'SHORT'
        }
        chai.request(app)
            .post('/deck')
            .send(deck)
            .end((err, res) => {
                expect(res.status).to.eql(422);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', '"shuffled" is required');
                done();
            });
    });

    it('it should insert a Deck with validated object', (done) => {
        const deck = {
            type: 'SHORT',
            shuffled: false
        }
        chai.request(app)
            .post('/deck')
            .send(deck)
            .end((err, res) => {
                deckId = res.body.deckId;
                expect(res.status).to.eql(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('shuffled', false);
                expect(res.body).to.have.property('type', 'SHORT');
                expect(res.body).to.have.property('deckId');
                expect(res.body).to.have.property('remaining', 36);
                expect(res.body).to.have.property('cards').to.be.an('array').to.have.lengthOf(36);
                done();
            });
    });

    it('it should return error on invalid/empty deckId', (done) => {
        chai.request(app)
            .get('/deck')
            .end((err, res) => {
                expect(res.status).to.eql(422);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error', '"deckId" is required');
                done();
            });
    });

    it('it should return Deck against valid deckId', (done) => {
        chai.request(app)
            .get(`/deck?deckId=${deckId.toString()}`)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('shuffled', false);
                expect(res.body).to.have.property('type', 'SHORT');
                expect(res.body).to.have.property('deckId', deckId);
                expect(res.body).to.have.property('remaining', 36);
                expect(res.body).to.have.property('cards').to.be.an('array').to.have.lengthOf(36);
                done();
            });
    });

    it('it should draw cards from deck', (done) => {
        const deck = {
            deckId,
            count: 10
        }
        chai.request(app)
            .put('/deck')
            .send(deck)
            .end((err, res) => {
                deckId = res.body.deckId;
                expect(res.status).to.eql(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('cards').to.be.an('array').to.have.lengthOf(10);
                done();
            });
    });
});

describe('Helper Function', () => {

    it('it should get deck of cards and validate them', (done) => {
        const fullCards = getCardDecks(true, false);
        expect(fullCards).to.be.an('array').to.have.lengthOf(52);

        const shortCards = getCardDecks(false, false);
        expect(shortCards).to.be.an('array').to.have.lengthOf(36)

        done();
    });
});
