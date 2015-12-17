/**
 * ModelA.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name:{
      type: "string"
    },
    someMutualId:{
      type: 'integer'
    },
    type: {
      type: "string",
      enum: [
        "typeA",
        "typeB"
      ]
    },
    children: {
      collection: "ModelA",
      via: "parent"
    },
    parent: {
      model: "ModelA"
    }
  }
};

