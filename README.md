# Playwright Test Automation Project

Bu proje, Playwright kullanılarak geliştirilmiş bir Page Object Model (POM) test otomasyon framework'üdür. SauceDemo web sitesi üzerinde E2E testler içerir.

## 🚀 Özellikler

- ✅ **Page Object Model (POM)** - Temiz ve sürdürülebilir kod yapısı
- ✅ **Custom Fixtures** - Otomatik login ve setup
- ✅ **Test Data Management** - YAML formatında merkezi test verileri
- ✅ **Config Management** - Properties dosyası ile yapılandırma
- ✅ **TypeScript** - Tip güvenli kod
- ✅ **HTML Reports** - Detaylı test raporları

## 📁 Proje Yapısı

```
playwrightproject/
├── pages/                      # Page Object sınıfları
│   ├── BasePage.ts            # Temel sayfa sınıfı
│   ├── LoginPage.ts           # Login sayfası
│   ├── InventoryPage.ts       # Ürün listesi sayfası
│   ├── CartPage.ts            # Sepet sayfası
│   ├── CheckoutPage.ts        # Checkout sayfası
│   └── index.ts               # Barrel export
├── tests/                      # Test dosyaları
│   ├── baseTest.ts            # Custom fixtures ve setup
│   ├── add-to-cart.spec.ts    # Sepet testleri
│   ├── checkout.spec.ts       # Checkout testleri
│   ├── example.spec.ts        # Login testleri
│   └── login-failure.spec.ts  # Negative test
├── utils/                      # Yardımcı sınıflar
│   ├── configManager.ts       # Config okuyucu
│   ├── testDataManager.ts     # Test data yönetimi
│   ├── testState.ts           # Global state yönetimi
│   └── apiClient.ts           # API client (placeholder)
├── config/                     # Konfigürasyon dosyaları
│   └── config.properties      # Uygulama ayarları
├── testdata/                   # Test verileri
│   └── testData.yml           # Test data (YAML)
├── playwright.config.ts        # Playwright konfigürasyonu
├── tsconfig.json              # TypeScript konfigürasyonu
└── package.json               # NPM bağımlılıkları
```

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
```bash
git clone https://github.com/[kullanici-adi]/playwrightproject.git
cd playwrightproject
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Playwright browser'ları yükleyin:
```bash
npx playwright install
```

## 🎯 Testleri Çalıştırma

### Tüm testleri çalıştır
```bash
npm test
```

### Headed mode (tarayıcı görerek)
```bash
npx playwright test --headed
```

### Tek bir test dosyası
```bash
npx playwright test tests/add-to-cart.spec.ts
```

### Debug mode
```bash
npx playwright test --debug
```

### HTML raporu görüntüle
```bash
npx playwright show-report
```

## 📝 Test Senaryoları

1. **Login Tests** - Başarılı ve başarısız login senaryoları
2. **Add to Cart** - Ürün sepete ekleme ve doğrulama
3. **Checkout** - Sipariş tamamlama akışı

## 🏗️ Mimari

### Page Object Model
Her sayfa için ayrı bir class, tüm locator'lar ve metodlar ilgili page class'ında:

```typescript
export class LoginPage extends BasePage {
  readonly usernameField = '[data-test="username"]';
  readonly passwordField = '[data-test="password"]';
  
  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }
}
```

### Custom Fixtures
`authenticatedPage` fixture ile otomatik login:

```typescript
test('add item', async ({ authenticatedPage, inventoryPage }) => {
  // Zaten login yapılmış durumda ✅
  await inventoryPage.addToCart('sauce-labs-backpack');
});
```

### Test Data Management
YAML dosyasından merkezi test data okuma:

```yaml
standartUser: 'standard_user'
standartPassword: 'secret_sauce'
firstName: 'Test'
lastName: 'User'
```

## ⚙️ Konfigürasyon

### config.properties
```properties
baseUrl=https://www.saucedemo.com/
timeout=60000
browser=chromium
```

### playwright.config.ts
- Workers: 1 (seri çalıştırma)
- Timeout: 60 saniye
- Reporter: HTML

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Commit yapın (`git commit -m 'Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeniOzellik`)
5. Pull Request açın

## 📄 Lisans

MIT License

## 👤 Yazar

[Adınız]

## 🔗 Bağlantılar

- [Playwright Documentation](https://playwright.dev/)
- [SauceDemo Test Site](https://www.saucedemo.com/)
