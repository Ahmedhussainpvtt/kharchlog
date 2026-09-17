/** Public checkout config — secrets stay on Cloud Run only */
window.KHARCHLOG_PAY = {
  trackerUrl: 'https://kharchlog-license-u4rcttr3nq-el.a.run.app',
  paymentProvider: 'razorpay',
  /** Live Key ID from Razorpay dashboard (public — safe in browser) */
  razorpayKeyId: 'rzp_live_TVqX95CxZTFsuk',
  /** PayPal sandbox Client ID (public). Swap to Live when ready. */
  paypalClientId:
    'BAArjySr8FEOyBr__W27sM7Hg_yxQXVdvmArD4Ccuhj7ZkhnsQ2xWVhZDVV05eD1cz5wrStuAmeu4N-qOU',
  paypalMode: 'sandbox',
  usdEnabled: true,
  amountPaise: 14900,
  amountUsdCents: 200,
  currency: 'INR',
  productName: 'Kharch Log Lifetime',
  productDescription: 'One-time lifetime access'
};
