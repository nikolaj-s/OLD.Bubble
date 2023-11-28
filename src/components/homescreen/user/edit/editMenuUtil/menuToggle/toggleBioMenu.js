


export const toggleBioMenu = (bool) => {
    if (bool) {
        document.getElementsByClassName('edit-bio-container')[0].style.marginTop = "0"
        document.getElementsByClassName('edit-bio-container')[0].style.opacity = "1"
        document.getElementsByClassName('edit-bio-container')[0].style.height = "200px"
        document.getElementsByClassName('bio-edit-arrow')[0].style.transform = 'rotate(180deg)';
    } else {
        document.getElementsByClassName('edit-bio-container')[0].style = ""
        document.getElementsByClassName('bio-edit-arrow')[0].style.transform = '';
    }
}