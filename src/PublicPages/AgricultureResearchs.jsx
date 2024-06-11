import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllResearch } from '../services/PublicServices';
import '../index.css'; // Ensure you import the index.css

const AgriculturalResearch = () => {
  const [researchList, setResearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchAllResearch();
  }, []);

  const fetchAllResearch = async () => {
    try {
      const data = await getAllResearch();
      setResearchList(data);
    } catch (error) {
      console.error('Error fetching research list', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredResearchList = researchList.filter((research) =>
    research.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResearchList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResearchList = filteredResearchList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="container">
      <Typography variant="h4" className="header" gutterBottom>
        Agricultural Research
      </Typography>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search research..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Grid container spacing={3}>
        {paginatedResearchList.map((research) => (
          <Grid item xs={12} sm={6} md={4} key={research.researchID}>
            <Card className="card">
              <CardActionArea component={Link} to={`/research/${research.researchID}`}>
                <CardMedia
                  className="card-media"
                  component="img"
                  alt={research.title}
                  image={`data:image/jpeg;base64,${research.images[0].image}`} // Assuming first image
                  title={research.title}
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div" className="card-title">
                    {research.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className="card-text">
                    {research.content.substring(0, 100)}...
                  </Typography>
                  <div className="card-link">
                    <Link to={`/research/${research.researchID}`}>
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default AgriculturalResearch;
