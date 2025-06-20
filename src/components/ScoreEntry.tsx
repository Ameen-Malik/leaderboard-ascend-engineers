import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const ScoreEntry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !score.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    if (isNaN(Number(score)) || Number(score) < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid score",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('participants').insert([{
        name: name.trim(),
        score: Number(score),
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      }]);
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Score submitted successfully"
      });

      // Navigate to leaderboard
      navigate('/leaderboard');
    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: "Error",
        description: "Failed to submit score. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">100xEngineers</h1>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Submit Your Score
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Enter your details to join the leaderboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="w-full" disabled={isSubmitting} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (registered mail only)</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full" disabled={isSubmitting} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Score
                </label>
                <Input type="number" value={score} onChange={e => setScore(e.target.value)} placeholder="Enter your score" className="w-full" min="0" disabled={isSubmitting} />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => navigate('/leaderboard')} className="text-orange-500 border-orange-500 hover:bg-orange-50">
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default ScoreEntry;