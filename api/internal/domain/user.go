package domain

type TypeUser string

const (
	ADMIN        TypeUser = "ADMIN"
	DEFAULT_USER TypeUser = "DEFAULT_USER"
)

type User struct {
	ID       uint     `json:"id" gorm:"primaryKey;autoIncrement"`
	Name     string   `json:"name"`
	Email    string   `json:"email" gorm:"unique"`
	Password string   `json:"password"`
	Phone    int      `json:"phone"`
	Type     TypeUser `json:"type_user"`
	Clients  []Client `gorm:"foreignKey:UserID; constraint:OnDelete:CASCADE;"`
}
