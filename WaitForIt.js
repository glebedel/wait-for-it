/**
 * @author Guillaume Lebedel
 * @file Implements the WaitForIt and WaitForNode classes (Promise-like implementation)
 * resolves when the passed by condition is true
 * rejects when the maximum number of iterations has been reached
 * notify every time the condition is checked
 *
 * @example <caption>Use of WaitForIt class to wait for a variable to have specific value</caption>
 * var settings = {
 *   always:()=>console.warn("always"),
 *   fail:()=>console.warn("fail"),
 *   done:()=>console.warn("done"),
 *   progress:()=>console.warn("progress")
 * }
 * window.cd = undefined;
 * var test = new WaitForIt(()=>window.cd === true, settings)
 * test.start();
 * setTimeout(()=>window.cd = true, 2500);
 *
 */

/**
 *
 * @constructor
 * @param {!function} condition condition which should be true to resolve the promise
 * @param {?Object} settings contains all the settings used for the promise
 * @param {?function} settings.done callback executed when promise is resolved (condition is true)
 * @param {?function} settings.progress callback executed when @mention condition is checked
 * @param {?function} settings.fail callback executed when promise is rejected (maxInterval is reached)
 * @param {?function} settings.always callback executed when promise is resolved or rejected
 * @param {?Number} settings.intervalTime the time between each condition checks in ms
 * @param {?Number} settings.maxInterval the maximum number of checks which will be executed before being rejected
 * @property {Number} trials number of times the condition is checked and progress callbacks are called
 * @property {Number} intervalTime=250 the time between each condition checks in ms
 * @property {Number} maxInterval=50 the maximum number of checks which will be executed before being rejected
 * @property {condition} function which will resolve the promise when it returns true
 * @property {Object} callbacks contains all promise callbacks
 * @property {function[]} callbacks.done callbacks executed when promise is resolved
 * @property {function[]} callbacks.always callbacks executed when promise is resolved or rejected
 * @property {function[]} callbacks.fail callbacks executed when promise is rejected
 * @property {function[]} callbacks.progress callbacks executed when promise notifies
 */
function WaitForIt(condition, settings) {
    /** @property {Number} trials number of times the condition is checked and progress callbacks are called */
    settings = settings || {};
    /** @property {Number} intervalTime=250 the time between each condition checks in ms */
    this.intervalTime = settings.intervalTime || 250;
    /** @property {Number} maxInterval=50 the maximum number of checks which will be executed before being rejected */
    this.maxInterval = settings.maxInterval || 50;
   /** @property {condition} function which will resolve the promise when it returns true  */
    this.condition = condition;
    /** @property {Number} trials number of times the condition is checked and progress callbacks are called  */
    this.trials = 0;
    /** @property {Object} callbacks contains all promise callbacks */
    this.callbacks = {
        /** @property {function[]} callbacks~done callbacks executed when promise is resolved */
        done: settings.done ? [settings.done] : [],
        /** @property {function[]} callbacks#fail callbacks executed when promise is rejected */
        fail: settings.fail? [settings.fail] : [],
        /** @property {function[]} callbacks#always callbacks executed when promise is resolved or rejected */
        always: settings.always ?[settings.always] : [],
        /** @property {function[]} callbacks#progress callbacks executed when promise notifies */
        progress: settings.progress? [settings.progress] : []
    };
}

/**
 * @type {{state: string, start: Function, executeCallbacks: Function, notify: Function, resolve: Function, reject: Function, done: Function, fail: Function, always: Function, progress: Function}}
 */
