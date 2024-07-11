// src/components/ReportPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { getReport } from '../services/AdminService';
import { Container, Grid, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { FiDownload } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport();
        setReport(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("System Report", 20, 20);
    doc.setFontSize(12);

    doc.autoTable({
      head: [['Metric', 'Count']],
      body: [
        ['Total Users', report.totalUsers],
        ['Total Research', report.totalResearch],
        ['Total Comments', report.totalComments],
        ['Total Threads', report.totalThreads],
        ['Total Posts', report.totalPosts],
        ['Total Feedback', report.totalFeedback],
      ],
      startY: 30,
    });

    const addSection = (title, data) => {
      if (data && Array.isArray(data)) {
        doc.addPage();
        doc.setFontSize(16);
        doc.text(title, 20, 20);
        doc.setFontSize(12);
        const tableData = data.map(item => Object.values(item));
        const headers = data.length > 0 ? Object.keys(data[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1)) : [];
        doc.autoTable({
          head: [headers],
          body: tableData,
          startY: 30,
        });
      }
    };

    addSection('Users', report.users);
    addSection('Research', report.research);
    addSection('Comments', report.comments);
    addSection('Threads', report.threads);
    addSection('Posts', report.posts);
    addSection('Feedback', report.feedback);

    doc.save('system_report.pdf');
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const userData = {
    labels: ['Users', 'Research', 'Comments', 'Threads', 'Posts', 'Feedback'],
    datasets: [
      {
        label: 'Count',
        data: [
          report.totalUsers,
          report.totalResearch,
          report.totalComments,
          report.totalThreads,
          report.totalPosts,
          report.totalFeedback,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <Container ref={componentRef} maxWidth="xl" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        System Report
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '500px' }}>
            <Bar data={userData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, title: { display: true, text: 'System Data Bar Chart' } } }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '500px' }}>
            <Pie data={userData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, title: { display: true, text: 'System Data Pie Chart' } } }} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleDownload} startIcon={<FiDownload />}>
          Download Report
        </Button>
      </Grid>
    </Container>
  );
};

export default ReportPage;
