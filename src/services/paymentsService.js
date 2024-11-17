const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getNextPayments = async (idToken) => {
    const response = await fetch(backendUrl + '/GetNextPayments', {
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

export default getNextPayments;