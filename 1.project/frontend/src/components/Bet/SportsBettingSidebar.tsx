import React from 'react';
import { useState } from 'react';
import { Input, Badge, Collapse, Space, Typography } from 'antd';
import { SearchOutlined, FireOutlined, ClockCircleOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
import { betTypeLeagues, BetTypeLeague } from '../data/betTypeData';

const { Panel } = Collapse;
const { Text } = Typography;

interface SportsBettingSidebarProps {
  selectedSport: string;
  onSportChange: (sport: string) => void;
  activeBetType: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const SportsBettingSidebar: React.FC<SportsBettingSidebarProps> = ({
  selectedSport,
  onSportChange,
  activeBetType,
  collapsed = false,
  onCollapse
}) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['mlb']);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(['MLB']);

  const currentLeagues = betTypeLeagues[activeBetType] || [];

  const toggleLeague = (leagueId: string) => {
    setActiveKeys(prev =>
      prev.includes(leagueId)
        ? prev.filter(id => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const handleSubcategoryChange = (leagueId: string, subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories(prev => [...prev, subcategory]);
      onSportChange(leagueId);
    } else {
      setSelectedSubcategories(prev => prev.filter(sub => sub !== subcategory));
    }
  };

  const handleQuickFilter = (filterType: string) => {
    onSportChange(filterType);
  };
  return (
    <div 
      className={`fixed left-0 bg-slate-800 border-r border-slate-700 overflow-y-auto z-20 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-80'
      }`}
      style={{ height: 'calc(100vh - 128px)' }}
    >
      {!collapsed && (
        <div className="p-4 border-b border-slate-700" style={{ background: '#1e293b' }}>
          <Input
              placeholder="Search events..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="mb-4"
              style={{ 
                background: '#334155', 
                borderColor: '#475569',
                color: 'white'
              }}
            />
        
          <Space direction="vertical" className="w-full" size="small">
          <div 
            className="flex items-center justify-between text-red-400 cursor-pointer hover:bg-slate-700 p-3 rounded-lg transition-colors"
            onClick={() => handleQuickFilter('live')}
          >
            <Space>
              <FireOutlined />
              <Text className="font-semibold text-red-400">Live Events</Text>
            </Space>
            <Badge count={3} style={{ backgroundColor: '#dc2626' }} />
          </div>
          
          <div 
            className="flex items-center justify-between text-emerald-400 cursor-pointer hover:bg-slate-700 p-3 rounded-lg transition-colors"
            onClick={() => handleQuickFilter('upcoming')}
          >
            <Space>
              <ClockCircleOutlined />
              <Text className="font-semibold text-emerald-400">Starting Soon</Text>
            </Space>
            <Badge count={7} style={{ backgroundColor: '#059669' }} />
          </div>
          </Space>
      </div>
      )}

      <div className="bg-slate-900 text-white px-4 py-3 font-semibold text-center border-b border-slate-700" style={{ background: '#0f172a' }}>
        {collapsed ? 'L' : 'LEAGUES'}
      </div>
      
      {!collapsed && (
        <Collapse 
          activeKey={activeKeys}
          onChange={setActiveKeys}
          ghost
          expandIcon={({ isActive }) => isActive ? <DownOutlined /> : <RightOutlined />}
          className="bg-slate-800"
          style={{ background: '#1e293b' }}
        >
          {currentLeagues.map((league) => (
            <Panel
              key={league.id}
              header={
                <Space className="text-white">
                  <span className="text-lg">{league.icon}</span>
                  <Text className="font-semibold text-white">{league.name}</Text>
                  {league.id === 'live' && (
                    <Badge status="processing" text="LIVE" style={{ color: 'white' }} />
                  )}
                </Space>
              }
              className={league.id === 'live' ? 'bg-red-600' : 'bg-slate-700'}
              style={{ 
                background: league.id === 'live' ? '#dc2626' : '#334155',
                borderColor: '#475569'
              }}
            >
              <div className="bg-slate-600" style={{ background: '#475569' }}>
                  {league.subcategories.map((subcategory, index) => (
                    <div key={index} className="flex items-center px-4 py-2 hover:bg-slate-500 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mr-3 rounded"
                       checked={selectedSubcategories.includes(subcategory)}
                       onChange={(e) => handleSubcategoryChange(league.id, subcategory, e.target.checked)}
                    />
                      <Text className="text-sm text-gray-200">{subcategory}</Text>
                    </div>
                  ))}
              </div>
            </Panel>
          ))}
        </Collapse>
      )}

      {!collapsed && (
        <div className="p-4 border-t border-slate-700 mt-4" style={{ background: '#1e293b' }}>
          <Text className="text-xs text-gray-400 block mb-3">BET TYPE: {activeBetType.toUpperCase()}</Text>
          <Space direction="vertical" className="w-full">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-600 p-3 rounded-lg text-white cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleQuickFilter('all')}
          >
            <Text className="text-sm font-semibold text-white block">{activeBetType.charAt(0).toUpperCase() + activeBetType.slice(1)} Builder</Text>
            <Text className="text-xs opacity-90 text-white">Create custom {activeBetType} bets</Text>
          </div>
          </Space>
      </div>
      )}
    </div>
  );
};