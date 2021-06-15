import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!photo) {
        //사진못찾았으면
        return {
          ok: false,
          error: "Photo not found.",
        };
      } else if (photo.userId !== loggedInUser.id) {
        //사진삭제유저랑 사진주인유저랑 같은지 확인
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        //사진존재, 로그인유저가 사진삭제유저랑같다면 삭제
        await client.photo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
