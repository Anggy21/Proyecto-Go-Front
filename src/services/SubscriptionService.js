const backendUrl = import.meta.env.VITE_BACKEND_URL;

const createSubscription = async (subscription,idToken) => {

    console.log("desde la petición: ",subscription);  

    const response = await fetch(backendUrl + '/subscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'IdToken': idToken
        },
        body: JSON.stringify(subscription)
    });
    const data = await response.json();
    return data.Data;
};

export default  createSubscription;