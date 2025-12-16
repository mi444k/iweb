# Docker Compose для weboff-webapp + weboff-strapi

Ниже — минимальный сценарий для продакшен-сборки обоих сервисов одной командой.

## Подготовка окружения

1. **Файлы окружения**:
   - `weboff-webapp/.env` — актуальные значения `STRAPI_API_KEY`, SMTP и прочие переменные. В продакшене `STRAPI_API_URL` переопределяется через `docker-compose.yml` на `http://strapi:1337`.
   - `weboff-strapi/.env` — стандартный набор Strapi (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, переменные БД и т.п.).
2. **Структура директорий**: файл `docker-compose.yml` лежит в `weboff-webapp/` и ссылается на соседний каталог `../weboff-strapi`.

## Сборка и запуск

```bash
# из каталога weboff-webapp
docker compose up --build -d
```

- Сервис `webapp` билдится из `./Dockerfile`, стартует на порту 3000 и ходит к Strapi по `http://strapi:1337`.
- Сервис `strapi` билдится из `../weboff-strapi/Dockerfile`, публикуется на порту 1337.
- Том `strapi-uploads` сохраняет файлы загрузок, `strapi-tmp` — временные/SQLite данные.

## Дополнительно

- При необходимости вынести БД Strapi в отдельный сервис (PostgreSQL/MySQL), добавьте его в `docker-compose.yml` и обновите переменные подключения в `weboff-strapi/.env`.
- Для обновления образов после изменений кода выполните повторно `docker compose up --build`.
