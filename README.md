# ERC20 Batch Sender

Smart contract for sending ERC20 tokens in batches

### Install

```
npm install
```

### Compile

```
npx hardhat compile
```

### Generate types

```
npx hardhat typechain
```

### Test

```
npx hardhat test
```

### Deployment

Create a `.env` file with the following:

```
INFURA_KEY='4583b1346bb...'
PRIVATE_KEY='0xb2c...'
MORALIS_SPEED_NODE_KEY='36254...'
```

Then Run `npm run deploy:<network>` to deploy
