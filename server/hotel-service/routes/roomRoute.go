package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/walonCode/hotel_booking_app/controllers"
)

func RoomRouter(router *gin.Engine){
	roomRouter := router.Group("/api/v1/room")
	{
		roomRouter.POST("/", controllers.AddRoom)
		roomRouter.GET("/:hotelId", controllers.GetAllRoom)
		roomRouter.DELETE("/:roomId", controllers.DeleteRoom)
		roomRouter.PATCH("/:roomId", controllers.UpdateRoom)
	}
}