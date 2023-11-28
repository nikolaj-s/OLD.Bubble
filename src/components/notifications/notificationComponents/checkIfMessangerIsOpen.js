import { clearByUser } from "../../../util/notificationUtil/notificationUtil";


export const checkIfMessangerIsOpen = (data) => {
    if (window.location.pathname.startsWith('/message')) {
        const id = window.location.pathname.split('/')[2];
        if (id === data.user && data.type === 'message') {
            clearByUser(data.user);
            return true;
        } else {
            return false;
        }
    }
    return false;
}