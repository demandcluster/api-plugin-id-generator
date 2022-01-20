import Random from "@reactioncommerce/random";
import { IdCounterSchema } from "../simpleSchemas.js";

const defaultInitialValue = 0;

/**
 * @summary Checks if environmental variable defining the initial generation value exist for a specified collection
 * @param {Object} collectionName - the name of the collection for which the id is being generated
 * @returns {number} - the initial generation value or 0 if env var not defined
 */
function getInitialCounterValueForCollection(collectionName) {
  const envNamePrefix = collectionName.replace(/([A-Z])/g, " $1")
    .toUpperCase()
    .split(" ")
    .join("_");

  return process.env[`${envNamePrefix}_ID_GENERATOR_INITIAL_VALUE`] || defaultInitialValue;
}

/**
 * @summary Creates a new sequence counter for a specified collection
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which the id is being generated
 * @returns {number} - the initial generation value or 0 if env var not defined
 */
function createNewCounter(context, collectionName) {
  const { IdCounters } = context.collections;

  const newCounter = {
    _id: Random.id(),
    collectionName,
    counterValue: getInitialCounterValueForCollection(collectionName) - 1
  };

  IdCounterSchema.validate(newCounter);

  IdCounters.insertOne(newCounter);
}

/**
 * @summary Creates a new sequence counter for a collection if it doesn't exist
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which the id is being generated
 * @returns {void}
 */
export default async function ensureCounterExistForCollection(context, collectionName) {
  const { IdCounters } = context.collections;

  const counter = await IdCounters.findOne(
    { collectionName },
    { returnKey: true }
  );

  if (!counter) createNewCounter(context, collectionName);
}
