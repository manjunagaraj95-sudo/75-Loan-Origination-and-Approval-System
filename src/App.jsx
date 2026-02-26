
import React, { useState, useEffect } from 'react';

// Mock Data
const mockUsers = [
  { id: 'usr1', name: 'Alice Smith', role: 'Approval Manager', avatar: 'AS' },
  { id: 'usr2', name: 'Bob Johnson', role: 'Loan Officer', avatar: 'BJ' },
  { id: 'usr3', name: 'Charlie Brown', role: 'Credit Analyst', avatar: 'CB' },
  { id: 'usr4', name: 'Diana Prince', role: 'Risk Manager', avatar: 'DP' },
  { id: 'usr5', name: 'Eve Adams', role: 'Admin', avatar: 'EA' },
];

const generateLoanId = () => `LOAN-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

const mockLoans = [
  {
    id: generateLoanId(),
    applicantName: 'John Doe',
    loanAmount: 150000,
    loanType: 'Mortgage',
    status: 'Approved',
    appliedDate: '2023-10-26',
    creditScore: 780,
    riskScore: 'Low',
    assignedTo: 'Alice Smith',
    description: 'Application for a 30-year fixed-rate mortgage on a primary residence.',
    milestones: [
      { name: 'Application Submitted', status: 'Completed', date: '2023-10-26', sla: '3 days', slaBreached: false },
      { name: 'Documents Verified', status: 'Completed', date: '2023-10-27', sla: '2 days', slaBreached: false },
      { name: 'Credit Assessment', status: 'Completed', date: '2023-10-28', sla: '2 days', slaBreached: false },
      { name: 'Risk Evaluation', status: 'Completed', date: '2023-10-29', sla: '1 day', slaBreached: false },
      { name: 'Approval Decision', status: 'Completed', date: '2023-10-30', sla: '1 day', slaBreached: false },
      { name: 'Disbursement', status: 'In Progress', date: null, sla: '1 day', slaBreached: false },
    ],
    auditLog: [
      { timestamp: '2023-10-30 14:20', user: 'Alice Smith', action: 'Approved loan' },
      { timestamp: '2023-10-29 10:15', user: 'Diana Prince', action: 'Completed risk evaluation' },
      { timestamp: '2023-10-28 16:30', user: 'Charlie Brown', action: 'Completed credit assessment' },
    ],
    documents: ['Application Form.pdf', 'Credit Report.pdf', 'Income Statement.pdf', 'Property Appraisal.pdf'],
    relatedRecords: ['Collateral_LOAN-00001', 'Applicant_ID-JDOE-123'],
  },
  {
    id: generateLoanId(),
    applicantName: 'Jane Foster',
    loanAmount: 50000,
    loanType: 'Personal',
    status: 'In Progress',
    appliedDate: '2023-11-01',
    creditScore: 720,
    riskScore: 'Medium',
    assignedTo: 'Bob Johnson',
    description: 'Personal loan for home renovation.',
    milestones: [
      { name: 'Application Submitted', status: 'Completed', date: '2023-11-01', sla: '3 days', slaBreached: false },
      { name: 'Documents Verified', status: 'Completed', date: '2023-11-02', sla: '2 days', slaBreached: false },
      { name: 'Credit Assessment', status: 'Pending', date: null, sla: '2 days', slaBreached: true },
      { name: 'Risk Evaluation', status: 'Pending', date: null, sla: '1 day', slaBreached: false },
      { name: 'Approval Decision', status: 'Pending', date: null, sla: '1 day', slaBreached: false },
      { name: 'Disbursement', status: 'Pending', date: null, sla: '1 day', slaBreached: false },
    ],
    auditLog: [
      { timestamp: '2023-11-02 11:00', user: 'Bob Johnson', action: 'Verified documents' },
      { timestamp: '2023-11-01 09:30', user: 'Bob Johnson', action: 'Submitted application' },
    ],
    documents: ['Application Form.pdf', 'Bank Statement.pdf'],
    relatedRecords: [],
  },
  {
    id: generateLoanId(),
    applicantName: 'Peter Parker',
    loanAmount: 250000,
    loanType: 'Business',
    status: 'Pending',
    appliedDate: '2023-11-05',
    creditScore: 680,
    riskScore: 'High',
    assignedTo: 'Charlie Brown',
    description: 'Small business loan for equipment purchase.',
    milestones: [
      { name: 'Application Submitted', status: 'Completed', date: '2023-11-05', sla: '3 days', slaBreached: false },
      { name: 'Documents Verified', status: 'Pending', date: null, sla: '2 days', slaBreached: false },
      { name: 'Credit Assessment', status: 'Pending', date: null, sla: '2 days', slaBreached: false },
    ],
    auditLog: [
      { timestamp: '2023-11-05 15:45', user: 'Charlie Brown', action: 'Application submitted' },
    ],
    documents: ['Business Plan.pdf', 'Financial Projections.pdf'],
    relatedRecords: [],
  },
  {
    id: generateLoanId(),
    applicantName: 'Mary Jane',
    loanAmount: 80000,
    loanType: 'Auto',
    status: 'Rejected',
    appliedDate: '2023-10-20',
    creditScore: 550,
    riskScore: 'Very High',
    assignedTo: 'Alice Smith',
    description: 'Auto loan for a new car.',
    milestones: [
      { name: 'Application Submitted', status: 'Completed', date: '2023-10-20', sla: '3 days', slaBreached: false },
      { name: 'Documents Verified', status: 'Completed', date: '2023-10-21', sla: '2 days', slaBreached: false },
      { name: 'Credit Assessment', status: 'Rejected', date: '2023-10-22', sla: '2 days', slaBreached: false },
      { name: 'Risk Evaluation', status: 'Rejected', date: '2023-10-22', sla: '1 day', slaBreached: false },
      { name: 'Approval Decision', status: 'Rejected', date: '2023-10-22', sla: '1 day', slaBreached: false },
    ],
    auditLog: [
      { timestamp: '2023-10-22 11:00', user: 'Alice Smith', action: 'Rejected loan (low credit score)' },
    ],
    documents: ['Application Form.pdf', 'Bank Statement.pdf'],
    relatedRecords: [],
  },
  {
    id: generateLoanId(),
    applicantName: 'Bruce Wayne',
    loanAmount: 500000,
    loanType: 'Commercial',
    status: 'Exception',
    appliedDate: '2023-09-15',
    creditScore: 850,
    riskScore: 'Low',
    assignedTo: 'Diana Prince',
    description: 'Large commercial loan for real estate development.',
    milestones: [
      { name: 'Application Submitted', status: 'Completed', date: '2023-09-15', sla: '3 days', slaBreached: false },
      { name: 'Documents Verified', status: 'Completed', date: '2023-09-16', sla: '2 days', slaBreached: false },
      { name: 'Credit Assessment', status: 'Completed', date: '2023-09-17', sla: '2 days', slaBreached: false },
      { name: 'Risk Evaluation', status: 'Exception', date: '2023-09-20', sla: '1 day', slaBreached: true },
      { name: 'Approval Decision', status: 'Pending', date: null, sla: '1 day', slaBreached: false },
    ],
    auditLog: [
      { timestamp: '2023-09-20 09:00', user: 'Diana Prince', action: 'Flagged for exceptional risk review' },
    ],
    documents: ['Project Proposal.pdf', 'Financial Statements.pdf', 'Environmental Impact Study.pdf'],
    relatedRecords: ['Entity_WayneCorp'],
  },
];

const mockActivities = [
  { id: 1, type: 'status_update', text: '<strong>John Doe</strong>\'s Mortgage loan was <strong>Approved</strong>.', timestamp: '2 minutes ago' },
  { id: 2, type: 'comment', text: '<strong>Bob Johnson</strong> added a note to Jane Foster\'s loan.', timestamp: '15 minutes ago' },
  { id: 3, type: 'document_upload', text: '<strong>Peter Parker</strong> uploaded new business documents.', timestamp: '1 hour ago' },
  { id: 4, type: 'task_completion', text: '<strong>Credit Assessment</strong> for John Doe completed.', timestamp: '3 hours ago' },
  { id: 5, type: 'status_update', text: '<strong>Mary Jane</strong>\'s Auto loan was <strong>Rejected</strong>.', timestamp: 'Yesterday' },
];

// RBAC Configuration
const ROLES = {
  'Loan Officer': ['VIEW_DASHBOARD', 'VIEW_LOAN_DETAIL', 'EDIT_LOAN_APPLICATION'],
  'Credit Analyst': ['VIEW_DASHBOARD', 'VIEW_LOAN_DETAIL', 'PERFORM_CREDIT_ASSESSMENT'],
  'Risk Manager': ['VIEW_DASHBOARD', 'VIEW_LOAN_DETAIL', 'PERFORM_RISK_EVALUATION'],
  'Approval Manager': ['VIEW_DASHBOARD', 'VIEW_LOAN_DETAIL', 'APPROVE_REJECT_LOAN'],
  'Admin': ['VIEW_DASHBOARD', 'VIEW_LOAN_DETAIL', 'EDIT_ALL_LOANS', 'MANAGE_USERS'],
};

// Helper to get status class
const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-approved';
    case 'In Progress': return 'status-in-progress';
    case 'Pending': return 'status-pending';
    case 'Rejected': return 'status-rejected';
    case 'Exception': return 'status-exception';
    default: return '';
  }
};

const App = () => {
  const [view, setView] = useState({ screen: 'DASHBOARD', params: {} });
  const [currentUserRole] = useState('Approval Manager'); // Current logged-in user's role
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const hasPermission = (permission) => ROLES[currentUserRole]?.includes(permission);

  // Dashboard KPI data calculation
  const totalLoans = mockLoans.length;
  const approvedLoans = mockLoans.filter(loan => loan.status === 'Approved').length;
  const inProgressLoans = mockLoans.filter(loan => loan.status === 'In Progress').length;
  const pendingLoans = mockLoans.filter(loan => loan.status === 'Pending').length;
  const rejectedLoans = mockLoans.filter(loan => loan.status === 'Rejected').length;
  const exceptionLoans = mockLoans.filter(loan => loan.status === 'Exception').length;

  const handleCardClick = (screen, params = {}) => {
    setView({ screen, params });
  };

  const handleBackToDashboard = () => {
    setView({ screen: 'DASHBOARD', params: {} });
  };

  const Breadcrumbs = ({ path }) => (
    <div className="breadcrumbs">
      <span onClick={handleBackToDashboard}>Dashboard</span>
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <span className="separator">/</span>
          {item.onClick ? (
            <span onClick={item.onClick}>{item.label}</span>
          ) : (
            <span className="current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const DashboardScreen = () => (
    <div className="main-content">
      <h1 style={{ marginBottom: 'var(--spacing-xl)', fontSize: 'var(--font-size-xxl)', fontWeight: '700' }}>Loan Overview</h1>

      {/* KPI Cards */}
      <div className="dashboard-grid" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="card" onClick={() => handleCardClick('LOAN_LIST', { status: 'Total' })}>
          <div className="card-title">Total Loans</div>
          <div className="card-value">{totalLoans}</div>
          <div className="card-content">Overall loan applications.</div>
        </div>
        <div className={`card ${getStatusClass('Approved')}`} onClick={() => handleCardClick('LOAN_LIST', { status: 'Approved' })}>
          <div className="card-title">Approved Loans</div>
          <div className="card-value">{approvedLoans}</div>
          <div className="card-content">Successfully approved loans.</div>
        </div>
        <div className={`card ${getStatusClass('In Progress')}`} onClick={() => handleCardClick('LOAN_LIST', { status: 'In Progress' })}>
          <div className="card-title">In Progress</div>
          <div className="card-value">{inProgressLoans}</div>
          <div className="card-content">Actively being processed.</div>
        </div>
        <div className={`card ${getStatusClass('Pending')}`} onClick={() => handleCardClick('LOAN_LIST', { status: 'Pending' })}>
          <div className="card-title">Pending Applications</div>
          <div className="card-value">{pendingLoans}</div>
          <div className="card-content">Awaiting review or additional info.</div>
        </div>
        <div className={`card ${getStatusClass('Rejected')}`} onClick={() => handleCardClick('LOAN_LIST', { status: 'Rejected' })}>
          <div className="card-title">Rejected Loans</div>
          <div className="card-value">{rejectedLoans}</div>
          <div className="card-content">Applications not approved.</div>
        </div>
        <div className={`card ${getStatusClass('Exception')}`} onClick={() => handleCardClick('LOAN_LIST', { status: 'Exception' })}>
          <div className="card-title">Exception Cases</div>
          <div className="card-value">{exceptionLoans}</div>
          <div className="card-content">Loans requiring special review.</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Loan Performance Trends</h2>
          <button className="action-button">Export Charts</button>
        </div>
        <div className="dashboard-grid">
          <div className="chart-container card">Bar Chart: Loan Applications by Type (Placeholder)</div>
          <div className="chart-container card">Line Chart: Approval Rate Over Time (Placeholder)</div>
          <div className="chart-container card">Donut Chart: Loan Status Distribution (Placeholder)</div>
          <div className="chart-container card">Gauge: Average Processing Time (Placeholder)</div>
        </div>
      </div>

      {/* Recent Activities and Loan Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Loan Pipeline</h2>
            <button className="action-button">View All Loans</button>
          </div>
          <div className="loan-list">
            {mockLoans.filter(loan => ['In Progress', 'Pending'].includes(loan.status)).slice(0, 4).map(loan => (
              <div
                key={loan.id}
                className={`card loan-card ${getStatusClass(loan.status)}`}
                onClick={() => handleCardClick('LOAN_DETAIL', { id: loan.id })}
                style={{ borderLeftColor: `var(--status-${loan.status.toLowerCase().replace(' ', '-')}-border)` }}
              >
                <div className="loan-card-header">
                  <div className="loan-card-title">{loan.applicantName}</div>
                  <div className={`status-indicator ${getStatusClass(loan.status)}`}>{loan.status}</div>
                </div>
                <div className="loan-card-meta">
                  <span>{loan.loanType} - {loan.id}</span>
                  <span>Assigned: {loan.assignedTo}</span>
                </div>
                <div className="loan-card-amount">
                  ${loan.loanAmount?.toLocaleString()}
                </div>
                {/* Quick actions (hover) - Conceptual */}
                <div style={{ position: 'absolute', right: 'var(--spacing-md)', bottom: 'var(--spacing-md)', opacity: 0, transition: 'opacity 0.2s ease' }} className="hover-actions">
                    {hasPermission('APPROVE_REJECT_LOAN') && <button className="button" style={{marginRight: 'var(--spacing-sm)'}}>Approve</button>}
                    {hasPermission('EDIT_LOAN_APPLICATION') && <button className="button">Edit</button>}
                </div>
              </div>
            ))}
            {mockLoans.filter(loan => ['In Progress', 'Pending'].includes(loan.status)).length === 0 && (
                <div className="card" style={{gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--spacing-xl)'}}>
                    <h3 style={{color: 'var(--text-secondary)'}}>No active loans in pipeline.</h3>
                    <p style={{marginTop: 'var(--spacing-sm)'}}>Get started by <span style={{color: 'var(--border-focus)', cursor: 'pointer'}}>creating a new loan application</span>.</p>
                </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Recent Activities</h2>
            <button className="action-button">View All</button>
          </div>
          <div className="card" style={{padding: 'var(--spacing-md)'}}>
            <div className="activity-feed">
              {mockActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">💡</span>
                  <div className="activity-details">
                    <span dangerouslySetInnerHTML={{ __html: activity.text }}></span>
                  </div>
                  <span className="activity-timestamp">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoanDetailScreen = ({ loanId }) => {
    const loan = mockLoans.find(l => l.id === loanId);

    if (!loan) {
      return (
        <div className="main-content" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <h1 style={{color: 'var(--status-rejected-border)'}}>Loan not found!</h1>
          <button
            onClick={handleBackToDashboard}
            style={{ marginTop: 'var(--spacing-lg)' }}
            className="button button-primary"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    const breadcrumbPath = [
      { label: 'Loans', onClick: () => handleCardClick('LOAN_LIST') },
      { label: loan.id },
    ];

    return (
      <div className="main-content">
        <Breadcrumbs path={breadcrumbPath} />

        <div className="detail-header">
          <h1>{loan.applicantName} - {loan.loanType} <span className={`status-indicator ${getStatusClass(loan.status)}`}>{loan.status}</span></h1>
          <div className="detail-actions">
            {hasPermission('EDIT_LOAN_APPLICATION') && <button className="button">Edit Loan</button>}
            {hasPermission('PERFORM_CREDIT_ASSESSMENT') && loan.status === 'In Progress' && <button className="button">Assess Credit</button>}
            {hasPermission('APPROVE_REJECT_LOAN') && (loan.status === 'Pending' || loan.status === 'Exception') && <button className="button button-primary">Approve / Reject</button>}
            <button className="button">Export PDF</button>
          </div>
        </div>

        <div className="detail-grid">
          {/* Left Column - Summary, Workflow, Documents */}
          <div>
            {/* Loan Summary */}
            <div className="detail-section-card">
              <h3>Loan Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
                <div className="detail-item"><span className="detail-item-label">Loan ID:</span> <span className="detail-item-value">{loan.id}</span></div>
                <div className="detail-item"><span className="detail-item-label">Amount:</span> <span className="detail-item-value">${loan.loanAmount?.toLocaleString()}</span></div>
                <div className="detail-item"><span className="detail-item-label">Applicant:</span> <span className="detail-item-value">{loan.applicantName}</span></div>
                <div className="detail-item"><span className="detail-item-label">Type:</span> <span className="detail-item-value">{loan.loanType}</span></div>
                <div className="detail-item"><span className="detail-item-label">Applied Date:</span> <span className="detail-item-value">{loan.appliedDate}</span></div>
                <div className="detail-item"><span className="detail-item-label">Assigned To:</span> <span className="detail-item-value">{loan.assignedTo}</span></div>
                <div className="detail-item"><span className="detail-item-label">Credit Score:</span> <span className="detail-item-value">{loan.creditScore}</span></div>
                <div className="detail-item"><span className="detail-item-label">Risk Score:</span> <span className="detail-item-value">{loan.riskScore}</span></div>
              </div>
              <div style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-main)'}}>
                <span className="detail-item-label">Description:</span> <span className="detail-item-value">{loan.description}</span>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="detail-section-card">
              <h3>Workflow Progress (Milestone Tracker)</h3>
              <div className="milestone-tracker">
                {loan.milestones?.map((milestone, index) => (
                  <div
                    key={index}
                    className={`milestone-step ${milestone.status === 'Completed' ? 'completed' : ''} ${milestone.status === 'In Progress' ? 'current' : ''}`}
                  >
                    <div className="milestone-status-icon">
                      {milestone.status === 'Completed' ? '✔' : milestone.status === 'In Progress' ? '▶' : '•'}
                    </div>
                    <div className="milestone-info">
                      <div className="title">{milestone.name}</div>
                      {milestone.date && <div className="date">Completed: {milestone.date}</div>}
                    </div>
                    {milestone.sla && <div className={`milestone-sla ${milestone.slaBreached ? 'breached realtime-pulse' : ''}`}>SLA: {milestone.sla} {milestone.slaBreached && '(Breached)'}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="detail-section-card">
              <h3>Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)'}}>
                {loan.documents?.length > 0 ? (
                  loan.documents.map((doc, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-xs) 0', borderBottom: '1px dashed var(--border-main)' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>📄 {doc}</span>
                      <button className="button" style={{padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-size-sm)'}}>View</button>
                    </div>
                  ))
                ) : (
                  <p style={{color: 'var(--text-secondary)'}}>No documents uploaded.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - News Feed, Related Records */}
          <div>
            {/* News / Audit Feed */}
            <div className="detail-section-card">
              <h3>News / Audit Feed</h3>
              <div className="news-feed">
                {loan.auditLog?.map((entry, index) => (
                  <div key={index} className="news-item">
                    <span className="news-item-icon">📜</span>
                    <div className="news-item-content">
                      <strong>{entry.user}</strong> {entry.action}
                    </div>
                    <span className="news-item-timestamp">{entry.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Records */}
            <div className="detail-section-card">
              <h3>Related Records</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {loan.relatedRecords?.length > 0 ? (
                  loan.relatedRecords.map((record, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-xs) 0', borderBottom: '1px dashed var(--border-main)' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>🔗 {record}</span>
                      <button className="button" style={{padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-size-sm)'}}>View</button>
                    </div>
                  ))
                ) : (
                  <p style={{color: 'var(--text-secondary)'}}>No related records.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (view.screen) {
      case 'DASHBOARD':
        return <DashboardScreen />;
      case 'LOAN_LIST':
        // A full LoanListScreen would be a dedicated page with search, filter, sort, and bulk actions.
        // For this output, we redirect to dashboard for simplicity, or would filter the pipeline on dashboard.
        // In a real application, this would be a full-page grid/list view for all loans.
        return <DashboardScreen />; 
      case 'LOAN_DETAIL':
        return <LoanDetailScreen loanId={view.params?.id} />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">LoanCo.</div>
        <div className="global-search">
          <input
            type="text"
            placeholder="Search loans, applicants, documents..."
            value={globalSearchTerm}
            onChange={(e) => setGlobalSearchTerm(e.target.value)}
          />
          {/* Smart suggestions would go here */}
        </div>
        <div className="user-profile">
          <div className="user-avatar">{mockUsers.find(u => u.role === currentUserRole)?.avatar || 'UN'}</div>
          <span>{currentUserRole}</span>
        </div>
      </header>
      {renderScreen()}
    </div>
  );
};

export default App;