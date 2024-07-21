import { createOrder } from './razorpayUtils';
// eslint-disable-next-line
const handlePayment = async () => {
    try {
        const orderData = {
            amount: 10000,
            currency: 'INR',
            receipt: 'order_123',
            payment_capture: 1,
            notes: {
                customer_name: 'John Doe',
                customer_email: 'john@example.com',
                customer_phone: '+1234567890',
                description: 'Product purchase'
            }
        };

        const order = await createOrder(orderData);
        console.log('Created order:', order);
    } catch (error) {
        console.error('Error creating order:', error);

    }
};
