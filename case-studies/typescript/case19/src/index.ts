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

import "reflect-metadata";
import { Container } from "typedi";
import { NewsAggregator } from "./NewsAggregator";
import { APISource } from "./APISource";
import { RSSFeedSource } from "./RSSFeedSource";

async function testRSS(container: typeof Container) {
  console.log("=== RSSFeedSource ===");
  const agg = container.get(NewsAggregator);
  await agg.getLatestArticles();
}

async function testAPI(container: typeof Container) {
  // Override BEFORE first get()
  container.reset();  // Clear cache
  container.set(RSSFeedSource, new APISource());
  
  console.log("=== APISource (swapped) ===");
  const agg = container.get(NewsAggregator);
  await agg.getLatestArticles();
}

async function main() {
  testRSS(Container);
  testAPI(Container);
}

main();
