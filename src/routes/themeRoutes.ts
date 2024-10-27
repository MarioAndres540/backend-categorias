import routerx from "express-promise-router";
import ThemeController from "../controllers/ThemeController";

const router = routerx();

router.get("/list", ThemeController.getAllThemes);
router.post("/create", ThemeController.createTheme);
router.post("/listTheme", ThemeController.listTheme);
router.patch("/editTheme", ThemeController.editTheme);
//router.put("/",ThemeController.editTheme);
router.delete("/deleteTheme", ThemeController.deleteTheme);

export default router;
