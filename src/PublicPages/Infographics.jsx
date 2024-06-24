import React, { useState, useEffect } from 'react';
import { getAllInfographics } from '../services/PublicServices';

const Infographics = () => {
  const [infographicsList, setInfographicsList] = useState([]);

  useEffect(() => {
    loadInfographics();
  }, []);

  const loadInfographics = async () => {
    const data = await getAllInfographics();
    setInfographicsList(data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Infographics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {infographicsList.map((item) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            key={item.id}
          >
            <img
              className="w-full h-48 object-cover"
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.title}
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Infographics;
