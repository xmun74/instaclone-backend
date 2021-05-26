import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      //check if username or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
      // 비밀번호는 DB에 글자그대로 저장하면 안됨! 맞는지만 알아야함 =>hash사용:텍스트이상하게 만들어줌
      // hask password
      const uglyPassword = await bcrypt.hash(password, 10);

      //save and return the user
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    },
  },
};
