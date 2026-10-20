# LearnLingo — project specification / технічне завдання

This document summarises the supplied LearnLingo assignment. Source: the document
«ТЗ LearnLingo (пет-проєкт)» and the general requirements for Project №1.

Цей документ містить стислий виклад наданого завдання LearnLingo. Джерела:
документ «ТЗ LearnLingo (пет-проєкт)» і загальні критерії виконання проєкту №1.

<a id="english"></a>

## English

Build an application for a company offering online language lessons.

### Pages

- **Home:** company benefits, statistics, and a call to action leading to Teachers.
- **Teachers:** teacher profiles, filters, and progressive loading.
- **Favorites:** a private page listing teachers saved by the current user, styled
  consistently with Teachers.

### Required functionality

1. Firebase authentication: registration, login, current-user data, and logout.
2. Registration and login forms built with React Hook Form and Yup; all fields required.
3. A Realtime Database teacher collection with `name`, `surname`, `languages`,
   `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`,
   `lesson_info`, `conditions`, and `experience`.
4. Teacher cards styled according to the supplied Figma design.
5. Four cards initially; each Load more performs a database query for another batch.
6. Guest heart clicks display an authentication notice or modal. Authenticated
   users can save and remove teachers; the heart reflects the saved state.
7. Favorites persist after a page reload. The assignment permits localStorage or
   Firebase; this implementation uses Firebase.
8. Read more reveals teaching experience and student reviews.
9. Book trial lesson opens a form built with React Hook Form and Yup, with all
   fields required.
10. Modals close using the cross button, backdrop click, or Escape.

### Optional tasks included

- Routing with React Router.
- Combined filtering by language, student level, and hourly rate.

### General criteria

React or Next.js with TypeScript; responsive semantic markup; no browser console
errors; formatted code; a README describing the application, technologies, design,
and specification; deployment to a third-party host.

The original design supplies desktop screens and several color palettes.
Mobile and tablet compositions are adaptations. Teacher registration and real-time
teacher presence are not required by the assignment.

<a id="ukrainian"></a>

## Українська

Створити застосунок для компанії, що пропонує послуги викладачів іноземних мов онлайн.

### Сторінки

- **Home:** переваги компанії, статистика та заклик перейти на Teachers.
- **Teachers:** картки викладачів, фільтрація та поступове завантаження.
- **Favorites:** приватна сторінка зі збереженими викладачами поточного користувача,
  стилістично аналогічна Teachers.

### Обов'язкова функціональність

1. Авторизація через Firebase: реєстрація, вхід, дані поточного користувача та вихід.
2. Форми реєстрації й входу через React Hook Form і Yup; усі поля обов'язкові.
3. Колекція викладачів у Realtime Database з полями `name`, `surname`, `languages`,
   `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`,
   `lesson_info`, `conditions`, `experience`.
4. Картки викладачів відповідно до макета Figma.
5. Спочатку чотири картки; кожен клік Load more виконує запит до бази за новою порцією.
6. Гостю після кліку на сердечко показується повідомлення або модалка авторизації.
   Авторизований користувач додає й видаляє викладачів з обраного; стан сердечка змінюється.
7. Обране зберігається після оновлення сторінки. ТЗ дозволяє localStorage або Firebase;
   у цьому проєкті використано Firebase.
8. Read more розкриває досвід викладача та відгуки учнів.
9. Book trial lesson відкриває форму через React Hook Form і Yup; усі поля обов'язкові.
10. Модалки закриваються хрестиком, кліком на фон або клавішею Escape.

### Реалізовані завдання із зірочкою

- Маршрутизація через React Router.
- Комбінована фільтрація за мовою, рівнем учнів і ціною за годину.

### Загальні критерії

React або Next.js із TypeScript; адаптивна семантична верстка; відсутність помилок
у консолі; відформатований код; README з описом проєкту, технологій, макета й ТЗ;
деплой на сторонньому хостингу.

Початковий макет містить десктопні екрани та декілька кольорових схем.
Мобільна й планшетна композиції є адаптаціями. Реєстрація викладачів і відстеження
їхнього онлайн-статусу не передбачені завданням.

## Source materials / Джерела

- [Original assignment design / Початковий макет](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc)
- [Teacher dataset / Дані викладачів](https://drive.google.com/file/d/121ufnYEerBdPopSSVw0W7iUJWT-4Zcfu/view)

[Back to README / До README](../README.md)
