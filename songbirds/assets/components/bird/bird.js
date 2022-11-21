
import questionImg from '../../svg/question.svg';
import createCardDescription from '../description/description-card';
import createPlayer from '../player/player';

export default function createBirdStart(lang) {
    const birds = document.createElement('section');
    birds.className = 'birds';

    const birdsInner = document.createElement('div');
    birdsInner.className = 'birds__inner';

    const birdsPicture = document.createElement('div');
    birdsPicture.className = 'birds__picture';
    birdsPicture.style.backgroundImage= `url(${questionImg})`;

    const birdsImage = document.createElement('img');
    birdsImage.className = 'birds__image';

    const birdsInfo = document.createElement('div');
    birdsInfo.className = 'birds__info';

    const birdsInfoName = document.createElement('div');
    birdsInfoName.className = 'birds__info__name';
    birdsInfoName.innerHTML = '***';

    const birdsInfoAudio = createPlayer('1')
   // birdsInfoAudio.className = 'birds__info__audio';
   // birdsInfoAudio.setAttribute('controls', '');
   // birdsInfoAudio.setAttribute('src', answerAudio);

    birdsInfo.append(birdsInfoName, birdsInfoAudio);
    birdsPicture.append(birdsImage);
    birdsInner.append(birdsPicture, birdsInfo, createCardDescription(lang))
    birds.append(birdsInner);

    return birds;
}
