import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @summary Get the last sequential ID for a collection without incrementing the value
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which id is fetched
 * @returns {Promise<number>} - last sequential ID for the collection
 */
export default async function getIdForCollection(context, collectionName) {
  const { IdCounters } = context.collections;

  const counter = await IdCounters.findOne({ collectionName });

  if (!counter) {
    throw new ReactionError(
      "not-found",
      `ID Counter for collection "${collectionName}" could not be found`
    );
  }

  return counter.counterValue;
}
