import { MilisecondsInMinute } from "./constants"
import dataSyncer, { IDataSyncer } from "./dataSyncer";

export interface IDataFetcher {
    startFetcher(symbol: string): boolean;
    stopFetcher(symbol: string): boolean;
    getLastExecutionTimeForSymbol(symbol: string): number | undefined;
}

export interface FercherData{
    interval: NodeJS.Timer,
    lastExecution: number
}

class DataFetcher implements IDataFetcher
{
    private fetchersBySymbol = new Map<string, FercherData>();

    constructor(private dataSyncer: IDataSyncer){}

    getLastExecutionTimeForSymbol(symbol: string): number | undefined {
        return this.fetchersBySymbol.get(symbol)?.lastExecution;
    }

    public startFetcher(symbol: string): boolean{
        if(this.fetchersBySymbol.has(symbol)){
            console.log(`Fetcher is already running for ${symbol}`)
            return false;
        }
        const currentExecutionTime = Date.now();
        this.dataSyncer.syncData(symbol);

        const newInterval = setInterval(()=> {
            const fetcherData = this.fetchersBySymbol.get(symbol)!;
            fetcherData.lastExecution = Date.now();

            this.dataSyncer.syncData(symbol)
        }, MilisecondsInMinute)

        this.fetchersBySymbol.set(symbol, {interval: newInterval, lastExecution: currentExecutionTime})

        return true;
    }

    public stopFetcher(symbol: string): boolean{
        if(this.fetchersBySymbol.has(symbol)){
            console.log(`No fetcher is running for ${symbol}`)
            return false;
        }
        clearInterval(this.fetchersBySymbol.get(symbol)?.interval)
        this.fetchersBySymbol.delete(symbol)

        return true;
    }

}

const dataFetcher: IDataFetcher = new DataFetcher(dataSyncer);

export default dataFetcher;