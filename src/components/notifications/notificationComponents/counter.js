
export const counter = (numberOfComments) => {
    if (numberOfComments > 0) {
        document.getElementsByClassName('notification-counter')[0].innerHTML = numberOfComments;
        document.getElementsByClassName('notification-counter')[0].style.opacity = "1";
    } else {
        document.getElementsByClassName('notification-counter')[0].innerHTML = numberOfComments;
        document.getElementsByClassName('notification-counter')[0].style.opacity = "0";
    }
}