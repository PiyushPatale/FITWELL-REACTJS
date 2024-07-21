import React from 'react';
import { TailSpin } from "react-loader-spinner";

const LoaderComp = () => {
    return (
        <div style={loaderStyles}>
            <TailSpin
                height={80}
                width={80}
                color="white" // Black color for the loader
                ariaLabel="tail-spin-loading"
                radius={1}
                visible={true}
            />
        </div>
    );
};

const loaderStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000', // White background with some opacity
    opacity:'0.8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999 // Ensures the loader appears on top of other content
};

export default LoaderComp;
