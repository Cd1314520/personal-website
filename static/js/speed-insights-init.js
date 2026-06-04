// Vercel Speed Insights initialization
// This script imports and initializes the Speed Insights tracking
import { injectSpeedInsights } from './speed-insights.js';

// Initialize Speed Insights when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    injectSpeedInsights();
  });
} else {
  // DOM is already loaded
  injectSpeedInsights();
}
