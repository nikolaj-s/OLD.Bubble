


export const togglePasswordMenu = (bool) => {
    if (bool) {
        document.getElementsByClassName('edit-password-container')[0].style.marginTop = "0"
        document.getElementsByClassName('edit-password-container')[0].style.opacity = "1"
        document.getElementsByClassName('edit-password-container')[0].style.height = "auto"
        document.getElementsByClassName('password-edit-arrow')[0].style.transform = 'rotate(180deg)';
    } else {
        document.getElementsByClassName('edit-password-container')[0].style = ""
        document.getElementsByClassName('password-edit-arrow')[0].style.transform = '';
    }
}