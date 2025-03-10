# Life Source

This is a solution that rewards users with token for recycling and use them to uphold the SDG goals

-   Clean Water and Sanitation
-   Climate Action
-   Life on Land
-   Sustainable Cities and Communities

# Methodolgy

Frontend - HTML, Tailwind
Solidity Smart Contract
Testing
Deployment

## Requirements

-   [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    -   You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
-   [Nodejs](https://nodejs.org/en/)
    -   You'll know you've installed nodejs right if you can run:
        -   `node --version` and get an ouput like: `vx.x.x`
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
    -   You'll know you've installed yarn right if you can run:
        -   `yarn --version` and get an output like: `x.x.x`
        -   You might need to install it with `npm`

## Quickstart

```
git clone https://github.com/Imdavyking/life_source
cd life_source/contracts
yarn
```

# Usage

Deploy:

```
yarn hardhat deploy
```

## Testing

```
yarn hardhat test
```

# Deployment to a testnet

1. Setup environment variabltes

You'll want to set your `RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

-   `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
    -   You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
-   `RPC_URL`: This is url of the creator testnet node you're working with.

2. Get testnet cBTC

Head over to [https://creator.xyz/faucet](https://creator.xyz/faucet) and get some tesnet cBTC. You should see the cBTC show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network creator
```

# Thank you!
