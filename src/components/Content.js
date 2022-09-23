import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import axios from 'axios'

function Content() {

    useEffect(() => {
        getData();
    }, [])

    let navigate = useNavigate();
    let [data, setData] = useState([])

    let getData = async () => {
        let authorsData = await axios.get("https://62a8c0ba943591102ba90784.mockapi.io/library")
        setData(authorsData.data)
    }


    let handleDelete = async (id) => {
        try {
            let deleteauthorData = await axios.delete("https://62a8c0ba943591102ba90784.mockapi.io/library" + id);
            console.log(deleteauthorData)
            getData();
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Bookurl</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">Product Name</th>
                        
                       
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td><div className='bookurl-box' onClick={() => navigate("/edit-bookurl/" + e.id)}><img className='shorter-logo' src={e.profile} alt="bookurl" /></div></td>
                                <td>{e.author}</td>
                                <td>{e.bookname}</td>
                              
                               
                                <td><button onClick={() => navigate("/edit-author/" + e.id)} className="btn btn-primary">Edit</button> &nbsp;&nbsp;
                                    <button onClick={() => handleDelete(e.id)} className="btn btn-danger">Delete</button></td>

                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Content
