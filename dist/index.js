"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.get("", (req, res) => {
    res.send(`Server running on port ${port}.`);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
//# sourceMappingURL=index.js.map