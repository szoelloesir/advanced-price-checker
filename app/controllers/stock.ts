import CandleDataBase from "../database/candleDataBase";
import dataFetcher from "../utils/dataFetcher";
import caluclateSimpleMovingAverage from "../utils/smaCalculator";

export const getData = (req: any, res: any) => {
    const lastDataPoints = CandleDataBase.loadLast10Candle(req.params.symbol);
    const currentPrice = lastDataPoints && (lastDataPoints?.length ?? 0 > 0)
      ? lastDataPoints.slice(-1)[0].close
      : undefined;

    res.json({
        symbol: req.params.symbol,
        data: {
            currentPrice: currentPrice,
            lastExecution: dataFetcher.getLastExecutionTimeForSymbol(req.params.symbol),
            sma: caluclateSimpleMovingAverage(lastDataPoints?? [], 10),
        }
    })
}

export const postTrigger = (req: any, res: any) => {
    dataFetcher.startFetcher(req.params.symbol);
    res.json({ message: 'Your data polling started for: '+ req.params.symbol });
}