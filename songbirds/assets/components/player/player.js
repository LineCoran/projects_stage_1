import Svg from "../../js/svg";
export default function createPlayer(number) {
    const player = document.createElement('div');
    player.className = `player player-${number}`;

    const playerControls = document.createElement('div');
    playerControls.className = 'player-controls';

    const button = document.createElement('button');
    button.classList.add('play');
    button.classList.add('player-icon');
    button.classList.add(`player-icon-${number}`);
    button.id = `play-${number}`;
    button.style.background = `url("${Svg[2].play}") center center / cover no-repeat`;

    const audioContaier = document.createElement('div');
    audioContaier.className = 'audio__container';

    const progress = document.createElement('input');
    progress.className = 'progress';
    progress.type = 'range';
    progress.min = '0';
    progress.max = '100';
    progress.value = '0'
    progress.id = `progress__audio-${number}`;

    const timeContainer = document.createElement('div');
    timeContainer.className = 'time__container';

    const exactTime = document.createElement('p');
    exactTime.className = 'exact-time';
    exactTime.id = `exact-time-${number}`;
    exactTime.innerHTML = "00:00";

    const durationTime = document.createElement('p');
    durationTime.className = 'duration-time';
    durationTime.id = `duration-time-${number}`;
    durationTime.innerHTML = "00:00";

    const volumeContainer = document.createElement('div');
    volumeContainer.className = 'volume__container';

    const volumeProgress = document.createElement('input');
    volumeProgress.className = 'volume progress';
    volumeProgress.id = `volume-${number}`;
    volumeProgress.type = "range";
    volumeProgress.min = '0';
    volumeProgress.max = '100';
    volumeProgress.value = '20';

    playerControls.append(button);
    timeContainer.append(exactTime, durationTime);
    volumeContainer.append(volumeProgress);

    audioContaier.append(progress, timeContainer, volumeContainer);

    player.append(playerControls, audioContaier)
    return player;
}