# 部署说明

这个项目是纯前端静态站点，最稳的部署方式是直接发布 `deploy-dist` 或 `dist`。

## 1. 局域网访问

在项目根目录运行：

```powershell
npm run serve:deploy
```

如果你想发布最新构建产物 `dist`，运行：

```powershell
npm run serve:dist
```

默认端口是 `8080`，同一局域网设备可通过下面地址访问：

```text
http://你的电脑局域网IP:8080
```

当前这台电脑的无线网 IP 是：

```text
192.168.1.108
```

所以同网设备可以先试：

```text
http://192.168.1.108:8080
```

如果 Windows 防火墙弹窗，选择允许专用网络访问。

## 2. 开发模式局域网访问

如果你还要继续改页面，可以直接运行：

```powershell
npm run dev
```

Vite 已经配置为监听局域网地址，默认端口通常是 `5173`。

## 3. 内网穿透

如果只是临时给外网访问，推荐先把站点在本机跑起来，再用穿透工具映射 `8080` 端口。

推荐顺序：

1. 先运行 `npm run serve:deploy`
2. 再把本地 `8080` 端口映射出去

可选方案：

1. `cloudflared tunnel --url http://localhost:8080`
2. `frpc` 映射本地 `8080`
3. `ngrok http 8080`

其中：

- `cloudflared` 最适合临时分享
- `frp` 最适合你自己有云服务器
- `ngrok` 上手简单，但国内网络环境有时不稳定

## 4. 验证

本机验证：

```powershell
curl http://localhost:8080
```

局域网验证：

1. 手机和电脑连同一个 Wi-Fi
2. 手机浏览器打开 `http://192.168.1.108:8080`

## 5. 注意事项

1. 如果 `8080` 被占用，可以直接运行 `node scripts/serve-static.mjs deploy-dist 9000`
2. 如果你重新打包，先执行 `npm run build`
3. 这个静态服务脚本带了 SPA 回退，前端路由刷新不会直接 404
