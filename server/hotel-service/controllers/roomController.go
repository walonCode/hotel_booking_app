package controllers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/walonCode/hotel_booking_app/configs"
	"github.com/walonCode/hotel_booking_app/models"
	"github.com/walonCode/hotel_booking_app/utils"
	"github.com/walonCode/hotel_booking_app/validators"
	"go.mongodb.org/mongo-driver/v2/bson"
)


func AddRoom(c *gin.Context){
	var room models.Room
	var req validators.RoomRequest

	if err := c.ShouldBindJSON(&req);err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"error":err})
		return
	}

	if err := validators.ValidateStruct(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":err})
		return
	}

	count,err := configs.RoomCollection.CountDocuments(context.TODO(),bson.M{"name":req.Name})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erorr":"failed to get room collection"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error":"room already exist"})
		return
	}

	//creating the new room
	room.Name = req.Name


	_,err = configs.RoomCollection.InsertOne(context.TODO(), room)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Failed to add room"})
		return
	}
	
	//logging the room creation success
	utils.Logger(
		"logs/actions.log",
		"Room Creation",
		"success",
		"helloo",
		c.ClientIP(),
		nil,
	)

	c.JSON(http.StatusCreated, gin.H{"message":"Room added"})
}