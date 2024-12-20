const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getPayments = async (idToken) => {
    const response = await fetch(backendUrl + '/GetPayments', {
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

export const getNextPayments = async (idToken) => {
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

export const updatePayment = async (idToken, paymentId, status) => {
    const response = await fetch(backendUrl + '/UpdatePayment', {
        method: 'PUT',
        headers: {
            'IdToken': idToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: paymentId,
            status
        })
    });
    const data = await response.json();
    return data.Data;
}
