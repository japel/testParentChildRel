/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Q = require('q');
var Chance = require('chance');

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var big = 5000;
  var small = 500;


  var prms = [];
  var prms1 = [];

  for (var i = 0; i < big; i++) {
    prms.push(createTypeA(i));
  }

  for (var j = 0;j<small;j++){
    prms1.push(createTypeB(j));
  }

  Q.all(prms1)
    .then(function(){
      return Q.all(prms);
    })
    .then(function(){
      cb();
    });


  function createTypeB(i) {
    var d = Q.defer();
    var chance = new Chance();

    var toCreate = {
      name: chance.name(),
      someMutualId: i,
      type: "typeB"
    };

    ModelA.create(toCreate)
      .exec(function (error, created) {
        d.resolve(created);
      });

    return d.promise;
  }

  function createTypeA(){
    var d = Q.defer();
    var chance = new Chance();

    var toCreate = {
      name: chance.name(),
      someMutualId: chance.integer({min: 0, max: small}),
      type: "typeA"
    };

    ModelA.create(toCreate)
      .exec(function (error, created) {
        d.resolve(created);
      });
    return d.promise;
  }
  //cb();
};
