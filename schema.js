import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

// **모든 폴더안  *모든파일
// loadFilesSync는 export default한 것 가져옴
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
