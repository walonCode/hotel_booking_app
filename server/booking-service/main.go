package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/waloncode/hotel_booking_app/routes"
)

func main(){
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

	//health route
	app.GET("/", func(c *gin.Context){
		c.JSON(http.StatusOK, gin.H{
			"message":"Server is up and running",
		})
	})

	//route
	routes.BookingRoute(app)

	//starting point
	app.Run(":8080")
}