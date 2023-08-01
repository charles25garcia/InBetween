import { BetTypeEnum } from "~/@core/enums";

export const BetOptionsConst: {
  display: string;
  id: string;
  type: BetTypeEnum;
  shortName: string;
}[] = [
  {
    display: "IN BETWEEN",
    id: "inbetween",
    type: BetTypeEnum.InBetween,
    shortName: "IB",
  },
  {
    display: "OUT BEYOND",
    id: "outbeyond",
    type: BetTypeEnum.OutBeyond,
    shortName: "OB",
  },
  {
    display: "PAIR",
    id: "pair",
    type: BetTypeEnum.Pairs,
    shortName: "PAIR",
  },
  {
    display: "TRIO",
    id: "trio",
    type: BetTypeEnum.Trio,
    shortName: "TRIO",
  },
];
