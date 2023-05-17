package models

type monthlyAttendance struct {
	Month    string `json:"date" bson:"date"`
	totalAtt int    `json: "totalAtt" bson:"totalAtt"`
}
