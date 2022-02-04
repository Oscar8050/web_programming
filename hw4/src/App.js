
import './styles.css';
import Todo from './Containers/todo.js';
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],

        };
    }

     handleSubmit = (e) => {
        if (e.key === 'Enter'){
            let inp = document.getElementsByClassName('todo-app__input')[0]
            console.log(inp.value);
            let newinpval = inp.value;

            this.setState(prevState => ({

                todos: [...prevState.todos, newinpval],
            }))
            //this.setState(state => ({todos: state.todos.push(inp.value)}));
            console.log(this.state.todos);
            inp.value = '';

            let alltodo = document.querySelector('ul');
            alltodo.style.display = "block";
            let footer = document.querySelector('footer');
            footer.style.display = 'flex';
        }
    }

    render() {
        return (
            <div id="root" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>

                <section className="todo-app__main">
                    <input className="todo-app__input" onKeyPress={this.handleSubmit}/>
                    <ul className="todo-app__list" id="todo-list">
                        {
                            this.state.todos.map((todo, index) => <Todo todo={todo} index={index}/>)
                        }


                    </ul>
                </section>

                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">2 left</div>
                    <ul className="todo-app__view-buttons">
                        <button type="button" name="AllB">All</button>
                        <button type="button" name="ActiveB">Active</button>
                        <button type="button" name="CompletedB">Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button type="button" name="ClearB">Clear completed</button>
                    </div>

                </footer>

            </div>
        );
    }
}



export default App;
