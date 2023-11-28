

export let nightModeCookie = false;

export const toggleNightMode = (bool) => {
    nightModeCookie = bool;

    if (bool) {
        document.getElementById('root').style.filter = 'invert()';
        document.getElementById('root').style.backgroundColor = 'rgb(185, 185, 185)';
        document.getElementsByClassName('profile-button')[0].style.filter = 'invert()';

        const img = document.getElementsByTagName('img')
        const video = document.getElementsByTagName('video');
        for (let i = 0; i < video.length; i++) {
            video[i].style.filter = 'invert()'
        }
        for (let i = 0; i < img.length; i++) {
            img[i].style.filter = 'invert()'
        }
        try {
            document.getElementsByClassName('notification-counter')[0].style.filter = 'invert()';
        } catch (e) {

        }
    } else {
        document.getElementById('root').style.filter = '';
        document.getElementsByClassName('profile-button')[0].style.filter = '';
        document.getElementById('root').style.backgroundColor = '';
        const img = document.getElementsByTagName('img')
        const video = document.getElementsByTagName('video');
        for (let i = 0; i < video.length; i++) {
            video[i].style.filter = ''
        }
        for (let i = 0; i < img.length; i++) {
            img[i].style.filter = ''
        }
        try {
        document.getElementsByClassName('notification-counter')[0].style.filter = '';
        } catch(e) {

        }
    }

    
}   

export const imageNightMode = () => {
    try {
        if (nightModeCookie === true) {
            return 'invert()';
        } else {
            return null;
        } 
    } catch (error) {
        document.getElementById('root').style.filter = '';
        return null;
    }
}

export const NSFWNightModeFilter = (NSFW, pref) => {
    try {

        if (nightModeCookie === true && NSFW === true && pref === true) {
            return 'invert() blur(40px)';
        } else if (nightModeCookie === true && (NSFW === false || pref === false)) {
            return 'invert()';
        } else if (NSFW === true && pref === true) {
            return 'blur(40px)'
        } else {
            return null
        }

    } catch (error) {
        return null;
    }
}