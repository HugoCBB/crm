package domain

type Client struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Name       string    `json:"name"`
	Phone      string    `json:"phone"`
	CreateDate string    `json:"create_date"`
	UserID     uint      `json:"user_id"`
	Payments   []Payment `gorm:"foreignKey:ClientID; constraint:OnDelete:CASCADE;"`
}
