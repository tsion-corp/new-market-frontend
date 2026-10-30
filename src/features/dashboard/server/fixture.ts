import type { Dashboard, Game, ImageAsset, Transaction } from "../types";

const amount = { amount: 450000n, currency: "USD" } as const;

const transactionAvatar: ImageAsset = {
  src: "/images/dashboard/transaction-avatar.avif",
  width: 86,
  height: 86,
  alt: "",
};

const arkjetCover: ImageAsset = {
  src: "/images/dashboard/game-arkjet.avif",
  width: 591,
  height: 330,
  alt: "Arkjet cover: a red plane above the Arkjet logo",
};

const transactions: Transaction[] = [
  {
    id: "transaction-1",
    title: "Sent Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "icon", icon: "send" },
  },
  {
    id: "transaction-2",
    title: "Received Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "image", image: transactionAvatar },
  },
  {
    id: "transaction-3",
    title: "Won Game",
    counterparty: "Last Man Standing",
    amount,
    visual: { kind: "image", image: transactionAvatar },
  },
  {
    id: "transaction-4",
    title: "Sent Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "image", image: transactionAvatar },
  },
  {
    id: "transaction-5",
    title: "Sent Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "icon", icon: "send" },
  },
  {
    id: "transaction-6",
    title: "Sent Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "icon", icon: "receive" },
  },
  {
    id: "transaction-7",
    title: "Sent Money",
    counterparty: "Matt Exousia",
    amount,
    visual: { kind: "icon", icon: "send" },
  },
];

const games: Game[] = ["game-1", "game-2", "game-3"].map((id) => ({
  id,
  title: "Arkjet",
  description: "Earn by flying airplanes to multipliers",
  cover: arkjetCover,
}));

export const dashboardFixture: Dashboard = {
  balance: { amount: 500087n, currency: "USD" },
  transactions,
  markets: [
    {
      id: "market-1",
      question: "Will Pastor Chris talk about Rapture tomorrow? ",
      image: {
        src: "/images/dashboard/prediction-pastor-chris.avif",
        width: 647,
        height: 647,
        alt: "Pastor Chris holding a microphone",
      },
      yesPrice: 62n,
      noPrice: 38n,
    },
    {
      id: "market-2",
      question: "Will Tacha post tomorrow by 2PM?",
      image: {
        src: "/images/dashboard/prediction-tacha.avif",
        width: 647,
        height: 809,
        alt: "Tacha posing in a blue dress",
        objectPosition: { x: 50, y: 28.773 },
      },
      yesPrice: 62n,
      noPrice: 38n,
    },
  ],
  games,
};
