import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { set, useForm } from "react-hook-form";
import "./Form.css";
import DataTable from './DataTable';
import Table from 'react-bootstrap/Table'

const Form = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [users, setUsers] = useState([]);

    const onSubmit = data => {
        axios.put('http://localhost:5000/users', data)
            .then(res => {
                console.log(res)
                if (res.data.upsertedId) {
                    reset();
                }
            })
    };
    // const handleNameChange = e => {
    //     const name = e.target.value;
    //     console.log(name);

    // }


    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])
    // console.log(users);
    return (
        <div className="input-form">
            <h3> Enter your name and email</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="input-field"  {...register("name", { required: true, maxLength: 20 })} placeholder="name" />
                <input className="input-field" type="email" {...register("email", { required: true })} placeholder="email" />
                <button type='submit'>Add</button>
            </form>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <DataTable
                            user={user}
                            key={user._id}
                        ></DataTable>)
                    }
                </tbody>


            </Table>


        </div>
    );
};

export default Form;