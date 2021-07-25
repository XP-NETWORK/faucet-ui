# XP.network testnet Faucet UI

This project containt the Frontend part of the XP.network testnet Faucet UI.
Use the faucet to add XPNET tokens to a test account.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Running the Faucet UI


### `yarn start`

If the faucet Backend is down you will see the following screen:
![Backend down](.//public/screens/BE_being_down.png)


As you can see, the faucet balance is 0. This is a clear indicator that the front end is not connected with the backend.

To use the full functionality of the faucet UI do the following:

1. If testing locally, run a substrate local node or connect to the XP.network live testnet if testing the live functionality.
2. Run the [faucet backend](https://github.com/xp-network/faucet-backend) (see the faucet backend documentation).
