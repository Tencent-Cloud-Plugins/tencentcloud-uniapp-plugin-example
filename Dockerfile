FROM nginx:latest

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
    
RUN mkdir -p RUN mkdir -p /usr/share/nginx/html

COPY ./unpackage/dist/build/h5/ /usr/share/nginx/html/

# port
EXPOSE 80
# volumes
# VOLUME ["/data/www/logs"]

WORKDIR /usr/share/nginx/html