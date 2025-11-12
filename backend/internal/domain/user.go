package domain

type RolesUser string

const (
	ADMIN RolesUser = "ADMIN"
	USER  RolesUser = "USER"
)

type User struct {
	ID         uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	Name       string    `json:"name"`
	Email      string    `json:"email" gorm:"unique"`
	Password   string    `json:"password"`
	Phone      string    `json:"phone"`
	Roles      RolesUser `json:"roles"`
	CreateDate string    `json:"create_date"`
	Leads      []Leads   `json:"leads" gorm:"foreignKey:UserID; constraint:OnDelete:CASCADE;"`
}
