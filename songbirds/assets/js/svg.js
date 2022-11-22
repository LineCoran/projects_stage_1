import trainBird from '../svg/bird-train.svg';
import sparrowBird from '../svg/bird-sparrows.svg';
import forestBird from '../svg/bird-forest.svg';
import songBird from '../svg/bird-songbird.svg';
import preyBird from '../svg/bird-prey.svg';
import seaBird from '../svg/bird-seabird.svg';
import correctAnswerIndicator from '../svg/green-circle-icon.svg';
import incorrectAnswerIndicator from '../svg/red-circle-icon.svg';
import audioPlayIcon from '../svg/play-button-svgrepo-com.svg';
import audioPauseIcon from '../svg/music-player-pause-button-svgrepo-com.svg';


const Svg = 
    [
        {
        'Train birds': trainBird,
        'Sparrows': sparrowBird,  
        'Forest birds': forestBird,
        'Songbirds': songBird,  
        'Prey birds': preyBird,
        'Seabirds': seaBird,
        },
        {
        'true': correctAnswerIndicator,
        'false': incorrectAnswerIndicator,
        },
        {
            "play": audioPlayIcon,
            "pause": audioPauseIcon,
        },

    ]

export default Svg