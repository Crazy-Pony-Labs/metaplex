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

        {!wallet.connected &&
          <span className="text-white font-bold text-2xl cursor-default">
            <ConnectButton style={{ fontSize: 18 }}>Connect Wallet</ConnectButton>
          </span>
        }

        {candyMachine &&
          <>
            <div className="grid grid-cols-2 gap-6 text-center text-xl cursor-default">
              <div>
                <div><p className="font-medium text-xl text-gray-800">Minted</p></div>
                <div><p className="font-bold text-4xl">{`${candyMachine?.state.itemsRedeemed}`}</p></div>
              </div>
              <div>
                <div><p className="font-medium text-xl text-gray-800">Available</p></div>
                <div><p className="font-bold text-4xl">{`${candyMachine?.state.itemsRemaining}`}</p></div>
              </div>
            </div>
          </>
        }

        {console.log("IS ACTIVE", candyMachine?.state?.isActive)}

        <div className="flex flex-col justify-center items-center space-y-4">
          {wallet.connected &&
            <>
              {isSoldOut && <p className="text-center text-5xl font-bold text-red-600">SOLD OUT</p>}
              <MintCountdown
                date={toDate(
                  candyMachine?.state.goLiveDate
                    ? candyMachine?.state.goLiveDate
                    : candyMachine?.state.isPresale
                    ? new anchor.BN(new Date().getTime() / 1000)
                    : undefined,
                )}
                style={{ justifyContent: 'flex-end' }}
              />

              {
                !isSoldOut && 
                wallet.publicKey &&
                <>
                  {wallet.signTransaction ? (
                    <GatewayProvider
                      wallet={{
                        publicKey:
                          wallet.publicKey ||
                          new PublicKey(CANDY_MACHINE_PROGRAM),
                        //@ts-ignore
                        signTransaction: wallet.signTransaction,
                      }}
                      gatekeeperNetwork={
                        candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                      }
                      clusterUrl={rpcUrl}
                      options={{ autoShowModal: false }}
                    >
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <button
                          className="mint mint1"
                          disabled={isSoldOut || isUserMinting}
                          onClick={onMint}
                        >
                          <span>{isUserMinting ? 'LOADING...' : 'MINT 1'}</span>
                        </button>

                        <button
                          className="mint mint5"
                          disabled={isSoldOut || isUserMinting}
                          onClick={() => onMintMultiple(5)}
                        >
                          <span>{isUserMinting ? 'LOADING...' : 'MINT 5'}</span>
                        </button>

                        <button
                          className="mint mint10"
                          disabled={isSoldOut || isUserMinting}
                          onClick={() => onMintMultiple(10)}
                        >
                          <span>{isUserMinting ? 'LOADING...' : 'MINT 10'}</span>
                        </button>

                        <div className="h-2"></div>

                        <button
                          className="mint mint-lucky"
                          disabled={isSoldOut || isUserMinting}
                          onClick={ () => {
                            const lucky = Math.min(10 + Math.floor(Math.random() * 41), (candyMachine?.state.itemsRemaining ?? 0));
                            console.log("Lucky number is", lucky);
                            onMintMultiple(lucky)}
                          }
                        >
                          <span>{isUserMinting ? 'LOADING...' : 'I’M FEELING LUCKY'}</span>
                        </button>

                        <p className="text-center text-xs">
                          Desperate to collect a Legend?<br/>Try your luck — this button will mint a random amount between 10 and 50 NFTs
                        </p>
                      </div>
                    </GatewayProvider>
                  ) : (
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <button
                        className="mint mint1"
                        disabled={isSoldOut || isUserMinting}
                        onClick={onMint}
                      >
                        <span>{isUserMinting ? 'LOADING...' : 'MINT 1'}</span>
                      </button>

                      <button
                        className="mint mint5"
                        disabled={isSoldOut || isUserMinting}
                        onClick={() => onMintMultiple(5)}
                      >
                        <span>{isUserMinting ? 'LOADING...' : 'MINT 5'}</span>
                      </button>

                      <button
                        className="mint mint10"
                        disabled={isSoldOut || isUserMinting}
                        onClick={() => onMintMultiple(10)}
                      >
                        <span>{isUserMinting ? 'LOADING...' : 'MINT 10'}</span>
                      </button>

                      <div className="h-2"></div>

                      <button
                        className="mint mint-lucky"
                        disabled={isSoldOut || isUserMinting}
                        onClick={ () => {
                          const lucky = Math.min(10 + Math.floor(Math.random() * 41), (candyMachine?.state.itemsRemaining ?? 0));
                          console.log("Lucky number is", lucky);
                          onMintMultiple(lucky)}
                        }
                      >
                        <span>{isUserMinting ? 'LOADING...' : 'I’M FEELING LUCKY'}</span>
                      </button>

                      <p className="text-center text-xs">
                        Desperate to collect a Legend?<br/>Try your luck — this button will mint a random amount between 10 and 50 NFTs
                      </p>
                    </div>
                  )
                }
              </>
              }
            </>
          }
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
