package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"
)

func Logger(filename string,  action, message, userId, ipAddress, extraInfo any) {
	file, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil{
		log.Println("Could not open log file")
		return
	}
	defer file.Close()

	extraJson, err := json.Marshal(extraInfo)
	if err != nil {
		log.Println("could not marshal the extra info,",err)
		extraJson = []byte("{}")
	}

	logMessage := fmt.Sprintf(
		"[%v] | ACTION: %v | MESSAGE: %v | USERID: %v | IP: %v | Extra: %v\n",
		time.Now().Format("2006-01-02  15:04:05"),
		action,
		message,
		userId,
		ipAddress,
		string(extraJson),
	)

	if _, err := file.WriteString(logMessage); err != nil{
		log.Println("failed to write the log message to the file", err)
		return
	}
}