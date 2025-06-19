// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['el', 'en'],
  defaultLocale: 'el',
  localePrefix: 'as-needed',
  localeDetection: false,
});

// Wrap the intlMiddleware with a logger
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for system requests and static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/.well-known/') ||
    pathname.includes('webpack-hmr') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname.match(/\.\w+$/) ||
    pathname.split('/').some(segment => segment.startsWith('.'))
  ) {
    return NextResponse.next();
  }

  console.log('Middleware processing:', pathname);

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except system paths
    '/((?!_next|api|favicon.ico|robots.txt|.well-known|.*\\..*).*)',
    // Match locale paths
    '/:locale((?!_next|api|favicon.ico|robots.txt|.well-known|.*\\..*).*)',
  ],
};
