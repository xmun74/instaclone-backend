import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

// **모든 폴더안  *모든파일
// loadFilesSync는 export default한 것 가져옴
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.js`
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
