import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1; // Increment the progress by 1
                } else {
                    clearInterval(timer); // Stop the interval once it reaches 100
                    return 100;
                }
            });
        }, 30); // Update progress every 30ms (100 steps in 3 seconds)

        // Cleanup the interval if the component unmounts
        return () => clearInterval(timer);
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '30px' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#76c7c0',
                        borderRadius: '10px',
                        transition: 'width 0.1s', // Optional smooth transition
                    }}
                />
            </div>
            <p>{progress}%</p>
        </div>
    );
};

export default ProgressBar;
