package configs

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo"
)


var MongoClient *mongo.Client
var MongoDB *mongo.Database
var HotelCollection *mongo.Collection
var RoomCollection *mongo.Collection

func ConnectMongo(){
	mongoUri := os.Getenv("DATABASE_URI_HOTEL_AND_ROOM")
	if mongoUri == "" {
		log.Fatal("DATABASE_URI_HOTEL_AND_ROOM is not set")
	}

	//timeout function is the connection is not established
	ctx,cancel := context.WithTimeout(context.Background(), 20 * time.Second)
	defer cancel()

	clientOpt := options.Client().ApplyURI(mongoUri)

	client, err := mongo.Connect(clientOpt)
	if err != nil {
		log.Fatal("Mongo connect error",err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("Mongo ping failed", err)
	}

	log.Println("Connected to MongoDB")

	MongoClient = client
	MongoDB = client.Database("hotelsandrooms")

	RoomCollection = MongoDB.Collection("rooms")
	HotelCollection = MongoDB.Collection("hotels")

}