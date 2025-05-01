const Category = require("../model/category.model");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ message: "Categories fetched", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category found", category });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ error: "Failed to get category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const [updated] = await Category.update(
      { name, description },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: "Category not found or not updated" });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json({ message: "Category updated", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
