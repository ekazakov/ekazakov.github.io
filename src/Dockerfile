FROM ruby:2.1

EXPOSE 4001

# COPY . /home/src
RUN mkdir /home/src
WORKDIR /home/src
RUN bundler install

ENTRYPOINT ["bundler", "exec", "jekyll", "serve", "--watch", "--force_polling"]