
export const toggleMenu = bool => {

    const menu = document.getElementsByClassName('group-menu-container')[0];
    const menu_button = document.getElementsByClassName('group-menu-button')[0];

    if (bool) {
    
    //menu styles
    menu.style.right = '0';

    //menu_button styles
    menu_button.style.transition = '0.3s';
    menu_button.style.right = '93%';

    // rotate button and remove transition
    setTimeout(() => {
        menu_button.style.left = '0'
        menu_button.style.transition = '0s';
        setTimeout(() => {
            menu_button.style.transform = 'rotate(180deg)'; 
        }, 10)
    }, 290)
    
            
    } else {

        // style reset
        menu_button.style.transition = "0.3s";
        //menu_button.style.right = '';

        menu.style = '';

        
        menu_button.style = '';
        
    }
}