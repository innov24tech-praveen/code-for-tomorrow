import Category from '../models/categoryModel.js';
import Service from '../models/serviceModel.js';

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;  // Extract categoryId from the URL params
      const { name } = req.body;          // Extract name from the request body
  
      console.log("Received categoryId:", categoryId);  // Debugging: Log categoryId
      console.log("Received body name:", name);        // Debugging: Log name
  
      // Validate categoryId to ensure it's a valid number
      const parsedCategoryId = parseInt(categoryId, 10);
      console.log("Parsed categoryId:", parsedCategoryId);  // Log parsed value
  
      if (isNaN(parsedCategoryId)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
  
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
     
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      // Find the category by primary key (ID)
      const category = await Category.findByPk(parsedCategoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Update category name
      category.name = name;
  
      // Save the updated category
      await category.save();
  
      res.status(200).json({
        message: 'Category updated successfully',
        category,
      });
  
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while updating the category',
        error: error.message,
      });
    }
  };
  
  
  
  

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.findAll({ where: { categoryId } });
    if (services.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category with services' });
    }

    const result = await Category.destroy({ where: { id: categoryId } });
    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
