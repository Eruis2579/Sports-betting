import React from 'react';
import { Card, Button, InputNumber, Space, Typography, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BetSlipItem } from '../types';

const { Text, Title } = Typography;

interface BetSlipProps {
  betSlipItems: BetSlipItem[];
  onRemoveItem: (eventId: string) => void;
  onUpdateStake: (eventId: string, stake: number) => void;
  onPlaceBet: () => void;
}

export const BetSlip: React.FC<BetSlipProps> = ({
  betSlipItems,
  onRemoveItem,
  onUpdateStake,
  onPlaceBet
}) => {
  const totalStake = betSlipItems.reduce((sum, item) => sum + item.stake, 0);
  const totalOdds = betSlipItems.reduce((product, item) => product * item.odds, 1);
  const potentialWin = totalStake * totalOdds;

  if (betSlipItems.length === 0) {
    return (
      <Card 
        className="w-full h-fit"
        style={{ 
          background: '#1e293b', 
          borderColor: '#334155'
        }}
      >
        <div className="text-center py-8">
          <Text className="text-gray-400">Your bet slip is empty</Text>
          <div className="mt-2 text-sm text-gray-500">
            <Text className="text-sm text-gray-500">Click on odds to add selections</Text>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="w-full h-fit sticky top-20"
      style={{ 
        background: '#1e293b', 
        borderColor: '#334155'
      }}
      title={
        <div className="flex items-center justify-between">
          <Title level={4} className="text-white m-0">Bet Slip</Title>
          <Text className="text-xs text-gray-400">
          {betSlipItems.length} selection{betSlipItems.length !== 1 ? 's' : ''}
          </Text>
        </div>
      }
      headStyle={{ 
        background: '#1e293b', 
        borderBottom: '1px solid #334155',
        color: 'white'
      }}
    >
      
      <Space direction="vertical" className="w-full" size="middle">
        {betSlipItems.map((item) => (
          <Card 
            key={item.eventId} 
            size="small"
            className="bg-slate-700"
            style={{ 
              background: '#334155', 
              borderColor: '#475569'
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <Text className="font-semibold text-xs block text-white">{item.selection}</Text>
                <Text className="text-xs text-gray-400">{item.eventName}</Text>
              </div>
              <Space>
                <Text className="font-bold text-emerald-400 text-sm">{item.odds.toFixed(2)}</Text>
                <Button 
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => onRemoveItem(item.eventId)}
                  className="text-red-400 hover:text-red-300"
                />
              </Space>
            </div>
            <div className="flex items-center space-x-2">
              <Text className="text-xs text-gray-300">Stake:</Text>
              <InputNumber
                value={item.stake}
                onChange={(e) => onUpdateStake(item.eventId, e as any)}
                className="flex-1"
                size="small"
                placeholder="$0.00"
                min={0}
                step={0.01}
                style={{ 
                  background: '#475569', 
                  borderColor: '#64748b',
                  color: 'white'
                }}
              />
            </div>
            <div className="mt-2 text-right">
              <Text className="text-xs text-gray-400">
                To win: <Text className="font-semibold text-emerald-400">
                  ${(item.stake * item.odds).toFixed(2)}
                </Text>
              </Text>
            </div>
          </Card>
        ))}

        <Divider style={{ borderColor: '#475569' }} />

        <Space direction="vertical" className="w-full">
          <div className="flex justify-between">
            <Text className="font-semibold text-gray-300">Total Stake:</Text>
            <Text className="font-semibold text-white">${totalStake.toFixed(2)}</Text>
          </div>
          <div className="flex justify-between">
            <Text className="font-semibold text-gray-300">Total Odds:</Text>
            <Text className="font-semibold text-emerald-400">{totalOdds.toFixed(2)}</Text>
          </div>
          <div className="flex justify-between text-lg">
            <Text className="font-bold text-white">Potential Win:</Text>
            <Text className="font-bold text-emerald-400">${potentialWin.toFixed(2)}</Text>
          </div>
        </Space>

        <Button 
          type="primary"
          size="large"
          block
          disabled={totalStake === 0}
          onClick={onPlaceBet}
          className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 font-semibold"
          style={{ 
            background: totalStake === 0 ? '#475569' : '#059669',
            borderColor: totalStake === 0 ? '#475569' : '#059669'
          }}
        >
          Place Bet - ${potentialWin.toFixed(2)}
        </Button>
      </Space>
    </Card>
  );
};