
import '../../assets/styles/style.css';
import '../components/description/description-file.css';
import '../components/answer/answer-list.css';
import '../components/game/game.css';
import '../components/bird/bird.css';
import '../components/player/player.css';
import '../components/welcome/welcome.css';
import '../../assets/styles/media.css';
import startPageShow from './startPageShow';
import setLanguage from './language';
import setActiveEnglish from './languageButtons';
import rsLogo from '../svg/rs_school_js.svg';
import linkSvg from '../favicon/favicon.svg';
import linkPng from '../favicon/favicon.png';

setLanguage();
startPageShow();
setActiveEnglish();
document.querySelector('.rsschool-logo').setAttribute('src', rsLogo);


function createElementFavicon(type, favicon) {
    const link = document.createElement('link');
    const head = document.head;
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', type);
    link.setAttribute('href', favicon)
    head.append(link);
}

debugger
createElementFavicon('image/svg+xml', linkSvg);
createElementFavicon('image/png', linkPng);
