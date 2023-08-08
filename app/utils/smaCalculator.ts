import { CandleData } from "../models/candleData";

const caluclateSimpleMovingAverage = (data: CandleData[], period: number) => {
    if (data.length < period) {
        throw new Error('Not enough data to calculate the SMA.');
    }

    let sum = 0;

    data.slice(-period).forEach(candle => {
      sum += candle.close;
    });

    return sum / period;
};

export default caluclateSimpleMovingAverage;