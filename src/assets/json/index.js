import webData from './webData.json';

export function getValue(text){
    return webData[text];
}