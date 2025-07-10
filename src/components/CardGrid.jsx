import React, { useState, useEffect } from 'react';
import DispatchCard from '../components/DispatchCard';
import '../styles/CardGrid.css';

const CardGrid = ({apiUrl}) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(apiUrl); // Path to your JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch cards data');
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="DSC-loading">Loading cards...</div>;
  }

  if (error) {
    return <div className="DSC-error">Error: {error}</div>;
  }

  return (
    <div className="DSC-card-grid">
      {cards.map((card, index) => (
        <DispatchCard
          key={index}
          title={card.title}
          buttonText={card.buttonText}
          imageUrl={card.imageUrl}
          cardUrl={card.cardUrl}
        />
      ))}
    </div>
  );
};

export default CardGrid;