
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Users, Award, ExternalLink } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleParticipate = () => {
    window.open('https://higgsfield.ai/create/video', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">100xEngineers</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/leaderboard')}
            className="text-orange-500 border-orange-500 hover:bg-orange-50"
          >
            View Leaderboard
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16 px-6 text-center bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Prompt Masters Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Test your AI prompting skills and compete with the best prompt engineers
          </p>
          <div className="space-x-4">
            <Button
              onClick={handleParticipate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 text-lg rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Participate Now
              <ExternalLink className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/leaderboard')}
              className="text-orange-500 border-orange-500 hover:bg-orange-50 py-3 px-8 text-lg"
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Target className="text-orange-500" size={32} />
                About the Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                The Prompt Masters Challenge is a competition designed to test your ability to craft effective prompts for AI systems. 
                Participants are evaluated on their creativity, precision, and ability to achieve desired outcomes through strategic prompting. 
                Show off your skills and see how you rank against other AI enthusiasts and professionals!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rules Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Award className="text-orange-500" size={32} />
                Competition Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-gray-700">Scores must be between 0-100 points</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-gray-700">Only registered participants can submit scores</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-gray-700">Each participant can submit multiple attempts</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <p className="text-gray-700">Leaderboard updates in real-time</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</div>
                    <p className="text-gray-700">Top 10 participants are displayed publicly</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</div>
                    <p className="text-gray-700">Fair play and original prompts required</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Trophy className="mx-auto text-orange-500 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Rankings</h3>
                <p className="text-gray-600">Real-time leaderboard updates with smooth animations</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Users className="mx-auto text-orange-500 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Performers</h3>
                <p className="text-gray-600">See the best prompt engineers in action</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardContent className="pt-6">
                <Target className="mx-auto text-orange-500 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Skill Testing</h3>
                <p className="text-gray-600">Challenge yourself with advanced prompting tasks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 100xEngineers - Prompt Masters Challenge. Built with passion for AI excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
