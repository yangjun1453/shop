import { supabase } from "../lib/supabaseClient";

// 登录
export async function SignIn(email: string, password: string): Promise<any> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
// 登出
export async function SignOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
// 获取当前用户
export async function RetrieveUser(): Promise<{ user: any; error: any }> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("获取用户出错：", error.message);
    return { user: null, error };
  }
  if (!data.user) {
    console.log("没有 session，用户未登录");
    return { user: null, error: "用户未登录" };
  }
  return { user: data.user, error: null };
}
// 注册
export const SignUp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });
  if (error) {
    alert(error.message);
  }
  return data;
};
// 发送验证码
export const sendCode = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    alert(error.message);
  }
  return data;
};
