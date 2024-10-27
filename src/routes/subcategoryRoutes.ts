import routerx from "express-promise-router";
import SubCategoryController from "../controllers/SubCategory.controller";

const router = routerx();

router.get("/list", SubCategoryController.getAllSubCategory);
router.post("/listSubCategory", SubCategoryController.listSubCategory);
router.post("/create", SubCategoryController.createSubCategory);
router.patch("/edit", SubCategoryController.editSubCategory);
router.delete("/delete", SubCategoryController.deleteSubCategory);

export default router;
