import Svg from "../../js/svg";

export default function createNav(lang) { 
    const WORDS = {
        en: [
            'Train',
            'Sparrows',  
            'Forest birds',
            'Songbirds',  
            'Prey birds',
            'Seabirds',
        ],
        ru: [
            'Разминка',
            'Воробьиные птицы',  
            'Лесные птицы',
            'Певчии птицы',  
            'Хищные птицы',
            'Морские птицы',
            ]
        }
    const mainNavWrapper = document.createElement('div');
    mainNavWrapper.className = "main__nav-wrapper";

    const nav = document.createElement('nav')
    nav.className = 'nav';

    const navList = document.createElement('ul')
    navList.className = 'nav__list';
    let i = 0;
    for (let key in Svg[0]) {
        const navItem = document.createElement('li');
        navItem.className = 'nav__item';
        
        const navItemSvg = document.createElement('img');
        navItemSvg.src = Svg[0][key];
        navItemSvg.className = 'nav__item-svg';
        const birdName = WORDS[lang][i];
        
        navItem.append(navItemSvg, birdName);
        navList.append(navItem);
        i++;
    }

    const navName = document.createElement('p');
    navName.className = 'nav__name';
    navName.innerHTML = 'Levels'

    nav.append(navList, navName);

    mainNavWrapper.append(nav)

    return mainNavWrapper;
}
