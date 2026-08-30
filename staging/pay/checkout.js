(function () {
  var cfg = window.KHARCHLOG_PAY || {};
  var emailInput = document.getElementById('email');
  var phoneInput = document.getElementById('phone');
  var payBtn = document.getElementById('payBtn');
  var statusEl = document.getElementById('status');

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.className = 'pay-status' + (isError ? ' pay-status-error' : '');
  }

  function readEmailFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var e = (params.get('email') || '').trim();
    if (e && emailInput) emailInput.value = e;
  }

  function validateConfig() {
    if (!cfg.trackerUrl) {
      setStatus('Payment is not configured yet. Try again shortly.', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    if (typeof Razorpay !== 'function') {
      setStatus('Razorpay SDK failed to load — refresh and try again', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    return true;
  }

  function apiBase() {
    return cfg.trackerUrl.replace(/\/$/, '');
  }

  function createOrder(email, phone) {
    return fetch(apiBase() + '/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, phone: phone || '', staging: true })
    }).then(function (r) {
      return r.json();
    });
  }

  function markPaid(email, paymentId, orderId, signature) {
    return fetch(apiBase() + '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'markPaid',
        email: email,
        paymentId: paymentId,
        orderId: orderId,
        signature: signature,
        staging: true
      })
    }).then(function (r) {
      return r.json();
    });
  }

  function openCheckout() {
    var email = (emailInput.value || '').trim().toLowerCase();
    var phone = ((phoneInput && phoneInput.value) || '').replace(/\D/g, '').slice(-10);
    if (!email || email.indexOf('@') < 1) {
      setStatus('Enter the Google email you will use to sign in to the app', true);
      emailInput.focus();
      return;
    }
    if (phone && phone.length !== 10) {
      setStatus('Enter a valid 10-digit phone, or leave it blank', true);
      phoneInput.focus();
      return;
    }

    var ok = window.confirm(
      'You will sign in to Kharch Log with:\n\n' +
        email +
        '\n\n' +
        'This must be your correct Google account. Continue to pay ₹149?'
    );
    if (!ok) return;

    setStatus('Creating order…');
    if (payBtn) payBtn.disabled = true;

    try {
      sessionStorage.setItem('kharchlog_staging_pay_email', email);
    } catch (e) {}

    createOrder(email, phone)
      .then(function (orderData) {
        if (!orderData || !orderData.ok || orderData.provider !== 'razorpay' || !orderData.orderId) {
          throw new Error((orderData && orderData.error) || 'Could not create Razorpay order');
        }

        var keyId = orderData.razorpayKeyId || cfg.razorpayKeyId;
        if (!keyId) throw new Error('Missing Razorpay key id');

        setStatus('Opening checkout…');

        return new Promise(function (resolve, reject) {
          var options = {
            key: keyId,
            amount: orderData.amount,
            currency: orderData.currency || 'INR',
            name: cfg.productName || 'Kharch Log',
            description: cfg.productDescription || 'One-time lifetime access',
            order_id: orderData.orderId,
            prefill: {
              email: email,
              contact: phone || ''
            },
            theme: { color: '#0F2A43' },
            handler: function (response) {
              setStatus('Confirming payment…');
              markPaid(
                email,
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature
              )
                .then(function (result) {
                  if (!result || !result.ok || !result.paid) {
                    throw new Error((result && result.error) || 'Payment not confirmed');
                  }
                  var q =
                    '?paid=1&email=' +
                    encodeURIComponent(result.email || email) +
                    '&order_id=' +
                    encodeURIComponent(response.razorpay_order_id || '');
                  window.location.href = '/staging/pay/success.html' + q;
                  resolve(result);
                })
                .catch(reject);
            },
            modal: {
              ondismiss: function () {
                reject(new Error('Checkout closed'));
              }
            }
          };
          var rzp = new Razorpay(options);
          rzp.on('payment.failed', function (resp) {
            var msg =
              (resp.error && resp.error.description) ||
              (resp.error && resp.error.reason) ||
              'Payment failed';
            reject(new Error(msg));
          });
          rzp.open();
        });
      })
      .catch(function (e) {
        var msg = e && e.message ? e.message : 'Could not start checkout';
        if (
          msg === 'Failed to fetch' ||
          msg === 'Load failed' ||
          msg === 'NetworkError when attempting to fetch resource.'
        ) {
          msg = 'Could not reach payment server. Retry in a minute.';
        }
        setStatus(msg, true);
        if (payBtn) payBtn.disabled = false;
      });
  }

  readEmailFromQuery();
  if (validateConfig() && payBtn) {
    payBtn.addEventListener('click', openCheckout);
  }
})();
