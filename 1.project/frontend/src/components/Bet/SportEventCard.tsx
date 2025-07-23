import React from 'react';
import { Card, Button, Badge, Space, Typography } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { SportEvent } from '../types';

const { Text, Title } = Typography;

interface SportEventCardProps {
  event: SportEvent;
  onAddToBetSlip: (eventId: string, selection: string, odds: number) => void;
}

export const SportEventCard: React.FC<SportEventCardProps> = ({
  event,
  onAddToBetSlip
}) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + 'p';
    }
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + 'p';
  };

  const formatDate = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getTeamIcon = (teamName: string, index: number) => {
    const colors = ['bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-pink-600'];
    return colors[index % colors.length];
  };

  // Generate betting lines
  const spread = event.sport === 'Baseball' ? 1.5 : 
                event.sport === 'Football' ? 7.0 : 
                event.sport === 'Basketball' ? 5.5 : 3.5;
  
  const total = event.sport === 'Baseball' ? 8.5 : 
               event.sport === 'Football' ? 47.5 : 
               event.sport === 'Basketball' ? 215.5 : 45.5;

  const spreadOdds = { home: -110, away: -110 };
  const totalOdds = { over: -105, under: -115 };

  return (
    <Card
      className="hover:border-emerald-500 transition-all"
      style={{ 
        background: '#1e293b', 
        borderColor: '#334155',
        color: 'white'
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex justify-between items-start mb-3">
        <Space>
          <Text className="text-sm font-semibold text-emerald-400">{event.league}</Text>
          {event.isLive && (
            <Badge 
              status="processing" 
              text={
                <Space size="small">
                  <PlayCircleOutlined className="text-red-400" />
                  <Text className="text-xs text-red-400 font-semibold">LIVE</Text>
                </Space>
              }
            />
          )}
        </Space>
        <div className="text-right">
          <Text className="text-xs text-gray-400">{formatTime(event.startTime)}</Text>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <Space size="small">
            <div className={`w-6 h-6 ${getTeamIcon(event.homeTeam, 0)} rounded-full flex items-center justify-center`}>
              <Text className="text-white text-xs font-bold">
                {event.homeTeam.charAt(0)}
              </Text>
            </div>
            <Text className="text-sm font-semibold text-white">{event.homeTeam}</Text>
          </Space>
          {event.score && (
            <Text className="font-bold text-base text-white">{event.score.home}</Text>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Space size="small">
            <div className={`w-6 h-6 ${getTeamIcon(event.awayTeam, 1)} rounded-full flex items-center justify-center`}>
              <Text className="text-white text-xs font-bold">
                {event.awayTeam.charAt(0)}
              </Text>
            </div>
            <Text className="text-sm font-semibold text-white">{event.awayTeam}</Text>
          </Space>
          {event.score && (
            <Text className="font-bold text-base text-white">{event.score.away}</Text>
          )}
        </div>
      </div>

      {/* Betting Options */}
      <div className="space-y-3">
        {/* Moneyline */}
        <div>
          <Text className="text-xs text-gray-400 block mb-2">MONEYLINE</Text>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="bg-slate-700 hover:bg-emerald-600 border-slate-600 hover:border-emerald-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `${event.homeTeam} ML`, event.odds.home)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">{event.homeTeam}</Text>
                <Text className="font-bold text-emerald-400">{event.odds.home > 0 ? '+' : ''}{event.odds.home.toFixed(0)}</Text>
              </div>
            </Button>
            <Button 
              className="bg-slate-700 hover:bg-orange-600 border-slate-600 hover:border-orange-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `${event.awayTeam} ML`, event.odds.away)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">{event.awayTeam}</Text>
                <Text className="font-bold text-orange-400">{event.odds.away > 0 ? '+' : ''}{event.odds.away.toFixed(0)}</Text>
              </div>
            </Button>
          </div>
        </div>

        {/* Spread */}
        <div>
          <Text className="text-xs text-gray-400 block mb-2">SPREAD</Text>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="bg-slate-700 hover:bg-blue-600 border-slate-600 hover:border-blue-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `${event.homeTeam} ${spread > 0 ? '+' : ''}${spread}`, 1.91)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">{event.homeTeam}</Text>
                <Text className="font-bold text-blue-400">{spread > 0 ? '+' : ''}{spread} ({spreadOdds.home})</Text>
              </div>
            </Button>
            <Button 
              className="bg-slate-700 hover:bg-purple-600 border-slate-600 hover:border-purple-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `${event.awayTeam} ${-spread > 0 ? '+' : ''}${-spread}`, 1.91)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">{event.awayTeam}</Text>
                <Text className="font-bold text-purple-400">{-spread > 0 ? '+' : ''}{-spread} ({spreadOdds.away})</Text>
              </div>
            </Button>
          </div>
        </div>

        {/* Total */}
        <div>
          <Text className="text-xs text-gray-400 block mb-2">TOTAL</Text>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              className="bg-slate-700 hover:bg-green-600 border-slate-600 hover:border-green-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `Over ${total}`, 1.95)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">OVER</Text>
                <Text className="font-bold text-green-400">{total} ({totalOdds.over})</Text>
              </div>
            </Button>
            <Button 
              className="bg-slate-700 hover:bg-red-600 border-slate-600 hover:border-red-500 text-white"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white',
                height: 'auto',
                padding: '8px'
              }}
              onClick={() => onAddToBetSlip(event.id, `Under ${total}`, 1.87)}
            >
              <div className="text-center">
                <Text className="text-xs text-gray-300 block">UNDER</Text>
                <Text className="font-bold text-red-400">{total} ({totalOdds.under})</Text>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {event.isLive && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <Space size="small">
            <ClockCircleOutlined className="text-red-400" />
            <Text className="text-xs text-red-400">Live betting available</Text>
          </Space>
        </div>
      )}
    </Card>
  );
};