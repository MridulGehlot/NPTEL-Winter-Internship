"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const NewsAggregator_1 = require("./NewsAggregator");
const APIsource_1 = require("./APIsource");
const NewsSource_1 = require("./NewsSource");
async function main() {
    typedi_1.Container.set(NewsSource_1.NewsSourceToken, new APIsource_1.APISource());
    const aggregator = typedi_1.Container.get(NewsAggregator_1.NewsAggregator);
    const articles = await aggregator.getLatestArticles();
    console.log(articles);
}
main();
