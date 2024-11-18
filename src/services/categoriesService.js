const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getDefaultCategories = async () => {
    const response = await fetch(backendUrl + '/getDefaultCategories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.Data;
}

export const getCategories = async (idToken) => {
    const response = await fetch(backendUrl + '/getCategories', {
        method: 'GET',
        headers: {
            'IdToken': idToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.Data;
};

export const createCategory = async (idToken, category) => {
    const response = await fetch(backendUrl + '/createCategory', {
        method: 'POST',
        headers: {
            'IdToken': idToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(category)
    });
    const data = await response.json();
    return data.Data;
};