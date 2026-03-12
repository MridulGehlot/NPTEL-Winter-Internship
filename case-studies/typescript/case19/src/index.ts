import "reflect-metadata";
import { Container } from "typedi";
import { newsAggregator } from "./newsAggregator";
import { APISource } from "./APIsource";
import { NewsSource } from "./NewsSource";

async function main() {

  Container.set(NewsSource, new APISource());

  const aggregator = Container.get(newsAggregator);
  const articles = await aggregator.getLatestArticles();

  console.log(articles);
}

main();