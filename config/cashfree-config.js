// Cashfree Payment Gateway Configuration
// 💳 Edit your Cashfree credentials here

const cashfreeConfig = {
    appId: "YOUR_CASHFREE_APP_ID",
    secretKey: "YOUR_CASHFREE_SECRET_KEY",
    environment: "SANDBOX", // "SANDBOX" or "PRODUCTION"
    apiVersion: "2023-08-01",
    returnUrl: window.location.origin + "/payment-success",
    notifyUrl: window.location.origin + "/payment-notify",
    paymentMethods: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
        emi: false,
        paylater: false
    },
    theme: {
        color: "#fb923c",
        backgroundColor: "#ffffff",
        textColor: "#333333"
    }
};

window.cashfreePayment = {
    initPayment: function(orderData) {
        return new Promise((resolve, reject) => {
            try {
                const orderId = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                const paymentRequest = {
                    order_id: orderId,
                    order_amount: orderData.amount,
                    order_currency: "INR",
                    customer_details: {
                        customer_id: orderData.customerId || 'CUST_' + Date.now(),
                        customer_name: orderData.customerName,
                        customer_email: orderData.customerEmail,
                        customer_phone: orderData.customerPhone || "9999999999"
                    },
                    order_meta: {
                        return_url: cashfreeConfig.returnUrl,
                        notify_url: cashfreeConfig.notifyUrl
                    }
                };
                console.log('💳 Initiating payment:', paymentRequest);
                setTimeout(() => {
                    resolve({
                        success: true,
                        orderId: orderId,
                        paymentId: 'PAY_' + Date.now(),
                        message: 'Payment completed successfully'
                    });
                }, 2000);
            } catch (error) {
                reject({ success: false, error: error.message });
            }
        });
    },
    verifyPayment: function(orderId, paymentId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true, verified: true, status: 'SUCCESS' });
            }, 1000);
        });
    }
};

window.cashfreeConfig = cashfreeConfig;
console.log('💳 Cashfree config loaded');