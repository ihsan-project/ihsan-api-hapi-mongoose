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