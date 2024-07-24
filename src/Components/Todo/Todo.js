import { useEffect, useState } from 'react';
import ToDoButtons from '../ToDoButtons/ToDoButtons';
import Name from './Name';

function Todo() {
    if (!localStorage.getItem('todo')) {
        localStorage.setItem('todo', JSON.stringify([]));
    }

    const [todo, setToDo] = useState(JSON.parse(localStorage.getItem('todo')));
    const [todoValue, setTodoValue] = useState('');

    const filterList = todo.filter(item => item.flag === true);

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo]);

    function handleAdd() {
        if (todoValue.trim() !== '') {
            const user = {
                id: todo.length + 1,
                name: todoValue,
                checked: false,
                flag: true,
            };
            setToDo([...todo, user]);
            setTodoValue('');
        }
    }

    function handleClose(user) {
        const newList = todo.map(item => (item === user ? { ...item, flag: false } : item));
        setToDo(newList);
    }

    function handleClick(id) {
        const newToDo = todo.map(item => (item.id === id ? { ...item, checked: !item.checked } : item));
        setToDo(newToDo);
    }

    function checkAll() {
        setToDo(todo.map(item => ({ ...item, checked: true })));
    }

    function clearAll() {
        setToDo(todo.map(item => ({ ...item, flag: false })));
    }

    function clearChecked() {
        const newToDo = todo.map(item => (item.checked === true ? { ...item, flag: false } : item));
        setToDo(newToDo);
    }

    function rename(id, name) {
        const newList = todo.map((item, index) => (index === id - 1 ? { ...item, name: name } : item));
        setToDo(newList);
    }

    return (
        <div
            className="todo"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '50%',
                background: "#fff",
                padding: "30px",
                border: "2px blue solid",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
            }}
        >
            <h1>Student Lists</h1>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <input
                    type="text"
                    value={todoValue}
                    onChange={e => setTodoValue(e.target.value)}
                    style={{
                        margin: '10px',
                        height: '40px',
                        borderRadius: '20px',
                        border: '2px blue solid',
                        paddingLeft: '20px',
                    }}
                />
                <button
                    onClick={handleAdd}
                    style={{
                        height: '40px',
                        padding: '0 10px',
                        outline: 'none',
                        border: '1px solid #000',
                        borderRadius: '50px',
                    }}
                >
                    Add Student
                </button>
            </div>
            <div style={{width: "100%"}}>
                {filterList.map((list, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'space-between',
                            padding: '0 10px 0 20px',
                            alignItems: 'center',
                            border: '2px solid blue',
                            width: '100%',
                            marginBottom: "10px",
                            borderRadius: "10px",
                            height: "50px",
                        }}
                    >
                        <input
                            type="checkbox"
                            onChange={() => {
                                handleClick(list.id);
                            }}
                            checked={list.checked}
                        />
                        <Name list={list} rename={rename}/>
                        <button
                            style={{
                                background: 'red',
                                padding: '5px 12px',
                                outline: 'none',
                                border: '1px solid #000',
                                borderRadius: '10px',
                            }}
                            onClick={() => {
                                handleClose(list);
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <ToDoButtons clearAll={clearAll} checkAll={checkAll} clearChecked={clearChecked} />
        </div>
    );
}

export default Todo;