WaitForIt.prototype = {
    /**
     * current state of the promise can be: "stalled", "pending", "resolved" and "rejected"
     * @type {string}
     * @defaultvalue
     */
    state: "stalled",

    /**
     * @method start starts the interval which will execute callbacks depending on state of the promise
     * @namespace WaitForIt#start
     * @alias WaitForIt#start
     */
    start: function () {
        var self = this;
        //(re)initialize the trial count
        self.trials = 0;
        //conditions is a function
        if (typeof self.condition === "function")
            setTimeout(loop, self.intervalTime);
        return this;

        /**
         * check whether the condition can be resolved or not
         * <br/>calls {@link WaitForIt#notify} when {@link WaitForIt#condition} is checked
         * <br/>calls {@link WaitForIt#resolve} when promise is done
         * <br/>calls {@link WaitForIt#reject} when promise fails
         * @memberof WaitForIt#start
         */
        function loop() {
            var conditionResult = self.condition();
            self.notify(null, [self, conditionResult]);
            if (conditionResult) {
                self.resolve(null, [self, conditionResult]);
            } else if (self.trials >= self.maxInterval) {
                self.reject(null, [self, conditionResult]);
            } else {
                self.timeout = setTimeout(loop, self.intervalTime);
            }
        }
    },

    /**
     * execute one of the {@link WaitForIt#callbacks} array
     * @param {!string} callbackType type of callbacks to execute
     * @param {?object} opt_cb_context context with which to execute the progress callbacks
     * @param {?object} opt_cb_arguments arguments to pass to the progress callbacks
     */
    executeCallbacks: function (callbackType, opt_cb_context, opt_cb_arguments) {
        if (callbackType instanceof Array)
            for (var i = 0; i < callbackType.length; i++) {
                this.executeCallbacks(callbackType[i], opt_cb_context, opt_cb_arguments);
            }
        var currentCallbacks = this.callbacks[callbackType];
        if (currentCallbacks && currentCallbacks.length > 0)
            for (var j = 0; j < currentCallbacks.length; j++) {
                if (typeof(currentCallbacks[j]) === "function")
                    currentCallbacks[j].apply(opt_cb_context, opt_cb_arguments);
            }
    },

    /**
     * calls {@link WaitForIt#executeCallbacks} to execute all progress callbacks
     * @param {?object} opt_context context with which to execute the progress callbacks
     * @param {?object} opt_arguments arguments to pass to the progress callbacks
     * @returns {WaitForIt} current instance
     */
    notify: function (opt_context, opt_arguments) {
        this.state = "pending";
        this.executeCallbacks("progress", opt_context, opt_arguments);
        this.trials++;
        return this;
    },

    /**
     * calls {@link WaitForIt#executeCallbacks} to execute all progress done and always callbacks
     * @param {?object} opt_context context with which to execute the progress callbacks
     * @param {?object} opt_arguments arguments to pass to the progress callbacks
     * @returns {WaitForIt} current instance
     */
    resolve: function (opt_context, opt_arguments) {
        this.state = "resolved";
        this.executeCallbacks(["done", "always"], opt_context, opt_arguments);
        clearTimeout(self.timeout);
        return this;
    },

    /**
     * calls {@link WaitForIt#executeCallbacks} to execute all progress callbacks
     * @param {?object} opt_context context with which to execute the progress callbacks
     * @param {?object} opt_arguments arguments to pass to the progress callbacks
     * @returns {WaitForIt} current instance
     */
    reject: function (opt_context, opt_arguments) {
        this.state = "rejected";
        this.executeCallbacks(["fail", "always"], opt_context, opt_arguments);
        clearTimeout(self.timeout);
        return this;
    },

    /**
     * adds a done callback which will be executed when promise is resolved
     * @param callback
     * @returns {WaitForIt} current instance
     * @example <caption>Add a success callback printing the number of checks before promise was resolved</caption>
     * window.cd = undefined;
     * var test = new WaitForIt(()=>window.cd);
     * test.start().done(()=>console.warn("Resolved after " + test.trials + "th notification"));
     * setTimeout(()=>window.cd = true, 2500)
     */
    done: function (callback) {
        this.callbacks.done.push(callback);
        return this;
    },

    /**
     * adds a fail  callback which will be executed when promise is rejected
     * @param callback
     * @returns {WaitForIt} current instance
     * @example <caption>add a fail callback printing the code of the condition fonction</caption>
     * window.cd = undefined;
     * var test = new WaitForIt(()=>window.cd);
     * test.fail(()=>console.warn("Failed to resolve: \n" + test.condition.toString() + "\n after " + test.trials + " iterations."));
     * test.maxInterval = 10;
     * test.start();
     */
    fail: function (callback) {
        this.callbacks.fail.push(callback);
        return this;
    },

    /**
     * adds an always callback which will be executed when promise is rejected or resolved
     * @param callback
     * @returns {WaitForIt} current instance
     * @example <caption>add an always callback printing the status of promise</caption>
     * window.cd = undefined;
     * var test = new WaitForIt(()=>window.randomVar);
     * var test2 = new WaitForIt(()=> window.cd);
     * var alwaysCallback = (promiseObj, conditionResult)=>console.warn("Always callback executed - Final promise status: " + promiseObj.state)
     * test.maxInterval = 10;
     * test.always(alwaysCallback).start();
     * test2.always(alwaysCallback).start();
     * setTimeout(()=>window.cd = true, 1250);
     * //Always callback executed - Final promise status: resolved
     * //Always callback executed - Final promise status: rejected
     */
    always: function (callback) {
        this.callbacks.always.push(callback);
        return this;
    },

    /**
     * adds a progress callback which will be executed when promise is notified
     * @param callback
     * @returns {WaitForIt} current instance
     */
    progress: function (callback) {
        this.callbacks.progress.push(callback);
        return this;
    }
};

/**
 * simple wrapper of the {@link WaitForIt} class with the {@link WaitForIt#condition} checking the presence of specific dom element(s)
 * @param {?Object} settings contains all the settings used for the promise
 * @param {?function} settings.done callback executed when promise is resolved (condition is true)
 * @param {?function} settings.progress callback executed when @mention condition is checked
 * @param {?function} settings.fail callback executed when promise is rejected (maxInterval is reached)
 * @param {?function} settings.always callback executed when promise is resolved or rejected
 * @param {?Number} settings.intervalTime the time between each condition checks in ms
 * @param {?Number} settings.maxInterval the maximum number of checks which will be executed before being rejected
 * @param {!string} selector css selector of the element we are waiting for
 * @augments WaitForIt
 * @constructor
 */
function WaitForNode(selector, settings){
    WaitForIt.call(this, function (){
        return (window.document.querySelectorAll(selector).length);
    }, settings);
}
WaitForNode.prototype = Object.create(WaitForIt.prototype);
WaitForIt.prototype.constructor = WaitForNode;

