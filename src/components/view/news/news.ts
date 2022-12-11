import './news.css';

interface News {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

class News {
    draw(data: News[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp === null) {
                throw new Error('newsItemTemp is null');
            }
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            const newsReadMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');
            // todo some function for check null element
            if (
                newsItem === null ||
                newsMetaPhoto === null ||
                newsMetaAuthor === null ||
                newsMetaDate === null ||
                newsDescriptionTitle === null ||
                newsDescriptionSource === null ||
                newsDescriptionContent === null ||
                newsReadMore === null
            ) {
                throw new Error('newsItem is null');
            }

            if (idx % 2) newsItem.classList.add('alt');

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsDescriptionTitle.textContent = item.title;
            newsDescriptionSource.textContent = item.source.name;
            newsDescriptionSource.textContent = item.description;
            newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement === null) {
            throw new Error('newsElement is null');
        }

        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
