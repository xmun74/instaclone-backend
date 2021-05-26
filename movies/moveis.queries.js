import client from "../client";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }), //findUnique고유한것찾기 id로
  },
};
