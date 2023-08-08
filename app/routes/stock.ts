import { Router } from 'express';
import { getData, postTrigger } from '../controllers/stock';

const router = Router();
/**
 * @swagger
 * /stock/{symbol}:
 *   get:
 *     summary: Get data for a specific stock symbol
 *     description: Retrieves data for a given symbol including the current price, last execution time, and simple moving average.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: The symbol for which to retrieve data.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data for the specified symbol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentPrice:
 *                       type: number
 *                       description: The current price of the symbol.
 *                     lastExecution:
 *                       type: string
 *                       description: The last execution time for the symbol.
 *                     sma:
 *                       type: number
 *                       description: The simple moving average for the last 10 data points.
 */
router.get('/:symbol', getData); // TODO: Use validators (is symbol existing) and maybe add interface for req

/**
 * @swagger
 * /stock/{symbol}:
 *   put:
 *     summary: Start data polling for a specific symbol
 *     description: Starts data polling for a given symbol, triggering the data fetching process.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: The symbol for which to start data polling.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data polling started successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating the data polling has started for the specified symbol.
 */
router.put('/:symbol', postTrigger);

export default router;