import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onGetCurrentTime, 1000));
player.on('play', onPlayFromSavedTime);

function onGetCurrentTime() {
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem(STORAGE_KEY, seconds);
    });
}

function onPlayFromSavedTime() {
    const savedTime = localStorage.getItem(STORAGE_KEY);
    player.setCurrentTime(savedTime);
}
