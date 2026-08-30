/** Copy to config.js — public Razorpay key id only; secret on Cloud Run staging service. */
window.KHARCHLOG_PAY = {
  trackerUrl: 'https://YOUR-STAGING-CLOUD-RUN-URL',
  paymentProvider: 'razorpay',
  razorpayKeyId: 'rzp_test_xxxxxxxx',
  amountPaise: 14900,
  currency: 'INR',
  productName: 'Kharch Log Lifetime',
  productDescription: 'One-time lifetime access'
};
