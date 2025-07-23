export interface League {
    id: string;
    name: string;
    sport: string;
    icon: string;
    isLive?: boolean;
    subcategories: string[];
}
export interface SportEvent {
    id: string;
    sport: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    startTime: string;
    status: string;
    odds: { home: number; away: number };
    isLive: boolean;
    score?: { home: number; away: number };
}
export interface Match {
    id: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    awayOdds: number;
    isLive?: boolean;
    time?: string;
    homeScore?: number;
    awayScore?: number;
}

export interface BetType {
    id: string;
    name: string;
    isActive: boolean;
}


export interface Match {
    id: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    awayOdds: number;
    isLive?: boolean;
    time?: string;
    homeScore?: number;
    awayScore?: number;
}

export interface BetType {
    id: string;
    name: string;
    isActive: boolean;
}

export interface BetSlipItem {
    eventId: string;
    eventName: string;
    selection: string;
    odds: number;
    stake: number;
}