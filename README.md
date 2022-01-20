# api-plugin-id-generator

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Summary
This plugin allows the generation of sequential IDs that can be used in collections.

Example:
```js
const collectionId = context.mutations.generateNextId(context, "collectionName");
```

The following code generates a new sequential id.

By default, the initial value of the generated id starts from `0`. If a custom starting value is required, a new environmental variable should be added.
The format of the env variable name should be the following:

`COLLECTION_NAME` + `_ID_GENERATOR_INITIAL_VALUE`

For example if we want to generate an incremental id for `Invoices` collection, starting from `10000` we should first define the following env variable:
```js
INVOICES_ID_GENERATOR_INITIAL_VALUE=10000
```

Then if we want to create new invoice we can do the following:
```js
const generatedId = context.mutations.generateNextId(context, "invoices");

Invoices.insertOne({
   invoiceId: generatedId
   ...
})
```

**IMPORTANT:** The name of the collection passed as second parameter to the mutation should be using camel casing in order for the environmental variable to work properly. If the name of the collection for example is consisting of two words, e.g. `TestCollection`, the `getNextId` function should receive `testCollection` string as a paramenter and the env variable should be `TEST_COLLECTION_ID_GENERATOR_INITIAL_VALUE`.

## Developer Certificate of Origin
We use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) in lieu of a Contributor License Agreement for all contributions to Reaction Commerce open source projects. We request that contributors agree to the terms of the DCO and indicate that agreement by signing all commits made to Reaction Commerce projects by adding a line with your name and email address to every Git commit message contributed:
```
Signed-off-by: Jane Doe <jane.doe@example.com>
```

You can sign your commit automatically with Git by using `git commit -s` if you have your `user.name` and `user.email` set as part of your Git configuration.

We ask that you use your real name (please no anonymous contributions or pseudonyms). By signing your commit you are certifying that you have the right have the right to submit it under the open source license used by that particular Reaction Commerce project. You must use your real name (no pseudonyms or anonymous contributions are allowed.)

We use the [Probot DCO GitHub app](https://github.com/apps/dco) to check for DCO signoffs of every commit.

If you forget to sign your commits, the DCO bot will remind you and give you detailed instructions for how to amend your commits to add a signature.

## License

   Copyright 2020 Reaction Commerce

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

