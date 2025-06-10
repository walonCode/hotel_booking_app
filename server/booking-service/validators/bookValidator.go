package validators

type BookingRequest struct {
	UserID     string          `json:"user_id" validate:"required"`
	HotelID    string 		   `json:"hotel_id" validate:"required"`
	RoomID     string          `json:"room_id" validate:"required"`
	CheckIn    string          `json:"check_in" validate:"required"`
	CheckOut   string          `json:"check_out" validate:"required"`
	TotalPrice float64         `json:"total_price" validate:"required,numeric"` 
}
