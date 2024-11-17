const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getNotifications = async (token) => {
    try {
        const response = await fetch(backendUrl + "/notifications", {
            method: 'GET',
            headers: {
                'IdToken': token,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.Data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

export { getNotifications };