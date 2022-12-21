'node app.js' to run.

I've had problems with initializing the database with raw SQL query dynamically, and the asynchronous mechanisms of Sequelize due to the fact that I have no prior experience with it.

Database with name specified in the .env file should be initialized via psql beforehand, and the app throws a unique key constraint error the first time it is run. Works fine afterwards.

---

6 different clients and 7 different shares are created from the seed file.

> test client 1 - 100 EVA shares
> test client 2 - 50 XTR shares
> test client 3 - 20 GAW shares
> test client 4 - 30 YSL shares
> test client 5 - 70 KDN shares
> test client 6 - 200 OVO shares
> LTR shares are not owned by anyone.

Share symbols and amount are passed to the query as parameters, and the ID of the client is set as the "id" header in the POST request.

    POST /register/share?symbol= &price=    to register new share
    POST /register/client?name=             to register new client, ID is auto-generated

    POST /trade/buy?symbol= &amount=        to buy share(s)
    POST /trade/sell?symbol= &amount=       to sell share(s)
