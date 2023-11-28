


export const toggleImageMenu = (bool) => {
    if (bool) {
        document.getElementsByClassName('edit-picture-container')[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByClassName('edit-picture-container')[0].style.marginTop = "0"
            document.getElementsByClassName('edit-picture-container')[0].style.opacity = "1"
            document.getElementsByClassName('edit-picture-container')[0].style.height = "auto"
            document.getElementsByClassName('picture-edit-arrow')[0].style.transform = 'rotate(180deg)';
        })    
    } else {
        document.getElementsByClassName('edit-picture-container')[0].style.marginTop = ""
        document.getElementsByClassName('edit-picture-container')[0].style.opacity = ""
        document.getElementsByClassName('edit-picture-container')[0].style.height = ""
        document.getElementsByClassName('picture-edit-arrow')[0].style.transform = '';
        document.getElementsByClassName('picture-edit-arrow')[0].style.transform = '';
        setTimeout(() => {
            document.getElementsByClassName('edit-picture-container')[0].style.display = "none"
        }, 300)
    }
}