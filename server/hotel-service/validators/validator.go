package validators

import "github.com/go-playground/validator/v10"


var validate = validator.New()

func ValidateStruct(data any)(map[string]string){
	err := validate.Struct(data)
	if err == nil {
		return nil
	}
	errors := make(map[string]string)
	for _, e := range err.(validator.ValidationErrors){
		errors[e.Field()] = "Validation failed on tag" + e.Tag()
	}

	return errors
}