"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controllers_1 = require("../controllers/product-controllers");
const router = (0, express_1.Router)();
router.post('/', product_controllers_1.createProduct);
router.get('/', product_controllers_1.getAllProducts);
router.get('/:id', product_controllers_1.getProductById);
exports.default = router;
