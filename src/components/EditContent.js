import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function EditContent() {

    useEffect(() => {
        if (id) {
            getauthorData();
        }
    }, [])// getData will load all the data of the author before it will render 

    let navigate = useNavigate();
    const { id } = useParams();

    let [bookurl, setProfile] = useState("");
    let [author, setauthor] = useState("");
    let [bookname, setbookname] = useState("");
   
  

    let getauthorData = async () => {
        await fetch("https://62a8c0ba943591102ba90784.mockapi.io/library/" + id, { method: "GET" })
            .then(data => data.json())
            .then(value => {
                setauthor(value.author)
                setbookname(value.bookname)
               
                setProfile(value.bookurl)

                handleCheckedForStatus(value.status) //for changing the radio button value
                handleCheckedForDue(value.Due)
            }) //for changing the radio button value
            .catch((error) => {
                console.log(error)
            })
    }
    let handleSave = async () => {
        try {
            let updateauthorData = await axios.put("https://62a8c0ba943591102ba90784.mockapi.io/library/" + id, {
             bookurl,
                author,
                bookname,
              
               
            })
            console.log(updateauthorData)
            navigate('/library')
        }
        catch (err) {
            console.log(err)
        }
    }

    let handleCheckedForStatus = (status) => {
        if (status === "Pending") {
            document.querySelector("#btnradio1").setAttribute('checked', true)
        } else if (status === "In-Progress") {
            document.querySelector("#btnradio2").setAttribute('checked', true)
        } else if (status === "Completed") {
            document.querySelector("#btnradio3").setAttribute('checked', true)
        }
    }
    let handleCheckedForDue = (due) => {
        if (due === "Paid") {
            document.querySelector("#btnpaid").setAttribute('checked', true)
        } else if (due === "Not Paid") {
            document.querySelector("#btnnotpaid").setAttribute('checked', true)
        }
    }

    return (
        <div className="p-2">
            <h1>Edit author</h1>
            <form>
                <div class="form-group mb-1">
                    <label for="exampleInputPassword1">Book url</label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <img className='author-logo' src={bookurl} alt="bookurl" />
                </div>
                <div class="form-group mb-1">
                    <label for="exampleInputPassword1">Author Name</label>
                    <input type="text" class="form-control" value={author} onChange={(e) => setauthor(e.target.value)} placeholder="Enter Name" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Product Name</label>
                    <input type="text" class="form-control" value={bookname} onChange={(e) => setbookname(e.target.value)} placeholder="Enter Product" />

                </div>
                
               

                <button type="button" onClick={handleSave} class="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default EditContent
