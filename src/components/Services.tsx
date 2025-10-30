import React from 'react';

const Services: React.FC = () => (
  <section id="services" className="py-16 bg-gray-50 relative">
    <div className="container mx-auto px-6">
  <h3 id="section-one-title" className="text-4xl font-bold text-center mb-12 text-gray-800 neon-text">
        The Foundation of Data Analysis
      </h3>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h4 className="card-title">What is Data Analysis?</h4>
            </div>
            <div className="card-content">
              Data analysis is the systematic process of inspecting, cleaning, transforming, and modeling data to discover useful information, draw conclusions, and support decision-making. It involves statistical techniques, computational methods, and domain expertise to extract meaningful patterns from raw data.
            </div>
          </div>
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <h4 className="card-title">Types of Data Analysis</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Descriptive:</strong> What happened? (Historical data summary)</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Diagnostic:</strong> Why did it happen? (Root cause analysis)</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Predictive:</strong> What might happen? (Future trend forecasting)</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Prescriptive:</strong> What should we do? (Actionable recommendations)</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547A8.014 8.014 0 004 21h4.17a6 6 0 005.66 0H20a8.014 8.014 0 00-.572-5.572zM8 9a4 4 0 018 0v2a4 4 0 11-8 0V9z" /></svg>
              <h4 className="card-title">Key Components</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Data Collection:</strong> Gathering relevant data from various sources including databases, APIs, surveys, and sensors.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div><strong>Data Processing:</strong> Cleaning, transforming, and structuring data to ensure quality and consistency.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Statistical Analysis:</strong> Applying mathematical and statistical methods to identify patterns and relationships.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div><strong>Visualization:</strong> Creating charts, graphs, and dashboards to communicate findings effectively.</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
