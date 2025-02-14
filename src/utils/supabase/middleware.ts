import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const authTokens = request.headers.get('Authorization');
  if (authTokens) {
    const [access_token, refresh_token] = authTokens.split(',');
    if (access_token && refresh_token) {
      await supabase.auth.setSession({ access_token, refresh_token });
    }
  }

  const pathname = request.nextUrl.pathname;
  if (!isPublicRoute(pathname)) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && !user.user_metadata.nickname && !pathname.startsWith('/signup')) {
      const url = request.nextUrl.clone();
      url.pathname = '/signup';
      return NextResponse.redirect(url);
    }

    // 인증이 필요한 페이지인데 로그인하지 않은 경우 로그인 페이지로 이동
    if (!user && needsAuthentication(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // 로그인 한 상태인데 로그인 페이지에 접근하려는 경우 home으로 이동
    if (user && pathname.startsWith('/login')) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
    // 유저 추가 정보 입력이 필요하지 않은데 회원가입 페이지에 접근하려는 경우 home으로 이동
    if (user && pathname.startsWith('/signup') && user.user_metadata.nickname) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    // 그룹 페이지에 접근 시 그룹 멤버 여부 확인
    if (pathname.startsWith('/groups/') && !pathname.startsWith('/groups/new')) {
      const match = pathname.match(/^\/groups\/([^/]+)/); // groups/ 뒤에 오는 첫 번째 경로 추출
      const groupId = match ? match[1] : null;

      if (groupId) {
        const { data: membership, error } = await supabase
          .from('group_members')
          .select('id')
          .eq('group_id', groupId)
          .eq('user_id', user?.id)
          .eq('is_approved', true)
          .limit(1) // 그룹에 여러번 가입되어 있더라도 진입 가능하도록
          .single();

        // 그룹 멤버가 아닌 경우 접근 제한
        if (error || !membership) {
          const url = request.nextUrl.clone();
          url.pathname = '/';
          return NextResponse.redirect(url);
        }
      }
    }

    // 채팅방 접근 시 멤버 확인
    if (pathname.startsWith('/chat')) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }

      const match = pathname.match(/^\/chat\/([^/]+)/);
      const chatRoomId = match ? match[1] : null;

      if (chatRoomId) {
        const { data: chatMember, error: chatMemberError } = await supabase
          .from('chat_room_members')
          .select('id')
          .eq('chat_room_id', chatRoomId)
          .eq('user_id', user.id)
          .single();

        if (!chatMember || chatMemberError) {
          const url = request.nextUrl.clone();
          url.pathname = '/';
          return NextResponse.redirect(url);
        }
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

const isPublicRoute = (pathname: string) => {
  const paths: string[] = ['/api/auth/', '/signup/success', '/join'];
  return paths.find((path) => pathname.startsWith(path)) !== undefined;
};

const needsAuthentication = (pathname: string): boolean => {
  const paths: string[] = ['/mypage', '/groups'];
  if (pathname === '/') return true;
  return paths.find((path) => pathname.startsWith(path)) !== undefined;
};
