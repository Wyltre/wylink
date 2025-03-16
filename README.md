# Modern Link Portal with Tailwind CSS

Bu proje, kullanıcıların sosyal medya, portföy veya diğer bağlantılarını şık bir şekilde sunacak, modern ve animasyonlarla zenginleştirilmiş bir dijital bağlantı portalı (linktree tarzı) sunar. Tailwind CSS CDN ile oluşturulmuştur.

## Özellikler

- Şık glassmorphism tasarım
- Dinamik link yükleme
- Scroll reveal animasyonları
- Parçacık animasyonlu arka plan
- Responsive tasarım (mobil uyumlu)
- Hover animasyonları
- Font Awesome ikonlar
- Tailwind CSS ile oluşturulmuş utility-first tasarım

## Renk Paleti

Varsayılan renk paleti:

- **#0D1321**: Ana arka plan
- **#1D2D44**: İkincil arka plan/arka plan detayları
- **#3E5C76**: Buton ve kart zeminleri
- **#748CAB**: Hover efektleri, vurgular ve geçiş detayları
- **#F0EBD8**: Metin, ikon ve kontrast ögeler

## Kullanılan Teknolojiler

- HTML5
- Tailwind CSS (CDN üzerinden)
- JavaScript (ES6+)
- [Particles.js](https://vincentgarreau.com/particles.js/) (Arka plan animasyonu)
- [Font Awesome](https://fontawesome.com/) (İkonlar)

## Başlangıç

Projeyi çalıştırmak için:

1. Repoyu klonlayın veya dosyaları indirin
2. `index.html` dosyasını bir tarayıcıda açın

## Özelleştirme

Projeyi kendi ihtiyaçlarınıza göre özelleştirmek için:

1. `data.js` dosyasındaki linkleri kendi bağlantılarınızla değiştirin
2. `index.html` dosyasındaki profil bilgilerini güncelleyin
3. Tailwind CSS renk paletini `index.html` içindeki script etiketinde değiştirebilirsiniz
4. Particles.js ayarlarını `script.js` içinde değiştirebilirsiniz

## Avantajlar

- Herhangi bir npm, Node.js veya derleme aracı gerektirmez
- CDN üzerinden Tailwind CSS kullanılır, böylece ek kurulum gerekmez
- Tüm stil ve etkileşimler tarayıcıda doğrudan çalışır
- Kolayca özelleştirilebilir ve paylaşılabilir

## Lisans

MIT © 2025 Wyltre

## İletişim

[Buraya iletişim bilgilerinizi ekleyin]

# Wylink

Modern, özelleştirilebilir link portal (Linktree tarzı) oluşturmak için komut satırı aracı.

![Wylink Preview](https://repository-images.githubusercontent.com/wyltre/wylink/image.png)

## Özellikler

- Terminal üzerinden kolay kurulum
- Komut satırı aracılığıyla kişiselleştirme
- Dinamik link ekleme
- Modern, duyarlı (responsive) tasarım
- Glassmorphism efektleri
- Animasyonlar
- Özelleştirilmiş kaydırma çubuğu
- Particles.js arka plan animasyonu

## Kurulum

Wylink'i npm üzerinden evrensel olarak kurabilirsiniz:

```bash
npm install -g wylink
```

Veya npm kurulumu olmadan npx ile doğrudan çalıştırabilirsiniz:

```bash
npx wylink [komut]
```

## Kullanım

### Yeni Bir Wylink Portal Oluşturma

```bash
npx wylink create
```

Bu komut, size birkaç soru soracak:
- İsim ve soyisim
- Unvan/meslek
- Çıktı dizini
- Profil resmi URL'si

### Link Ekleme

```bash
npx wylink add-link --dir ./my-wylink
```

Bu komut, eklemek istediğiniz bağlantı hakkında size sorular soracak:
- Bağlantı başlığı
- URL
- Açıklama
- İkon

### Özelleştirme

Wylink portal oluşturulduktan sonra, çıktı dizinindeki dosyaları manuel olarak düzenleyebilirsiniz:
- `index.html`: Ana sayfa yapısı ve stiller
- `data.js`: Bağlantı verileri
- `script.js`: JavaScript fonksiyonları

## Site Yükleme

Oluşturulan dosyalar tamamen statiktir ve herhangi bir web sunucusuna yüklenebilir. Önerilen yükleme seçenekleri:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Herhangi bir statik web hosting hizmeti

## Örnekler

### Temel Kullanım

```bash
# Kurulum
npm install -g wylink

# Yeni bir wylink portal oluşturun
wylink create

# Bağlantı ekleyin
wylink add-link --dir ./my-wylink
```

### NPX ile Kullanım

```bash
# Doğrudan npx ile çalıştırma
npx wylink create

# Bağlantı ekleme
npx wylink add-link --dir ./my-wylink
```

## Teknik Detaylar

Wylink portallar şu özelliklere sahiptir:

- Tailwind CSS (CDN üzerinden)
- JavaScript (ES6+)
- Font Awesome ikonlar
- Particles.js arka plan animasyonu
- Özelleştirilmiş kaydırma çubuğu

## Lisans

MIT 