import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

setPlayerTime();

player.on('timeupdate', throttle(onPlayTime, 1000));
function onPlayTime({seconds}) {
    localStorage.setItem('videoplayer-current-time', seconds);
}

function setPlayerTime() {
    const currentTime = localStorage.getItem('videoplayer-current-time');
    if (currentTime) player.setCurrentTime(currentTime);
}