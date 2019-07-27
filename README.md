# Khatm API

## Environment
- Node 10.15.3, Npm 6.4.1 (Used to match AWS Elastic Beanstalk max version as of 5/19/2019)

### Installation Instructions
- Node and Npm [source](https://medium.com/@katopz/how-to-install-specific-nodejs-version-c6e1cec8aa11)
  - `brew install node@10`
  - `brew link node@10`
  - Follow brew instruction, like having to `--force` and `--overwrite`

## Description

- Use [Hapi Pal](https://hapipal.com/) to bootstrap some boilerplate libraries and architecture.
- Follow the [Server/Plugin Seperation](https://hapipal.com/best-practices/server-plugin-separation) design pattern.

## API Documentation
Documentation is at `./openapi.yaml` using [OpenAPI 3.0](https://swagger.io/blog/news/announcing-openapi-3-0/).

### Editing API Documentation
It is encouraged to maintain the API docs with changes to not just the API, but data model properties, relationships, and as much architectural design detail as possible. Thoroughness in the documentation will mean people (including ourselves) can set aside this project and come back to it later without having to retain all the information in our brains.

At the moment of writing, OpenAPI 3.0 doesn't have many intuitive tooling around generating static documentation with all the bells and whistles I want. There's quite a lot for Swagger 2.0, [ReDoc](https://github.com/Redocly/redoc) is the closest to producing something through a quick easy CLI, but it doesn't display the models, opened [Issue (7/26/2019)].

In the meantime, here are the methods of viewing/editing the documentation:
1. (Recommended) Install the [Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer) on VSCode
1. [Swagger Online Editor](http://editor.swagger.io/)
1. Run Swagger editor locally using docker:
     - `docker pull swaggerapi/swagger-editor`
     - `docker run -d -p 80:8080 swaggerapi/swagger-editor`
     - `open http://localhost/`