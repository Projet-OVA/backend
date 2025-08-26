"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    database: {
        url: process.env.DATABASE_URL ||
            "postgresql://user:password@localhost:5432/db",
    },
});
//# sourceMappingURL=configuration.js.map