package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main(){
	fmt.Println("hello")
	r := gin.Default()

	r.Run(":8080")
}