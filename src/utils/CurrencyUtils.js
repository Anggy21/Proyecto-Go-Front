const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP'
    }).format(value);
};

export { formatCurrency };