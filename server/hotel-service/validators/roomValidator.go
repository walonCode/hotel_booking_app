package validators


type RoomRequest struct {
    HotelID     string             `json:"hotel_id" validate:"required"`           
    Name        string             `json:"name" validate:"required,min=2"`                   
    Description string             `json:"description" validate:"required,alpha"`
    Price       float64            `json:"price" validate:"required"`                 
    Capacity    int                `json:"capacity" validate:"required,numeric"`           
    Amenities   []string           `json:"amenities" validate:"required,dive"`
}