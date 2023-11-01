"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const errorStatus = 500;
    const errorMessage = (err === null || err === void 0 ? void 0 : err.message) || 'An unexpected error occurred';
    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
};
exports.default = errorHandler;
