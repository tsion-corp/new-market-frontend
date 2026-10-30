import type { Game, PredictionMarket, Transaction } from "../types";

export const sentTransaction: Transaction = {
  id: "transaction-1",
  title: "Sent Money",
  counterparty: "Matt Exousia",
  amount: { amount: 450000n, currency: "USD" },
  visual: { kind: "icon", icon: "send" },
};

export const receivedTransaction: Transaction = {
  id: "transaction-2",
  title: "Received Money",
  counterparty: "Last Man Standing",
  amount: { amount: 123456n, currency: "USD" },
  visual: {
    kind: "image",
    image: { src: "/images/dashboard/transaction-avatar.avif", width: 86, height: 86, alt: "" },
  },
};

export const market: PredictionMarket = {
  id: "market-1",
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
};

export const game: Game = {
  id: "game-1",
  title: "Arkjet",
  description: "Earn by flying airplanes to multipliers",
  cover: {
    src: "/images/dashboard/game-arkjet.avif",
    width: 591,
    height: 330,
    alt: "Arkjet cover: a red plane above the Arkjet logo",
  },
};
