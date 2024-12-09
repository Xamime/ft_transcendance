FROM debian:bullseye

RUN apt update && apt upgrade -y

RUN apt install nginx -y && apt install openssl -y

RUN mkdir -p /etc/nginx/ssl 

RUN openssl req -x509 -nodes -out /etc/nginx/ssl/transcendance.crt -keyout /etc/nginx/ssl/transcendance.key -subj "/C=FR/ST=IDF/L=Paris/0=42/OU=42/CN=transcendance/UID=transcendance/"

RUN mkdir -p /var/run/nginx

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./index.html /var/www/html

RUN chmod 755 /var/www/html && chown -R www-data:www-data /var/www/html

EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]
