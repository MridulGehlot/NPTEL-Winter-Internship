import {Token} from "typedi";
export interface NewsSource
{
fetchArticles(): Promise<string[]>;
}

export const NewsSourceToken = new Token<NewsSource>("NewsSource");