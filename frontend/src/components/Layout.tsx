'use client';

import { ReactNode } from 'react';
import { Box, Flex, Container, useColorMode } from '@chakra-ui/react';
import { Navbar, Nav, Container as BsContainer } from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { authApi } from '@/services/api';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar 
        bg={colorMode === 'light' ? 'light' : 'dark'} 
        variant={colorMode === 'light' ? 'light' : 'dark'}
        expand="lg" 
        className="shadow-sm"
      >
        <BsContainer>
          <Navbar.Brand href="/" className="font-bold text-primary">AI 이력서 피드백</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {session ? (
                <>
                  <Link href="/dashboard" passHref legacyBehavior>
                    <Nav.Link className="mx-2">대시보드</Nav.Link>
                  </Link>
                  <Nav.Link 
                    onClick={() => authApi.logout()} 
                    className="mx-2"
                  >
                    로그아웃
                  </Nav.Link>
                </>
              ) : (
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link className="mx-2">로그인</Nav.Link>
                </Link>
              )}
              <Nav.Link 
                onClick={toggleColorMode} 
                className="mx-2"
              >
                {colorMode === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </BsContainer>
      </Navbar>

      <main className="flex-grow py-8">
        <Container maxW="container.xl" className="px-4">
          {children}
        </Container>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <BsContainer>
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 AI 이력서 피드백. All rights reserved.</p>
          </div>
        </BsContainer>
      </footer>
    </div>
  );
} 