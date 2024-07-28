import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';
import uploadFiles from '../middlewares/uploadFile.js';

const categoryRouter = express.Router();
categoryRouter.use(uploadFiles);

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.patch('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
