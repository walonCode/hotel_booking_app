package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	
)

type Hotel struct {
    ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    Name        string             `bson:"name" json:"name"`
    Description string             `bson:"description" json:"description"`
    Address     string             `bson:"address" json:"address"`
    City        string             `bson:"city" json:"city"`
    Stars       int                `bson:"stars" json:"stars"`                     // e.g., 3, 4, 5
    Amenities   []string           `bson:"amenities" json:"amenities"`             // e.g., ["Gym", "Pool"]
    Images      []string           `bson:"images" json:"images"`                   // URLs or filenames
    OwnerID     primitive.ObjectID `bson:"owner_id" json:"owner_id"`               // Link to the user who added it
    CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
    Rooms       int                `bson:"rooms" json:"rooms"`
    AvailableRoom int              `bson:"availableRoom" json:"availableRoom"`
    UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}
