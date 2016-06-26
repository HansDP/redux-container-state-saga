# [redux-container-state-saga](https://github.com/HansDP/redux-container-state-saga)

**Note:** Work in progress. This project is not ready to be used

Provides local saga middleware for containers in [redux-container-state](https://github.com/HansDP/redux-container-state)

This package encapsulates `redux-saga` to be used within the local scope of a container.

This solution does not allow access to global actions or state, but we're working on that.

## Example usage

```javascript
import React from 'react'
import { view, applyLocalMiddleware } from 'redux-container-state'
import { takeEvery, delay } from 'redux-saga'
import { put } from 'redux-saga/effects'

import sagaViewEnhancer from 'redux-container-state-saga'

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT_COUNTER' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_SAGA', incrementAsync)
}

const counterUpdater = updater((model = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER': 
      return model + 1
    default:
      return model
  }
})

const viewWithMiddleware = compose(sagaViewEnhancer(watchIncrementAsync))(view)

export default viewWithMiddleware(({model, dispatch}) => (
  <div>
    <button onClick={ () => dispatch({ type: 'INCREMENT_SAGA' }) }>Start counter</button>
    Current count: { model }
  </div>
))

```

## Installation & Usage

You can install `redux-container-state-saga` via npm.

```
npm install redux-container-state-saga --save
```

## Requires investigation

1. Is it OK to have redux-saga to be attached to every view? 
2. What is the performance cost for setting up saga per view?  

If the above are problematic, 

1. Can we make a 'global' repository for sagas when are then behind the scenes redirected back to the appropriate container? 
2. Should we have the saga middleware applied to the global store? -- but this defaets being 'local'



