import { MilisecondsInSecond } from "./constants";

export const convertToSeconds = (miliseconds: number) => Math.floor(miliseconds/MilisecondsInSecond)