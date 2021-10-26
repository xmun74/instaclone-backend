import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, { loggedInUser }) =>
      client.photo.findMany({
        take: 2, //2개만 표시하고 나머진 offset으로 스킵.표시안함
        skip: offset,
        where: {
          OR: [
            {
              //팔로워목록에 내 아이디가진 유저의 사진찾기
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id, //내 사진
            },
          ],
        },
        orderBy: {
          createdAt: "desc", //desc내림차순(최신순)
        },
      })
    ),
  },
};
