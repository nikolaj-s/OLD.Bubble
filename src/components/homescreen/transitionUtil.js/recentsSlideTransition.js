

export const recentsSlideTransition = async () => {
    document.getElementsByClassName('clear-recents')[0].style.transition = '0.5s';
    document.getElementsByClassName('recents-container')[0].style.transform = "translateX(-150%)";
    document.getElementsByClassName('recents-title-container')[0].style.transform = "translateX(-150%)";
    document.getElementsByClassName('clear-recents')[0].style.transform = "translateX(-150%)";
}