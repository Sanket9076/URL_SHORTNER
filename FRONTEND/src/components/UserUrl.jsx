import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';
import { 
  Copy, BarChart2, Calendar, Tag, MoreHorizontal, 
  Share2, Edit2, CornerDownRight, ExternalLink 
} from 'lucide-react';

const getDomainName = (url) => {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    
    if (parts.length > 2) {
      parts.shift(); // remove subdomains like www
    }
    
    const domain = parts[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch (e) {
    return "Web Link";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Recently added";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently added";
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const UserUrl = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });
  
  const [copiedId, setCopiedId] = useState(null);
  
  const handleCopy = (url, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Share2 className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-xl font-bold text-gray-900 mb-2">No links yet</p>
        <p className="text-gray-500">Shorten your first URL to see it here.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-xl font-bold text-gray-800">Your Links</h2>
        <div className="flex gap-3">
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-md">
            {urls.urls.length} Active
          </span>
        </div>
      </div>

      {urls.urls.reverse().map((url) => {
        const fullShortUrl = `${API_URL}/${url.short_url}`;
        const displayShortUrl = fullShortUrl.replace(/^https?:\/\//, '');
        
        return (
          <div 
            key={url._id} 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow relative"
          >
            <div className="flex items-start justify-between">
              
              {/* Left Column (Main Info) */}
              <div className="flex gap-4 flex-1">
                
                {/* Checkbox Placeholder vs Icon */}
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold border border-red-100">
                    {getDomainName(url.full_url).charAt(0)}
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {getDomainName(url.full_url)}
                  </h3>
                  
                  {/* Short Link Row */}
                  <div className="flex items-center gap-3">
                    <a 
                      href={fullShortUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0052cc] font-medium hover:underline flex items-center gap-1"
                    >
                      {displayShortUrl}
                    </a>
                    
                    <button 
                      onClick={(e) => handleCopy(fullShortUrl, url._id, e)}
                      className={`p-1.5 rounded-md transition-colors flex items-center justify-center ${
                        copiedId === url._id 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                      title="Copy short link"
                    >
                      {copiedId === url._id ? (
                        <span className="text-xs font-bold px-1">Copied!</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Original Link Row */}
                  <div className="flex items-start gap-2 text-gray-500 text-sm mt-1">
                    <CornerDownRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a 
                      href={url.full_url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="truncate max-w-[300px] sm:max-w-md hover:text-gray-800 hover:underline"
                    >
                      {url.full_url}
                    </a>
                  </div>
                  
                  {/* Footer Row (Analytics & Metadata) */}
                  <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                      <BarChart2 className="w-4 h-4" />
                      <span>{url.clicks} <span className="font-normal text-gray-500">clicks</span></span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(url.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5">
                      <Tag className="w-3 h-3" />
                      <span>No tags</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Actions) */}
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserUrl;