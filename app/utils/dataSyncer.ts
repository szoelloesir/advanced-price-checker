import axios from "axios";
import { MilisecondsInDay } from "./constants";
import environment from "../config/environment";
import { convertToSeconds } from "./converter";
import { CandleData } from "../models/candleData";

export interface IDataSyncer{
    syncData(symbol: string): Promise<void>;
}

interface FinnHubCandleData{
    c:number[],
    h:number[],
    l:number[],
    o:number[],
    s:string,
    t:number[],
    v:number[]
}


class DataSyncer implements IDataSyncer{
    constructor(private apiEndpoint: string, private apiToken: string){}

    async syncData(symbol: string): Promise<void> {
        const response = await axios.get(this.apiEndpoint, {
        params:{
            symbol: symbol,
            resolution: 5,
            token: this.apiToken,
            from: convertToSeconds(Date.now() - MilisecondsInDay),
            to: convertToSeconds(Date.now())
            }
        }).then(data => this.convertToDto(data.data)); //TODO: error handling
        console.log(response);
    }

    convertToDto(data: FinnHubCandleData){
        const result: CandleData[] = [];
        data.t.forEach((element, index) => {
            result.push({
                time: element,
                close: data.c[index],
                height: data.h[index],
                low: data.l[index],
                open: data.o[index],
                volume: data.v[index]
            })
        });
        return result;
    }
}


const dataSyncer: IDataSyncer = new DataSyncer('https://finnhub.io/api/v1/stock/candle', environment.token);

export default dataSyncer;