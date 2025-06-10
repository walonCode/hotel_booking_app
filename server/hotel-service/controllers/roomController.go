package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/walonCode/hotel_booking_app/configs"
	"github.com/walonCode/hotel_booking_app/models"
	"github.com/walonCode/hotel_booking_app/utils"
	"github.com/walonCode/hotel_booking_app/validators"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/v2/bson"
)


func AddRoom(c *gin.Context){
	var room models.Room
	var req validators.RoomRequest

	jsonData := c.PostForm("data")

	if err := json.Unmarshal([]byte(jsonData), &req);err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid json data"})
		return
	}

	if err := validators.ValidateStruct(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":err})
		return
	}

	form,_ := c.MultipartForm()
	files := form.File["images"]
	var imagePath []string

	//will be changed to use a cloud file storage in the future
	for _, file := range files {
		dst := "./server/hotel-service/uploads/" + file.Filename
		if err := c.SaveUploadedFile(file, dst);err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to save images"})
			return
		}
		imagePath = append(imagePath, dst)
	}

	count,err := configs.RoomCollection.CountDocuments(context.TODO(),bson.M{"name":req.Name, "description":req.Description})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"erorr":"failed to get room collection"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error":"room already exist"})
		return
	}

	var hotelId *primitive.ObjectID

	if req.HotelID != "" {
		id,err := primitive.ObjectIDFromHex(req.HotelID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid hotel id"})
			return
		}
		hotelId = &id
	}

	//creating the new room
	room.Name = req.Name
	room.Amenities = req.Amenities
	room.Capacity = req.Capacity
	room.CreatedAt = time.Now()
	room.UpdatedAt = time.Now()
	room.ID = primitive.NewObjectID()
	room.Description = req.Description
	room.IsAvailable = true
	room.Price = req.Price
	room.HotelID = *hotelId
	room.Images = imagePath

	_,err = configs.RoomCollection.InsertOne(context.TODO(), room)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Failed to add room"})
		return
	}

	_,err = configs.HotelCollection.UpdateOne(context.TODO(),bson.M{"_id":hotelId}, bson.M{"$inc": bson.M{"rooms": 1, "availableRoom": 1}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to update the rooms in the hotel"})
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

func GetAllRoom(c *gin.Context){
	var rooms []models.Room

	idParams := c.Param("hotel_id")
	hotel_id, err := primitive.ObjectIDFromHex(idParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid hotel id"})
		return
	}

	//getting all the room for a certain hotel
	cursor,err := configs.RoomCollection.Find(context.TODO(), bson.M{"hotel_id":hotel_id})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to fetch all the rooms"})
		return
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &rooms); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"error decoding the rooms"})
		return
	}

	//pagination comming later
	c.JSON(http.StatusOK,gin.H{
		"message":"all rooms",
		"data": rooms,
	})
}



func DeleteRoom(c *gin.Context){
	idParams := c.Param("roomId")
	var room *models.Room

	roomId, err := primitive.ObjectIDFromHex(idParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"invalid room id"})
		return
	}

	err = configs.RoomCollection.FindOne(context.TODO(), bson.M{"_id":roomId}).Decode(&room)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to get the room with that roomId"})
		return
	}

	_, err = configs.HotelCollection.UpdateOne(context.TODO(), bson.M{"_id": room.HotelID}, bson.M{"inc":bson.M{"rooms":-1}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to decrement the rooms in the hotel"})
		return
	}

	_,err = configs.RoomCollection.DeleteOne(context.TODO(), bson.M{"_id":roomId})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to delete room"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message":"room deleted"})
}


func UpdateRoom(c *gin.Context){
	var room *models.Room
	idParam := c.Param("roomId")
	
	roomId,err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to get roomId"})
		return
	}

	if err = configs.RoomCollection.FindOne(context.TODO(),bson.M{"_id":roomId}).Decode(&room); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to get the room"})
		return
	}

	_,err = configs.HotelCollection.UpdateOne(context.TODO(),bson.M{"_id":room.HotelID}, bson.M{
		"$inc":bson.M{
			"availableRoom":-1,
		},
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"failed to update available rooms"})
		return
	}

	_,err = configs.RoomCollection.UpdateOne(context.TODO(), bson.M{"_id":roomId}, bson.M{
		"is_available":false,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{"error":"failed to update room"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message":"room update"})
}