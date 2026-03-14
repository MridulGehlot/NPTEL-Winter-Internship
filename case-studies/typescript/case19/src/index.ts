import "reflect-metadata";
import { Container } from "typedi";
import { NewsAggregator } from "./NewsAggregator";
import { APISource } from "./APIsource";
import { NewsSource } from "./NewsSource";
import { NewsSourceToken } from "./NewsSource";

async function main() {

  Container.set(NewsSourceToken, new APISource());

  const aggregator = Container.get(NewsAggregator);
  const articles = await aggregator.getLatestArticles();

  console.log(articles);
}

main();