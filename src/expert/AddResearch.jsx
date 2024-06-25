import React, { useState, useCallback, useRef } from 'react';
import { Container, TextField, Button, Box, Typography, Grid } from '@mui/material';
import { createResearch } from '../services/ResearchService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
};

const initialCenter = {
  lat: -1.970579,
  lng: 30.104429,
};

const searchBoxStyle = {
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: '300px',
  height: '40px',
  padding: '0 12px',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '16px',
  outline: 'none',
  textOverflow: 'ellipses',
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const libraries = ['places'];

const AddResearch = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [location, setLocation] = useState(null);
  const searchBoxRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const researchData = {
      title,
      author,
      datePublished,
      content,
      latitude: location ? location.lat : null,
      longitude: location ? location.lng : null,
    };

    const formData = new FormData();
    formData.append('research', new Blob([JSON.stringify(researchData)], { type: 'application/json' }));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await createResearch(formData);
      toast.success('Research submitted successfully!');
      // Reset form fields
      setTitle('');
      setAuthor('');
      setDatePublished('');
      setContent('');
      setImages([]);
      setImagePreviews([]);
      setLocation(null);
    } catch (error) {
      console.error('Error submitting research:', error);
      toast.error('Error submitting research');
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleMapClick = useCallback((event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setLocation(location);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add Research
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="datePublished"
          label="Date Published"
          name="datePublished"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={datePublished}
          onChange={(e) => setDatePublished(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="content"
          label="Content"
          name="content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Images
          <input type="file" hidden multiple onChange={handleImageChange} />
        </Button>
        {imagePreviews.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {imagePreviews.map((preview, index) => (
              <Grid item xs={3} key={index}>
                <img src={preview} alt={`Preview ${index}`} style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={3}>
          <Typography variant="h6">Select Research Location</Typography>
          <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE" libraries={libraries}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location || initialCenter}
              zoom={8}
              onClick={handleMapClick}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search for places"
                  style={searchBoxStyle}
                />
              </StandaloneSearchBox>
              {location && <Marker position={location} />}
            </GoogleMap>
          </LoadScript>
        </Box>
        {location && (
          <Box mt={2}>
            <Typography variant="body1">Selected Location: {location.lat}, {location.lng}</Typography>
          </Box>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddResearch;
