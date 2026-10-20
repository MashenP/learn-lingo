<div align="center">

# 🌍 LearnLingo

**Find your teacher. Start your language journey.**

[Live demo](https://learn-lingo-plum-one.vercel.app/) · [English](#english) · [Українська](#ukrainian) · [Design](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/) · [Specification](docs/project-specification.md)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white)

![LearnLingo — find your language teacher](public/images/og-cover.png)

</div>

<a id="english"></a>

## 📖 About the project

LearnLingo is a web application for finding online language teachers. Browse
teacher profiles, compare languages, student levels, and hourly rates, read
reviews, save your favorites, and request a trial lesson.

Built with **React and TypeScript**, the application uses **Firebase** for
accounts, teacher data, favorites, and trial lesson requests.

**Live demo:** [Explore LearnLingo](https://learn-lingo-plum-one.vercel.app/)

## ✨ Features

- **Teacher directory** with four cards per page and new database queries on **Load more**.
- **Combined filters** by language, student level, and hourly rate, with selections saved in the URL.
- **Expanded profiles** with teaching experience and student reviews.
- **Firebase Authentication** for registration, login, logout, and persistent sessions.
- **Private Favorites page** with saved teachers linked to each user's account.
- **Trial lesson requests** with required-field validation and submission feedback.
- **Five color schemes** that update illustrations, buttons, highlights, and accents.
- **Mobile-first layout** for phones, tablets, and desktops, with a mobile navigation menu.
- **Keyboard-accessible modals** with Escape, backdrop, and close-button support.
- Loading, empty, error, and **404** states.

## 🛠 Tech stack

| Area             | Technologies                                 |
| ---------------- | -------------------------------------------- |
| Interface        | React, TypeScript                            |
| Development      | Vite, ESLint, Prettier                       |
| Routing          | React Router                                 |
| Authentication   | Firebase Authentication                      |
| Database         | Firebase Realtime Database                   |
| Forms            | React Hook Form, Yup                         |
| Styling          | CSS Modules, CSS variables, modern-normalize |
| Notifications    | react-hot-toast                              |
| Images and icons | Optimized 1×/2× WebP images, SVG sprite      |

## 🚀 Getting started

**Requirements:** Node.js **22.18+** and npm.

### 1. Clone and install

```bash
git clone https://github.com/MashenP/learn-lingo.git
cd learn-lingo
npm ci
```

### 2. Configure Firebase

Create a Firebase project and register a web application. Enable **Email/Password**
in Authentication and create a **Realtime Database**.

Copy the environment template:

```bash
cp .env.example .env
```

Fill in the five values from your Firebase project:

```dotenv
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_DATABASE_URL=https://your-database-url
VITE_FIREBASE_APP_ID=your-app-id
```

Import [`firebase/teachers.json`](firebase/teachers.json) into the **root of a new,
empty database**. The file already contains the `teachers` node. Publish the rules
from [`firebase/database.rules.json`](firebase/database.rules.json).

In Authentication settings, add `localhost` to the authorized domains if it is
missing. Add the live website domain after deployment.

### 3. Start the application

```bash
npm run dev
```

Open the address printed in the terminal, normally `http://localhost:5173`.
Restart the development server after changing `.env`.

## 🧭 Usage

1. Open **Teachers** and choose a language, student level, or hourly rate. Combine
   filters or use **Reset filters** to clear them.
2. Click **Load more** to fetch the next four matching teachers.
3. Register or log in, then click a heart to save a teacher to **Favorites**.
4. Click **Read more** to see experience and reviews, then **Book trial lesson**
   to open the request form.
5. Choose a learning reason, enter your contact details, and submit the request.

Trial lesson requests are stored in Firebase. Submission does not send an email
or reserve a calendar slot.

## 📂 Project structure

```text
firebase/                Teacher dataset and database rules
docs/                    Project specification
public/                  SVG sprite, favicon, images, and social preview
src/
├── components/          Navigation, cards, filters, modals, and forms
├── context/             Shared session and favorites state
├── data/                Color schemes and filter options
├── firebase/            Authentication and database operations
├── hooks/               URL filter state
├── pages/               Home, Teachers, Favorites, and Not Found
├── types/               Shared TypeScript types
├── utils/               Pagination and error handling
├── index.css            Global styles and color variables
└── main.tsx             Application entry point
```

## ⚙️ Commands

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the development server                   |
| `npm run build`        | Check TypeScript and create a production build |
| `npm run preview`      | Preview the production build locally           |
| `npm run lint`         | Check the code with ESLint                     |
| `npm run format`       | Format the project with Prettier               |
| `npm run format:check` | Check formatting                               |

## 🎨 Design and requirements

- [LearnLingo design in Figma](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc)
- [Project specification](docs/project-specification.md#english)
- [Assignment teacher dataset](https://drive.google.com/file/d/121ufnYEerBdPopSSVw0W7iUJWT-4Zcfu/view)

The desktop layout follows the supplied design. Mobile and tablet layouts use a
mobile-first approach: fluid from **320px**, with adjustments at **375px**,
**768px**, and **1440px**. The selected color scheme persists between visits.

## ☁️ Deployment

The project is prepared for Vercel: build command **`npm run build`**, output
folder **`dist`**. Add the five environment variables before building. SPA route
rewrites are configured in [`vercel.json`](vercel.json).

**Hosted on Vercel:** [LearnLingo](https://learn-lingo-plum-one.vercel.app/)

## 👩‍💻 Author

**Mariia Pohasieieva** · [GitHub](https://github.com/MashenP) · [Email](mailto:mashenp@yahoo.com)

---

<a id="ukrainian"></a>

## 📖 Про проєкт

LearnLingo — вебзастосунок для пошуку викладачів іноземних мов онлайн.
Переглядайте профілі, порівнюйте мови викладання, рівні учнів і вартість занять,
читайте відгуки, зберігайте обраних викладачів та надсилайте заявки на пробний урок.

Застосунок створений на **React і TypeScript**. **Firebase** використовується для
авторизації, даних викладачів, обраного та заявок на заняття.

**Жива сторінка:** [Відкрити LearnLingo](https://learn-lingo-plum-one.vercel.app/)

## ✨ Основні можливості

- **Каталог викладачів:** по чотири картки та новий запит до бази після натискання **Load more**.
- **Комбіновані фільтри** за мовою, рівнем знань учнів і ціною за годину зі збереженням вибору в URL.
- **Розгорнуті профілі** з досвідом викладання та відгуками учнів.
- **Firebase Authentication:** реєстрація, вхід, вихід і збереження сесії.
- **Приватна сторінка Favorites:** обрані викладачі зберігаються окремо для кожного акаунта.
- **Заявки на пробний урок** із валідацією обов'язкових полів і повідомленнями про результат.
- **П'ять кольорових схем** для ілюстрацій, кнопок, виділеного тексту та акцентів.
- **Mobile-first верстка** для мобільних, планшетних і десктопних екранів та мобільне меню.
- **Модальні вікна** з підтримкою клавіатури, закриттям через Esc, хрестик і клік на фон.
- Стани завантаження, порожніх результатів, помилок та сторінка **404**.

## 🛠 Технології

| Призначення          | Технології                                |
| -------------------- | ----------------------------------------- |
| Інтерфейс            | React, TypeScript                         |
| Розробка             | Vite, ESLint, Prettier                    |
| Маршрутизація        | React Router                              |
| Авторизація          | Firebase Authentication                   |
| База даних           | Firebase Realtime Database                |
| Форми                | React Hook Form, Yup                      |
| Стилізація           | CSS Modules, CSS-змінні, modern-normalize |
| Сповіщення           | react-hot-toast                           |
| Зображення та іконки | Оптимізовані WebP у 1×/2×, SVG-спрайт     |

## 🚀 Встановлення та запуск

**Необхідні:** Node.js **22.18+** і npm.

### 1. Клонуйте репозиторій і встановіть залежності

```bash
git clone https://github.com/MashenP/learn-lingo.git
cd learn-lingo
npm ci
```

### 2. Налаштуйте Firebase

Створіть Firebase-проєкт і зареєструйте вебзастосунок. Увімкніть
**Email/Password** в Authentication та створіть **Realtime Database**.

Скопіюйте шаблон змінних середовища:

```bash
cp .env.example .env
```

Заповніть п'ять значень зі свого Firebase-проєкту:

```dotenv
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_DATABASE_URL=https://your-database-url
VITE_FIREBASE_APP_ID=your-app-id
```

Імпортуйте [`firebase/teachers.json`](firebase/teachers.json) у **корінь нової
порожньої бази**. Файл уже містить вузол `teachers`. Опублікуйте правила з
[`firebase/database.rules.json`](firebase/database.rules.json).

У налаштуваннях Authentication додайте `localhost` до дозволених доменів, якщо
його немає. Після деплою також додайте домен опублікованого сайту.

### 3. Запустіть застосунок

```bash
npm run dev
```

Відкрийте адресу з термінала, зазвичай `http://localhost:5173`.
Після зміни `.env` перезапустіть сервер розробки.

## 🧭 Використання

1. Перейдіть на **Teachers**, виберіть мову, рівень учнів або ціну. Фільтри можна
   поєднувати, а кнопка **Reset filters** скидає вибір.
2. Натисніть **Load more**, щоб завантажити наступних чотирьох викладачів.
3. Зареєструйтеся або увійдіть, потім натисніть сердечко, щоб додати викладача
   до **Favorites**.
4. Через **Read more** перегляньте досвід і відгуки. Натисніть **Book trial lesson**,
   щоб відкрити форму заявки.
5. Оберіть мету навчання, заповніть контактні дані та надішліть заявку.

Заявки зберігаються у Firebase. Надсилання форми не відправляє листа на пошту
та не резервує час у календарі.

## 📂 Структура проєкту

```text
firebase/                Дані викладачів і правила бази
docs/                    Технічне завдання
public/                  SVG-спрайт, favicon, зображення та соціальне прев'ю
src/
├── components/          Навігація, картки, фільтри, модалки та форми
├── context/             Спільний стан авторизації та обраного
├── data/                Кольорові схеми й параметри фільтрів
├── firebase/            Авторизація та операції з базою даних
├── hooks/               Стан фільтрів у URL
├── pages/               Головна, Teachers, Favorites і Not Found
├── types/               Спільні типи TypeScript
├── utils/               Пагінація та обробка помилок
├── index.css            Глобальні стилі й кольорові змінні
└── main.tsx             Точка входу застосунку
```

## ⚙️ Команди

| Команда                | Призначення                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Запустити сервер розробки                          |
| `npm run build`        | Перевірити TypeScript і створити production-збірку |
| `npm run preview`      | Переглянути production-збірку локально             |
| `npm run lint`         | Перевірити код через ESLint                        |
| `npm run format`       | Відформатувати проєкт через Prettier               |
| `npm run format:check` | Перевірити форматування                            |

## 🎨 Макет і вимоги

- [Макет LearnLingo у Figma](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc)
- [Технічне завдання](docs/project-specification.md#ukrainian)
- [Дані викладачів із завдання](https://drive.google.com/file/d/121ufnYEerBdPopSSVw0W7iUJWT-4Zcfu/view)

Десктопна версія побудована за наданим макетом. Для мобільних і планшетів
використано mobile-first підхід: гумова верстка від **320px**, зміни на **375px**,
**768px** і **1440px**. Обрана кольорова схема зберігається між відвідуваннями.

## ☁️ Деплой

Проєкт підготовлений для Vercel: команда збірки **`npm run build`**, папка
результату — **`dist`**. Перед збіркою додайте п'ять змінних середовища.
Перенаправлення для SPA-маршрутів задані у [`vercel.json`](vercel.json).

**Опубліковано на Vercel:** [LearnLingo](https://learn-lingo-plum-one.vercel.app/)

## 👩‍💻 Авторка

**Марія Погасєєва** · [GitHub](https://github.com/MashenP) · [Пошта](mailto:mashenp@yahoo.com)
