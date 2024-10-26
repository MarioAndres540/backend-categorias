import routerx from "express-promise-router";
import { Request, Response } from "express";
import themeRoutes from "./themeRoutes";
import subcategoryRoutes from "./subcategoryRoutes";
import categoryRoutes from "./categoryRoute";

const router = routerx();

router.get("/ping", async (_req: Request, res: Response) => {
    return res.send("pong");
});

router.use("/theme", themeRoutes);
router.use("/subcategory", subcategoryRoutes);
router.use("/category", categoryRoutes);

export default router;
