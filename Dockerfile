FROM ruby:2.1

EXPOSE 4001

RUN mkdir /blog
RUN mkdir /blog/src
COPY Gemfile /blog
COPY Gemfile.lock /blog
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install --yes nodejs build-essential supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN npm install -g browser-sync

WORKDIR /blog
RUN bundler install

CMD ["/usr/bin/supervisord"]
#ENTRYPOINT ["bundler", "exec", "jekyll", "serve", "--watch", "--force_polling"]