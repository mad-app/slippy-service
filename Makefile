PID=../.build/pids

run:
	ng serve --host 0.0.0.0 & echo "$$!" >> $(PID)
