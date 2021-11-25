export enum DeckType {
    short = 'SHORT',
    full = 'FULL'
}

export const SUITS: string[] = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
export const VALUES: any[] = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

export const INTERNET_SERVER_ERROR = 'Internal Server Error';
export const NO_DECK_FOUND = 'No deck found against deckId';
export const BAD_REQUEST = 'Bad Request';
