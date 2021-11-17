import './App.css';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [state, setState] = useState({
    name: " ",
    receiptId: 0,
    price1: 0,
    price2: 0,
  });


  const handleChange = ({ target: { value, name } }) => {
    setState({ [name]: value });
  }

  const createDownloadPdf = () => {
    axios.post('/create-pdf', state)
      .then(() => axios.get('fetch-pdf',{ responseType: 'blob' }))
      .then(res=>{
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'result.pdf');
      })

  }

  return (
    <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={handleChange} />
      <input type="number" placeholder="Receipt ID" name="ReceiptId" onChange={handleChange} />
      <input type="number" placeholder="Price1" name="price1" onChange={handleChange} />
      <input type="number" placeholder="Price2" name="price2" onChange={handleChange} />
      <button onClick={createDownloadPdf}>Download PDF</button>
    </div>
  );
}


export default App;
