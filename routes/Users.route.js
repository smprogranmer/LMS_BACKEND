import { Router } from "express";
import {
  getAllUsers,
  registerUsers,
  loginUsers,
  logOutUsers,
  chengePassword, 
  upgradeProfile,
  getSingleUser,
  deleteUsers,
} from "../controllers/Users.controllers.js"
import isAuthenticatedUser from "../middlewares/auth.js"

const router = Router();

router.get("/admin",isAuthenticatedUser, getAllUsers);
router.get("/me", isAuthenticatedUser, getSingleUser);
router.post("/users/register", registerUsers);
router.post("/users/login", loginUsers);
router.post("/users/logOut", isAuthenticatedUser, logOutUsers);
router.delete("/admin/:id", isAuthenticatedUser, deleteUsers);
router.put("/me/change-password", isAuthenticatedUser, chengePassword);
router.put("/me/upgradeProfile", isAuthenticatedUser, upgradeProfile);

export default router;
