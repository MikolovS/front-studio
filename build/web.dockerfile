FROM nginx:1.13

ADD dist /app

ADD build/.htpasswd /etc/nginx/
ADD build/vhost.conf /etc/nginx/conf.d/default.conf