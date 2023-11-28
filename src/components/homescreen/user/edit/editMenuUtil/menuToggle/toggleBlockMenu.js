

export const toggleBlockMenu = (bool) => {
    if (bool) {
        document.getElementsByClassName('edit-blocked-list-container')[0].style.marginTop = "0"
        document.getElementsByClassName('edit-blocked-list-container')[0].style.opacity = "1"
        document.getElementsByClassName('edit-blocked-list-container')[0].style.height = "auto"
        document.getElementsByClassName('edit-blocked-list-container')[0].style.display = 'flex';
        document.getElementsByClassName('block-edit-arrow')[0].style.transform = 'rotate(180deg)';
    } else {
        document.getElementsByClassName('edit-blocked-list-container')[0].style = ""
        document.getElementsByClassName('block-edit-arrow')[0].style.transform = '';
    }
}