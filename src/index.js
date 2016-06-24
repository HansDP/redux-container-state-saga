import createSagaMiddleware from 'redux-saga'
import { applyLocalMiddleware } from 'redux-container-state'

export default (saga, options) => {

	options = {
		autoCancel: true,
		onMount: (props) => { },
		...options
	}

    return (next) => {

        return (View) => {

            const sagaMiddleware = createSagaMiddleware(options)
            const enhancer = applyLocalMiddleware(sagaMiddleware)
            const nextWithMiddleware = enhancer(next)

            return nextWithMiddleware(class SagaView extends React.Component {

                componentWillMount() {
                    this.saga = saga && sagaMiddleware.run(saga)
                    if (options.onMount) {
                    	options.onMount(this.props)
                    }
                }

                componentWillUnmount() {
                	if (this.saga && options.autoCancel) {
	                	this.saga.cancel()
                	}
                    this.saga = null
                }

                render() {
                    return React.createElement(View, this.props)
                }
            })
        }
    }
}