import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
  isWifiEnabled?: boolean;
}

// Network Status Hook
export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
    isWifiEnabled: false,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? false,
        type: state.type,
        isWifiEnabled: state.isWifiEnabled ?? false,
      });
    });

    return () => unsubscribe();
  }, []);

  return networkState;
};

// Offline Queue for failed requests
class OfflineQueue {
  private queue: Array<{
    id: string;
    method: string;
    endpoint: string;
    data?: any;
    timestamp: number;
  }> = [];

  addToQueue(method: string, endpoint: string, data?: any) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.queue.push({
      id,
      method,
      endpoint,
      data,
      timestamp: Date.now(),
    });
    return id;
  }

  removeFromQueue(id: string) {
    this.queue = this.queue.filter(item => item.id !== id);
  }

  getQueue() {
    return [...this.queue];
  }

  clearQueue() {
    this.queue = [];
  }

  async processQueue(apiService: any) {
    const currentQueue = [...this.queue];
    this.clearQueue();

    for (const item of currentQueue) {
      try {
        switch (item.method.toLowerCase()) {
          case 'get':
            await apiService.get(item.endpoint);
            break;
          case 'post':
            await apiService.post(item.endpoint, item.data);
            break;
          case 'put':
            await apiService.put(item.endpoint, item.data);
            break;
          case 'delete':
            await apiService.delete(item.endpoint);
            break;
        }
        console.log(`✅ Offline request processed: ${item.method} ${item.endpoint}`);
      } catch (error) {
        console.error(`❌ Failed to process offline request: ${item.method} ${item.endpoint}`, error);
        // Re-add to queue if it fails again
        this.queue.push(item);
      }
    }
  }
}

export const offlineQueue = new OfflineQueue();

// Retry utility for failed requests
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff: delay = baseDelay * 2^(attempt-1)
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`⏳ Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

// Request cache for GET requests
class RequestCache {
  private cache = new Map<string, {
    data: any;
    timestamp: number;
    expiresIn: number;
  }>();

  set(key: string, data: any, expiresIn: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiresIn) {
        this.cache.delete(key);
      }
    }
  }
}

export const requestCache = new RequestCache();

// Auto cleanup cache every 10 minutes
setInterval(() => {
  requestCache.cleanup();
}, 10 * 60 * 1000);
