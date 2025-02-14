'use server';

import { createClient } from '@utils/supabase/server';
import { Database } from '@ts/supabase';

type UserUpdate = Database['public']['Tables']['users']['Update'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

export const addUserInfo = async (user: Omit<UserInsert, 'id'>) => {
  try {
    const supabase = await createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error();

    const { error: insertError } = await supabase
      .from('users')
      .upsert({ ...user, id: userId })
      .select();
    if (insertError) throw new Error();

    const { error } = await supabase.auth.updateUser({
      data: { nickname: user.nickname, profile_image: user.profile_image },
    });
    if (error) throw new Error('');
  } catch {
    throw new Error('회원 가입에 실패했습니다.');
  }
};

export const deleteUser = async () => {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('탈퇴를 실패했습니다.');
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
};

export const updateUser = async (toUpdate: UserUpdate) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user) throw new Error();
  const userId = user.data.user?.id;
  const { error } = await supabase.from('users').update(toUpdate).eq('id', userId);
  if (error) throw new Error('업데이트를 실패했습니다.');
};

export const loginAsGuest = async () => {
  const supabase = await createClient();
  const email = `test${getGuestNumber()}@test.com`;
  const { error } = await supabase.auth.signInWithPassword({ email: email, password: '123123' });
  if (error) throw new Error('게스트 로그인에 실패했습니다.');
};

const getGuestNumber = () => {
  const max = 10;
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
