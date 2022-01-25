import React from 'react';


const DataTable = (props) => {
    const { _id, name, email } = props.user;
    const handleDelete = id => {
        const url = `http://localhost:5000/users/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then();


    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td><button onClick={() => handleDelete(_id)}>delete</button> </td>
        </tr>

    );
};

export default DataTable;