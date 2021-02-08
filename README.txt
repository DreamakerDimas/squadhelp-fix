Первый запуск:
bash start-dev.sh

Повторный запуск:
docker-compose --file docker-compose-dev.yaml up -d

В случае ошибки:
(у меня mongo server не имеет автозапуска при старте системы в отличие от postgres)

Ваш postgres server должен быть stopped (чтобы освободить порт)
- sudo systemctl stop postgresql

