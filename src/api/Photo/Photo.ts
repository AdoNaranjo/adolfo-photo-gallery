import axios from 'axios';
import { apiEndPoint } from '../../utils';

export interface Location {
    name: string;
    city: string;
    country: string;
}
export interface URL {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface Link {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface User {
    name: string;
    total_likes: number;
}
export interface Photo {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    downloads: number;
    likes: number;
    liked_by_user: boolean;
    description: string;
    location: Location;
    urls: URL;
    links: Link;
    user: User;
}
export interface RandomParam {
    callback: (error: string | null, response: Photo[] | null) => void;
    max: number;
}

export const getPhotos = async (page: number): Promise<Photo[]> => {
    try {
        const res = await axios.get(apiEndPoint.photos(), {
            params: {
                per_page: 9,
                page,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const searchPhotos = async (
    page: number,
    searchText = ''
): Promise<{ results: Photo[]; total_pages: number; total: number }> => {
    try {
        const res = await axios.get(apiEndPoint.searchPhotos(), {
            params: {
                per_page: 9,
                page,
                ...(searchText ? { query: searchText } : {}),
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
