var $builtinmodule = function (name) {

    var mod = {};
    mod.__package__ = Sk.builtin.none.none$;

    mod.loadTable = new Sk.builtin.func(function () {
        currentPythonContext.runner.checkArgs('loadTable', 'database', 'loadTable', arguments);
        var susp = new Sk.misceval.Suspension();
        var result = Sk.builtin.none.none$;
        var args = Array.prototype.slice.call(arguments);
        for(var i=0; i<args.length; i++) { args[i] = currentPythonContext.runner.skToJs(args[i]); };
        susp.resume = function() { return result; };
        susp.data = {type: 'Sk.promise', promise: new Promise(function(resolve) {
                args.push(resolve);
                try {
                    currentPythonContext["database"]["loadTable"].apply(currentPythonContext, args);
                } catch (e) {
                    currentPythonContext.runner._onStepError(e)}
            }).then(function (value) {
                result = value;
                return value;
            })};
        return susp;
    });

    mod.displayTable = new Sk.builtin.func(function () {
        currentPythonContext.runner.checkArgs('displayTable', 'database', 'displayTable', arguments);
        var susp = new Sk.misceval.Suspension();
        var result = Sk.builtin.none.none$;
        var args = Array.prototype.slice.call(arguments);
        for(var i=0; i<args.length; i++) { args[i] = currentPythonContext.runner.skToJs(args[i]); };
        susp.resume = function() { return result; };
        susp.data = {type: 'Sk.promise', promise: new Promise(function(resolve) {
                args.push(resolve);
                try {
                    currentPythonContext["database"]["displayTable"].apply(currentPythonContext, args);
                } catch (e) {
                    currentPythonContext.runner._onStepError(e)}
            }).then(function (value) {
                result = value;
                return value;
            })};
        return susp;
    });

    return mod;
};
$builtinmodule;