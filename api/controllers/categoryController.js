const Category = require("../models/Category");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategory, image } = req.body;

    const category = new Category({
      name,
      image,
    });

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent)
        return res.status(404).json({ message: "Parent category not found" });
      parent.childrenCategories.push(category._id);
      await parent.save();
    }

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all top-level categories (no parent)
exports.getTopCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parentCategory: null });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by parent category ID
exports.getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await Category.find({ parentCategory: categoryId });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.parentCategory) {
      const parent = await Category.findById(category.parentCategory);
      parent.childrenCategories = parent.childrenCategories.filter(
        (childId) => childId.toString() !== id
      );
      await parent.save();
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
