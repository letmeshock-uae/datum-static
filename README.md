# Datum Website - Vercel Export

Это production build сайта Datum, готовый к деплою на Vercel или любой другой статический хостинг.

## Структура

- `index.html` - главная страница
- `_astro/` - скомпилированные JS и CSS файлы
- `images/` - все изображения сайта
- `fonts/` - шрифты
- `Hub_Light.glb`, `logo.gltf` - 3D модели
- Папки с политиками: `cookie-policy/`, `legal-disclaimer/`, `privacy-policy/`, `terms-and-conditions/`

## Деплой на Vercel

### Вариант 1: Через Vercel CLI
```bash
cd astro-datum_vercel-export
vercel --prod
```

### Вариант 2: Через Vercel Dashboard
1. Перейдите на https://vercel.com
2. Нажмите "Add New Project"
3. Выберите "Import Git Repository" или загрузите папку напрямую
4. Vercel автоматически определит настройки

### Вариант 3: Drag & Drop
1. Перейдите на https://vercel.com/new
2. Перетащите папку `astro-datum_vercel-export` в окно браузера

## Размер
Общий размер: ~16MB

## Технологии
- Astro (Static Site Generator)
- Three.js (3D graphics)
- GSAP (Animations)
- Tailwind CSS (Styling)
