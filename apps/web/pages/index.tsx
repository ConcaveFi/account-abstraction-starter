import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useIsHydrated } from 'components/providers/IsHydratedProvider'
import { useAddRecentTransaction } from 'components/providers/TransactionsProvider'
import { sampleNft } from 'contracts'
import { useTimeout } from 'usehooks-ts'
import { format } from 'utils/format'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

function MintNft() {
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: sampleNft.address[polygonMumbai.id],
    chainId: polygonMumbai.id,
    abi: sampleNft.abi,
    functionName: 'mint',
    args: [address!],
  })
  const addTx = useAddRecentTransaction()
  const {
    isIdle,
    write: mint,
    reset,
  } = useContractWrite({
    ...config,
    chainId: polygonMumbai.id,
    onSuccess(tx) {
      tx.wait().then((param: any) => {
        addTx({
          hash: param.bundleTransactionHash as `0x${string}`,
          meta: { type: 'mint', name: 'Sample Nft' },
        })
      })
    },
  })

  useTimeout(() => reset(), 10_000)

  return (
    <button
      disabled={!isIdle}
      onClick={() => mint?.()}
      className="bg-primary disabled:bg-grey-300 rounded-xl px-4 py-2 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
    >
      Mint gasless nft
    </button>
  )
}

function YourSampleNfts() {
  const { address } = useAccount()

  const { data: balance } = useContractRead({
    abi: sampleNft.abi,
    address: sampleNft.address[polygonMumbai.id],
    args: [address!],
    chainId: polygonMumbai.id,
    functionName: 'balanceOf',
    watch: true,
    select: (b) => [b.toBigInt(), 0] as const,
  })

  return (
    <div className="flex gap-2">
      <div className="bg-grey-200 h-8 w-8 rounded-lg" />
      <div className="flex flex-col">
        <span className="text-xs font-medium">SampleNFT</span>
        <span className="text-grey-500 font-mono text-xs">
          You own {format(balance, { digits: 0 })}
        </span>
      </div>
    </div>
  )
}

export default function Page() {
  const isHydrated = useIsHydrated()
  const { isConnected } = useAccount()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 p-4">
      <ConnectButton />
      {isHydrated && isConnected && (
        <>
          <MintNft />
          <YourSampleNfts />
        </>
      )}
    </div>
  )
}
