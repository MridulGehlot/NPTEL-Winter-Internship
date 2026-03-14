import {Service,Inject} from "typedi";
import {NewsSource,NewsSourceToken} from "./NewsSource";
import {RSSFeedSource} from "./RSSFeedSource";
@Service()
export class NewsAggregator
{
constructor(
@Inject(NewsSourceToken)
private source:NewsSource
){}
async getLatestArticles():Promise<void>
{
const articles=await this.source.fetchArticles();
articles.forEach((article:string) => console.log(article));
}
}