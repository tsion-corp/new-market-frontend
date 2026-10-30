type Currency = "USD";

export type Money = { amount: bigint; currency: Currency };

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  objectPosition?: { x: number; y: number };
};

type TransactionVisual =
  { kind: "icon"; icon: "send" | "receive" } | { kind: "image"; image: ImageAsset };

export type Transaction = {
  id: string;
  title: string;
  counterparty: string;
  amount: Money;
  visual: TransactionVisual;
};

export type PredictionMarket = {
  id: string;
  question: string;
  image: ImageAsset;
  yesPrice: bigint;
  noPrice: bigint;
};

export type Game = { id: string; title: string; description: string; cover: ImageAsset };

export type Dashboard = {
  balance: Money;
  transactions: Transaction[];
  markets: PredictionMarket[];
  games: Game[];
};
