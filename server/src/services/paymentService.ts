import dotenv from 'dotenv';

dotenv.config();

interface PaymentMetadata {
  transaction_id: string;
  booking_id: string;
  payment_status: 'pending' | 'completed' | 'failed';
  user_id: string;
}

export const initiatePayment = async (bookingData: {
  amount: number;
  userId: string;
  bookingId: string;
}) => {
  try {
    // TODO: Implement Monime API integration
    const response = await fetch(process.env.MONIME_API_URL + '/payments/initiate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MONIME_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: bookingData.amount,
        reference: bookingData.bookingId,
        metadata: {
          user_id: bookingData.userId
        }
      })
    });

    const paymentData = await response.json();
    
    return {
      transaction_id: paymentData.transactionId,
      booking_id: bookingData.bookingId,
      payment_status: 'pending',
      user_id: bookingData.userId
    } as PaymentMetadata;
  } catch (error) {
    throw new Error('Payment initiation failed');
  }
};

export const verifyPayment = async (transactionId: string): Promise<PaymentMetadata> => {
  try {
    // TODO: Implement Monime payment verification
    const response = await fetch(process.env.MONIME_API_URL + `/payments/verify/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MONIME_API_KEY}`
      }
    });

    const verificationData = await response.json();
    
    return {
      transaction_id: transactionId,
      booking_id: verificationData.reference,
      payment_status: verificationData.status === 'success' ? 'completed' : 'failed',
      user_id: verificationData.metadata.user_id
    } as PaymentMetadata;
  } catch (error) {
    throw new Error('Payment verification failed');
  }
};

