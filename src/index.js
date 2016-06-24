import createSagaMiddleware from 'redux-saga'

export default (run, options) => {

    const sagaMiddleware = createSagaMiddleware(options)

    return (viewWrapper) => {
        const viewWithSagaMiddleware = sagaMiddleware(viewWrapper)

        run && run(sagaMiddleware.run)

        return viewWithSagaMiddleware
    }
}