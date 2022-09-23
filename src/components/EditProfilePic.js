import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProfilePic() {

    useEffect(() => {
        getPic();
    }, [])// getData will load all the data of the author before it will render 

    let navigate = useNavigate();
    let { id } = useParams();

    let [pic, setPic] = useState("")
    let [author, setauthor] = useState("");
    let [bookname, setbookname] = useState("");
    
   

    let getPic = async () => {
        await fetch("https://62a8c0ba943591102ba90784.mockapi.io/library/" + id, { method: "GET" })
            .then(data => data.json())
            .then(value => {
                setauthor(value.author)
                setbookname(value.bookname)
              
               
                setPic(value.bookurl)
            })
    }
    let handleSave = async () => {
        let updateauthorPic = await axios.put("https://62a8c0ba943591102ba90784.mockapi.io/library/" + id, {
            bookurl: pic,
            author,
            bookname,
           
            
        })
        console.log(updateauthorPic)
        navigate('/library')
    }
    return (
        <div>
            <form>
                <div class="form-group"><br />
                    <label for="editpic">Profile Pic</label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" class="form-control" name="editpic" value={pic} onChange={(e) => setPic(e.target.value)} placeholder="Enter Pic url" /><br />
                    <img className='author-logo' src={pic} alt="bookurl" />
                </div>
                <button type='button' onClick={handleSave} class="btn btn-primary">Save</button>
            </form>
        </div>
    )
}
export default EditProfilePic
