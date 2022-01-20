import SimpleSchema from "simpl-schema";

export const IdCounterSchema = new SimpleSchema({
  _id: String,
  collectionName: String,
  counterValue: Number
});
