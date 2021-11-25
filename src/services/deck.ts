import { getCardDecks } from '../helper/helperFunctions';
import { v4 as uuidv4 } from 'uuid';
import { Cards, Deck } from '../interfaces/cards';
import { DeckType } from '../../config/default';

export const getDeckQuery = (req) => {
    const conditions = {
        deckId: req.query.deckId || req.body.deckId
    }
    const filters = {
        deckId: 1,
        type: 1,
        shuffled: 1,
        remaining: 1,
        cards: 1,
        _id: 0
    }
    return {
        conditions,
        filters
    }
}

export const insertDeckQuery = (req) => {
    const {shuffled, type} = req.body;
    const cards: Cards[] = getCardDecks(type === DeckType.full, shuffled);
    return {...req.body, ...{deckId: uuidv4(), cards, remaining: cards.length}}
}

export const updateCardsArrayAndRemainingCount = (deck: Deck, req) => {
    try {
        const {count} = req.body;
        // if remaining cards length is >= count then draw the cards
        if (deck.cards && deck.cards.length >= count && deck.cards.length) {
            // remove first n elements and update remaining
            let originalCards: Cards[] = Array.from(deck.cards);
            originalCards = originalCards.splice(count, originalCards.length-1);

            deck.cards = deck.cards.splice(0, count);
            deck.remaining = deck.remaining - deck.cards.length;

            return {deck, originalCards};
        } else {
            throw new Error('Invalid card count');
        }
    } catch ( err ) {
        throw err;
    }
};
