package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/waloncode/hotel_booking_app/controllers"
)

func BookingRoute(router *gin.Engine){
	bookingRouter := router.Group("/api/v1/booking")
	{
		bookingRouter.POST("/", controllers.CreateBooking)
		bookingRouter.PATCH("/:roomId", controllers.UpdateBooking)
	}
}