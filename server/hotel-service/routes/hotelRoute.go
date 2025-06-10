package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/walonCode/hotel_booking_app/controllers"
)

func HotelRouter(router *gin.Engine){
	hotelRouter := router.Group("/api/v1/hotel")
	{
		hotelRouter.POST("/", controllers.AddHotel)
		hotelRouter.GET("/", controllers.GetHotel)
		hotelRouter.DELETE("/:hotelId", controllers.DeleteHotel)
	}
}