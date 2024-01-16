export function buildElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;
}