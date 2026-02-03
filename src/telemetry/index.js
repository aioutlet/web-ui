/**
 * Telemetry module for customer-ui
 *
 * Re-exports Application Insights functionality for easy consumption.
 *
 * Usage:
 *   import { trackEvent, trackException } from './telemetry';
 *
 *   // Track custom event
 *   trackEvent('AddToCart', { productId: '123', quantity: 2 });
 *
 *   // Track exception
 *   trackException(error, { component: 'ProductPage' });
 */

export {
  initializeAppInsights,
  getAppInsights,
  getReactPlugin,
  trackEvent,
  trackException,
  trackPageView,
  trackMetric,
  setAuthenticatedUser,
  clearAuthenticatedUser,
  flushTelemetry,
} from './appInsights';

export { default as telemetry } from './appInsights';
