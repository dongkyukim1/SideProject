'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, useColorMode } from '@chakra-ui/react';
import { Card, Button, Row, Col, Badge, Table } from 'react-bootstrap';
import Layout from '@/components/Layout';
import { Resume } from '@/types';
import { resumeApi } from '@/services/api';
import { FaPlus, FaEdit, FaEye, FaTrash, FaRobot, FaSearch } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      // 실제 API 연동 시 주석 해제
      // const response = await resumeApi.getAll();
      // setResumes(response.data);
      
      // 임시 데이터
      setResumes([
        { id: 1, title: '프론트엔드 개발자 이력서', content: '프론트엔드 개발자 포지션을 위한 이력서입니다. React, TypeScript, Next.js 등의 기술 스택을 포함하고 있습니다.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 2, title: '백엔드 개발자 이력서', content: '백엔드 개발자 포지션을 위한 이력서입니다. Java, Spring Boot, MySQL 등의 기술 스택을 포함하고 있습니다.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 3, title: '풀스택 개발자 이력서', content: '풀스택 개발자 포지션을 위한 이력서입니다. React, Node.js, MongoDB 등의 기술 스택을 포함하고 있습니다.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error('이력서 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = () => {
    // 이력서 생성 페이지로 이동
    router.push('/resume/create');
  };

  const handleEditResume = (id: number) => {
    router.push(`/resume/edit/${id}`);
  };

  const handleViewResume = (id: number) => {
    router.push(`/resume/${id}`);
  };

  const handleDeleteResume = async (id: number) => {
    if (window.confirm('정말 이 이력서를 삭제하시겠습니까?')) {
      try {
        // 실제 API 연동 시 주석 해제
        // await resumeApi.delete(id);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (error) {
        console.error('이력서 삭제 실패:', error);
      }
    }
  };

  const handleGetFeedback = (id: number) => {
    router.push(`/resume/${id}/feedback`);
  };

  const filteredResumes = resumes.filter(resume => 
    resume.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading' || loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-5">
        <Container className="px-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
            <h1 className="display-5 fw-bold mb-0">내 이력서 관리</h1>
            
            <div className="d-flex gap-4 flex-wrap">
              <div className="position-relative" style={{ minWidth: '250px' }}>
                <input
                  type="text"
                  className={`form-control form-control-lg pe-5 ${colorMode === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                  placeholder="이력서 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '1.1rem', padding: '0.75rem 1rem' }}
                />
                <FaSearch className="position-absolute text-muted" style={{ right: '15px', top: '15px' }} />
              </div>
              
              <Button 
                variant="primary" 
                size="lg"
                className="d-flex align-items-center gap-2 px-4"
                onClick={handleCreateResume}
                style={{ fontSize: '1.1rem', padding: '0.75rem 1rem' }}
              >
                <FaPlus /> 새 이력서 작성
              </Button>
            </div>
          </div>

          {resumes.length === 0 ? (
            <Card className={`border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
              <Card.Body className="text-center py-5">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="h3 mb-3">아직 작성한 이력서가 없습니다</h3>
                <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>새 이력서를 작성하고 AI 피드백을 받아보세요.</p>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="d-flex align-items-center gap-2 mx-auto px-4 py-3"
                  onClick={handleCreateResume}
                  style={{ fontSize: '1.1rem' }}
                >
                  <FaPlus /> 새 이력서 작성
                </Button>
              </Card.Body>
            </Card>
          ) : filteredResumes.length === 0 ? (
            <Card className={`border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
              <Card.Body className="text-center py-5">
                <div className="mb-4">
                  <FaSearch className="mx-auto h3 text-muted" style={{ fontSize: '3rem', opacity: '0.5' }} />
                </div>
                <h3 className="h3 mb-3">검색 결과가 없습니다</h3>
                <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>다른 검색어로 다시 시도해보세요.</p>
                <Button 
                  variant="outline-secondary" 
                  size="lg"
                  className="px-4 py-2"
                  onClick={() => setSearchTerm('')}
                  style={{ fontSize: '1.1rem' }}
                >
                  모든 이력서 보기
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-5">
              {filteredResumes.map((resume) => (
                <Col lg={4} md={6} key={resume.id}>
                  <Card className={`h-100 border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
                    <Card.Body className="p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0 text-truncate">{resume.title}</h2>
                        <Badge bg="primary" pill className="ms-2 px-3 py-2" style={{ fontSize: '0.85rem' }}>
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <p className="card-text text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6', flex: '1 1 auto' }}>
                        {resume.content ? resume.content.substring(0, 120) + '...' : '내용 없음'}
                      </p>
                      
                      <div className="d-flex gap-3 mt-auto">
                        <Button 
                          variant="outline-primary" 
                          className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          onClick={() => handleViewResume(resume.id)}
                          style={{ fontSize: '1rem' }}
                        >
                          <FaEye /> 보기
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          onClick={() => handleEditResume(resume.id)}
                          style={{ fontSize: '1rem' }}
                        >
                          <FaEdit /> 편집
                        </Button>
                      </div>
                      
                      <div className="d-flex gap-3 mt-3">
                        <Button 
                          variant="outline-success" 
                          className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          onClick={() => handleGetFeedback(resume.id)}
                          style={{ fontSize: '1rem' }}
                        >
                          <FaRobot /> AI 피드백
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2"
                          onClick={() => handleDeleteResume(resume.id)}
                          style={{ fontSize: '1rem' }}
                        >
                          <FaTrash /> 삭제
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
} 