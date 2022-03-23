export const setFavoritesInStorage = (favs) => {
    localStorage.setItem("favorites", JSON.stringify(favs));
}

export const getFavoritesFromStorage = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
        return JSON.parse(favorites);
    }
    return {};
}