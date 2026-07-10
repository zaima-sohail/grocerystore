"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = (0, express_1.Router)();
router.post("/register", auth_controllers_1.register);
router.post("/login", auth_controllers_1.login);
router.get("/profile", auth_middleware_1.default, auth_controllers_1.profile);
router.get("/admin", auth_middleware_1.default, admin_middleware_1.default, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin 👑",
    });
});
router.put("/profile", auth_middleware_1.default, auth_controllers_1.updateProfile);
exports.default = router;
