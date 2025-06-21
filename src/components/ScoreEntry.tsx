
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminAuth from './AdminAuth';

const ScoreEntry = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user came from leaderboard page
  useEffect(() => {
    const fromLeaderboard = location.state?.fromLeaderboard;
    if (!fromLeaderboard) {
      // Redirect to leaderboard if not coming from there
      navigate('/leaderboard');
    }
  }, [location, navigate]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !score.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const scoreNumber = Number(score);
    if (isNaN(scoreNumber) || scoreNumber < 0 || scoreNumber > 100) {
      toast({
        title: "Error",
        description: "Please enter a valid score between 0-100",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('participants')
        .insert([
          {
            name: name.trim(),
            score: scoreNumber,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Score submitted successfully",
      });

      // Navigate to leaderboard
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: "Error",
        description: "Failed to submit score. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show admin auth if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 
          className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"
          onClick={() => navigate('/')}
        >
          100xEngineers
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Submit Your Score
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Enter your Prompt Masters Challenge score (0-100)
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter participant name"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (registered mail only)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter participant email"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Score (0-100)
                </label>
                <Input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter score"
                  className="w-full"
                  min="0"
                  max="100"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/leaderboard')}
                className="text-gray-600 hover:text-gray-800 w-full"
              >
                Back to Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreEntry;
