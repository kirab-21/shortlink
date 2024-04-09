import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from './components/Form';

function App () {
    return (
    <Router>
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route path='/' component={Form}/>
                        <Route path='/app' component={Form}/>
                    </Switch>
                </div>
            </div>
        </div>
    </Router>
    );
}

export default App;