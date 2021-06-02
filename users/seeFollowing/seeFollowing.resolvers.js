import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      // 유저있는지 체크
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0, //lastId존재하면 1스킵, 없으면 0스킵
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
