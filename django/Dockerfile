FROM debian:bullseye

RUN apt update && apt upgrade -y

RUN apt install -y python3-pip postgresql libpq-dev postgresql-client 

RUN pip install django django-environ psycopg2 gunicorn

WORKDIR /backend/

RUN mkdir -p /backend/static

RUN chmod 755 /backend/static

EXPOSE 8000

CMD ["./server_connexion.sh"]
