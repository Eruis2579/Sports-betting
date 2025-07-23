import MainLayout from "../CustomComponents/MainLayout";
import { BetTypeSubheader, BetType } from './BetTypeSubheader';
import { useState } from 'react';
import { SportsBettingSidebar } from "./SportsBettingSidebar";
import { mockSportsEvents } from '../data/mockSportsData';
import { useMemo } from 'react';
import { SportEventCard } from './SportEventCard';
import { BetSlip } from './BetSlip';
import { BetSlipItem } from '../types';

const betTypes: BetType[] = [
    { id: 'straight', name: 'STRAIGHT' },
    { id: 'parlay', name: 'PARLAY' },
    { id: 'teaser', name: 'TEASER' },
    { id: 'ifbet', name: 'IF BET' },
    { id: 'ar', name: 'A&R' },
    { id: 'propfecta', name: 'PROPFECTA' }
];
export default function () {
    const [activeBetType, setActiveBetType] = useState(betTypes[0].id);
    const [selectedSport, setSelectedSport] = useState('all');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [betSlipItems, setBetSlipItems] = useState<BetSlipItem[]>([]);

    const filteredEvents = useMemo(() => {
        if (selectedSport === 'all') {
          return mockSportsEvents;
        } else if (selectedSport === 'mlb') {
          return mockSportsEvents.filter(event => event.league === 'MLB');
        } else if (selectedSport === 'live') {
          return mockSportsEvents.filter(event => event.isLive);
        } else if (selectedSport === 'upcoming') {
          return mockSportsEvents.filter(event => !event.isLive);
        } else if (selectedSport === 'nfl') {
          return mockSportsEvents.filter(event => event.league === 'NFL');
        } else if (selectedSport === 'tennis') {
          return mockSportsEvents.filter(event => event.sport === 'Tennis');
        } else if (selectedSport === 'soccer') {
          return mockSportsEvents.filter(event => event.sport === 'Soccer');
        } else if (selectedSport === 'basketball') {
          return mockSportsEvents.filter(event => event.sport === 'Basketball');
        }
        return mockSportsEvents;
      }, [selectedSport]);

    const getPageTitle = () => {
        switch (selectedSport) {
          case 'live':
            return `${activeBetType.toUpperCase()} - Live Events`;
          case 'upcoming':
            return `${activeBetType.toUpperCase()} - Starting Soon`;
          case 'mlb':
            return `${activeBetType.toUpperCase()} - MLB`;
          case 'nfl':
            return `${activeBetType.toUpperCase()} - NFL`;
          case 'tennis':
            return `${activeBetType.toUpperCase()} - Tennis`;
          case 'soccer':
            return `${activeBetType.toUpperCase()} - Soccer`;
          case 'basketball':
            return `${activeBetType.toUpperCase()} - Basketball`;
          default:
            return `${activeBetType.toUpperCase()} - All Sports`;
        }
      };

      const handlePlaceBet = () => {
        const totalStake = betSlipItems.reduce((sum, item) => sum + item.stake, 0);
        if (totalStake === 0) {
          window.SM.error('Please enter stake amounts for your selections');
          return;
        }
        window.SM.success('Bet placed successfully!');
        setBetSlipItems([]);
      };

      const handleAddToBetSlip = (eventId: string, selection: string, odds: number) => {
        const event = mockSportsEvents.find(e => e.id === eventId);
        if (!event) return;
    
        const existingItem = betSlipItems.find(item => item.eventId === eventId);
        if (existingItem) {
          window.SM.warning('This selection is already in your bet slip');
          return;
        }
    
        const newItem: BetSlipItem = {
          eventId,
          eventName: `${event.homeTeam} vs ${event.awayTeam}`,
          selection,
          odds,
          stake: 0 // Default stake
        };
    
        setBetSlipItems(prev => [...prev, newItem]);
        window.SM.success(`${selection} added to bet slip`);
      };
    
      const handleRemoveFromBetSlip = (eventId: string) => {
        setBetSlipItems(prev => prev.filter(item => item.eventId !== eventId));
        window.SM.success('Selection removed from bet slip');
      };
    
      const handleUpdateStake = (eventId: string, stake: number) => {
        setBetSlipItems(prev =>
          prev.map(item =>
            item.eventId === eventId ? { ...item, stake } : item
          )
        );
      };
    return (
        <>
            <MainLayout>
                <BetTypeSubheader
                    betTypes={betTypes}
                    activeBetType={activeBetType}
                    onBetTypeChange={setActiveBetType}
                />
                <div className="h-[calc(100vh-128px)] overflow-y-auto">
                    <SportsBettingSidebar
                        selectedSport={selectedSport}
                        onSportChange={setSelectedSport}
                        activeBetType={activeBetType}
                        collapsed={sidebarCollapsed}
                        onCollapse={setSidebarCollapsed}
                    />
                    <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
                        <div className="p-6 bg-slate-900" style={{ minHeight: 'calc(100vh - 168px)' }}>
                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            {getPageTitle()}
                                        </h2>
                                        <div className="text-gray-400">
                                            {filteredEvents.length} events available
                                        </div>
                                    </div>

                                    {filteredEvents.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-gray-400 text-lg">No events available for this sport</div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                                            {filteredEvents.map(event => (
                                                <SportEventCard
                                                    key={event.id}
                                                    event={event}
                                                    onAddToBetSlip={handleAddToBetSlip}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="w-80 flex-shrink-0">
                                    <div className="sticky top-10">
                                        <BetSlip
                                            betSlipItems={betSlipItems}
                                            onRemoveItem={handleRemoveFromBetSlip}
                                            onUpdateStake={handleUpdateStake}
                                            onPlaceBet={handlePlaceBet}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}