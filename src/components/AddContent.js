import axios from "axios";
import { useFormik } from "formik";
import { React } from "react";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"

function AddContent() {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {  
         bookurl: "",
            author: "",
            bookname: "",
           
           
        },
        validationSchema: yup.object({
           bookurl: yup.string().required("Please add author book url!"),
            author: yup.string().required("Please enter author name!"),
            bookname: yup.string().required("Please enter product name"),
          
        }),
        onSubmit: values => {
            handleSave(values)
            console.log(values)
        }
    })

    let handleSave = async (data) => {
        let addauthorData = await axios.post("https://62a8c0ba943591102ba90784.mockapi.io/library", data)
        console.log(addauthorData)
        navigate('/library')
    }

    return <div>
        <h1>Add author</h1>
        <form onSubmit={formik.handleSubmit}>
            <div class="form-group">
                <label for="bookurl">Book url</label>
                <input type="text" name="bookurl" id="bookurl" class="form-control" placeholder="Enter Pic url" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bookurl} />
                {formik.touched.bookurl && formik.errors.boolurl ? (<div style={{ color: "red" }}>{formik.errors.bookurl}</div>) : null}
            </div>
            <div class="form-group">
                <label for="author">Author Name</label>
                <input type="text" name="author" id="author" class="form-control" placeholder="Enter Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.author} />
                {formik.touched.author && formik.errors.author ? (<div style={{ color: "red" }}>{formik.errors.author}</div>) : null}
            </div>
            <div class="form-group">
                <label for="bookname">Book Name</label>
                <input type="text" name="bookname" id="bookname" class="form-control" placeholder="Enter Product" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bookname} />
                {formik.touched.bookname && formik.errors.bookname ? (<div style={{ color: "red" }}>{formik.errors.bookname}</div>) : null}
            </div>
          
           
           
            

            <button type="submit" onClick={handleSave} class="btn btn-primary">Submit</button>
        </form>

    </div>;
}

export default AddContent;
