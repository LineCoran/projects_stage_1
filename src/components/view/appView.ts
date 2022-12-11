import News from './news/news';
import Sources from './sources/sources';
import { NewsData } from './news/news';
import { Item } from './sources/sources';

interface DrawNewsData {
    articles: NewsData[];
    status: string;
    totalResults: number;
}

interface DrawSourcesData {
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

    drawNews(data: DrawNewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DrawSourcesData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
