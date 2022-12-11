import News from './news/news';
import Sources from './sources/sources';
import { NewsData } from './news/news';
import { Item } from './sources/sources';

export interface DrawNewsData {
    articles: NewsData[];
    status: string;
    totalResults: number;
}

export interface DrawSourcesData {
    sources: Item[];
    status: string;
}

export class AppView {
    news;
    sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DrawNewsData | undefined) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DrawSourcesData | undefined) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
