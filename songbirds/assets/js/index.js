
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

setLanguage();
startPageShow();
setActiveEnglish();
document.querySelector('.rsschool-logo').setAttribute('src', rsLogo)





