// Externat imports
import React, { useState, useEffect, useRef } from 'react';
// Local imports
import XPLogo from './assets/SVG/XPLogo';
import {
  XPApp,
  XPMain,
  XPBoxCenter,
  XPFlexCenter,
  XPTitle,
  XPRow,
  XPColumn,
  XPLabel,
  XPTransaction
} from './StyledComponents';
import SendButton from './SendButton';
import XPTable, { XPTableStyles } from './XPTable';

// Maximum transaction to be retrieved from the BE
const maxCount = 50;
// Maximum account to be requested (= XPNET 2.0)
const maxAmount = 2000000000000000;
// Socket of the faucet BE
const url = 'http://localhost:6644'

// The transaction table headers & data pointers
const columns = [
  {
    Header: 'Timestamp',
    accessor: 'timestamp'
  },
  {
    Header: 'Target Address',
    accessor: 'address'
  },
  {
    Header: 'XPNET',
    accessor: 'value'
  },
];

/*************************************************************
 * The root component of the application
 * @returns the JSX of the application
 ************************************************************/
function App() {

  // The component's state
  const [fire, setFire] = useState(false);
  // Stores the flag whether the SEND button is disabled or not
  const [sendInactive, setSendInactive] = useState(false);
  // Stores the amount to be transfered to a user's account
  const [amount, setAmount] = useState(maxAmount);
  // The target account storage
  const account = useRef();
  // The historical transactions data storage
  const [data, setData] = useState([]);
  // The faucet balance storage
  const [balance, setBalance] = useState(0);


  useEffect(
    () => {
      const init = async () => {
        // Requests the current Faucet balance from the BE
        const breq = await fetch(`${url}/balance`);
        // Converts the result to JSON
        const bdat = await breq.json();
        // Mutates the state
        setBalance(bdat['balance'])

        // Requests for the history of the transactions
        const histreq = await fetch(`${url}/history/${maxCount}`);
        // Converts the result to a valid JSON
        const hdat = await histreq.json();
        // Mutates the state
        setData(hdat);
      }

      init();
    },
    [fire]
  )

  /**
   * An asynchronous SEND button handler
   * 
   * Sends the POST request to the Faucet BE
   * 
   * Requests to send the amount to the selected address
   */
  const handleSendButtonClick = async () => {
    // Deactivated the button to avoid accidental clicks
    setSendInactive(true);

    // Sends the POST request to the BE
    const rawResponse = await fetch(`${url}/transfer`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "target": account.current.value, "amount": amount })
    });

    //Awaits the responce to be converted to valid JSON
    const content = await rawResponse.json();

    if (content) {
      // Activated the button to enable further actions
      setSendInactive(false);
    }
    setFire(!fire);
  }

  /**
   * Formats a string by separating thousands, millions, ets. by commas
   * @param {String | Number} x 
   * @returns a comma separated number as a string
   */
  const numberWithCommas = (x) => {
    // Converts the input to string
    x = x.toString();
    // Defines a pattern
    var pattern = /(-?\d+)(\d{3})/;
    // Loops though the found matches
    while (pattern.test(x))
      // Adds the coma between the matching patterns
      x = x.replace(pattern, "$1,$2");
      // Returns the formated string
    return x;
  }

  /**
   * Handles the change amount event
   * 
   * Stores the new value in the state if the value is below maxAmount
   * @param {Event} e event pointing to the initiating input
   */
  const handleChangeAmount = (e) => {
    // If the element's value is truthy and is less than the maximum allowed
    if (e.target.value && e.target.value <= maxAmount) {
      // Mutate the state amount
      setAmount(e.target.value);
    } else {
      // Otherwise mutate the state amount to the maximum possible amount
      setAmount(maxAmount);
    }
  }


  // ==========================================================
  //                            J S X
  // ==========================================================
  return (
    <XPApp>
      <XPMain>
        <XPBoxCenter>
          <XPFlexCenter>

            <XPLogo />
            <XPTitle>Testnet Faucet</XPTitle>

            {/* -------------------------------------------- */}
            {/* ---------- The first Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPLabel>Faucet balance:</XPLabel>
              <XPTransaction
                value={numberWithCommas(balance)}
                disabled
              ></XPTransaction>
            </XPRow>
            <XPRow>
              <XPColumn></XPColumn>
            </XPRow>
            <XPRow>
              <XPLabel>Transfer Amount:</XPLabel>
              <XPTransaction
                value={amount}
                onChange={handleChangeAmount}
              ></XPTransaction>
            </XPRow>
            <XPRow>
              <XPColumn></XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------- The second Row of elements ------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPLabel>Target Account:</XPLabel>
              <XPTransaction
                ref={account}
              ></XPTransaction>

            </XPRow>

            <XPRow>
              <XPColumn></XPColumn>
            </XPRow>

            {/* -------------------------------------------- */}
            {/* --------------- The Send Button ------------ */}
            {/* -------------------------------------------- */}

            <SendButton onClick={handleSendButtonClick} inactive={sendInactive} />

            {/* -------------------------------------------- */}
            {/* ------------------ TX Table ---------------- */}
            {/* -------------------------------------------- */}

            <XPRow>
              <XPColumn></XPColumn>
            </XPRow>

            <XPTableStyles>
              <XPTable columns={columns} data={data} />
            </XPTableStyles>

          </XPFlexCenter>
        </XPBoxCenter>
      </XPMain>
    </XPApp>
  );
}

export default App;
