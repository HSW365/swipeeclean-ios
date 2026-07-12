export default function RevenueDashboard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Million Dollar Dashboard</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Goal: Sept 1, 2025</p>
          <p className="text-lg font-bold text-green-600">$1,000,000</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current Revenue</span>
          <span>24.8% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000"
            style={{ width: '24.8%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span className="font-semibold">$247,890</span>
          <span>$1,000,000</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">4,958</p>
          <p className="text-sm text-gray-600">Subscribers</p>
          <p className="text-xs text-blue-500">Need: 16,701</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">$4.99</p>
          <p className="text-sm text-gray-600">ARPU</p>
          <p className="text-xs text-green-500">Monthly avg</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">12.3%</p>
          <p className="text-sm text-gray-600">Conversion</p>
          <p className="text-xs text-purple-500">Landing→Paid</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-600">203</p>
          <p className="text-sm text-gray-600">Days Left</p>
          <p className="text-xs text-orange-500">To goal</p>
        </div>
      </div>

      {/* Monthly Targets */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Monthly Targets to $1M</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="font-semibold text-gray-900">Feb 2025</p>
            <p className="text-blue-600">2,500 subs</p>
            <p className="text-gray-500">$12.5K ARR</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="font-semibold text-gray-900">Apr 2025</p>
            <p className="text-blue-600">7,500 subs</p>
            <p className="text-gray-500">$37.5K ARR</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <p className="font-semibold text-gray-900">Jun 2025</p>
            <p className="text-blue-600">12,500 subs</p>
            <p className="text-gray-500">$62.5K ARR</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded border-2 border-green-200">
            <p className="font-semibold text-green-900">Sep 2025</p>
            <p className="text-green-600 font-bold">16,701 subs</p>
            <p className="text-green-700 font-bold">$1M ARR</p>
          </div>
        </div>
      </div>
    </div>
  );
}