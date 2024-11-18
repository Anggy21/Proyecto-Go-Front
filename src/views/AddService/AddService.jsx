import { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/sideBar';
import Header from '../../components/Header/Header';
import Modal from '../../components/ModalCategory/ModalCategory';
import './AddService.scss';
import { getDefaultCategories, getCategories, createCategory } from '../../services/categoriesService';
import createSubscription from '../../services/SubscriptionService';

const AddService = () => {
  const [categories, setCategories] = useState([]);
  const idToken = window.localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Estados de formulario
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [cost, setCost] = useState(0);
  const [deadline, setDeadline] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [service, setService] = useState('');

  useEffect(() => {
    const allCategories = [];

    getDefaultCategories().then((data) => {
      allCategories.push(...data);

      getCategories(idToken).then((data) => {
        if (data != null) allCategories.push(...data);
        setCategories(allCategories);
      });
    });
  }, [idToken]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'service':
        setService(e.target.value);
        break;
      case 'paymentFrequency':
        setPaymentFrequency(e.target.value);
        break;
      case 'cost':
        setCost(parseFloat(e.target.value));
        break;
      case 'deadline':
        setDeadline(new Date(e.target.value).toISOString());
        break;
      case 'categoryId':
        setCategoryId(parseInt(e.target.value));
        break;
      default:
        break;
    }
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      createCategory(idToken,{name:newCategoryName}).then((data) => {
        if (data !== null) {
          alert('Categoría creada');
          setIsModalOpen(false);
          setNewCategoryName('');
          window.location.reload();
        } else {
          alert('Error al crear la categoría');
        }
      });
    }
  };

  const handleSubmit = (e) => {
    const subscription = {
      service,
      paymentFrequency,
      cost,
      deadline,
      categoryId,
      startTime: new Date().toISOString(),
    };

    console.log(subscription);

    createSubscription(subscription, idToken).then((data) => {
      if (data !== null) {
        alert('Subscripción creada');
        window.location.reload();
      } else {
        alert('Error al crear la subscripción');
      }
    });

    e.preventDefault();
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="form-container">
        <h2>Agregar nueva subscripción</h2>
        <div className="form-group">
          <label>Servicio</label>
          <input type="text" name="service" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Periodicidad</label>
          <select name="paymentFrequency" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="MONTHLY">Mensual</option>
            <option value="YEARLY">Anual</option>
            <option value="WEEKLY">Semanal</option>
          </select>
        </div>
        <div className="form-group">
          <label>Costo</label>
          <input type="text" name="cost" onChange={handleChange} placeholder="$0000" />
        </div>
        <div className="form-group">
          <label>Fecha de vencimiento</label>
          <input type="date" name="deadline" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select name="categoryId" onChange={handleChange}>
            <option value="" disabled selected>
              Seleccionar
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button className="form-group-add-category" onClick={handleAddCategory}>
            Agregar categoría personalizada
          </button>
          <button className="form-group-button" onClick={handleSubmit} type="submit">
            Añadir
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCategory}
        title="Crear Nueva Categoría"
      >
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default AddService;
