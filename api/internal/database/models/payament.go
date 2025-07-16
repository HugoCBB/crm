package models

type Payment struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Type     string `json:"type"`
	ClientID uint   `json:"client_id"`
}
