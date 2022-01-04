import { Router } from "../deps.ts";

const router = Router();

// // GET users listing.
 router.get("/", (_req, res, _next) => {
//     res.send("Users are coming rezerwacja!");
// });
res.render("rezerwacja", {
    title: "Przystań",
    Createdby:"8"+"7"+"9"+"6",
});
});
export default router;
