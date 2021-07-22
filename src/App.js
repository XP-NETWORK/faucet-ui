import React, { useState, useMemo } from 'react';
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

const maxAmount = 2000000000000000;
const url = 'http://localhost:6644'

function App() {

  const [sendInactive, setSendInactive] = useState(false);
  const [amount, setAmount] = useState(maxAmount);
  const [account, setAccount] = useState('');
  const [count, setCount] = useState(10);
  const [data, setData] = useState([]);

  fetch(`${url}/history/${count + 1}`)
        .then(d => d.json())
        .then(json => {
          setData(json)
        })

  const columns = useMemo(() => [
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

  ])

  const handleSendButtonClick = async () => {
    setSendInactive(true);

    const rawResponse = await fetch(`${url}/transfer`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "target": account, "amount": amount })
    });
    const content = await rawResponse.json();

    console.log(content);

    if (content) {
      setSendInactive(false);
      setCount(count + 1);

      fetch(`${url}/history/${count + 1}`)
        .then(d => d.json())
        .then(json => {
          setData(json)
        })

    }
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


  const handleAccountChange = (e) => {
    setAccount(e.target.value);
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
                value={numberWithCommas(200000000000000000)}
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
                value={account}
                onChange={handleAccountChange}
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
