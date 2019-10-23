function extend() {

    var args = arguments;
    var target = new args[1](args[0]);
    var objs = (args.length > 2) ? Array.prototype.slice.call(args, 2) : [],
        i = 0,
        l = objs.length,
        key,
        obj;

    for (i; i < l; i += 1) {
        obj = objs[i] || {};
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key] = obj[key];
            }
        }
    }
    return target;
}

module.exports.extend = extend