import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      
      const response = await fetch(`${API_BASE_URL}/url/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      
      
      if (response.ok) {
        setShortUrl(`${API_BASE_URL}/url/${data.shortUrl}`);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(`Failed to shorten URL: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetForm = () => {
    setUrl('');
    setShortUrl('');
    setError('');
    setCopied(false);
  };

  return (
    <section id="url-shortener" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Shortening
          </h2>
          <p className="text-lg text-gray-600">
            Paste your long URL below and get a shortened version instantly
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter your URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-url..."
                required
                className="w-full px-4 py-4 border border-gray-200 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Shortening...
                </div>
              ) : (
                'Shorten URL'
              )}
            </motion.button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  ✨ Your shortened URL
                </h3>
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Create another
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 p-3 bg-white border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-medium break-all">
                      {shortUrl}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
              
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-sm mt-2 flex items-center"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Copied to clipboard!
                </motion.p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UrlShortener;