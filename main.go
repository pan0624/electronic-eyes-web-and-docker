package main

import (
	"net/http"
	"os"
)

func main() {
	// 设置静态文件目录为 /static
	// 建一个文件服务器处理器，它会将/static目录下的文件作为静态资源提供。
	fs := http.FileServer(http.Dir("/static"))
	// 根路径/的请求交给之前创建的文件服务器处理器来处理，任何url请求都会从/static/下查找
	http.Handle("/", fs)
	// 设置监听端口为 80
	port := "80"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}
	http.ListenAndServe(":"+port, nil)
}
