import DeckModel from '../models/Deck';
import { getDeckQuery, insertDeckQuery, updateCardsArrayAndRemainingCount } from '../services/deck';
import { Deck } from '../interfaces/cards';
import { BAD_REQUEST, NO_DECK_FOUND } from '../../config/default';

export const getCardDeck = async (req, res) => {
    try {
        const {filters, conditions} = getDeckQuery(req);
        const result = await DeckModel.findOne(conditions, filters);
        if (!result) {
            throw new Error(NO_DECK_FOUND);
        }
        res.send(result);
    } catch (err) {
        res.status(400).send(BAD_REQUEST);
    }
}

export const insertCardDeck = async (req, res) => {
    try {
        const result = await DeckModel.create(insertDeckQuery(req));
        res.send(result);
    } catch (err) {
        res.status(400).send(BAD_REQUEST);
    }
}

export const drawCards = async (req, res) => {
    try {
        const {filters, conditions} = getDeckQuery(req);
        const deckCard: Deck = await DeckModel.findOne(conditions, filters);
        if (!deckCard) {
            throw new Error(NO_DECK_FOUND);
        }
        const { deck, originalCards } = updateCardsArrayAndRemainingCount(deckCard, req);
        await DeckModel.findOneAndUpdate(conditions, {cards: originalCards, remaining: deck.remaining}).lean();
        res.send({cards: deck.cards});
    } catch (err) {
        res.status(400).send(BAD_REQUEST);
    }
}
