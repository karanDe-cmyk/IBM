import React, { useState } from 'react';
import axios from 'axios';
// import { Button } from "@/components/ui/button";

const PaymentForm = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const order_id = 'ORD_' + Date.now();

    try {
      const res = await axios.post(
        'https://pay.imb.org.in/api/create-order',
        new URLSearchParams({
          customer_mobile: phone,
          user_token: 'dc0d21ce8211b2d79415c095254826be',
          amount: amount,
          order_id: order_id,
          redirect_url: 'https://pay.imb.org.in',
          remark1: email,
          remark2: note
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (res.data?.result?.payment_url) {
        setPaymentLink(res.data.result.payment_url);
        window.open(res.data.result.payment_url, '_blank');
      } else {
        alert(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">IMB Payment Gateway</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          placeholder="Customer Mobile"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Customer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Order...' : 'Pay Now'}
        </button>
      </form>
      {paymentLink && (
        <p className="mt-4 text-sm text-green-600">Payment link created! Check your browser tab.</p>
      )}
    </div>
  );
};

export default PaymentForm;
