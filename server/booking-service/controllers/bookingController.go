package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/waloncode/hotel_booking_app/configs"
	"github.com/waloncode/hotel_booking_app/models"
	"github.com/waloncode/hotel_booking_app/utils"
	"github.com/waloncode/hotel_booking_app/validators"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	var checkIn,checkOut time.Time
	var hotelId, roomId primitive.ObjectID

	if req.CheckIn != "" && req.CheckOut != ""{
		layout := "2006-01-02"
		parsedTimeCheckOut, err := time.Parse(layout, req.CheckOut)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid checkout time"})
			return
		}

		parsedTimeCheckIn,err := time.Parse(layout,req.CheckIn)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid checkin time"})
			return
		}

		checkIn = parsedTimeCheckIn
		checkOut = parsedTimeCheckOut
	}

	if req.RoomID != "" && req.HotelID != ""{
		newHotelid,err := primitive.ObjectIDFromHex(req.HotelID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid hotel id"})
			return
		}
		newRoomid,err := primitive.ObjectIDFromHex(req.RoomID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid rooom id"})
			return
		}

		hotelId = newHotelid
		roomId = newRoomid
	}

	//booking creation
	room.ID = primitive.NewObjectID()
	room.CheckIn = checkIn
	room.CheckOut = checkOut
	room.HotelID = hotelId
	room.RoomID = roomId
	room.IsPaid = false
	room.UserID = primitive.NewObjectID()
	room.CreatedAt = time.Now()
	room.UpdatedAt = time.Now()
	room.Status = "pending"
	room.TotalPrice = req.TotalPrice

	if err = utils.NotifyRoom(req.RoomID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to get the rooom"})
		return
	}

	_, err = configs.BookingCollection.InsertOne(context.TODO(), room)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to book the room"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message":"room booked"})
}




func UpdateBooking(c *gin.Context){
	idParams := c.Param("roomId")
	roomId,err := primitive.ObjectIDFromHex(idParams)
	if err != nil {
		c.JSON(500, gin.H{"error":"invalid roomid"})
		return
	}

	if err := configs.BookingCollection.FindOneAndUpdate(context.TODO(), bson.M{"room_id":roomId}, bson.M{"isPaid":true, "status":"confirm"}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to confirm booking"})
		return
	}

	c.JSON(http.StatusInternalServerError,gin.H{"message":"booking confirmed"})
}


