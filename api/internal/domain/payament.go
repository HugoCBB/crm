package domain

type Typepayment string
type Statuspayment string

const (
	BOLETO Typepayment = "BOLETO"
	CARTAO Typepayment = "CARTAO"
	AVISTA Typepayment = "AVISTA"

	PENDENTE Statuspayment = "PENDENTE"
	VENCIDO  Statuspayment = "VENCIDO"
	PAGO     Statuspayment = "PAGO"
)

type Payment struct {
	ID         uint          `json:"id" gorm:"primaryKey"`
	Value      float64       `json:"value"`
	Type       Typepayment   `json:"type"`
	CreateDate string        `json:"create_date"`
	FinalDate  string        `json:"final_date"`
	Status     Statuspayment `json:"status"`
	ClientID   uint          `json:"client_id"`
}
