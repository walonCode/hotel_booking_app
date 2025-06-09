package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	// "github.com/walonCode/hotel_booking_app/configs"
)

func main(){
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("No .env provided")
	}

	// configs.ConnectMongo()

	fmt.Println("hello")
	r := gin.Default()



	r.Run(":8080")
}