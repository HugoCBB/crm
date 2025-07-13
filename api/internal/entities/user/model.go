package user

type User struct {
	id     uint   `json:"id"`
	Nome   string `json:"nome"`
	Email  string `json:"email"`
	Senha  string `json:"senha"`
	Numero int    `json:"numero"`
}
