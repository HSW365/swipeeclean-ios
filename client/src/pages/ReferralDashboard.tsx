import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ReferralDashboard() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const referralCode = user?.id ? `SWIPE${(user.id as string).slice(0, 6).toUpperCase()}` : 'SWIPEXX';
  const referralLink = `https://swipeeclean.com?ref=${referralCode}`;
  
  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Earn $10 Per Referral
          </h1>
          <p className="text-gray-600">
            Share SwipeClean and earn money for every person who subscribes
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-1">$0</h3>
            <p className="text-gray-600">Total Earnings</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-1">0</h3>
            <p className="text-gray-600">Successful Referrals</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600 mb-1">0</h3>
            <p className="text-gray-600">Pending Referrals</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Referral Link</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
            <button
              onClick={copyReferralLink}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Share this link and earn $10 for every person who signs up and subscribes to SwipeClean
          </p>
        </div>

        {/* Social Sharing */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Share on Social Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Just found SwipeClean - the best storage cleaning app! Get 50% off with my link: ${referralLink}`, '_blank')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Twitter
            </button>
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`, '_blank')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Facebook
            </button>
            <button 
              onClick={() => window.open(`https://wa.me/?text=Check out SwipeClean - amazing storage cleaning app! Get 50% off: ${referralLink}`, '_blank')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              WhatsApp
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`, '_blank')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
            >
              LinkedIn
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Referrers This Month</h2>
          <div className="space-y-4">
            {[
              { name: 'Alex M.', earnings: '$2,340', referrals: 234 },
              { name: 'Sarah K.', earnings: '$1,890', referrals: 189 },
              { name: 'Mike R.', earnings: '$1,560', referrals: 156 },
              { name: 'Lisa T.', earnings: '$1,230', referrals: 123 },
              { name: 'You', earnings: '$0', referrals: 0 }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-400' : 
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.referrals} referrals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{user.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Info */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 mt-8">
          <h3 className="font-bold text-gray-900 mb-2">💰 How Payouts Work</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Earn $10 for each successful referral</li>
            <li>• Payments processed monthly via PayPal or bank transfer</li>
            <li>• Minimum payout threshold: $50</li>
            <li>• Referral must remain subscribed for 30 days to qualify</li>
          </ul>
        </div>
      </div>
    </div>
  );
}