import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Typography, Button, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, MenuItem, FormControl, Select, InputLabel, Collapse, IconButton
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { getExperts, getResearchByExpert } from '../services/AdminService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AdminExpertReportPage = () => {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [researchReports, setResearchReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const data = await getExperts();
        setExperts(data);
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };
    fetchExperts();
  }, []);

  const handleExpertChange = async (event) => {
    setSelectedExpert(event.target.value);
    setLoading(true);
    try {
      const data = await getResearchByExpert(event.target.value);
      setResearchReports(data);
    } catch (error) {
      console.error('Error fetching research by expert:', error);
    }
    setLoading(false);
  };

  const handleToggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expert Research Reports", 20, 10);
    const tableColumn = ["ID", "Title", "Author", "Date Published", "Category", "Latitude", "Longitude"];
    const tableRows = researchReports.map(report => [
      report.researchID, report.title, report.author, new Date(report.datePublished).toLocaleDateString(), report.category,
      report.latitude, report.longitude
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });

    researchReports.forEach((report, index) => {
      if (report.images.length > 0) {
        report.images.forEach((image, imgIndex) => {
          doc.addPage();
          doc.text(`Research ID: ${report.researchID}`, 20, 20);
          doc.addImage(`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(image.image)))}`, 'JPEG', 20, 30, 160, 90);
        });
      }
    });

    doc.save("expert_research_reports.pdf");
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Expert Research Reports
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download Report as PDF
        </Button>
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="expert-select-label">Select Expert</InputLabel>
        <Select
          labelId="expert-select-label"
          id="expert-select"
          value={selectedExpert}
          onChange={handleExpertChange}
        >
          {experts.map((expert) => (
            <MenuItem key={expert.userID} value={expert.userID}>
              {expert.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Date Published</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {researchReports.map((report) => (
                  <React.Fragment key={report.researchID}>
                    <TableRow>
                      <TableCell>{report.researchID}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.author}</TableCell>
                      <TableCell>{new Date(report.datePublished).toLocaleDateString()}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{report.latitude}</TableCell>
                      <TableCell>{report.longitude}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggleExpand(report.researchID)}>
                          {expanded === report.researchID ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expanded === report.researchID} timeout="auto" unmountOnExit>
                          <Box margin={2}>
                            <Typography variant="h6" gutterBottom>
                              Content
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: report.content }} />
                            {report.images.map((image, index) => (
                              <img
                                key={index}
                                src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(image.image)))}`}
                                alt={`Research ${report.researchID} Image ${index}`}
                                style={{ maxWidth: '100%', marginTop: '1rem' }}
                              />
                            ))}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default AdminExpertReportPage;
