export const checkIfGroupIsOpen = (group_name) => {

    let name = group_name.replace(/ /g, '%20');

    if (`/group/${name}` === window.location.pathname) {
        return true;
    } else {
        return false;
    }

}