const ADMIN_PASSWORD = "qq123321"; // 可修改为自定义密码

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 管理后台页面 GET
    if (url.pathname === "/admin") {
      return new Response(`<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8">
      <title>管理跳转链接</title><style>
      body { font-family: sans-serif; padding: 30px; background: #f9f9f9; }
      .form-wrap { background: white; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
      input[type=text], input[type=password] { width: 100%; padding: 10px; margin: 10px 0; }
      button { padding: 10px 20px; background: #1677ff; color: white; border: none; cursor: pointer; }
      </style></head><body>
      <div class="form-wrap">
      <h2>🔧 修改跳转链接</h2>
      <form method="POST" action="/admin">
        <input type="password" name="pass" placeholder="请输入密码" required />
        <input type="text" name="url" placeholder="请输入跳转链接，如 https://baidu.com" required />
        <button type="submit">保存链接</button>
      </form>
      </div></body></html>`, {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    }

    // 管理后台处理 POST
    if (url.pathname === "/admin" && request.method === "POST") {
      const body = await request.text();
      const params = new URLSearchParams(body);
      const pass = params.get("pass");
      const newUrl = params.get("url");

      if (pass !== ADMIN_PASSWORD) {
        return new Response("❌ 密码错误", { status: 403 });
      }

      await env.ChaMei.put("homepage", newUrl);
      return new Response(`✅ 跳转链接已更新为：${newUrl}`, {
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    }

    // 主页跳转逻辑
    if (url.pathname === "/") {
      const link = await env.ChaMei.get("homepage") || "https://example.com/";
      return Response.redirect(link, 302);
    }

    return new Response("404 Not Found", { status: 404 });
  }
}
