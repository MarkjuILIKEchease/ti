import { Router } from "../deps.ts";

const router = Router();

// GET home page.
router.get("/", (_req, res, _next) => {
  res.render("index", {
    title: "Przystań",
    Createdby:"8"+"7"+"9"+"6",
  });

});

export default router;
