require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
//process.env로 PORT 접근함
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      // HTTP에서 동작
      return {
        // token대신 user보냄/ getUser(토큰)넣어서 보냄
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      // WS에서 동작
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser, //return값 loggedInUser은 연결될때 http헤더전달함. 위 context로 들어간다.
      };
    },
  },
});

const app = express();
app.use(logger("dev"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`💖 Server is running on http://localhost:${PORT}/graphql ✅`);
});
