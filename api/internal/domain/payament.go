package domain

import "time"

type TypePayament string
type StatusPayament string

const (
	BOLETO TypePayament = "BOLETO"
	CARTAO TypePayament = "CARTAO"
	AVISTA TypePayament = "AVISTA"

	PENDENTE StatusPayament = "PENDENTE"
	VENCIDO  StatusPayament = "VENCIDO"
	PAGO     StatusPayament = "PAGO"
)

type Payment struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Value      float64        `json:"value"`
	Type       TypePayament   `json:"type"`
	CreateDate time.Time      `json:"create_date"`
	FinalDate  time.Time      `json:"final_date"`
	Status     StatusPayament `json:"status"`
	ClientID   uint           `json:"client_id"`
}
