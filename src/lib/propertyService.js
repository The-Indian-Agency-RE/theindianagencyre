import propertiesData from '../data/properties.json';

class PropertyService {
  constructor() {
    // Ensure each property has a unique id
    this.properties = propertiesData.map((property, index) => ({
      ...property,
      id: property.id || `property_${index + 1}`,
      _id: property.id || `property_${index + 1}` // Keep _id for backward compatibility
    }));
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getProperties(filters = {}) {
    await this.delay(100); 
    
    let properties = [...this.properties];
    
    // Apply filters
    if (filters.type) {
      properties = properties.filter(p => p.type === filters.type);
    }
    
    if (filters.category) {
      properties = properties.filter(p => p.category === filters.category);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.location.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return properties;
  }

  // Get property by ID
  async getPropertyById(id) {
    await this.delay(100);
    const property = this.properties.find(p => p.id === id.toString());
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  }

  // Add new property (for admin)
  async addProperty(propertyData) {
    await this.delay(200);
    
    // Generate new ID
    const maxId = Math.max(...this.properties.map(p => parseInt(p.id)));
    const newProperty = {
      ...propertyData,
      id: (maxId + 1).toString(),
      gallery: propertyData.gallery || [],
      amenities: propertyData.amenities || [],
      coordinates: propertyData.coordinates || { lat: 17.385044, lng: 78.486671 }
    };
    
    // In a real app, this would persist to backend
    // For now, we'll just add to memory (won't persist on refresh)
    this.properties.push(newProperty);
    
    return newProperty;
  }

  // Update property (for admin)
  async updateProperty(id, propertyData) {
    await this.delay(200);
    
    const index = this.properties.findIndex(p => p.id === id.toString());
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    this.properties[index] = { ...this.properties[index], ...propertyData };
    return this.properties[index];
  }

  // Delete property (for admin)
  async deleteProperty(id) {
    await this.delay(200);
    
    const index = this.properties.findIndex(p => p.id === id.toString());
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    this.properties.splice(index, 1);
    return { success: true };
  }

  // Search properties (for AI search)
  async searchProperties(query) {
    await this.delay(300);
    
    const searchTerm = query.toLowerCase();
    const properties = this.properties.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.location.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
    );
    
    // Sort by relevance (simple scoring)
    return properties.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, searchTerm);
      const bScore = this.calculateRelevanceScore(b, searchTerm);
      return bScore - aScore;
    });
  }

  // Helper method to calculate relevance score
  calculateRelevanceScore(property, searchTerm) {
    let score = 0;
    
    if (property.title.toLowerCase().includes(searchTerm)) score += 10;
    if (property.location.toLowerCase().includes(searchTerm)) score += 8;
    if (property.description.toLowerCase().includes(searchTerm)) score += 5;
    
    property.amenities.forEach(amenity => {
      if (amenity.toLowerCase().includes(searchTerm)) score += 3;
    });
    
    return score;
  }
}

const propertyService = new PropertyService();
export default propertyService;
