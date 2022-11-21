    import createPlayer from "../player/player";
    
    export default function createCardDescription(lang) {

    const WORDS = {
        level: {
            en: "level",
            ru: "уровень"
        },
        score : {
            en: "score",
            ru: "баллы",
        },
        description: {
            en: "Listen the player and choose the bird",
            ru: "Прослушайте аудио и выберите птицу",
        }
    }
    const description = document.createElement('section');
    description.className = 'description';

    
    const descriptionLeft = document.createElement('div');
    descriptionLeft.className = 'description__left';
    
    const descriptionRight = document.createElement('div');
    descriptionRight.className = 'description__right'

    const descriptionLeftTopText = document.createElement('h4');
    descriptionLeftTopText.className = 'description__left__text';
    descriptionLeftTopText.id = 'description-level';
    descriptionLeftTopText.innerHTML = `${WORDS.level[lang]} <span id="card-level">123<span>`
    // to do add level

    const descriptionLeftBottomText = document.createElement('h4');
    descriptionLeftBottomText.className = 'description__left__text';
    descriptionLeftBottomText.id = 'description-score';
    descriptionLeftBottomText.innerHTML = `${WORDS.score[lang]} <span id="card-score">123<span>`;
    // to do add score
    
    const descriptionLeftImg = document.createElement('div');
    descriptionLeftImg.className = 'description__left__img';


    const descriptionRightTitle = document.createElement('div');
    descriptionRightTitle.className = 'description__right__title';

    const descriptionRightText = document.createElement('p');
    descriptionRightText.className = 'description__right__text';
    descriptionRightText.innerHTML = WORDS.description[lang];

    const descriptionRightCountry = document.createElement('p');
    descriptionRightCountry.className = 'description__right__country';
    
    const descriptionAudio = createPlayer('2')
    // descriptionAudio.className = 'description__audio';
    // descriptionAudio.setAttribute('controls', '');
    // descriptionAudio.src = '#';

    descriptionLeft.append(descriptionLeftTopText, descriptionLeftImg, descriptionLeftBottomText);
    descriptionRight.append(descriptionRightTitle, descriptionRightText, descriptionRightCountry);
    description.append(descriptionLeft, descriptionRight)


    descriptionLeft.style.transform = "translateX(-200px)";
   // descriptionAudio.style.transform = "translateX(400px)";
    descriptionAudio.style.transition = "0.4s linear"

    return description;    
}
