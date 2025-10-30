import React from 'react';

const BusinessIntelligence: React.FC = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
  <h3 id="section-two-title" className="text-4xl font-bold text-center mb-12 text-gray-800">
        Business Intelligence Solutions
      </h3>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
              <h4 className="card-title">Understanding Business Intelligence</h4>
            </div>
            <div className="card-content">
              Business Intelligence (BI) refers to the technologies, applications, strategies, and practices used to collect, analyze, integrate, and present business information. BI systems help organizations make data-driven decisions by transforming raw data into meaningful and useful information.
            </div>
          </div>
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <h4 className="card-title">Core BI Components</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Data Warehousing:</strong> Centralized repositories for storing integrated data</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>ETL Processes:</strong> Extract, Transform, Load operations for data preparation</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>OLAP:</strong> Online Analytical Processing for multidimensional analysis</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Reporting Tools:</strong> Automated generation of business reports</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Dashboards:</strong> Visual interfaces displaying key performance indicators</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
              <h4 className="card-title">BI vs Traditional Reporting</h4>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="feature-item"><div className="feature-dot feature-dot--primary"></div><div><strong>Traditional Reporting:</strong> Static reports, historical focus, limited interactivity, scheduled delivery</div></div>
                <div className="feature-item"><div className="feature-dot feature-dot--accent"></div><div><strong>Business Intelligence:</strong> Interactive dashboards, real-time data, predictive capabilities, self-service analytics</div></div>
              </div>
            </div>
          </div>
          <div className="card card-hover">
            <div className="card-header">
              <svg className="card-icon text-teal-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              <h4 className="card-title">Key Benefits</h4>
            </div>
            <div className="card-content">
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Data Integration:</strong> Unified view of business operations</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--accent"></div><span><strong>Performance Monitoring:</strong> Real-time KPI tracking</span></li>
                <li className="feature-item"><div className="feature-dot feature-dot--primary"></div><span><strong>Strategic Planning:</strong> Data-driven decision making</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessIntelligence;
