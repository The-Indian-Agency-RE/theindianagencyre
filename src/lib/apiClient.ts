// Server-side API client for internal Next.js API calls
import propertyService from './propertyService';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export class ServerApiClient {
  
  // For server-side rendering, we can directly use the service
  static async getProperties(filters = {}) {
    try {
      return await propertyService.getProperties(filters);
    } catch (error) {
      console.error('Server API - Get Properties Error:', error);
      throw error;
    }
  }

  static async getPropertyById(id: string) {
    try {
      return await propertyService.getPropertyById(id);
    } catch (error) {
      console.error('Server API - Get Property By ID Error:', error);
      throw error;
    }
  }

  static async searchProperties(query: string) {
    try {
      return await propertyService.searchProperties(query);
    } catch (error) {
      console.error('Server API - Search Properties Error:', error);
      throw error;
    }
  }
}

// For client-side API calls
export class ClientApiClient {
  
  static async getProperties(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string);
      });

      const response = await fetch(`/api/properties?${queryParams.toString()}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    } catch (error) {
      console.error('Client API - Get Properties Error:', error);
      throw error;
    }
  }

  static async getPropertyById(id: string) {
    try {
      const response = await fetch(`/api/properties/${id}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    } catch (error) {
      console.error('Client API - Get Property By ID Error:', error);
      throw error;
    }
  }

  static async searchProperties(query: string) {
    try {
      const response = await fetch(`/api/properties/search?q=${encodeURIComponent(query)}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    } catch (error) {
      console.error('Client API - Search Properties Error:', error);
      throw error;
    }
  }

  static async addProperty(propertyData: any) {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    } catch (error) {
      console.error('Client API - Add Property Error:', error);
      throw error;
    }
  }

  static async updateProperty(id: string, propertyData: any) {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result.data;
    } catch (error) {
      console.error('Client API - Update Property Error:', error);
      throw error;
    }
  }

  static async deleteProperty(id: string) {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (error) {
      console.error('Client API - Delete Property Error:', error);
      throw error;
    }
  }
}

export default {
  server: ServerApiClient,
  client: ClientApiClient,
};
