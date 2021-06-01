require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
//process.env로 PORT 접근함
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      // token대신 user보냄/ getUser(토큰)넣어서 보냄
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({port:PORT}, () => {
    console.log(`💖 Server is running on http://localhost:${PORT}/graphql ✅`)
  });