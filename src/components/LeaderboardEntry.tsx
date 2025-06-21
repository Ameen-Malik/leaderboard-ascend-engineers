import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntryProps {
  participant: {
    id: string;
    name: string;
    score: number;
    avatar_url?: string;
  };
  rank: number;
  previousRank?: number;
}

const LeaderboardEntry = ({ participant, rank, previousRank }: LeaderboardEntryProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">{rank}</span>
          </div>
        );
    }
  };

  const getRankChange = () => {
    if (previousRank === undefined) return null;
    if (previousRank > rank) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
          ↑ {previousRank - rank}
        </Badge>
      );
    } else if (previousRank < rank) {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 ml-2">
          ↓ {rank - previousRank}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600 ml-2">
        -
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className={`
        flex items-center justify-between p-4 rounded-lg border transition-all duration-1000 ease-in-out
        ${rank <= 3 
          ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-md' 
          : 'bg-white border-gray-200 hover:shadow-sm'
        }
      `}
      style={{
        transform: previousRank !== undefined && previousRank !== rank 
          ? 'scale(1.02)' 
          : 'scale(1)',
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {getRankIcon(rank)}
        </div>
        
        <Avatar className="w-12 h-12">
          <AvatarImage src={participant.avatar_url} alt={participant.name} />
          <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">
            {getInitials(participant.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-semibold text-gray-900">{participant.name}</h3>
            {getRankChange()}
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-2xl font-bold text-orange-600">
          {participant.score.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">points</div>
      </div>
    </div>
  );
};

export default LeaderboardEntry;
