export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img src="@assets/swipeeclean logo_1754327947218.png" alt="SwipeeClean Logo" className="h-16" />
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Professional Storage Management
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Premium storage cleaning platform. Owner access free, public subscribers $4.99/month.
          </p>
        </div>
        
        {/* Features */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Device Storage Cleaning
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Photo & Video Organization
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Duplicate File Detection
          </div>
        </div>
        
        {/* Owner Access Only */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
          <div className="text-center">
            <p className="text-xs text-purple-600 font-semibold mb-1">OWNER ACCESS</p>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl font-bold text-purple-600">SwipeeClean</span>
            </div>
            <p className="text-sm text-gray-600">Storage Management Tool</p>
            <p className="text-xs text-purple-600 mt-1">Owner free • Subscribers $4.99/month</p>
          </div>
        </div>

        {/* Access Options */}
        <div className="space-y-3 mb-4">
          <button 
            onClick={() => {
              const email = prompt("Enter your email for owner access:");
              if (email === "swipeeclean@gmail.com") {
                window.location.href = "/real-cleaner";
              } else {
                alert("Access denied. Owner access only.");
              }
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Owner Access (Free)
          </button>
          
          <button 
            onClick={() => {
              window.location.href = "/subscribe";
            }}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Subscribe - $4.99/month
          </button>
        </div>
        
        <p className="text-xs text-gray-500">
          Owner access: swipeeclean@gmail.com • Subscribers: $4.99/month
        </p>
        
        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <a 
            href="/preview" 
            className="block text-blue-600 hover:text-blue-700 text-sm underline font-medium"
          >
            👀 See Feature Preview (No Signup Required)
          </a>
          <a 
            href="/real-cleaner" 
            className="block text-purple-600 hover:text-purple-700 text-sm underline font-medium"
          >
            📱 Real File Cleaner - Scan Your Actual Files
          </a>

          <a 
            href="/settings" 
            className="block text-gray-600 hover:text-gray-700 text-xs underline font-medium"
          >
            ⚙️ Settings & Support
          </a>
          <p className="text-xs text-gray-500">
            Try the demo • Join the viral movement • See what 2.5M+ users experience daily
          </p>
        </div>
      </div>
    </div>
  );
}