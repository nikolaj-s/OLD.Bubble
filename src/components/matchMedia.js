export const matchMedia = () => {
    const screen = window.matchMedia("(max-width: 1099px)");
    if (!screen.matches) {
        return true;
    } else {
        return false;
    }
}