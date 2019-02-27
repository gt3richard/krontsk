import React from 'react';
import { render } from 'react-dom';
import '../asset/index.css';

const Tasker = require('./components/tasker');

class MainApp extends React.Component {
    render () {
        return <Tasker />
    }
}

render(<MainApp />, document.getElementById('app'))