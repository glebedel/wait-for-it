# Global





* * *

## Class: WaitForIt


**trials**: `Number` , number of times the condition is checked and progress callbacks are called
**intervalTime**: `Number` , the time between each condition checks in ms
**maxInterval**: `Number` , the maximum number of checks which will be executed before being rejected
**function**: `condition` , which will resolve the promise when it returns true
**callbacks**: `Object` , contains all promise callbacks
**callbacks.done**: `Array.&lt;function()&gt;` , callbacks executed when promise is resolved
**callbacks.always**: `Array.&lt;function()&gt;` , callbacks executed when promise is resolved or rejected
**callbacks.fail**: `Array.&lt;function()&gt;` , callbacks executed when promise is rejected
**callbacks.progress**: `Array.&lt;function()&gt;` , callbacks executed when promise notifies
**settings**:  
**intervalTime**:  
**maxInterval**:  
**condition**:  
**trials**:  
**callbacks**:  
**done**:  
**fail**:  
**always**:  
**progress**:  
**state**: `string` , current state of the promise can be: "stalled", "pending", "resolved" and "rejected"


# start





* * *

### start.loop() 

check whether the condition can be resolved or not



### start.executeCallbacks(callbackType, opt_cb_context, opt_cb_arguments) 

execute one of the WaitForIt#callbacks array

**Parameters**

**callbackType**: `string`, type of callbacks to execute

**opt_cb_context**: `object`, context with which to execute the progress callbacks

**opt_cb_arguments**: `object`, arguments to pass to the progress callbacks



### start.notify(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.resolve(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress done and always callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.reject(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.done(callback) 

adds a done callback which will be executed when promise is resolved

**Parameters**

**callback**: , adds a done callback which will be executed when promise is resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>Add a success callback printing the number of checks before promise was resolved</caption>
```


### start.fail(callback) 

adds a fail  callback which will be executed when promise is rejected

**Parameters**

**callback**: , adds a fail  callback which will be executed when promise is rejected

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add a fail callback printing the code of the condition fonction</caption>
```


### start.always(callback) 

adds an always callback which will be executed when promise is rejected or resolved

**Parameters**

**callback**: , adds an always callback which will be executed when promise is rejected or resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add an always callback printing the status of promise</caption>
```


### start.progress(callback) 

adds a progress callback which will be executed when promise is notified

**Parameters**

**callback**: , adds a progress callback which will be executed when promise is notified

**Returns**: `WaitForIt`, current instance


## Class: WaitForNode
simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)

**intervalTime**:  , simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)
**maxInterval**:  , simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)
**condition**:  , simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)
**trials**:  , simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)
**callbacks**:  , simple wrapper of the [WaitForIt](#waitforit) class with the WaitForIt#condition checking the presence of specific dom element(s)
**state**: `string` , current state of the promise can be: "stalled", "pending", "resolved" and "rejected"


# start





* * *

### start.executeCallbacks(callbackType, opt_cb_context, opt_cb_arguments) 

execute one of the WaitForIt#callbacks array

**Parameters**

**callbackType**: `string`, type of callbacks to execute

**opt_cb_context**: `object`, context with which to execute the progress callbacks

**opt_cb_arguments**: `object`, arguments to pass to the progress callbacks



### start.notify(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.resolve(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress done and always callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.reject(opt_context, opt_arguments) 

calls [WaitForIt#executeCallbacks](#waitforit#executecallbacks) to execute all progress callbacks

**Parameters**

**opt_context**: `object`, context with which to execute the progress callbacks

**opt_arguments**: `object`, arguments to pass to the progress callbacks

**Returns**: `WaitForIt`, current instance


### start.done(callback) 

adds a done callback which will be executed when promise is resolved

**Parameters**

**callback**: , adds a done callback which will be executed when promise is resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>Add a success callback printing the number of checks before promise was resolved</caption>
```


### start.fail(callback) 

adds a fail  callback which will be executed when promise is rejected

**Parameters**

**callback**: , adds a fail  callback which will be executed when promise is rejected

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add a fail callback printing the code of the condition fonction</caption>
```


### start.always(callback) 

adds an always callback which will be executed when promise is rejected or resolved

**Parameters**

**callback**: , adds an always callback which will be executed when promise is rejected or resolved

**Returns**: `WaitForIt`, current instance

**Example**:
```js
<caption>add an always callback printing the status of promise</caption>
```


### start.progress(callback) 

adds a progress callback which will be executed when promise is notified

**Parameters**

**callback**: , adds a progress callback which will be executed when promise is notified

**Returns**: `WaitForIt`, current instance



* * *



**Author:** Guillaume Lebedel



**Overview:** Implements the WaitForIt and WaitForNode classes (Promise-like implementation)

