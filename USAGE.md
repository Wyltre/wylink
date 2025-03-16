# Wylink Kullanım Kılavuzu

Bu döküman, Wylink'i nasıl kullanacağınızı detaylı şekilde açıklar.

## Kurulum

Wylink'i iki şekilde kullanabilirsiniz:

### 1. Global Kurulum

```bash
npm install -g wylink
```

Bu komut, aracı global olarak kurar ve `wylink` komutunu her yerden kullanabilirsiniz.

### 2. NPX ile Çalıştırma

```bash
npx wylink [komut]
```

Bu yöntem, aracı kurmaya gerek kalmadan doğrudan çalıştırmanızı sağlar.

## Temel Komutlar

### Yardım Görüntüleme

```bash
wylink --help
```

Mevcut tüm komutları ve açıklamalarını görüntüler.

### Yeni Bir Wylink Portal Oluşturma

```bash
wylink create
```

Bu komut, interaktif bir kurulumcu başlatır ve size şunları sorar:

1. İsminiz ve soyisminiz
2. Unvanınız/mesleğiniz
3. Çıktı dizini
4. Profil resmi URL'niz

Varsayılan seçenekleri kabul etmek için boş bırakıp Enter'a basabilirsiniz.

### Link Ekleme

```bash
wylink add-link --dir ./my-wylink
```

Bu komut, wylink portal dizininize yeni bir bağlantı eklemek için kullanılır.

Size şunları sorar:
1. Bağlantı başlığı
2. Bağlantı URL'si
3. Bağlantı açıklaması
4. Kullanılacak ikon

## Oluşturulan Dosyalar

Wylink portal oluşturulduğunda, aşağıdaki dosyalar oluşturulur:

- `index.html`: Ana HTML dosyası
- `data.js`: Bağlantı verilerini içeren dosya
- `script.js`: JavaScript fonksiyonlarını içeren dosya

## Özelleştirme

Wylink portal oluşturulduktan sonra, manuel olarak dosyaları düzenleyerek daha fazla özelleştirme yapabilirsiniz:

### Renk Şeması Değiştirme

`index.html` dosyasında, Tailwind konfigürasyonunda şu alanı bulun:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-bg': '#0D1321',
                'secondary-bg': '#1D2D44',
                'card-bg': '#3E5C76',
                'highlight': '#748CAB',
                'text-color': '#F0EBD8',
            }
        }
    }
}
```

Bu renk kodlarını değiştirerek sitenizin renk şemasını özelleştirebilirsiniz.

### Sosyal Medya Bağlantıları

`index.html` dosyasında, aşağıdaki kısmı bulun:

```html
<div class="flex gap-4 mb-8 reveal">
    <a href="#" class="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-highlight hover:text-primary-bg">
        <i class="fab fa-twitter"></i>
    </a>
    <!-- Diğer sosyal medya bağlantıları -->
</div>
```

Bu kısmı düzenleyerek kendi sosyal medya bağlantılarınızı ekleyebilirsiniz.

## İpuçları

1. Bağlantılar için anlamlı ve kısa açıklamalar kullanın.
2. Yüksek kaliteli bir profil resmi kullanın (tercihen kare formatta).
3. Renk şemasını markanıza uygun olarak özelleştirin.
4. En önemli bağlantıları ilk sıralarda tutun.

## Sorun Giderme

### "Dizin bulunamadı" hatası

```
Error adding link: Could not find data.js in ./my-wylink. Make sure the directory is correct.
```

`--dir` parametresiyle doğru dizin yolunu belirttiğinizden emin olun. Yol göreceli veya mutlak olabilir.

### Bağlantı ekleme sorunu

Bağlantı eklerken bir sorun yaşarsanız, `data.js` dosyasının formatını manuel olarak kontrol edin ve gerekirse düzeltin.

## Lisans

Bu araç MIT lisansı altında dağıtılmaktadır. © 2025 Wyltre

Daha fazla bilgi için lisans dosyasını inceleyebilirsiniz. 