

INSERT INTO `inbetween-DB`.`tbl_deck_mode`
(`mode`,
`timer`,
`name`,
`cardIndexes`)
VALUES
(1, 5000, 'Shuffle', null), 
(2, 30000, 'DealOpen', null), 
(3, 5000, 'DealClosed', null), 
(4, 5000, 'OpenFirstCard', '0'), 
(5, 5000, 'OpenSecondCard', '0,2'),
(6, 5000, 'OpenThirdCard', '*'),
(7, 10000, 'Result', '*');