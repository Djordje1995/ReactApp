const util = {
  clone: function(item) {
    if (!item) {
      return item;
    } // null, undefined values check

    var types = [Number, String, Boolean],
      result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
      if (item instanceof type) {
        result = type(item);
      }
    });

    if (typeof result == "undefined") {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        result = [];
        item.forEach(function(child, index, array) {
          result[index] = util.clone(child);
        });
      } else if (typeof item == "object") {
        // testing that this is DOM
        if (item.nodeType && typeof item.cloneNode == "function") {
          result = item.cloneNode(true);
        } else if (!item.prototype) {
          // check that this is a literal
          if (item instanceof Date) {
            result = new Date(item);
          } else {
            // it is an object literal
            result = {};
            for (var i in item) {
              result[i] = util.clone(item[i]);
            }
          }
        } else {
          // depending what you would like here,
          // just keep the reference, or create new object
          if (false && item.constructor) {
            // would not advice to do that, reason? Read below
            result = new item.constructor();
          } else {
            result = item;
          }
        }
      } else {
        result = item;
      }
    }

    return result;
  },

  copy: function(o) {
    var out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      out[key] = typeof v === "object" && v !== null ? util.copy(v) : v;
    }
    return out;
  }
};

export default util;
