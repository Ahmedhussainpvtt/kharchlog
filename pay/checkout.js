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
    if (typeof Cashfree !== 'function') {
      setStatus('Cashfree SDK failed to load — refresh and try again', true);
      if (payBtn) payBtn.disabled = true;
      return false;
    }
    return true;
  }

  function createOrder(email, phone) {
    return fetch(cfg.trackerUrl.replace(/\/$/, '') + '/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, phone: phone || '' })
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
      sessionStorage.setItem('kharchlog_pay_email', email);
    } catch (e) {}

    createOrder(email, phone)
      .then(function (orderData) {
        if (!orderData || !orderData.ok || !orderData.paymentSessionId) {
          throw new Error((orderData && orderData.error) || 'Could not create order');
        }

        setStatus('Opening Cashfree…');
        var mode =
          orderData.env === 'production' || cfg.cashfreeEnv === 'production'
            ? 'production'
            : 'sandbox';
        var cashfree = Cashfree({ mode: mode });
        return cashfree.checkout({
          paymentSessionId: orderData.paymentSessionId,
          redirectTarget: '_self'
        });
      })
      .then(function (result) {
        if (result && result.error) {
          throw new Error(result.error.message || 'Checkout failed');
        }
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
