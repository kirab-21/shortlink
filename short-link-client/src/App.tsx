import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from './components/Form.tsx';

function App () {
    return (
    <Router>
        <div className="App">
            <div className="text-center mt-0 leading-none pb-20">
                <div className="w-auto m-auto bg-white-300 shadow-lg pt-40 pr-55 pb-45 pl-55 rounded-md transition-all">
                    <Routes>
                        <Route path='/' element={<Form/>}/>
                        <Route path='/app' element={<Form/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    </Router>
    );
}

export default App;