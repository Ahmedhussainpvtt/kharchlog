/** Public checkout config — secret stays on Cloud Run only */
window.KHARCHLOG_PAY = {
  trackerUrl: 'https://kharchlog-license-u4rcttr3nq-el.a.run.app',
  paymentProvider: 'razorpay',
  /** Live Key ID from Razorpay dashboard (public — safe in browser) */
  razorpayKeyId: 'rzp_live_TVqX95CxZTFsuk',
  amountPaise: 14900,
  currency: 'INR',
  productName: 'Kharch Log Lifetime',
  productDescription: 'One-time lifetime access'
};
