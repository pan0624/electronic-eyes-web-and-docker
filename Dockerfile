# 第一阶段：编译 Go 代码
FROM golang:1.20-alpine AS builder

WORKDIR /app

# 安装依赖
COPY go.mod ./
RUN go mod download

# 复制源码并编译
COPY main.go .
RUN go build -o /app/server

# 第二阶段：准备运行环境
FROM alpine:latest

# 创建目录并复制编译好的二进制文件和静态文件
WORKDIR /root/
COPY --from=builder /app/server .

# 复制网站文件到 /static 目录
COPY index.html /static/
COPY style.css /static/
COPY fun.js /static/

# 暴露端口 80
EXPOSE 80

# 启动命令
CMD ["/root/server"]