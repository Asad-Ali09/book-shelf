import { Router } from "express";
import { isLoggedIn, login, logout, signUp } from "../controllers/User";

const router = Router();

router.route("/signup").post(signUp);
router.route("/").post(login).get(logout);
router.route("/isloggedin").get(isLoggedIn);

export default router;
