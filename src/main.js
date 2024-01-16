import { API_URL } from './api/api.js'
import { fetchData } from './utils/utils.js'
import { handleHashChange } from './router.js'
import { buildElement } from './utils/htmlBuilder.js'
import { fillUserProfile, fillPostBlock } from './templates/templates.js'


window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
});

export const container = document.querySelector('.container');

export async function loadUsersData() {
  try {
    const [users, posts, photos] = await Promise.all([
      fetchData(`${API_URL}/users`),
      fetchData(`${API_URL}/posts`),
      fetchData(`${API_URL}/photos`)
    ]);
    
    renderUsersProfile(users, posts, photos);
    
  } catch (error) {
    console.error(error.message);
  }
}


function renderUsersProfile(users, posts, photos) {
  container.innerHTML = '';

  users.forEach(user => {
    const firstPost = posts.find(post => post.userId === user.id).body;
    const firstPhoto = photos.find(photo => photo.albumId === user.id).url;
    
    const userProfile = buildElement('div', 'user-profile', fillUserProfile(user, firstPost, firstPhoto));
    container.appendChild(userProfile);

    const morePostsButton = userProfile.querySelector('.posts-button');
    morePostsButton.addEventListener('click', () => {
      renderAllPosts(user.id);
      let hash = `#/userId=${user.id}`;
      history.pushState(null, '', hash);
    });
  });
}


export async function renderAllPosts(userId) {
  container.innerHTML = '';
  
  const posts = await fetchData(`${API_URL}/posts?userId=${userId}`);

  posts.forEach((post, counter) => {
    const postBlock = buildElement('div', 'post-block', fillPostBlock(post, counter));
    container.appendChild(postBlock);
  });

  const backButton = buildElement('button', 'back-button', 'Back to Main Page');
  backButton.addEventListener('click', () => {
    history.pushState(null, null, '/');
    handleHashChange();
  });

  container.appendChild(backButton);
}