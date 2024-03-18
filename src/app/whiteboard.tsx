// whiteboard.tsx
import React, { useRef, useEffect, MouseEvent } from 'react';
interface WhiteboardProps {
    color: string; 
    brushSize: number;
}

function Whiteboard({ color, brushSize }: WhiteboardProps): JSX.Element {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetCanvasSize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                // Adjust canvas size
                canvas.width = window.innerWidth * 2;
                canvas.height = window.innerHeight * 2;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;
    
                // Reset drawing context
                ctx.scale(2, 2);
                ctx.lineCap = 'round';
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = color;
            }
        }
    };
    // This useEffect hook listens for resize events and adjusts the canvas size
    useEffect(() => {
        window.addEventListener('resize', resetCanvasSize);
        resetCanvasSize(); // Call resetCanvasSize initially
    
        return () => {
            window.removeEventListener('resize', resetCanvasSize);
        };
    }, []);
    
    // This useEffect hook sets up the canvas drawing context and updates brush size and color
    useEffect(() => {
        const canvas = canvasRef.current;
    
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctxRef.current = ctx;
                ctx.lineCap = 'round';
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = color;
            }
        }
    }, [color, brushSize]);


    
    const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        if (ctxRef.current) {
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(offsetX, offsetY);
            isDrawing.current = true;
        }
    };


    const finishDrawing = () => {
        if (ctxRef.current) {
            ctxRef.current.closePath();
            isDrawing.current = false;
        }
    };
    

    const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current) return;
        const { offsetX, offsetY } = nativeEvent;
        if (ctxRef.current) {
            ctxRef.current.lineTo(offsetX, offsetY);
            ctxRef.current.stroke();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            style={{
                background: 'white',
                display: 'block',
            }}
        />
    );
}

export default Whiteboard;
