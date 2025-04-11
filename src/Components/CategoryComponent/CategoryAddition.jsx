import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { saveCategory, generateCategoryId } from "../../Services/CategoryService";

const CategoryAddition = () => {
  const history = useNavigate();
  const [category, setCategory] = useState({
    categoryId: 0,
    categoryName: "",
    description: ""
  });

  const [newId, setNewId] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const setCategoryId = () => {
    generateCategoryId()
      .then((response) => {
        setNewId(response.data);
      })
      .catch(error => console.error("Error generating category ID:", error));
  };

  useEffect(() => {
    setCategoryId();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCategory(values => ({ ...values, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!category.categoryName.trim()) {
      formErrors.categoryName = "Category name is required";
      isValid = false;
    }

    if (!category.description.trim()) {
      formErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const categorySave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    category.categoryId = newId;
    saveCategory(category)
      .then(() => {
        alert("Category Added Successfully");
        navigate('/AdminMenu');
      })
      .catch(error => {
        console.error("Error saving category:", error);
        alert("Failed to add category");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4 text-primary">Category Addition</h2>

        <form>
          <div className="form-group">
            <label>Category Id: </label>
            <input
              placeholder="Category Id"
              name="categoryId"
              className="form-control"
              value={newId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Category Name: </label>
            <input
              placeholder="Category Name"
              name="categoryName"
              className="form-control"
              value={category.categoryName}
              onChange={onChangeHandler}
            />
            {errors.categoryName && <small className="text-danger">{errors.categoryName}</small>}
          </div>

          <div className="form-group">
            <label>Category Description: </label>
            <input
              placeholder="Category Description"
              name="description"
              className="form-control"
              value={category.description}
              onChange={onChangeHandler}
            />
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>

          <button className="btn btn-success mt-3" onClick={categorySave}>Save</button>
          <button type="button" className="btn btn-danger mt-3 ml-2" onClick={() => history(-1)}>Return</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAddition;
