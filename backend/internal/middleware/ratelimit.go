package middleware

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis_rate/v10"
	"github.com/redis/go-redis/v9"
)

func RateLimitMiddleware(rdb *redis.Client) gin.HandlerFunc {
	limiter := redis_rate.NewLimiter(rdb)
	return func(c *gin.Context) {
		clientIp := c.ClientIP()
		key := "rate_limit:" + clientIp

		limit := redis_rate.Limit{
			Rate:   10,
			Period: 10 * time.Minute,
			Burst:  10,
		}

		res, err := limiter.Allow(c.Request.Context(), key, limit)
		if err != nil {
			c.Next()
			return
		}

		if res.Allowed == 0 {
			secondsUntilReset := time.Duration(res.ResetAfter) * time.Millisecond

			c.Header("Retry-After", secondsUntilReset.String())
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "Muitas requisições. Tente novamente em breve.",
				"wait":  secondsUntilReset.String(),
			})
			return
		}
		c.Next()
	}
}
