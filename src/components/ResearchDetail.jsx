import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResearchById } from '../services/PublicServices';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { jwtDecode } from 'jwt-decode';
import '../index.css'; // Ensure you import the index.css

const ResearchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchResearchDetails();
    checkLoginStatus();
  }, [id]);

  const fetchResearchDetails = async () => {
    try {
      const data = await getResearchById(id);
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research details', error);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        jwtDecode(token);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleCommentSubmit = async () => {
    // Logic to submit new comment
    // Add your code here to handle comment submission
  };

  const handleFeedbackSubmit = async () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Logic to submit feedback
      // Add your code here to handle feedback submission
    }
  };

  return (
    <div className="container">
      {research ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{research.title}</h1>
            <h2 className="text-xl font-semibold mb-2">By: {research.author}</h2>
            <p className="text-gray-700 mb-6">{research.content}</p>
            <hr className="my-4" />
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <LoadScript googleMapsApiKey="AIzaSyAwSoEbsNk6EWrGdcaLPUxyp2FPUJ5eBQg">
                <GoogleMap
                  mapContainerStyle={{ height: "400px", width: "100%" }}
                  center={{ lat: research.latitude, lng: research.longitude }}
                  zoom={15}
                >
                  <Marker position={{ lat: research.latitude, lng: research.longitude }} />
                </GoogleMap>
              </LoadScript>
            </div>
            <hr className="my-4" />
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Comments</h3>
              <ul className="comment-list">
                {research.feedbacks.map((comment, index) => (
                  <li key={index} className="comment-item">
                    <p className="comment-text">{comment.comments}</p>
                    <p className="comment-date">{comment.dateSubmitted}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New Comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  rows="4"
                ></textarea>
                <button
                  onClick={handleCommentSubmit}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Submit Comment
                </button>
              </div>
            </div>
            <hr className="my-4" />
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Feedback</h3>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                rows="4"
              ></textarea>
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-4 feedback-button"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default ResearchDetail;
