export function fillUserProfile(user, firstPost, photoUrl) {
    return `
            <img class="user-photo" src="${photoUrl}" alt="user photo">
            <strong>${user.username}</strong>
            <p>${user.name}</p>
            <p>${user.email}</p>
            <p>${firstPost}</p>
            <button class="posts-button">More posts</button>  
    `;
}

export function fillPostBlock(post, counter) {
    return `
            <p>(#${counter + 1}) <strong>${post.title}</strong></p>
            <p>${post.body}</p>
    `;  
}
