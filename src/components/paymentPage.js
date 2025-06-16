import React, { useState } from 'react';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        phone: '',
        amount: '',
        email: '',
        note: ''
    });
    const [loading, setLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.amount) newErrors.amount = 'Amount is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        const order_id = 'ORD_' + Date.now();

        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: formData.phone,
                    amount: formData.amount,
                    order_id: `txn_${Date.now()}`,
                    email: formData.email,
                    note: formData.note || "Payment",
                }),
            });

            const data = await response.json();
            if (data.result?.payment_url) {
                window.open(data.result.payment_url, "_blank");
                setPaymentLink(data.result.payment_url);
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white">
                                <h2 className="h4 mb-0">IMB Payment Gateway</h2>
                                <p className="mb-0 text-white-50">Secure and fast payments</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Customer Mobile <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 1234567890"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">
                                        Amount (₹) <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">₹</span>
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            placeholder="100.00"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            min="1"
                                            step="0.01"
                                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                        />
                                    </div>
                                    {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Customer Email <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="customer@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="note" className="form-label">
                                        Note (Optional)
                                    </label>
                                    <input
                                        id="note"
                                        name="note"
                                        type="text"
                                        placeholder="Payment for services"
                                        value={formData.note}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 py-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        'Pay Now'
                                    )}
                                </button>
                            </form>
                            
                            {paymentLink && (
                                <div className="card-footer bg-success bg-opacity-10 border-top-0">
                                    <div className="alert alert-success mb-0">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Payment link created! A new tab should have opened with the payment page.
                                    </div>
                                </div>
                            )}
                            
                            <div className="card-footer text-center bg-light">
                                <small className="text-muted">
                                    Secure payments powered by IMB. Your data is protected with 256-bit encryption.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;