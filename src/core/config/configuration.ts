export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/db",
  },
});
