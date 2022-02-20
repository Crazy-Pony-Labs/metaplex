import * as anchor from '@project-serum/anchor';

import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { CANDY_MACHINE_PROGRAM } from './candy-machine';
import useCandyMachine from './use-candy-machine';
import { GatewayProvider } from '@civic/solana-gateway-react';
import { MintCountdown } from './MintCountdown';
import { toDate } from './utils';

import Header from './components/header';
import Spawning from './components/spawning';

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  txTimeout: number;
  rpcHost: string;
}

const Home = (props: HomeProps) => {
  const { isActive, isSoldOut, isUserMinting, alertState, setAlertState, candyMachine, onMint, onMintMultiple } = useCandyMachine(props);
  const wallet = useWallet();
  const rpcUrl = props.rpcHost;

  return (
      <main className="pb-16">

      <Header/>

      <div className="flex flex-col justify-center items-center flex-1 space-y-6 sm:space-y-10 mt-10 sm:mt-20">

        <Spawning/>

        <div className="flex flex-col items-center justify-center sm:space-y-2">
          <h1>SOLPACAS</h1>
        </div>

        <div className="flex flex-col justify-center items-center space-y-4">
          <p className="text-center text-5xl font-bold text-red-600">MINT CLOSED</p>
        </div>

      </div>
    
    <Snackbar
      open={alertState.open}
      autoHideDuration={6000}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
      >
        {alertState.message}
      </Alert>
    </Snackbar>

    </main>
  );
};

export default Home;
