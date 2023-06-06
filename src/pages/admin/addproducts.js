import {React, useState} from 'react'


// React tostify
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// Admin pannel
import FullLayout from "../../panel/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../panel/theme/theme";
import { Grid, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";
import BaseCard from "../../panel/components/baseCard/BaseCard";


function Addproducts() {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')

  const categoryArray = ['tshirts', 'canvas', 'poster']

  const handleChange = (e)=>{
    if ( e.target.name === 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name === 'category') {
      setCategory(e.target.value)
    }  
    else if (e.target.name === 'price') {
      setPrice(e.target.value)
    }   
    else if (e.target.name === 'slug') {
      setSlug(e.target.value)
    }   
    else if (e.target.name === 'desc') {
      setDesc(e.target.value)
    }   
    else if (e.target.name === 'img1') {
      setImg1(e.target.value)
    }   
    else if (e.target.name === 'img2') {
      setImg2(e.target.value)
    }   
    else if (e.target.name === 'img3') {
      setImg3(e.target.value)
    }
  }

  const submit = async (e)=>{
    e.preventDefault()  


    // fetch the data from form to makes a file in local system
    const data = { title, price, img1, img2, img3, category, slug, desc };

      let res = await fetch(`/api/addproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      
        if (response.success === true) {
            toast.success(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        else{
            toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
        setTitle('')
        setCategory('')
        setPrice('')
        setDesc('')
        setSlug('')
        setImg1('')
        setImg2('')
        setImg3('')
  }

    return (
    <ThemeProvider theme={theme}>

        <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
    
    <FullLayout>
      
    {/* React tostify */}
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add Product">
          <form method='POST' onSubmit={submit}>
            <Stack spacing={3}>
              <TextField onChange={handleChange} value={title} name="title" label="Title" variant="standard"  required/>
              
              <FormControl fullWidth variant='standard'>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name='category'
                  value={category}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem>Select Category</MenuItem>
                  {categoryArray.map((item, index)=>{
                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                  })}
                </Select>
              </FormControl>

              <TextField onChange={handleChange} value={price} name="price" label="Price" variant="standard"  required/>
              <TextField onChange={handleChange} value={slug} name="slug" label="Slug" variant="standard"  required/>
              <TextField onChange={handleChange} value={desc} name="desc" label="Description" variant="standard" multiline required/>
              <TextField onChange={handleChange} value={img1} name="img1" label="Image Url #1" variant="standard"  required/>
              <TextField onChange={handleChange} value={img2} name="img2" label="Image Url #2" variant="standard"/>
              <TextField onChange={handleChange} value={img3} name="img3" label="Image Url #3" variant="standard"/>


            </Stack>
            <br />
            <button className="inline-flex items-center bg-[#29D0d1] hover:bg-[#44B0B7] text-white rounded-xl font-semibold border-0 py-[6px] px-8 focus:outline-none text-base mt-4 md:mt-0 ">Submit</button>
          </form>
        </BaseCard>
      </Grid>
    </Grid>



      </FullLayout>
    </ThemeProvider>
 )
}

export default Addproducts