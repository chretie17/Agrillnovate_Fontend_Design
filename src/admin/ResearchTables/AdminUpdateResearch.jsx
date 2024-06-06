import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { getResearchById, updateResearch } from '../../services/AdminService';

const AdminUpdateResearch = ({ id, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const research = await getResearchById(id);
        setTitle(research.title);
        setAuthor(research.author);
        setDatePublished(research.datePublished);
        setContent(research.content);
        setCurrentImage(`data:image/jpeg;base64,${research.image}`);
      } catch (error) {
        console.error('There was an error fetching the research!', error);
      }
    };

    if (id) {
      fetchResearch();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const researchData = { title, author, datePublished, content };

    try {
      const response = await updateResearch(id, researchData, image);
      console.log('Research updated successfully', response);
      if (onClose) onClose();
    } catch (error) {
      console.error('There was an error updating the research!', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Update Research</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date Published"
            type="date"
            fullWidth
            margin="normal"
            value={datePublished}
            onChange={(e) => setDatePublished(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          {newImagePreview ? (
            <img
              src={newImagePreview}
              alt="New Research"
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
            />
          ) : (
            currentImage && (
              <img
                src={currentImage}
                alt="Current Research"
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
            )
          )}
          <Button
            variant="contained"
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Update Research
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AdminUpdateResearch;
