import Logger from "@reactioncommerce/logger";
import ensureCounterExistForCollection from "../utils/ensureCounterExistForCollection.js";
import incrementCounter from "../utils/incrementCounter.js";

/**
 * @summary Generates a sequential ID
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which the id is being generated
 * @returns {Promise<number>} - generated ID
 */
export default async function generateNextId(context, collectionName) {
  const session = context.app.mongoClient.startSession();

  try {
    session.withTransaction(async () => {
      await ensureCounterExistForCollection(context, collectionName);
      await incrementCounter(context, collectionName);
    });
  } catch (error) {
    Logger.error(error);
  } finally {
    await session.endSession();
  }

  return 0;
}
