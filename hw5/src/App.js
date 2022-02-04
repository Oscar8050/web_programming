import logo from './logo.svg';
import './App.css';
import {useState} from "react";


function App() {

    const [shownum, setshownum] = useState(0);
    const [num, setnum] = useState(0);
    const [count, setcount] = useState(0);

    const [result, setresult] = useState(0);
    const [operator, setoperator] = useState('+');

    function update(k){
        if (count === 0){
            console.log(k);
            setnum(num => num * 10 + k);
            console.log(num);
            setshownum(s => num * 10 + k);
            console.log(shownum);
        }else{
            setnum(k);
            setshownum(k);
            setcount(0);
        }

    }

    function calculate(k){
        console.log(shownum);
        if (k === "zero"){
            setshownum(0);
            setresult(0);
            setnum(0);
            setcount(1);
            setoperator('+');
        }else if (operator === '+'){
            setshownum(result + num);
            setresult(res => res + num);
            setcount(1);
        }else if (operator === '-'){
            setshownum(result - num);
            setresult(res => res - num);
            setcount(1);
        }else if (operator === 'x'){
        setshownum(result * num);
        setresult(res => res * num);
        setcount(1);
        }else if (operator === '/'){
        setshownum(result / num);
        setresult(res => res / num);
        setcount(1);
        }

        if (k === 'plus')
            setoperator('+');
        else if (k === 'minus')
            setoperator('-');
        else if (k === 'multi')
            setoperator('x');
        else if (k === 'divide')
            setoperator('/');
        else if (k === 'equal')
            setoperator('=');

    }


  return (
    <div className="App">
      <p>{shownum}</p>
      <div className="buttons">
          <div>
              <div className="button"><button id='1' onClick={update.bind(this, 1)}>1</button></div>
              <div className="button"><button id='2' onClick={update.bind(this, 2)}>2</button></div>
              <div className="button"><button id='3' onClick={update.bind(this, 3)}>3</button></div>
              <div className="button"><button id='plus' onClick={calculate.bind(this, 'plus')}>+</button></div>
          </div>

          <div>
              <div className="button"><button id='4' onClick={update.bind(this, 4)}>4</button></div>
              <div className="button"><button id='5' onClick={update.bind(this, 5)}>5</button></div>
              <div className="button"><button id='6' onClick={update.bind(this, 6)}>6</button></div>
              <div className="button"><button id='minus' onClick={calculate.bind(this, 'minus')}>-</button></div>
          </div>

          <div>
              <div className="button"><button id='7' onClick={update.bind(this, 7)}>7</button></div>
              <div className="button"><button id='8' onClick={update.bind(this, 8)}>8</button></div>
              <div className="button"><button id='9' onClick={update.bind(this, 9)}>9</button></div>
              <div className="button"><button id='multi' onClick={calculate.bind(this, 'multi')}>x</button></div>
          </div>

          <div>
              <div className="button"><button id='zero' onClick={calculate.bind(this, 'zero')}>AC</button></div>
              <div className="button"><button id='0' onClick={update.bind(this, 0)}>0</button></div>
              <div className="button"><button id='equal' onClick={calculate.bind(this, 'equal')}>=</button></div>
              <div className="button"><button id='divide' onClick={calculate.bind(this, 'divide')}>/</button></div>
          </div>

      </div>
    </div>
  );
}

export default App;
