import React from 'react';
import xxx from './img/x.png';
import './styles.css';


class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {todo, index} = this.props;
        return (
            <><li className='todo-app__item'><div className='todo-app__checkbox'><input id={index} type="checkbox"></input><label htmlFor={index}></label></div><h1 className='todo-app__item-detail'>{todo}</h1><img src={xxx} className='todo-app__item-x'/></li></>
        )
    }
}


export default Todo;