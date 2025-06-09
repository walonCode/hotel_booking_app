package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
    "time"
)

type Room struct {
    ID          primitive.ObjectID `bson:"_id,omitempty"`
    HotelID     primitive.ObjectID `bson:"hotel_id" json:"hotel_id"`           // reference to the hotel
    Name        string             `bson:"name" json:"name"`                   // e.g., "Deluxe Suite"
    Description string             `bson:"description" json:"description"`
    Price       float64            `bson:"price" json:"price"`                 // per night
    Capacity    int                `bson:"capacity" json:"capacity"`           // number of people
    Amenities   []string           `bson:"amenities" json:"amenities"`         // ["WiFi", "TV", "AC"]
    Images      []string           `bson:"images" json:"images"`               // image URLs or filenames
    IsAvailable bool               `bson:"is_available" json:"is_available"`   // for quick availability check
    CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
    UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}
