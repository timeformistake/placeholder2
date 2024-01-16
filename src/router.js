import { loadUsersData, renderAllPosts, } from './main.js'

export function handleHashChange() {
    const path = window.location.hash.slice(2);

    if (path === "") {
        loadUsersData();
    } else if (path.startsWith('userId=')) {
        const userId = parseInt(path.split('=')[1]);
        renderAllPosts(userId);
    } else {
        container.innerHTML = '<h1>404</h1>';
    }
}