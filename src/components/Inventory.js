import React from 'react';
import NewDishForm from './NewDishForm';
import EditDishForm from './EditDishForm';

const Inventory = ({
  dishes,
  updateDish,
  deleteDish,
  addDish,
  loadSamples
}) => {
  return (
    <div className="inventory">
      <h2>Inventory</h2>

      {Object.keys(dishes).map(key => {
        return (
          <EditDishForm
            dish={dishes[key]}
            key={key}
            id={key}
            updateDish={updateDish}
            deleteDish={deleteDish}
          />
        );
      })}
      <NewDishForm addDish={addDish} />

      <button onClick={loadSamples}>Load Sample Dishes</button>
    </div>
  );
};

export default Inventory;
