import { CardModel } from "~/@core/models";
import { GameHistoryDto } from "~/@core/dtos";

export class SpecifyWinnerClass {
  checkWinningBet([
    leftCard,
    middleCard,
    rightCard,
  ]: CardModel[]): GameHistoryDto {
    let betWinner = "";

    if (
      middleCard.value > leftCard.value &&
      middleCard.value < rightCard.value
    ) {
      betWinner = "IN BETWEEN";
    }

    if (
      middleCard.value < leftCard.value &&
      middleCard.value > rightCard.value
    ) {
      betWinner = "IN BETWEEN";
    }

    if (
      middleCard.value > leftCard.value &&
      middleCard.value > rightCard.value
    ) {
      betWinner = "OUT BEYOND";
    }

    if (
      middleCard.value < leftCard.value &&
      middleCard.value < rightCard.value
    ) {
      betWinner = "OUT BEYOND";
    }

    if (leftCard.value === rightCard.value) {
      betWinner = "PAIR";
    }

    if (leftCard.value === middleCard.value) {
      betWinner = "PAIR";
    }

    if (rightCard.value === leftCard.value) {
      betWinner = "PAIR";
    }

    if (rightCard.value === middleCard.value) {
      betWinner = "PAIR";
    }

    if (
      leftCard.value === middleCard.value &&
      leftCard.value === rightCard.value
    ) {
      betWinner = "TRIO";
    }

    const firstCard = `${leftCard.value} - ${leftCard.type}`;
    const secondCard = `${middleCard.value} - ${middleCard.type}`;
    const lastCard = `${rightCard.value} - ${rightCard.type}`;

    const result: GameHistoryDto = {
      winning_bet: betWinner,
      first_card: firstCard,
      middle_card: secondCard,
      last_card: lastCard,
    };

    return result;
  }
}
