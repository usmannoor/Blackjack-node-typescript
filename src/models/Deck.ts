import { model, Schema } from 'mongoose';
import { DeckType } from '../../config/default';

const deckSchema: Schema = new Schema({
    deckId: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: DeckType,
        default: DeckType.full,
        required: true
    },
    shuffled: {
        type: Boolean,
        required: true
    },
    remaining: {
        type: Number,
        required: true
    },
    cards: [{ value: Schema.Types.Mixed, suit: String, code: String }],
}, {
    timestamps: true
});

const DeckModel = model('Deck', deckSchema);

export default DeckModel;
