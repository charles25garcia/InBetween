interface EasyPickOption {
  text: string;
  value: number;
}

export const EasyPickOptions: EasyPickOption[] = [
  {
    text: "1%",
    value: 0.01,
  },
  {
    text: "5%",
    value: 0.05,
  },
  {
    text: "10%",
    value: 0.1,
  },
  {
    text: "15%",
    value: 0.15,
  },
  {
    text: "ALL IN",
    value: "1",
  },
];
