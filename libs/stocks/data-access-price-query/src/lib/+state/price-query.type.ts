export type PriceQuery = {
  date: string;
  dateNumeric: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type PriceQueryResponse = {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
};
