import { useEffect } from "react";

export default function PayPalHostedButton() {
  useEffect(() => {
    // Load PayPal SDK script
    const loadPayPalScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
        initializePayPalButton();
        return;
      }

      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=BAAL9R4CoS-Fa2griHXXKaqwK_-7lGbRLWGYom-ZGB8IJhR6JjlfacS5PQoGSBgf9an5dSzuAJ7DiVedz0&components=hosted-buttons&enable-funding=venmo&currency=USD";
      script.async = true;
      script.onload = initializePayPalButton;
      document.head.appendChild(script);
    };

    const initializePayPalButton = () => {
      // Wait for PayPal to be available
      if (typeof window !== 'undefined' && (window as any).paypal) {
        (window as any).paypal.HostedButtons({
          hostedButtonId: "KDTUJLZKK66UN",
        }).render("#paypal-container-KDTUJLZKK66UN");
      }
    };

    loadPayPalScript();

    return () => {
      // Cleanup: Clear the container when component unmounts
      const container = document.getElementById('paypal-container-KDTUJLZKK66UN');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="paypal-hosted-button-container w-full">
      <div id="paypal-container-KDTUJLZKK66UN" className="w-full">
        {/* PayPal hosted button will render here */}
        <div className="text-center py-6">
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading PayPal subscription...</p>
        </div>
      </div>
    </div>
  );
}