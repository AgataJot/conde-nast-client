export const processResponse = async (response: Response) => {
    if (response.ok) {
        try {
            return await response.json();
        } catch (ex) {
            return;
        }
    } else {
        throw await {
            statusText: response.statusText,
            status: response.status,
        };
    }
};

const API_HOST = "http://localhost:3000";

export const setCode = async (apiKey: string) => {
    return fetch(`${API_HOST}/api-key`, {
        body: JSON.stringify({ apiKey }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    }).then(processResponse);
};

export const checkHasAPIKey = async () => {
    return fetch(`${API_HOST}/api-key`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    }).then(processResponse);
};

export const deleteApiKey = async () => {
    return fetch(`${API_HOST}/api-key`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    }).then(processResponse);
};

export const search = async (q: string, page: number) => {
    return fetch(`${API_HOST}/search`, {
        body: JSON.stringify({ q, page }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    }).then(processResponse);
};

export const getRecentSearches = async () => {
    return fetch(`${API_HOST}/searches`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    }).then(processResponse);
};

export const deleteRecentSearches = async () => {
    return fetch(`${API_HOST}/searches`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    }).then(processResponse);
};

const API = {
    setCode: setCode,
    search: search,
    getRecentSearches: getRecentSearches,
    deleteRecentSearches: deleteRecentSearches,
    checkHasAPIKey: checkHasAPIKey,
    deleteApiKey: deleteApiKey,
};

export default API;
