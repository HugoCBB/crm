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
	Phone      int       `json:"phone"`
	Roles      RolesUser `json:"roles_user"`
	Clients    []Client  `gorm:"foreignKey:UserID; constraint:OnDelete:CASCADE;"`
	CreateDate string    `json:"create_date"`
}
