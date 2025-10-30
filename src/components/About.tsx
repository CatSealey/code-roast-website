import React from 'react';

const About: React.FC = () => (
  <section id="about" className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
  <h3 id="section-three-title" className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Approach
      </h3>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <h4 className="card-title">Statistical Methods</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Regression Analysis:</strong> Examining relationships between variables to predict outcomes and identify influential factors.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div><strong>Hypothesis Testing:</strong> Statistical procedures to validate assumptions and test theories using sample data.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Time Series Analysis:</strong> Analyzing data points collected over time to identify trends, patterns, and seasonal variations.</div></li>
              </ul>
            </div>
          </div>
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <h4 className="card-title">Machine Learning Approaches</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Supervised Learning:</strong> Training models on labeled data to make predictions</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Unsupervised Learning:</strong> Discovering hidden patterns without labels</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Clustering:</strong> Grouping similar data points into segments</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <h4 className="card-title">Data Mining Techniques</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Association Rules:</strong> Finding relationships between items in datasets</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Classification:</strong> Categorizing data into predefined classes</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Anomaly Detection:</strong> Identifying unusual patterns or outliers</span></li>
              </ul>
            </div>
          </div>
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              <h4 className="card-title">Visualization Methods</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Exploratory Visualization:</strong> Interactive charts for data exploration and hypothesis generation.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><div><strong>Explanatory Visualization:</strong> Clear visuals designed to communicate insights to stakeholders.</div></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Dashboard Design:</strong> Comprehensive interfaces displaying multiple metrics in real-time.</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
          <div className="mt-12 card card-hover">
        <div className="card-header">
          <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <h4 className="card-title">The Data Analysis Process</h4>
        </div>
        <div className="process-steps">
          <div className="process-step"><div className="process-disk">1</div><h5 className="process-step-title">Define</h5><p className="process-step-description">Identify business questions and objectives</p></div>
          <div className="process-step"><div className="process-disk">2</div><h5 className="process-step-title">Collect</h5><p className="process-step-description">Gather relevant data from various sources</p></div>
          <div className="process-step"><div className="process-disk">3</div><h5 className="process-step-title">Clean</h5><p className="process-step-description">Process and prepare data for analysis</p></div>
          <div className="process-step"><div className="process-disk">4</div><h5 className="process-step-title">Analyze</h5><p className="process-step-description">Apply statistical and analytical methods</p></div>
          <div className="process-step"><div className="process-disk">5</div><h5 className="process-step-title">Interpret</h5><p className="process-step-description">Draw conclusions and communicate findings</p></div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
