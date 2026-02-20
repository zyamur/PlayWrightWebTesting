import * as fs from 'fs';
import * as path from 'path';

//Ayarları Okur
export class ConfigManager {
  private config: Map<string, string>;

  constructor() {
    this.config = new Map();
    this.loadConfig();
  }

  private loadConfig() {
    const configPath = path.join('config', 'config.properties');
    if (!fs.existsSync(configPath)) {
      console.warn(`Config file not found at ${configPath}`);
      return;
    }
    const configContent = fs.readFileSync(configPath, 'utf-8');

    configContent.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, value] = trimmedLine.split('=');
        if (key && value) {
          this.config.set(key.trim(), value.trim());
        }
      }
    });
  }

  get(key: string): string {
    return this.config.get(key) || '';
  }

  getNumber(key: string): number {
    const value = this.get(key);
    return value ? parseInt(value, 10) : 0;
  }

  getBoolean(key: string): boolean {
    return this.get(key).toLowerCase() === 'true';
  }
}

export const configManager = new ConfigManager();
