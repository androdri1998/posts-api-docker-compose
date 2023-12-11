const config = {
  nodeEnv: process.env.NODE_ENV,
  appPort: process.env.NODE_POSTS_API_PORT || "3000",
  nodeAppHost: process.env.NODE_APP_HOST || "127.0.0.1",
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    database: process.env.MYSQL_DATABASE || "database",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    port: process.env.MYSQL_PORT || "3306",
  },
};

export default config;
