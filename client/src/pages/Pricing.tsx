export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your SwipeClean Plan
          </h1>
          <p className="text-xl text-gray-600">
            Professional storage management for millions of users worldwide
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
              <p className="text-4xl font-bold text-blue-600 mb-1">$4.99</p>
              <p className="text-gray-600 mb-6">per month</p>
              <button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
              >
                Start Monthly
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Device Storage Cleaning
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Gmail Email Cleaning
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                iCloud Storage Management
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Unlimited File Organization
              </div>
            </div>
          </div>

          {/* Annual Plan - Most Popular */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual</h3>
              <p className="text-4xl font-bold text-blue-600 mb-1">$49.99</p>
              <p className="text-gray-600 mb-2">per year</p>
              <p className="text-sm text-green-600 font-semibold mb-4">Save $9.89 (17% off)</p>
              <button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
              >
                Start Annual
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Everything in Monthly
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Priority Support
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Advanced Analytics
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                17% Savings
              </div>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-500">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lifetime</h3>
              <p className="text-4xl font-bold text-purple-600 mb-1">$199</p>
              <p className="text-gray-600 mb-2">one-time</p>
              <p className="text-sm text-green-600 font-semibold mb-4">Best Value Forever</p>
              <button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
              >
                Get Lifetime
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Everything in Annual
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                VIP Support Channel
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Early Feature Access
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                No More Payments Ever
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join 2.5M+ Users Worldwide
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-blue-600">2.5M+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">485K+</p>
              <p className="text-gray-600">5-Star Reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">180+</p>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}