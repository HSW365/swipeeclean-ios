import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function SimplePayPalButton() {
  const { toast } = useToast();
  const [showBackupOptions, setShowBackupOptions] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);

  const handlePayPalRedirect = () => {
    // Try primary PayPal subscription link
    const paypalUrl = "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-4FF67331KE3635426M3ZU4GQ";
    
    toast({
      title: "Opening PayPal",
      description: "If PayPal doesn't load, we have backup payment methods below.",
    });

    // Show backup options after 3 seconds if PayPal has issues
    setTimeout(() => {
      setShowBackupOptions(true);
    }, 3000);

    // Open in same window for better mobile experience
    window.location.href = paypalUrl;
  };

  const handleAlternativePayPal = () => {
    // Alternative PayPal money request link
    const alternativeUrl = "https://www.paypal.com/paypalme/hoodstarent365/4.99";
    window.open(alternativeUrl, '_blank');
    
    toast({
      title: "Alternative PayPal Payment",
      description: "Send $4.99 monthly to secure your subscription.",
    });
  };

  const handleApplePay = () => {
    // Apple Pay requires merchant account setup - not available without payment processor
    toast({
      title: "Apple Pay Setup Required",
      description: "Apple Pay needs merchant account configuration. Use PayPal or Cash App instead.",
      variant: "destructive",
    });
  };

  useEffect(() => {
    // Check Apple Pay availability
    if ((window as any).ApplePaySession && (window as any).ApplePaySession.canMakePayments()) {
      setApplePayAvailable(true);
    }
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Main PayPal Button */}
      <button
        onClick={handlePayPalRedirect}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
      >
        <div className="flex items-center justify-center space-x-3">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm1.659-4.013h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.136-1.012-4.287C17.525.543 15.517 0 12.947 0H5.487c-.524 0-.972.382-1.054.901L1.326 20.597a.641.641 0 0 0 .633.74h4.606c.524 0 .968-.382 1.05-.9l1.12-7.113z"/>
          </svg>
          <span>Subscribe with PayPal - $4.99/month</span>
        </div>
      </button>

      {/* Note: Apple Pay requires merchant account - removed for now */}

      {/* Backup Payment Options */}
      {showBackupOptions && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-3">PayPal Having Issues? Try These Options:</h4>
          
          <div className="space-y-3">
            {/* PayPal.me Alternative */}
            <button
              onClick={handleAlternativePayPal}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              PayPal.me Alternative Link
            </button>

            {/* Cash App Option */}
            <div className="bg-green-50 p-3 rounded border">
              <p className="font-medium text-green-900 mb-1">Cash App Payment:</p>
              <p className="text-green-800 font-mono">$hsw365</p>
              <p className="text-xs text-green-600">Send $4.99 with note "SwipeeClean Pro"</p>
            </div>
          </div>
        </div>
      )}

      {/* Show Backup Options Button */}
      {!showBackupOptions && (
        <div className="text-center">
          <button
            onClick={() => setShowBackupOptions(true)}
            className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
          >
            PayPal not working? Show alternative payment methods
          </button>
        </div>
      )}

      {/* Contact Support Option */}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <h4 className="font-semibold text-gray-900 mb-2">Need Help with Payment?</h4>
        <p className="text-sm text-gray-600 mb-3">
          Contact us for manual subscription setup
        </p>
        <a 
          href="mailto:hoodstarent365@gmail.com?subject=SwipeeClean Subscription Help&body=I need help setting up my $4.99/month SwipeeClean subscription."
          className="text-blue-600 hover:text-blue-700 underline font-medium"
        >
          Email: hoodstarent365@gmail.com
        </a>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-4 text-gray-400 text-xs">
        <span>🔒 Secure</span>
        <span>💳 Multiple Payment Options</span>
        <span>🔄 Cancel Anytime</span>
      </div>

      {/* Payment Method Icons */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <svg className="w-8 h-6" viewBox="0 0 48 20" fill="#0070ba">
          <path d="M7.076 19.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
        </svg>


        <svg className="w-8 h-6" viewBox="0 0 48 20" fill="#00d632">
          <rect width="48" height="20" rx="4" fill="#00d632"/>
          <text x="24" y="12" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">$</text>
        </svg>
      </div>
    </div>
  );
}