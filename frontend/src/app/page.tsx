'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, useColorMode } from '@chakra-ui/react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import Layout from '@/components/Layout';
import { FaRobot, FaFileAlt, FaChartLine, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <Layout>
      {/* 히어로 섹션 - 더 여유로운 디자인 */}
      <div className={`py-24 ${colorMode === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-white'}`}>
        <Container className="px-4">
          <Row className="align-items-center gy-5">
            <Col lg={6} className="pe-lg-5">
              <h1 className="display-3 fw-bold mb-4 lh-sm">
                AI로 이력서를 <span className="text-primary">업그레이드</span>하세요
              </h1>
              <p className="lead mb-5 text-gray-600 dark:text-gray-300" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                인공지능 기술을 활용하여 이력서를 분석하고 개선점을 찾아드립니다.
                더 효과적인 이력서로 취업 성공률을 높여보세요.
              </p>
              <div className="d-flex gap-4 flex-wrap">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-5 py-3 d-flex align-items-center gap-2"
                  onClick={handleGetStarted}
                >
                  {session ? '대시보드로 이동' : '시작하기'} <FaArrowRight />
                </Button>
                {!session && (
                  <Button 
                    variant="outline-primary" 
                    size="lg" 
                    className="px-5 py-3"
                    onClick={() => router.push('/login')}
                  >
                    더 알아보기
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center position-relative p-4">
                <div className={`position-absolute top-0 start-0 w-100 h-100 rounded-5 ${
                  colorMode === 'dark' ? 'bg-primary opacity-10' : 'bg-primary opacity-5'
                }`} style={{transform: 'translate(-15px, -15px)'}}></div>
                <img 
                  src="/hero-image.svg" 
                  alt="AI 이력서 피드백" 
                  className="img-fluid rounded-5 shadow-lg position-relative"
                  style={{ maxWidth: '85%' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=AI+Resume+Feedback';
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 여백 추가 */}
      <div className="py-24">
        <Container className="px-4">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4">주요 기능</h2>
            <p className="lead text-muted mx-auto mb-5" style={{maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.8'}}>
              AI 이력서 피드백 서비스의 핵심 기능을 소개합니다
            </p>
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            <div className="px-3 mb-4" style={{ maxWidth: '380px' }}>
              <Card className={`h-100 border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-4 mb-4">
                    <FaRobot className="text-primary" size={36} />
                  </div>
                  <Card.Title className="h3 mb-3">AI 분석</Card.Title>
                  <Card.Text style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    최신 AI 기술을 활용하여 이력서의 내용을 분석하고 개선점을 찾아드립니다.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            
            <div className="px-3 mb-4" style={{ maxWidth: '380px' }}>
              <Card className={`h-100 border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="rounded-circle bg-success bg-opacity-10 p-4 mb-4">
                    <FaFileAlt className="text-success" size={36} />
                  </div>
                  <Card.Title className="h3 mb-3">맞춤형 피드백</Card.Title>
                  <Card.Text style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    직무와 산업에 맞는 맞춤형 피드백을 제공하여 이력서의 경쟁력을 높여드립니다.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            
            <div className="px-3 mb-4" style={{ maxWidth: '380px' }}>
              <Card className={`h-100 border-0 shadow-sm rounded-5 ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-4 mb-4">
                    <FaChartLine className="text-warning" size={36} />
                  </div>
                  <Card.Title className="h3 mb-3">성과 향상</Card.Title>
                  <Card.Text style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                    개선된 이력서로 채용 담당자의 주목을 받고 면접 기회를 높이세요.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* 통계 섹션 - 여유로운 디자인 */}
      <div className={`py-24 ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <Container className="px-4">
          <div className="d-flex flex-wrap justify-content-around align-items-center">
            <div className="text-center px-4 py-3">
              <div className="mb-3">
                <span className="display-3 fw-bold text-primary">98%</span>
              </div>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>사용자 만족도</p>
            </div>
            <div className="text-center px-4 py-3">
              <div className="mb-3">
                <span className="display-3 fw-bold text-primary">5,000+</span>
              </div>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>분석된 이력서</p>
            </div>
            <div className="text-center px-4 py-3">
              <div className="mb-3">
                <span className="display-3 fw-bold text-primary">75%</span>
              </div>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>면접 성공률 향상</p>
            </div>
            <div className="text-center px-4 py-3">
              <div className="mb-3">
                <span className="display-3 fw-bold text-primary">24/7</span>
              </div>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>언제든지 이용 가능</p>
            </div>
          </div>
        </Container>
      </div>

      {/* 단계별 안내 섹션 - 여유로운 디자인 */}
      <div className="py-24">
        <Container className="px-4">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4">이용 방법</h2>
            <p className="lead text-muted mx-auto mb-5" style={{maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.8'}}>
              간단한 3단계로 AI 이력서 피드백을 받아보세요
            </p>
          </div>
          
          <div className="d-flex flex-wrap justify-content-center position-relative">
            {/* 연결선 */}
            <div className="position-absolute d-none d-lg-block" style={{
              top: '50%',
              left: '20%',
              right: '20%',
              height: '3px',
              backgroundColor: colorMode === 'dark' ? '#2d3748' : '#e2e8f0',
              zIndex: 0
            }}></div>
            
            <div className="text-center position-relative px-4 mx-3" style={{ maxWidth: '300px' }}>
              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 ${
                colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`} style={{
                width: '100px',
                height: '100px',
                border: '3px solid #3182ce',
                zIndex: 1
              }}>
                <span className="h1 mb-0 text-primary fw-bold">1</span>
              </div>
              <h3 className="h3 mb-4">이력서 업로드</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                기존 이력서를 업로드하거나 새로 작성하세요.
              </p>
            </div>
            
            <div className="text-center position-relative px-4 mx-3" style={{ maxWidth: '300px' }}>
              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 ${
                colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`} style={{
                width: '100px',
                height: '100px',
                border: '3px solid #3182ce',
                zIndex: 1
              }}>
                <span className="h1 mb-0 text-primary fw-bold">2</span>
              </div>
              <h3 className="h3 mb-4">AI 분석</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                AI가 이력서를 분석하고 개선점을 찾습니다.
              </p>
            </div>
            
            <div className="text-center position-relative px-4 mx-3" style={{ maxWidth: '300px' }}>
              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 ${
                colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`} style={{
                width: '100px',
                height: '100px',
                border: '3px solid #3182ce',
                zIndex: 1
              }}>
                <span className="h1 mb-0 text-primary fw-bold">3</span>
              </div>
              <h3 className="h3 mb-4">맞춤형 피드백</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                상세한 피드백을 받고 이력서를 개선하세요.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA 섹션 - 여유로운 디자인 */}
      <div className={`py-24 ${colorMode === 'dark' 
        ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}>
        <Container className="px-4">
          <Row className="justify-content-center">
            <Col lg={8} md={10} className="text-center text-white">
              <h2 className="display-4 fw-bold mb-4">지금 바로 시작하세요</h2>
              <p className="lead mb-5 opacity-90" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                AI 이력서 피드백으로 취업 성공률을 높여보세요.
              </p>
              <Button 
                variant={colorMode === 'dark' ? 'outline-light' : 'light'} 
                size="lg" 
                className="px-5 py-3 fw-semibold"
                style={{ fontSize: '1.1rem' }}
                onClick={handleGetStarted}
              >
                {session ? '대시보드로 이동' : '무료로 시작하기'}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
