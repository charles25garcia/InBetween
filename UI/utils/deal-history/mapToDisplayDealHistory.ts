import dayjs from "dayjs";
import { DealHistoryDto } from "~/@core/dtos";
import { BetTypeEnum } from "~/@core/enums";
import { DealHistoryDisplayModel } from "~/@shared/models";

const results = [
  {
    type: BetTypeEnum.InBetween,
    label: "IB",
    color: "text-amber-400",
  },
  {
    type: BetTypeEnum.OutBeyond,
    label: "OB",
    color: "text-green-600",
  },
  {
    type: BetTypeEnum.Pairs,
    label: "P",
    color: "text-violet-600",
  },
  {
    type: BetTypeEnum.Trio,
    label: "T",
    color: "text-cyan-400",
  },
];

export function mapToDisplayDealHistory(
  histories: DealHistoryDto[]
): DealHistoryDisplayModel[] {
  return histories.map((i) => {
    const result = results.find((r) => r.type === +i.roundResult) || results[0];
    let deals = "";
    const date = dayjs(i.dateTime || '').format(
      'YYYY-MM-DD h:mm A'
    );

    if (i.inBetween > 0) {
      deals += `IB = ${i.inBetween} \n`;
    }
    if (i.outBeyond > 0) {
      deals += `OB = ${i.outBeyond} \n`;
    }
    if (i.pair > 0) {
      deals += `P = ${i.pair} \n`;
    }
    if (i.trio > 0) {
      deals += `T = ${i.trio} \n`;
    }

    deals = deals.substring(0, deals.length - 1);

    return {
      result,
      dealNo: i.dealNo,
      lost: i.lostAmount,
      win: i.winAmount,
      deals,
      fullName: i.user.fullName,
      date
    };
  });
}
