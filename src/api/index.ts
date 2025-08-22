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
  if (!data?.user) {
    console.log("没有 session，用户未登录");
    return { user: null, error: "用户未登录" };
  }
  return { user: data.user, error: null };
}

// 注册（验证邮箱验证码）
export const SignUp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
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
    email,
    password,
  });
  if (error) {
    alert(error.message);
  }
  return data;
};

// 添加至购物车
export async function addToCart(
  productId: number,
  size: string,
  color: string,
  quantity = 1,
) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const user = userData?.user;
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

  if (existingItems && existingItems.length > 0) {
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

// 获取购物车及关联商品信息
export async function fetchCartItemsWithProduct() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const user = userData?.user;
  if (!user) throw new Error("请先登录");

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("user_id", user.id);

  if (error) throw error;
  return data;
}

// 删除购物车商品
export async function removeCartItem(id: string) {
  const { error } = await supabase.from("cart_items").delete().eq("id", id);
  if (error) throw error;
}
