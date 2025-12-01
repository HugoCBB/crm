package domain

type Schedule struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	LeadID      uint   `json:"lead_id"`
	Date        string `json:"date"`
	Description string `json:"description"`
	UserID      uint   `json:"user_id"`
	Lead        Leads  `json:"lead" gorm:"foreignKey:LeadID"`
}
