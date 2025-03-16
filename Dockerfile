# 使用轻量级的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 将网站文件复制到容器中 Nginx 的默认静态文件目录
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY fun.js /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 设置容器启动时运行的命令
CMD ["nginx", "-g", "daemon off;"]
