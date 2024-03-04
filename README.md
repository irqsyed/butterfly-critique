# 🦋 Butterfly critique

Butterfly critique is an API designed for butterfly enthusiasts. So far, it's an [`express`](https://expressjs.com/)-based API that stores butterflies and users.

Data persistence is through a JSON-powered database called [`lowdb`](https://github.com/typicode/lowdb).

Validation is built using an assertion library called [`@mapbox/fusspot`](https://github.com/mapbox/fusspot).

## Task

Butterfly critique is already a pretty great API, but we think it would be even better if it let users critique butterflies. Your task is to create new API endpoints that:

1. Allow a user to rate butterflies on a scale of 0 through 5
1. Allow retrieval of a list of a user's rated butterflies, sorted by rating

You should also provide a small **write-up** that explains the decisions (for instance, the HTTP verbs for new endpoints) and trade-offs you made. If you add any new dependencies, spend some time talking about why you chose them.

You are free to refactor or improve any code you think should be refactored, but please include a note about such changes in your write-up. Any changes you make should be scoped and explained as though you are opening a pull request against an existing codebase used in a production API service.

If you have any questions or concerns, please do not hesitate to contact us!

### What we're looking for

* Your code should be extensible and reusable
* Your code should be well tested
* Your code should be tidy and adhere to conventions
* Your changes should be well-scoped and explained in the write-up
* Your write-up should be thoughtful and coherent

❗️ Note: please do not write your name anywhere in your solution, since this prevents us from evaluating it anonymously. If you use git, please remember to remove the `.git` directory before submitting your solution.

### Scoring rubric

Points are awarded in the following categories:

Communication in the write-up (2 points)
Endpoint design (6 points)
Database design (2 points)
Testing (3 points)
Tidiness, refactoring, and adherence to conventions (1 point)

The maximum possible score is 14.

## Developing

### Requirements

* Node v18.x
* npm v9.x

### Setup

Install dependencies with:

```sh
npm ci
```

Butterfly critique uses lowdb to manage a JSON database. You can find the [lowdb@1.0.0 docs here](https://github.com/typicode/lowdb/tree/v1.0.0#readme). If you need to recreate the butterflies database, you can run:

```sh
npm run init-db
```

### Running

To run the application locally:

```sh
npm start
```

You should see a message that the application has started:

```sh
Butterfly API started at http://localhost:8000
```

You can manually try out the application using `curl`:

```sh
# GET a butterfly
curl http://localhost:8000/butterflies/xRKSdjkBt4

# POST a new butterfly
curl -X POST -d '{"commonName":"Brimstone", "species":"Gonepteryx rhamni", "article":"https://en.wikipedia.org/wiki/Gonepteryx_rhamni"}' -H 'content-type: application/json' http://localhost:8000/butterflies

# GET a user
curl http://localhost:8000/users/OOWzUaHLsK
```

**For developing**, you can run the application with auto-restarts on code changes using:

```sh
npm run watch
```

### Testing

This project uses [`jest`](https://jestjs.io/) as its testing framework.
If you are unfamiliar with `jest`, check out its [documentation](https://jestjs.io/docs/en/getting-started).

This project has `eslint` and a custom config [`@mapbox/eslint-config-mapbox`](https://www.npmjs.com/package/@mapbox/eslint-config-mapbox) setup for code linting.

To run the linter and all tests:

```sh
npm test
```

**For developing**, you can run `jest` with auto-restarts using:

```sh
npm run test-watch
```


<!------------------------------ Refactor and PR Details ------------------------>

## Code structure - write ups
As your application expands and the number of routes increases, it is advisable to adopt a modular approach by organizing routes into separate files. This practice enhances the maintainability and scalability of your project. In this implementation, I've structured the routes based on their functionality, providing a systematic and organized way to manage and extend the application.

1. Modular Routing: organized routes into separate modules (butterflyRoutes, userRoutes, ratingRoutes), which is a good practice for maintainability and readability.
Here's an example of structured routes into separate files:
    1. butterflyRoutes.js - Butterfly-related routes
    2. userRoutes.js - User-related routes
    3. ratingRoutes.js - Rating-related routes
    4. routes.js - Main file to combine all route files

2. RESTful API Design: routes follow a RESTful design with versioning (/v1). This is a common and recommended practice to handle potential changes to API in the future.

## Dependencies
No new dependencies added.

## Swagger File
I've crafted Swagger specifications to illustrate API endpoints, requests, responses, and schemas.
`This document can be imported into or viewed using the Swagger Web Editor at (https://editor-next.swagger.io/)`

## End points
1. BUTTERFLIES:
```sh
# GET a butterfly
    `curl http://localhost:8000/v1/butterfly/query/butterflyById/GI9_EuH8s1`
# POST/Create a butterfly
    `curl -X POST -d '{"commonName":"Question Mark", "species":"Polygonia interrogationis", "article":"https://www.butterfliesandmoths.org/"}' -H 'content-type: application/json' http://localhost:8000/v1/butterfly/command/createButterfly`

2. USERS:
# GET a User
    `curl http://localhost:8000/v1/user/query/userById/OOWzUaHLsK`
# POST/Create a User
    `curl -X POST -d '{"userName":"Andrew Agnost"}' -H 'content-type: application/json' http://localhost:8000/v1/user/command/createUser`

3. USER RATINGS:
# GET User Ratings
    `curl http://localhost:8000/v1/rating/query/userById/OOWzUaHLsK`
# Create User Ratings
    `curl -X POST -H "Content-Type: application/json" -d '{"userId": "aqekk3t4kw", "butterflyId": "GI9_EuH8s1", "userRating": "4"}' http://localhost:8000/v1/rating/command/createRating`
```

## Database Table Form
I've assigned identifiers (Ids) such as butterflyId and userId. This deliberate choice simplifies future analytics tasks, facilitating easier table joins. Additionally, adopting a distinct collection for ratings is a recommended practice, contributing to a more effective and organized data structure.

1. BUTTERFLIES:
| butterflyId          | commonName            | species                  | article                                                |
|---------------|-----------------------|--------------------------|--------------------------------------------------------|
| GI9_EuH8s1    | Zebra Swallowtail     | Protographium marcellus  | https://en.wikipedia.org/wiki/Protographium_marcellus  |
| xRKSdjkBt4    | Plum Judy             | Abisara echerius          | https://en.wikipedia.org/wiki/Abisara_echerius          |
| 0MUBKMu07U    | Red Pierrot           | Talicada nyseus          | https://en.wikipedia.org/wiki/Talicada_nyseus          |
| NLktii5zvK    | Texan Crescentspot    | Anthanassa texana         | https://en.wikipedia.org/wiki/Anthanassa_texana         |
| SMyaT24g-N    | Guava Skipper         | Phocides polybius        | https://en.wikipedia.org/wiki/Phocides_polybius        |
| DCenP4kQNQ    | Mexican Bluewing      | Myscelia ethusa          | https://en.wikipedia.org/wiki/Myscelia_ethusa          |

2. USERS:
| userId           | username              |
|---------------|-----------------------|
| OOWzUaHLsK    | iluvbutterflies       |
| sdmU7-wkQX    | flutterby              |
| aqekk3t4kw    | metamorphosize_me      |

3. USER RATINGS:
| userId        | butterflyId          | userRating |
|---------------|-----------------------|------------|
| OOWzUaHLsK    | xRKSdjkBt4            | 3          |
| OOWzUaHLsK    | GI9_EuH8s1            | 4          |
| sdmU7-wkQX    | GI9_EuH8s1            | 2          |
| aqekk3t4kw    | xRKSdjkBt4            | 5          |

## Testing

 PASS  test/validators.test.js
 PASS  test/butterflyRoutes.test.js
 PASS  test/userRoutes.test.js
 PASS  test/ratingRoutes.test.js
 PASS  test/index.test.js
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |   79.34 |    88.89 |   85.71 |   79.83 |                   
 src                 |   67.74 |      100 |   66.67 |   67.74 |                   
  errors.js          |     100 |      100 |     100 |     100 |                   
  index.js           |     100 |      100 |     100 |     100 |                   
  routes.js          |       0 |      100 |       0 |       0 | 2-18              
 src/helpers         |     100 |      100 |     100 |     100 |                   
  constants.js       |     100 |      100 |     100 |     100 |                   
  validators.js      |     100 |      100 |     100 |     100 |                   
 src/routes          |   82.14 |    88.24 |   90.91 |   82.93 |                   
  butterflyRoutes.js |      84 |      100 |     100 |      84 | 29-30,66-67       
  ratingRoutes.js    |   79.41 |    84.62 |      80 |   81.25 | 27-28,45,56,65-66 
  userRoutes.js      |      84 |      100 |     100 |      84 | 30-31,65-66       
---------------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        4.045 s

## Lint
Added script "fix-lint": "npx eslint --fix ."
