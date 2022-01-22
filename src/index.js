import pkg from "../package.json";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "ID generator",
    name: "id-generator",
    version: pkg.version,
    collections: {
      IdCounters: {
        name: "IdCounters",
        indexes: [
          [{ collectionName: 1 }]
        ]
      }
    },
    mutations,
    queries
  });
}
