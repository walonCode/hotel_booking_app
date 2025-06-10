package controllers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/waloncode/hotel_booking_app/configs"
	"github.com/waloncode/hotel_booking_app/models"
	"github.com/waloncode/hotel_booking_app/validators"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateBooking(c *gin.Context){
	var req validators.BookingRequest
	var room models.Booking

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":"bad input data"})
		return
	}

	if err := validators.ValidateStruct(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid field"})
		return
	}

	count, err := configs.BookingCollection.CountDocuments(context.TODO(), bson.M{"user_id":req.UserID, "room_id":req.RoomID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to access the database"})
		return
	}

	if count > 0 {
		c.JSON(http.StatusInternalServerError,gin.H{"error":"booking already exist"})
		return
	}

	//booking creation
	
}