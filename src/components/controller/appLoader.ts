import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0c3bd48eb91d4f5f8c68f76c99ddcf48',
        });
    }
}

export default AppLoader;
