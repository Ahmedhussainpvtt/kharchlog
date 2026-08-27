/** Copy to config.js. No Cashfree secret here — only public tracker URL + env mode. */
window.KHARCHLOG_PAY = {
  trackerUrl: 'https://kharchlog-license-u4rcttr3nq-el.a.run.app',
  /** Must match Cloud Run CASHFREE_ENV: sandbox | production */
  cashfreeEnv: 'sandbox',
  amountPaise: 14900,
  currency: 'INR',
  productName: 'Kharch Log Lifetime',
  productDescription: 'One-time lifetime access'
};
