var city:string="Ujjain";
var temperature:number=45.1
var isRaining=false;

function weatherReport(city:string,temperature:number,isRaining:boolean):void
{
console.log(`In ${city}, it is ${temperature} degree celsius. Is it raining ? ${isRaining}`);
}

weatherReport(city,temperature,isRaining);