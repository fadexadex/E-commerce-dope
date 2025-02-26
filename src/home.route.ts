import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send({
        message:
        "Welcome to E-commerce API, go to the documentation here for more info on how to interact with it: https://documenter.getpostman.com/view/29521209/2sAYdfoW4f",
    });
});

export default router;
