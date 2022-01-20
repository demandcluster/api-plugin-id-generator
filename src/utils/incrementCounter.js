/**
 * @summary Increment the counter for a collection
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} collectionName - the name of the collection for which the id is being generated
 * @returns {void}
 */
export default async function incrementCounter(context, collectionName) {
  const { IdCounters } = context.collections;

  await IdCounters.findOneAndUpdate(
    {
      collectionName
    },
    {
      $inc: { counterValue: 1 }
    }
  );
}
