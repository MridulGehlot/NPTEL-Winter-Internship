"use strict";
/*
import "reflect-metadata";
import {Container} from "typedi";
import {NewsAggregator} from "./NewsAggregator";
import {APISource} from "./APISource";
import {RSSFeedSource} from "./RSSFeedSource";
async function main()
{
// Default: RSSFeedSource
console.log("=== RSSFeedSource ===");
const agg1 = Container.get(NewsAggregator);
await agg1.getLatestArticles();
// SWAP: Override NewsSource → APISource
Container.set(RSSFeedSource, new APISource());  // ← RSSFeedSource TOKEN
console.log("=== APISource (swapped) ===");
const agg2 = Container.get(NewsAggregator);
await agg2.getLatestArticles();
}
main();
*/
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const NewsAggregator_1 = require("./NewsAggregator");
const APISource_1 = require("./APISource");
const RSSFeedSource_1 = require("./RSSFeedSource");
async function testRSS(container) {
    console.log("=== RSSFeedSource ===");
    const agg = container.get(NewsAggregator_1.NewsAggregator);
    await agg.getLatestArticles();
}
async function testAPI(container) {
    // Override BEFORE first get()
    container.reset(); // Clear cache
    container.set(RSSFeedSource_1.RSSFeedSource, new APISource_1.APISource());
    console.log("=== APISource (swapped) ===");
    const agg = container.get(NewsAggregator_1.NewsAggregator);
    await agg.getLatestArticles();
}
async function main() {
    testRSS(typedi_1.Container);
    testAPI(typedi_1.Container);
}
main();
