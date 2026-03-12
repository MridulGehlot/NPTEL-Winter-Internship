"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const NewsAggregator_1 = require("./NewsAggregator");
const APIsource_1 = require("./APIsource");
async function main() {
    const a = typedi_1.Container.get(NewsAggregator_1.NewsAggregator);
    const aa = await a.getLatestArticles();
    console.log(aa);
    //Container.reset();
    let sss = new APIsource_1.APISource();
    typedi_1.Container.set(APIsource_1.APISource, sss);
    typedi_1.Container.set(NewsAggregator_1.NewsAggregator, sss);
    const aggregator = typedi_1.Container.get(NewsAggregator_1.NewsAggregator);
    const articles = await aggregator.getLatestArticles();
    console.log(articles);
    console.log("News Aggregator is running...");
}
main();
