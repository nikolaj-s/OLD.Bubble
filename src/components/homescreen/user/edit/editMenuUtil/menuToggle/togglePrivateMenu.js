export const toggleprivateMenu = (bool) => {
    if (bool) {
        document.getElementsByClassName('edit-private-container')[0].style.marginTop = "0"
        document.getElementsByClassName('edit-private-container')[0].style.opacity = "1"
        document.getElementsByClassName('edit-private-container')[0].style.height = "auto"
        document.getElementsByClassName('private-edit-arrow')[0].style.transform = 'rotate(180deg)';
    } else {
        document.getElementsByClassName('edit-private-container')[0].style = ""
        document.getElementsByClassName('private-edit-arrow')[0].style.transform = '';
    }
}