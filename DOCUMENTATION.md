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

#### Check Server Status

```http
  POST /api/createRoom

  {
  "email": "my.email@gmail.com",
  "roomName": "The Best of the Bestest"
  }
```

```response
  {
    {
    "message": "Room created successfully",
    "room": {
        "roomId": "44bda39a-ba86-4765-ba58-577f3da93458",
        "email": "my.email@gmail.com",
        "roomName": "The Best of the Bestest",
        "_id": "67890f8ce28f232da8c12c7b",
        "timestamp": "2025-01-16T13:54:20.622Z",
        "__v": 0
    }
  }
```
