
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Users, Award, ExternalLink, Gift } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleParticipate = () => {
    window.open('https://higgsfield.ai/create/video', '_blank');
  };

  const handleCheckGuidelines = () => {
    window.open('https://100xengineers.notion.site/Prompt-Masters-Challenge-Guidelines-2196a631690380a3ae43f66fa86e9986?source=copy_link', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"
            onClick={() => navigate('/')}
          >
            100xEngineers
          </h1>
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
            <CardContent className="text-left space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                The Prompt Master's Challenge is a fast-paced creative competition where you'll prompt Higgsfield AI to recreate a scene between two keyframes from a Hollywood classic.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                You will be given two scene options, and each scene will have:
              </p>
              <ul className="ml-6 space-y-2 text-lg text-gray-600">
                <li>• A start image</li>
                <li>• An end image</li>
              </ul>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your task is to choose one scene and craft a single prompt that guides Higgsfield AI to generate the full sequence in between.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-semibold">
                You'll have 5 minutes to write your prompt and complete the video generation.
              </p>
              <div className="pt-4 text-center">
                <Button
                  onClick={handleCheckGuidelines}
                  variant="outline"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50 inline-flex items-center gap-2"
                >
                  Check Guidelines
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
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
                Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">•</div>
                  <p className="text-gray-700"><strong>Time Limit:</strong> You have 5 minutes to write your prompt and complete the AI generation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">•</div>
                  <p className="text-gray-700"><strong>Choose One Scene:</strong> You may select either of the two scenes provided, but can submit only one final video.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">•</div>
                  <p className="text-gray-700"><strong>Original Prompts Only:</strong> Your prompt must be entirely your own work.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">•</div>
                  <p className="text-gray-700"><strong>Higgsfield AI Only:</strong> Use of any tools other than Higgsfield AI is not allowed.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">•</div>
                  <p className="text-gray-700"><strong>On-Time Submission:</strong> Submissions must be fully generated and submitted within the 5-minute window.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Gift className="text-orange-500" size={32} />
                Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <Trophy className="text-orange-500 mr-4" size={48} />
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">100x Vouchers</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Top scorers will receive 100x Vouchers that can be redeemed for exclusive benefits and perks within the 100x community.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Users className="text-orange-500 mr-4" size={48} />
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Top Performers Leaderboard</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get recognized and listed on our prestigious top performers leaderboard, showcasing your prompt engineering excellence.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
