import React, { useState } from 'react';
import { UserRole, BulkRequest, AuditEntry } from './CDMSTypes';
import { mockBulkRequests, mockUsers } from './MockCDMSData';
import { CDMSLogin } from './CDMSLogin';
import { BulkUploadPage } from './BulkUploadPage';
import { InitiatorHistory } from './InitiatorHistory';
import { AuthorizerHistory } from './AuthorizerHistory';
import { AuthorizerReviewPage } from './AuthorizerReviewPage';
import { ReportsPage } from './ReportsPage';
import { toast } from 'sonner@2.0.3';

type Screen = 
  | 'login'
  | 'upload'
  | 'initiator-history'
  | 'authorizer-history'
  | 'authorizer-review'
  | 'reports'
  | 'user-management'
  | 'audit-trail';

interface CDMSAppProps {
  onLogout: () => void;
  onBackToSelector: () => void;
}

export function CDMSApp({ onLogout, onBackToSelector }: CDMSAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userUnit, setUserUnit] = useState<string>('');
  
  const [allRequests, setAllRequests] = useState<BulkRequest[]>(mockBulkRequests);
  const [selectedRequest, setSelectedRequest] = useState<BulkRequest | null>(null);

  // Login
  const handleLogin = (role: UserRole, ntid: string, fullName: string, unit: string) => {
    setUserRole(role);
    setCurrentUser(ntid);
    setUserName(fullName);
    setUserUnit(unit);
    
    if (role === 'Initiator') {
      setCurrentScreen('initiator-history');
    } else if (role === 'Authorizer') {
      setCurrentScreen('authorizer-history');
    } else if (role === 'Admin') {
      setCurrentScreen('reports');
    }
    
    console.log(`✅ Logged in as ${role.toUpperCase()}: ${fullName}`);
  };

  // Logout
  const handleLogout = () => {
    console.log(`👋 Logging out: ${currentUser}`);
    setUserRole(null);
    setCurrentUser('');
    setUserName('');
    setUserUnit('');
    setCurrentScreen('login');
  };

  // Submit bulk upload for authorization
  const handleSubmitBulkUpload = (data: {
    fileName: string;
    fileSize: number;
    actionType: any;
    records: any[];
  }) => {
    const newRequestId = `CDMS-2025-${String(allRequests.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toISOString();
    
    const validRecords = data.records.filter(r => r.validationStatus === 'Valid').length;
    const invalidRecords = data.records.filter(r => r.validationStatus === 'Invalid').length;
    
    const newRequest: BulkRequest = {
      id: `REQ${String(allRequests.length + 1).padStart(3, '0')}`,
      requestId: newRequestId,
      fileName: data.fileName,
      fileSize: data.fileSize,
      actionType: data.actionType,
      totalRecords: data.records.length,
      validRecords,
      invalidRecords,
      records: data.records,
      status: 'Pending Authorization',
      submittedBy: currentUser,
      submittedByName: userName,
      unit: userUnit,
      dateSubmitted: new Date().toISOString().split('T')[0],
      createdAt: timestamp,
      updatedAt: timestamp,
      auditLog: [
        {
          id: `AUD${Date.now()}`,
          timestamp,
          user: userName,
          userId: currentUser,
          role: 'Initiator',
          action: 'File Uploaded',
          requestId: newRequestId,
          actionType: data.actionType,
          details: `Uploaded ${data.fileName} with ${data.records.length} records`,
          ipAddress: '192.168.1.100',
          duration: '2s'
        },
        {
          id: `AUD${Date.now() + 1}`,
          timestamp,
          user: 'System',
          userId: 'SYSTEM',
          role: 'Admin',
          action: 'File Validated',
          requestId: newRequestId,
          details: `${validRecords} valid records, ${invalidRecords} invalid records`,
          duration: '3s'
        },
        {
          id: `AUD${Date.now() + 2}`,
          timestamp,
          user: userName,
          userId: currentUser,
          role: 'Initiator',
          action: 'Submitted for Authorization',
          requestId: newRequestId,
          actionType: data.actionType,
          details: 'Request submitted to Authorizer queue',
          ipAddress: '192.168.1.100'
        }
      ]
    };

    const updatedRequests = [...allRequests, newRequest];
    setAllRequests(updatedRequests);
    
    console.log('\n🆕 NEW BULK REQUEST CREATED:');
    console.log('Request ID:', newRequestId);
    console.log('Action Type:', data.actionType);
    console.log('Total Records:', data.records.length);
    
    toast.success('File submitted successfully', {
      description: `${newRequestId} has been sent for authorization`
    });
    
    setCurrentScreen('initiator-history');
  };

  // Authorize Request
  const handleApproveRequest = (comments: string) => {
    if (!selectedRequest) return;

    const timestamp = new Date().toISOString();
    const updatedRequest: BulkRequest = {
      ...selectedRequest,
      status: 'Approved',
      authorizedBy: currentUser,
      authorizedByName: userName,
      dateAuthorized: timestamp,
      authorizerComments: comments,
      updatedAt: timestamp,
      auditLog: [
        ...selectedRequest.auditLog,
        {
          id: `AUD${Date.now()}`,
          timestamp,
          user: userName,
          userId: currentUser,
          role: 'Authorizer',
          action: 'Request Approved',
          requestId: selectedRequest.requestId,
          actionType: selectedRequest.actionType,
          details: comments || 'Approved without comments',
          ipAddress: '192.168.1.105',
          duration: '30s'
        }
      ]
    };

    const updatedRequests = allRequests.map(r => 
      r.id === selectedRequest.id ? updatedRequest : r
    );
    setAllRequests(updatedRequests);

    console.log('\n✅ REQUEST APPROVED:');
    console.log('Request ID:', selectedRequest.requestId);
    console.log('Authorized by:', userName);

    toast.success('Request approved successfully', {
      description: `${selectedRequest.requestId} has been approved`
    });

    setSelectedRequest(null);
    setCurrentScreen('authorizer-history');
  };

  const handleRejectRequest = (comments: string) => {
    if (!selectedRequest) return;

    const timestamp = new Date().toISOString();
    const updatedRequest: BulkRequest = {
      ...selectedRequest,
      status: 'Rejected',
      authorizedBy: currentUser,
      authorizedByName: userName,
      dateAuthorized: timestamp,
      authorizerComments: comments,
      updatedAt: timestamp,
      auditLog: [
        ...selectedRequest.auditLog,
        {
          id: `AUD${Date.now()}`,
          timestamp,
          user: userName,
          userId: currentUser,
          role: 'Authorizer',
          action: 'Request Rejected',
          requestId: selectedRequest.requestId,
          actionType: selectedRequest.actionType,
          details: comments,
          ipAddress: '192.168.1.105',
          duration: '25s'
        }
      ]
    };

    const updatedRequests = allRequests.map(r => 
      r.id === selectedRequest.id ? updatedRequest : r
    );
    setAllRequests(updatedRequests);

    console.log('\n❌ REQUEST REJECTED:');
    console.log('Request ID:', selectedRequest.requestId);
    console.log('Rejected by:', userName);
    console.log('Reason:', comments);

    toast.error('Request rejected', {
      description: `${selectedRequest.requestId} has been rejected`
    });

    setSelectedRequest(null);
    setCurrentScreen('authorizer-history');
  };

  // Login Screen
  const LoginScreen = () => (
    <CDMSLogin
      onLogin={handleLogin}
      onBackToSelector={onBackToSelector}
    />
  );

  return (
    <>
      {currentScreen === 'login' && <LoginScreen />}
      
      {currentScreen === 'initiator-history' && (
        <InitiatorHistory
          userRole={userRole}
          onStartNewUpload={() => setCurrentScreen('upload')}
          onViewRequest={(request) => {
            console.log('View request:', request.requestId);
            // TODO: Navigate to request detail view
          }}
          onLogout={handleLogout}
          allRequests={allRequests}
          currentUser={currentUser}
        />
      )}
      
      {currentScreen === 'upload' && (
        <BulkUploadPage
          userRole={userRole || 'Initiator'}
          userName={userName}
          userUnit={userUnit}
          onBack={() => setCurrentScreen('initiator-history')}
          onSubmit={handleSubmitBulkUpload}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'authorizer-history' && (
        <AuthorizerHistory
          userRole={userRole}
          onReviewRequest={(request) => {
            setSelectedRequest(request);
            setCurrentScreen('authorizer-review');
          }}
          onLogout={handleLogout}
          allRequests={allRequests}
          currentUser={currentUser}
        />
      )}

      {currentScreen === 'authorizer-review' && selectedRequest && (
        <AuthorizerReviewPage
          userRole={userRole}
          request={selectedRequest}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
          onBack={() => setCurrentScreen('authorizer-history')}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'reports' && (
        <ReportsPage
          userRole={userRole || 'Admin'}
          onLogout={handleLogout}
          allRequests={allRequests}
        />
      )}
    </>
  );
}
