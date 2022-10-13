import React,{useState,useEffect} from 'react'
import {Box,Button} from '@mui/material';
const PicKeeper = () => {
  const [img,setImg] = useState();  
  const handleChange = (e) => {
    handleImage();
  };
  const handleImage = () => {
    const { files } = document.querySelector('input[type="file"]')
    console.log('Image file', files[0]);
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'rjer8fr8');
    const options = {
      method: 'POST',
      body: formData,
    };
    return fetch('https://api.Cloudinary.com/v1_1/dudopiduu/image/upload', options)
      .then(res => res.json())
      .then(res => setImg(res.secure_url))
      .catch(err => console.log(err));
      
  }
  useEffect(() => {
    showImg();
  }, [img]);
  
  const showImg = () =>{
    return(
      <img src={img} alt="." />
    )
  }

  return (
    <Box style={{margin:'2rem',marginTop: '2rem'}}>
      <input name="file" type="file" />
      <Button variant="contained" fullWidth onClick={handleChange}>
        Upload File
      </Button>

      <h1>The IMG is:</h1>
      <img src={img} alt="uploaded pics here" />
    </Box>
  )
}

export default PicKeeper;