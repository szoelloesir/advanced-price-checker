import { MilisecondsInMinute } from "./constants"
import dataSyncer, { IDataSyncer } from "./dataSyncer";

export interface IDataFetcher {
    startFetcher(symbol: string): boolean;
    stopFetcher(symbol: string): boolean;
}

class DataFetcher implements IDataFetcher
{
    private fetchersBySymbol = new Map<string, NodeJS.Timer>();

    constructor(private dataSyncer: IDataSyncer){}

    public startFetcher(symbol: string): boolean{
        if(this.fetchersBySymbol.has(symbol)){
            console.log(`Fetcher is already running for ${symbol}`)
            return false;
        }
        this.dataSyncer.syncData(symbol);
        const newInterval = setInterval(()=> this.dataSyncer.syncData(symbol), MilisecondsInMinute)

        this.fetchersBySymbol.set(symbol, newInterval) // TODO: Move MilisecondsInMinute to env variable or something

        return true;
    }

    public stopFetcher(symbol: string): boolean{
        if(this.fetchersBySymbol.has(symbol)){
            console.log(`No fetcher is running for ${symbol}`)
            return false;
        }
        clearInterval(this.fetchersBySymbol.get(symbol))
        this.fetchersBySymbol.delete(symbol)

        return true;
    }

}

const dataFetcher: IDataFetcher = new DataFetcher(dataSyncer);

export default dataFetcher;