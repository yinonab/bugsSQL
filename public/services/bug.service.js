import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BASE_URL = '/api/bug/'


export const bugService = {
  async query(filterBy = {}, sortBy = { type: 'severity', desc: 1 }) {
    // Make a GET request to the server API
    const queryParams = new URLSearchParams({
      ...filterBy,
      sortType: sortBy.type,
      sortDesc: sortBy.desc,
    });

    const response = await fetch(BASE_URL + `?${queryParams}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  },

  async getById(bugId) {
    const response = await fetch(BASE_URL + bugId);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },

  async remove(bugId) {
    console.log('bugfront:', bugId)
    const response = await fetch(BASE_URL + bugId, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },

  async save(bug) {
    if (bug._id) {
      const response = await fetch(BASE_URL + bug._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( bug ),
      });
      console.log('response:', response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    } else {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( bug ),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }
  },

  getEmptyBug(name = '', severity = '', description = '') {
    return {  name, severity, description, createdAt: Date.now() };
  },

  getDefaultFilter() {
    return { name: '', minSeverity: '', label: '', pageIdx: 0 };
  },
};