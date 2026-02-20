/**
 * Global Test State Management
 * Java BaseTest'teki static properties'leri yönetir
 */
export class TestState {
  // Login flags
  static loggedIn: boolean = false;
  static loginRequired: boolean = true;

  // Account IDs
  static personalAccountId: string = '';
  static corporateAccountId: string = '';
  static invalidAccountId: string = '';

  // Address info
  static accountAddress: string = '';

  // API tokens
  static accessToken: string = '';
  static reference: string = '';

  // Test control flags
  static testFailedSkip: boolean = false;

  /**
   * Reset tüm state'i sıfırla
   */
  static reset() {
    this.loggedIn = false;
    this.loginRequired = true;
    this.personalAccountId = '';
    this.corporateAccountId = '';
    this.invalidAccountId = '';
    this.accountAddress = '';
    this.accessToken = '';
    this.reference = '';
    this.testFailedSkip = false;
  }

  /**
   * Test başarısız oldu, diğer testleri atla
   */
  static skipRemainingTests() {
    this.testFailedSkip = true;
  }

  /**
   * Bir test başarılı olduğunda state'i kısmi güncelle
   */
  static setLoginSuccess(accountId: string, token?: string) {
    this.loggedIn = true;
    this.personalAccountId = accountId;
    if (token) {
      this.accessToken = token;
    }
  }

  /**
   * Logout state'i
   */
  static setLogout() {
    this.loggedIn = false;
    this.accessToken = '';
    this.personalAccountId = '';
  }
}
