// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { formateToNChar } from 'utils';

type Props = {
    begin: number,
};

class Timer extends React.PureComponent<Props> {
    interval = null;

    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { begin } = this.props;
        const now = Date.now();
        const diff = new Date(now - begin);
        const minutes = `${diff.getMinutes()}`;
        const seconds = `${diff.getSeconds()}`;

        return (
            <Typography align='center'>
                {`${formateToNChar(minutes, 2)} : ${formateToNChar(seconds, 2)}`}
            </Typography>
        );
    }
}

export default Timer;
