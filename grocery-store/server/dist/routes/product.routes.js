"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = (0, express_1.Router)();
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProduct);
router.post("/", auth_middleware_1.default, admin_middleware_1.default, upload_middleware_1.default.single("image"), product_controller_1.createProduct);
router.put("/:id", auth_middleware_1.default, admin_middleware_1.default, upload_middleware_1.default.single("image"), product_controller_1.updateProduct);
router.delete("/:id", auth_middleware_1.default, admin_middleware_1.default, product_controller_1.deleteProduct);
exports.default = router;
