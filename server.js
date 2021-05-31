require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
//process.env로 PORT 접근함
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      // token대신 user보냄/ getUser(토큰)넣어서 보냄
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

server
  .listen(PORT)
  .then(() =>
    console.log(`💖 Server is running on http://localhost:${PORT} ✅`)
  );
