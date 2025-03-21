Usage Instructions
1) Install dependencies:
```npm install```
2) Run migrations:
```npm run migrate```
3) Start the server:
```npm run dev```
4) To update a users balance, send a POST request to /api/users/balance with:
```json
{
  "userId": 1,
  "amount": -2
}
```