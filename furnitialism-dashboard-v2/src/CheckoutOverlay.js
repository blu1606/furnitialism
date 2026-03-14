import { useState } from 'react'
import { useStore } from './store'
import { useTranslation } from './i18n'

export const CheckoutOverlay = () => {
  const { checkoutStep, setCheckoutStep, cart, clearCart, isLoggedIn, setLoggedIn, setUserEmail } = useStore()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'credit_card'
  })
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')

  if (checkoutStep === 'none') return null

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  const handleNext = (e) => {
    e.preventDefault()
    if (checkoutStep === 'details') setCheckoutStep('auth')
    else if (checkoutStep === 'payment') {
      setCheckoutStep('processing')
      setTimeout(() => {
        setCheckoutStep('success')
        clearCart()
      }, 2000)
    }
  }

  const handleBack = () => {
    if (checkoutStep === 'details') setCheckoutStep('none')
    else if (checkoutStep === 'auth') setCheckoutStep('details')
    else if (checkoutStep === 'payment') setCheckoutStep('auth')
  }

  return (
    <div className={`checkout-overlay-container ${checkoutStep !== 'none' ? 'active' : ''}`}>
      <div className="checkout-modal glass-panel">
        <button className="close-checkout" onClick={() => setCheckoutStep('none')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="checkout-progress">
          <div className={`step ${['details', 'auth', 'payment', 'success'].includes(checkoutStep) ? 'active' : ''}`}>{t('checkout.progress.details') || 'Details'}</div>
          <div className="connector"></div>
          <div className={`step ${['auth', 'payment', 'success'].includes(checkoutStep) ? 'active' : ''}`}>{t('checkout.progress.login') || 'Login'}</div>
          <div className="connector"></div>
          <div className={`step ${['payment', 'success'].includes(checkoutStep) ? 'active' : ''}`}>{t('checkout.progress.payment') || 'Payment'}</div>
          <div className="connector"></div>
          <div className={`step ${checkoutStep === 'success' ? 'active' : ''}`}>{t('checkout.progress.complete') || 'Complete'}</div>
        </div>

        {checkoutStep === 'details' && (
          <form className="checkout-form" onSubmit={handleNext}>
            <h2>{t('checkout.details.title') || 'Shipping Details'}</h2>
            <div className="form-group">
              <label htmlFor="name">{t('checkout.details.name') || 'Full Name'}</label>
              <input
                type="text"
                id="name"
                required
                placeholder={t('checkout.details.namePlaceholder') || 'John Doe'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('checkout.details.email') || 'Email Address'}</label>
              <input
                type="email"
                id="email"
                required
                placeholder={t('checkout.details.emailPlaceholder') || 'john@example.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">{t('checkout.details.address') || 'Shipping Address'}</label>
              <input
                type="text"
                id="address"
                required
                placeholder={t('checkout.details.addressPlaceholder') || '123 Luxury Ave'}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">{t('checkout.details.city') || 'City'}</label>
                <input
                  type="text"
                  id="city"
                  required
                  placeholder={t('checkout.details.cityPlaceholder') || 'New York'}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handleBack}>{t('checkout.actions.back') || 'Back'}</button>
              <button type="submit" className="btn-primary">{t('checkout.actions.continue') || 'Continue'}</button>
            </div>
          </form>
        )}

        {checkoutStep === 'auth' && (
          <div className="checkout-auth">
            <h2>{t('checkout.auth.title') || 'Login to Save Your Order'}</h2>
            <p className="auth-subtitle">{t('checkout.auth.subtitle') || 'Log in for faster checkout or continue as guest.'}</p>
            {!isLoggedIn ? (
              <div className="auth-grid">
                <div className="auth-panel">
                  <div className="form-group">
                    <label htmlFor="authEmail">{t('checkout.auth.email') || 'Email'}</label>
                    <input
                      type="email"
                      id="authEmail"
                      placeholder={t('checkout.auth.emailPlaceholder') || 'you@example.com'}
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="authPassword">{t('checkout.auth.password') || 'Password'}</label>
                    <input
                      type="password"
                      id="authPassword"
                      placeholder={t('checkout.auth.passwordPlaceholder') || '••••••••'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setLoggedIn(true)
                      setUserEmail(authEmail)
                      setCheckoutStep('payment')
                    }}
                  >
                    {t('checkout.auth.loginBtn') || 'Login & Continue'}
                  </button>
                </div>
                <div className="auth-panel auth-panel-guest">
                  <div>
                    <h3>{t('checkout.auth.guestTitle') || 'Continue as Guest'}</h3>
                    <ul>
                      <li>{t('checkout.auth.guestFeature1') || 'No account required'}</li>
                      <li>{t('checkout.auth.guestFeature2') || 'Fast checkout'}</li>
                      <li>{t('checkout.auth.guestFeature3') || 'Create account after purchase'}</li>
                    </ul>
                  </div>
                  <button className="btn-secondary" onClick={() => setCheckoutStep('payment')}>{t('checkout.auth.guestBtn') || 'Continue as Guest'}</button>
                </div>
              </div>
            ) : (
              <div className="auth-panel">
                <p>{t('checkout.auth.signedIn') || 'Signed in. Ready to complete payment.'}</p>
                <button className="btn-primary" onClick={() => setCheckoutStep('payment')}>{t('checkout.auth.continueToPayment') || 'Continue to Payment'}</button>
              </div>
            )}
            <div className="form-actions">
              <button className="btn-secondary" onClick={handleBack}>{t('checkout.actions.back') || 'Back'}</button>
            </div>
          </div>
        )}

        {checkoutStep === 'payment' && (
          <div className="checkout-payment">
            <h2>{t('checkout.payment.title') || 'Payment Method'}</h2>
            <div className="payment-options">
              <div
                className={`payment-option glass-panel ${formData.paymentMethod === 'credit_card' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <span>{t('checkout.payment.creditCard') || 'Credit Card'}</span>
              </div>
              <div
                className={`payment-option glass-panel ${formData.paymentMethod === 'vietqr' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'vietqr' })}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
                <span>{t('checkout.payment.vietqr') || 'VietQR Transfer'}</span>
              </div>
            </div>

            {formData.paymentMethod === 'credit_card' ? (
              <div className="card-details">
                <div className="form-group">
                  <label>{t('checkout.payment.cardNumber') || 'Card Number'}</label>
                  <input type="text" placeholder={t('checkout.payment.cardNumberPlaceholder') || '**** **** **** ****'} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('checkout.payment.expiry') || 'Expiry Date'}</label>
                    <input type="text" placeholder={t('checkout.payment.expiryPlaceholder') || 'MM/YY'} />
                  </div>
                  <div className="form-group">
                    <label>{t('checkout.payment.cvc') || 'CVC'}</label>
                    <input type="text" placeholder={t('checkout.payment.cvcPlaceholder') || '***'} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="vietqr-mock">
                <div className="qr-container glass-panel">
                  {/* Mock QR Code */}
                  <div className="qr-code-placeholder">
                    <div className="qr-pattern"></div>
                    <div className="qr-logo">SePay</div>
                  </div>
                </div>
                <p className="qr-instruction">{t('checkout.payment.qrInstruction') || 'Scan this QR code with your banking app to pay'} <strong>${total.toLocaleString()}</strong></p>
              </div>
            )}

            <div className="order-summary-compact">
              <span>{t('checkout.payment.total') || 'Total Amount'}</span>
              <span className="amount">${total.toLocaleString()}</span>
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={handleBack}>{t('checkout.actions.back') || 'Back'}</button>
              <button className="btn-primary" onClick={handleNext}>{t('checkout.actions.confirm') || 'Confirm Order'}</button>
            </div>
          </div>
        )}

        {checkoutStep === 'processing' && (
          <div className="checkout-processing">
            <div className="luxury-spinner"></div>
            <h2>{t('checkout.processing.title') || 'Processing Payment'}</h2>
            <p>{t('checkout.processing.subtitle') || 'Securing your luxury selection...'}</p>
          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="checkout-success">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2>{t('checkout.success.title') || 'Order Confirmed'}</h2>
            <p>{t('checkout.success.subtitle') || 'Thank you for choosing Smart 3D Interior. Your furniture will be delivered with premium care.'}</p>

            <div className="order-number-container">
              <span className="order-label">{t('checkout.success.orderRef') || 'Order Reference'}</span>
              <div className="order-number">#LX-{Math.floor(Math.random() * 90000) + 10000}</div>
            </div>

            <button className="btn-primary" onClick={() => setCheckoutStep('none')}>
              {t('checkout.actions.return') || 'Return to Shop'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
