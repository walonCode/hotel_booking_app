package models


import (
    "go.mongodb.org/mongo-driver/bson/primitive"
    "time"
)

type Booking struct {
    ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    UserID     primitive.ObjectID `bson:"user_id" json:"user_id"`
    HotelID    primitive.ObjectID `bson:"hotel_id" json:"hotel_id"`
    RoomID     primitive.ObjectID `bson:"room_id" json:"room_id"`
    CheckIn    time.Time          `bson:"check_in" json:"check_in"`
    CheckOut   time.Time          `bson:"check_out" json:"check_out"`
    TotalPrice float64            `bson:"total_price" json:"total_price"`
    IsPaid       bool             `bosn:"isPaid" json:"isPaid"`
    Status     string             `bson:"status" json:"status"` // pending, confirmed, cancelled
    CreatedAt  time.Time          `bson:"created_at" json:"created_at"`
    UpdatedAt  time.Time          `bson:"updated_at" json:"updated_at"`
}
