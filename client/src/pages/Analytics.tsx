import { useAuth } from '@/hooks/useAuth';

export default function Analytics() {
  const { user } = useAuth();

  const stats = {
    totalRevenue: '$247,890',
    monthlyGrowth: '+23.5%',
    activeSubscribers: '4,958',
    churnRate: '2.1%',
    avgRevenuePerUser: '$49.99',
    conversionRate: '12.3%'
  };

  const monthlyData = [
    { month: 'Jan', revenue: 45000, subscribers: 902 },
    { month: 'Feb', revenue: 78000, subscribers: 1564 },
    { month: 'Mar', revenue: 124000, subscribers: 2486 },
    { month: 'Apr', revenue: 187000, subscribers: 3748 },
    { month: 'May', revenue: 247890, subscribers: 4958 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
          <p className="text-gray-600">Track your path to $1M revenue by September 2025</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">{stats.totalRevenue}</p>
            <p className="text-xs text-green-500">{stats.monthlyGrowth}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Subscribers</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.activeSubscribers}</p>
            <p className="text-xs text-gray-500">Active paying</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">ARPU</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.avgRevenuePerUser}</p>
            <p className="text-xs text-gray-500">Avg per user</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.conversionRate}</p>
            <p className="text-xs text-gray-500">Landing to paid</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Churn Rate</h3>
            <p className="text-2xl font-bold text-red-600">{stats.churnRate}</p>
            <p className="text-xs text-gray-500">Monthly churn</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Goal Progress</h3>
            <p className="text-2xl font-bold text-indigo-600">24.8%</p>
            <p className="text-xs text-gray-500">To $1M target</p>
          </div>
        </div>

        {/* Revenue Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Growth Trajectory</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-md">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / 1000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${data.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{data.subscribers} subs</p>
                </div>
              </div>
            ))}
            {/* Goal Line */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-green-600">Sep Goal</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-md">
                  <div className="bg-green-600 h-3 rounded-full w-full"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">$1,000,000</p>
                <p className="text-sm text-gray-500">16,701 subs needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly ($4.99)</span>
                <div className="text-right">
                  <span className="font-semibold">3,247</span>
                  <span className="text-sm text-gray-500 ml-2">65.5%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual ($49.99)</span>
                <div className="text-right">
                  <span className="font-semibold">1,456</span>
                  <span className="text-sm text-gray-500 ml-2">29.4%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lifetime ($199)</span>
                <div className="text-right">
                  <span className="font-semibold">255</span>
                  <span className="text-sm text-gray-500 ml-2">5.1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Revenue</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🇺🇸 United States</span>
                <span className="font-semibold">$124,567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🇬🇧 United Kingdom</span>
                <span className="font-semibold">$34,892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🇨🇦 Canada</span>
                <span className="font-semibold">$28,156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🇩🇪 Germany</span>
                <span className="font-semibold">$19,843</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🌍 Other</span>
                <span className="font-semibold">$40,432</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Action Items to Reach $1M</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Immediate (Next 30 days)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Launch viral referral program</li>
                <li>• Increase annual plan conversion by 10%</li>
                <li>• Reduce churn rate to under 2%</li>
                <li>• Add $9.99 premium tier</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Growth (Next 90 days)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Scale to 10,000 subscribers</li>
                <li>• Launch enterprise B2B program</li>
                <li>• Expand to 5 new countries</li>
                <li>• Implement usage-based pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}