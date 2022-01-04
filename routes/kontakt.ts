import { Router } from "../deps.ts";

const router = Router();

// GET users listing.
router.get("/", (_req, res, _next) => {
    // res.send("Users are coming kontakt!");
    res.render("kontakt", {
        title: "Przystań",
        Createdby:"8796",
        adres1: "Okartowo 21-310 Henniewicka 13",
        tel1: "(+48) 501-213-123",
        email1: "przystan@przystan.pl",
        adres2: "Frombork 32-310 Rybacka 13",
        tel2: "(+48) 501-213-124",
        email2: "przystan-morska@przystan.pl",
});
});
export default router;
