export interface BetTypeLeague {
    id: string;
    name: string;
    icon: string;
    subcategories: string[];
  }
  
  export const betTypeLeagues: Record<string, BetTypeLeague[]> = {
    straight: [
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['MLB', 'MLB-Futures']
      },
      {
        id: 'golf',
        name: 'GOLF',
        icon: '⛳',
        subcategories: ['Ryder Cup']
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        icon: '🎭',
        subcategories: ['Lottery Props']
      },
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['NFL-Week 1', 'NFL-Regular Season Wins', 'NFL-Make the Playoffs']
      },
      {
        id: 'live',
        name: 'LIVE',
        icon: '🔴',
        subcategories: ['MLB-LIVE', 'NFL-LIVE']
      },
      {
        id: 'tennis',
        name: 'Tennis',
        icon: '🎾',
        subcategories: ['Tennis-Mens', 'Tennis-Womens']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['NBA', 'WNBA']
      }
    ],
    parlay: [
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['MLB', 'MLB-Alternate Lines']
      },
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['Week 1', 'Week 2', 'Playoffs']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['NBA-Parlay', 'College Basketball']
      },
      {
        id: 'tennis',
        name: 'Tennis',
        icon: '🎾',
        subcategories: ['ATP-Parlay', 'WTA-Parlay']
      }
    ],
    teaser: [
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['6-Point Teaser', '6.5-Point Teaser', '7-Point Teaser']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['4-Point Teaser', '4.5-Point Teaser', '5-Point Teaser']
      },
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['Run Line Teaser', 'Total Teaser']
      }
    ],
    ifbet: [
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['If Win Only', 'If Win/Push', 'Reverse If Bet']
      },
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['If Win Only', 'If Win/Push', 'Reverse If Bet']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['If Win Only', 'If Win/Push']
      }
    ],
    ar: [
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['Action Reverse', 'Win Reverse']
      },
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['Action Reverse', 'Win Reverse', 'If Win/Tie Reverse']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['Action Reverse', 'Win Reverse']
      }
    ],
    propfecta: [
      {
        id: 'mlb',
        name: 'MLB',
        icon: '⚾',
        subcategories: ['Player Props Combo', 'Team Props Combo', 'Game Props Combo']
      },
      {
        id: 'nfl',
        name: 'NFL',
        icon: '🏈',
        subcategories: ['Player Props Combo', 'Team Props Combo', 'Game Props Combo']
      },
      {
        id: 'basketball',
        name: 'Basketball',
        icon: '🏀',
        subcategories: ['Player Props Combo', 'Team Props Combo']
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        icon: '🎭',
        subcategories: ['Awards Combo', 'Reality TV Combo']
      }
    ]
  };