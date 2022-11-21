export default function createHeaderBlock(language) {
    const headerNavText = [
        {
            en: "Main",
            ru: "Главная",
            id: "main-button",
        },

        {
            en: "Game",
            ru: "Игра",
            id: "game-button",
        },

        {
            en: "Galerry",
            ru: "Галерея",
            id: "galerry-button",
        }
    ]

    const scoreText = {
        en: "Score: ",
        ru: "Баллы: ",
    }

    const header = document.createElement('header');
    header.className = 'header';

    const headerInner = document.createElement('div');
    headerInner.className = 'header__inner';

    const headerLogoWrapper = document.createElement('div');
    headerLogoWrapper.className = 'header__logo';

    const headerLogo = document.createElement('h1');
    headerLogo.className = 'logo';
    headerLogo.innerHTML = "SongBirds";

    const headerWidjet = document.createElement('div');
    headerWidjet.className = 'header__widjet';

    const headerNavList = document.createElement('nav');
    headerNavList.className = 'header__nav__list';

    for (let i = 0; i < 3; i++) {
        const headerNavItem = document.createElement('li');
        headerNavItem.className = 'header__nav__item';
        headerNavItem.innerHTML = headerNavText[i][language];
        headerNavItem.id = headerNavText[i].id;
        headerNavList.append(headerNavItem);
    }

    const languageBlock = document.createElement('div');
    languageBlock.className = 'language';

    const languageButtonEn = document.createElement('p');
    languageButtonEn.className = 'language__button language__button-en';
    languageButtonEn.id = 'en';
    languageButtonEn.innerHTML = 'En'

    const languageButtonRu = document.createElement('p');
    languageButtonRu.className = 'language__button';
    languageButtonRu.id = 'ru';
    languageButtonRu.innerHTML = 'Ru'

    const score = document.createElement('div');
    score.className = 'score';
    score.innerHTML = scoreText[language];

    const scoreNumber = document.createElement('span');
    scoreNumber.id = 'score';

    score.append(scoreNumber);
    headerLogoWrapper.append(headerLogo)
    languageBlock.append(languageButtonEn, languageButtonRu);

    headerWidjet.append(headerNavList, languageBlock, score);
    headerInner.append(headerLogoWrapper, headerWidjet);
    header.append(headerInner);

    return header;
}