import { DeckHttp } from "~/@core/https";

export function useDeckHelper() {
  function start(collback: (param: { data: string }) => void): void {
    DeckHttp.deckEventSource().onmessage = collback;
  }
  //   ({ data }) => {
  //     deck.value = JSON.parse(data) as DeckConfigModel;
  //   }
  return { start };
}
