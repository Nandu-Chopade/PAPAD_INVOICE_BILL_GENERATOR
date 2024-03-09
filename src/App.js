import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import './App.css';
import DateCalculator from './Calculate Previous Occurrence of Selected Day/CustomeDate';
import Invoice from './Invoice/Invoice';
import Header from './Header/Header';

function App() {
  return (
    <>
      <Router>
        {/* <UpdateFormValidation/> */}
        <div className="container">
        <div className="row">
          <Header />
            <Routes>
            <Route path="/"  element={<Invoice/>} />
              <Route path="/generateInvoice" element={<Invoice/>} />
              <Route path="/calculateDate" element={ <DateCalculator/>} />
            </Routes>
       
        </div>
        </div>

      </Router>
    </>
    //  <>
    //   
    //  
    //  </>

  );
}

export default App;
