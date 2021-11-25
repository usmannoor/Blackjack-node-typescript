import { Cards } from '../interfaces/cards';
import { SUITS, VALUES } from '../../config/default';

/**
 * Shuffle deck of cards
 * @param cards to be shuffled
 */
export const shuffleCards = (cards: Cards[]): Cards[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  return cards;
}

/**
 * Get deck of cards
 * @param isFullDeck - if true then return 52 otherwise 36
 * @param isShuffled - if true then return shuffled cards otherwise false
 */
export const getCardDecks = (isFullDeck = true, isShuffled = false): Cards[] => {
  const cards: Cards[] = [];

  for (const suit of SUITS) {
    for (const value of VALUES) {
      if (!isFullDeck && (value === 3 || value === 4 || value === 5 || value === 6)) {
        // do not push the cards for SHORT ones
      } else {
        const code = `${typeof value === 'string' ? value.charAt(0) : value}${suit.charAt(0)}`;
        cards.push({ value, suit, code: code.toUpperCase()});
      }
    }
  }

  return !isShuffled ? cards : shuffleCards(cards);
}
