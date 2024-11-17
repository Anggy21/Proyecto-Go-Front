const getNextPayments = async (idToken) => {
    const response = await fetch('http://localhost:8080/GetNextPayments', {
        method: 'GET',
        headers: {
            'IdToken': idToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    return await response.json();
}

export default getNextPayments;