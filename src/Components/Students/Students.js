import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Input } from "reactstrap";
import "./Students.css"

function Students() {
    const [list, setList] = useState([]);
    const [isSearch,setIsSearch] = useState(false)
    const [isEdit,setIsEdit] = useState({id: 0,flag: false})
    const [textEdit,setTextEdit] = useState("")

    const url = "https://66972db802f3150fb66cd526.mockapi.io/users";

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData()
    },[isSearch])

    const fetchData = () => {
        axios({
            method: 'get',
            url: url
        })
            .then(function (response) {
                setList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const updateData = (text, index) => {
        axios({
            method: 'put',
            url: url + "/" + index,
            data: {
                name: text
            }
        })
        .then(function (response) {
            setList(list.map((student, id) => (
                    student.id === index ? {...student, name: text} : student
                ))
            );
            setIsSearch(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    

    const deleteData = (index) => {
        axios({
            method: 'delete',
            url: url + "/" + index,
        })
            .then(function (response) {
                setList(list.filter((student,id)=>{
                    return id!==index
                }))
                setIsSearch(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const [text,setText] = useState("")

    const addNewData = (text) => {
        axios({
            method: 'post',
            url: url,
            data: {
                name: text 
            }
        })
            .then(function (response) {
                setList([...list,response.data])
                setIsSearch(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Container>
            <Input type="text" value={text} onChange={(event)=>{
                setText(event.target.value)
            }}
            onKeyDown={(event)=>{
                if (event.key === "Enter"){
                    setText(event.target.value)
                    addNewData(event.target.value)
                    event.target.value = ""
                    setText("")
                }
            }}/>
            <Button onClick={()=>{
                setIsSearch(true);
                addNewData(text)
                setText("")
            }}>Add</Button>
            {isSearch?<div class="loader"></div>:<Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((student, index) => (
                        <tr key={index}>
                            <th scope="row">{student.id}</th>
                            <td>{isEdit&&isEdit.id===student.id?
                                <input value={textEdit} onChange={(event)=>{
                                    setTextEdit(event.target.value)
                                }}/>
                                :
                                <p>{student.name}</p>}</td>
                            <td>
                                {isEdit&&isEdit.id===student.id?<Button onClick={() => {
                                    updateData(textEdit,student.id)
                                    setIsEdit({id: 0, flag:false})
                                    setIsSearch(true)
                                    setTextEdit("")
                                }}>Save</Button>:
                                <Button onClick={() => {
                                    setTextEdit(student.name)
                                    setIsEdit({id: student.id, flag: true})
                                }}>Edit</Button>
                            }
                                <Button onClick={() => {
                                    setIsSearch(true)
                                    deleteData(student.id)
                                }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </Container>

    );
}

export default Students;
