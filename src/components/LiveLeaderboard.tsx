
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Users } from 'lucide-react';
import LeaderboardEntry from './LeaderboardEntry';

interface Participant {
  id: string;
  name: string;
  score: number;
  avatar_url?: string;
}

const LiveLeaderboard = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [previousRanks, setPreviousRanks] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data) {
        // Store previous ranks before updating
        const newPreviousRanks: {[key: string]: number} = {};
        participants.forEach((participant, index) => {
          newPreviousRanks[participant.id] = index + 1;
        });
        setPreviousRanks(newPreviousRanks);
        
        setParticipants(data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLeaderboard();

    // Set up real-time subscription
    const channel = supabase
      .channel('participants-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchLeaderboard();
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchLeaderboard();
  };

  const handleSubmitScore = () => {
    navigate('/submit-score', { state: { fromLeaderboard: true } });
  };

  if (isLoading && participants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">100xEngineers</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleSubmitScore}
              className="text-orange-500 border-orange-500 hover:bg-orange-50"
            >
              Submit Score
            </Button>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold flex items-center">
                <Users className="w-8 h-8 mr-3" />
                Live Leaderboard
              </CardTitle>
              <div className="text-right">
                <div className="text-sm opacity-90">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
                <div className="text-sm opacity-75">
                  Top {participants.length} participants
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {participants.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No participants yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Be the first to submit a score!
                </p>
                <Button
                  onClick={handleSubmitScore}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Submit Score
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {participants.map((participant, index) => (
                  <LeaderboardEntry
                    key={participant.id}
                    participant={participant}
                    rank={index + 1}
                    previousRank={previousRanks[participant.id]}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Update Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live updates enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLeaderboard;
