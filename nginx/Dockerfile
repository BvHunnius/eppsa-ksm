FROM nginx:latest

ARG environment

RUN apt-get update && apt-get install -y git && apt-get install -y fcgiwrap

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d
COPY sites-available/${environment}/* /etc/nginx/sites-available/
COPY sites-available/*.conf /etc/nginx/sites-available/
COPY config /etc/nginx/config

RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/* /etc/nginx/sites-enabled/

CMD /etc/init.d/fcgiwrap start && nginx -g daemon\ off\;
