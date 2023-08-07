import axios from "axios";
import { MilisecondsInDay } from "./constants";

export interface IDataSyncer{
    syncData(symbol: string): Promise<void>;
}

class DataSyncer implements IDataSyncer{

    constructor(private apiEndpoint: string, private apiToken: string){}

    async syncData(symbol: string): Promise<void> {
        const response = await axios.get(this.apiEndpoint, {
        params:{
            symbol: symbol,
            resolution: 5,
            token: this.apiToken,
            from: Math.floor((Date.now() - MilisecondsInDay) / 1000),
            to: Math.floor(Date.now() / 1000)
        }
    });
    }// TODO: Implement parse and save of the data
    // TODO: Implement a way to find last 10 data points and that also works all day
}

const dataSyncer: IDataSyncer = new DataSyncer('https://finnhub.io/api/v1/stock/candle', ''); // TODO: Use env for token

export default dataSyncer;