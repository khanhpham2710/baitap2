import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Button, Container, Table } from "reactstrap";
import "./Students.css";


const initialState = {
    list: [],
    isLoading: false
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, isLoading: true };
        case 'FETCH_DATA_SUCCESS':
            return { ...state, list: action.payload, isLoading: false };
        case 'FETCH_DATA_ERROR':
            console.error(action.payload);
            return { ...state, isLoading: false };
        case 'SET_IS_SEARCH':
            return { ...state, isLoading: true };
        default:
            return state;
    }
};

function Students() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const url = "https://66972db802f3150fb66cd526.mockapi.io/users";

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (state.isLoading) {
            fetchData();
        }
    }, [state.isLoading]);

    const fetchData = () => {
        dispatch({ type: 'FETCH_DATA' });
        axios({
            method: 'get',
            url: url
        })
            .then(function (response) {
                dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
            })
            .catch(function (error) {
                dispatch({ type: 'FETCH_DATA_ERROR', payload: error });
            });
    };

    const updateData = (index) => {
        dispatch({ type: 'SET_IS_SEARCH' });
        axios({
            method: 'put',
            url: `${url}/${index}`,
            data: {
                name: "duy khanh"
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch({ type: 'SET_IS_SEARCH' });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const deleteData = (index) => {
        dispatch({ type: 'SET_IS_SEARCH' });
        axios({
            method: 'delete',
            url: `${url}/${index}`,
        })
            .then(function (response) {
                console.log(response);
                dispatch({ type: 'SET_IS_SEARCH' });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addNewData = () => {
        dispatch({ type: 'SET_IS_SEARCH' });
        axios({
            method: 'post',
            url: url,
            data: {
                name: "diu khanh"
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch({ type: 'SET_IS_SEARCH' });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Container>
            <Button onClick={() => {
                dispatch({ type: 'SET_IS_SEARCH' });
                addNewData();
            }}>Add</Button>
            {state.isLoading ? <div className="loader"></div> :
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.list && state.list.map((student, index) => (
                            <tr key={index}>
                                <th scope="row">{student.id}</th>
                                <td>{student.name}</td>
                                <td>
                                    <Button onClick={() => {
                                        dispatch({ type: 'SET_IS_SEARCH' });
                                        updateData(student.id);
                                    }}>Edit</Button>
                                    <Button onClick={() => {
                                        dispatch({ type: 'SET_IS_SEARCH' });
                                        deleteData(student.id);
                                    }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    );
}

export default Students;
