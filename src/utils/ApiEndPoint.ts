const baseURL = `${process.env.REACT_APP_API ?? ''}/api`;

export const apiEndPoint = {
    photos: () => `${baseURL}/photos`,
    searchPhotos: () => `${baseURL}/search/photos`,
};
