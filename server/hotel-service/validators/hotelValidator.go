package validators

type HotelRequest struct {
    Name        string             `json:"name" validate:"required,alpha"`
    Description string             `son:"description" validate:"required,alpha"`
    Address     string             `json:"address" validate:"required,alpha"`
    City        string             `json:"city" validate:"required,alpha"`
    Stars       int                `json:"stars" validate:"required,numeric"`                     
    Amenities   []string           `json:"amenities" validate:"required,dive"`                              
    OwnerID     string			   `json:"owner_id" validate:"required"`               
}