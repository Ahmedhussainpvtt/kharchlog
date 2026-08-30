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
      setStatus('Missing trackerUrl in pay/config.js', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    if (!cfg.razorpayKeyId) {
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
    return (cfg.trackerUrl || '').replace(/\/$/, '');
  }

  function createOrder(email, phone) {
    return fetch(apiBase() + '/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, phone: phone || '' })
    }).then(function (r) {
      return r.json();
    });
  }

  function openRazorpayModal(email, phone, orderData) {
    var keyId = (orderData && orderData.razorpayKeyId) || cfg.razorpayKeyId;
    var amount = (orderData && orderData.amount) || cfg.amountPaise;
    var currency = (orderData && orderData.currency) || cfg.currency || 'INR';
    var orderId = orderData && orderData.orderId;

    if (!keyId || !amount) {
      return Promise.reject(new Error('Payment is not configured yet'));
    }

    setStatus('Opening checkout…');

    return new Promise(function (resolve, reject) {
      var options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: cfg.productName || 'Kharch Log',
        description: cfg.productDescription || 'One-time lifetime access',
        prefill: {
          email: email,
          contact: phone || ''
        },
        notes: {
          email: email
        },
        theme: { color: '#0F2A43' },
        handler: function (response) {
          var q = new URLSearchParams();
          q.set('email', email);
          if (response.razorpay_payment_id) {
            q.set('payment_id', response.razorpay_payment_id);
          }
          if (response.razorpay_order_id) {
            q.set('order_id', response.razorpay_order_id);
          }
          if (response.razorpay_signature) {
            q.set('signature', response.razorpay_signature);
          }
          window.location.href = '/pay/success.html?' + q.toString();
          resolve({ ok: true });
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Checkout closed'));
          }
        }
      };

      if (orderId) options.order_id = orderId;

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
      sessionStorage.setItem('kharchlog_pay_email', email);
    } catch (e) {}

    createOrder(email, phone)
      .then(function (orderData) {
        if (orderData && orderData.ok && orderData.provider === 'razorpay' && orderData.orderId) {
          return openRazorpayModal(email, phone, orderData);
        }
        if (orderData && orderData.error) {
          throw new Error(orderData.error);
        }
        return openRazorpayModal(email, phone, null);
      })
      .catch(function (e) {
        var msg = e && e.message ? e.message : 'Could not start checkout';
        if (
          msg === 'Failed to fetch' ||
          msg === 'Load failed' ||
          msg === 'NetworkError when attempting to fetch resource.'
        ) {
          return openRazorpayModal(email, phone, null).catch(function (e2) {
            setStatus((e2 && e2.message) || msg, true);
            if (payBtn) payBtn.disabled = false;
          });
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
