package validators

import "github.com/go-playground/validator/v10"


var validate = validator.New()


func ValidateStruct(data any)(map[string]string){
	err := validate.Struct(data)
	if err == nil {
		return nil
	}

	error := make(map[string]string)
	
	for _, e := range err.(validator.ValidationErrors){
		error[e.Field()] = "Validation failed on tag " + e.Tag()
	}
	return error
}