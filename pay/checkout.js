(function () {
  var cfg = window.KHARCHLOG_PAY || {};
  var emailInput = document.getElementById('email');
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
    if (!cfg.razorpayKeyId || cfg.razorpayKeyId.indexOf('REPLACE') >= 0) {
      setStatus('Payment not configured yet — add your Razorpay Key ID in pay/config.js', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    if (!cfg.trackerUrl) {
      setStatus('Missing trackerUrl in pay/config.js', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    return true;
  }

  function createOrder(email) {
    return fetch(cfg.trackerUrl.replace(/\/$/, '') + '/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    }).then(function (r) { return r.json(); });
  }

  function markPaid(email, response) {
    return fetch(cfg.trackerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'markPaid',
        email: email,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature
      })
    }).then(function (r) { return r.json(); });
  }

  function openCheckout() {
    var email = (emailInput.value || '').trim().toLowerCase();
    if (!email || email.indexOf('@') < 1) {
      setStatus('Enter the Google email you will use to sign in to the app', true);
      emailInput.focus();
      return;
    }

    var ok = window.confirm(
      'You will sign in to Kharch Log with:\n\n' + email + '\n\n' +
      'This must be your correct Google account. Continue to pay ₹100?'
    );
    if (!ok) return;

    setStatus('Creating order…');
    if (payBtn) payBtn.disabled = true;

    createOrder(email)
      .then(function (orderData) {
        if (!orderData || !orderData.ok || !orderData.orderId) {
          throw new Error((orderData && orderData.error) || 'Could not create order');
        }

        setStatus('Opening Razorpay…');

        var options = {
          key: cfg.razorpayKeyId,
          order_id: orderData.orderId,
          amount: orderData.amount || cfg.amountPaise || 10000,
          currency: orderData.currency || cfg.currency || 'INR',
          name: cfg.productName || 'Kharch Log',
          description: cfg.productDescription || 'Lifetime access',
          prefill: { email: email },
          notes: { email: email, product: 'Kharch Log Lifetime' },
          theme: { color: '#1a6f8d' },
          config: {
            display: { save: false }
          },
          handler: function (response) {
            setStatus('Confirming payment…');
            markPaid(email, response)
              .then(function (data) {
                if (data && data.ok && data.paid) {
                  window.location.href = '/pay/success.html?email=' + encodeURIComponent(email);
                } else {
                  setStatus((data && data.error) || 'Payment recorded failed — contact support', true);
                  if (payBtn) payBtn.disabled = false;
                }
              })
              .catch(function () {
                setStatus('Could not confirm payment — email support with payment ID: ' + response.razorpay_payment_id, true);
                if (payBtn) payBtn.disabled = false;
              });
          },
          modal: {
            ondismiss: function () {
              setStatus('Payment cancelled');
              if (payBtn) payBtn.disabled = false;
            }
          }
        };

        var rzp = new Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setStatus('Payment failed: ' + (resp.error && resp.error.description || 'try again'), true);
          if (payBtn) payBtn.disabled = false;
        });
        rzp.open();
      })
      .catch(function (e) {
        setStatus(e.message || 'Could not start checkout', true);
        if (payBtn) payBtn.disabled = false;
      });
  }

  readEmailFromQuery();
  if (validateConfig() && payBtn) {
    payBtn.addEventListener('click', openCheckout);
  }
})();
