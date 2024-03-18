import React, { useState } from 'react';

interface NavbarProps {
    onRefresh: () => void;
    onColorChange: (color: string) => void;
    onJoinMeet: () => void;
    onLeaveMeet: () => void;
    onBrushSizeChange: (size: number) => void; // Add prop for brush size change
}

const Navbar: React.FC<NavbarProps> = ({
    onRefresh,
    onColorChange,
    onJoinMeet,
    onLeaveMeet,
    onBrushSizeChange, // Add onBrushSizeChange prop
}) => {
    const [showColorOptions, setShowColorOptions] = useState(false);
    const [brushSize, setBrushSize] = useState(5); // Default brush size
    const [showBrushSize, setshowBrushSize] = useState(false)

    //all color functions
    const handleColorChange = (color: string) => {
        onColorChange(color);
        setShowColorOptions(false); // Close color options after selection
    };

    const toggleColorOptions = () => {
        setShowColorOptions(!showColorOptions);
    };


    //all brush functions
    const brushoptions = () =>{
        setshowBrushSize(!showBrushSize)
    }


    const increaseBrushSize = () => {
        setBrushSize(prevSize => prevSize + 1); // Increase brush size
        onBrushSizeChange(brushSize + 1); // Pass new brush size to the Whiteboard component
    };

    const decreaseBrushSize = () => {
        if (brushSize > 1) {
            setBrushSize(prevSize => prevSize - 1); // Decrease brush size
            onBrushSizeChange(brushSize - 1); // Pass new brush size to the Whiteboard component
        }
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <button
                    className="text-white hover:text-gray-300"
                    onClick={onRefresh}
                >
                    Refresh
                </button>
                <button
                    className="text-white hover:text-gray-300"
                >
                    Undo
                </button>

                {/* brush button */}
                <div className="relative">
                    <button
                        className="text-white hover:text-gray-300"
                        onClick={brushoptions}
                    >
                        Brush size
                    </button>
                    {showBrushSize && (
                        <div className="absolute top-8 right-0 bg-white p-2 rounded shadow-md z-10 flex flex-col">
                            <button type="button" 
                            onClick={increaseBrushSize}
                            className="mx-2 my-1 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Increase
                            </button>
                            <button type="button"
                            onClick={decreaseBrushSize}
                            className="mx-2 my-1 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Decrease
                            </button>
                        </div>
                    )}
                </div>

                {/* color button  */}
                <div className="relative">
                    <button
                        className="text-white hover:text-gray-300"
                        onClick={toggleColorOptions}
                    >
                        Change Color
                    </button>
                    {showColorOptions && (
                        <div className="absolute top-8 right-0 bg-white p-2 rounded shadow-md z-10">
                            <button
                                className="text-red-500 hover:text-red-700 mx-2"
                                onClick={() => handleColorChange('red')}
                            >
                                Red
                            </button>
                            <button
                                className="text-green-500 hover:text-green-700 mx-2"
                                onClick={() => handleColorChange('green')}
                            >
                                Green
                            </button>
                            <button
                                className="text-yellow-500 hover:text-yellow-700 mx-2"
                                onClick={() => handleColorChange('yellow')}
                            >
                                Yellow
                            </button>
                            <button
                                className="text-purple-500 hover:text-purple-700 mx-2"
                                onClick={() => handleColorChange('purple')}
                            >
                                Purple
                            </button>
                            <button
                                className="text-black hover:text-gray-800 mx-2"
                                onClick={() => handleColorChange('black')}
                            >
                                Black
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    className="text-white hover:text-gray-300"
                    onClick={onJoinMeet}
                >
                    Join Meet
                </button>
                <button
                    className="text-white hover:text-gray-300"
                    onClick={onLeaveMeet}
                >
                    Leave Meet
                </button>
                
            </div>
        </nav>
    );
};

export default Navbar;
