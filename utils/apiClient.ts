/**
 * Placeholder API Client
 * Gelecekte REST API testleri için kullan
 */
export class APIClient {
  private baseURL: string;
  public accessToken: string = '';
  public reference: string = '';

  constructor(baseURL: string = 'https://api.example.com') {
    this.baseURL = baseURL;
  }

  async get<T>(url: string): Promise<T> {
    throw new Error('Not implemented');
  }

  async post<T>(url: string, data?: any): Promise<T> {
    throw new Error('Not implemented');
  }

  setAuthToken(token: string) {
    this.accessToken = token;
  }

  clearAuthToken() {
    this.accessToken = '';
  }
}

export const apiClient = new APIClient();
