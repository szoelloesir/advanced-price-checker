import { CandleData } from "../models/candleData";

export interface ICandleDataBase{
    saveData(symbol: string, data: CandleData[]): void; // TODO: Change to promise if real db is used
    loadLast10Candle(symbol: string): CandleData[] | undefined ; // TODO: Change to promise if real db is used
}

class InMemoryCandleDataBase implements ICandleDataBase{
    private timeOrderedData: Map<string, CandleData[]> = new Map();

    getActualLastTimeOfData(symbol: string): number {
        const dataForSymbol = this.timeOrderedData.get(symbol);

        return dataForSymbol && dataForSymbol.length > 0
        ? dataForSymbol.slice(-1)[0].time
        : 0;
    }

    saveData(symbol: string, data: CandleData[]): void {
        const dataToPush = data.filter(candle => candle.time > this.getActualLastTimeOfData(symbol)).sort((a, b) => a.time - b.time);

        if(this.timeOrderedData.has(symbol))
        {
            const dataForSymbol = this.timeOrderedData.get(symbol)!;
            dataForSymbol.push(...dataToPush);
        }
        
        this.timeOrderedData.set(symbol, dataToPush);
    }

    loadLast10Candle(symbol: string): CandleData[] | undefined {
        return this.timeOrderedData.get(symbol)?.slice(-10)
    }    
}

const CandleDataBase: ICandleDataBase = new InMemoryCandleDataBase();

export default CandleDataBase;