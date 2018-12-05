import React,{Component} from 'react'
import * as Sentry from '@sentry/browser';

Sentry.init({
 dsn: "https://f9c0ab5ec7db46d7bb033d99030a4792@sentry.io/1337670"
});
// should have been called before using it here
// ideally before even rendering your react app

class ExampleBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    render() {
        return(null)
        // if (this.state.error) {
        //     //render fallback UI
        //     return (
        //         <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
        //     );
        // } else {
        //     //when there's not an error, render children untouched
        //     return this.props.children;
        // }
    }
}

export default ExampleBoundary
