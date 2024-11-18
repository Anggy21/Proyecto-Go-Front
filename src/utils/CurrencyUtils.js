const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP'
    }).format(value);
};

const paymentStatus = {
    "PENDING": "Pendiente",
    "SUCCESS": "Pagado",
    "CANCELED": "Cancelado",
}

const paymentFrequency = {
    "MONTHLY": "Mensual",
    "YEARLY": "Anual",
    "WEEKLY": "Semanal",
}

export { formatCurrency,paymentStatus,paymentFrequency};