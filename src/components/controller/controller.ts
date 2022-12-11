import AppLoader from './appLoader';
import { DrawSourcesData } from '../view/appView';
import { DrawNewsData } from '../view/appView';
import { Options } from './loader';

class AppController extends AppLoader {
    getSources(callback: ((data?: DrawSourcesData) => void) | undefined) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: ((data?: DrawNewsData) => void) | undefined) {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target === null || !(target instanceof Element)) {
                throw new Error('Target is invalid');
            }

            if (newsContainer === null || !(newsContainer instanceof Element)) {
                throw new Error('NewsContainer is invalid');
            }

            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    throw new Error('sourceId is null');
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            } as Options,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
