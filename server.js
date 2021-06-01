require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
//process.env로 PORT 접근함
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      // token대신 user보냄/ getUser(토큰)넣어서 보냄
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

server
  .listen(PORT)
  .then(() =>
    console.log(`💖 Server is running on http://localhost:${PORT} ✅`)
  );
