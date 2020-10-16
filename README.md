## Description

API para conversão de moedas desenolvido utilizando a técnica de TDD com as tegnologias: NestJS, Typescript, Mongodb. Acompanhe o processo de desenvolvimento no [youtube](https://www.youtube.com/watch?v=aXwEa60czpg&list=PLVtiMM37bm3bEVcWVVjpZfMVQimRZBwRh&index=2).

## Running the app

```bash
$ docker-compose up
# listening in http://localhost
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

<img src="https://hugo.bz/gitimgs/cov.png" />
<br/>

## Endpoints

### Currency exchange

```bash
GET
http://localhost/exchange/?from=USD&to=BRL&amount=1
```

<img src="https://hugo.bz/gitimgs/get.png" />

### Create Currency

```bash
POST
http://localhost/currencies/
Put values in body:
currency=BRL
value=0.2
```

<img src="https://hugo.bz/gitimgs/post.png" />

### Update Currency Value

```bash
PATCH
http://localhost/currencies/BRL/value
Put value in body:
value=0.22
```

<img src="https://hugo.bz/gitimgs/update.png" />

### Delete Currency

```bash
DELETE
http://localhost/currencies/BRL
```

<img src="https://hugo.bz/gitimgs/delete.png" />

<br/>

## License

Nest is [MIT licensed](LICENSE).
