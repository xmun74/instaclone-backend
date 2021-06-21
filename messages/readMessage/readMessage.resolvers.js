import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
// 메시지 읽음 표시
export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id, //내가 메시지보낸 사용자 아닐때
          },
          room: {
            // 그 방에 내가 있고
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found.",
        };
      }
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
