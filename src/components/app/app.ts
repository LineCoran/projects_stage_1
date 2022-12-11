import AppController from '../controller/controller';
import { AppView, DrawNewsData, DrawSourcesData } from '../view/appView';

class App {
    controller;
    view;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources === null) {
            throw new Error('Sources is null');
        }
        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: DrawNewsData | undefined) => this.view.drawNews(data))
        );
        this.controller.getSources((data: DrawSourcesData | undefined) => this.view.drawSources(data));
    }
}

export default App;
