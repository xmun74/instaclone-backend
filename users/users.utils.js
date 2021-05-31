import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    // 토큰없으면(로그인해도토큰없음) null리턴(유저없다)
    if (!token) {
      return null;
    }
    // 토큰 확인
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    // 유저 찾기
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user; // 찾은 유저 리턴
    } else {
      return null;
    }
    // await때문에 모르는 에러생길수 있으니 try-catch사용
  } catch (error) {
    return null;
  }
};
