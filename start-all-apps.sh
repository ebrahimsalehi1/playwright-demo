#!/bin/bash

# Script to start all three apps and API server concurrently
# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Starting All Applications + API Server${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if all directories exist
if [ ! -d "react-app" ] || [ ! -d "angular-app" ] || [ ! -d "vue-app" ] || [ ! -d "api-server" ]; then
    echo -e "${YELLOW}Error: One or more directories not found!${NC}"
    exit 1
fi

echo -e "${GREEN}Starting API Server on http://localhost:3001${NC}"
cd api-server && npm start &
API_PID=$!

sleep 2

echo -e "${GREEN}Starting React app on http://localhost:5173${NC}"
cd ../react-app && npm run dev &
REACT_PID=$!

echo -e "${GREEN}Starting Angular app on http://localhost:4200${NC}"
cd ../angular-app && npm start &
ANGULAR_PID=$!

echo -e "${GREEN}Starting Vue app on http://localhost:5174${NC}"
cd ../vue-app && npm run dev &
VUE_PID=$!

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}All services are starting...${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "API:     ${GREEN}http://localhost:3001${NC}"
echo -e "React:   ${GREEN}http://localhost:5173${NC}"
echo -e "Angular: ${GREEN}http://localhost:4200${NC}"
echo -e "Vue:     ${GREEN}http://localhost:5174${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Wait for all processes
wait $API_PID $REACT_PID $ANGULAR_PID $VUE_PID
