package schedule

import (
	"net/http"

	"github.com/crm/backend/internal/domain"
	"github.com/gin-gonic/gin"
)

type ScheduleController struct {
	Usecase IScheduleUsecase
}

// CreateSchedule cria um novo agendamento.
// @Summary Cria agendamento
// @Tags Schedules
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param payload body domain.Schedule true "Dados do agendamento"
// @Success 201 {object} domain.Schedule
// @Failure 400 {object} map[string]string
// @Router /schedules/ [post]
func (c *ScheduleController) CreateSchedule(ctx *gin.Context) {
	var payload domain.Schedule
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	schedule, err := c.Usecase.CreateSchedule(&payload)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, schedule)
}

// FindAll retorna todos os agendamentos do usuário autenticado.
// @Summary Lista agendamentos do usuário
// @Tags Schedules
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {array} domain.Schedule
// @Failure 401 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /schedules/ [get]

func (c *ScheduleController) FindAll(ctx *gin.Context) {
	userIdUntyped, exists := ctx.Get("userId")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Usuário não autenticado",
		})
		return
	}

	userId := userIdUntyped.(int)

	schedules, err := c.Usecase.FindAll(userId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, schedules)
}
