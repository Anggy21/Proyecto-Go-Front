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
    "ERROR": "Error",
    'FAILED': "Fallido",
    'OVERDUE': "Atrasado",
}

const paymentFrequency = {
    "MONTHLY": "Mensual",
    "YEARLY": "Anual",
    "WEEKLY": "Semanal",
}

export { formatCurrency,paymentStatus,paymentFrequency};