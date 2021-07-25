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
