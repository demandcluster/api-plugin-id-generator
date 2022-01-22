import ensureCounterExistForCollection from "../utils/ensureCounterExistForCollection.js";

/**
 * @summary Get the last sequential ID for a collection without incrementing the value
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which id is fetched
 * @returns {Promise<number>} - last sequential ID for the collection
 */
export default async function getIdForCollection(context, collectionName) {
  const { IdCounters } = context.collections;

  await ensureCounterExistForCollection(context, collectionName);
  const counter = await IdCounters.findOne({ collectionName });

  return counter.counterValue;
}
