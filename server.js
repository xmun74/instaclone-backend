require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;
//process.env로 PORT 접근함
server
  .listen(PORT)
  .then(() => console.log(`💖 Server is running on http://localhost:${PORT}/`));
