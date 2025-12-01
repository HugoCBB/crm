package schedule

import (
	"net/http"

	"github.com/crm/backend/internal/domain"
	"github.com/gin-gonic/gin"
)

type ScheduleController struct {
	Usecase IScheduleUsecase
}

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
