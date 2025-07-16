import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Globe, Clock, TrendingUp, Eye } from 'lucide-react';

const Analytics = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleAnalyticsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const shortId = shortUrl.includes('/') ? shortUrl.split('/').pop() : shortUrl;

      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Short ID:', shortId);
      console.log('Full URL:', `${API_BASE_URL}/url/analytics/${shortId}`);
      
      const response = await fetch(`${API_BASE_URL}/url/analytics/${shortId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setAnalyticsData(data);
      } else {
        setError(data.message || 'Analytics not found');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to fetch analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="analytics" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            URL Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get detailed insights into your shortened URLs performance and engagement
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12"
        >
          <form onSubmit={handleAnalyticsSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                placeholder="Enter short URL or ID (e.g., abc12345)"
                required
                className="flex-1 px-4 py-4 border border-gray-200 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  'Get Analytics'
                )}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
        </motion.div>

        {analyticsData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analyticsData.totalClicks}
                </div>
                <div className="text-gray-600 text-sm">Total Clicks</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analyticsData.totalClicks}
                </div>
                <div className="text-gray-600 text-sm">Unique Visitors</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Object.keys(analyticsData.clicksByDay || {}).length}
                </div>
                <div className="text-gray-600 text-sm">Active Days</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {analyticsData.recentClicks?.length}
                </div>
                <div className="text-gray-600 text-sm">Recent Clicks</div>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">URL Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Short URL</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <code className="text-blue-600">{`${API_BASE_URL}/${analyticsData.shortUrl}`}</code>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Original URL</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg break-all">
                    <a href={analyticsData.originalUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      {analyticsData.originalUrl}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">
                      {analyticsData.createdAt ? formatDate(analyticsData.createdAt) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!analyticsData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                View Your URL Analytics
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter a short URL or ID above to see detailed analytics including click counts, 
                geographic data, and engagement metrics.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Analytics;