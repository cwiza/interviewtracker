import React from 'react';

const App = () => {
  const [interviews, setInterviews] = React.useState([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [insights, setInsights] = React.useState(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [aiNotAvailable, setAiNotAvailable] = React.useState(false);
  const [newInterview, setNewInterview] = React.useState({
    company: '',
    position: '',
    interviewType: '',
    date: '',
    interviewer: '',
    questions: '',
    feedback: '',
    myReflection: '',
    outcome: 'pending'
  });

  // Load data from localStorage
  React.useEffect(() => {
    const savedInterviews = localStorage.getItem('interview-insights-data');
    if (savedInterviews) {
      try {
        setInterviews(JSON.parse(savedInterviews));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage
  React.useEffect(() => {
    if (interviews.length > 0) {
      localStorage.setItem('interview-insights-data', JSON.stringify(interviews));
    }
  }, [interviews]);

  const handleInputChange = (field, value) => {
    setNewInterview(prev => ({ ...prev, [field]: value }));
  };

  const addInterview = () => {
    if (newInterview.company && newInterview.position) {
      const interview = {
        ...newInterview,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setInterviews([...interviews, interview]);
      setNewInterview({
        company: '',
        position: '',
        interviewType: '',
        date: '',
        interviewer: '',
        questions: '',
        feedback: '',
        myReflection: '',
        outcome: 'pending'
      });
      setShowAddForm(false);
    }
  };

  const generateMockInsights = () => {
    const mockInsights = {
      overallTrends: "Based on your interview data, you're showing strong progress in articulating UX processes. Companies are consistently asking about your research methodology and design systems experience.",
      strengthsIdentified: [
        "Strong user research background and methodology",
        "Clear communication of design decisions",
        "Experience with cross-functional collaboration"
      ],
      areasForImprovement: [
        "Practice quantifying business impact of design decisions",
        "Strengthen portfolio case studies with measurable outcomes",
        "Develop more concrete examples of AI/ML integration in UX"
      ],
      commonQuestions: [
        "Walk me through your design process",
        "How do you handle stakeholder pushback on design decisions?",
        "Describe a time when user research changed your design direction"
      ],
      interviewerInsights: "Design managers are particularly focused on your ability to mentor junior designers and influence product strategy. Engineering-focused interviewers want to understand how you work with technical constraints.",
      actionableRecommendations: [
        "Prepare 2-3 stories that demonstrate measurable business impact",
        "Practice explaining complex UX concepts to non-design stakeholders",
        "Research each company's design culture and AI adoption"
      ],
      prepSuggestions: [
        "Create a 'metrics cheat sheet' with key performance indicators from past projects",
        "Practice whiteboarding design challenges with time constraints",
        "Prepare questions about the company's design culture and AI adoption"
      ]
    };
    setInsights(mockInsights);
    setAiNotAvailable(false);
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-secondary';
    }
  };

  const renderDashboard = () => {
    return (
      <div className="layout">
        <div className="grid">
          <div className="card">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-secondary">Total Interviews</p>
                <p className="text-primary text-2xl">{interviews.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-secondary">Positive Outcomes</p>
                <p className="text-success text-2xl">
                  {interviews.filter(i => i.outcome === 'positive').length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-secondary">Companies</p>
                <p className="text-primary text-2xl">
                  {new Set(interviews.map(i => i.company)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-secondary">Pending</p>
                <p className="text-warning text-2xl">
                  {interviews.filter(i => i.outcome === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3>Recent Interviews</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Interview
            </button>
          </div>
          {interviews.length === 0 ? (
            <div className="text-center py-8">
              <svg className="h-12 w-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-secondary">No interviews tracked yet. Add your first interview to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {interviews.slice(-5).reverse().map(interview => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{interview.position}</h4>
                      <p className="text-secondary">{interview.company}</p>
                      <p className="text-sm text-secondary">{interview.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getOutcomeColor(interview.outcome)}`}>
                      {interview.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAddForm = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Add New Interview</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                value={newInterview.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Position"
                value={newInterview.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Interview Type (e.g., Phone, Panel, Portfolio Review)"
                value={newInterview.interviewType}
                onChange={(e) => handleInputChange('interviewType', e.target.value)}
                className="input-field"
              />
              <input
                type="date"
                value={newInterview.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-field"
              />
            </div>
            <input
              type="text"
              placeholder="Interviewer Name/Role"
              value={newInterview.interviewer}
              onChange={(e) => handleInputChange('interviewer', e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Key questions asked during the interview..."
              value={newInterview.questions}
              onChange={(e) => handleInputChange('questions', e.target.value)}
              className="input-field h-24"
            />
            <textarea
              placeholder="Feedback received from interviewer..."
              value={newInterview.feedback}
              onChange={(e) => handleInputChange('feedback', e.target.value)}
              className="input-field h-24"
            />
            <textarea
              placeholder="My reflection on the interview experience..."
              value={newInterview.myReflection}
              onChange={(e) => handleInputChange('myReflection', e.target.value)}
              className="input-field h-24"
            />
            <select
              value={newInterview.outcome}
              onChange={(e) => handleInputChange('outcome', e.target.value)}
              className="input-field"
            >
              <option value="pending">Pending</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={addInterview}
              disabled={!newInterview.company || !newInterview.position}
              className="btn btn-primary disabled:opacity-50"
            >
              Add Interview
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="layout">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Interview Insights Tracker</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`btn ${activeTab === 'interviews' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Interviews
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`btn ${activeTab === 'insights' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Insights
            </button>
          </div>
        </div>
        {showAddForm && renderAddForm()}
        {activeTab === 'dashboard' && renderDashboard()}
      </div>
    </div>
  );
}

export default App;
