'use client';

import {
  Container,
  useColorMode,
} from '@chakra-ui/react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { authApi } from '@/services/api';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleLogin = (provider: string) => {
    authApi.login(provider);
  };

  if (status === 'loading') {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="md" className="py-12">
        <Card className={`border-0 shadow-lg ${colorMode === 'dark' ? 'bg-dark text-white' : ''}`}>
          <Card.Header className="text-center border-bottom-0 bg-transparent pt-4 pb-0">
            <h2 className="font-bold text-2xl mb-1">로그인</h2>
            <p className="text-muted">AI 이력서 피드백 서비스를 이용하려면 로그인해주세요.</p>
          </Card.Header>
          
          <Card.Body className="px-4 py-4">
            <Row className="g-3">
              <Col xs={12}>
                <Button 
                  variant={colorMode === 'dark' ? 'outline-light' : 'outline-dark'}
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleLogin('google')}
                >
                  <FaGoogle /> Google로 계속하기
                </Button>
              </Col>
              
              <Col xs={12}>
                <Button 
                  variant={colorMode === 'dark' ? 'outline-light' : 'outline-dark'}
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleLogin('github')}
                >
                  <FaGithub /> GitHub로 계속하기
                </Button>
              </Col>
            </Row>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted">
                로그인하면 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
} 