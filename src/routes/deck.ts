import { Router } from 'express';
import { drawCards, getCardDeck, insertCardDeck } from '../controllers/deck';
import { joiValidation } from '../middleware/joiValidation';
import { drawDeckSchema, getDeckSchema, insertDeckSchema } from '../models/joiSchemas';

const router: Router = Router();

router
    .get('/deck', joiValidation(getDeckSchema, 'query'), getCardDeck)
    .post('/deck', joiValidation(insertDeckSchema, 'body'), insertCardDeck)
    .put('/deck', joiValidation(drawDeckSchema, 'body'), drawCards);

export default router;
