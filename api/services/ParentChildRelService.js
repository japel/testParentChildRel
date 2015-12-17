/**
 * Created by japel on 17.12.2015.
 */

var Q = require('q');

var ParentChildRelService = {
  slowOperation: function () {
    var identifier = "slowOperation";
    console.log(identifier);
    console.time(identifier);
    ModelA.find({type: "typeA"})
      .exec(function (error, found) {
        var cursor = Q.when();
        for (var i = 0, len = found.length; i < len; i++) {
          (handleOne)(found[i]);
        }

        cursor.then(function () {
          console.timeEnd(identifier);
        });

        function handleOne(one) {
          cursor = cursor.then(function () {
            var d = Q.defer();
            ModelA.findOne({type: "typeB", someMutualId: one.someMutualId})
              .exec(function (error, typeb) {
                if (error) {
                  console.log(error);
                  return d.reject();
                }
                else if (!typeb) {
                  console.log("typeb not found");
                  d.resolve();
                }
                else if (typeb) {
                  typeb.children.add(one.id);
                  typeb.save(function (error, saved) {
                    if (error) {
                      console.log(error);
                    }
                    else if (saved) {
                      d.resolve();
                    }
                  });
                }
              });
            return d.promise;
          });
          return cursor;
        }
      });
  },
  fastOperation: function () {
    var identifier = "fastOperation";
    console.log(identifier);
    console.time(identifier);
    ModelA.find({type: "typeA"})
      .exec(function (error, found) {
        var cursor = Q.when();
        for (var i = 0, len = found.length; i < len; i++) {
          (handleOne)(found[i]);
        }

        cursor.then(function () {
          console.timeEnd(identifier);
        });

        function handleOne(one) {
          cursor = cursor.then(function () {
            var d = Q.defer();
            ModelA.findOne({type: "typeB", someMutualId: one.someMutualId})
              .exec(function (error, typeb) {
                if (error) {
                  console.log(error);
                  return d.reject();
                }
                else if (!typeb) {
                  console.log("typeb not found");
                  d.resolve();
                }
                else if (typeb) {
                  one.parent = typeb.id;
                  one.save(function (error, saved) {
                    if (error) {
                      console.log(error);
                    }
                    else if (saved) {
                      d.resolve();
                    }
                  });
                }
              });
            return d.promise;
          });
          return cursor;
        }
      });
  }
};

module.exports = ParentChildRelService;