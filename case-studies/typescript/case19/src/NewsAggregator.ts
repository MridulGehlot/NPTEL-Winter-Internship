import {Service,Inject} from "typedi";
import {NewsSource} from "./NewsSource";
import {RSSFeedSource} from "./RSSFeedSource";
@Service()
export class NewsAggregator
{
constructor(
@Inject(()=>RSSFeedSource) private source:NewsSource
){}
async getLatestArticles():Promise<void>
{
const articles=await this.source.fetchArticles();
articles.forEach((article:string) => console.log(article));
}
}