# XP.network testnet Faucet UI

This project containt the Frontend part of the XP.network testnet Faucet UI.
Use the faucet to add XPNET tokens to a test account.

## Running the Faucet UI

### `yarn start`

If the faucet Backend is down you will see the following screen:
![Backend down](.//public/screens/BE_being_down.png)


If the faucet balance is 0 and the transaction table is empty it is a clear indicator that the front end is not connected to the backend.

To use the full functionality of the faucet UI do the following:

1. If testing locally, run a substrate local node or connect to the XP.network live testnet if testing the live functionality.
2. Run the [faucet backend](https://github.com/xp-network/faucet-backend) (see the faucet backend documentation).

Wait for the success messages like below:

```bash
Compiled successfully!

You can now view faucet-ui in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.129.129:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

The connected view should look like so:

![Backend is up](.//public/screens/BE_is_up.png)

## Sending XPNET tokens to a test account

1. Fill the "Target Account" field with your address hash. Like so:
![Before transaction](.//public/screens/Before_sending.png)
2. Press the SEND button. The topmost transaction must display the time of the transaction as well as the target address hash and the number of XPNET transamitted.
![After the transaction](.//public/screens/After_sending.png)
3. To avoid abuse, we have limited the amount the faucet sends to an arbitrary account to XPNET 2.0 per 24 hours.