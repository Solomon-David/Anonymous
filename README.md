# Anonymous Chatroom

A secure and private online chat platform where users can communicate anonymously. This project allows users to join a chatroom and interact with others without revealing their identity.

## Installation

Install Anonymous with npm

```bash
  git clone https://github.com/Solomon-David/Anonymous
  cd Anonymous
```

For Production

```bash
  npm run build
  npm start
```

For Testing

```bash
    npm run dev
```

## API Reference

#### Check if server is live

```http
  GET /
```

```bash
  {
  "message": "hello world!"
  }
```

#### Check Server Status

```http
  GET /status
```

```response
  {
  "message": "Server running on port 8080."
  }
```

## Contributing

Contributions are always welcome!

## Tech Stack

**Server:** Node, Express

**Database:** MongoDB, Mongoose

## Authors

-   [@PrimotionStudio](https://www.github.com/PrimotionStudio)

-   [@Solomon-David](https://www.github.com/Solomon-David)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
