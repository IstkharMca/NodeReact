import React from 'react';
import ReactDOM from 'react-dom';

// const App = () => {
//     return <div> Hello Reaact </div> // JSX systax
// };
// function getButtontext() {
//     return "click Button";
// }

const App = function() {
    //const buttonText = "Click Here";
    const buttonText = { btn_text:"click object button"};
    const nameLabel="Enter Name";
    return <div>
                <label htmlFor="name">{nameLabel}: </label>
                 <input type="text" id="name" />
                 <button type="submit" style={{color:'red'}}>{buttonText.btn_text}</button>
                 {/* <button type="submit" style={{color:'red'}}  >{buttonText}</button> */}
                 {/* <button type="submit" style={{color:'red'}}  >{getButtontext()}</button> */}
                 {/* <input type="submit" style={{color:'red'}}  value="{buttonText}" /> */}
            </div>
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)