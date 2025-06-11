package utils

import (
	"bytes"
	"fmt"
	"net/http"
)

func NotifyRoom(roomId string)error {
	url := fmt.Sprintf("http://localhost:8080/api/v1/room/%s",roomId)
	req,err := http.NewRequest(http.MethodPatch, url,bytes.NewBuffer(nil))
	if err != nil {
		return fmt.Errorf("error creating the request: %w",err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error sending the request: %w",err)
	}
	defer resp.Body.Close()

	if req.Response.StatusCode != http.StatusOK {
		return fmt.Errorf("room service return status: %d",resp.StatusCode)
	}

	return nil
}