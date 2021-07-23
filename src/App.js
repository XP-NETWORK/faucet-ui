import React, { useState, useEffect, useRef } from 'react';
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

const maxCount = 50;
const maxAmount = 2000000000000000;
const url = 'http://localhost:6644'

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

function App() {

  const [fire, setFire] = useState(false);
  const [sendInactive, setSendInactive] = useState(false);
  const [amount, setAmount] = useState(maxAmount);
  const account = useRef();
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(
    () => {
      const init = async () => {
        const breq = await fetch(`${url}/balance`);
        const bdat = await breq.json();
        setBalance(bdat['balance'])

        const histreq = await fetch(`${url}/history/${maxCount}`);
        const hdat = await histreq.json();
        setData(hdat);
      }

      init();
    },
    [fire]
  )

  const handleSendButtonClick = async () => {
    setSendInactive(true);

    const rawResponse = await fetch(`${url}/transfer`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "target": account.current.value, "amount": amount })
    });
    const content = await rawResponse.json();

    console.log(content);

    if (content) {
      setSendInactive(false);
    }
    setFire(!fire);
  }

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  const handleChangeAmount = (e) => {
    if (e.target.value && e.target.value <= maxAmount) {
      setAmount(e.target.value);
    } else {
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
