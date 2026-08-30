/** Staging checkout — Razorpay test only. Secret stays on Cloud Run. */
window.KHARCHLOG_PAY = {
  trackerUrl: 'https://REPLACE_AFTER_STAGING_DEPLOY',
  paymentProvider: 'razorpay',
  razorpayKeyId: 'rzp_test_TVq62QBc2ZMW2K',
  amountPaise: 14900,
  currency: 'INR',
  productName: 'Kharch Log Lifetime',
  productDescription: 'One-time lifetime access'
};
