import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

//YAML test verilerini okur
export interface TestData {
  standartUser?: string;
  standartPassword?: string;
  invalidUser?: string;
  invalidPassword?: string;
  testEmail?: string;
  accounts?: {
    personalAccountId?: string;
    corporateAccountId?: string;
    invalidAccountId?: string;
  };
  addresses?: {
    homeAddress?: string;
    workAddress?: string;
  };
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

export class TestDataManager {
  private testData: TestData;

  constructor() {
    this.testData = this.loadTestData();
  }

  private loadTestData(): TestData {
    const yamlPath = path.join('testdata', 'testData.yml');
    if (!fs.existsSync(yamlPath)) {
      console.warn(`Test data file not found at ${yamlPath}`);
      return {};
    }
    const fileContent = fs.readFileSync(yamlPath, 'utf-8');
    const data = yaml.load(fileContent) as TestData;
    return data || {};
  }

  getStandartUser(): string {
    return this.testData.standartUser || 'standard_user';
  }

  getStandartPassword(): string {
    return this.testData.standartPassword || 'secret_sauce';
  }

  getInvalidUser(): string {
    return this.testData.invalidUser || 'invalid_user';
  }

  getInvalidPassword(): string {
    return this.testData.invalidPassword || 'wrong_password';
  }

  getPersonalAccountId(): string {
    return this.testData.accounts?.personalAccountId || 'personal_123';
  }

  getCorporateAccountId(): string {
    return this.testData.accounts?.corporateAccountId || 'corporate_456';
  }

  getInvalidAccountId(): string {
    return this.testData.accounts?.invalidAccountId || 'invalid_789';
  }

  getHomeAddress(): string {
    return this.testData.addresses?.homeAddress || '123 Test Street';
  }

  getWorkAddress(): string {
    return this.testData.addresses?.workAddress || '456 Work Ave';
  }

  getFirstName(): string {
    return this.testData.firstName || 'Test';
  }

  getLastName(): string {
    return this.testData.lastName || 'User';
  }

  getPostalCode(): string {
    return this.testData.postalCode || '12345';
  }

  getAll(): TestData {
    return this.testData;
  }
}

export const testDataManager = new TestDataManager();
