"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user-controllers");
const router = (0, express_1.Router)();
router.get('/:email', user_controllers_1.getUserByEmail);
router.post('/', user_controllers_1.createNewUser);
exports.default = router;
