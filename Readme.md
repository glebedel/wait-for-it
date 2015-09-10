# WaitForIt

**Author:** Guillaume Lebedel
**Version:** 1.0

**Overview:** Implements the WaitForIt and WaitForNode classes (Promise-like implementation).
WaitFor It resolves when the passed by condition is true
rejects when the maximum number of iterations has been reached
notify every time the condition is checked


* * *

## Class: WaitForNode
simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)

## Class: WaitForIt


**trials**: `Number` , number of times the condition is checked and progress callbacks are called

**intervalTime**: `Number` , the time between each condition checks in ms

**maxInterval**: `Number` , the maximum number of checks which will be executed before being rejected

**condition**: `function` , which will resolve the promise when it returns true

**callbacks**: `Object` , contains all promise callbacks

**callbacks.done**: `Array.<function()>` , callbacks executed when promise is resolved

**callbacks.always**: `Array.<function()>` , callbacks executed when promise is resolved or rejected

**callbacks.fail**: `Array.<function()>` , callbacks executed when promise is rejected

**callbacks.progress**: `Array.<function()>` , callbacks executed when promise notifies

# WaitForIt

* * *

### WaitForIt.start() 

starts the interval which will execute callbacks depending on state of the promise

### WaitForIt.start#loop() 

private member of [WaitForIt#start](#waitforit#start) checks whether the condition can be resolved or not and:
<br/>calls [WaitForIt#notify](#waitforit#notify) when WaitForIt#condition is checked
<br/>calls [WaitForIt#resolve](#waitforit#resolve) when promise is done
<br/>calls [WaitForIt#reject](#waitforit#reject) when promise fails


### WaitForIt.executeCallbacks(callbackType, opt_cb_context, opt_cb_arguments) 

execute one of the WaitForIt#callbacks array

**Parameters**

**callbackType**: `string`, type of callbacks to execute

**opt_cb_context**: `object`, context with which to execute the progress callbacks

**opt_cb_arguments**: `object`, arguments to pass to the progress callbacks



### WaitForIt.notify(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### WaitForIt.resolve(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress done and always callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### WaitForIt.reject(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### WaitForIt.done(callback) 

adds a done callback which will be executed when promise is resolved

**Parameters**

**callback**: `function`, to execute when condition resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>Add a success callback printing the number of checks before promise was resolved</caption>
window.cd = undefined;
var test = new WaitForIt(()=>window.cd);
test.start().done(()=>console.warn("Resolved after " + test.trials + "th notification"));
setTimeout(()=>window.cd = true, 2500)
```


### WaitForIt.fail(callback) 

adds a fail  callback which will be executed when promise is rejected

**Parameters**

**callback**: `function`, to execute when condition resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add a fail callback printing the code of the condition fonction</caption>
window.cd = undefined;
var test = new WaitForIt(()=>window.cd);
test.fail(()=>console.warn("Failed to resolve: \n" + test.condition.toString() + "\n after " + test.trials + " iterations."));
test.maxInterval = 10;
test.start();
```


### WaitForIt.always(callback) 

adds an always callback which will be executed when promise is rejected or resolved

**Parameters**

**callback**: `function`, to execute when condition resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add an always callback printing the status of promise</caption>
window.cd = undefined;
var test = new WaitForIt(()=>window.randomVar);
var test2 = new WaitForIt(()=> window.cd);
var alwaysCallback = (promiseObj, conditionResult)=>console.warn("Always callback executed - Final promise status: " + promiseObj.state)
test.maxInterval = 10;
test.always(alwaysCallback).start();
test2.always(alwaysCallback).start();
setTimeout(()=>window.cd = true, 1250);
//Always callback executed - Final promise status: resolved
//Always callback executed - Final promise status: rejected
```


### WaitForIt.progress(callback) 

adds a progress callback which will be executed when promise is notified

**Parameters**

**callback**: `function`, to execute when condition resolved

**Returns**: `WaitForIt`, current instance


