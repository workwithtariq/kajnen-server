const express = require('express');
const router = express.Router();
const {
  createCategory,
  getTopCategories,
  getSubCategories,
  updateCategory,
  deleteCategory,
  getCategoryById
} = require('../controllers/categoryController');

// CRUD Routes for Categories
router.post('/', createCategory);
router.get('/top', getTopCategories); // Fetch top-level categories
router.get('/:categoryId', getCategoryById); // Fetch top-level categories
router.get('/:categoryId/subcategories', getSubCategories); // Fetch subcategories
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
