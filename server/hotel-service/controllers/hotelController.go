package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/walonCode/hotel_booking_app/configs"
	"github.com/walonCode/hotel_booking_app/models"
	"github.com/walonCode/hotel_booking_app/validators"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/v2/bson"
)


func AddHotel(c *gin.Context){
	var req validators.HotelRequest
	var hotel models.Hotel

	jsonData := c.PostForm("data")
	if err := json.Unmarshal([]byte(jsonData), &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid json data"})
		return
	}

	if err := validators.ValidateStruct(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"invalid json data"})
		return
	}

	form,_ := c.MultipartForm()
	file := form.File["images"]

	var imagePath []string

	for _,file := range file {
		dst := "./server/hotel-service/upload" + file.Filename
		if err := c.SaveUploadedFile(file, dst); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to save the images"})
			return
		}

		imagePath = append(imagePath, file.Filename)
	}

	count,err := configs.HotelCollection.CountDocuments(context.TODO(), bson.M{"name":req.Name})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to do server check"})
		return
	}

	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error":"hotel already exist"})
		return
	}

	var ownerId primitive.ObjectID

	if req.OwnerID != "" {
		value,err := primitive.ObjectIDFromHex(req.OwnerID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid ownerId"})
			return
		}
		ownerId = value
	}

	//creating hotel
	hotel.ID = primitive.NewObjectID()
	hotel.Name = req.Name
	hotel.Amenities = req.Amenities
	hotel.Address = req.Address
	hotel.Description = req.Description
	hotel.Stars = req.Stars
	hotel.CreatedAt = time.Now()
	hotel.UpdatedAt = time.Now()
	hotel.AvailableRoom = 0
	hotel.Rooms = 0
	hotel.Images = imagePath
	hotel.OwnerID = ownerId
	hotel.City = req.City

	_,err = configs.HotelCollection.InsertOne(context.TODO(), hotel)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to save hotel"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message":"hotel added"})
}