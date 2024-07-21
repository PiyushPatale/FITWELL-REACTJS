import axios from 'axios';

export const loadScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const createOrder = async () => {
  try {
    const response = await axios.post('/create-order', {
      // Include any data required for creating the order
    });

    // Check if the request was successful (status code 2xx)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
