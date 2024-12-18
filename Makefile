# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: augougea <augougea@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/10/19 17:13:10 by augougea          #+#    #+#              #
#    Updated: 2024/01/31 13:50:45 by augougea         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NOC			= \e[0m
BOLD		= \e[1m
UNDERLINE	= \e[4m
BLACK		= \e[1;30m
RED			= \e[1m\e[38;5;196m
GREEN		= \e[1m\e[38;5;76m
YELLOW		= \e[1m\e[38;5;220m
BLUE		= \e[1m\e[38;5;33m
VIOLET		= \e[1;35m
CYAN		= \e[1;36m
WHITE		= \e[1;37m

all: run

run:
	@echo "$(GREEN)Start server !$(NOC)"
	@docker compose up -d

stop:
	@echo "$(BLUE)Server stop$(NOC)"
	@docker compose down

fclean: stop
	@echo "$(BLUE)Remove own image$(NOC)"
	@docker image rm transcendance-backend 2>/dev/null || echo "$(RED)Backend image not exist$(NOC)"
	@docker volume rm $$(docker volume ls -q) 2>/dev/null || echo "$(RED)No volume to delete$(NOC)"

prune:
	docker system prune -af --volumes

fullclean: fclean prune
	@echo "$(BLUE)Remove premake image$(NOC)"
	@docker image rm $$(docker image ls -aq) 2>/dev/null || echo "$(RED)Premake image aren't install$(NOC)"

re : fclean all

rerun : stop run

.PHONY: all run stop fclean fullclean re
