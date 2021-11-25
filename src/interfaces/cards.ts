import { DeckType } from '../../config/default';
import { Document } from 'mongoose';

export interface Cards {
    value: any; // it can be string or number
    suit: string;
    code: string;
}

export interface Deck extends Document {
    deckId: string;
    type: DeckType;
    shuffled: boolean;
    remaining: number;
    cards?: Cards[];
}
