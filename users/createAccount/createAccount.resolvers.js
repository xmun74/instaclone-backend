import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password } //사용자가 줄 데이터
    ) => {
      try {
        //1. check if username or email are already on DB. (@unigue인 것 체크)
        const existingUser = await client.user.findFirst({
          //조건맞는 첫번째사용자 리턴
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
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        // 2. 비번을 DB에 글자그대로 저장하면 안됨! 맞는지만 체크=>hash사용:텍스트이상하게 만들어줌
        const uglyPassword = await bcrypt.hash(password, 10);
        // 3. save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
