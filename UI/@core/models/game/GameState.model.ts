import { GameModel } from "./Game.model";

export interface GameStateModel {
  counter: globalThis.Ref<number>;
  cardShuffle: globalThis.Ref<boolean>;
  cardShuffleCountDown: number;
  game: GameModel;
}
