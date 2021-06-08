import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        // 1. parse caption
        if (caption) {
          // 2. get or create Hashtag
          hashtagObj = processHashtags(caption);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // 3. save the photo with the parsed hashtags
        // 4. add the photo to the hashtags
      }
    ),
  },
};
