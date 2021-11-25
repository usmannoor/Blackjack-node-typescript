import { DeckType } from '../../config/default';

const Joi = require('joi');

export const getDeckSchema = Joi.object().keys({
    deckId: Joi.string().uuid().required(),
});

export const insertDeckSchema = Joi.object().keys({
    type: Joi.string().valid(...Object.values(DeckType)).required(),
    shuffled: Joi.boolean().required(),
});

export const drawDeckSchema = Joi.object().keys({
    count: Joi.number().required(),
    deckId: Joi.string().uuid().required(),
});
