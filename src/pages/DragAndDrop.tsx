import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const initialItems = [
  { id: 1, text: '카드 1' },
  { id: 2, text: '카드 2' },
  { id: 3, text: '카드 3' },
];

const DragAndDrop = () => {
  const [cards, setCards] = useState(initialItems);
  const [dragging, setDragging] = useState<number | null>(null);

  const handleDragStart = (id: number) => {
    setDragging(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (id: number) => {
    if (dragging === null || dragging === id) return;

    const draggingItem = cards.find((card) => card.id === dragging)!;
    const newCards = cards.filter((card) => card.id !== dragging);
    const dropIndex = newCards.findIndex((card) => card.id === id);

    alert(id);

    newCards.splice(dropIndex, 0, draggingItem);
    setCards(newCards);
    setDragging(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            draggable
            onDragStart={() => handleDragStart(card.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(card.id)}
            sx={{
              width: 200,
              cursor: 'move',
              userSelect: 'none',
              bgcolor: dragging === card.id ? 'grey.300' : 'white',
            }}
          >
            <CardContent>
              <Typography>{card.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <pre>{JSON.stringify(cards, null, 2)}</pre>
    </>
  );
};

export default DragAndDrop;
