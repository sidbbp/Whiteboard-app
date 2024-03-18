"use client"
// page.tsx
import React, { useState } from 'react';
import Navbar from './navbar';
import Whiteboard from './whiteboard';

const Page: React.FC = () => {
    const [color, setColor] = useState('black'); 

    const [canvasKey, setCanvasKey] = useState(0);
    const [brushSize, setBrushSize] = useState(5); 
    const handleRefresh = () => {
        setCanvasKey(prevKey => prevKey + 1);
    };

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
    };

    const handleJoinMeet = () => {
        // Implement join meet logic
    };

    const handleLeaveMeet = () => {
        // Implement leave meet logic
    };
    const handleBrushSizeChange = (size: number) => {
      setBrushSize(size);
    };

    return (
        <>
            <Navbar
                onRefresh={handleRefresh}
                onColorChange={handleColorChange} 
                onJoinMeet={handleJoinMeet}
                onLeaveMeet={handleLeaveMeet}
                onBrushSizeChange={handleBrushSizeChange}
            />
            <div className='overflow-x-hidden'>
                <Whiteboard color={color} key={canvasKey} brushSize={brushSize} /> 
            </div>
        </>
    );
};

export default Page;
