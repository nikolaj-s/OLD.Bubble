export const scrollToBottom = (element) => {
    const object = document.getElementById('scroll-container');
    if (!object) return;
    object.scrollTop = object.scrollHeight;
}