import { CandleData } from "../models/candleData";

export interface ICandleDataBase{
    saveData(data: CandleData[]): void;
    loadLast10Candle(): CandleData[];
}

class InMemoryCandleDataBase implements ICandleDataBase{
    private timeOrderedData: CandleData[] = [];

    get actualLastTimeOfData(): number {        
        return this.timeOrderedData.length > 0
        ? this.timeOrderedData.slice(-1)[0].time
        : 0;
    }

    saveData(data: CandleData[]): void {
        const dataToPush = data.filter(candle => candle.time > this.actualLastTimeOfData).sort((a, b) => a.time - b.time);
        
        this.timeOrderedData.push(...dataToPush);
    }

    loadLast10Candle(): CandleData[] {
        return this.timeOrderedData.slice(-10)
    }    
}

const CandleDataBase: ICandleDataBase = new InMemoryCandleDataBase();

export default CandleDataBase;