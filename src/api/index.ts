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
//添加至购物车
export async function addToCart(
  productId: number,
  size: string,
  color: string,
  quantity = 1,
) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("请先登录");

  // 检查是否已存在完全相同的产品（product + size + color）
  const { data: existingItems, error: checkError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .eq("size", size)
    .eq("color", color)
    .limit(1);

  if (checkError) throw checkError;

  if (existingItems.length > 0) {
    // 如果存在，增加数量
    const existing = existingItems[0];
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);

    if (error) throw error;
    return data;
  } else {
    // 如果不存在，插入新项
    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        { user_id: user.id, product_id: productId, size, color, quantity },
      ]);

    if (error) throw error;
    return data;
  }
}
export async function fetchCartItemsWithProduct() {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)      -- 关联查询 product 表所有字段
    `,
    )
    .eq("user_id", (await supabase.auth.getUser()).data.user.id);

  if (error) throw error;
  return data;
}
export async function removeCartItem(id: string) {
  const { error } = await supabase.from("cart_items").delete().eq("id", id);
  if (error) throw error;
}
