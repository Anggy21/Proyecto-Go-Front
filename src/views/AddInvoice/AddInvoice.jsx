import React, { useState } from 'react';
import './AddInvoice.scss'

const AgregarFactura = () => {
  const [factura, setFactura] = useState({
    periodicidad: '',
    monto: '',
    fechaVencimiento: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos al backend o guardarlos en el estado
    console.log(factura);
  };

  return (
    <div className="form-container">
      <h2>Agregar nueva factura</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Servicio</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Periodicidad</label>
          <select name="periodicidad" value={factura.periodicidad} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
            {/* Añadir más opciones según corresponda */}
          </select>
        </div>
        <div className="form-group">
          <label>Monto</label>
          <input
            type="text"
            name="monto"
            value={factura.monto}
            onChange={handleChange}
            placeholder="$0000"
          />
        </div>
        <div className='form-group'>
        <label>Fecha de inicio</label>
        <input type="date" name="start_date" />
        </div>
        <div className="form-group">
          <label>Fecha de vencimiento</label>
          <input
            type="date"
            name="fechaVencimiento"
            value={factura.fechaVencimiento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select name="categoria" value={factura.categoria} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="internet">Internet</option>
            <option value="electricidad">Electricidad</option>
            {/* Añadir más categorías según corresponda */}
          </select>
        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
};

export default AgregarFactura;
