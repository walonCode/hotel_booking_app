package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/walonCode/hotel_booking_app/routes"
	// "github.com/walonCode/hotel_booking_app/configs"
)

func main(){
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("No .env provided")
	}

	//database connection
	// configs.ConnectMongo()

	//starting point of the server
	app := gin.Default()


	//middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3001/",},
		AllowMethods:  []string{"GET","POST","PATCH","DELETE","PUT"},
		AllowHeaders: []string{"Origin","Content-Type","Authorization"},
		ExposeHeaders: []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 6 * time.Hour,
	}))


	//health check route
	app.GET("/", func(c *gin.Context){
		c.JSON(http.StatusOK,gin.H{"message":"server is up and running"})
	})

	//routes
	routes.HotelRouter(app)
	routes.RoomRouter(app)

	//app running
	app.Run(":8080")
}