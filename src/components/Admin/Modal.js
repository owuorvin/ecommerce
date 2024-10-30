// Modal.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const Modal = ({ isOpen, onClose, title, onSubmit, initialValues, categories }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="form-field">
                <Field name="name" placeholder="Product Name" />
              </div>
              <div className="form-field">
                <Field name="price" type="number" placeholder="Price" />
              </div>
              <div className="form-field">
                <Field name="category" as="select">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="form-field">
                <Field name="image" placeholder="Image URL" />
              </div>
              <div className="form-field">
                <Field name="description" placeholder="Description" />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
