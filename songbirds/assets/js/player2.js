import birdsData from "../data/birdsData";
import birdsDataEn from "../data/birdsDataEn";
import Svg from "./svg";

let audio2;
let isPlay;
let currentTimeGlobal;

export default function initPlayer2(birdName, step, lang) {
    const birdsDataAll = {
        en: birdsDataEn,
        ru: birdsData
    }
    const audioPlayButton = document.getElementById('play-2');
    const audioDurationTime = document.getElementById('duration-time-2');
    const audioExactTime = document.getElementById('exact-time-2');
    const audioProgress = document.getElementById('progress__audio-2');
    const audioVolume = document.getElementById('volume-2');
    const answers = document.querySelectorAll('.answer__item__text');
    const nextButton = document.querySelector('.next__question');
    let globalBirdName = birdName;
    let audioLink = findAudioSourceByName(globalBirdName);
    currentTimeGlobal = 0;
    audio2 = new Audio();
    isPlay = false;

    audio2.src = audioLink;
    audio2.currentTime = 0;

    setTimeout( function(){
        setDurationTime(audio2.duration);
    },
    500
    )

    function playAudio() {
        if (!isPlay) {
            audio2.currentTime = currentTimeGlobal;
            audio2.play()
            isPlay = true;
            setExactTime()
            setExactTime();
            audioPlayButton.style.background = `url("${Svg[2].pause}") center center / cover no-repeat`;
        } else {
            currentTimeGlobal = audio2.currentTime;
            audio2.pause()
            isPlay = false;
            setExactTime();
            audioPlayButton.style.background = `url("${Svg[2].play}") center center / cover no-repeat`;
        }
    }

    function convertTime(duration) {
        let minutes, seconds, minutesString, secondsString;
        minutes = Math.floor(duration/60);
        seconds = Math.floor(duration%60);
        minutesString = (minutes<10)?"0"+String(minutes):String(minutes);
        secondsString = (seconds<10)?"0"+String(seconds):String(seconds);
        return `${minutesString}:${secondsString}`;
    }
    
    function setDurationTime(duration) {
        audioDurationTime.innerHTML = convertTime(duration);
    }

    function setExactTime() {
        audioExactTime.innerHTML = convertTime(currentTimeGlobal);
        setTimeout(setExactTime, 100);
    }

    function updateProgress(e) {
        const {currentTime, duration} = e.srcElement;
        const currentValue = currentTime / duration *100;
        if (!isNaN(currentValue))  {
            currentTimeGlobal = currentTime; 
            audioProgress.value = currentValue;
        }
    }
    
    function setProgress() {
        const audioDuration = audio2.duration;
        audio2.currentTime = audioProgress.value / 100 * audioDuration;
        audio2.addEventListener('timeupdate', updateProgress);
    }

    function setValue() {
        audio2.volume = audioVolume.value/100;
    }

    function stopAudioNextQuestion() {
        if(nextButton.classList.contains("next__question-active"))
         {
            audio2.pause()
         }
    }

    function isSameBird(clicked, current) {
        let result = clicked.localeCompare(current);
        return (result == 0)?true:false;
    }

    function findAudioSourceByName(name) {
        let currentBird;
        for (let i = 0; i < birdsDataAll[lang][step].length; i++) {
            if (birdsDataAll[lang][step][i].name == name){
                currentBird = birdsDataAll[lang][step][i]
            }
        }
        return currentBird.audio;
    }

    answers.forEach((answer) => {
        answer.addEventListener('click', (event)=> {
            let birdName = event.target.innerHTML;

            if(!isSameBird(birdName, globalBirdName)){
                audio2.pause();
                audio2.src = findAudioSourceByName(birdName);
                currentTimeGlobal = 0;
                audio2.currentTime = currentTimeGlobal;
                globalBirdName = birdName;
                isPlay = false;
                audioProgress.value = 0;
                setExactTime();

                setTimeout( function(){
                    setDurationTime(audio2.duration);
                },
                500
                )
            } else {
                return
            }

        });
    });


    audio2.addEventListener('timeupdate', updateProgress);
    audioProgress.addEventListener('change', setProgress);
    audioVolume.addEventListener('input', setValue);
    nextButton.addEventListener('click', stopAudioNextQuestion);
    audioPlayButton.addEventListener('click', playAudio);
    setValue();
}

export function stopAudio2() {
    if (!isPlay) {
        return
    } else {
        currentTimeGlobal = 0;
        audio2.pause()
        isPlay = false;
    }
}

