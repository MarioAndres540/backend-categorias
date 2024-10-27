import routerx from "express-promise-router";
import CategoryController from "../controllers/CategoryController";

const router = routerx();

router.get("/getAll", CategoryController.getAllCategory);
router.post("/list", CategoryController.listCategory);
router.patch("/edit", CategoryController.editCategory);
router.post("/create", CategoryController.createCategory);
router.delete("/delete", CategoryController.deleteCategory);
router.delete("/deleteSub", CategoryController.deleteSubCategory);

export default router;
