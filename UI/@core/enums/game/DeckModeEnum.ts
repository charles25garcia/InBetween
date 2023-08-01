// Should be sync to the tbl_deck_mode db table
export enum DeckModeEnum {
  Shuffle = 1,
  DealOpen = 2,
  DealClosed = 3,
  OpenFirstCard = 4,
  OpenSecondCard = 5,
  OpenThirdCard = 6,
  Result = 7,
  Loading = 1000, // Loading is for UI only.
}
